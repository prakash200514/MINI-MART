import './Products.css'
import { useState } from 'react'

const filters = ['All', 'Fresh', 'Organic', 'Dairy', 'Bakery', 'Snacks', 'Beverages']

const products = [
  { id: 'p1', name: 'Red Apple Pack', category: 'Fresh', price: 149, original: 199, rating: 4.7, reviews: 520, emoji: '🍎', badge: 'Fresh', organic: true },
  { id: 'p2', name: 'Organic Spinach', category: 'Organic', price: 49, original: null, rating: 4.5, reviews: 320, emoji: '🥬', badge: 'Organic' },
  { id: 'p3', name: 'Full Cream Milk 1L', category: 'Dairy', price: 68, original: 75, rating: 4.8, reviews: 1200, emoji: '🥛', badge: 'Dairy' },
  { id: 'p4', name: 'Sourdough Bread', category: 'Bakery', price: 120, original: 150, rating: 4.6, reviews: 430, emoji: '🍞', badge: 'Bakery' },
  { id: 'p5', name: 'Mixed Nut Pack', category: 'Snacks', price: 299, original: 399, rating: 4.9, reviews: 890, emoji: '🥜', badge: 'Best Seller' },
  { id: 'p6', name: 'Orange Juice 1L', category: 'Beverages', price: 89, original: 120, rating: 4.4, reviews: 670, emoji: '🍊', badge: 'Fresh' },
  { id: 'p7', name: 'Greek Yogurt 400g', category: 'Dairy', price: 115, original: 140, rating: 4.7, reviews: 560, emoji: '🍶', badge: 'Organic' },
  { id: 'p8', name: 'Avocado 2pcs', category: 'Fresh', price: 199, original: 249, rating: 4.5, reviews: 380, emoji: '🥑', badge: 'Fresh' },
  { id: 'p9', name: 'Cheddar Cheese 200g', category: 'Dairy', price: 179, original: 220, rating: 4.6, reviews: 740, emoji: '🧀', badge: 'Imported' },
  { id: 'p10', name: 'Granola Bar Pack', category: 'Snacks', price: 159, original: 200, rating: 4.3, reviews: 290, emoji: '🍫', badge: 'Healthy' },
  { id: 'p11', name: 'Strawberries 250g', category: 'Fresh', price: 89, original: 119, rating: 4.8, reviews: 960, emoji: '🍓', badge: 'Seasonal' },
  { id: 'p12', name: 'Green Tea Pack', category: 'Beverages', price: 199, original: 249, rating: 4.7, reviews: 1100, emoji: '🍵', badge: 'Organic' },
]

function ProductCard({ product, onAdd, added }) {
  const discount = product.original
    ? Math.round(((product.original - product.price) / product.original) * 100)
    : null

  return (
    <div className="product-card" id={product.id}>
      {/* Badges */}
      <div className="product-card__badges">
        {product.organic && <span className="product-badge product-badge--organic">🌿 Organic</span>}
        {discount && <span className="product-badge product-badge--discount">{discount}% OFF</span>}
      </div>

      {/* Wishlist */}
      <button className="product-card__wish" aria-label="Add to wishlist">❤</button>

      {/* Image */}
      <div className="product-card__img">
        <span className="product-card__emoji">{product.emoji}</span>
        <span className="product-card__badge-tag">{product.badge}</span>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>

        {/* Rating */}
        <div className="product-card__rating">
          <span className="product-stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="product-rating-val">{product.rating}</span>
          <span className="product-rating-count">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="product-card__price">
          <span className="product-price-current">₹{product.price}</span>
          {product.original && (
            <span className="product-price-original">₹{product.original}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          className={`btn btn-primary btn-sm product-card__add ${added ? 'btn--added' : ''}`}
          id={`${product.id}-add`}
          onClick={() => onAdd(product.id)}
        >
          {added ? '✓ Added!' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [addedIds, setAddedIds] = useState({})
  const [showAll, setShowAll] = useState(false)

  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter)

  const displayed = showAll ? filtered : filtered.slice(0, 8)

  function handleAdd(id) {
    setAddedIds(prev => ({ ...prev, [id]: true }))
    setTimeout(() => setAddedIds(prev => ({ ...prev, [id]: false })), 1800)
  }

  return (
    <section className="products" id="products">
      <div className="container">
        {/* Header */}
        <div className="products__header">
          <div>
            <span className="badge badge-green">Our Products</span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>Featured Products</h2>
            <p className="section-subtitle">Handpicked freshness — delivered to your door</p>
          </div>
          <a href="#" className="btn btn-secondary" id="products-view-all">View All →</a>
        </div>

        {/* Filter pills */}
        <div className="products__filters" role="tablist" aria-label="Product filters">
          {filters.map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              id={`filter-${f.toLowerCase()}`}
              className={`filter-pill ${activeFilter === f ? 'filter-pill--active' : ''}`}
              onClick={() => { setActiveFilter(f); setShowAll(false) }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="products__grid">
          {displayed.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
              <ProductCard
                product={p}
                onAdd={handleAdd}
                added={!!addedIds[p.id]}
              />
            </div>
          ))}
        </div>

        {/* Load more */}
        {!showAll && filtered.length > 8 && (
          <div className="products__load-more">
            <button
              className="btn btn-secondary btn-lg"
              id="products-load-more"
              onClick={() => setShowAll(true)}
            >
              Load More Products ↓
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
