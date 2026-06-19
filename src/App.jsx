import './App.css'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Deals from './components/Deals'
import Products from './components/Products'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Admin from './components/Admin'
import AuthModal from './components/AuthModal'

const initialProducts = [
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

const initialSlides = [
  {
    id: 1,
    badge: '🌿 100% Fresh & Organic',
    headline: 'Fresh Groceries,\nDelivered to\nYour Door',
    sub: 'From farm to your table in under 2 hours. Discover thousands of fresh products at unbeatable prices.',
    cta1: { label: 'Shop Now', href: '#products' },
    cta2: { label: 'Explore Deals', href: '#deals' },
    stats: [
      { value: '5000+', label: 'Products' },
      { value: '50+', label: 'Brands' },
      { value: '2hr', label: 'Delivery' },
    ],
    accent: '#22c55e',
    bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)',
    productImg: '/organic_basket.png',
    productLabel: 'Organic Freshness',
    productName: 'Vibrant Veggie Basket',
    productPrice: '₹499',
    productOriginal: '₹699',
    productDiscount: '28% OFF',
    floatTag1: '🥦 Farm Fresh',
    floatTag2: '⚡ 2hr Delivery',
  },
  {
    id: 2,
    badge: '🔥 Weekend Mega Sale',
    headline: 'Up to 60% OFF\non Premium\nProducts',
    sub: 'Limited time weekend deals on fresh produce, dairy, snacks and household essentials. Don\'t miss out!',
    cta1: { label: 'Grab Deals', href: '#deals' },
    cta2: { label: 'View All', href: '#products' },
    stats: [
      { value: '60%', label: 'Max Savings' },
      { value: '200+', label: 'Offers' },
      { value: '24hr', label: 'Flash Sale' },
    ],
    accent: '#f97316',
    bg: 'linear-gradient(135deg, #431407 0%, #7c2d12 30%, #9a3412 60%, #c2410c 100%)',
    productImg: '/mega_sale.png',
    productLabel: 'Special Deal',
    productName: 'Premium Snack Platter',
    productPrice: '₹299',
    productOriginal: '₹499',
    productDiscount: '40% OFF',
    floatTag1: '🍇 Rich Taste',
    floatTag2: '🔥 60% Max Off',
  },
  {
    id: 3,
    badge: '🥛 Daily Essentials',
    headline: 'Everything\nYou Need,\nEvery Day',
    sub: 'Stock up on dairy, bakery, and pantry essentials. Subscribe & save up to 15% on recurring deliveries.',
    cta1: { label: 'Subscribe & Save', href: '#products' },
    cta2: { label: 'Browse All', href: '#categories' },
    stats: [
      { value: '15%', label: 'Extra Savings' },
      { value: '1000+', label: 'Essentials' },
      { value: 'Free', label: 'Returns' },
    ],
    accent: '#6366f1',
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #3730a3 60%, #4338ca 100%)',
    productImg: '/daily_essentials.png',
    productLabel: 'Best Value',
    productName: 'Morning Fresh Combo',
    productPrice: '₹189',
    productOriginal: '₹249',
    productDiscount: '24% OFF',
    floatTag1: '🥛 Pure Dairy',
    floatTag2: '🍞 Fresh Sourdough',
  },
]

