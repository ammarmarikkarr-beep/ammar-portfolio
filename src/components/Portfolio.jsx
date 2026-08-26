import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

import './Portfolio.css'

/*
  PLACEHOLDER CONTENT NOTICE:
  Every stat below (percentages, counts, etc.) is a clearly-marked
  placeholder — swap in your real numbers before this goes live.
  Image paths point at /images/portfolio/... — drop matching files
  into public/images/portfolio/ or update the paths.
*/

const filters = [
  'All',
  'Web Development',
  'Digital Marketing',
  'SEO',
  'Social Media',
  'Branding',
]

const projects = [
  {
    slug: 'business-website-redesign',
    image: '/images/portfolio/web-redesign.jpg',
    categories: ['Web Development'],
    badge: 'Web Dev',
    title: 'Business Website Redesign',
    subtitle: 'Full-Stack Rebuild',
    description:
      'Rebuilt a client site from the ground up — modern layout, faster load times, and a CMS the client can actually manage.',
    stats: [
      { label: 'Load Time', value: 'Add %' },
      { label: 'Pages Built', value: 'Add #' },
      { label: 'Timeline', value: 'Add wks' },
    ],
    tags: ['React', 'Responsive Design', 'CMS Setup'],
    link: '#',
  },
  {
    slug: 'landing-page-conversion',
    image: '/images/portfolio/landing-page.jpg',
    categories: ['Web Development', 'Digital Marketing'],
    badge: 'Web Dev',
    title: 'High-Converting Landing Page',
    subtitle: 'Campaign Landing Page',
    description:
      'Designed and built a dedicated landing page to support a paid ad campaign, focused on speed and clear conversion paths.',
    stats: [
      { label: 'Conversion Rate', value: 'Add %' },
      { label: 'Bounce Rate', value: 'Add %' },
      { label: 'Build Time', value: 'Add days' },
    ],
    tags: ['Landing Page', 'A/B Testing', 'UX Copy'],
    link: '#',
  },
  {
    slug: 'full-stack-seo',
    image: '/images/portfolio/seo-audit.jpg',
    categories: ['SEO', 'Digital Marketing'],
    badge: 'SEO',
    title: 'Full-Stack SEO Campaign',
    subtitle: 'Search Engine Optimization',
    description:
      'End-to-end SEO strategy covering on-page, off-page, and technical fixes across several client accounts.',
    stats: [
      { label: 'Organic Traffic', value: 'Add %' },
      { label: 'Keywords Ranked', value: 'Add #' },
      { label: 'Timeline', value: 'Add mo' },
    ],
    tags: ['On-Page SEO', 'Technical SEO', 'Link Building'],
    link: '#',
  },
  {
    slug: 'google-ads-campaign',
    image: '/images/portfolio/google-ads.jpg',
    categories: ['Digital Marketing'],
    badge: 'Paid Ads',
    title: 'Google Ads Campaign',
    subtitle: 'Search Engine Marketing',
    description:
      'Planned and ran Google Ads campaigns focused on transactional and commercial-intent keywords, with ongoing bid and budget optimization.',
    stats: [
      { label: 'ROAS', value: 'Add x' },
      { label: 'Leads Generated', value: 'Add #' },
      { label: 'CPA Reduced', value: 'Add %' },
    ],
    tags: ['Search Ads', 'A/B Testing', 'Bid Strategy'],
    link: '#',
  },
  {
    slug: 'meta-ads-optimization',
    image: '/images/portfolio/meta-ads.jpg',
    categories: ['Digital Marketing', 'Social Media'],
    badge: 'Paid Ads',
    title: 'Meta Ads Optimization',
    subtitle: 'Social Advertising',
    description:
      'Ran Meta (Facebook and Instagram) ad campaigns with audience segmentation and creative testing to improve efficiency.',
    stats: [
      { label: 'CPA Change', value: 'Add %' },
      { label: 'ROAS', value: 'Add x' },
      { label: 'Conversions', value: 'Add #' },
    ],
    tags: ['Meta Ads', 'Audience Targeting', 'Creative Testing'],
    link: '#',
  },
  {
    slug: 'instagram-growth',
    image: '/images/portfolio/instagram-growth.jpg',
    categories: ['Social Media'],
    badge: 'Social',
    title: 'Instagram Growth Strategy',
    subtitle: 'Organic Social Growth',
    description:
      'Built a content and engagement strategy to grow an account\u2019s following and improve engagement rate over time.',
    stats: [
      { label: 'Follower Growth', value: 'Add #' },
      { label: 'Engagement Rate', value: 'Add %' },
      { label: 'Timeline', value: 'Add mo' },
    ],
    tags: ['Content Strategy', 'Community Management', 'Analytics'],
    link: '#',
  },
  {
    slug: 'content-marketing-strategy',
    image: '/images/portfolio/content-strategy.jpg',
    categories: ['Digital Marketing'],
    badge: 'Content',
    title: 'Content Marketing Strategy',
    subtitle: 'Strategic Content Creation',
    description:
      'Planned a content calendar and editorial workflow to support organic reach and brand authority across channels.',
    stats: [
      { label: 'Content Pieces', value: 'Add #' },
      { label: 'Monthly Reach', value: 'Add #' },
      { label: 'Topics Covered', value: 'Add #' },
    ],
    tags: ['Blog Strategy', 'SEO Writing', 'Editorial Calendar'],
    link: '#',
  },
  {
    slug: 'brand-identity-design',
    image: '/images/portfolio/brand-identity.jpg',
    categories: ['Branding'],
    badge: 'Branding',
    title: 'Brand Identity & Logo Design',
    subtitle: 'Visual Identity System',
    description:
      'Designed a logo and lightweight brand guideline covering colors, typography, and usage rules for consistent application.',
    stats: [
      { label: 'Logo Concepts', value: 'Add #' },
      { label: 'Brand Assets', value: 'Add #' },
      { label: 'Client Approval', value: 'Add %' },
    ],
    tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
    link: '#',
  },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter))

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
            {filters.map((filter) => (
              <button
                key={filter}
                className={`portfolio-filter${
                  activeFilter === filter ? ' active' : ''
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
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
                      {project.badge}
                    </span>
                  </div>

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
                      {project.description}
                    </p>

                    <div className="portfolio-card-tags">
                      {project.tags.map((tag) => (
                        <span className="portfolio-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.link && project.link !== '#' ? (
                      <a
                        className="portfolio-card-cta"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website →
                      </a>
                    ) : (
                      <Link
                        className="portfolio-card-cta"
                        to={`/portfolio/${project.slug}`}
                      >
                        View Project →
                      </Link>
                    )}
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