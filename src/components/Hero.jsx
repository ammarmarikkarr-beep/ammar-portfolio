import './Hero.css'
import { motion } from 'framer-motion'

const containerAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemAnimation = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(6px)',
  },

  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Lightweight animated background */}
      <div className="hero-background" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
        <span className="hero-orb hero-orb-three" />
      </div>

      {/* Dark overlay keeps the text readable */}
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-container">
        <motion.div
          className="hero-left"
          variants={containerAnimation}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="hero-eyebrow"
            variants={itemAnimation}
          >
            Digital Marketer &amp; Content Creator
          </motion.p>

          <motion.h1
            className="hero-title"
            variants={itemAnimation}
          >
            Elevate Your
            <span>Digital Presence</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            variants={itemAnimation}
          >
            I help brands grow through data-driven strategies,
            compelling content, and creative campaigns that
            deliver real results.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={itemAnimation}
          >
            <motion.a
              href="#portfolio"
              className="btn hero-btn-primary"
              whileHover={{
                y: -3,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>View My Work</span>
              <span aria-hidden="true">→</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="btn hero-btn-glass"
              whileHover={{
                y: -3,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>Let&apos;s Connect</span>
              <span aria-hidden="true">✉</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}