import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../lib/search";

// Search pop-up: opens with ⌘K / Ctrl+K or the navbar button, Esc closes it.
export default function SearchDialog({ open, setOpen }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = q.trim() ? search.search(q).slice(0, 8) : [];

  // ⌘K / Ctrl+K anywhere toggles it.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  // <dialog> gives focus trapping, Esc and the backdrop for free.
  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) { d.showModal(); inputRef.current?.focus(); }
    if (!open && d.open) d.close();
    if (!open) { setQ(""); setActive(0); }
  }, [open]);

  const go = (url) => { setOpen(false); navigate(url); };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    // preventDefault: closing the dialog puts focus back on the element that had it
    // (e.g. the navbar link just clicked), and this Enter would then activate it too.
    if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active].url); }
  };

  return (
    <dialog
      ref={ref}
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === ref.current && setOpen(false)} // click outside closes
      className="w-[min(36rem,calc(100%-2rem))] mx-auto mt-[15vh] p-2 bg-paper text-ink rounded-xl border border-ink/10 shadow-2xl backdrop:bg-accent-black/30 backdrop:backdrop-blur-sm"
    >
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => { setQ(e.target.value); setActive(0); }}
        onKeyDown={onKeyDown}
        placeholder="Search…"
        className="w-full px-4 py-2 mb-2 text-base outline-none border-b border-ink/8"
      />
      <ul className="max-h-[50vh] overflow-y-auto">
        {results.map((r, i) => (
          <li key={r.id}>
            <button
              onClick={() => go(r.url)}
              onMouseEnter={() => setActive(i)}
              className={`w-full text-left px-4 py-2 ${i === active ? "bg-accent-green/10 rounded-md" : ""}`}
            >
              {r.title} <span className="text-xs text-ink/40 ml-2">{r.type}</span>
            </button>
          </li>
        ))}
        {q.trim() && results.length === 0 && <li className="px-4 py-3 text-ink/50">No results</li>}
      </ul>
    </dialog>
  );
}
