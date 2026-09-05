import './Tools.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// All icons are local JPEGs at /public/images/icons/{Tool Name}.jpeg —
// filename matches the tool's display name exactly, including spaces.
function getIconSrc(name) {
  return `/images/icons/${encodeURIComponent(name)}.jpeg`
}

// Proficiency tiers — one color function drives both the % label and
// the progress-bar fill, so a card's color always reflects skill level
// rather than the tool's brand color.
//
// Bands 70–95 are the ones you specified directly. 50–69 and below-50
// are extensions of that same scale for tools that sit lower (e.g. a
// 25% or 60% skill still needs a sensible color).
function getTierColor(percentage) {
  if (percentage >= 90) return '#22c55e' // 90–100: Green
  if (percentage >= 85) return '#14b8a6' // 85–89: Cyan / Teal
  if (percentage >= 80) return '#3b82f6' // 80–84: Blue
  if (percentage >= 75) return '#a855f7' // 75–79: Purple
  if (percentage >= 70) return '#f97316' // 70–74: Orange
  if (percentage >= 50) return '#eab308' // 50–69: Yellow (extended)
  return '#ef4444' // below 50: Red (extended)
}

const skills = [
  // Video Editing
  {
    name: 'CapCut',
    percentage: 90,
    category: 'Video Editing',
    slug: 'capcut',
    color: '#18c795',
  },

  // Graphic Design
  {
    name: 'Canva',
    percentage: 95,
    category: 'Graphic Design',
    slug: 'canva',
    color: '#00c4cc',
  },
  {
    name: 'Adobe Photoshop',
    percentage: 30,
    category: 'Graphic Design',
    slug: 'adobephotoshop',
    color: '#31a8ff',
  },
  {
    name: 'Adobe Illustrator',
    percentage: 25,
    category: 'Graphic Design',
    slug: 'adobeillustrator',
    color: '#ff9a00',
  },
  {
    name: 'Adobe Lightroom',
    percentage: 80,
    category: 'Graphic Design',
    slug: 'adobelightroom',
    color: '#31a8ff',
  },

  // Digital Marketing
  {
    name: 'Meta Business Suite',
    percentage: 95,
    category: 'Digital Marketing',
    slug: 'meta',
    color: '#0866ff',
  },
  {
    name: 'TikTok Business Suite',
    percentage: 90,
    category: 'Digital Marketing',
    slug: 'tiktok',
    color: '#25f4ee',
  },
  {
    name: 'Google Analytics',
    percentage: 90,
    category: 'Digital Marketing',
    slug: 'googleanalytics',
    color: '#e37400',
  },
  {
    name: 'Google Search Console',
    percentage: 90,
    category: 'Digital Marketing',
    slug: 'googlesearchconsole',
    color: '#458cf5',
  },
  {
    name: 'Google Tag Manager',
    percentage: 85,
    category: 'Digital Marketing',
    slug: 'googletagmanager',
    color: '#246fdb',
  },
  {
    name: 'SEMrush',
    percentage: 80,
    category: 'Digital Marketing',
    slug: 'semrush',
    color: '#ff642d',
  },

  // PPC
  {
    name: 'Google Ads',
    percentage: 80,
    category: 'PPC',
    slug: 'googleads',
    color: '#4285f4',
  },
  {
    name: 'Meta Ads',
    percentage: 95,
    category: 'PPC',
    slug: 'meta',
    color: '#0866ff',
  },
  {
    name: 'TikTok Ads',
    percentage: 90,
    category: 'PPC',
    slug: 'tiktok',
    color: '#fe2c55',
  },

  // Business Solutions
  {
    name: 'Zoho CRM',
    percentage: 60,
    category: 'Business Solutions',
    slug: 'zoho',
    color: '#e42527',
  },
  {
    name: 'Zoho Campaign',
    percentage: 75,
    category: 'Business Solutions',
    slug: 'zoho',
    color: '#e42527',
  },

  // Web Development
  {
    name: 'WordPress',
    percentage: 90,
    category: 'Web Development',
    slug: 'wordpress',
    color: '#21759b',
  },
  {
    name: 'Visual Studio Code',
    percentage: 20,
    category: 'Web Development',
    slug: 'visualstudiocode',
    color: '#007acc',
  },

  // AI Tools
  {
    name: 'ChatGPT',
    percentage: 90,
    category: 'AI Tools',
    slug: 'openai',
    color: '#74aa9c',
  },
  {
    name: 'Gemini',
    percentage: 85,
    category: 'AI Tools',
    slug: 'googlegemini',
    color: '#8e75b2',
  },
  {
    name: 'Claude.ai',
    percentage: 90,
    category: 'AI Tools',
    slug: 'claude',
    color: '#d97757',
  },
]

const categories = [
  'All Skills',
  'Video Editing',
  'Graphic Design',
  'Digital Marketing',
  'PPC',
  'Business Solutions',
  'Web Development',
  'AI Tools',
]

