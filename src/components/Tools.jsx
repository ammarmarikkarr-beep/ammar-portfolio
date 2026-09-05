import './Tools.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// All icons are local JPEGs at /public/images/icons/{Tool Name}.jpeg —
// filename matches the tool's display name exactly, including spaces.
function getIconSrc(name) {
  return `/images/icons/${encodeURIComponent(name)}.jpeg`
}

// Proficiency tiers — one color function drives both the % label and
// the progress-bar fill, so a card's color always reflects skill level
// rather than the tool's brand color.
function getTierColor(percentage) {
  if (percentage >= 90) return '#22c55e' // Strong / Expert
  if (percentage >= 80) return '#4ade80' // Advanced
  if (percentage >= 60) return '#eab308' // Good
  if (percentage >= 40) return '#f97316' // Intermediate
  return '#ef4444' // Basic
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
    percentage: 95,
    category: 'Digital Marketing',
    slug: 'googlesearchconsole',
    color: '#458cf5',
  },
  {
    name: 'Google Tag Manager',
    percentage: 90,
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
// (3 columns x 3 rows = 9)
const SHARP_COUNT = 9

// Cap the entrance stagger so long lists don't feel sluggish
const MAX_STAGGER_INDEX = 8
const STAGGER_STEP = 0.035

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

  const filteredSkills = isAllSkills
    ? skills
    : skills.filter(
        (skill) => skill.category === activeCategory
      )

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
              {filteredSkills.map((skill, index) => {
                let previewLevel = 0

                if (isAllSkills && index >= SHARP_COUNT) {
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