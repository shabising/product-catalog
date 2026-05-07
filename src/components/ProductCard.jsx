export default function ProductCard({ product, onClick }) {
  return (
    <div
        onClick={() => onClick(product)}
        style={{ cursor: 'pointer', backgroundColor: '#FFDBDA' }}
        className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-all"
    >
      <div className="relative h-44 bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>
            <h3 className="text-sm font-medium line-clamp-2 mb-2" style={{color: '#604D53'}}>          {product.title}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-green-600 font-medium">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-amber-500">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
        <button className="w-full text-center text-xs py-1.5 rounded-lg transition" style={{backgroundColor: '#DB7F8E', color: '#fff', border: 'none'}}>
          View Details
        </button>
      </div>
    </div>
  );
}