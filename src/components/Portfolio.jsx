import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'

import { categories, projects } from '../data/projects'

import './Portfolio.css'

function isPlaceholder(value) {
  return !value || value.startsWith('PASTE_')
}

// Shared prev/next arrows + dots, reused by every frame type below.
function CarouselControls({ length, index, setIndex, labelPrefix }) {
  const goPrev = (e) => {
    e.stopPropagation()
    setIndex((i) => (i === 0 ? length - 1 : i - 1))
  }

  const goNext = (e) => {
    e.stopPropagation()
    setIndex((i) => (i === length - 1 ? 0 : i + 1))
  }

  return (
    <>
      <button
        type="button"
        className="portfolio-card-arrow portfolio-card-arrow-left"
        onClick={goPrev}
        aria-label={`Previous ${labelPrefix}`}
      >
        ‹
      </button>

      <button
        type="button"
        className="portfolio-card-arrow portfolio-card-arrow-right"
        onClick={goNext}
        aria-label={`Next ${labelPrefix}`}
      >
        ›
      </button>

      <div className="portfolio-card-dots">
        {Array.from({ length }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`portfolio-card-dot${i === index ? ' active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setIndex(i)
            }}
            aria-label={`Go to ${labelPrefix} ${i + 1}`}
          />
        ))}
      </div>
    </>
  )
}

// Instagram: real live embed, cycle between your profiles with
// arrows/dots, "Visit Instagram" only appears as a hover overlay —
// never a permanent button — and never blocks the embed itself.
function InstagramFrame({ profiles }) {
  const [index, setIndex] = useState(0)

  if (!profiles || profiles.length === 0) return null

  const current = profiles[index]
  const embedSrc = current.url.replace(/\/?$/, '/embed')
  const hasMultiple = profiles.length > 1

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.iframe
          key={current.url}
          src={embedSrc}
          title={`${current.name} Instagram preview`}
          loading="lazy"
          allowTransparency="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      </AnimatePresence>

      <a
        className="portfolio-card-media-visit"
        href={current.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Visit Instagram →
      </a>

      {hasMultiple && (
        <CarouselControls
          length={profiles.length}
          index={index}
          setIndex={setIndex}
          labelPrefix="profile"
        />
      )}
    </>
  )
}

// YouTube: auto-updating "latest uploads" playlist embed, same
// hover-only visit link as Instagram — never blocks the play button.
function YouTubeFrame({ channelId, profileUrl }) {
  if (isPlaceholder(channelId)) return null

  const uploadsPlaylistId = `UU${channelId.slice(2)}`

  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/videoseries?list=${uploadsPlaylistId}`}
        title="Latest YouTube uploads"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <a
        className="portfolio-card-media-visit"
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Visit YouTube →
      </a>
    </>
  )
}

// LinkedIn / TikTok: neither platform allows any kind of feed embed,
// so this shows your screenshot(s) as a plain clickable image — the
// picture itself is the link, no visible button or message text.
// Gallery image N pairs with profile N, in the same order.
function LinkImageFrame({ images, profiles }) {
  const [index, setIndex] = useState(0)

  if (!profiles || profiles.length === 0) return null

  const slideCount = Math.max(images.length, profiles.length)
  const hasMultiple = slideCount > 1
  const clampedIndex = Math.min(index, slideCount - 1)
  const url = profiles[Math.min(clampedIndex, profiles.length - 1)]?.url
  const image = images[Math.min(clampedIndex, images.length - 1)]

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.a
          key={`${image}-${url}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-card-media-frame-link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <img src={image} alt="" />
        </motion.a>
      </AnimatePresence>

      {hasMultiple && (
        <CarouselControls
          length={slideCount}
          index={clampedIndex}
          setIndex={setIndex}
          labelPrefix="profile"
        />
      )}
    </>
  )
}

// No social data at all: the original plain screenshot slider.
function PlainGalleryFrame({ images }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <CarouselControls
          length={images.length}
          index={index}
          setIndex={setIndex}
          labelPrefix="image"
        />
      )}
    </>
  )
}

// Single top frame for every card — picks the right content type per
// project instead of a separate box below the text.
function PortfolioCardMedia({ project }) {
  const { social, gallery, categoryLabel } = project

  return (
    <div className="portfolio-card-media">
      <span className="portfolio-card-badge">{categoryLabel}</span>

      {social?.platform === 'instagram' && (
        <InstagramFrame profiles={social.profiles} />
      )}

      {social?.platform === 'youtube' && (
        <YouTubeFrame
          channelId={social.channelId}
          profileUrl={social.profileUrl}
        />
      )}

      {(social?.platform === 'linkedin' ||
        social?.platform === 'tiktok') && (
        <LinkImageFrame images={gallery} profiles={social.profiles} />
      )}

      {!social && <PlainGalleryFrame images={gallery} />}
    </div>
  )
}

export default function Portfolio() {
  const [searchParams] = useSearchParams()

  // If arriving as /portfolio?category=seo (etc.), open already
  // filtered to that category — otherwise default to "All Projects".
  const categoryFromUrl = searchParams.get('category')
  const initialFilter = categories.some(
    (cat) => cat.value === categoryFromUrl
  )
    ? categoryFromUrl
    : 'all'

  const [activeFilter, setActiveFilter] = useState(initialFilter)

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      {/* HERO */}
      <section className="portfolio-hero">
        <div className="container portfolio-hero-container">
          <motion.p
            className="portfolio-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My Portfolio
          </motion.h1>

          <motion.p
            className="portfolio-hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore my latest projects, case studies, and digital marketing
            campaigns.
          </motion.p>

          <motion.span
            className="portfolio-title-line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="portfolio-section" id="portfolio-projects">
        <div className="container portfolio-container">
          <div className="portfolio-filters">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`portfolio-filter${
                  activeFilter === cat.value ? ' active' : ''
                }`}
                onClick={() => setActiveFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  layout
                  className="portfolio-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <PortfolioCardMedia project={project} />

                  <div className="portfolio-card-body">
                    <h3>{project.title}</h3>
                    <p className="portfolio-card-subtitle">
                      {project.subtitle}
                    </p>

                    <div className="portfolio-card-stats">
                      {project.stats.map((stat) => (
                        <div className="portfolio-stat" key={stat.label}>
                          <span className="portfolio-stat-label">
                            {stat.label}
                          </span>
                          <span className="portfolio-stat-value">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="portfolio-card-description">
                      {project.summary}
                    </p>

                    <div className="portfolio-card-tags">
                      {project.tags.map((tag) => (
                        <span className="portfolio-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="portfolio-cta">
          <h2>Let's Work Together</h2>
          <p>
            Interested in collaborating on your next project? Let's create
            something amazing.
          </p>
          <Link to="/contact" className="portfolio-cta-button">
            Start Your Project →
          </Link>
        </div>
      </section>
    </>
  )
}