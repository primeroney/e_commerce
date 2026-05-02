import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './CheckoutPage.css';

const steps = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: user?.name || '', address: '', city: '', state: '',
    postalCode: '', country: 'India', phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const shippingPrice = cartTotal > 499 ? 0 : 49;
  const taxPrice = Math.round(cartTotal * 0.18);
  const totalPrice = cartTotal + shippingPrice + taxPrice;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderItems = cartItems.map(i => ({
        product: i._id, name: i.name,
        image: i.images?.[0], price: i.price, quantity: i.qty
      }));
      const { data } = await api.post('/orders', {
        orderItems, shippingAddress: shipping, paymentMethod,
        itemsPrice: cartTotal, shippingPrice, taxPrice, totalPrice
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally { setLoading(false); }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        {/* Steps */}
        <div className="checkout-steps">
          {steps.map((s, i) => (
            <div key={s} className={`checkout-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <span className="step-num">{i < step ? '✓' : i + 1}</span>
              <span>{s}</span>
              {i < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div className="checkout-section">
                <h2>Shipping Address</h2>
                <form onSubmit={handleShippingSubmit} className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} required placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} required placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Street Address</label>
                    <input value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} required placeholder="House no, Street, Area" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} required placeholder="City" />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})} required placeholder="State" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input value={shipping.postalCode} onChange={e => setShipping({...shipping, postalCode: e.target.value})} required placeholder="PIN Code" />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})} required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary next-btn">Continue to Payment →</button>
                </form>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="checkout-section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  {[
                    { value: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
                    { value: 'UPI', label: 'UPI Payment', icon: '📱', desc: 'PhonePe, GPay, Paytm etc.' },
                    { value: 'Card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                    { value: 'NetBanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
                  ].map(opt => (
                    <label key={opt.value} className={`payment-option ${paymentMethod === opt.value ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value={opt.value}
                        checked={paymentMethod === opt.value}
                        onChange={() => setPaymentMethod(opt.value)} />
                      <span className="pay-icon">{opt.icon}</span>
                      <div>
                        <strong>{opt.label}</strong>
                        <span>{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="checkout-nav">
                  <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn btn-primary next-btn" onClick={() => setStep(2)}>Review Order →</button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="checkout-section">
                <h2>Review Your Order</h2>
                <div className="review-shipping">
                  <h3>📦 Shipping To</h3>
                  <p>{shipping.fullName} | {shipping.phone}</p>
                  <p>{shipping.address}, {shipping.city}, {shipping.state} - {shipping.postalCode}</p>
                </div>
                <div className="review-payment">
                  <h3>💳 Payment: {paymentMethod}</h3>
                </div>
                <div className="review-items">
                  {cartItems.map(item => (
                    <div key={item._id} className="review-item">
                      <img src={item.images?.[0]} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>Qty: {item.qty} × ₹{item.price.toLocaleString()}</span>
                      </div>
                      <span>₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="checkout-nav">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : '✓ Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.map(i => (
              <div key={i._id} className="summary-item">
                <img src={i.images?.[0]} alt={i.name} />
                <span>{i.name.slice(0,28)}...</span>
                <span>×{i.qty}</span>
                <span>₹{(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <hr />
            <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}</span></div>
            <div className="summary-row"><span>Tax (18%)</span><span>₹{taxPrice.toLocaleString()}</span></div>
            <div className="summary-total"><span>Total</span><span>₹{totalPrice.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
