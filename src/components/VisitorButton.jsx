import { useState, useEffect } from "react";

export default function VisitorButton() {
  const [count, setCount] = useState(null);
  const [pending, setPending] = useState(false);
  const [sprouts, setSprouts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/visit", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch((e) => {
        if (e.name !== "AbortError") setCount(0);
      });
    return () => controller.abort();
  }, []);

  const spawnSprout = () => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    const sprout = {
      id,
      dx: `${(Math.random() - 0.5) * 70}px`,
      r: `${(Math.random() - 0.5) * 70}deg`,
    };
    setSprouts((s) => [...s, sprout]);
    setTimeout(() => {
      setSprouts((s) => s.filter((x) => x.id !== id));
    }, 1100);
  };

  const handleClick = () => {
    if (pending) return;
    setPending(true);
    spawnSprout();
    setCount((c) => (c ?? 0) + 1); // optimistic
    fetch("/api/visit", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCount(d.count)) // reconcile with truth
      .catch(() => setCount((c) => (c ?? 1) - 1)) // roll back
      .finally(() => setPending(false));
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending || count === null}
      aria-label="Visitor counter"
      className="relative cursor-pointer inline-flex items-center gap-2 py-2 px-5 rounded-lg font-mono font-semibold text-[0.95rem] no-underline bg-[rgba(0,255,128,0.15)] text-[#00ff80] border border-[rgba(0,255,128,0.35)] hover:opacity-80 transition-opacity"
    >
      🌱 {count !== null ? `${count}` : "…"}
      {sprouts.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 select-none text-lg"
          style={{
            "--dx": s.dx,
            "--r": s.r,
            animation: "sprout-float 1.1s ease-out forwards",
          }}
        >
          🌱
        </span>
      ))}
    </button>
  );
}
