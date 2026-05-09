import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import Loader from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce';
import useFilterStore from '../store/useFilterStore';
import { sortProducts } from '../utils/sort';
import { SORT_OPTIONS, STALE_TIME } from '../constants';
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from '../services/productService';

export default function HomePage() {
const [, setSearchParams] = useSearchParams();
  const { selCat, query, sort, setSelCat, setQuery, setSort } = useFilterStore();

  const debouncedQuery = useDebounce(query, 500);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: STALE_TIME,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', selCat, debouncedQuery],
    queryFn: () =>
      debouncedQuery.trim()
        ? searchProducts(debouncedQuery)
        : selCat === 'all'
        ? getProducts()
        : getProductsByCategory(selCat),
    staleTime: STALE_TIME,
  });

  const sorted = useMemo(() => sortProducts(data?.products || [], sort), [data?.products, sort]);

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
            onChange={e => { setQuery(e.target.value); setSelCat('all'); setSearchParams({}); }}
            className="flex-1 rounded-lg px-3 py-2 text-sm"
            style={{ backgroundColor: '#fff', border: '1px solid #ddd', color: '#333' }}
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
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