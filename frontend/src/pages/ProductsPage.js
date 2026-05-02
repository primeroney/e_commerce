import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

const CATEGORIES = ['Electronics','Clothing','Books','Home & Garden','Sports','Beauty','Toys','Automotive','Food','Other'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  const featured = searchParams.get('featured') || '';
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page, limit: 12, sort });
        if (keyword) params.set('keyword', keyword);
        if (category) params.set('category', category);
        if (featured) params.set('featured', featured);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        const { data } = await api.get(`/products?${params}`);
        setProducts(data.products);
        setTotal(data.total);
        setPages(data.pages);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, [keyword, category, sort, page, featured, minPrice, maxPrice]);

  const updateParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  const clearFilters = () => {
    setSearchParams({});
    setMinPrice(''); setMaxPrice('');
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <h1>
            {keyword ? `Results for "${keyword}"` : category ? category : featured ? 'Featured Products' : 'All Products'}
          </h1>
          <p>{total} products found</p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <button className={!category ? 'cat-btn active' : 'cat-btn'} onClick={() => updateParam('category', '')}>All Categories</button>
            {CATEGORIES.map(c => (
              <button key={c} className={category === c ? 'cat-btn active' : 'cat-btn'} onClick={() => updateParam('category', c)}>{c}</button>
            ))}
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input type="number" placeholder="Min ₹" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
              <span>—</span>
              <input type="number" placeholder="Max ₹" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
          </div>

          <button className="btn btn-outline clear-btn" onClick={clearFilters}>Clear All Filters</button>
        </aside>

        {/* Products */}
        <div className="products-main">
          <div className="products-toolbar">
            <span>{total} products</span>
            <select value={sort} onChange={e => updateParam('sort', e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="loading-center"><div className="spinner"></div></div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <span>😕</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
              {pages > 1 && (
                <div className="pagination">
                  {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                    <button key={p} className={page === p ? 'page-btn active' : 'page-btn'}
                      onClick={() => updateParam('page', p)}>{p}</button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
