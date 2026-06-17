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

## 🛠️ Technology Stack
*   **Framework:** [React 19](https://react.dev/)
*   **Bundler & Dev Server:** [Vite 8](https://vite.dev/)
*   **Styling:** Pure Vanilla CSS (custom stylesheets for each component to optimize performance and achieve custom aesthetics)
*   **Icons & Emojis:** Native platform emojis for lightweight, clean visual indicators.

## 📂 Project Structure
```text
MINIMART/
├── public/                # Static assets (images, logos, etc.)
├── src/
│   ├── components/        # Reusable visual components
│   │   ├── Admin.jsx       # Admin Panel controls, CRUD, and Order processing
│   │   ├── Admin.css       # Styling for the admin panel
│   │   ├── CartDrawer.jsx  # Cart drawer sidebar component
│   │   ├── CartDrawer.css  # Cart styling
│   │   ├── Categories.jsx  # Category navigation grid
│   │   ├── Categories.css  # Categories styling
│   │   ├── Deals.jsx       # Special promotional packages
│   │   ├── Deals.css       # Deals section styling
│   │   ├── Features.jsx    # Supermarket value highlights
│   │   ├── Features.css    # Highlights styling
│   │   ├── Footer.jsx      # Bottom footer section
│   │   ├── Footer.css      # Footer styling
│   │   ├── Hero.jsx        # Homepage slideshow banner
│   │   ├── Hero.css        # Slideshow styling
│   │   ├── Navbar.jsx      # Responsive header navigation
│   │   ├── Navbar.css      # Navbar styling
│   │   ├── Newsletter.jsx  # Marketing subscription section
│   │   ├── Newsletter.css  # Newsletter styling
│   │   ├── Products.jsx    # Interactive product listing grid
│   │   ├── Products.css    # Product grid styling
│   │   ├── Testimonials.jsx# Customer reviews slider
│   │   └── Testimonials.css# Testimonials styling
│   ├── App.jsx            # Core application state orchestrator
│   ├── App.css            # Global application layouts
│   ├── index.css          # Design token definitions, variables & typography
│   └── main.jsx           # Application entry point
├── index.html             # Document markup & metadata headers
├── package.json           # Project dependencies & script files
└── vite.config.js         # Build system configuration
```
## 🚀 Getting Started
Follow these steps to run the application locally on your computer:
### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) and npm installed.


### 2. Installation
Clone or navigate to the repository directory and run:
```bash
npm install

## 3. Running Locally
Start the development server:
```bash
npm run dev

By default, the application will run at [http://localhost:5173](http://localhost:5173). Open this URL in your web browser.
### 4. Build for Production
Generate optimized static assets ready for deployment:
```bash
npm run build
The output files will be located in the `dist/` directory.
### 5. Preview Production Build
Locally preview your production build:
```bash
npm run preview
```
## 📝 SEO and Optimization
*   Includes custom semantic HTML5 structure.
*   Pre-configured SEO meta tags, descriptions, and open graph markup in `index.html`.

*   Uses fluid typography (Google Fonts - Outfit & Playfair Display) for modern, fast-loading, premium UI aesthetics.
