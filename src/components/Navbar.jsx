import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Tech Stack', href: '#tools' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const scrollLockRef = useRef(false)
  const scrollTimerRef = useRef(null)

  const updateActiveSection = () => {
    if (scrollLockRef.current) return

    setIsScrolled(window.scrollY > 20)

    if (window.scrollY < 220) {
      setActiveLink('#home')
      return
    }

    const scrollPosition = window.scrollY + 160
    let currentSection = '#home'

    NAV_LINKS.forEach((link) => {
      if (link.href === '#home') return

      const sectionId = link.href.replace('#', '')
      const section = document.getElementById(sectionId)

      if (section && scrollPosition >= section.offsetTop) {
        currentSection = link.href
      }
    })

    setActiveLink(currentSection)
  }

  useEffect(() => {
    updateActiveSection()

    window.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveSection)

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }
    }
  }, [])

  const scrollToSection = (event, href) => {
    event.preventDefault()

    setIsOpen(false)
    setActiveLink(href)

    scrollLockRef.current = true

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduceMotion ? 'auto' : 'smooth'

    if (href === '#home') {
      window.scrollTo({
        top: 0,
        behavior,
      })
    } else {
      const sectionId = href.replace('#', '')
      const section = document.getElementById(sectionId)

      if (section) {
        const headerOffset = window.innerWidth <= 768 ? 105 : 125
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const targetPosition = sectionTop - headerOffset

        window.scrollTo({
          top: targetPosition,
          behavior,
        })
      }
    }

    scrollTimerRef.current = setTimeout(() => {
      scrollLockRef.current = false
      updateActiveSection()
    }, 900)
  }

  return (
    <header className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-shell">
        <div className="nav-inner">
          <a
            href="#home"
            className="nav-brand"
            onClick={(event) => scrollToSection(event, '#home')}
          >
            Ammar Marikkar
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => scrollToSection(event, link.href)}
                className={activeLink === link.href ? 'active' : ''}
              >
                <span className="nav-label">{link.label}</span>
              </a>
            ))}
          </nav>

          <button
            className={`nav-burger ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`nav-mobile ${isOpen ? 'open' : ''}`} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToSection(event, link.href)}
              className={activeLink === link.href ? 'active' : ''}
            >
              <span className="nav-label">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
