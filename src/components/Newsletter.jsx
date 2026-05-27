import './Newsletter.css'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.includes('@')) { setStatus('error'); return }
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1200)
  }

  return (
    <section className="newsletter" id="contact">
      <div className="newsletter__bg" aria-hidden="true">
        <div className="newsletter__blob newsletter__blob--1" />
        <div className="newsletter__blob newsletter__blob--2" />
      </div>

      <div className="container newsletter__inner">
        {/* Left */}
        <div className="newsletter__left">
          <span className="badge badge-green" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>
            📧 Newsletter
          </span>
          <h2 className="newsletter__title">
            Get Fresh Deals<br />in Your Inbox
          </h2>
          <p className="newsletter__sub">
            Subscribe to our newsletter and be the first to know about exclusive deals, 
            seasonal offers, and new arrivals. Unsubscribe anytime.
          </p>

          {/* Perks */}
          <ul className="newsletter__perks">
            {['Weekly deal alerts', '10% off first order', 'Recipe ideas', 'Early access to sales'].map(p => (
              <li key={p} className="newsletter__perk">
                <span className="perk-check">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="newsletter__right">
          <div className="newsletter__card">
            <div className="newsletter__card-icon">📬</div>
            <h3 className="newsletter__card-title">Join 500,000+ Subscribers</h3>
            <p className="newsletter__card-sub">Enter your email to start saving big</p>

            {status === 'success' ? (
              <div className="newsletter__success">
                <span className="newsletter__success-icon">🎉</span>
                <p>You're in! Welcome to Mini Mart family.</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '4px' }}>
                  Check your inbox for your 10% off coupon.
                </p>
              </div>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
                <div className={`newsletter__input-wrap ${status === 'error' ? 'newsletter__input-wrap--error' : ''}`}>
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    id="newsletter-email"
                    className="newsletter__input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setStatus('idle') }}
                    aria-label="Email address"
                    required
                  />
                </div>
                {status === 'error' && (
                  <p className="newsletter__error">Please enter a valid email address.</p>
                )}
                <button
                  type="submit"
                  id="newsletter-submit"
                  className={`btn btn-accent btn-lg newsletter__submit ${status === 'loading' ? 'btn--loading' : ''}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="spinner" />
                  ) : (
                    <>Subscribe & Save 10% 🎁</>
                  )}
                </button>
                <p className="newsletter__privacy">
                  🔒 No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
