import './Categories.css'
import { useRef } from 'react'

const categories = [
  { id: 'cat-fruits',    emoji: '🍎', name: 'Fruits',        count: '120+ Items', color: '#fef3c7', accent: '#d97706' },
  { id: 'cat-veggies',   emoji: '🥦', name: 'Vegetables',    count: '200+ Items', color: '#dcfce7', accent: '#16a34a' },
  { id: 'cat-dairy',     emoji: '🥛', name: 'Dairy',         count: '80+ Items',  color: '#e0f2fe', accent: '#0284c7' },
  { id: 'cat-bakery',    emoji: '🍞', name: 'Bakery',        count: '60+ Items',  color: '#fce7f3', accent: '#be185d' },
  { id: 'cat-snacks',    emoji: '🍿', name: 'Snacks',        count: '150+ Items', color: '#fef9c3', accent: '#ca8a04' },
  { id: 'cat-beverages', emoji: '🧃', name: 'Beverages',     count: '90+ Items',  color: '#f0fdf4', accent: '#15803d' },
  { id: 'cat-meat',      emoji: '🥩', name: 'Meat & Fish',   count: '70+ Items',  color: '#fee2e2', accent: '#dc2626' },
  { id: 'cat-frozen',    emoji: '🧊', name: 'Frozen Foods',  count: '50+ Items',  color: '#ede9fe', accent: '#7c3aed' },
  { id: 'cat-cleaning',  emoji: '🧹', name: 'Cleaning',      count: '100+ Items', color: '#ecfeff', accent: '#0891b2' },
  { id: 'cat-personal',  emoji: '🧴', name: 'Personal Care', count: '110+ Items', color: '#fdf4ff', accent: '#a21caf' },
]

export default function Categories() {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
    }
  }

  return (
    <section className="categories" id="categories">
      <div className="container">
        {/* Header */}
        <div className="categories__header">
          <div>
            <span className="badge badge-green">Browse Categories</span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>
              Shop by Category
            </h2>
            <p className="section-subtitle">
              Find everything you need, organized just for you
            </p>
          </div>
          <div className="categories__nav-btns">
            <button
              className="btn btn-icon nav-arrow"
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              id="cat-scroll-left"
            >
              ←
            </button>
            <button
              className="btn btn-icon nav-arrow"
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              id="cat-scroll-right"
            >
              →
            </button>
          </div>
        </div>

        {/* Scroll track */}
        <div className="categories__track" ref={trackRef}>
          {categories.map((cat, i) => (
            <a
              href="#products"
              key={cat.id}
              id={cat.id}
              className="category-card"
              style={{
                '--cat-color': cat.color,
                '--cat-accent': cat.accent,
                animationDelay: `${i * 0.07}s`,
              }}
              aria-label={`Browse ${cat.name}`}
            >
              <div className="category-card__icon">
                <span>{cat.emoji}</span>
              </div>
              <span className="category-card__name">{cat.name}</span>
              <span className="category-card__count">{cat.count}</span>
              <div className="category-card__arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
