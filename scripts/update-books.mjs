// Fetches the Goodreads "read" shelf RSS feed and writes src/data/books.json,
// newest first. Run with `npm run update-books`; also run daily by
// .github/workflows/update-books.yml.
import { writeFile, mkdir } from "node:fs/promises";

const USER_ID = "195763733";
const OUT = new URL("../src/data/books.json", import.meta.url);
// Duplicate editions on the shelf that shouldn't show up twice.
const SKIP_IDS = new Set(["1317181"]); // Order of the Phoenix, Part 1

const feedUrl = (page) =>
  `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=read&per_page=100&page=${page}`;

const decode = (s) =>
  s
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

const field = (item, tag) => {
  const m = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1].trim()) : "";
};

async function fetchItems() {
  const items = [];
  for (let page = 1; page <= 50; page++) {
    const res = await fetch(feedUrl(page), {
      headers: { "User-Agent": "kathas.no books updater" },
    });
    if (!res.ok) throw new Error(`Goodreads responded ${res.status} for page ${page}`);
    const xml = await res.text();
    const pageItems = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    if (pageItems.length === 0) break;
    items.push(...pageItems);
  }
  return items;
}

const items = await fetchItems();
if (items.length === 0) throw new Error("Feed returned no books; refusing to overwrite");

const books = items
  .map((item) => {
    // Most books have no read date, so fall back to when they were added.
    const date = new Date(field(item, "user_read_at") || field(item, "user_date_added"));
    return {
      title: field(item, "title"),
      id: field(item, "book_id"),
      rating: Number(field(item, "user_rating")) || 0,
      cover: field(item, "book_large_image_url") || field(item, "book_image_url"),
      date: date.toISOString().slice(0, 10),
    };
  })
  .filter((b) => !SKIP_IDS.has(b.id))
  .sort((a, b) => a.date.localeCompare(b.date))
  .reverse();

await mkdir(new URL(".", OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(books, null, 2) + "\n");
console.log(`Wrote ${books.length} books to src/data/books.json`);
