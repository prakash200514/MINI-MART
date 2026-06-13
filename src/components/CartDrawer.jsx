import { useState } from 'react'
import './CartDrawer.css'

export default function CartDrawer({ open, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) {
  const [checkoutMode, setCheckoutMode] = useState(false)
  const [successMode, setSuccessMode] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [formError, setFormError] = useState('')

  if (!open) return null

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49
  const total = subtotal + shipping

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setFormError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setFormError('Please fill out all delivery details.')
      return
    }
    onCheckout(form)
    setSuccessMode(true)
  }

  const handleCloseSuccess = () => {
    setSuccessMode(false)
    setCheckoutMode(false)
    setForm({ name: '', phone: '', address: '' })
    onClose()
  }

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-drawer__header">
          <h2>🛒 Your Cart</h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {successMode ? (
          /* Success Screen */
          <div className="cart-drawer__success animate-fadeInUp">
            <div className="success-icon-wrapper">
              <span className="success-icon">✓</span>
            </div>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for shopping with Mini Mart. Your fresh goods will arrive in under 2 hours!</p>
            <button className="btn btn-primary btn-lg" onClick={handleCloseSuccess}>
              Continue Shopping
            </button>
          </div>
        ) : checkoutMode ? (
          /* Checkout Mode */
          <div className="cart-drawer__checkout animate-fadeInUp">
            <button className="btn-back" onClick={() => setCheckoutMode(false)}>← Back to Cart</button>
            <h3>📍 Delivery Details</h3>
            
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="customer-name">Full Name</label>
                <input
                  type="text"
                  id="customer-name"
                  name="name"
                  placeholder="e.g., Ramesh Kumar"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-phone">Phone Number</label>
                <input
                  type="tel"
                  id="customer-phone"
                  name="phone"
                  placeholder="e.g., 9876543210"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-address">Delivery Address</label>
                <textarea
                  id="customer-address"
                  name="address"
                  rows="3"
                  placeholder="Street, Building, Flat No., Area"
                  value={form.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {formError && <p className="form-error-msg">{formError}</p>}

              {/* Order Summary in Checkout */}
              <div className="cart-drawer__summary" style={{ marginTop: '20px' }}>
                <div className="summary-row">
                  <span>Items Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Charge:</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Grand Total:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-accent btn-lg w-full" style={{ marginTop: '20px' }}>
                Place Order (₹{total}) →
              </button>
            </form>
          </div>
        ) : (
          /* Cart items mode */
          <>
            {cart.length === 0 ? (
              <div className="cart-drawer__empty">
                <span className="empty-emoji">🛒</span>
                <p>Your cart is empty.</p>
                <button className="btn btn-primary" onClick={onClose}>Shop Now</button>
              </div>
            ) : (
              <div className="cart-drawer__body">
                {/* Items List */}
                <div className="cart-drawer__items">
                  {cart.map(item => (
                    <div className="cart-item" key={item.product.id}>
                      <div className="cart-item__emoji">{item.product.emoji || '📦'}</div>
                      <div className="cart-item__details">
                        <h4 className="cart-item__name">{item.product.name}</h4>
                        <span className="cart-item__price">₹{item.product.price}</span>
                      </div>
                      <div className="cart-item__qty">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="cart-item__remove" onClick={() => onRemove(item.product.id)}>✕</button>
                    </div>
                  ))}
                </div>

                {/* Footer Sum */}
                <div className="cart-drawer__footer">
                  <div className="cart-drawer__summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery:</span>
                      <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="delivery-tip">Add ₹{499 - subtotal} more for free delivery!</p>
                    )}
                    <div className="summary-row total-row">
                      <span>Total:</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg w-full" onClick={() => setCheckoutMode(true)}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