// How many cards render fully sharp before the preview-blur kicks in
// (3 columns x 3 rows = 9) — desktop only.
const SHARP_COUNT = 9

// Mobile "All Skills" view: a much shorter teaser instead of the full
// list — MOBILE_SHARP_COUNT clear cards, then the rest of
// MOBILE_TOTAL_COUNT rendered progressively blurred.
const MOBILE_BREAKPOINT = 650
const MOBILE_TOTAL_COUNT = 5
const MOBILE_SHARP_COUNT = 2

// Cap the entrance stagger so long lists don't feel sluggish
const MAX_STAGGER_INDEX = 8
const STAGGER_STEP = 0.035

// Fisher–Yates shuffle — used to pick a random 5-tool sample for the
// mobile "All Skills" teaser.
function shuffleArray(array) {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

// Tracks whether the viewport is at/below the mobile breakpoint.
function useIsMobile(breakpoint) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth <= breakpoint
      : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${breakpoint}px)`
    )

    const handleChange = (event) => setIsMobile(event.matches)

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () =>
      mediaQuery.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isMobile
}

function SkillIcon({ skill }) {
  return (
    <div className="tech-skill-icon">
      <img
        src={getIconSrc(skill.name)}
        alt=""
        loading="lazy"
      />
    </div>
  )
}

function SkillCard({ skill, index, previewLevel = 0 }) {
  const isPreview = previewLevel > 0
  const delay = Math.min(index, MAX_STAGGER_INDEX) * STAGGER_STEP
  const tierColor = getTierColor(skill.percentage)

  return (
    <motion.article
      className={
        isPreview
          ? `tech-skill-card tech-skill-preview level-${previewLevel}`
          : 'tech-skill-card'
      }
      aria-hidden={isPreview ? true : undefined}
      layout
      initial={{
        opacity: 0,
        y: 14,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="tech-skill-card-top">

        <SkillIcon skill={skill} />

        <div className="tech-skill-info">
          <div className="tech-skill-name-row">
            <span className="tech-skill-name">
              {skill.name}
            </span>

            <span
              className="tech-skill-percentage"
              style={{ color: tierColor }}
            >
              {skill.percentage}%
            </span>
          </div>

          <div className="tech-progress-track">
            <motion.div
              className="tech-progress-fill"
              style={{
                background: tierColor,
              }}
              initial={{
                width: 0,
              }}
              animate={{
                width: `${skill.percentage}%`,
              }}
              transition={{
                duration: 0.7,
                delay: delay + 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>

      </div>
    </motion.article>
  )
}

export default function Tools() {
  const [activeCategory, setActiveCategory] =
    useState('All Skills')

  const isAllSkills = activeCategory === 'All Skills'
  const isMobile = useIsMobile(MOBILE_BREAKPOINT)

  // Picked once per visit (not reshuffled on every render/filter
  // change) so the teaser doesn't jump around while someone's
  // looking at it.
  const [mobileTeaserSkills] = useState(() =>
    shuffleArray(skills).slice(0, MOBILE_TOTAL_COUNT)
  )

  const showMobileTeaser = isAllSkills && isMobile

  const filteredSkills = isAllSkills
    ? skills
    : skills.filter(
        (skill) => skill.category === activeCategory
      )

  const displaySkills = showMobileTeaser
    ? mobileTeaserSkills
    : filteredSkills

  return (
    <section
      className="tech-stack-section"
      id="tools"
    >
      <div className="container tech-stack-container">

        {/* Heading */}
        <motion.div
          className="tech-stack-heading"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <h2>
            Tech Stack &amp; <span>Proficiency</span>
          </h2>

          <div className="tech-stack-heading-line" />

          <p>
            Master Tools Across Creative, Design &amp;
            Business Solutions
          </p>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          className="tech-filter-buttons"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? 'tech-filter-btn active'
                  : 'tech-filter-btn'
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid — grid itself stays mounted across category
            switches; only the cards inside animate in/out, so
            switching tabs reflows smoothly instead of the whole
            section fading to black. */}
        <motion.div
          className={
            isAllSkills
              ? 'tech-skills-grid-wrapper has-preview'
              : 'tech-skills-grid-wrapper'
          }
          layout
        >
          <motion.div className="tech-skills-grid" layout>
            <AnimatePresence mode="popLayout">
              {displaySkills.map((skill, index) => {
                let previewLevel = 0

                if (showMobileTeaser) {
                  // Mobile "All Skills": first MOBILE_SHARP_COUNT
                  // cards are sharp, the rest blur progressively.
                  if (index >= MOBILE_SHARP_COUNT) {
                    previewLevel = Math.min(
                      index - MOBILE_SHARP_COUNT + 1,
                      3
                    )
                  }
                } else if (isAllSkills && index >= SHARP_COUNT) {
                  previewLevel = Math.min(
                    Math.floor((index - SHARP_COUNT) / 3) + 1,
                    4
                  )
                }

                return (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                    previewLevel={previewLevel}
                  />
                )
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}