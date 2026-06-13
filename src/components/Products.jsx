import './Products.css'
import { useState } from 'react'

const filters = ['All', 'Fresh', 'Organic', 'Dairy', 'Bakery', 'Snacks', 'Beverages']

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

export default function Products({ products, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [addedIds, setAddedIds] = useState({})
  const [showAll, setShowAll] = useState(false)

  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter)

  const displayed = showAll ? filtered : filtered.slice(0, 8)

  function handleAdd(id) {
    setAddedIds(prev => ({ ...prev, [id]: true }))
    onAddToCart(id)
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
