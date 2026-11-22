import MiniSearch from "minisearch";
import { posts } from "./posts";

// Each post's text, for full-text search.
const raw = import.meta.glob("../posts/**/*.{md,mdx}", { query: "?raw", import: "default", eager: true });
const slugOf = (p) => p.split("/").pop().replace(/\.(md|mdx)$/, "");
const text = Object.fromEntries(
  Object.entries(raw).map(([p, t]) => [slugOf(p), t.replace(/^---[\s\S]*?---/, "")]) // drop frontmatter
);

export const search = new MiniSearch({
  idField: "slug",
  fields: ["title", "description", "text"],
  storeFields: ["slug", "title", "date"],
  searchOptions: { boost: { title: 3, description: 2 }, prefix: true, fuzzy: 0.2 },
});
search.addAll(posts.map((p) => ({ ...p, text: text[p.slug] ?? "" })));
