import { Routes, Route, lazy, Suspense } from 'react-router-dom';
import HomePage from '../pages/Home';
import NotFound from '../pages/NotFound';

const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));

export default function AppRoutes() {
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