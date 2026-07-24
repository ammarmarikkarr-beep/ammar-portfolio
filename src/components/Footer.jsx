import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Ammar Marikkar. All rights reserved.</span>
        <div className="footer-links">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="mailto:hello@ammarmarikkar.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
