import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Deals from './components/Deals'
import Products from './components/Products'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app" id="app-root">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Deals />
        <Products />
        <Features />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
