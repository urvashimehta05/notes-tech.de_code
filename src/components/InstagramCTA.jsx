import { SITE_CONFIG } from '../data/notes';

export default function InstagramCTA() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        {/* Decorative line */}
        <div className="mx-auto mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-warm-300" />
          <svg
            className="h-5 w-5 text-warm-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div className="h-px w-12 bg-warm-300" />
        </div>

        <h2 className="font-serif text-3xl text-charcoal-900 sm:text-4xl">
          More notes on Instagram
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-charcoal-400">
          Follow for new coding notes, developer tips and simple explanations.
        </p>

        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-warm-300 bg-warm-100/50 px-7 py-3.5 text-[0.95rem] font-medium text-charcoal-700 backdrop-blur-sm transition-all hover:border-warm-400 hover:bg-warm-200/50 active:scale-[0.98]"
          id="follow-instagram"
        >
          {/* Instagram icon */}
          <svg
            className="h-4.5 w-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          Follow on Instagram
          <svg
            className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>

        <p className="mt-4 text-[0.82rem] font-medium text-charcoal-300">
          @{SITE_CONFIG.instagramHandle}
        </p>
      </div>
    </section>
  );
}
