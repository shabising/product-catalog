export default function Sidebar({ categories, selected, onSelect }) {
  return (
  <aside className="w-48 shrink-0 border-r border-gray-100 p-4" style={{backgroundColor: '#D5C5C8'}}>
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
      {categories.map((cat, i) => {
        const slug = typeof cat === 'object' ? cat.slug : cat;
        const name = typeof cat === 'object' ? cat.name : cat;
        const isActive =
          typeof selected === 'object' ? selected.slug === slug : selected === slug;
        return (
          <button
            key={i}
            onClick={() => onSelect(cat)}
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