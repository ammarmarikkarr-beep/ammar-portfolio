import { useEffect } from 'react'
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Tools from './components/Tools'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetails from './components/ProjectDetails'
import Portfolio from "./components/Portfolio";

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Tools />
      <Contact />
      <Footer />
    </>
  )
}

function PortfolioPage() {
  return (
    <>
      <Navbar />
      <Portfolio />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/portfolio"
          element={<PortfolioPage />}
        />

        <Route
          path="/portfolio/:slug"
          element={<ProjectDetails />}
        />
      </Routes>
    </>
  )
}