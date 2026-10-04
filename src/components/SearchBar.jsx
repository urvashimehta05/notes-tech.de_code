export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <svg
        className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-charcoal-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
        className="w-full rounded-xl border border-warm-200 bg-white/60 py-3 pl-11 pr-4 text-[0.95rem] text-charcoal-800 placeholder-charcoal-300 outline-none backdrop-blur-sm transition-all focus:border-warm-400 focus:bg-white focus:ring-2 focus:ring-warm-200/50"
        id="search-notes"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-charcoal-300 transition-colors hover:text-charcoal-600"
          aria-label="Clear search"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
