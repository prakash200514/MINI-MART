import { useState } from 'react'
import './Admin.css'

export default function Admin({
  products,
  slides,
  orders,
  users = [],
  currentUser,
  onLogout,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateSlide,
  onUpdateOrderStatus,
  onUpdateUserRole,
  onDeleteUser
}) {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Editing state for products
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProductForm, setNewProductForm] = useState({
    name: '', category: 'Fresh', price: '', original: '', rating: '4.5', reviews: '10', emoji: '🍎', badge: 'Fresh', organic: false
  })

  // Editing state for slides
  const [editingSlide, setEditingSlide] = useState(null)

  // Calculate statistics
  const totalSales = orders.reduce((sum, ord) => ord.status !== 'Cancelled' ? sum + ord.total : sum, 0)
  const completedOrders = orders.filter(ord => ord.status === 'Completed').length
  const pendingOrders = orders.filter(ord => ord.status === 'Pending').length
  const totalProducts = products.length

  const handleAddProductSubmit = (e) => {
    e.preventDefault()
    const productToAdd = {
      ...newProductForm,
      price: Number(newProductForm.price),
      original: newProductForm.original ? Number(newProductForm.original) : null,
      rating: Number(newProductForm.rating),
      reviews: Number(newProductForm.reviews),
    }
    onAddProduct(productToAdd)
    setShowAddProduct(false)
    setNewProductForm({
      name: '', category: 'Fresh', price: '', original: '', rating: '4.5', reviews: '10', emoji: '🍎', badge: 'Fresh', organic: false
    })
  }

  const handleEditProductSubmit = (e) => {
    e.preventDefault()
    const updated = {
      ...editingProduct,
      price: Number(editingProduct.price),
      original: editingProduct.original ? Number(editingProduct.original) : null,
      rating: Number(editingProduct.rating),
      reviews: Number(editingProduct.reviews),
    }
    onUpdateProduct(updated)
    setEditingProduct(null)
  }

  const handleEditSlideSubmit = (e) => {
    e.preventDefault()
    onUpdateSlide(editingSlide)
    setEditingSlide(null)
  }



  return (
    <div className="admin-panel">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>⚙️</span>
          <h3>Control Center</h3>
        </div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            🍎 Products
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'slides' ? 'active' : ''}`}
            onClick={() => setActiveTab('slides')}
          >
            🖼️ Banner Slides
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders {pendingOrders > 0 && <span className="badge-count">{pendingOrders}</span>}
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users Management
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <p style={{ fontSize: '0.8rem', opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '8px' }}>
            👤 {currentUser?.username || 'Admin'}
          </p>
          <button className="btn-logout" onClick={onLogout}>Log Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        
        {/* Tab 1: Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="tab-pane animate-fadeIn">
            <h2 className="admin-pane-title">Dashboard Overview</h2>
            <div className="kpi-grid">
              <div className="kpi-card">
                <span className="kpi-icon">💰</span>
                <div>
                  <span className="kpi-value">₹{totalSales.toLocaleString()}</span>
                  <span className="kpi-label">Total Revenue</span>
                </div>
              </div>
              <div className="kpi-card">
                <span className="kpi-icon">📦</span>
                <div>
                  <span className="kpi-value">{orders.length}</span>
                  <span className="kpi-label">Total Orders</span>
                </div>
              </div>
              <div className="kpi-card">
                <span className="kpi-icon">🥬</span>
                <div>
                  <span className="kpi-value">{totalProducts}</span>
                  <span className="kpi-label">Catalog Products</span>
                </div>
              </div>
              <div className="kpi-card">
                <span className="kpi-icon">⏳</span>
                <div>
                  <span className="kpi-value">{pendingOrders}</span>
                  <span className="kpi-label">Pending Orders</span>
                </div>
              </div>
            </div>

            <div className="admin-dashboard-row" style={{ marginTop: '30px' }}>
              <div className="recent-orders-card">
                <h3>Recent Orders</h3>
                {orders.length === 0 ? (
                  <p className="no-data-msg">No orders placed yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(ord => (
                          <tr key={ord.id}>
                            <td className="bold">{ord.id}</td>
                            <td>{ord.customer.name}</td>
                            <td>{ord.date}</td>
                            <td className="price">₹{ord.total}</td>
                            <td>
                              <span className={`status-badge ${ord.status.toLowerCase()}`}>
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products CRUD */}
        {activeTab === 'products' && (
          <div className="tab-pane animate-fadeIn">
            <div className="admin-pane-header">
              <h2 className="admin-pane-title">Product Catalog</h2>
              <button className="btn btn-primary" onClick={() => setShowAddProduct(true)}>
                + Add New Product
              </button>
            </div>

            {/* Catalog List */}
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Emoji</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Original Price</th>
                    <th>Badge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod.id}>
                      <td className="emoji-cell">{prod.emoji || '📦'}</td>
                      <td className="bold">{prod.name}</td>
                      <td>{prod.category}</td>
                      <td className="price">₹{prod.price}</td>
                      <td className="priceoriginal">
                        {prod.original ? `₹${prod.original}` : '-'}
                      </td>
                      <td>
                        {prod.badge ? (
                          <span className="table-tag">{prod.badge}</span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="actions-cell">
                        <button className="btn-edit" onClick={() => setEditingProduct(prod)}>✏️ Edit</button>
                        <button className="btn-delete" onClick={() => onDeleteProduct(prod.id)}>🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
              <div className="admin-modal-overlay">
                <div className="admin-modal">
                  <h3>Add New Catalog Item</h3>
                  <form onSubmit={handleAddProductSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          value={newProductForm.name}
                          onChange={e => setNewProductForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Emoji Symbol</label>
                        <input
                          type="text"
                          value={newProductForm.emoji}
                          onChange={e => setNewProductForm(prev => ({ ...prev, emoji: e.target.value }))}
                          required
                          placeholder="e.g. 🍎"
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={newProductForm.category}
                          onChange={e => setNewProductForm(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="Fresh">Fresh</option>
                          <option value="Organic">Organic</option>
                          <option value="Dairy">Dairy</option>
                          <option value="Bakery">Bakery</option>
                          <option value="Snacks">Snacks</option>
                          <option value="Beverages">Beverages</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price (INR)</label>
                        <input
                          type="number"
                          value={newProductForm.price}
                          onChange={e => setNewProductForm(prev => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Original Price (Optional)</label>
                        <input
                          type="number"
                          value={newProductForm.original}
                          onChange={e => setNewProductForm(prev => ({ ...prev, original: e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label>Badge Label</label>
                        <input
                          type="text"
                          value={newProductForm.badge}
                          onChange={e => setNewProductForm(prev => ({ ...prev, badge: e.target.value }))}
                          placeholder="e.g. Bestseller"
                        />
                      </div>
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddProduct(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Add Product</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="admin-modal-overlay">
                <div className="admin-modal">
                  <h3>Edit Product Details</h3>
                  <form onSubmit={handleEditProductSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={e => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Emoji Icon</label>
                        <input
                          type="text"
                          value={editingProduct.emoji}
                          onChange={e => setEditingProduct(prev => ({ ...prev, emoji: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={editingProduct.category}
                          onChange={e => setEditingProduct(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="Fresh">Fresh</option>
                          <option value="Organic">Organic</option>
                          <option value="Dairy">Dairy</option>
                          <option value="Bakery">Bakery</option>
                          <option value="Snacks">Snacks</option>
                          <option value="Beverages">Beverages</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price (INR)</label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={e => setEditingProduct(prev => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Original Price</label>
                        <input
                          type="number"
                          value={editingProduct.original || ''}
                          onChange={e => setEditingProduct(prev => ({ ...prev, original: e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label>Badge Tag</label>
                        <input
                          type="text"
                          value={editingProduct.badge || ''}
                          onChange={e => setEditingProduct(prev => ({ ...prev, badge: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Banner Slide configurations */}
        {activeTab === 'slides' && (
          <div className="tab-pane animate-fadeIn">
            <h2 className="admin-pane-title">Manage Home Hero Slides</h2>
            <div className="slides-grid">
              {slides.map(slide => (
                <div className="slide-config-card" key={slide.id}>
                  <div className="slide-preview-strip" style={{ background: slide.bg }}>
                    <span>Slide {slide.id}</span>
                  </div>
                  <div className="slide-config-details">
                    <h4>{slide.badge}</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{slide.headline}</p>
                    <button className="btn btn-secondary w-full" onClick={() => setEditingSlide(slide)}>
                      🔧 Customize Slider Info
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Slide Modal */}
            {editingSlide && (
              <div className="admin-modal-overlay">
                <div className="admin-modal max-w-lg">
                  <h3>Edit Slide {editingSlide.id} Configurations</h3>
                  <form onSubmit={handleEditSlideSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Badge Text</label>
                        <input
                          type="text"
                          value={editingSlide.badge}
                          onChange={e => setEditingSlide(prev => ({ ...prev, badge: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Headline (use \n for linebreaks)</label>
                        <textarea
                          rows="3"
                          value={editingSlide.headline}
                          onChange={e => setEditingSlide(prev => ({ ...prev, headline: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Subtitle Description</label>
                        <textarea
                          rows="3"
                          value={editingSlide.sub}
                          onChange={e => setEditingSlide(prev => ({ ...prev, sub: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Featured Graphic Name (Alt Tag)</label>
                        <input
                          type="text"
                          value={editingSlide.productName}
                          onChange={e => setEditingSlide(prev => ({ ...prev, productName: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Featured Graphic Price (Hidden in design)</label>
                        <input
                          type="text"
                          value={editingSlide.productPrice}
                          onChange={e => setEditingSlide(prev => ({ ...prev, productPrice: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Floating Tag 1</label>
                        <input
                          type="text"
                          value={editingSlide.floatTag1}
                          onChange={e => setEditingSlide(prev => ({ ...prev, floatTag1: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Floating Tag 2</label>
                        <input
                          type="text"
                          value={editingSlide.floatTag2}
                          onChange={e => setEditingSlide(prev => ({ ...prev, floatTag2: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => setEditingSlide(null)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Save Slide</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Orders Logs */}
        {activeTab === 'orders' && (
          <div className="tab-pane animate-fadeIn">
            <h2 className="admin-pane-title">Customer Placed Orders</h2>
            {orders.length === 0 ? (
              <div className="no-data-msg">No customer orders recorded yet. Place an order from the store to view logs!</div>
            ) : (
              <div className="orders-list">
                {orders.map(ord => (
                  <div className="admin-order-card" key={ord.id}>
                    <div className="order-card-header">
                      <div>
                        <span className="order-id">{ord.id}</span>
                        <span className="order-date">{ord.date}</span>
                      </div>
                      <div>
                        <span className={`status-badge ${ord.status.toLowerCase()}`}>
                          {ord.status}
                        </span>
                        <select
                          className="status-selector"
                          value={ord.status}
                          onChange={e => onUpdateOrderStatus(ord.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="order-card-body">
                      <div className="customer-info">
                        <h5>👤 Customer</h5>
                        <p><strong>Name:</strong> {ord.customer.name}</p>
                        <p><strong>Phone:</strong> {ord.customer.phone}</p>
                        <p><strong>Address:</strong> {ord.customer.address}</p>
                      </div>

                      <div className="items-info">
                        <h5>🛍️ Ordered Items</h5>
                        <ul>
                          {ord.items.map((it, idx) => (
                            <li key={idx}>
                              <span>{it.emoji} {it.name} (x{it.quantity})</span>
                              <span>₹{it.price * it.quantity}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="order-summary-row">
                          <span>Total Amount:</span>
                          <span className="total-amount">₹{ord.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Users Management */}
        {activeTab === 'users' && (
          <div className="tab-pane animate-fadeIn">
            <div className="pane-header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="admin-pane-title" style={{ margin: 0 }}>Users & Admin Management</h2>
            </div>
            
            {users.length === 0 ? (
              <p className="no-data-msg">No users registered yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => {
                      const uid = u._id || u.id;
                      const isSelf = uid === currentUser?.id || uid === currentUser?._id || u.email === currentUser?.email;
                      return (
                        <tr key={uid}>
                          <td><code>{uid}</code></td>
                          <td style={{ fontWeight: 600 }}>{u.username} {isSelf && <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontStyle: 'italic' }}>(You)</span>}</td>
                          <td>{u.email}</td>
                          <td>
                            <span className={`badge ${u.role === 'admin' ? 'badge-orange' : 'badge-green'}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                              {u.role}
                            </span>
                          </td>
                          <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td>
                            <div className="user-action-btns" style={{ display: 'flex', gap: '8px' }}>
                              {u.role === 'admin' ? (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => onUpdateUserRole(uid, 'user')}
                                  disabled={isSelf}
                                  title={isSelf ? "You cannot demote yourself" : "Demote to standard user"}
                                >
                                  Demote to User
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => onUpdateUserRole(uid, 'admin')}
                                  title="Promote to admin"
                                >
                                  Make Admin
                                </button>
                              )}
                              <button
                                className="btn btn-accent btn-sm"
                                style={{ background: 'var(--red-500)', boxShadow: 'none' }}
                                onClick={() => onDeleteUser(uid)}
                                disabled={isSelf}
                                title={isSelf ? "You cannot delete yourself" : "Delete user account"}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
