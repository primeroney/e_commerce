import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    phone: user?.phone || '', password: '', confirm: '',
    street: user?.address?.street || '', city: user?.address?.city || '',
    state: user?.address?.state || '', zipCode: user?.address?.zipCode || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      const payload = {
        name: form.name, email: form.email, phone: form.phone,
        address: { street: form.street, city: form.city, state: form.state, zipCode: form.zipCode }
      };
      if (form.password) payload.password = form.password;
      const { data } = await api.put('/auth/profile', payload);
      updateUser(data.user);
      toast.success('Profile updated!');
      setForm(f => ({ ...f, password: '', confirm: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email} · {user?.role === 'admin' ? '⚙️ Admin' : '👤 Customer'}</p>
          </div>
        </div>

        <div className="profile-grid">
          <form onSubmit={handleSubmit} className="profile-form card">
            <h2>Edit Profile</h2>
            <div className="form-row-2">
              <div className="form-group">
                <label>Full Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
            </div>
            <h3 className="section-label">Address</h3>
            <div className="form-group">
              <label>Street</label>
              <input value={form.street} onChange={e => setForm({...form, street: e.target.value})} placeholder="House no, Street" />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>City</label>
                <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input value={form.state} onChange={e => setForm({...form, state: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>PIN Code</label>
              <input value={form.zipCode} onChange={e => setForm({...form, zipCode: e.target.value})} />
            </div>
            <h3 className="section-label">Change Password (optional)</h3>
            <div className="form-row-2">
              <div className="form-group">
                <label>New Password</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Leave blank to keep" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Changes'}
            </button>
          </form>

          <div className="profile-stats card">
            <h2>Account Info</h2>
            <div className="stat-item"><span>📧</span><div><strong>Email</strong><p>{user?.email}</p></div></div>
            <div className="stat-item"><span>📱</span><div><strong>Phone</strong><p>{user?.phone || 'Not set'}</p></div></div>
            <div className="stat-item"><span>🏠</span><div><strong>City</strong><p>{user?.address?.city || 'Not set'}</p></div></div>
            <div className="stat-item"><span>🎭</span><div><strong>Role</strong><p style={{textTransform:'capitalize'}}>{user?.role}</p></div></div>
            <div className="stat-item"><span>📅</span><div><strong>Member Since</strong><p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
