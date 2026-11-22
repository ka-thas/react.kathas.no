import MiniSearch from "minisearch";
import { posts } from "./posts";
import { projects } from "./projects";
import books from "../data/books.json";


// Each post's text, for full-text search.
// Project notes are indexed from lib/projects.js instead.
const raw = import.meta.glob(["../posts/**/*.{md,mdx}", "!../posts/projects/**"], { query: "?raw", import: "default", eager: true });
const slugOf = (p) => p.split("/").pop().replace(/\.(md|mdx)$/, "");
const text = Object.fromEntries(
  Object.entries(raw).map(([p, t]) => [slugOf(p), t.replace(/^---[\s\S]*?---/, "")]) // drop frontmatter
);


// Every entry: a unique id, a type label, what to search, and where it goes.
const docs = [
  ...posts.map((p) => ({
    id: `post:${p.slug}`, type: "Post", url: `/blog/${p.slug}`,
    title: p.title, description: p.description, text: text[p.slug] ?? "",
  })),
  ...projects.map((p) => ({
    id: `project:${p.id}`, type: "Project", url: `/projects/${p.id}`,
    title: p.title, text: p.text,
  })),
  ...books.map((b) => ({
    id: `book:${b.id}`, type: "Book", url: "/blog/books",
    title: b.title,
  })),
];

export const search = new MiniSearch({
  fields: ["title", "description", "text"],
  storeFields: ["type", "url", "title"],
  searchOptions: { boost: { title: 3, description: 2 }, prefix: true, fuzzy: 0.2 },
});
search.addAll(docs);
