import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Ammar Marikkar. All rights reserved.</span>

        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/ammar-marikkar-2b941a269/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/ammar_marikkar/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          <a href="mailto:mrkikammar456@gmail.com">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}