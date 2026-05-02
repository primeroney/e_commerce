import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <div className="not-found">
    <div className="not-found-content">
      <span className="nf-icon">🛍️</span>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div className="nf-actions">
        <Link to="/" className="btn btn-primary">🏠 Go Home</Link>
        <Link to="/products" className="btn btn-outline">Browse Products</Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
