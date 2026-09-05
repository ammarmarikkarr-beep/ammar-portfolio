import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'

import { categories, projects } from '../data/projects'

import './Portfolio.css'

function PortfolioCardCarousel({ images, categoryLabel }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  const goPrev = (e) => {
    e.stopPropagation()
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  const goNext = (e) => {
    e.stopPropagation()
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="portfolio-card-media">
      <span className="portfolio-card-badge">{categoryLabel}</span>

      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="portfolio-card-arrow portfolio-card-arrow-left"
            onClick={goPrev}
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            type="button"
            className="portfolio-card-arrow portfolio-card-arrow-right"
            onClick={goNext}
            aria-label="Next image"
          >
            ›
          </button>

          <div className="portfolio-card-dots">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                className={`portfolio-card-dot${i === index ? ' active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setIndex(i)
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Portfolio() {
  const [searchParams] = useSearchParams()

  // If arriving as /portfolio?category=seo (etc.), open already
  // filtered to that category — otherwise default to "All Projects".
  const categoryFromUrl = searchParams.get('category')
  const initialFilter = categories.some(
    (cat) => cat.value === categoryFromUrl
  )
    ? categoryFromUrl
    : 'all'

  const [activeFilter, setActiveFilter] = useState(initialFilter)

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
                  <PortfolioCardCarousel
                    images={project.gallery}
                    categoryLabel={project.categoryLabel}
                  />

                  <div className="portfolio-card-body">
                    <h3>{project.title}</h3>
                    <p className="portfolio-card-subtitle">
                      {project.subtitle}
                    </p>

                    <div className="portfolio-card-stats">
                      {project.stats.map((stat) => (
                        <div className="portfolio-stat" key={stat.label}>
                          <span className="portfolio-stat-label">
                            {stat.label}
                          </span>
                          <span className="portfolio-stat-value">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="portfolio-card-description">
                      {project.summary}
                    </p>

                    <div className="portfolio-card-tags">
                      {project.tags.map((tag) => (
                        <span className="portfolio-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
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