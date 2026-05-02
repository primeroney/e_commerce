import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const StarRating = ({ rating }) => (
  <div className="stars">
    {[1,2,3,4,5].map(s => (
      <span key={s} className={`star ${s <= Math.round(rating) ? 'filled' : 'empty'}`}>★</span>
    ))}
  </div>
);

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return toast.error('Out of stock');
    addToCart(product, 1);
    toast.success(`${product.name.slice(0, 20)}... added to cart!`);
  };

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=Product'}
          alt={product.name}
          loading="lazy"
        />
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        {product.featured && <span className="featured-badge">⭐ Featured</span>}
        {product.stock === 0 && <div className="out-of-stock-overlay">Out of Stock</div>}
        <button className="quick-add" onClick={handleAddToCart} disabled={product.stock === 0}>
          🛒 Add to Cart
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="review-count">({product.numReviews})</span>
        </div>
        <div className="product-price">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
