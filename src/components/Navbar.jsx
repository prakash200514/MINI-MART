import './Navbar.css'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#categories' },
  { label: 'Deals', href: '#deals' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ cartCount, onCartOpen, currentView, onViewChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__left">
            <span>📍 Free delivery on orders above ₹499</span>
            <span className="topbar__sep">|</span>
            <span>📞 1800-MINIMART</span>
          </div>
          <div className="topbar__right">
            {currentView === 'store' ? (
              <>
                <button onClick={() => onViewChange('admin')} className="topbar__link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  Admin Portal
                </button>
                <span className="topbar__sep">|</span>
              </>
            ) : null}
            <a href="#" className="topbar__link">Sign In</a>
            <span className="topbar__sep">|</span>
            <a href="#" className="topbar__link">Register</a>
            <span className="topbar__sep">|</span>
            <a href="#" className="topbar__link">Track Order</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <div className="navbar__logo" onClick={() => onViewChange('store')} style={{ cursor: 'pointer' }} aria-label="Mini Mart Home">
            <div className="logo-icon">
              <span>🛒</span>
            </div>
            <div className="logo-text">
              <span className="logo-name">Mini</span>
              <span className="logo-name logo-name--accent">Mart</span>
            </div>
          </div>

          {currentView === 'store' ? (
            <>
              {/* Desktop Links */}
              <ul className="navbar__links" role="navigation" aria-label="Main navigation">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="navbar__link">{link.label}</a>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="navbar__actions">
                {/* Search */}
                <div className={`search-bar ${searchOpen ? 'search-bar--open' : ''}`}>
                  {searchOpen && (
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search products…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      autoFocus
                      aria-label="Search products"
                    />
                  )}
                  <button
                    className="btn btn-icon navbar__action-btn"
                    onClick={() => { setSearchOpen(o => !o); setSearchQuery('') }}
                    aria-label="Toggle search"
                  >
                    {searchOpen ? '✕' : '🔍'}
                  </button>
                </div>

                {/* Wishlist */}
                <button className="btn btn-icon navbar__action-btn" aria-label="Wishlist">
                  ❤️
                </button>

                {/* Cart */}
                <button id="cart-btn" className="cart-btn" onClick={onCartOpen} aria-label={`Shopping cart, ${cartCount} items`}>
                  <span className="cart-icon">🛒</span>
                  <span className="cart-label">Cart</span>
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>

                {/* Mobile menu toggle */}
                <button
                  className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                >
                  <span /><span /><span />
                </button>
              </div>
            </>
          ) : (
            <div className="navbar__actions">
              <span className="admin-nav-indicator">🛠️ Admin Mode</span>
              <button className="btn btn-primary" onClick={() => onViewChange('store')}>
                🛍️ View Store
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {currentView === 'store' && (
          <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} role="navigation" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-menu__link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-menu__cta">
              <button onClick={() => { setMenuOpen(false); onViewChange('admin'); }} className="btn btn-secondary w-full" style={{ marginBottom: '10px' }}>
                Admin Portal
              </button>
              <a href="#" className="btn btn-primary">Sign In</a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
