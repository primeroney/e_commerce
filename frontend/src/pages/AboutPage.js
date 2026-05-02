import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const TEAM = [
  { name: 'Arjun Sharma', role: 'CEO & Founder', avatar: '👨‍💼', bio: 'Visionary leader with 15+ years in e-commerce and retail.' },
  { name: 'Priya Patel', role: 'CTO', avatar: '👩‍💻', bio: 'Tech innovator building the future of online shopping.' },
  { name: 'Rahul Gupta', role: 'Head of Operations', avatar: '👨‍🔧', bio: 'Ensures seamless delivery experience for every customer.' },
  { name: 'Neha Singh', role: 'Customer Success', avatar: '👩‍💼', bio: 'Dedicated to making every shopper\'s experience delightful.' },
];

const STATS = [
  { num: '10K+', label: 'Products Listed' },
  { num: '500K+', label: 'Happy Customers' },
  { num: '50+', label: 'Brand Partners' },
  { num: '4.8★', label: 'Average Rating' },
];

const AboutPage = () => (
  <div className="about-page">
    {/* Hero */}
    <section className="about-hero">
      <div className="container">
        <h1>Our Story</h1>
        <p>ShopNest was founded with a simple belief — everyone deserves access to quality products at honest prices, delivered with care.</p>
      </div>
    </section>

    {/* Mission */}
    <section className="about-mission">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-text">
            <h2>Who We Are</h2>
            <p>ShopNest is India's fastest-growing premium e-commerce platform, connecting millions of shoppers with top brands and trusted sellers since 2020.</p>
            <p>We believe shopping should be joyful — not just a transaction. That's why we obsess over every detail: from product quality and accurate descriptions to packaging and delivery speed.</p>
            <p>Our platform serves customers across 500+ cities in India, offering everything from cutting-edge electronics to handcrafted fashion, books, and everyday essentials.</p>
            <Link to="/products" className="btn btn-primary" style={{marginTop:'16px'}}>Shop Now →</Link>
          </div>
          <div className="mission-image">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" alt="Team" />
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="about-stats">
      <div className="container">
        <div className="stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-box">
              <strong>{s.num}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="about-values">
      <div className="container">
        <h2 className="section-title" style={{textAlign:'center'}}>Our Values</h2>
        <p className="section-subtitle" style={{textAlign:'center'}}>What drives us every day</p>
        <div className="values-grid">
          {[
            { icon: '🎯', title: 'Quality First', desc: 'Every product is vetted for quality. We only list products that meet our standards.' },
            { icon: '🤝', title: 'Customer Trust', desc: 'Transparent policies, honest reviews, and no hidden charges — ever.' },
            { icon: '🌱', title: 'Sustainability', desc: 'We actively partner with eco-friendly brands and use recyclable packaging.' },
            { icon: '⚡', title: 'Speed & Reliability', desc: 'Fast delivery, real-time tracking, and reliable logistics partners.' },
            { icon: '💡', title: 'Innovation', desc: 'Continuously improving our platform to make your shopping experience better.' },
            { icon: '❤️', title: 'Community', desc: 'We give back — 1% of every sale goes to education and environmental causes.' },
          ].map(v => (
            <div key={v.title} className="value-card">
              <span>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="about-team">
      <div className="container">
        <h2 className="section-title" style={{textAlign:'center'}}>Meet the Team</h2>
        <p className="section-subtitle" style={{textAlign:'center'}}>The people behind ShopNest</p>
        <div className="team-grid">
          {TEAM.map(m => (
            <div key={m.name} className="team-card">
              <div className="team-avatar">{m.avatar}</div>
              <h3>{m.name}</h3>
              <span>{m.role}</span>
              <p>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="about-cta">
      <div className="container">
        <div className="cta-inner">
          <h2>Ready to Start Shopping?</h2>
          <p>Join over 500,000 happy customers across India</p>
          <div style={{display:'flex', gap:'16px', justifyContent:'center'}}>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
            <Link to="/register" className="btn btn-outline-white">Create Account</Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
