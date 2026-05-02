import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import './OrderDetailPage.css';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];
const STATUS_COLORS = { Pending:'#f59e0b', Processing:'#3b82f6', Shipped:'#8b5cf6', Delivered:'#10b981', Cancelled:'#ef4444' };

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-center" style={{minHeight:'60vh'}}><div className="spinner"></div></div>;
  if (!order) return <div className="container" style={{padding:'60px 24px'}}><h2>Order not found</h2></div>;

  const stepIdx = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="order-detail-page">
      <div className="container">
        <div className="order-detail-header">
          <div>
            <Link to="/orders" className="back-link">← My Orders</Link>
            <h1>Order #{order._id.slice(-8).toUpperCase()}</h1>
            <p>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</p>
          </div>
          <span className="status-badge" style={{ background: STATUS_COLORS[order.status]+'22', color: STATUS_COLORS[order.status] }}>
            {order.status}
          </span>
        </div>

        {/* Progress */}
        {order.status !== 'Cancelled' && (
          <div className="order-progress">
            {STATUS_STEPS.map((s, i) => (
              <div key={s} className={`progress-step ${i <= stepIdx ? 'done' : ''}`}>
                <div className="progress-circle">{i < stepIdx ? '✓' : i === stepIdx ? '●' : ''}</div>
                <span>{s}</span>
                {i < STATUS_STEPS.length - 1 && <div className={`progress-line ${i < stepIdx ? 'done' : ''}`}></div>}
              </div>
            ))}
          </div>
        )}

        <div className="order-detail-grid">
          <div className="order-items-section">
            <h2>Order Items</h2>
            {order.orderItems.map((item, i) => (
              <div key={i} className="order-detail-item">
                <img src={item.image || 'https://via.placeholder.com/70'} alt={item.name} />
                <div className="item-info">
                  <Link to={`/products/${item.product}`}>{item.name}</Link>
                  <span>Qty: {item.quantity}</span>
                </div>
                <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="order-price-breakdown">
              <div><span>Subtotal</span><span>₹{order.itemsPrice?.toLocaleString()}</span></div>
              <div><span>Shipping</span><span>{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span></div>
              <div><span>Tax</span><span>₹{order.taxPrice?.toLocaleString()}</span></div>
              <div className="total-row"><span>Total</span><span>₹{order.totalPrice?.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="order-sidebar">
            <div className="order-info-card">
              <h3>📦 Shipping Address</h3>
              <p><strong>{order.shippingAddress?.fullName}</strong></p>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.country}</p>
              <p>📞 {order.shippingAddress?.phone}</p>
            </div>
            <div className="order-info-card">
              <h3>💳 Payment</h3>
              <p>Method: <strong>{order.paymentMethod}</strong></p>
              <p>Status: <strong style={{color: order.isPaid ? '#10b981' : '#f59e0b'}}>{order.isPaid ? '✅ Paid' : '⏳ Pending'}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
