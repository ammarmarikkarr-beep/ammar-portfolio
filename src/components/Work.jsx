import {
  AnimatePresence,
  motion,
} from 'framer-motion'

import {
  Link,
  useSearchParams,
} from 'react-router-dom'

import {
  categories,
  projects,
} from '../data/projects.js'

import './Work.css'

export default function Work() {
  const [
    searchParameters,
    setSearchParameters,
  ] = useSearchParams()

  const requestedCategory =
    searchParameters.get('category')

  const validCategory =
    categories.some(
      category =>
        category.value === requestedCategory
    )

  const activeCategory =
    validCategory
      ? requestedCategory
      : 'all'

  const filteredProjects =
  activeCategory === 'all'
    ? projects.filter(
        project => project.featured === true
      )
    : projects
        .filter(
          project =>
            project.category === activeCategory
        )
        .slice(0, 2)

  const changeCategory = category => {
    if (category === 'all') {
      setSearchParameters({})
    } else {
      setSearchParameters({
        category,
      })
    }
  }

  return (
    <section
      className="work-section"
      id="portfolio"
    >
      <div className="container work-container">
        <motion.div
          className="work-heading"
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
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="work-eyebrow">
            Selected Work
          </p>

          <h2>My Portfolio</h2>

          <span
            className="work-title-line"
            aria-hidden="true"
          />
        </motion.div>

        <div className="work-filters">
          {categories.map(category => (
            <button
              type="button"
              key={category.value}
              className={
                activeCategory === category.value
                  ? 'work-filter active'
                  : 'work-filter'
              }
              onClick={() =>
                changeCategory(category.value)
              }
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          className="work-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <motion.article
                className="work-card"
                key={project.id}
                layout
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 15,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                className="work-card-link"
                to={
                  activeCategory === 'all'
                  ? `/?category=${project.category}#portfolio`
                  : `/portfolio/${project.slug}`
                }
                aria-label={
                  activeCategory === 'all'
                  ? `View ${project.categoryLabel} projects`
                  : `View full details for ${project.title}`
                  }
>
                >
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                  />

                  <span className="work-card-badge">
                    {project.categoryLabel}
                  </span>

                  <span className="work-card-overlay">
                    <span className="work-card-category">
                      {project.subtitle}
                    </span>

                    <strong>
                      {project.title}
                    </strong>

                    <span className="work-view-project">
                      {activeCategory === 'all'
                      ? `View ${project.categoryLabel} Projects`
                      : 'View Full Details'}
                      <span aria-hidden="true">
                        →
                        </span>
                        </span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}