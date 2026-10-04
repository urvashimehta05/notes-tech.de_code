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

    const response = await fetch(imgUrl);
    const blob = await response.blob();

    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    if (i > 0) pdf.addPage();

    const img = new Image();
    img.src = base64;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgRatio = img.width / img.height;
    const pageRatio = pageWidth / pageHeight;

    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;

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

    pdf.addImage(
      base64,
      'JPEG',
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );
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
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setDownloaded(false);

      if (note.pages.length > 1) {
        await downloadAsPdf(note);
      } else {
        await downloadSingleImage(note);
      }

      // Show success state
      setDownloaded(true);

      // Return to normal button after 2 seconds
      setTimeout(() => {
        setDownloaded(false);
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Full-width prominent button
  if (variant === 'full') {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-charcoal-900 px-7 py-3.5 text-[0.95rem] font-medium text-warm-50 transition-all hover:bg-charcoal-800 hover:shadow-lg hover:shadow-charcoal-900/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
        id={`download-full-${note.id}`}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 4v4m0 8v4m8-8h-4M8 12H4" />
          </svg>
        ) : downloaded ? (
          <>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Downloaded
          </>
        ) : (
          <>
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
          </>
        )}
      </button>
    );
  }

  // Preview button
  if (variant === 'preview') {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className="group inline-flex items-center justify-center gap-1.5 rounded-lg border border-warm-200 px-3 py-2 text-[0.8rem] font-medium text-charcoal-600 transition-all hover:bg-warm-100 hover:text-charcoal-800 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
        id={`download-preview-${note.id}`}
        aria-label="Download notes"
      >
        {loading ? (
          <svg
            className="h-3.5 w-3.5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 4v4m0 8v4m8-8h-4M8 12H4" />
          </svg>
        ) : downloaded ? (
          <>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden sm:inline">Downloaded</span>
          </>
        ) : (
          <>
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
          </>
        )}
      </button>
    );
  }

  // Default card button
  return (
    <button
      disabled={loading}
      onClick={handleDownload}
      className="flex flex-1 items-center justify-center rounded-lg bg-charcoal-900 py-2.5 text-[0.85rem] font-medium text-warm-50 transition-all hover:bg-charcoal-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
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
          <path d="M12 4v4m0 8v4m8-8h-4M8 12H4" />
        </svg>
      ) : downloaded ? (
        <span className="flex items-center gap-1.5">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          Downloaded
        </span>
      ) : (
        'Download'
      )}
    </button>
  );
}