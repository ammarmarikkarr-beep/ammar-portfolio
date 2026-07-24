import './Tools.css'

const TOOLS = [
  'Google Ads', 'Meta Business Suite', 'Google Analytics', 'Google Search Console',
  'Google Tag Manager', 'SEMrush', 'Canva', 'Adobe Photoshop', 'Adobe Premiere Pro',
  'CapCut', 'Mailchimp', 'WordPress', 'Zapier', 'Notion',
]

export default function Tools() {
  return (
    <section id="tools" className="section tools">
      <div className="container">
        <p className="eyebrow">Toolkit</p>
        <h2 className="tools-heading">Tools I Work With</h2>
        <p className="tools-sub">
          The platforms and software I use daily to plan, execute, and measure campaigns.
        </p>

        <div className="tools-grid">
          {TOOLS.map((t) => (
            <div className="tool-pill" key={t}>{t}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
