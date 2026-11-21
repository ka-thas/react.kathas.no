// Writes one note per book in src/data/books.json to the blog vault
// (blog/content/books/<title>.md), for the Books cards grid (books/Books.base).
// Run with `npm run books-to-vault`; `npm run update-books` runs it too.
//
// Only the properties below are managed. Anything else in a note (its text,
// e.g. a review, or properties you add yourself) is kept on later runs.
// Notes for books no longer in books.json are left alone, with a warning.
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";

const JSON_PATH = new URL("../src/data/books.json", import.meta.url);
const DIR = new URL("../blog/content/books/", import.meta.url);
const MANAGED = ["title", "cover", "rating", "read", "goodreads", "tags"];

// Obsidian forbids \ / : * ? " < > | # ^ [ ] in note names. The Goodreads
// series suffix ("(Mistborn, #1)") is dropped for readable names and URLs;
// the full title stays in the `title:` property.
const fileName = (title) =>
  title
    .replace(/\s*\([^()]*#\d+(\.\d+)?\)\s*$/, "")
    .replace(/:/g, " -")
    .replace(/[\\/*?"<>|#^[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const yamlString = (s) => JSON.stringify(s);

function frontmatterFor(book) {
  return [
    `title: ${yamlString(book.title)}`,
    `cover: ${yamlString(book.cover)}`,
    `rating: ${book.rating}`,
    // Not `date:`, so books don't count as blog posts (Recent Notes etc.).
    `read: ${book.date}`,
    `goodreads: https://www.goodreads.com/book/show/${book.id}`,
    "tags:",
    "  - book",
  ];
}

// Split a note into its frontmatter lines (minus managed keys) and its body.
function splitNote(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { extra: [], body: text };
  const extra = [];
  let skipping = false;
  for (const line of m[1].split(/\r?\n/)) {
    const key = line.match(/^([\w-]+):/)?.[1];
    if (key) skipping = MANAGED.includes(key);
    else if (!/^\s/.test(line)) skipping = false; // not a continuation line
    if (!skipping) extra.push(line);
  }
  return { extra, body: m[2] };
}

const books = JSON.parse(await readFile(JSON_PATH, "utf8"));
await mkdir(DIR, { recursive: true });
const existing = new Set((await readdir(DIR)).filter((f) => f.endsWith(".md") && f !== "index.md"));

let created = 0;
let updated = 0;
for (const book of books) {
  const file = `${fileName(book.title)}.md`;
  const url = new URL(encodeURIComponent(file), DIR);
  let extra = [];
  let body = `\n[On Goodreads](https://www.goodreads.com/book/show/${book.id})\n`;
  if (existing.has(file)) {
    ({ extra, body } = splitNote(await readFile(url, "utf8")));
    existing.delete(file);
    updated++;
  } else created++;
  const fm = [...frontmatterFor(book), ...extra].join("\n");
  await writeFile(url, `---\n${fm}\n---\n${body}`);
}
for (const stale of existing) console.warn(`Not in books.json, left as is: books/${stale}`);
console.log(`Book notes: ${created} created, ${updated} updated in blog/content/books/`);
