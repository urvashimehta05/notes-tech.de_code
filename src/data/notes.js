// ============================================================
// Site Configuration — Edit this file to customize your site
// ============================================================

export const SITE_CONFIG = {
  // Your brand name
  name: 'CodeNotes',

  // Instagram handle — without @
  instagramHandle: 'tech.de_code',

  // Instagram profile URL
  instagramUrl: 'https://instagram.com/tech.de_code',

  // Tagline
  tagline: 'Simple coding notes for developers.',

  // SEO
  siteUrl: 'https://tech.de-code.vercel.app',

  description:
    'Free coding notes created for developers who prefer simple explanations and clean visuals.',
};


// ============================================================
// Categories
// ============================================================

export const CATEGORIES = [
  'All',
  'JavaScript',
  'React',
  'Git',
  'MERN',
];


// ============================================================
// React Notes
// Automatically creates:
// react-notes-1.jpg
// react-notes-2.jpg
// ...
// react-notes-22.jpg
// ============================================================

const reactNoteImages = import.meta.glob(
  '../assets/notes/react-notes-*',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const reactNotesPages = Object.entries(reactNoteImages)
  .sort(([pathA], [pathB]) => {
    const numberA = Number(
      pathA.match(/react-notes-(\d+)/)?.[1] || 0
    );

    const numberB = Number(
      pathB.match(/react-notes-(\d+)/)?.[1] || 0
    );

    return numberA - numberB;
  })
  .map(([, url]) => url);

export const NOTES = [
  {
    id: 'react-notes',

    title: 'React Notes',

    category: 'React',

    description:
      'A complete collection of simple and aesthetic React notes.',

    thumbnail:
      reactNotesPages[0],

    pages:
      reactNotesPages,

    tags: [
      'react',
      'hooks',
      'components',
      'jsx',
      'frontend',
    ],

    pageCount:
      reactNotesPages.length,

    date: '2026-10-03',
  },
];

export function getNoteById(id) {
  return NOTES.find(
    (note) => note.id === id
  );
}

export function getRelatedNotes(
  noteId,
  limit = 3
) {
  const current =
    getNoteById(noteId);

  if (!current) {
    return [];
  }

  // Same category first
  const sameCategory =
    NOTES.filter(
      (note) =>
        note.category === current.category &&
        note.id !== noteId
    );

  // Then other categories
  const others =
    NOTES.filter(
      (note) =>
        note.category !== current.category &&
        note.id !== noteId
    );

  return [
    ...sameCategory,
    ...others,
  ].slice(0, limit);
}

export function filterNotes(
  category = 'All',
  searchTerm = ''
) {
  let filtered = NOTES;

  // Category filter
  if (category !== 'All') {
    filtered =
      filtered.filter(
        (note) =>
          note.category === category
      );
  }

  // Search filter
  if (searchTerm.trim()) {
    const lower =
      searchTerm
        .toLowerCase()
        .trim();

    filtered =
      filtered.filter(
        (note) => {
          const titleMatch =
            note.title
              .toLowerCase()
              .includes(lower);

          const descriptionMatch =
            note.description
              .toLowerCase()
              .includes(lower);

          const tagMatch =
            note.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(lower)
            );

          return (
            titleMatch ||
            descriptionMatch ||
            tagMatch
          );
        }
      );
  }

  return filtered;
}