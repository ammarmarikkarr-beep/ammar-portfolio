import './About.css'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">

        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="title-line"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        ></motion.div>

        <motion.div
          className="about-container"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* LEFT SIDE */}
          <div className="about-left">

            {/* Journey */}
            <motion.div
              className="about-card"
              variants={fadeUp}
            >
              <h3>
                <span className="about-icon">💡</span>
                My Journey
              </h3>

              <p>
                With over 3 years of experience in digital marketing and content creation,
                I help brands build their online presence through creative strategies,
                data-driven campaigns, and engaging content.

                <br /><br />

                From developing brand identities to executing digital campaigns,
                I combine creativity and analytics to deliver measurable results.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              className="about-card"
              variants={fadeUp}
            >
              <h3>
                <span className="about-icon">♥</span>
                My Values
              </h3>

              <p>
                I believe in creativity, consistency, and data-driven decision making.
                Every project is an opportunity to create meaningful connections
                between brands and audiences while delivering real business growth.
              </p>
            </motion.div>

            {/* Specialties */}
            <motion.div
              className="about-card"
              variants={fadeUp}
            >
              <h3>
                <span className="about-icon">★</span>
                My Specialties
              </h3>

              <ul>
                <li>Search Engine Optimization (SEO)</li>
                <li>Social Media Marketing & Strategy</li>
                <li>Content Creation & Marketing</li>
                <li>Digital Advertising (Google Ads & Meta Ads)</li>
                <li>Brand Strategy</li>
                <li>Analytics & Performance Reporting</li>
              </ul>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <motion.div
            className="stats-card"
            variants={fadeUp}
          >

            <div className="stat">
              <h2>15+</h2>
              <p>Projects Completed</p>
            </div>

            <div className="stat">
              <h2>10+</h2>
              <p>Happy Clients</p>
            </div>

            <div className="stat">
              <h2>3+</h2>
              <p>Years Experience</p>
            </div>

            <div className="stat">
              <h2>70%</h2>
              <p>Average Growth</p>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
