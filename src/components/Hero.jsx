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
    y: 24,
    filter: 'blur(4px)',
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

const photoAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* Animated Background Image */}
      <div className="hero-background" aria-hidden="true">
        <img
          src="/images/Hero/Background.png"
          alt=""
          className="hero-background-image"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Background Orbs */}
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-orb hero-orb-three" aria-hidden="true" />

      {/* Photo glow */}
      <div className="hero-photo-glow" aria-hidden="true" />

      {/* Dark overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* MOBILE BACKDROP PHOTO */}
      <div className="hero-mobile-person-backdrop" aria-hidden="true">
        <img
          src="/images/Hero/My%20Photo.png"
          alt=""
          className="hero-mobile-person-image"
        />
      </div>

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <motion.div
          className="hero-left"
          variants={containerAnimation}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="hero-title"
            variants={itemAnimation}
          >
            Elevate Your <span>Digital Presence</span>
          </motion.h1>

          <motion.p
            className="hero-eyebrow"
            variants={itemAnimation}
          >
            DIGITAL MARKETER &amp; CONTENT CREATOR
          </motion.p>

          <motion.p
            className="hero-sub"
            variants={itemAnimation}
          >
            I help brands grow through data-driven strategies,
            compelling content, and creative campaigns that
            deliver real results
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={itemAnimation}
          >
            <motion.a
              href="#portfolio"
              className="btn hero-btn-primary"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View My Work</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="btn hero-btn-glass"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Let&apos;s Connect</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* DESKTOP RIGHT SIDE PHOTO */}
        <motion.div
          className="hero-person"
          variants={photoAnimation}
          initial="hidden"
          animate="show"
        >
          <img
            src="/images/Hero/My%20Photo.png"
            alt="Manoj Lakpriya"
            className="hero-person-image"
          />
        </motion.div>

      </div>
    </section>
  )
}