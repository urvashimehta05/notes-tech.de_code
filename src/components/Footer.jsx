import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../data/notes';

export default function Footer() {
  return (
    <footer className="border-t border-warm-200/60 px-5 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-serif text-xl tracking-tight text-charcoal-900"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-2 max-w-xs text-[0.85rem] leading-relaxed text-charcoal-400">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <Link
              to="/notes"
              className="text-[0.85rem] font-medium text-charcoal-400 transition-colors hover:text-charcoal-700"
            >
              Notes
            </Link>
            <Link
              to="/categories"
              className="text-[0.85rem] font-medium text-charcoal-400 transition-colors hover:text-charcoal-700"
            >
              Categories
            </Link>
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.85rem] font-medium text-charcoal-400 transition-colors hover:text-charcoal-700"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-warm-100 pt-8 md:flex-row md:justify-between">
          <p className="text-[0.78rem] text-charcoal-300">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All notes are free
            to download.
          </p>
          <p className="text-[0.78rem] text-charcoal-300">
            Made with care by{' '}
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-charcoal-500 transition-colors hover:text-charcoal-700"
            >
              @{SITE_CONFIG.instagramHandle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
