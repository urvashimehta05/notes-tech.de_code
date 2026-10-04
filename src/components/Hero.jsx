import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../data/notes';

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-5 pt-20 md:px-8">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold-200/20 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-warm-200/30 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Small badge */}
        <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-warm-100/60 px-4 py-1.5 text-[0.8rem] font-medium text-charcoal-500 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          Free &amp; open coding notes
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-in-up font-serif text-5xl leading-[1.1] tracking-tight text-charcoal-900 sm:text-6xl md:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          Notes, made{' '}
          <span className="italic text-gold-600">simple.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-charcoal-400 sm:text-xl"
          style={{ animationDelay: '0.2s' }}
        >
          Save the notes. Learn at your own pace.
        </p>

        {/* Description */}
        <p
          className="animate-fade-in-up mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-charcoal-300"
          style={{ animationDelay: '0.3s' }}
        >
          Free coding notes created for developers who prefer simple
          explanations and clean visuals.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            to="/notes"
            className="group inline-flex items-center gap-2 rounded-xl bg-charcoal-900 px-7 py-3.5 text-[0.95rem] font-medium text-warm-50 transition-all hover:bg-charcoal-800 hover:shadow-lg hover:shadow-charcoal-900/10 active:scale-[0.98]"
          >
            Explore Notes
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-warm-300 bg-warm-100/50 px-7 py-3.5 text-[0.95rem] font-medium text-charcoal-700 backdrop-blur-sm transition-all hover:border-warm-400 hover:bg-warm-200/50 active:scale-[0.98]"
          >
            Instagram
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
        </div>

        {/* Stats */}
        <div
          className="animate-fade-in-up mt-20 flex justify-center gap-12 sm:gap-16"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            { value: '50+', label: 'Notes' },
            { value: '4', label: 'Categories' },
            { value: 'Free', label: 'to Download' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl text-charcoal-900 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[0.8rem] font-medium tracking-wide text-charcoal-300 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in">
        <div className="flex flex-col items-center gap-2 text-charcoal-300">
          <span className="text-[0.7rem] tracking-widest uppercase">
            Scroll
          </span>
          <svg
            className="h-4 w-4 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
