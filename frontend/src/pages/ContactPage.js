import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './ContactPage.css';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out anytime and we'll get back to you as soon as possible.</p>
        </div>
      </section>

      <div className="container contact-layout">
        {/* Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have a question about an order, product, or just want to say hello? We'd love to hear from you.</p>
          <div className="contact-cards">
            {[
              { icon: '📍', title: 'Our Office', detail: '12, Tech Park Road\nLucknow, UP 226010\nIndia' },
              { icon: '📞', title: 'Phone', detail: '+91 98765 43210\nMon–Sat, 9am–6pm IST' },
              { icon: '📧', title: 'Email', detail: 'support@shopnest.in\nWe reply within 24 hours' },
              { icon: '💬', title: 'Live Chat', detail: 'Available on our app\nand website 24/7' },
            ].map(c => (
              <div key={c.title} className="contact-card">
                <span>{c.icon}</span>
                <div>
                  <strong>{c.title}</strong>
                  <p>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            {[
              { q: 'How do I track my order?', a: 'Go to My Orders in your account to track real-time status.' },
              { q: 'What is your return policy?', a: 'We offer 30-day hassle-free returns on all eligible products.' },
              { q: 'Do you offer COD?', a: 'Yes! Cash on Delivery is available across 500+ cities in India.' },
            ].map(faq => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          <h2>Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row-2">
              <div className="form-group">
                <label>Your Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="you@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required>
                <option value="">Select a topic</option>
                <option>Order Issue</option>
                <option>Product Query</option>
                <option>Returns & Refunds</option>
                <option>Payment Problem</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="Tell us how we can help..." />
            </div>
            <button type="submit" className="btn btn-primary contact-submit" disabled={loading}>
              {loading ? 'Sending...' : '📨 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
