import { useState } from 'react'

// Anything still holding a "PASTE_..." placeholder (or empty) counts as
// "not filled in yet".
function isPlaceholder(value) {
  return !value || value.startsWith('PASTE_')
}

function VisitButton({ url, label }) {
  if (isPlaceholder(url)) return null

  return (
    <a
      className="portfolio-card-social-visit"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label} →
    </a>
  )
}

function InstagramPreview({ profiles }) {
  const [index, setIndex] = useState(0)

  if (!profiles || profiles.length === 0) return null

  const current = profiles[index]
  const embedSrc = current.url.replace(/\/?$/, '/embed')
  const hasMultiple = profiles.length > 1

  const goPrev = () =>
    setIndex((i) => (i === 0 ? profiles.length - 1 : i - 1))

  const goNext = () =>
    setIndex((i) => (i === profiles.length - 1 ? 0 : i + 1))

  return (
    <>
      <div className="portfolio-card-social-frame">
        <iframe
          key={current.url}
          src={embedSrc}
          title={`${current.name} Instagram preview`}
          loading="lazy"
          allowTransparency="true"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              className="portfolio-card-social-arrow portfolio-card-social-arrow-left"
              onClick={goPrev}
              aria-label="Previous profile"
            >
              ‹
            </button>

            <button
              type="button"
              className="portfolio-card-social-arrow portfolio-card-social-arrow-right"
              onClick={goNext}
              aria-label="Next profile"
            >
              ›
            </button>

            <div className="portfolio-card-social-dots">
              {profiles.map((profile, i) => (
                <button
                  key={profile.url}
                  type="button"
                  className={`portfolio-card-social-dot${
                    i === index ? ' active' : ''
                  }`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to profile ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <VisitButton url={current.url} label="Visit Instagram" />
    </>
  )
}

// LinkedIn / TikTok: no live feed embed exists on either platform, so
// this shows a short note + one button per profile instead.
function LinkFallback({ profiles, message }) {
  if (!profiles || profiles.length === 0) return null

  return (
    <>
      <p className="portfolio-card-social-message">{message}</p>

      <div className="portfolio-card-social-links">
        {profiles.map((profile) => (
          <a
            key={profile.url}
            className="portfolio-card-social-visit"
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Page →
          </a>
        ))}
      </div>
    </>
  )
}

function YouTubePreview({ channelId, profileUrl }) {
  if (isPlaceholder(channelId)) return null

  // A channel's "uploads" playlist ID is the channel ID with the
  // leading UC swapped for UU — always shows the newest video first.
  const uploadsPlaylistId = `UU${channelId.slice(2)}`

  return (
    <>
      <div className="portfolio-card-social-frame">
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${uploadsPlaylistId}`}
          title="Latest YouTube uploads"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <VisitButton url={profileUrl} label="Visit YouTube" />
    </>
  )
}

// Renders as its own labeled "Live Profile Preview" box below the
// card's title/stats/description/tags — the top image slot keeps
// showing the normal screenshot carousel untouched.
export default function SocialEmbed({ social }) {
  if (!social) return null

  return (
    <div className="portfolio-card-social">
      <p className="portfolio-card-social-label">Live Profile Preview</p>

      {social.platform === 'instagram' && (
        <InstagramPreview profiles={social.profiles} />
      )}

      {social.platform === 'linkedin' && (
        <LinkFallback
          profiles={social.profiles}
          message="LinkedIn doesn't offer a public feed embed for company pages, so there's no live preview to show here — each button opens the real page directly."
        />
      )}

      {social.platform === 'tiktok' && (
        <LinkFallback
          profiles={social.profiles}
          message="TikTok only supports embedding a single video, not a full profile feed — each button opens the real profile directly."
        />
      )}

      {social.platform === 'youtube' && (
        <YouTubePreview
          channelId={social.channelId}
          profileUrl={social.profileUrl}
        />
      )}
    </div>
  )
}