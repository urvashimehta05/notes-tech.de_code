import { CATEGORIES } from '../data/notes';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-lg px-4 py-2 text-[0.85rem] font-medium transition-all ${
            active === cat
              ? 'bg-charcoal-900 text-warm-50 shadow-sm'
              : 'border border-warm-200 bg-white/50 text-charcoal-500 hover:border-warm-300 hover:bg-warm-100/80 hover:text-charcoal-700'
          }`}
          id={`category-${cat.toLowerCase()}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
