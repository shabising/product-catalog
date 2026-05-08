export default function Sidebar({ categories, selected, onSelect }) {
  return (
    
    <aside className="w-48 shrink-0 border-r border-gray-100 p-4 bg-[#D5C5C8]">
      <div className="text-2xl font-bold text-gray-900">
        Shoply
      </div>
      <p className="text-xs font-medium text-gray-400 uppercase mb-3">
        Categories
      </p>
      <button
        onClick={() => onSelect('all')}
        className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm mb-1 transition ${
          selected === 'all'
            ? 'bg-green-50 text-green-700 font-medium'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        All
      </button>

      {categories.map((cat) => {
        const slug = cat.slug ?? cat;
        const name = cat.name ?? cat;

        const isActive =
          selected === slug;

        return (
          <button
            key={slug}
            onClick={() => onSelect(slug)}
            className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm mb-1 transition ${
              isActive
                ? 'bg-green-50 text-green-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {name}
          </button>
        );
      })}
    </aside>
  );
}