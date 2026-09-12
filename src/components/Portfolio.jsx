import { useState, useEffect, useRef } from 'react'
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

// Hover-reveal "Visit X" — used for EVERY platform now (Instagram,
// YouTube, LinkedIn, TikTok). On real hover devices it fades in
// centered over the frame; on touch devices (see CSS) it becomes a
// small always-visible corner pill instead, since there's no hover
// to reveal it with there.
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

// Small speaker icon button for toggling sound on self-hosted
// (type: 'direct') videos, which autoplay muted like Reels/TikTok.
function MuteToggle({ muted, onToggle }) {
  return (
    <button
      type="button"
      className="portfolio-card-mute-toggle"
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      aria-label={muted ? 'Unmute video' : 'Mute video'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}

// A single named placeholder tile — shown whenever a screenshot is
// either missing entirely or present but fails to actually load
// (404, wrong path, etc). Never shows a broken image icon.
function MediaFallback({ label }) {
  return (
    <div className="portfolio-card-media-fallback">
      <span>{label}</span>
    </div>
  )
}

// Instagram: real live embed, cycle between your profiles with
// arrows/dots, "Visit Profile" appears via hover overlay.
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
// with the same arrows as every other frame. If a profile has no
// screenshot path at all, OR the path is set but the file 404s
// (doesn't exist yet / typo'd), it shows a plain named placeholder
// instead — never a broken image icon. "Visit Page" is now the same
// hover-centered overlay as every other platform.
function LinkedInFrame({ profiles, images }) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  if (!profiles || profiles.length === 0) return null

  const hasMultiple = profiles.length > 1
  const clampedIndex = Math.min(index, profiles.length - 1)
  const current = profiles[clampedIndex]
  const image =
    images && images.length > 0
      ? images[Math.min(clampedIndex, images.length - 1)]
      : null

  // Reset "did it fail to load" whenever we switch to a different
  // profile/image, so a broken image on profile #1 doesn't
  // permanently hide a perfectly good image on profile #2.
  useEffect(() => {
    setFailed(false)
  }, [clampedIndex])

  const showFallback = !image || failed

  return (
    <>
      <AnimatePresence mode="wait">
        {showFallback ? (
          <motion.div
            key={`fallback-${current.url}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: '100%', height: '100%' }}
          >
            <MediaFallback label={current.name} />
          </motion.div>
        ) : (
          <motion.img
            key={image}
            src={image}
            alt={current.name || 'LinkedIn preview'}
            onError={() => setFailed(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
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
// per profile (via their official widget script). If a profile has
// a `videoUrl` set in projects.js, this shows that video as a real
// live embed; otherwise it falls back to your screenshot — and if
// that screenshot file 404s too, it falls back again to a named
// placeholder, so this can never render as visibly blank/broken.
// "Visit Page" is the same hover-centered overlay as every other
// platform now.
function TikTokFrame({ profiles, images }) {
  const [index, setIndex] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)

  const hasMultiple = profiles && profiles.length > 1
  const current =
    profiles && profiles.length > 0
      ? profiles[Math.min(index, profiles.length - 1)]
      : null

  const hasVideo = current && !isPlaceholder(current.videoUrl)
  const videoId = hasVideo
    ? current.videoUrl.match(/\/video\/(\d+)/)?.[1]
    : null

  // Reset "did the screenshot fail" whenever the profile changes.
  useEffect(() => {
    setImgFailed(false)
  }, [index])

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

  const showImageFallback = !image || imgFailed

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
      ) : showImageFallback ? (
        <MediaFallback label={current.name} />
      ) : (
        <img
          src={image}
          alt={current.name || 'TikTok preview'}
          onError={() => setImgFailed(true)}
        />
      )}

      <VisitOverlay url={current.url} label="Visit Page" />

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
// direct hosted .mp4 file (public/videos/...).
//
// Direct videos autoplay MUTED and looped (browsers block audible
// autoplay), with a small speaker button to unmute — same pattern as
// Instagram Reels / TikTok.
function VideoGalleryFrame({ videos }) {
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)

  const readyVideos = videos.filter((v) =>
    v.type === 'direct' ? !isPlaceholder(v.src) : !isPlaceholder(v.id)
  )

  if (readyVideos.length === 0) return null

  const hasMultiple = readyVideos.length > 1
  const current = readyVideos[Math.min(index, readyVideos.length - 1)]

  useEffect(() => {
    // Reset to muted whenever we switch to a new direct video, so
    // autoplay on the newly-shown clip is never blocked by the
    // browser for being audible.
    setMuted(true)
  }, [current?.src])

  return (
    <>
      <AnimatePresence mode="wait">
        {current.type === 'direct' ? (
          <motion.video
            key={current.src}
            ref={videoRef}
            src={current.src}
            autoPlay
            loop
            muted={muted}
            playsInline
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

      {current.type === 'direct' && (
        <MuteToggle muted={muted} onToggle={() => setMuted((m) => !m)} />
      )}

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
// slider — shown in full via object-fit:contain (see CSS) instead of
// being cropped.
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

  // Only self-hosted (direct .mp4) reels get the true 9:16 vertical
  // frame — YouTube-embed videos and every other frame type stay
  // landscape like the rest of the grid.
  const hasDirectVideo =
    videos && videos.some((v) => v.type === 'direct' && !isPlaceholder(v.src))

  return (
    <div
      className={`portfolio-card-media${
        hasDirectVideo ? ' portfolio-card-media-portrait' : ''
      }`}
    >
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