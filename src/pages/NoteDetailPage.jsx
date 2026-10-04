import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNoteById, getRelatedNotes, SITE_CONFIG } from '../data/notes';
import NoteCard from '../components/NoteCard';
import DownloadButton from '../components/DownloadButton';
import PreviewModal from '../components/PreviewModal';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNoteById(id);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewNote, setPreviewNote] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Scroll to top on note change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setImageLoaded(false);
  }, [id]);

  if (!note) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5">
        <h1 className="font-serif text-3xl text-charcoal-900">
          Note not found
        </h1>
        <p className="mt-3 text-charcoal-400">
          This note doesn't exist or has been removed.
        </p>
        <Link
          to="/notes"
          className="mt-8 rounded-xl bg-charcoal-900 px-6 py-3 text-[0.9rem] font-medium text-warm-50 transition-all hover:bg-charcoal-800"
        >
          Back to Notes
        </Link>
      </div>
    );
  }

  const relatedNotes = getRelatedNotes(id, 3);

  const handleShare = async () => {
    const shareData = {
      title: note.title,
      text: note.description,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <section className="min-h-screen px-5 pt-28 pb-20 md:px-8 md:pt-36">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="animate-fade-in mb-8 flex items-center gap-2 text-[0.82rem] text-charcoal-300">
            <Link
              to="/notes"
              className="transition-colors hover:text-charcoal-600"
            >
              Notes
            </Link>
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-charcoal-500">{note.category}</span>
          </nav>

          {/* Title section */}
          <div className="animate-fade-in-up">
            <span className="inline-block rounded-md bg-warm-200/60 px-3 py-1 text-[0.75rem] font-semibold tracking-wide text-charcoal-600 uppercase">
              {note.category}
            </span>
            <h1 className="mt-4 font-serif text-4xl text-charcoal-900 sm:text-5xl">
              {note.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-[0.9rem] text-charcoal-400">
              <span>{note.category}</span>
              <span className="text-warm-300">·</span>
              <span>
                {note.pageCount} {note.pageCount === 1 ? 'Page' : 'Pages'}
              </span>
            </p>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-charcoal-500">
              {note.description}
            </p>
          </div>

          {/* Preview image */}
          <div
            className="animate-fade-in-up mt-10"
            style={{ animationDelay: '0.15s' }}
          >
            <button
              onClick={() => {
                setPreviewNote(note);
                setPreviewOpen(true);
              }}
              className="group relative block w-full overflow-hidden rounded-2xl border border-warm-200/60 bg-warm-100/50"
            >
              {!imageLoaded && (
                <div className="img-skeleton aspect-[4/3] w-full" />
              )}
              <img
                src={note.thumbnail}
                alt={note.title}
                onLoad={() => setImageLoaded(true)}
                className={`w-full transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'h-0 opacity-0'
                }`}
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900/0 transition-colors group-hover:bg-charcoal-900/10">
                <span className="rounded-xl bg-white/90 px-6 py-3 text-[0.9rem] font-medium text-charcoal-800 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100">
                  Preview Notes
                </span>
              </div>
              {/* Watermark */}
              <div className="pointer-events-none absolute bottom-4 right-4 text-[0.7rem] font-medium tracking-wider text-charcoal-200/50 uppercase">
                @{SITE_CONFIG.instagramHandle}
              </div>
            </button>
          </div>

          {/* Action buttons */}
          <div
            className="animate-fade-in-up mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '0.25s' }}
          >
            <DownloadButton note={note} variant="full" />
            <button
              onClick={handleShare}
              className="group inline-flex items-center gap-2 rounded-xl border border-warm-300 bg-warm-100/50 px-7 py-3.5 text-[0.95rem] font-medium text-charcoal-700 backdrop-blur-sm transition-all hover:border-warm-400 hover:bg-warm-200/50 active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>

          {/* Tags */}
          {note.tags && note.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-warm-200 bg-warm-50 px-3 py-1 text-[0.75rem] text-charcoal-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related notes */}
          {relatedNotes.length > 0 && (
            <div className="mt-20 border-t border-warm-200/60 pt-16">
              <h2 className="font-serif text-2xl text-charcoal-900 sm:text-3xl">
                You might also like
              </h2>
              <div className="stagger-children mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedNotes.map((rNote) => (
                  <NoteCard
                    key={rNote.id}
                    note={rNote}
                    onPreview={(n) => {
                      setPreviewNote(n);
                      setPreviewOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <PreviewModal
        note={previewNote}
        isOpen={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
          setPreviewNote(null);
        }}
      />
    </>
  );
}
