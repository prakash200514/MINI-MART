import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'minimart_secret_key_2026_secure';

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/minimart';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schemas & Models
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  original: { type: Number, default: null },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  emoji: { type: String, default: '📦' },
  badge: { type: String, default: '' },
  organic: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

const slideSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  badge: { type: String, default: '' },
  headline: { type: String, default: '' },
  sub: { type: String, default: '' },
  cta1: {
    label: { type: String, default: '' },
    href: { type: String, default: '' }
  },
  cta2: {
    label: { type: String, default: '' },
    href: { type: String, default: '' }
  },
  stats: [{
    value: { type: String, default: '' },
    label: { type: String, default: '' }
  }],
  accent: { type: String, default: '' },
  bg: { type: String, default: '' },
  productImg: { type: String, default: '' },
  productLabel: { type: String, default: '' },
  productName: { type: String, default: '' },
  productPrice: { type: String, default: '' },
  productOriginal: { type: String, default: '' },
  productDiscount: { type: String, default: '' },
  floatTag1: { type: String, default: '' },
  floatTag2: { type: String, default: '' }
});

const Slide = mongoose.model('Slide', slideSchema);

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    payMethod: { type: String, required: true }
  },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    emoji: { type: String, default: '📦' }
  }],
  total: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

// Initial Seed Data
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
];

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
];

// Seed Database
async function seedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(initialProducts);
      console.log('Seeded initial products to MongoDB');
    }

    const slideCount = await Slide.countDocuments();
    if (slideCount === 0) {
      await Slide.insertMany(initialSlides);
      console.log('Seeded initial slides to MongoDB');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();

// REST API Endpoints

// Products Endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// Slides Endpoints
app.get('/api/slides', async (req, res) => {
  try {
    const slides = await Slide.find({}).sort({ id: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving slides', error: error.message });
  }
});

app.put('/api/slides/:id', async (req, res) => {
  try {
    const updatedSlide = await Slide.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.json(updatedSlide);
  } catch (error) {
    res.status(400).json({ message: 'Error updating slide', error: error.message });
  }
});

// Orders Endpoints
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
