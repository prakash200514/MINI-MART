import { useState } from 'react'
import './AuthModal.css'

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode) // 'login' or 'signup'
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminRegister, setAdminRegister] = useState(false)
  const [adminCode, setAdminCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError('')
    setUsername('')
    setEmail('')
    setPassword('')
    setAdminRegister(false)
    setAdminCode('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const bodyData = mode === 'login' 
      ? { email, password }
      : { username, email, password, adminCode: adminRegister ? adminCode : undefined }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      onAuthSuccess(data.user, data.token)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="auth-card animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close authentication modal">
          ✕
        </button>

        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Mini<span>Mart</span></span>
          </div>
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {mode === 'login' 
              ? 'Access your orders, wishlist, and recommendations' 
              : 'Join MiniMart for free delivery and exclusive deals'}
          </p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="username"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="admin-toggle-section">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={adminRegister}
                  onChange={(e) => setAdminRegister(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                Register as Administrator
              </label>

              {adminRegister && (
                <div className="form-group admin-code-group animate-fadeInUp">
                  <label htmlFor="adminCode">Admin Security Code</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🔑</span>
                    <input
                      type="password"
                      id="adminCode"
                      placeholder="Enter admin verification code"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      required={adminRegister}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary w-full auth-submit-btn" 
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              mode === 'login' ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button className="auth-toggle-link" onClick={handleToggleMode}>
              {mode === 'login' ? 'Sign up free' : 'Log in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
