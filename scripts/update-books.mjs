// Converts a Goodreads library export CSV (My Books > Import and export >
// Export Library) into src/data/books.json, newest first.
// Run with `npm run update-books -- path/to/goodreads_library_export.csv`
// (defaults to ./goodreads_library_export.csv, which is gitignored).
//
// The export has no cover images, so covers already in books.json are kept
// and new books get an Open Library cover looked up by ISBN.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const CSV = process.argv[2] ?? "goodreads_library_export.csv";
const OUT = new URL("../src/data/books.json", import.meta.url);
// Duplicate editions on the shelf that shouldn't show up twice.
const SKIP_IDS = new Set(["1317181"]); // Order of the Phoenix, Part 1

// Minimal RFC 4180 parser: quoted fields may contain commas, quotes ("") and
// newlines (reviews and private notes often do).
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell || row.length) rows.push([...row, cell]);
  const [header, ...body] = rows;
  return body
    .filter((r) => r.some(Boolean))
    .map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), r[i] ?? ""])));
}

// ISBNs are exported as ="0439358078" so spreadsheets keep leading zeros.
const cleanIsbn = (s) => s.replace(/[^0-9X]/gi, "");

async function openLibraryCover(isbn) {
  if (!isbn) return "";
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  try {
    // default=false makes a missing cover 404 instead of returning a blank image.
    const res = await fetch(`${url}?default=false`, { method: "HEAD" });
    return res.ok ? url : "";
  } catch {
    return "";
  }
}

const rows = parseCsv((await readFile(CSV, "utf8")).replace(/^﻿/, ""));
if (rows.length === 0) throw new Error(`${CSV} has no books; refusing to overwrite`);
if (!("Book Id" in rows[0])) throw new Error(`${CSV} doesn't look like a Goodreads export`);

let existing = [];
try {
  existing = JSON.parse(await readFile(OUT, "utf8"));
} catch {
  // First run, nothing to reuse.
}
const knownCovers = new Map(existing.map((b) => [b.id, b.cover]));

const books = [];
for (const r of rows) {
  const id = r["Book Id"];
  // Only books on the "read" shelf with a read date set; the rest are skipped.
  if (r["Exclusive Shelf"] !== "read" || !r["Date Read"] || SKIP_IDS.has(id)) continue;
  const cover =
    knownCovers.get(id) ||
    (await openLibraryCover(cleanIsbn(r.ISBN13))) ||
    (await openLibraryCover(cleanIsbn(r.ISBN)));
  if (!cover) console.warn(`No cover found for "${r.Title}" (${id}); set one in books.json`);
  books.push({
    title: r.Title,
    id,
    rating: Number(r["My Rating"]) || 0,
    cover,
    // Exported as YYYY/MM/DD.
    date: r["Date Read"].replaceAll("/", "-"),
  });
}
books.sort((a, b) => b.date.localeCompare(a.date));

await mkdir(new URL(".", OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(books, null, 2) + "\n");
console.log(`Wrote ${books.length} books to src/data/books.json`);
