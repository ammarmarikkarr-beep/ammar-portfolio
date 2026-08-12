import { useState } from 'react'
import './Contact.css'

const SERVICES = [
  'SEO',
  'SEM (Paid Ads)',
  'Web Designing',
  'Video Editing',
  'SMM (Social Media Marketing)',
  'AI Automation',
]

export default function Contact() {
  const [services, setServices] = useState([])

  const toggleService = (service) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    )
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">

        <h2 className="contact-heading">
          Let's Work Together
        </h2>

        <form
          action="https://formspree.io/f/myegjwjd"
          method="POST"
          className="contact-form"
        >

          {/* Full Name */}
          <div className="form-field">
            <label htmlFor="name">
              Full Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">
              Email Address *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
            />
          </div>

          {/* Services */}
          <div className="form-field">
            <label>
              Which services do you need from me? *
            </label>

            <div className="service-chips">
              {SERVICES.map((service) => (
                <button
                  type="button"
                  key={service}
                  className={`service-chip ${
                    services.includes(service) ? 'active' : ''
                  }`}
                  onClick={() => toggleService(service)}
                >
                  <span className="service-checkbox"></span>
                  <span>{service}</span>
                </button>
              ))}
            </div>

            {/* Send selected services to Formspree */}
            <input
              type="hidden"
              name="services"
              value={services.join(', ')}
            />
          </div>

          {/* Message */}
          <div className="form-field">
            <label htmlFor="message">
              Message *
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project, goals, or requirements..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="contact-submit"
          >
            Send Message&nbsp; ➤
          </button>

        </form>
      </div>
    </section>
  )
}