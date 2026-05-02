import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetailPage.css';

const StarRating = ({ rating, interactive, onRate }) => (
  <div className="stars">
    {[1,2,3,4,5].map(s => (
      <span key={s}
        className={`star ${s <= Math.round(rating) ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
        onClick={() => interactive && onRate && onRate(s)}>★</span>
    ))}
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch { toast.error('Product not found'); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock === 0) return toast.error('Out of stock');
    addToCart(product, qty);
    toast.success('Added to cart!');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to review');
    setSubmittingReview(true);
    try {
      await api.post(`/reviews/${id}`, { rating: reviewRating, comment: reviewComment });
      toast.success('Review submitted!');
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setReviewComment('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting review');
    } finally { setSubmittingReview(false); }
  };

  const discount = product && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  if (loading) return <div className="loading-center" style={{minHeight:'60vh'}}><div className="spinner"></div></div>;
  if (!product) return <div className="container" style={{padding:'60px 24px'}}><h2>Product not found</h2><Link to="/products">Back to Products</Link></div>;

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.images?.[activeImg] || 'https://via.placeholder.com/500'} alt={product.name} />
              {discount > 0 && <span className="detail-discount-badge">-{discount}% OFF</span>}
            </div>
            {product.images?.length > 1 && (
              <div className="image-thumbs">
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt="" className={activeImg === i ? 'active' : ''}
                    onClick={() => setActiveImg(i)} />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <span className="detail-category">{product.category}</span>
            {product.brand && <span className="detail-brand">by {product.brand}</span>}
            <h1>{product.name}</h1>

            <div className="detail-rating">
              <StarRating rating={product.rating} />
              <span>{product.rating} ({product.numReviews} reviews)</span>
            </div>

            <div className="detail-price">
              <span className="detail-current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="detail-original-price">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="detail-savings">You save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
                </>
              )}
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✅ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock-text">❌ Out of Stock</span>
              )}
            </div>

            <div className="detail-actions">
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
              <button className="btn btn-primary add-cart-btn" onClick={handleAddToCart} disabled={product.stock === 0}>
                🛒 Add to Cart
              </button>
            </div>

            <Link to="/cart" className="btn btn-secondary buy-now-btn">⚡ Buy Now</Link>

            <div className="detail-meta">
              {product.tags?.length > 0 && (
                <div className="tags">
                  <span>Tags:</span>
                  {product.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section">
          <h2>Customer Reviews</h2>

          {user && (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <h3>Write a Review</h3>
              <div className="review-rating-pick">
                <span>Your Rating:</span>
                <StarRating rating={reviewRating} interactive onRate={setReviewRating} />
              </div>
              <textarea
                placeholder="Share your experience with this product..."
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                required rows={4}
              />
              <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          <div className="reviews-list">
            {product.reviews?.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            ) : (
              product.reviews.map(r => (
                <div key={r._id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-avatar">{r.name?.charAt(0)}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <StarRating rating={r.rating} />
                    </div>
                    <span className="review-date">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
