import {
  useEffect,
} from 'react'

import {
  Link,
  useParams,
} from 'react-router-dom'

import {
  motion,
} from 'framer-motion'

import './ProjectDetails.css'

import './ProjectDetails.css'

export default function ProjectDetails() {
  const { slug } = useParams()

  const project =
    projects.find(
      item => item.slug === slug
    )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [slug])

  if (!project) {
    return (
      <main className="project-not-found">
        <h1>Project not found</h1>

        <Link to="/#portfolio">
          Return to Portfolio
        </Link>
      </main>
    )
  }

  return (
    <main className="project-detail-page">
      <nav className="project-detail-navigation">
        <Link
          className="project-detail-brand"
          to="/"
        >
          Ammar Marikkar
        </Link>

        <Link
          className="project-detail-back"
          to={`/?category=${project.category}#portfolio`}
        >
          ← Back to {project.categoryLabel}
        </Link>
      </nav>

      <motion.header
        className="project-detail-hero"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="project-detail-category">
          {project.categoryLabel}
        </span>

        <h1>{project.title}</h1>

        <p className="project-detail-subtitle">
          {project.subtitle}
        </p>

        <p className="project-detail-summary">
          {project.summary}
        </p>
      </motion.header>

      <motion.section
        className="project-detail-cover"
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
        }}
      >
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
        />
      </motion.section>

      <section className="project-detail-content">
        <article className="project-detail-overview">
          <p className="project-detail-label">
            Project Overview
          </p>

          <h2>About the project</h2>

          <p>{project.overview}</p>
        </article>

        <aside className="project-detail-services">
          <p className="project-detail-label">
            Work Included
          </p>

          <ul>
            {project.services.map(service => (
              <li key={service}>
                <span aria-hidden="true">✓</span>
                {service}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="project-detail-tools">
        <p className="project-detail-label">
          Tools and Platforms
        </p>

        <div className="project-detail-tool-list">
          {project.tools.map(tool => (
            <span key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </section>

      <section className="project-detail-gallery">
        <div className="project-detail-gallery-heading">
          <p className="project-detail-label">
            Project Gallery
          </p>

          <h2>Full project view</h2>
        </div>

        <div className="project-detail-gallery-grid">
          {project.gallery.map(
            (image, index) => (
              <a
                key={`${image}-${index}`}
                href={image}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={image}
                  alt={`${project.title} project view ${index + 1}`}
                  loading="lazy"
                />
              </a>
            )
          )}
        </div>
      </section>

      <section className="project-detail-cta">
        <h2>
          Have a similar project?
        </h2>

        <p>
          Let’s discuss how I can help with your
          digital marketing requirements.
        </p>

        <Link to="/#contact">
          Start Your Project
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  )
}