import { useEffect, useState } from "react";

// Light/dark switch in the navbar. The theme is the .dark class on <html>
// (index.html sets it before the first paint). A click saves the choice;
// until then the site follows the system setting, live.
const root = document.documentElement;

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(() => root.classList.contains("dark"));

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let saved = null;
      try { saved = localStorage.getItem("theme"); } catch { /* private mode */ }
      if (saved) return;
      root.classList.toggle("dark", e.matches);
      setDark(e.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !root.classList.contains("dark"); // the class, not state: the navbar has two of these
    root.classList.toggle("dark", next);
    setDark(next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* private mode */ }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className={`grid place-items-center w-9 h-9 rounded-lg text-ink/60 hover:text-ink hover:bg-ink/6 transition-colors duration-150 ${className}`}
    >
      {dark ? (
        // sun
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
