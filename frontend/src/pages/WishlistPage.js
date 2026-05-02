import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/users/wishlist')
      .then(({ data }) => setWishlist(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await api.post(`/users/wishlist/${productId}`);
      setWishlist(prev => prev.filter(p => p._id !== productId));
      toast.success('Removed from wishlist');
    } catch { toast.error('Failed to remove'); }
  };

  const moveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product._id);
    toast.success('Moved to cart!');
  };

  if (loading) return <div className="loading-center" style={{minHeight:'60vh'}}><div className="spinner"></div></div>;

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>❤️ My Wishlist <span>({wishlist.length} items)</span></h1>
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <span>💔</span>
            <h3>Your wishlist is empty</h3>
            <p>Save items you love by clicking the heart icon on products</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(product => (
              <div key={product._id} className="wishlist-card">
                <Link to={`/products/${product._id}`}>
                  <img src={product.images?.[0]} alt={product.name} />
                </Link>
                <div className="wishlist-info">
                  <span className="wl-category">{product.category}</span>
                  <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
                  <div className="wl-price">
                    <span>₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && <s>₹{product.originalPrice.toLocaleString()}</s>}
                  </div>
                  <div className="wl-actions">
                    <button className="btn btn-primary" onClick={() => moveToCart(product)} disabled={product.stock === 0}>
                      {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
                    </button>
                    <button className="btn btn-ghost remove-wl" onClick={() => removeFromWishlist(product._id)}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
