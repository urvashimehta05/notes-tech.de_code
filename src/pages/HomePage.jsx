import { useState } from 'react';
import Hero from '../components/Hero';
import NotesGrid from '../components/NotesGrid';
import PreviewModal from '../components/PreviewModal';
import InstagramCTA from '../components/InstagramCTA';
import { NOTES } from '../data/notes';

export default function HomePage() {
  const [previewNote, setPreviewNote] = useState(null);

  return (
    <>
      <Hero />

      {/* Featured notes section */}
      <section className="px-5 py-16 md:px-8 md:py-24" id="featured-notes">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl text-charcoal-900 sm:text-4xl">
              Latest Notes
            </h2>
            <p className="mt-3 text-[0.95rem] text-charcoal-400">
              Recently added coding notes, ready to download.
            </p>
          </div>
          <NotesGrid
            notes={NOTES.slice(0, 6)}
            onPreview={(note) => setPreviewNote(note)}
          />
        </div>
      </section>

      <InstagramCTA />

      <PreviewModal
        note={previewNote}
        isOpen={!!previewNote}
        onClose={() => setPreviewNote(null)}
      />
    </>
  );
}
