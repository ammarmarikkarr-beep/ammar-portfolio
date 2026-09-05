import { useState } from 'react'

const PLATFORM_LABELS = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}

// Anything still holding a "PASTE_..." placeholder (or empty) counts as
// "not filled in yet" so we can show a friendly fallback instead of a
// broken embed while you're setting this up.
function isPlaceholder(value) {
  return !value || value.startsWith('PASTE_')
}

function VisitButton({ platform, url, label }) {
  if (isPlaceholder(url)) return null

  return (
    <a
      className="project-detail-preview-visit"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label || `Visit ${PLATFORM_LABELS[platform]}`} →
    </a>
  )
}

function FallbackCard({ message }) {
  return (
    <div className="project-detail-preview-fallback">
      <p>{message}</p>
    </div>
  )
}

function ProfileTabs({ profiles, activeIndex, onSelect }) {
  if (profiles.length <= 1) return null

  return (
    <div className="project-detail-preview-tabs">
      {profiles.map((profile, i) => (
        <button
          key={profile.url}
          type="button"
          className={`project-detail-preview-tab${
            i === activeIndex ? ' active' : ''
          }`}
          onClick={() => onSelect(i)}
        >
          {profile.name}
        </button>
      ))}
    </div>
  )
}

function InstagramEmbed({ profiles }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!profiles || profiles.length === 0) {
    return (
      <FallbackCard message="Add Instagram profile URLs in projects.js to show the live preview here." />
    )
  }

  const current = profiles[activeIndex]
  const embedSrc = current.url.replace(/\/?$/, '/embed')

  return (
    <>
      <ProfileTabs
        profiles={profiles}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      <div className="project-detail-preview-frame project-detail-preview-frame-profile">
        <iframe
          key={current.url}
          src={embedSrc}
          title={`${current.name} Instagram preview`}
          loading="lazy"
          allowTransparency="true"
        />
      </div>

      <VisitButton
        platform="instagram"
        url={current.url}
        label={`Visit ${current.name}`}
      />
    </>
  )
}

function ProfileGrid({ platform, profiles, message }) {
  if (!profiles || profiles.length === 0) {
    return (
      <FallbackCard
        message={`Add your ${PLATFORM_LABELS[platform]} profile URLs in projects.js.`}
      />
    )
  }

  return (
    <>
      <FallbackCard message={message} />

      <div className="project-detail-preview-grid">
        {profiles.map((profile) => (
          <a
            key={profile.url}
            className="project-detail-preview-grid-item"
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.name} →
          </a>
        ))}
      </div>
    </>
  )
}

function YouTubeEmbed({ channelId, profileUrl }) {
  if (isPlaceholder(channelId)) {
    return (
      <FallbackCard message="Add your YouTube channel ID (starts with UC...) in projects.js to show the latest-uploads playlist here." />
    )
  }

  // A channel's "uploads" playlist ID is always the channel ID with the
  // leading UC swapped for UU. Embedding that playlist means this
  // always shows the newest video first with zero manual updates.
  const uploadsPlaylistId = `UU${channelId.slice(2)}`

  return (
    <>
      <div className="project-detail-preview-frame project-detail-preview-frame-video">
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${uploadsPlaylistId}`}
          title="Latest YouTube uploads"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <VisitButton platform="youtube" url={profileUrl} />
    </>
  )
}

export default function SocialEmbed({ social }) {
  if (!social) return null

  const { platform } = social

  return (
    <section className="project-detail-preview">
      <p className="project-detail-label">Live Profile Preview</p>

      <h2>{PLATFORM_LABELS[platform]}</h2>

      {platform === 'instagram' && (
        <InstagramEmbed profiles={social.profiles} />
      )}

      {platform === 'linkedin' && (
        <ProfileGrid
          platform="linkedin"
          profiles={social.profiles}
          message="LinkedIn doesn't offer a public feed embed for company pages, so there's no live preview to show here — each button below opens the real page directly."
        />
      )}

      {platform === 'tiktok' && (
        <ProfileGrid
          platform="tiktok"
          profiles={social.profiles}
          message="TikTok only supports embedding a single video, not a full profile feed — each button below opens the real profile directly."
        />
      )}

      {platform === 'youtube' && (
        <YouTubeEmbed
          channelId={social.channelId}
          profileUrl={social.profileUrl}
        />
      )}
    </section>
  )
}