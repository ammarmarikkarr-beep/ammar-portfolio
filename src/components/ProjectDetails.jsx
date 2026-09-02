import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { projects } from '../data/projects'

import './ProjectDetails.css'

function ProjectCarousel({ images, title, categoryLabel }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  const goPrev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1))

  const goNext = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="project-detail-carousel">
      {hasMultiple && (
        <button
          type="button"
          className="project-detail-carousel-arrow project-detail-carousel-arrow-left"
          onClick={goPrev}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <div className="project-detail-carousel-frame">
        <span className="project-detail-carousel-badge">
          {categoryLabel}
        </span>

        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${title} screenshot ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      {hasMultiple && (
        <button
          type="button"
          className="project-detail-carousel-arrow project-detail-carousel-arrow-right"
          onClick={goNext}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {hasMultiple && (
        <div className="project-detail-carousel-dots">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              className={`project-detail-carousel-dot${
                i === index ? ' active' : ''
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectDetails() {
  const { slug } = useParams()

  const project = projects.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!project) {
    return (
      <main className="project-not-found">
        <h1>Project not found</h1>

        <Link to="/portfolio">Return to Portfolio</Link>
      </main>
    )
  }

  return (
    <main className="project-detail-page">
      <nav className="project-detail-navigation">
        <Link className="project-detail-brand" to="/">
          Ammar Marikkar
        </Link>

        <Link
          className="project-detail-back"
          to={`/portfolio?category=${project.category}`}
        >
          ← Back to {project.categoryLabel}
        </Link>
      </nav>

      <motion.header
        className="project-detail-hero"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="project-detail-category">
          {project.categoryLabel}
        </span>

        <h1>{project.title}</h1>

        <p className="project-detail-subtitle">{project.subtitle}</p>

        <p className="project-detail-summary">{project.summary}</p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <ProjectCarousel
          images={project.gallery}
          title={project.title}
          categoryLabel={project.categoryLabel}
        />
      </motion.section>

      <section className="project-detail-content">
        <article className="project-detail-overview">
          <p className="project-detail-label">Project Overview</p>

          <h2>About the project</h2>

          <p>{project.overview}</p>
        </article>

        <aside className="project-detail-services">
          <p className="project-detail-label">Work Included</p>

          <ul>
            {project.services.map((service) => (
              <li key={service}>
                <span aria-hidden="true">✓</span>
                {service}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="project-detail-tools">
        <p className="project-detail-label">Tools and Platforms</p>

        <div className="project-detail-tool-list">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      <section className="project-detail-cta">
        <h2>Have a similar project?</h2>

        <p>
          Let's discuss how I can help with your digital marketing
          requirements.
        </p>

        <Link to="/#contact">
          Start Your Project
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  )
}