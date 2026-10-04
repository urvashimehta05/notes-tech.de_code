import { useState } from 'react';
import { Link } from 'react-router-dom';
import DownloadButton from './DownloadButton';

function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="img-skeleton absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default function NoteCard({ note, onPreview }) {
  return (
    <article className="note-card group flex flex-col overflow-hidden rounded-2xl border border-warm-200/60 bg-white/70 backdrop-blur-sm">
      {/* Thumbnail */}
      <Link to={`/note/${note.id}`} className="relative block overflow-hidden">
        <LazyImage
          src={note.thumbnail}
          alt={note.title}
          className="aspect-[4/3] w-full"
        />
        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-md bg-warm-50/90 px-2.5 py-1 text-[0.72rem] font-semibold tracking-wide text-charcoal-600 uppercase backdrop-blur-sm">
          {note.category}
        </span>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal-900/0 transition-colors duration-300 group-hover:bg-charcoal-900/5" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/note/${note.id}`}>
          <h3 className="font-serif text-xl text-charcoal-900 transition-colors group-hover:text-charcoal-700">
            {note.title}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-charcoal-400">
          {note.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-3 text-[0.78rem] text-charcoal-300">
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {note.pageCount} {note.pageCount === 1 ? 'page' : 'pages'}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2 border-t border-warm-100 pt-4">
          <button
            onClick={() => onPreview(note)}
            className="flex-1 rounded-lg border border-warm-200 bg-warm-50 py-2.5 text-[0.85rem] font-medium text-charcoal-600 transition-all hover:border-warm-300 hover:bg-warm-100"
            id={`preview-${note.id}`}
          >
            Preview
          </button>
          <DownloadButton note={note} variant="card" />
        </div>
      </div>
    </article>
  );
}
