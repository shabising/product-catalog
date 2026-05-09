import { Link } from 'react-router-dom';
import useWishlistStore from '../store/useWishlistStore';

export default function FavoritesPage() {
  const { items, toggle } = useWishlistStore();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="px-6 py-4 bg-[#D5C5C8] flex items-center gap-3">
        <Link to="/" className="text-xl font-bold text-gray-900 mr-4">
          Shoply
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium text-gray-800">Favorites</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Favorites ({items.length})
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-5xl mb-4">🤍</p>
            <p className="text-gray-500 font-medium text-lg">No favorites yet</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">
              Add products you love by clicking the heart icon
            </p>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-[#DB7F8E] text-white text-sm font-medium hover:bg-[#c06070] transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#DB7F8E] rounded-xl overflow-hidden hover:border-[#c06070] transition-all"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-44 bg-gray-50 overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-3" style={{ backgroundColor: '#FFDBDA' }}>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-medium line-clamp-2 mb-2 text-[#604D53]">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-600 font-medium">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-amber-500">
                        ★ {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-3 pb-3" style={{ backgroundColor: '#FFDBDA' }}>
                  <button
                    onClick={() => toggle(product)}
                    className="w-full text-center text-xs py-1.5 rounded-lg bg-white text-[#DB7F8E] border border-[#DB7F8E] hover:bg-[#DB7F8E] hover:text-white transition"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}