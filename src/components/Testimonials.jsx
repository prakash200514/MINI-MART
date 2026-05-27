import './Testimonials.css'
import { useState } from 'react'

const testimonials = [
  {
    id: 'rev-1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: '👩',
    rating: 5,
    review: 'Mini Mart has completely changed how I shop for groceries. The produce is always fresh, delivery is super fast, and the prices are unbeatable. I order 3 times a week now!',
    since: 'Customer since 2021',
    tag: 'Loyal Customer',
  },
  {
    id: 'rev-2',
    name: 'Rahul Verma',
    location: 'Delhi',
    avatar: '👨',
    rating: 5,
    review: 'Ordered the weekly veggie basket and it was delivered within 90 minutes — fresher than what I get at local markets. The app is smooth and customer service is excellent.',
    since: 'Customer since 2022',
    tag: 'Verified Buyer',
  },
  {
    id: 'rev-3',
    name: 'Ananya Rao',
    location: 'Bangalore',
    avatar: '👩‍💼',
    rating: 5,
    review: 'As a working professional, Mini Mart is a lifesaver. Subscribe & Save on daily essentials means I never run out of anything. Best grocery service in the city!',
    since: 'Customer since 2020',
    tag: 'Top Reviewer',
  },
  {
    id: 'rev-4',
    name: 'Vikram Nair',
    location: 'Hyderabad',
    avatar: '🧑',
    rating: 4,
    review: 'Great quality products and reliable delivery. The deals section always has something tempting. Switched from another app and haven\'t looked back since.',
    since: 'Customer since 2023',
    tag: 'Regular Buyer',
  },
  {
    id: 'rev-5',
    name: 'Sunita Patel',
    location: 'Ahmedabad',
    avatar: '👩‍🍳',
    rating: 5,
    review: 'Love the organic section! Everything is certified fresh and the packaging is eco-friendly too. My family only eats Mini Mart produce now. Highly recommend!',
    since: 'Customer since 2021',
    tag: 'Organic Shopper',
  },
]

function Stars({ count }) {
  return (
    <div className="review-stars" aria-label={`${count} stars`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(a => (a === 0 ? testimonials.length - 1 : a - 1))
  const next = () => setActive(a => (a === testimonials.length - 1 ? 0 : a + 1))

  const t = testimonials[active]

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        {/* Header */}
        <div className="testimonials__header">
          <span className="badge badge-orange">Customer Stories</span>
          <h2 className="section-title" style={{ marginTop: '8px' }}>
            What Our Customers Say
          </h2>
          <p className="section-subtitle">
            Trusted by over 2 million happy shoppers across India
          </p>
        </div>

        <div className="testimonials__body">
          {/* Main card */}
          <div className="testimonial-featured" id={t.id} key={t.id}>
            <div className="testimonial-featured__quote">"</div>
            <Stars count={t.rating} />
            <p className="testimonial-featured__text">{t.review}</p>
            <div className="testimonial-featured__author">
              <div className="testimonial-avatar">{t.avatar}</div>
              <div>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-meta">{t.location} · {t.since}</p>
              </div>
              <span className="testimonial-tag">{t.tag}</span>
            </div>
          </div>

          {/* Side previews */}
          <div className="testimonials__side">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                id={`${item.id}-thumb`}
                className={`testimonial-thumb ${i === active ? 'testimonial-thumb--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View review by ${item.name}`}
              >
                <span className="thumb-avatar">{item.avatar}</span>
                <div className="thumb-info">
                  <span className="thumb-name">{item.name}</span>
                  <span className="thumb-location">{item.location}</span>
                </div>
                <span className="thumb-stars">{'★'.repeat(item.rating)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="testimonials__nav">
          <button className="btn btn-icon nav-arrow" onClick={prev} id="testimonial-prev" aria-label="Previous">←</button>
          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === active ? 'hero__dot--active' : ''}`}
                onClick={() => setActive(i)}
                style={{ background: i === active ? 'var(--green-600)' : 'var(--gray-300)' }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button className="btn btn-icon nav-arrow" onClick={next} id="testimonial-next" aria-label="Next">→</button>
        </div>
      </div>
    </section>
  )
}
