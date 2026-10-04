import NoteCard from './NoteCard';

export default function NotesGrid({ notes, onPreview }) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg
          className="mb-4 h-16 w-16 text-warm-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="font-serif text-xl text-charcoal-500">
          No notes found
        </h3>
        <p className="mt-2 text-[0.9rem] text-charcoal-300">
          Try adjusting your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onPreview={onPreview} />
      ))}
    </div>
  );
}
