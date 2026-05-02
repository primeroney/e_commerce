import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './OrdersPage.css';

const STATUS_COLORS = {
  Pending: '#f59e0b', Processing: '#3b82f6', Shipped: '#8b5cf6',
  Delivered: '#10b981', Cancelled: '#ef4444'
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/myorders')
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-center" style={{minHeight:'60vh'}}><div className="spinner"></div></div>;

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <div className="no-orders">
            <span>📦</span>
            <h3>No orders yet</h3>
            <p>You haven't placed any orders yet</p>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                    <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                  </div>
                  <span className="order-status" style={{ background: STATUS_COLORS[order.status] + '22', color: STATUS_COLORS[order.status] }}>
                    {order.status}
                  </span>
                </div>
                <div className="order-items-preview">
                  {order.orderItems.slice(0, 3).map((item, i) => (
                    <img key={i} src={item.image || 'https://via.placeholder.com/50'} alt={item.name} title={item.name} />
                  ))}
                  {order.orderItems.length > 3 && <span className="more-items">+{order.orderItems.length - 3}</span>}
                  <span className="order-items-count">{order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}</span>
                </div>
                <div className="order-card-footer">
                  <div>
                    <span>Total</span>
                    <strong>₹{order.totalPrice.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Payment</span>
                    <strong>{order.paymentMethod}</strong>
                  </div>
                  <Link to={`/orders/${order._id}`} className="btn btn-outline view-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
