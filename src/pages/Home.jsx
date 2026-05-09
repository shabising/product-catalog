import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import Loader from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce';
import useFilterStore from '../store/useFilterStore';
import { sortProducts } from '../utils/sort';
import useCartStore from '../store/useCartStore';
import { SORT_OPTIONS, STALE_TIME } from '../constants';
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from '../services/productService';

const PAGE_SIZE = 12;

export default function HomePage() {
const { totalItems, openCart } = useCartStore();
  const [, setSearchParams] = useSearchParams();
  const { selCat, query, sort, setSelCat, setQuery, setSort } = useFilterStore();
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: STALE_TIME,
  });

    const { data, isLoading, isError, refetch } = useQuery({
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

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCatSelect = (cat) => {
    setSelCat(cat);
    setQuery('');
    setPage(1);
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
        <div className="flex gap-3 mb-6 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelCat('all'); setPage(1); setSearchParams({}); }}
            className="flex-1 rounded-lg px-3 py-2 text-sm"
            style={{ backgroundColor: '#fff', border: '1px solid #ddd', color: '#333' }}
          />
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
        >
            🛒
            {totalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#DB7F8E] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems()}
            </span>
            )}
        </button>
        </div>

       {isError && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="text-gray-700 font-medium mb-1">Something went wrong</p>
            <p className="text-gray-400 text-sm mb-4">Could not load products. Please try again.</p>
            <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-lg text-sm text-white bg-[#DB7F8E] hover:bg-[#c06070] transition"
            >
            Retry
            </button>
        </div>
        )}

        {isLoading ? (
          <Loader />
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 font-medium">No products found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginated.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition"
                >
                  ←
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition ${
                      page === i + 1
                        ? 'bg-[#DB7F8E] text-white'
                        : 'border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}