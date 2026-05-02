import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const CATEGORIES = [
  { name: 'Electronics', icon: '📱', color: '#3b82f6' },
  { name: 'Clothing', icon: '👗', color: '#ec4899' },
  { name: 'Books', icon: '📚', color: '#8b5cf6' },
  { name: 'Home & Garden', icon: '🏠', color: '#10b981' },
  { name: 'Sports', icon: '⚽', color: '#f59e0b' },
  { name: 'Beauty', icon: '💄', color: '#ef4444' },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products?featured=true&limit=8');
        setFeatured(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🎉 New Arrivals Every Week</span>
          <h1>Discover <span>Premium</span><br />Products Online</h1>
          <p>Shop from thousands of curated products with the best deals, fast delivery, and easy returns across India.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn btn-primary">Shop Now →</Link>
            <Link to="/products?featured=true" className="btn btn-outline-white">View Featured</Link>
          </div>
          <div className="hero-stats">
            <div><strong>10K+</strong><span>Products</span></div>
            <div><strong>50K+</strong><span>Customers</span></div>
            <div><strong>4.8★</strong><span>Rating</span></div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-img-wrap">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600" alt="Shopping" />
          </div>
          <div className="hero-float-card">
            <span>🚚</span>
            <div><strong>Free Delivery</strong><p>On orders above ₹499</p></div>
          </div>
          <div className="hero-float-card2">
            <span>🔄</span>
            <div><strong>Easy Returns</strong><p>30-day return policy</p></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Find exactly what you're looking for</p>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat.name} to={`/products?category=${cat.name}`} className="category-card"
                style={{ '--cat-color': cat.color }}>
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked for you</p>
            </div>
            <Link to="/products?featured=true" className="btn btn-outline">View All</Link>
          </div>
          {loading ? (
            <div className="loading-center"><div className="spinner"></div></div>
          ) : (
            <div className="products-grid">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-grid">
            <div className="promo-card red">
              <h3>Electronics Sale</h3>
              <p>Up to 40% off on all electronics</p>
              <Link to="/products?category=Electronics" className="promo-btn">Shop Now</Link>
            </div>
            <div className="promo-card dark">
              <h3>Fashion Week</h3>
              <p>New arrivals in clothing & footwear</p>
              <Link to="/products?category=Clothing" className="promo-btn">Explore</Link>
            </div>
            <div className="promo-card gold">
              <h3>Book Store</h3>
              <p>Bestsellers starting at ₹199</p>
              <Link to="/products?category=Books" className="promo-btn">Browse</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Why ShopNest?</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>We make shopping easy and enjoyable</p>
          <div className="features-grid">
            {[
              { icon: '🚚', title: 'Fast Delivery', desc: 'Free delivery on all orders above ₹499. Same-day delivery in select cities.' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Your payment is 100% secured with end-to-end encryption and multiple payment options.' },
              { icon: '↩️', title: 'Easy Returns', desc: 'Not satisfied? Return within 30 days for a full refund. No questions asked.' },
              { icon: '🏆', title: 'Genuine Products', desc: 'All products are sourced directly from authorized brands and sellers.' },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <h2>Stay Updated</h2>
            <p>Get exclusive deals and new arrivals directly in your inbox</p>
            <form className="newsletter-form" onSubmit={e => { e.preventDefault(); }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
