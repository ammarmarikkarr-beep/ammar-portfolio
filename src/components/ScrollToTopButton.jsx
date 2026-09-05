import "./ScrollToTopButton.css";import "./ScrollToTopButton.css";import "./ScrollToTopButton.css";import { useEffect, useState } from 'react'

import './ScrollToTopButton.css'

// Button appears once the page has been scrolled down this far.
const SHOW_AFTER_PX = 300

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    // Scrolls to the top of whatever page is currently open —
    // it doesn't navigate anywhere.
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      className={`scroll-top-button${
        visible ? ' visible' : ''
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}