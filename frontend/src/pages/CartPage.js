import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = cartTotal > 499 ? 0 : 49;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + shipping + tax;

  if (cartItems.length === 0) return (
    <div className="empty-cart">
      <div className="empty-cart-inner">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet</p>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart <span>({cartItems.length} items)</span></h1>
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-header-row">
              <span>Product</span><span>Price</span><span>Qty</span><span>Subtotal</span><span></span>
            </div>
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-product">
                  <img src={item.images?.[0] || 'https://via.placeholder.com/80'} alt={item.name} />
                  <div>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                    <span>{item.category}</span>
                  </div>
                </div>
                <span className="cart-item-price">₹{item.price.toLocaleString()}</span>
                <div className="qty-control">
                  <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                </div>
                <span className="cart-item-subtotal">₹{(item.price * item.qty).toLocaleString()}</span>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>✕</button>
              </div>
            ))}
            <div className="cart-actions">
              <Link to="/products" className="btn btn-ghost">← Continue Shopping</Link>
              <button className="btn btn-ghost" onClick={clearCart}>🗑 Clear Cart</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? <span className="free">FREE</span> : `₹${shipping}`}</span></div>
            <div className="summary-row"><span>Tax (18%)</span><span>₹{tax.toLocaleString()}</span></div>
            <div className="summary-total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            {shipping === 0 && <p className="free-shipping-note">🎉 You qualify for free shipping!</p>}
            <button className="btn btn-primary checkout-btn"
              onClick={() => user ? navigate('/checkout') : navigate('/login')}>
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
            <div className="secure-badge">🔒 Secure Checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
