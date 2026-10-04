import { useState, useEffect, useCallback, useRef } from 'react';
import { SITE_CONFIG } from '../data/notes';
import DownloadButton from './DownloadButton';

export default function PreviewModal({ note, isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef(null);
  const pageRefs = useRef([]);

  // Reset state when note changes
  useEffect(() => {
    setCurrentPage(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [note]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Track which page is in view via scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isOpen || !note) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closest = 0;
      let closestDist = Infinity;

      pageRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - containerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setCurrentPage(closest);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen, note]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen || !note) return;
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [isOpen, note, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !note) return null;

  const totalPages = note.pages.length;

  // Scroll to a specific page when clicking a dot
  const scrollToPage = (index) => {
    const el = pageRefs.current[index];
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal container — narrow, page-like width */}
      <div className="animate-scale-in flex h-full w-full max-w-md flex-col bg-warm-50 shadow-2xl sm:mx-4 sm:my-6 sm:h-auto sm:max-h-[94vh] sm:rounded-2xl md:max-w-lg">

        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-warm-200/60 px-4 py-3">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-serif text-lg text-charcoal-900">
              {note.title}
            </h2>
            <p className="mt-0.5 text-[0.75rem] text-charcoal-400">
              {note.category} · {totalPages}{' '}
              {totalPages === 1 ? 'page' : 'pages'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Download */}
            <DownloadButton note={note} variant="preview" />

            {/* Close */}
            <button
              onClick={onClose}
              className="rounded-lg border border-warm-200 p-2 text-charcoal-500 transition-colors hover:bg-warm-100"
              aria-label="Close preview"
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
          </div>
        </div>

        {/* ── Scrollable page viewer ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain bg-warm-100/40"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#d4c5a5 transparent' }}
        >
          <div className="flex flex-col items-center gap-4 px-3 py-4 sm:gap-5 sm:px-4 sm:py-5">
            {note.pages.map((page, index) => (
              <div
                key={index}
                ref={(el) => (pageRefs.current[index] = el)}
                className="relative w-full"
              >
                {/* Page number label */}
                <div className="mb-1.5 text-center text-[0.7rem] font-medium tracking-wide text-charcoal-300 uppercase">
                  Page {index + 1}
                </div>

                {/* Page image */}
                <div className="relative overflow-hidden rounded-xl border border-warm-200/50 bg-white shadow-sm">
                  <PageImage
                    src={page}
                    alt={`${note.title} — Page ${index + 1}`}
                  />
                  {/* Watermark */}
                  <div className="pointer-events-none absolute bottom-2 right-3 text-[0.65rem] font-medium tracking-wider text-charcoal-300/40 uppercase">
                    @{SITE_CONFIG.instagramHandle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex shrink-0 items-center justify-between border-t border-warm-200/60 px-4 py-3">
          {/* Page dots — show max 10, then compact */}
          <div className="flex items-center gap-1.5">
            {totalPages <= 10
              ? note.pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToPage(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentPage
                        ? 'w-5 bg-charcoal-800'
                        : 'w-1.5 bg-charcoal-200 hover:bg-charcoal-400'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))
              : (
                <div className="flex items-center gap-1">
                  <span className="text-[0.75rem] font-medium text-charcoal-500">
                    {currentPage + 1}
                  </span>
                  <span className="text-[0.7rem] text-charcoal-300">/</span>
                  <span className="text-[0.75rem] text-charcoal-400">
                    {totalPages}
                  </span>
                </div>
              )}
          </div>

          {/* Page counter text */}
          {totalPages <= 10 && (
            <span className="text-[0.75rem] font-medium text-charcoal-400">
              {currentPage + 1} / {totalPages}
            </span>
          )}

          {/* Mobile download (visible on mobile when header download is hidden) */}
          <div className="sm:hidden">
            <DownloadButton note={note} variant="preview" />
          </div>
        </div>
      </div>
    </div>
  );
}


/**
 * Individual page image with lazy loading + skeleton.
 */
function PageImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <div className="img-skeleton aspect-[3/4] w-full" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full transition-opacity duration-400 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
