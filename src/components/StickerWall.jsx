// The sticker wall (src/posts/stickers.mdx): every sticker on the site, see lib/stickers.js.
// Tap a sticker that has a comment (src/posts/sticker-comments.md) to show it in a bubble.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { stickers } from "../lib/stickers";

function StickerWall() {
  const [open, setOpen] = useState(null); // name of the sticker whose bubble is showing
  const wall = useRef(null);

  // Close after 3 seconds, on a tap outside the open sticker, or on Esc.
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(null), 3000);
    const onDown = (e) => {
      if (!e.target.closest(`[data-sticker="${open}"]`)) setOpen(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep the bubble on screen: nudge it sideways if it would stick out of the page.
  useLayoutEffect(() => {
    const b = open && wall.current.querySelector(`[data-sticker="${open}"] [data-bubble]`);
    if (!b) return;
    b.style.marginLeft = "0px";
    const { left, right } = b.getBoundingClientRect();
    const edge = 8;
    const nudge = Math.max(edge - left, 0) - Math.max(right - (window.innerWidth - edge), 0);
    b.style.marginLeft = `${nudge}px`;
  }, [open]);

  if (stickers.length === 0) {
    return <p className="opacity-45">No stickers yet.</p>;
  }

  return (
    <div ref={wall} className="flex flex-wrap justify-center gap-x-4 gap-y-8 py-8">
      {stickers.map((s) => {
        const isOpen = open === s.name;
        const img = (
          <img
            src={s.src}
            alt={`Sticker: ${s.label}`}
            loading="lazy"
            draggable="false"
            className="sticker-img"
            style={{ "--rot": `${s.rotate}deg`, width: "auto", height: "8.5rem" }}
          />
        );
        return (
          <span
            key={s.name}
            data-sticker={s.name}
            title={s.comment ? undefined : s.label}
            className={`relative block transition-transform duration-200 hover:scale-110 hover:z-10 ${isOpen ? "z-20 scale-110" : ""}`}
            style={{ translate: `0 ${s.shift}px` }}
          >
            {s.comment ? (
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : s.name)}
                className="block cursor-pointer bg-transparent border-none p-0 [-webkit-tap-highlight-color:transparent]"
              >
                {img}
              </button>
            ) : (
              img
            )}
            {/* Always there, so it can fade out as well as in; hidden until tapped. */}
            {s.comment && (
              <span
                aria-hidden={!isOpen}
                className={`absolute bottom-full left-1/2 -translate-x-1/2 pointer-events-none transition-[opacity,translate,visibility] duration-200 ${isOpen ? "visible opacity-100" : "invisible opacity-0 translate-y-1"}`}
              >
                <span
                  data-bubble
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max max-w-[min(15rem,80vw)] px-3.5 py-2 rounded-2xl bg-white text-sm leading-snug text-black/80 text-center shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                >
                  {s.comment}
                </span>
                {/* the bubble's tail, pointing at the sticker */}
                <span className="absolute bottom-1.5 -translate-x-1/2 border-8 border-transparent border-t-white border-b-0" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default StickerWall;
