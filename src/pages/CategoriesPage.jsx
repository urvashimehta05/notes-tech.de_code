import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, NOTES } from '../data/notes';
import PreviewModal from '../components/PreviewModal';
import NoteCard from '../components/NoteCard';

export default function CategoriesPage() {
  const [previewNote, setPreviewNote] = useState(null);
  const categories = CATEGORIES.filter((c) => c !== 'All');

  return (
    <section className="min-h-screen px-5 pt-28 pb-20 md:px-8 md:pt-36">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="animate-fade-in-up font-serif text-4xl text-charcoal-900 sm:text-5xl">
            Categories
          </h1>
          <p
            className="animate-fade-in-up mt-3 text-[0.95rem] text-charcoal-400"
            style={{ animationDelay: '0.1s' }}
          >
            Browse notes by topic.
          </p>
        </div>

        {/* Category sections */}
        {categories.map((cat) => {
          const catNotes = NOTES.filter((n) => n.category === cat);
          if (catNotes.length === 0) return null;

          return (
            <div key={cat} className="mb-16" id={`cat-${cat.toLowerCase()}`}>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl text-charcoal-900 sm:text-3xl">
                    {cat}
                  </h2>
                  <span className="rounded-md bg-warm-200/60 px-2 py-0.5 text-[0.72rem] font-semibold text-charcoal-500">
                    {catNotes.length}
                  </span>
                </div>
                <Link
                  to={`/notes?category=${cat}`}
                  className="text-[0.85rem] font-medium text-charcoal-400 transition-colors hover:text-charcoal-700"
                >
                  View all →
                </Link>
              </div>

              <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {catNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onPreview={(n) => setPreviewNote(n)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PreviewModal
        note={previewNote}
        isOpen={!!previewNote}
        onClose={() => setPreviewNote(null)}
      />
    </section>
  );
}
