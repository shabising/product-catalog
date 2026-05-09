import { useMemo, useState, lazy, Suspense } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './components/ProductCard';
import Sidebar from './components/Sidebar';
import useDebounce from './hooks/useDebounce';
import Loader from './components/ui/Loader';
import NotFound from './pages/NotFound';
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from './services/productService';

const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selCat, setSelCat] = useState(searchParams.get('category') || 'all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');

  const debouncedQuery = useDebounce(query, 500);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', selCat, debouncedQuery],
    queryFn: () =>
      debouncedQuery.trim()
        ? searchProducts(debouncedQuery)
        : selCat === 'all'
        ? getProducts()
        : getProductsByCategory(selCat),
    staleTime: 1000 * 60 * 5,
  });

  const sorted = useMemo(() => {
    const arr = [...(data?.products || [])];
    if (sort === 'low') arr.sort((a, b) => a.price - b.price);
    if (sort === 'high') arr.sort((a, b) => b.price - a.price);
    if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [data?.products, sort]);

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
    <div className="flex min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
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

        {isError && (
          <p className="text-center text-red-400 py-20">Something went wrong. Please try again.</p>
        )}

        {isLoading ? (
          <Loader />
        ) : sorted.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found.</p>
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
    <Suspense fallback={<p className="text-center text-gray-400 py-40">Loading...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}