import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useRecentlyViewed from '../hooks/useRecentlyViewed';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import { getProduct, getProductsByCategory } from '../services/productService';

export default function ProductDetailPage() {
  const addItem = useCartStore(s => s.addItem);
  const { toggle, isFavorite } = useWishlistStore();

  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const favorited = !!product && isFavorite(product.id);

  const { data: relatedData } = useQuery({
    queryKey: ['related', product?.category],
    queryFn: () => getProductsByCategory(product.category),
    enabled: !!product?.category,
    staleTime: 1000 * 60 * 5,
  });

  const { addProduct } = useRecentlyViewed(Number(id));

  useEffect(() => {
    if (product) addProduct(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const related = (relatedData?.products || [])
    .filter(p => p.id !== Number(id))
    .slice(0, 4);

  const stockStatus = product
    ? product.stock > 20
      ? 'In stock'
      : product.stock > 0
      ? 'Low stock'
      : 'Out of stock'
    : null;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500 text-lg font-medium">
          Something went wrong.
        </p>

        <button
          onClick={() => refetch()}
          className="px-5 py-2 rounded-xl bg-[#DB7F8E] text-white hover:bg-[#c06070] transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!isLoading && !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="px-6 py-4 flex items-center gap-3 bg-[#D5C5C8]">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 mr-4"
        >
          Shoply
        </Link>

        <span className="text-gray-400">/</span>

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          ← Back
        </button>

        <span className="text-gray-400">/</span>

        <Link
          to={`/?category=${product?.category}`}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {product?.category}
        </Link>

        <span className="text-gray-400">/</span>

        <span className="text-sm text-gray-800 font-medium line-clamp-1">
          {product?.title}
        </span>
      </div>

      {isLoading ? (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-4">
                <div className="rounded-xl bg-gray-200 animate-pulse h-96 mb-3" />

                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-lg bg-gray-200 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3">
                <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3" />
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
                <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4 mt-4" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-4">
                <div className="rounded-xl overflow-hidden bg-gray-50 mb-3 h-96 flex items-center justify-center">
                  <img
                    src={product.images?.[activeImg]}
                    alt={product.title}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto">
                  {product.images?.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={`Preview image ${i + 1}`}
                      className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                        activeImg === i
                          ? 'border-[#DB7F8E]'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    {product.brand} · {product.category}
                  </p>

                  <h1 className="text-xl font-semibold text-gray-900 mb-3">
                    {product.title}
                  </h1>

                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>

                    <span className="text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      -{product.discountPercentage.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className={
                            star <= Math.round(product.rating)
                              ? 'text-amber-400'
                              : 'text-gray-200'
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <span className="text-sm text-gray-500">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => addItem(product)}
                      className="flex-1 py-2.5 rounded-xl text-sm text-white font-medium bg-[#DB7F8E] hover:bg-[#c06070] transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => toggle(product)}
                      aria-label={
                        favorited
                          ? 'Remove from favorites'
                          : 'Add to favorites'
                      }
                      className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-lg hover:bg-gray-50 transition"
                    >
                      {favorited ? '❤️' : '🤍'}
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full w-fit font-medium ${
                        stockStatus === 'In stock'
                          ? 'bg-green-100 text-green-700'
                          : stockStatus === 'Low stock'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {stockStatus === 'In stock' ? '✓' : '!'}{' '}
                      {stockStatus} ({product.stock} left)
                    </span>

                    <span className="text-xs text-gray-400">
                      🚚 {product.shippingInformation}
                    </span>

                    <span className="text-xs text-gray-400">
                      ↩ {product.returnPolicy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {product.reviews?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 mb-8">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Reviews ({product.reviews.length})
              </h2>

              <div className="flex flex-col gap-4">
                {product.reviews.map((review, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">
                        {review.reviewerName}
                      </span>

                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            className={`text-xs ${
                              star <= review.rating
                                ? 'text-amber-400'
                                : 'text-gray-200'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      {review.comment}
                    </p>

                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="mb-8">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Related Products
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-all block"
                  >
                    <div className="h-36 bg-gray-50">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-3">
                      <p className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">
                        {p.title}
                      </p>

                      <p className="text-xs text-green-600 font-medium">
                        ${p.price.toFixed(2)}
                      </p>

                      <p className="text-xs text-amber-500">
                        ★ {p.rating.toFixed(1)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}