import './Skills.css'
import { motion } from 'framer-motion'

const technicalSkills = [
  {
    name: 'SEO & SEM',
    percentage: 85,
  },
  {
    name: 'PPC',
    percentage: 80,
  },
  {
    name: 'Marketing Analytics',
    percentage: 80,
  },
  {
    name: 'Tracking & Optimization',
    percentage: 85,
  },
]

const creativeSkills = [
  {
    name: 'Content Creation',
    percentage: 85,
  },
  {
    name: 'Copywriting',
    percentage: 80,
  },
  {
    name: 'Campaign Design',
    percentage: 80,
  },
  {
    name: 'Video Editing',
    percentage: 60,
  },
]

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M8 9L5 12L8 15M16 9L19 12L16 15M14 5L10 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 3C6.9 3 3 6.6 3 11.1C3 15.5 6.5 19 10.8 19H12C12.9 19 13.4 18 12.9 17.3C12.5 16.6 13 15.8 13.8 15.8H16.2C19 15.8 21 13.8 21 11.1C21 6.6 17.1 3 12 3Z"
        fill="currentColor"
      />

      <circle cx="8" cy="10" r="1.2" fill="#111827" />
      <circle cx="11" cy="7" r="1.2" fill="#111827" />
      <circle cx="15" cy="8" r="1.2" fill="#111827" />
      <circle cx="17" cy="11" r="1.2" fill="#111827" />
    </svg>
  )
}

function SkillColumn({
  title,
  icon,
  skills,
  type,
}) {
  return (
    <motion.article
      className="skills-column"
      variants={fadeUp}
    >
      <div className="skills-column-heading">
        <span
          className={`skills-category-icon ${type}`}
          aria-hidden="true"
        >
          {icon}
        </span>

        <h3>{title}</h3>
      </div>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div
            className="skills-item"
            key={skill.name}
          >
            <div className="skills-item-information">
              <span className="skills-item-name">
                {skill.name}
              </span>

              <span className="skills-item-percentage">
                {skill.percentage}%
              </span>
            </div>

            <div
              className="skills-progress-track"
              role="progressbar"
              aria-label={skill.name}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={skill.percentage}
            >
              <motion.div
                className={`skills-progress-fill ${type}`}
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
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.article>
  )
}

export default function Skills() {
  return (
    <section
      className="skills-section"
      id="skills"
    >
      <div className="container skills-container">
        <motion.div
          className="skills-section-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <p>What I Bring</p>

          <h2>
            My <span>Skills</span>
          </h2>
        </motion.div>

        <motion.div
          className="skills-columns"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            staggerChildren: 0.18,
          }}
        >
          <SkillColumn
            title="Technical Skills"
            icon={<CodeIcon />}
            skills={technicalSkills}
            type="technical"
          />

          <SkillColumn
            title="Creative Skills"
            icon={<PaletteIcon />}
            skills={creativeSkills}
            type="creative"
          />
        </motion.div>
      </div>
    </section>
  )
}