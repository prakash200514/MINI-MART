import './Hero.css'
import { useState, useEffect } from 'react'

export default function Hero({ slides }) {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => goTo((active + 1) % slides.length), 5500)
    return () => clearInterval(timer)
  }, [active])

  function goTo(idx) {
    if (idx === active) return
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 350)
  }

  const slide = slides[active]

  return (
    <section className="hero" id="home" aria-label="Hero banner">
      {/* Background */}
      <div
        className="hero__bg"
        style={{ background: slide.bg }}
        key={`bg-${active}`}
      />

      {/* Decorative blobs */}
      <div className="hero__blob hero__blob--1" style={{ background: slide.accent }} />
      <div className="hero__blob hero__blob--2" />

      {/* Floating vegetable particles */}
      <div className="hero__veggies" aria-hidden="true">
        {[
          { emoji: '🥦', cls: 'v1' },
          { emoji: '🍅', cls: 'v2' },
          { emoji: '🥕', cls: 'v3' },
          { emoji: '🌽', cls: 'v4' },
          { emoji: '🥑', cls: 'v5' },
          { emoji: '🍋', cls: 'v6' },
          { emoji: '🫑', cls: 'v7' },
          { emoji: '🍇', cls: 'v8' },
          { emoji: '🧅', cls: 'v9' },
          { emoji: '🍓', cls: 'v10' },
          { emoji: '🥬', cls: 'v11' },
          { emoji: '🍊', cls: 'v12' },
        ].map(({ emoji, cls }) => (
          <span key={cls} className={`hero__veggie hero__veggie--${cls}`}>{emoji}</span>
        ))}
      </div>

      {/* Hero Image overlay */}
      <div className="hero__img-overlay">
        <img
          src="/hero_banner.png"
          alt="Fresh supermarket produce"
          className="hero__bg-img"
        />
      </div>

      <div className="hero__inner">
        {/* Content */}
        <div className={`hero__content ${animating ? 'hero__content--exit' : 'hero__content--enter'}`}>
          {/* Badge */}
          <div className="hero__badge">{slide.badge}</div>

          {/* Headline */}
          <h1 className="hero__headline">
            {slide.headline.split('\n').map((line, i) => (
              <span key={i} className="hero__headline-line">
                {line}
                <br />
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p className="hero__sub">{slide.sub}</p>

          {/* CTA Buttons */}
          <div className="hero__ctas">
            <a href={slide.cta1.href} className="btn btn-primary btn-lg" id={`hero-cta-${active}-1`}>
              {slide.cta1.label}
              <span>→</span>
            </a>
            <a href={slide.cta2.href} className="btn btn-ghost btn-lg" id={`hero-cta-${active}-2`}>
              {slide.cta2.label}
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {slide.stats.map((stat, i) => (
              <div className="hero__stat" key={i}>
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div className={`hero__visual ${animating ? 'hero__content--exit' : 'hero__content--enter'}`}>
          <div className="hero__product-card">
            <div className="hero__product-img">
              <img src={slide.productImg} alt={slide.productName} />
            </div>
            <div className="hero__product-info">
              <span className="hero__product-label">{slide.productLabel}</span>
              <h3 className="hero__product-name">{slide.productName}</h3>
              <div className="hero__product-price">
                <span className="price-current">{slide.productPrice}</span>
                {slide.productOriginal && <span className="price-original">{slide.productOriginal}</span>}
                {slide.productDiscount && <span className="price-badge">{slide.productDiscount}</span>}
              </div>
            </div>
          </div>

          {/* Floating tags */}
          <div className="hero__float-tag hero__float-tag--1">
            <span>{slide.floatTag1}</span>
          </div>
          <div className="hero__float-tag hero__float-tag--2">
            <span>{slide.floatTag2}</span>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === active ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            id={`hero-dot-${i}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint animate-bounce-subtle" aria-hidden="true">
        <span>↓</span>
      </div>

      {/* Wave bottom */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  )
}
