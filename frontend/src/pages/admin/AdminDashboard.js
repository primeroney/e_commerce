import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/products?limit=1'),
      api.get('/orders'),
      api.get('/users')
    ]).then(([prodRes, orderRes, userRes]) => {
      const orders = orderRes.data;
      const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
      setStats({
        products: prodRes.data.total,
        orders: orders.length,
        users: userRes.data.length,
        revenue
      });
      setRecentOrders(orders.slice(0, 5));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const STATUS_COLORS = { Pending:'#f59e0b', Processing:'#3b82f6', Shipped:'#8b5cf6', Delivered:'#10b981', Cancelled:'#ef4444' };

  if (loading) return <div className="loading-center" style={{minHeight:'60vh'}}><div className="spinner"></div></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>⚙️ Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store.</p>
        </div>

        <div className="admin-stats">
          {[
            { icon:'📦', label:'Total Products', value: stats.products, link:'/admin/products', color:'#3b82f6' },
            { icon:'🛒', label:'Total Orders', value: stats.orders, link:'/admin/orders', color:'#8b5cf6' },
            { icon:'👥', label:'Customers', value: stats.users, link:'#', color:'#10b981' },
            { icon:'💰', label:'Revenue', value: `₹${stats.revenue.toLocaleString()}`, link:'/admin/orders', color:'#f59e0b' },
          ].map(s => (
            <Link to={s.link} key={s.label} className="admin-stat-card" style={{'--card-color': s.color}}>
              <span className="stat-icon">{s.icon}</span>
              <div>
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="admin-grid">
          <div className="admin-card">
            <div className="card-head">
              <h2>Recent Orders</h2>
              <Link to="/admin/orders">View All →</Link>
            </div>
            <table className="admin-table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o._id}>
                    <td><Link to={`/orders/${o._id}`}>#{o._id.slice(-6).toUpperCase()}</Link></td>
                    <td>{o.user?.name || 'N/A'}</td>
                    <td>₹{o.totalPrice.toLocaleString()}</td>
                    <td><span className="status-pill" style={{background:STATUS_COLORS[o.status]+'22', color:STATUS_COLORS[o.status]}}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link to="/admin/products" className="qa-btn">➕ Add Product</Link>
              <Link to="/admin/orders" className="qa-btn">📋 Manage Orders</Link>
              <Link to="/products" className="qa-btn">🛍️ View Store</Link>
              <Link to="/profile" className="qa-btn">👤 Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
