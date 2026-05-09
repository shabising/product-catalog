export default function Sidebar({ categories, selected, onSelect }) {


  return (
    <aside
      className="w-48 shrink-0 border-r border-gray-100 p-4 bg-[#D5C5C8]"
      aria-label="Product categories"
    >
    <div className="text-2xl font-bold text-gray-900 mb-3">Shoply</div>

      <p className="text-xs font-medium text-gray-400 uppercase mb-3">
        Categories
      </p>

      <nav aria-label="Category filter">
        <button
          onClick={() => onSelect('all')}
          aria-pressed={selected === 'all'}
          className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm mb-1 transition focus:outline-none focus:ring-2 focus:ring-[#DB7F8E] ${
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
          const isActive = selected === slug;

          return (
            <button
              key={slug}
              onClick={() => onSelect(slug)}
              aria-pressed={isActive}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm mb-1 transition focus:outline-none focus:ring-2 focus:ring-[#DB7F8E] ${
                isActive
                  ? 'bg-green-50 text-green-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}