function App() {
  const [view, setView] = useState('store')
  const [products, setProducts] = useState([])
  const [slides, setSlides] = useState([])
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')

  // Verify token on mount
  useEffect(() => {
    async function verifyToken() {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          })
          if (res.ok) {
            const data = await res.json()
            setUser(data)
            setToken(storedToken)
          } else {
            // Token expired or invalid, clear state and storage
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setUser(null)
            setToken(null)
          }
        } catch (err) {
          console.error('Error verifying auth token:', err)
        }
      }
    }
    verifyToken()
  }, [])

  // Fetch initial public data from Express + MongoDB backend
  useEffect(() => {
    async function initPublicData() {
      try {
        const [prodRes, slideRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/slides')
        ]);
        if (prodRes.ok) setProducts(await prodRes.json());
        if (slideRes.ok) setSlides(await slideRes.json());
      } catch (err) {
        console.error('Error connecting to backend API:', err);
      }
    }
    initPublicData();
  }, []);

  // Fetch orders only if logged in as admin
  useEffect(() => {
    async function fetchOrders() {
      if (user?.role === 'admin' && token) {
        try {
          const res = await fetch('/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            setOrders(await res.json());
          }
        } catch (err) {
          console.error('Error fetching orders:', err);
        }
      }
    }
    fetchOrders();
  }, [user, token]);

  // Redirect to store view if user is not admin and is on admin page
  useEffect(() => {
    if (view === 'admin' && user?.role !== 'admin') {
      setView('store')
    }
  }, [view, user])

  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', userToken)
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setView('store')
  }

  const handleAuthClick = (mode) => {
    setAuthModalMode(mode)
    setAuthModalOpen(true)
  }

  const handleAddToCart = (productId) => {
    let product = products.find(p => p.id === productId)
    if (!product) {
      const dealProducts = {
        'deal-1': { id: 'deal-1', name: 'Premium Organic Basket', price: 449, emoji: '🥗' },
        'deal-2': { id: 'deal-2', name: 'Dairy Combo Pack', price: 399, emoji: '🥛' },
        'deal-3': { id: 'deal-3', name: 'Snack & Beverages Box', price: 699, emoji: '🍿' },
      }
      product = dealProducts[productId]
    }
    if (!product) return
    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId)
      if (existing) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const handleUpdateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const handlePlaceOrder = async (customer) => {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const newOrder = {
      id: `ord_${Date.now()}`,
      customer,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        emoji: item.product.emoji || '📦'
      })),
      total,
      date: new Date().toLocaleString(),
      status: 'Pending'
    }
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (res.ok) {
        const savedOrder = await res.json();
        setOrders(prev => [savedOrder, ...prev])
        setCart([])
      }
    } catch (err) {
      console.error('Error placing order:', err);
    }
  }

  // Admin CRUD for products
  const handleUpdateProduct = async (updated) => {
    try {
      const res = await fetch(`/api/products/${updated.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        const savedProd = await res.json();
        setProducts(prev => prev.map(p => p.id === updated.id ? savedProd : p))
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
  }

  const handleAddProduct = async (newProd) => {
    const newId = `p_${Date.now()}`
    const productData = { ...newProd, id: newId }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        const savedProd = await res.json();
        setProducts(prev => [...prev, savedProd])
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== productId))
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  }

  // Admin Slide edits
  const handleUpdateSlide = async (updatedSlide) => {
    try {
      const res = await fetch(`/api/slides/${updatedSlide.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedSlide)
      });
      if (res.ok) {
        const savedSlide = await res.json();
        setSlides(prev => prev.map(s => s.id === updatedSlide.id ? savedSlide : s))
      }
    } catch (err) {
      console.error('Error updating slide:', err);
    }
  }

  // Admin Order Status Update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const savedOrder = await res.json();
        setOrders(prev =>
          prev.map(ord => ord.id === orderId ? savedOrder : ord)
        )
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  }

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="app" id="app-root">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        currentView={view}
        onViewChange={setView}
        user={user}
        onAuthClick={handleAuthClick}
        onLogout={handleLogout}
      />

      {view === 'store' ? (
        <main>
          <Hero slides={slides} />
          <Categories />
          <Deals onAddToCart={handleAddToCart} />
          <Products products={products} onAddToCart={handleAddToCart} />
          <Features />
          <Testimonials />
          <Newsletter />
        </main>
      ) : (
        <Admin
          products={products}
          slides={slides}
          orders={orders}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateSlide={handleUpdateSlide}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      )}

      <Footer onViewChange={setView} user={user} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handlePlaceOrder}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />
    </div>
  )
}

export default App

