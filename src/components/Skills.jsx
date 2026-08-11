import './Skills.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const skills = [
  // Video Editing
  {
    name: 'CapCut',
    percentage: 90,
    category: 'Video Editing',
    icon: 'https://cdn.simpleicons.org/capcut/000000',
    color: '#18c795',
  },
  {
    name: 'Adobe Premiere Pro',
    percentage: 75,
    category: 'Video Editing',
    icon: 'https://cdn.simpleicons.org/adobepremierepro/000000',
    color: '#8b5cf6',
  },
  {
    name: 'DaVinci Resolve',
    percentage: 70,
    category: 'Video Editing',
    icon: 'https://cdn.simpleicons.org/davinciresolve/000000',
    color: '#06b6d4',
  },

  // Graphic Design
  {
    name: 'Canva',
    percentage: 95,
    category: 'Graphic Design',
    icon: 'https://cdn.simpleicons.org/canva/000000',
    color: '#18c795',
  },
  {
    name: 'Adobe Photoshop',
    percentage: 85,
    category: 'Graphic Design',
    icon: 'https://cdn.simpleicons.org/adobephotoshop/000000',
    color: '#0ea5e9',
  },
  {
    name: 'Adobe Illustrator',
    percentage: 80,
    category: 'Graphic Design',
    icon: 'https://cdn.simpleicons.org/adobeillustrator/000000',
    color: '#f59e0b',
  },

  // Digital Marketing
  {
    name: 'Google Ads',
    percentage: 85,
    category: 'Digital Marketing',
    icon: 'https://cdn.simpleicons.org/googleads/000000',
    color: '#4285f4',
  },
  {
    name: 'Meta Ads',
    percentage: 80,
    category: 'Digital Marketing',
    icon: 'https://cdn.simpleicons.org/meta/000000',
    color: '#6366f1',
  },
  {
    name: 'Google Analytics',
    percentage: 85,
    category: 'Digital Marketing',
    icon: 'https://cdn.simpleicons.org/googleanalytics/000000',
    color: '#f59e0b',
  },
  {
    name: 'Google Tag Manager',
    percentage: 80,
    category: 'Digital Marketing',
    icon: 'https://cdn.simpleicons.org/googletagmanager/000000',
    color: '#2563eb',
  },
  {
    name: 'Google Search Console',
    percentage: 85,
    category: 'Digital Marketing',
    icon: 'https://cdn.simpleicons.org/googlesearchconsole/000000',
    color: '#22c55e',
  },
  {
    name: 'SEMrush',
    percentage: 80,
    category: 'Digital Marketing',
    icon: 'https://cdn.simpleicons.org/semrush/000000',
    color: '#ff642d',
  },

  // Business Solutions
  {
    name: 'Zoho CRM',
    percentage: 75,
    category: 'Business Solutions',
    icon: 'https://cdn.simpleicons.org/zoho/000000',
    color: '#ef4444',
  },
  {
    name: 'Microsoft Excel',
    percentage: 80,
    category: 'Business Solutions',
    icon: 'https://cdn.simpleicons.org/microsoftexcel/000000',
    color: '#16a34a',
  },
  {
    name: 'Notion',
    percentage: 75,
    category: 'Business Solutions',
    icon: 'https://cdn.simpleicons.org/notion/000000',
    color: '#111827',
  },

  // Web Development
  {
    name: 'WordPress',
    percentage: 85,
    category: 'Web Development',
    icon: 'https://cdn.simpleicons.org/wordpress/000000',
    color: '#21759b',
  },
  {
    name: 'React',
    percentage: 65,
    category: 'Web Development',
    icon: 'https://cdn.simpleicons.org/react/000000',
    color: '#06b6d4',
  },
  {
    name: 'HTML & CSS',
    percentage: 80,
    category: 'Web Development',
    icon: 'https://cdn.simpleicons.org/html5/000000',
    color: '#f97316',
  },
]

const categories = [
  'All Skills',
  'Video Editing',
  'Graphic Design',
  'Digital Marketing',
  'Business Solutions',
  'Web Development',
]

function SkillIcon({ skill }) {
  return (
    <div className="tech-skill-icon">
      <img
        src={skill.icon}
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

  const filteredSkills =
    activeCategory === 'All Skills'
      ? skills
      : skills.filter(
          (skill) =>
            skill.category === activeCategory
        )

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

        {/* Skills Grid */}
        <motion.div
          className="tech-skills-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}