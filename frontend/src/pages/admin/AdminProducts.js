import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import './Admin.css';

const EMPTY = { name:'', description:'', price:'', originalPrice:'', category:'Electronics', brand:'', stock:'', images:[''], featured:false };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const fetchProducts = () => {
    api.get('/products?limit=50').then(({ data }) => setProducts(data.products)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), originalPrice: Number(form.originalPrice), stock: Number(form.stock) };
      if (editing) { await api.put(`/products/${editing}`, payload); toast.success('Product updated!'); }
      else { await api.post('/products', payload); toast.success('Product created!'); }
      setShowForm(false); setEditing(null); setForm(EMPTY); fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    toast.success('Deleted'); fetchProducts();
  };

  const handleEdit = (p) => {
    setForm({ ...p, images: p.images?.length ? p.images : [''] });
    setEditing(p._id); setShowForm(true);
  };

  if (loading) return <div className="loading-center" style={{minHeight:'60vh'}}><div className="spinner"></div></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>📦 Products</h1>
            <p>{products.length} products in store</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY); }}>
            ➕ Add Product
          </button>
        </div>

        {showForm && (
          <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <h2>{editing ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-row-2">
                  <div className="form-group"><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></div>
                  <div className="form-group"><label>Brand</label><input value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})} /></div>
                </div>
                <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required /></div>
                <div className="form-row-3">
                  <div className="form-group"><label>Price (₹)</label><input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required /></div>
                  <div className="form-group"><label>Original Price (₹)</label><input type="number" value={form.originalPrice} onChange={e=>setForm({...form,originalPrice:e.target.value})} /></div>
                  <div className="form-group"><label>Stock</label><input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} required /></div>
                </div>
                <div className="form-row-2">
                  <div className="form-group"><label>Category</label>
                    <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                      {['Electronics','Clothing','Books','Home & Garden','Sports','Beauty','Toys','Automotive','Food','Other'].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label>Image URL</label><input value={form.images?.[0]||''} onChange={e=>setForm({...form,images:[e.target.value]})} placeholder="https://..." /></div>
                </div>
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} />
                  Featured Product
                </label>
                <div className="form-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'} Product</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="admin-card">
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td><img src={p.images?.[0]} alt="" style={{width:48,height:48,objectFit:'cover',borderRadius:6}} /></td>
                  <td><strong>{p.name.slice(0,30)}{p.name.length>30?'...':''}</strong>{p.featured && <span className="featured-tag">⭐</span>}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price.toLocaleString()}</td>
                  <td><span style={{color:p.stock>0?'#10b981':'#ef4444',fontWeight:600}}>{p.stock}</span></td>
                  <td>{p.rating}★ ({p.numReviews})</td>
                  <td>
                    <button className="action-btn edit" onClick={() => handleEdit(p)}>✏️</button>
                    <button className="action-btn delete" onClick={() => handleDelete(p._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
