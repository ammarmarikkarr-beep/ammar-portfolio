import './Skills.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Only show this many cards sharp (3 rows x 3 cols) — everything after
// this is rendered permanently blurred, no toggle/button.
const VISIBLE_COUNT = 9

// Icons we host locally in /public/images/icons/{slug}.svg
// (Canva, CapCut, Adobe apps, VS Code, OpenAI dropped their icons from
// simple-icons at their own request, so those still fall back to the CDN.)
const LOCAL_ICON_SLUGS = new Set([
  'meta',
  'tiktok',
  'googleads',
  'googleanalytics',
  'googlesearchconsole',
  'googletagmanager',
  'semrush',
  'zoho',
  'wordpress',
  'googlegemini',
  'claude',
])

function getIconUrl(slug, color) {
  if (LOCAL_ICON_SLUGS.has(slug)) {
    return `/images/icons/${slug}.svg`
  }
  const hex = color.replace('#', '')
  return `https://cdn.simpleicons.org/${slug}/${hex}`
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
    color: '#3df5ff',
  },

  // Digital Marketing
  {
    name: 'Meta Business Suite',
    percentage: 85,
    category: 'Digital Marketing',
    slug: 'meta',
    color: '#0866ff',
  },
  {
    name: 'TikTok Business Suite',
    percentage: 85,
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
    percentage: 85,
    category: 'Digital Marketing',
    slug: 'googlesearchconsole',
    color: '#458cf5',
  },
  {
    name: 'Google Tag Manager',
    percentage: 80,
    category: 'Digital Marketing',
    slug: 'googletagmanager',
    color: '#246fdb',
  },
  {
    name: 'SEMrush',
    percentage: 70,
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
    percentage: 80,
    category: 'PPC',
    slug: 'tiktok',
    color: '#fe2c55',
  },

  // Business Solutions
  {
    name: 'Zoho CRM',
    percentage: 50,
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
    percentage: 80,
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
    percentage: 80,
    category: 'AI Tools',
    slug: 'googlegemini',
    color: '#8e75b2',
  },
  {
    name: 'Claude.ai',
    percentage: 85,
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

function SkillIcon({ skill }) {
  return (
    <div className="tech-skill-icon">
      <img
        src={getIconUrl(skill.slug, skill.color)}
        alt=""
        loading="lazy"
      />
    </div>
  )
}

function SkillCard({ skill, index }) {
  return (
    <motion.article
      className="tech-skill-card"
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
      }}
    >
      <div className="tech-skill-card-top">

        <SkillIcon skill={skill} />

        <div className="tech-skill-info">
          <div className="tech-skill-name-row">
            <span className="tech-skill-name">
              {skill.name}
            </span>

            <span className="tech-skill-percentage">
              {skill.percentage}%
            </span>
          </div>

          <div className="tech-progress-track">
            <motion.div
              className="tech-progress-fill"
              style={{
                background: skill.color,
              }}
              initial={{
                width: 0,
              }}
              whileInView={{
                width: `${skill.percentage}%`,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 1,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>

      </div>
    </motion.article>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] =
    useState('All Skills')

  // No more "view all" expand state — extra rows are always blurred.

  const filteredSkills =
    activeCategory === 'All Skills'
      ? skills
      : skills.filter(
          (skill) =>
            skill.category === activeCategory
        )

  const visibleSkills = filteredSkills.slice(0, VISIBLE_COUNT)
  const extraSkills = filteredSkills.slice(VISIBLE_COUNT)
  const hasExtra = extraSkills.length > 0

  return (
    <section
      className="tech-stack-section"
      id="skills"
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

        {/* Skills Grid - first 9, always sharp (3 rows x 3 cols) */}
        <motion.div
          className="tech-skills-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Extra rows - permanently blurred, decorative only, no button */}
        {hasExtra && (
          <div className="tech-skills-extra-wrapper">
            <motion.div
              className="tech-skills-grid tech-skills-grid-blurred"
              layout
            >
              <AnimatePresence mode="popLayout">
                {extraSkills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="tech-skills-fade" />
          </div>
        )}

      </div>
    </section>
  )
}