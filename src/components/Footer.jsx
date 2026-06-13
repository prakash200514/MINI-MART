import './Footer.css'

const footerLinks = {
  Shop: ['Fresh Produce', 'Dairy & Eggs', 'Bakery', 'Snacks & Beverages', 'Meat & Seafood', 'Frozen Foods', 'Organic Range'],
  Help: ['My Account', 'Track My Order', 'Returns & Refunds', 'FAQs', 'Contact Us', 'Store Locator'],
  Company: ['About Mini Mart', 'Careers', 'Press & Media', 'Sustainability', 'Blog', 'Investor Relations', 'Admin Portal'],
}

const socialLinks = [
  { id: 'social-fb',    icon: '📘', label: 'Facebook',  href: '#' },
  { id: 'social-ig',    icon: '📸', label: 'Instagram', href: '#' },
  { id: 'social-tw',    icon: '🐦', label: 'Twitter',   href: '#' },
  { id: 'social-yt',    icon: '▶️', label: 'YouTube',   href: '#' },
]

const paymentIcons = ['💳', '🏦', '📱', '💰', '🔐']

export default function Footer({ onViewChange }) {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      {/* App download banner */}
      <div className="footer__app-banner">
        <div className="container footer__app-inner">
          <div>
            <p className="footer__app-title">📱 Download the Mini Mart App</p>
            <p className="footer__app-sub">Get exclusive app-only deals and order in under 30 seconds</p>
          </div>
          <div className="footer__app-btns">
            <a href="#" id="app-store-btn" className="app-btn" aria-label="Download on App Store">
              <span className="app-btn__icon">🍎</span>
              <div>
                <span className="app-btn__small">Download on the</span>
                <span className="app-btn__big">App Store</span>
              </div>
            </a>
            <a href="#" id="play-store-btn" className="app-btn" aria-label="Get it on Google Play">
              <span className="app-btn__icon">▶️</span>
              <div>
                <span className="app-btn__small">Get it on</span>
                <span className="app-btn__big">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">🛒</span>
              <span className="footer__logo-text">Mini<span>Mart</span></span>
            </div>
            <p className="footer__brand-desc">
              Your trusted neighborhood supermarket — delivering farm-fresh groceries and everyday essentials right to your doorstep since 2013.
            </p>
            {/* Contact */}
            <div className="footer__contact">
              <a href="tel:18001234567" className="footer__contact-item" id="footer-phone">
                📞 1800-MINIMART
              </a>
              <a href="mailto:hello@minimart.in" className="footer__contact-item" id="footer-email">
                ✉️ hello@minimart.in
              </a>
              <span className="footer__contact-item">
                🕐 Mon–Sun: 7 AM – 11 PM
              </span>
            </div>
            {/* Social */}
            <div className="footer__social">
              {socialLinks.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  className="footer__social-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="footer__links-col">
              <h3 className="footer__col-title">{heading}</h3>
              <ul className="footer__links">
                {links.map(link => (
                  <li key={link}>
                    {link === 'Admin Portal' ? (
                      <button
                        onClick={() => onViewChange('admin')}
                        className="footer__link"
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                      >
                        {link}
                      </button>
                    ) : (
                      <a href="#" className="footer__link">{link}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} Mini Mart Pvt. Ltd. All rights reserved.
          </p>
          <div className="footer__payments">
            <span className="footer__payments-label">Secure Payments:</span>
            {paymentIcons.map((icon, i) => (
              <span key={i} className="payment-icon" title="Secure payment">{icon}</span>
            ))}
          </div>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Privacy Policy</a>
            <a href="#" className="footer__legal-link">Terms of Service</a>
            <a href="#" className="footer__legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <a href="#home" className="back-to-top" id="back-to-top" aria-label="Back to top">↑</a>
    </footer>
  )
}
