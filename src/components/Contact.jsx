import { useState } from 'react'
import './Contact.css'

const SERVICES = ['SEO', 'Paid Ads', 'Social Media', 'Content Creation', 'Email Marketing', 'Video Editing']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [services, setServices] = useState([])

  const toggleService = (s) => {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nServices: ${services.join(', ') || 'Not specified'}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:hello@ammarmarikkar.com?subject=Project Inquiry from ${encodeURIComponent(form.name || 'Website')}&body=${body}`
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <p className="eyebrow">Get in touch</p>
        <h2 className="contact-heading">Let's Work Together</h2>
        <p className="contact-sub">
          Have a campaign in mind, or just want to talk strategy? Send a message and I'll get back to you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-field">
            <label>Which services do you need?</label>
            <div className="service-chips">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`service-chip ${services.includes(s) ? 'active' : ''}`}
                  onClick={() => toggleService(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project..."
            />
          </div>

          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  )
}
