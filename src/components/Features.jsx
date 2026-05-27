import './Features.css'

const features = [
  {
    id: 'feat-fresh',
    icon: '🌿',
    title: 'Farm-Fresh Guaranteed',
    desc: 'All produce sourced directly from local farms and delivered fresh within 24 hours of harvest.',
    color: '#dcfce7',
    accent: '#16a34a',
  },
  {
    id: 'feat-delivery',
    icon: '🚀',
    title: 'Express Delivery',
    desc: 'Get your groceries delivered to your doorstep in under 2 hours. No waiting, just fresh food.',
    color: '#dbeafe',
    accent: '#1d4ed8',
  },
  {
    id: 'feat-price',
    icon: '💰',
    title: 'Best Price Promise',
    desc: 'We match any competitor price. If you find it cheaper, we\'ll beat it — guaranteed.',
    color: '#fef9c3',
    accent: '#b45309',
  },
  {
    id: 'feat-quality',
    icon: '✅',
    title: 'Quality Checked',
    desc: 'Every product passes our strict quality inspection before reaching your basket.',
    color: '#fce7f3',
    accent: '#be185d',
  },
  {
    id: 'feat-returns',
    icon: '🔄',
    title: 'Hassle-Free Returns',
    desc: 'Not happy? Return any product within 24 hours with no questions asked. Full refund.',
    color: '#ede9fe',
    accent: '#7c3aed',
  },
  {
    id: 'feat-support',
    icon: '🎧',
    title: '24/7 Support',
    desc: 'Our customer care team is available around the clock to assist you with any issue.',
    color: '#ecfeff',
    accent: '#0e7490',
  },
]

const stats = [
  { id: 'stat-customers', value: '2M+', label: 'Happy Customers', icon: '😊' },
  { id: 'stat-products',  value: '5K+', label: 'Products',         icon: '📦' },
  { id: 'stat-cities',    value: '50+', label: 'Cities Served',    icon: '🏙️' },
  { id: 'stat-years',     value: '10+', label: 'Years of Trust',   icon: '🏆' },
]

export default function Features() {
  return (
    <section className="features" id="about">
      <div className="container">
        {/* Header */}
        <div className="features__header">
          <span className="badge badge-green">Why Mini Mart?</span>
          <h2 className="section-title" style={{ marginTop: '8px' }}>
            Why Millions Trust Us
          </h2>
          <p className="section-subtitle">
            We're committed to delivering quality, freshness and value every single day
          </p>
        </div>

        {/* Feature cards */}
        <div className="features__grid">
          {features.map((f, i) => (
            <div
              key={f.id}
              id={f.id}
              className="feature-card"
              style={{
                '--feat-color': f.color,
                '--feat-accent': f.accent,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="feature-card__icon">
                <span>{f.icon}</span>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
              <div className="feature-card__bar" />
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="features__stats">
          {stats.map(s => (
            <div key={s.id} id={s.id} className="features__stat-item">
              <div className="features__stat-icon">{s.icon}</div>
              <div className="features__stat-value">{s.value}</div>
              <div className="features__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
