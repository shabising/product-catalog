import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
const HomePage = lazy(() => import('../pages/Home'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
export default function AppRoutes() {
  return (
    <MainLayout>
      <Suspense fallback={<p className="text-center text-gray-400 py-40">Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}