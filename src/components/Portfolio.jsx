import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'

import { categories, projects } from '../data/projects'

import './Portfolio.css'

export default function Portfolio() {
  const [searchParams] = useSearchParams()

  // Lets links like /portfolio?category=seo (used by the
  // "Back to SEO" link on a project detail page) preselect a filter.
  const initialCategory = searchParams.get('category') || 'all'

  const [activeFilter, setActiveFilter] = useState(initialCategory)

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      {/* HERO */}
      <section className="portfolio-hero">
        <div className="container portfolio-hero-container">
          <motion.p
            className="portfolio-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My Portfolio
          </motion.h1>

          <motion.p
            className="portfolio-hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore my latest projects, case studies, and digital marketing
            campaigns.
          </motion.p>

          <motion.span
            className="portfolio-title-line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="portfolio-section" id="portfolio-projects">
        <div className="container portfolio-container">
          <div className="portfolio-filters">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`portfolio-filter${
                  activeFilter === cat.value ? ' active' : ''
                }`}
                onClick={() => setActiveFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  layout
                  className="portfolio-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="portfolio-card-media">
                    <img src={project.image} alt={project.title} />
                    <span className="portfolio-card-badge">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="portfolio-card-body">
                    <h3>{project.title}</h3>
                    <p className="portfolio-card-subtitle">
                      {project.subtitle}
                    </p>

                    <p className="portfolio-card-description">
                      {project.summary}
                    </p>

                    <Link
                      className="portfolio-card-cta"
                      to={`/portfolio/${project.slug}`}
                    >
                      View Project →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="portfolio-cta">
          <h2>Let's Work Together</h2>
          <p>
            Interested in collaborating on your next project? Let's create
            something amazing.
          </p>
          <Link to="/contact" className="portfolio-cta-button">
            Start Your Project →
          </Link>
        </div>
      </section>
    </>
  )
}