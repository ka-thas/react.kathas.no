import { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../lib/search";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const results = q.trim() ? search.search(q).slice(0, 8) : [];
  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        className="w-full px-3 py-2 rounded-lg border border-accent-green/30 bg-transparent"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg">
          {results.map((r) => (
            <li key={r.id}>
              <Link to={`/blog/${r.slug}`} onClick={() => setQ("")} className="block px-3 py-2 hover:bg-accent-green/10">
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
