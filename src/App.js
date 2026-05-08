import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Sidebar from './components/Sidebar';
import ProductDetailPage from './pages/ProductDetailPage';
import useDebounce from './hooks/useDebounce';
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from './services/productService';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selCat, setSelCat] = useState(searchParams.get('category') || 'all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelCat(cat);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const request = debouncedQuery.trim()
      ? searchProducts(debouncedQuery)
      : selCat === 'all'
      ? getProducts()
      : getProductsByCategory(
          typeof selCat === 'object' ? selCat.slug : selCat
        );
    request.then(d => {
      setProducts(d.products || []);
      setLoading(false);
    });
  }, [selCat, debouncedQuery]);

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === 'low') arr.sort((a, b) => a.price - b.price);
    if (sort === 'high') arr.sort((a, b) => b.price - a.price);
    if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [products, sort]);

  const handleCatSelect = (cat) => {
    setSelCat(cat);
    setQuery('');
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FFDBDA' }}>
      <Sidebar
        categories={categories}
        selected={selCat}
        onSelect={handleCatSelect}
      />
      <main className="flex-1 p-6">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelCat('all'); }}
            className="flex-1 rounded-lg px-3 py-2 text-sm"
            style={{ backgroundColor: '#fff', border: '1px solid #ddd', color: '#333' }}
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
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}