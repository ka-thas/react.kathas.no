// Keeps src/posts/photo-captions.md in step with the published photos: every photo
// in the bucket's manifest.json gets a row (with its thumbnail, so Obsidian shows
// it), and Ka fills in the captions. lib/photoCaptions.js reads the table when the
// site builds.
//
//   npm run photo-captions     add rows for photos the table doesn't have yet
//
// The bucket URL comes from VITE_PHOTOS_BASE_URL (environment, .env.local or .env).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const NOTE = join(ROOT, "src/posts/photo-captions.md");

const TEMPLATE = `---
title: Photo captions
publish: false
---

Captions for the [/photos](https://kathas.no/photos) gallery, shown like a movie subtitle inside the photo: Japanese first, English on hover or tap. Fill in either or both; leave both empty for no caption. Captions here win over any in the manifest, and go live on the next deploy. \`npm run photo-captions\` adds a row for each newly published photo, newest first.

| ID | Photo | 日本語 | English |
| --- | --- | --- | --- |
`;

function baseUrl() {
  let value = process.env.VITE_PHOTOS_BASE_URL;
  for (const file of [".env.local", ".env"]) {
    if (value) break;
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    value = readFileSync(path, "utf8").match(/^\s*VITE_PHOTOS_BASE_URL\s*=\s*["']?([^"'\s#]+)/m)?.[1];
  }
  if (!value) throw new Error("Set VITE_PHOTOS_BASE_URL (for example in .env.local) to the photo bucket's URL.");
  return value.replace(/\/+$/, "");
}

// The photo id in a row's first cell (backticks allowed).
const rowId = (line) => line.split(/(?<!\\)\|/)[1]?.trim().replace(/`/g, "") ?? "";

const base = baseUrl();
const res = await fetch(`${base}/manifest.json`);
if (!res.ok) throw new Error(`${base}/manifest.json: HTTP ${res.status}`);
const photos = ((await res.json()).photos ?? [])
  .filter((p) => p && typeof p.id === "string" && typeof p.thumb === "string")
  .sort((a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt));

const text = existsSync(NOTE) ? readFileSync(NOTE, "utf8") : TEMPLATE;
const lines = text.replace(/\n+$/, "").split("\n");
const known = new Set(lines.filter((l) => l.startsWith("|")).map(rowId));
const missing = photos.filter((p) => !known.has(p.id));

if (missing.length === 0) {
  console.log("Every published photo has a row.");
} else {
  // New photos go at the top of the table, right under the | --- | row.
  let at = lines.findIndex((l) => /^\|\s*:?-+/.test(l));
  if (at === -1) throw new Error("No table found in src/posts/photo-captions.md");
  const rows = missing.map((p) => `| ${p.id} | ![photo\\|120](${new URL(p.thumb, `${base}/`).href}) |  |  |`);
  lines.splice(at + 1, 0, ...rows);
  writeFileSync(NOTE, lines.join("\n") + "\n");
  console.log(`Added ${missing.length} rows to src/posts/photo-captions.md`);
}
