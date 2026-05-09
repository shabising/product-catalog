import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { id, thumbnail, title, category, price, rating } = product;

  return (
    <Link
      to={`/product/${id}`}
      aria-label={`View details for ${title}`}
      className="cursor-pointer bg-white border border-[#DB7F8E] rounded-xl overflow-hidden hover:border-[#c06070] transition-all block focus:outline-none focus:ring-2 focus:ring-[#DB7F8E]"
    >
      <div className="relative h-44 bg-gray-50">
        <img
          src={thumbnail}
          alt={`${title} thumbnail`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3" style={{ backgroundColor: '#FFDBDA' }}>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {category}
        </p>
        <h3 className="text-sm font-medium line-clamp-2 mb-2 text-[#604D53]">
          {title}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-green-600 font-medium" aria-label={`Price: $${price.toFixed(2)}`}>
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-amber-500" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
            ★ {rating.toFixed(1)}
          </span>
        </div>
        <button
          aria-label={`View details for ${title}`}
          className="w-full text-center text-xs py-1.5 rounded-lg bg-[#DB7F8E] text-white border-none transition focus:outline-none focus:ring-2 focus:ring-[#c06070]"
        >
          View Details
        </button>
      </div>
    </Link>
  );
}