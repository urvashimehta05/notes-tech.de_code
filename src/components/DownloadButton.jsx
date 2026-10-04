import { jsPDF } from 'jspdf';
import { useState } from 'react';
/**
 * Downloads note pages as a PDF by fetching each image and adding it to a jsPDF document.
 */
async function downloadAsPdf(note) {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < note.pages.length; i++) {
    const imgUrl = note.pages[i];

    // Fetch the image as a blob and convert to base64
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    if (i > 0) pdf.addPage();

    // Calculate dimensions to fit the page
    const img = new Image();
    img.src = base64;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgRatio = img.width / img.height;
    const pageRatio = pageWidth / pageHeight;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > pageRatio) {
      drawWidth = pageWidth;
      drawHeight = pageWidth / imgRatio;
      offsetX = 0;
      offsetY = (pageHeight - drawHeight) / 2;
    } else {
      drawHeight = pageHeight;
      drawWidth = pageHeight * imgRatio;
      offsetX = (pageWidth - drawWidth) / 2;
      offsetY = 0;
    }

    pdf.addImage(base64, 'JPEG', offsetX, offsetY, drawWidth, drawHeight);
  }

  pdf.save(`${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

/**
 * Downloads a single image directly.
 */
async function downloadSingleImage(note) {
  const response = await fetch(note.pages[0]);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function DownloadButton({ note, variant = 'card' }) {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    if (note.pages.length > 1) {
      await downloadAsPdf(note);
      setLoading(false);
    } else {
      await downloadSingleImage(note);
    }
  };

  // Full-width prominent button (used on detail page)
  if (variant === 'full') {
    return (
      <button
        onClick={handleDownload}
        className="group inline-flex items-center gap-2 rounded-xl bg-charcoal-900 px-7 py-3.5 text-[0.95rem] font-medium text-warm-50 transition-all hover:bg-charcoal-800 hover:shadow-lg hover:shadow-charcoal-900/10 active:scale-[0.98]"
        id={`download-full-${note.id}`}
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download {note.pages.length > 1 ? 'PDF' : 'Notes'}
      </button>
    );
  }

  // Compact icon button (used inside the preview modal header)
  if (variant === 'preview') {
    return (
      <button
        onClick={handleDownload}
        className="group inline-flex items-center gap-1.5 rounded-lg border border-warm-200 px-3 py-2 text-[0.8rem] font-medium text-charcoal-600 transition-all hover:bg-warm-100 hover:text-charcoal-800 active:scale-[0.97]"
        id={`download-preview-${note.id}`}
        aria-label="Download notes"
      >
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="hidden sm:inline">Download</span>
      </button>
    );
  }

  // Default card button (used in NoteCard grid)
  return (
    <button
    disabled={loading}
      onClick={handleDownload}
      className="flex-1 rounded-lg bg-charcoal-900 p  y-2.5 text-[0.85rem] font-medium text-warm-50 transition-all hover:bg-charcoal-800 active:scale-[0.98]"
      id={`download-${note.id}`}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ) : (
        'Download'
      )}
    </button>
  );
}
