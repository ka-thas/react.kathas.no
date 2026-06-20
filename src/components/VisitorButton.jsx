import { useState, useEffect } from "react";

export default function VisitorButton() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/visit")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0));
  }, []);

  const handleClick = () => {
    fetch("/api/visit", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-2 font-mono text-sm text-white transition-colors hover:bg-zinc-700"
    >
      Click me! {count !== null ? `(${count})` : "..."}
    </button>
  );
}
