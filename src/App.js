import { useState, useEffect, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import Sidebar from './components/Sidebar';
import ProductDetail from './components/ProductDetail';
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from './services/productService';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selCat, setSelCat] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const request = query.trim()
      ? searchProducts(query)
      : selCat === 'all'
      ? getProducts()
      : getProductsByCategory(
          typeof selCat === 'object' ? selCat.slug : selCat
        );
    request.then(d => {
      setProducts(d.products || []);
      setLoading(false);
    });
  }, [selCat, query]);

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === 'low') arr.sort((a, b) => a.price - b.price);
    if (sort === 'high') arr.sort((a, b) => b.price - a.price);
    if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [products, sort]);

  return (
<div className="flex min-h-screen" style={{backgroundColor: '#FFDBDA'}}>      <Sidebar
        categories={categories}
        selected={selCat}
        onSelect={cat => { setSelCat(cat); setQuery(''); }}
      />

      <main className="flex-1 p-6">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelCat('all'); }}
            className="flex-1 rounded-lg px-3 py-2 text-sm"
           style={{backgroundColor: '#fff', border: '1px solid #ddd', color: '#333'}}
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="default">Default</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sorted.map(p => (
              <ProductCard key={p.id} product={p} onClick={p => setDetailId(p.id)} />
            ))}
          </div>
        )}
      </main>

      {detailId && (
        <ProductDetail
          productId={detailId}
          onClose={() => setDetailId(null)}
        />
      )}
    </div>
  );
}