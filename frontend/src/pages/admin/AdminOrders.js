import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import './Admin.css';

const STATUS_COLORS = { Pending:'#f59e0b', Processing:'#3b82f6', Shipped:'#8b5cf6', Delivered:'#10b981', Cancelled:'#ef4444' };
const STATUSES = ['Pending','Processing','Shipped','Delivered','Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
      toast.success('Order status updated!');
    } catch { toast.error('Failed to update'); }
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  if (loading) return <div className="loading-center" style={{minHeight:'60vh'}}><div className="spinner"></div></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div><h1>🛒 Orders</h1><p>{orders.length} total orders</p></div>
        </div>

        <div className="admin-filters">
          <button className={filter==='all'?'filter-btn active':'filter-btn'} onClick={()=>setFilter('all')}>All ({orders.length})</button>
          {STATUSES.map(s => (
            <button key={s} className={filter===s?'filter-btn active':'filter-btn'} onClick={()=>setFilter(s)}
              style={filter===s?{background:STATUS_COLORS[s],color:'white',borderColor:STATUS_COLORS[s]}:{}}>
              {s} ({orders.filter(o=>o.status===s).length})
            </button>
          ))}
        </div>

        <div className="admin-card">
          <table className="admin-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o._id}>
                  <td><Link to={`/orders/${o._id}`} style={{color:'var(--accent)'}}>#{o._id.slice(-6).toUpperCase()}</Link></td>
                  <td>{o.user?.name || 'N/A'}<br/><small style={{color:'var(--gray-400)'}}>{o.user?.email}</small></td>
                  <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>{o.orderItems?.length} items</td>
                  <td><strong>₹{o.totalPrice?.toLocaleString()}</strong></td>
                  <td>{o.paymentMethod}</td>
                  <td><span className="status-pill" style={{background:STATUS_COLORS[o.status]+'22',color:STATUS_COLORS[o.status]}}>{o.status}</span></td>
                  <td>
                    <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)} className="status-select">
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{textAlign:'center',padding:'40px',color:'var(--gray-400)'}}>No orders found</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
