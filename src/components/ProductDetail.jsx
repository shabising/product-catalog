import { useState, useEffect } from 'react';
import { getProduct } from '../services/productService';

export default function ProductDetail({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      setLoading(true);
      const data = await getProduct(productId);

      if (isMounted) {
        setProduct(data);
        setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const stockStatus = product
    ? product.stock > 20
      ? 'In stock'
      : product.stock > 0
      ? 'Low stock'
      : 'Out of stock'
    : null;

  if (!product && !loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center overflow-y-auto p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">
            {loading ? 'Loading...' : product?.title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl px-2"
          >
            ×
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading...</p>
        ) : (
          <div>
            {/* Gallery */}
            <div className="flex gap-3 overflow-x-auto p-4">
              {product?.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.title}
                  className="h-40 w-auto rounded-xl object-cover border border-gray-100"
                />
              ))}
            </div>

            <div className="px-5 pb-5">
              <h1 className="text-lg font-medium mb-1">{product.title}</h1>

              <p className="text-xs text-gray-400 mb-3">
                {product.brand} · {product.category}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Meta */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Price</p>
                  <p className="text-base font-medium text-green-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Discount</p>
                  <p className="text-base font-medium text-amber-600">
                    -{product.discountPercentage.toFixed(1)}%
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Rating</p>
                  <p className="text-base font-medium">
                    ★ {product.rating.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 flex-wrap text-xs">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    stockStatus === 'In stock'
                      ? 'bg-green-100 text-green-700'
                      : stockStatus === 'Low stock'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stockStatus} ({product.stock})
                </span>

                <span className="text-gray-400">
                  {product.shippingInformation}
                </span>

                <span className="text-gray-400">
                  {product.returnPolicy}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}