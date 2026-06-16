# 🛒 MiniMart Pro - Supermarket Management System

A modern, fast, and feature-rich React web application for a neighborhood supermarket. MiniMart Pro features an interactive customer storefront and an integrated administration panel for managing inventory, carousel configurations, and customer orders.


## ✨ Features
### 🛍️ Customer Storefront
*   **Dynamic Hero Slider:** Responsive interactive carousel featuring stats, floating highlights, and direct calls-to-action for current promotions and sales.

*   **Smart Product Catalog:** Browse products by categories (Fresh, Organic, Dairy, Bakery, Snacks, Beverages, etc.) with real-time badges (organic, fresh, imported, etc.), pricing discounts, ratings, and reviews.

*   **Interactive Cart Drawer:** Sliding shopping cart supporting quantity adjustments, item removal, and live order value computation.
*   **Simulated Checkout:** Smooth checkout flow prompting for shipping/customer details to record orders.

### ⚙️ Administration Dashboard
*   **Product Inventory Management (CRUD):**
    *   Add new products with descriptions, prices, categories, emojis, and custom badges.
    *   Update existing product data in real-time.
    *   Delete products from the active catalog.

*   **Slide Manager:** Edit storefront promotional slider images, headings, colors, subheadings, stats, and discount badges directly from the portal.
*   **Order Tracker:** Monitor incoming customer orders, review cart items, total order values, and dynamically update order statuses (e.g., *Pending*, *Processing*, *Shipped*, *Delivered*).

### 💾 Data Persistence
*   **Offline Support:** Leverages browser `localStorage` to persist product inventory, slider configurations, and order records across page reloads.
