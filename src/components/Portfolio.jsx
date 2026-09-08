import { useState, useEffect } from 'react'
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

// Shared "Visit X" control used by every live/real platform frame
// (Instagram, LinkedIn, TikTok, YouTube) — a full overlay that only
// appears on hover on real pointer devices, and a small always-on
// pill on touch devices (see Portfolio.css for that split). Same
// look everywhere, so switching between cards feels consistent.
function VisitOverlay({ url, label }) {
  if (isPlaceholder(url)) return null

  return (
    <a
      className="portfolio-card-media-visit"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {label} →
    </a>
  )
}

// Instagram: real live embed, cycle between your profiles with
// arrows/dots, "Visit Profile" appears via VisitOverlay.
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

      <VisitOverlay url={current.url} label="Visit Profile" />

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

      <VisitOverlay url={profileUrl} label="Visit Channel" />
    </>
  )
}

// LinkedIn: no public feed embed exists for company pages — a real
// platform limit. Each profile shows your real screenshot, cycling
// with the same arrows as every other frame, plus the same hover
// "Visit Page" overlay pattern as everything else. If a profile has
// no screenshot yet, it shows a plain named placeholder instead of a
// blank tile.
function LinkedInFrame({ profiles, images }) {
  const [index, setIndex] = useState(0)

  if (!profiles || profiles.length === 0) return null

  const hasMultiple = profiles.length > 1
  const clampedIndex = Math.min(index, profiles.length - 1)
  const current = profiles[clampedIndex]
  const image =
    images && images.length > 0
      ? images[Math.min(clampedIndex, images.length - 1)]
      : null

  return (
    <>
      <AnimatePresence mode="wait">
        {image ? (
          <motion.img
            key={image}
            src={image}
            alt={current.name || 'LinkedIn preview'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        ) : (
          <motion.div
            key={`fallback-${current.url}`}
            className="portfolio-card-media-fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span>{current.name}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <VisitOverlay url={current.url} label="Visit Page" />

      {hasMultiple && (
        <CarouselControls
          length={profiles.length}
          index={clampedIndex}
          setIndex={setIndex}
          labelPrefix="profile"
        />
      )}
    </>
  )
}

// TikTok: TikTok has no live profile-feed embed at all — that's a
// real platform limit, not something code can work around. What
// TikTok *does* support is embedding one specific real, live video
// per profile (via their official widget script). So: if a profile
// has a `videoUrl` set in projects.js, this shows that video as a
// real live embed; otherwise it falls back to your screenshot (never
// a blank tile either way). The script is re-appended on mount
// because it only scans the page for `.tiktok-embed` blockquotes
// once on load, and in a single-page app the blockquote usually
// appears *after* that initial scan.
function TikTokFrame({ profiles, images }) {
  const [index, setIndex] = useState(0)

  const hasMultiple = profiles && profiles.length > 1
  const current =
    profiles && profiles.length > 0
      ? profiles[Math.min(index, profiles.length - 1)]
      : null

  const hasVideo = current && !isPlaceholder(current.videoUrl)
  const videoId = hasVideo
    ? current.videoUrl.match(/\/video\/(\d+)/)?.[1]
    : null

  useEffect(() => {
    if (!hasVideo) return undefined

    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [hasVideo, current?.videoUrl])

  if (!current) return null

  const image =
    images && images.length > 0
      ? images[Math.min(index, images.length - 1)]
      : null

  return (
    <div className="portfolio-card-media-tiktok">
      {hasVideo ? (
        <blockquote
          key={current.videoUrl}
          className="tiktok-embed"
          cite={current.videoUrl}
          data-video-id={videoId || ''}
        >
          <section />
        </blockquote>
      ) : image ? (
        <img src={image} alt={current.name || 'TikTok preview'} />
      ) : (
        <div className="portfolio-card-media-fallback">
          <span>{current.name}</span>
        </div>
      )}

      <VisitOverlay url={current.url} label="Visit Profile" />

      {hasMultiple && (
        <CarouselControls
          length={profiles.length}
          index={index}
          setIndex={setIndex}
          labelPrefix="profile"
        />
      )}
    </div>
  )
}

// Multiple self-produced videos in one card (e.g. Content Creation) —
// cycles with the same arrows/dots as every other frame. Add entries
// to `project.videos` in projects.js: either a YouTube video id, or a
// direct hosted video file src.
function VideoGalleryFrame({ videos }) {
  const [index, setIndex] = useState(0)

  const readyVideos = videos.filter((v) =>
    v.type === 'direct' ? !isPlaceholder(v.src) : !isPlaceholder(v.id)
  )

  if (readyVideos.length === 0) return null

  const hasMultiple = readyVideos.length > 1
  const current = readyVideos[Math.min(index, readyVideos.length - 1)]

  return (
    <>
      <AnimatePresence mode="wait">
        {current.type === 'direct' ? (
          <motion.video
            key={current.src}
            src={current.src}
            controls
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        ) : (
          <motion.iframe
            key={current.id}
            src={`https://www.youtube.com/embed/${current.id}`}
            title={current.title || 'Video'}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {hasMultiple && (
        <CarouselControls
          length={readyVideos.length}
          index={index}
          setIndex={setIndex}
          labelPrefix="video"
        />
      )}
    </>
  )
}

// No social data and no videos: the original plain screenshot
// slider — now shown in full via object-fit:contain (see CSS)
// instead of being cropped.
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
  const { social, gallery, videos, categoryLabel } = project

  const hasReadyVideos =
    videos &&
    videos.some((v) =>
      v.type === 'direct' ? !isPlaceholder(v.src) : !isPlaceholder(v.id)
    )

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

      {social?.platform === 'linkedin' && (
        <LinkedInFrame profiles={social.profiles} images={gallery} />
      )}

      {social?.platform === 'tiktok' && (
        <TikTokFrame profiles={social.profiles} images={gallery} />
      )}

      {!social && hasReadyVideos && <VideoGalleryFrame videos={videos} />}

      {!social && !hasReadyVideos && <PlainGalleryFrame images={gallery} />}
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