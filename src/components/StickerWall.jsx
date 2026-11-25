// The sticker wall (src/posts/stickers.mdx): every sticker on the site, see lib/stickers.js.
// Tap a sticker that has a comment (src/posts/sticker-comments.md) to show it in a bubble.
// Now and then a sticker on screen says its comment by itself, so visitors find out
// they can tap them. That stops once they tap one. With reduced motion it only fades
// (no hop, see .sticker-speak in stickers.css).
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { stickers } from "../lib/stickers";

function StickerWall() {
  const [open, setOpen] = useState(null); // name of the sticker whose bubble is showing
  const [spoke, setSpoke] = useState(false); // the open bubble came by itself (bounce it)
  const wall = useRef(null);
  const openNow = useRef(null);
  const tapped = useRef(false);

  useEffect(() => {
    openNow.current = open;
  }, [open]);

  // Speaking up by itself: the first about 2 s after the wall is in view, then one
  // every 8 to 12 s, always a sticker that's fully on screen with room for its bubble.
  useEffect(() => {
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const name = e.target.dataset.sticker;
          if (e.isIntersecting) visible.add(name);
          else visible.delete(name);
        }),
      { rootMargin: "-90px 0px 0px 0px", threshold: 0.9 } // the 90px leave room above for the bubble
    );
    wall.current?.querySelectorAll("[data-sticker][data-comment]").forEach((el) => io.observe(el));

    let timer;
    let last = null;
    const speak = () => {
      if (tapped.current) return; // they've got it
      const pool = [...visible].filter((n) => n !== last);
      if (openNow.current || document.hidden || pool.length === 0) {
        timer = setTimeout(speak, 2000); // try again soon
        return;
      }
      last = pool[Math.floor(Math.random() * pool.length)];
      setOpen(last);
      setSpoke(true);
      timer = setTimeout(speak, 8000 + Math.random() * 4000);
    };
    timer = setTimeout(speak, 2000);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

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
            data-comment={s.comment ? "" : undefined}
            title={s.comment ? undefined : s.label}
            className={`relative block transition-transform duration-200 hover:scale-110 hover:z-10 ${isOpen ? "z-20 scale-110" : ""}`}
            style={{ translate: `0 ${s.shift}px` }}
          >
            {s.comment ? (
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  tapped.current = true;
                  setSpoke(false);
                  setOpen(isOpen ? null : s.name);
                }}
                className={`block cursor-pointer ${isOpen && spoke ? "sticker-speak" : ""} bg-transparent border-none p-0 [-webkit-tap-highlight-color:transparent]`}
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
                className={`absolute bottom-full left-1/2 -translate-x-1/2 pointer-events-none transition-[opacity,translate,visibility] duration-200 ${isOpen ? "visible opacity-100" : "invisible opacity-0 translate-y-1 motion-reduce:translate-y-0"}`}
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
