import React, { useEffect, useRef, useState } from "react";
import PhotoCaption from "./PhotoCaption";
import { formatDay, photoAlt, photoUrl } from "../../lib/photos";

const roundBtn =
  "grid place-items-center rounded-full bg-white/10 text-white leading-none hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

/**
 * Full-size viewer. The thumbnail shows as a backdrop while the full image
 * loads. Arrow keys or swipes move between photos; Escape or a backdrop click
 * closes it. `items` is every photo in page order, as { photo, trip }.
 */
function PhotoLightbox({ items, index, base, onClose, onStep }) {
  const { photo, trip } = items[index];
  const swipeFrom = useRef(null);
  // Read during the first render, before autoFocus moves focus to the close button.
  const [opener] = useState(() => document.activeElement);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  // Lock page scroll, hide the corner home sticker, and give focus back on close.
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("photobox-open");
    return () => {
      document.body.style.overflow = overflow;
      document.body.classList.remove("photobox-open");
      opener?.focus?.();
    };
  }, [opener]);

  const stop = (e) => e.stopPropagation();
  const many = items.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      onTouchStart={(e) => (swipeFrom.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (swipeFrom.current ?? 0);
        if (many && Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        swipeFrom.current = null;
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/90 backdrop-blur-sm p-4 animate-[fadeIn_150ms_ease-out]"
    >
      <figure
        onClick={stop}
        className="group relative m-0 overflow-hidden rounded-lg bg-cover bg-center shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        style={{
          aspectRatio: `${photo.width} / ${photo.height}`,
          width: `min(92vw, calc(80vh * ${photo.width / photo.height}))`,
          backgroundImage: `url("${photoUrl(base, photo.thumb)}")`,
        }}
      >
        <img
          key={photo.id}
          src={photoUrl(base, photo.file)}
          alt={photoAlt(photo)}
          className="block w-full h-full object-cover"
        />
        {photo.caption && <PhotoCaption key={photo.id} caption={photo.caption} size="lg" />}
      </figure>

      <p onClick={stop} className="m-0 text-sm text-white/70 tabular-nums text-center">
        {trip && `${trip.name} · `}
        {formatDay(photo.takenAt)}
        {many && ` · ${index + 1} / ${items.length}`}
      </p>

      <button type="button" onClick={onClose} aria-label="Close" autoFocus className={`absolute top-4 right-4 w-10 h-10 text-2xl ${roundBtn}`}>
        ×
      </button>

      {many && (
        <>
          <button
            type="button"
            onClick={(e) => { stop(e); onStep(-1); }}
            aria-label="Previous photo"
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 text-3xl max-sm:hidden ${roundBtn}`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => { stop(e); onStep(1); }}
            aria-label="Next photo"
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 text-3xl max-sm:hidden ${roundBtn}`}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

export default PhotoLightbox;
