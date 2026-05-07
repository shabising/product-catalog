export default function ProductCard({ product, onClick }) {
  const { thumbnail, title, category, price, rating } = product;

  return (
    <div
      onClick={() => onClick(product)}
      className="cursor-pointer bg-[#FFDBDA] border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-all"
    >
      <div className="relative h-44 bg-gray-50">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {category}
        </p>

        <h3
          className="text-sm font-medium line-clamp-2 mb-2 text-[#604D53]"
        >
          {title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-green-600 font-medium">
            ${price.toFixed(2)}
          </span>

          <span className="text-xs text-amber-500">
            ★ {rating.toFixed(1)}
          </span>
        </div>

        <button
          className="w-full text-center text-xs py-1.5 rounded-lg bg-[#DB7F8E] text-white border-none transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}