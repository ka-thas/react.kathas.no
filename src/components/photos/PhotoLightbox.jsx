import React, { useEffect, useRef, useState } from "react";
import PhotoCaption from "./PhotoCaption";
import { formatDay, photoAlt, photoUrl } from "../../lib/photos";

const roundBtn =
  "grid place-items-center rounded-full bg-white/10 text-white leading-none hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

// Marks the history entry the viewer adds, so the back button closes it.
const isViewerEntry = () => window.history.state?.photobox === true;

/**
 * Full-size viewer. The thumbnail shows as a backdrop while the full image
 * loads. Arrow keys or swipes move between photos; Escape, a backdrop click or
 * the back button closes it. `items` is every photo in page order, as { photo, trip }.
 */
function PhotoLightbox({ items, index, base, onClose, onStep }) {
  const { photo, trip } = items[index];
  const box = useRef(null);
  const swipeFrom = useRef(null);
  // Read during the first render, before autoFocus moves focus to the close button.
  const [opener] = useState(() => document.activeElement);
  const many = items.length > 1;

  // Closing goes back through the entry added on open, so back and × end the same way.
  const close = () => (isViewerEntry() ? window.history.back() : onClose());

  // One history entry per open: the back button (or swipe back) closes the viewer
  // instead of leaving the page. Skipped if it is already there (StrictMode, reloads).
  useEffect(() => {
    if (!isViewerEntry()) window.history.pushState({ ...window.history.state, photobox: true }, "");
    window.addEventListener("popstate", onClose);
    return () => window.removeEventListener("popstate", onClose);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      const el = box.current;
      // Keys meant for a dialog on top, like the ⌘K search, are left alone.
      if (!el || e.target.closest?.("dialog[open]")) return;
      if (e.key === "Tab") {
        // Keep focus inside the viewer.
        const buttons = [...el.querySelectorAll("button")].filter((b) => b.getClientRects().length > 0);
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        const inside = el.contains(document.activeElement);
        if (e.shiftKey ? !inside || document.activeElement === first : !inside || document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first)?.focus();
        }
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" && many) onStep(-1);
      else if (e.key === "ArrowRight" && many) onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Lock page scroll (padding where the scrollbar was, so the page doesn't shift),
  // hide the corner home sticker, and give focus back on close.
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.classList.add("photobox-open");
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.body.classList.remove("photobox-open");
      opener?.focus?.({ preventScroll: true });
    };
  }, [opener]);

  // A one-finger, mostly sideways swipe steps. Pinches and pans of a zoomed-in
  // page are left to the browser.
  const onTouchStart = (e) => {
    const zoomed = (window.visualViewport?.scale ?? 1) > 1.01;
    const t = e.touches[0];
    swipeFrom.current = e.touches.length === 1 && !zoomed ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e) => {
    const from = swipeFrom.current;
    swipeFrom.current = null;
    if (!from || !many) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - from.x;
    const dy = t.clientY - from.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > 2 * Math.abs(dy)) onStep(dx < 0 ? 1 : -1);
  };

  const stop = (e) => e.stopPropagation();

  return (
    <div
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={close}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => (swipeFrom.current = null)}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/90 backdrop-blur-sm p-4 animate-[fadeIn_150ms_ease-out]"
    >
      <figure
        onClick={stop}
        className="group relative m-0 overflow-hidden rounded-lg bg-cover bg-center shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        style={{
          aspectRatio: `${photo.width} / ${photo.height}`,
          // dvh: the height left by the phone's browser bars (vh ignores them on iOS).
          width: `min(92vw, calc(80dvh * ${photo.width / photo.height}))`,
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

      <button
        type="button"
        onClick={(e) => { stop(e); close(); }}
        aria-label="Close"
        autoFocus
        className={`absolute top-4 right-4 w-10 h-10 text-2xl ${roundBtn}`}
      >
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
