import './Deals.css'
import { useState, useEffect } from 'react'

// Countdown timer hook
function useCountdown(targetHours = 12) {
  const [timeLeft, setTimeLeft] = useState({ h: targetHours, m: 24, s: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev
        if (s > 0) return { h, m, s: s - 1 }
        if (m > 0) return { h, m: m - 1, s: 59 }
        if (h > 0) return { h: h - 1, m: 59, s: 59 }
        return { h: 0, m: 0, s: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return timeLeft
}

const deals = [
  {
    id: 'deal-1',
    tag: '🔥 Flash Sale',
    title: 'Premium Organic Basket',
    desc: 'Hand-picked organic vegetables fresh from local farms',
    originalPrice: 899,
    salePrice: 449,
    discount: 50,
    rating: 4.8,
    reviews: 2340,
    sold: 78,
    image: '🥗',
    color: '#dcfce7',
    accentColor: '#16a34a',
  },
  {
    id: 'deal-2',
    tag: '⚡ Best Deal',
    title: 'Dairy Combo Pack',
    desc: 'Fresh milk, yogurt, cheese & butter in one great bundle',
    originalPrice: 650,
    salePrice: 399,
    discount: 39,
    rating: 4.6,
    reviews: 1870,
    sold: 65,
    image: '🥛',
    color: '#e0f2fe',
    accentColor: '#0284c7',
  },
  {
    id: 'deal-3',
    tag: '🎁 Weekend Special',
    title: 'Snack & Beverages Box',
    desc: 'Premium snacks, juices, and beverages for the whole family',
    originalPrice: 1200,
    salePrice: 699,
    discount: 42,
    rating: 4.7,
    reviews: 3100,
    sold: 85,
    image: '🍿',
    color: '#fef9c3',
    accentColor: '#ca8a04',
  },
]

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.floor(rating) ? 'star star--full' : i - 0.5 <= rating ? 'star star--half' : 'star star--empty'}>
          ★
        </span>
      ))}
      <span className="star-value">{rating}</span>
    </div>
  )
}

function TimeUnit({ value, label }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="time-unit">
      <div className="time-unit__digits">
        <span key={padded} className="time-unit__num">{padded}</span>
      </div>
      <span className="time-unit__label">{label}</span>
    </div>
  )
}

export default function Deals({ onAddToCart }) {
  const time = useCountdown(11)
  const [addedId, setAddedId] = useState(null)

  function handleAdd(id) {
    setAddedId(id)
    onAddToCart(id)
    setTimeout(() => setAddedId(null), 1800)
  }

  return (
    <section className="deals" id="deals">
      {/* Banner */}
      <div className="deals__banner">
        <div className="container deals__banner-inner">
          <div className="deals__banner-left">
            <span className="deals__fire">🔥</span>
            <div>
              <p className="deals__banner-label">Flash Sale – Limited Time Offers</p>
              <p className="deals__banner-title">Today's Hot Deals</p>
            </div>
          </div>
          <div className="deals__countdown">
            <p className="deals__countdown-label">Ends in:</p>
            <div className="deals__timer">
              <TimeUnit value={time.h} label="HRS" />
              <span className="deals__colon">:</span>
              <TimeUnit value={time.m} label="MIN" />
              <span className="deals__colon">:</span>
              <TimeUnit value={time.s} label="SEC" />
            </div>
          </div>
          <a href="#" className="btn btn-accent" id="deals-view-all">View All Deals →</a>
        </div>
      </div>

      {/* Cards */}
      <div className="container deals__grid">
        {deals.map((deal, i) => (
          <div
            key={deal.id}
            id={deal.id}
            className="deal-card"
            style={{ '--deal-color': deal.color, '--deal-accent': deal.accentColor, animationDelay: `${i * 0.15}s` }}
          >
            {/* Discount badge */}
            <div className="deal-card__badge">{deal.discount}% OFF</div>

            {/* Image / Emoji placeholder */}
            <div className="deal-card__img" style={{ background: deal.color }}>
              <span className="deal-card__emoji">{deal.image}</span>
              <span className="deal-card__tag">{deal.tag}</span>
            </div>

            {/* Info */}
            <div className="deal-card__body">
              <h3 className="deal-card__title">{deal.title}</h3>
              <p className="deal-card__desc">{deal.desc}</p>

              <StarRating rating={deal.rating} />
              <p className="deal-card__reviews">({deal.reviews.toLocaleString()} reviews)</p>

              {/* Progress bar */}
              <div className="deal-card__progress-wrap">
                <div className="deal-card__progress-bar">
                  <div className="deal-card__progress-fill" style={{ width: `${deal.sold}%` }} />
                </div>
                <span className="deal-card__sold">{deal.sold}% sold</span>
              </div>

              {/* Pricing */}
              <div className="deal-card__pricing">
                <span className="deal-price-current">₹{deal.salePrice}</span>
                <span className="deal-price-original">₹{deal.originalPrice}</span>
              </div>

              {/* Actions */}
              <div className="deal-card__actions">
                <button
                  className={`btn btn-primary ${addedId === deal.id ? 'btn--added' : ''}`}
                  id={`${deal.id}-add-cart`}
                  onClick={() => handleAdd(deal.id)}
                >
                  {addedId === deal.id ? '✓ Added!' : '🛒 Add to Cart'}
                </button>
                <button className="btn btn-secondary btn-sm" id={`${deal.id}-wishlist`} aria-label="Add to wishlist">
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
