import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import NotesGrid from '../components/NotesGrid';
import PreviewModal from '../components/PreviewModal';
import { filterNotes } from '../data/notes';

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [previewNote, setPreviewNote] = useState(null);

  const filtered = useMemo(
    () => filterNotes(category, search),
    [category, search]
  );

  return (
    <section className="min-h-screen px-5 pt-28 pb-20 md:px-8 md:pt-36">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="animate-fade-in-up font-serif text-4xl text-charcoal-900 sm:text-5xl">
            Explore Notes
          </h1>
          <p
            className="animate-fade-in-up mt-3 text-[0.95rem] text-charcoal-400"
            style={{ animationDelay: '0.1s' }}
          >
            Simple notes for developers.
          </p>

          {/* Search & Filter */}
          <div
            className="animate-fade-in-up mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            style={{ animationDelay: '0.2s' }}
          >
            {/* <CategoryFilter active={category} onChange={setCategory} /> */}
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-[0.82rem] font-medium text-charcoal-300">
          {filtered.length} {filtered.length === 1 ? 'note' : 'notes'} found
        </p>

        <NotesGrid
          notes={filtered}
          onPreview={(note) => setPreviewNote(note)}
        />
      </div>

      <PreviewModal
        note={previewNote}
        isOpen={!!previewNote}
        onClose={() => setPreviewNote(null)}
      />
    </section>
  );
}
