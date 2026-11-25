// Keeps src/posts/photo-captions.md in step with the published photos: every photo
// in the bucket's manifest.json gets a row (with its thumbnail, so Obsidian shows
// it), and Ka fills in the captions. lib/photoCaptions.js reads the table when the
// site builds.
//
//   npm run photo-captions     one row per published photo: adds new ones, drops
//                              unpublished ones (unless captioned), refreshes thumbnails
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

const cellsOf = (line) => line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim());
const isSeparator = (line) => /^\|\s*:?-+/.test(line);

const base = baseUrl();
const res = await fetch(`${base}/manifest.json`);
if (!res.ok) throw new Error(`${base}/manifest.json: HTTP ${res.status}`);
const photos = ((await res.json()).photos ?? [])
  .filter((p) => p && typeof p.id === "string" && typeof p.thumb === "string")
  .sort((a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt));

const text = existsSync(NOTE) ? readFileSync(NOTE, "utf8") : TEMPLATE;
const lines = text.replace(/\n+$/, "").split("\n");
const sep = lines.findIndex(isSeparator);
if (sep === -1) throw new Error("No table found in src/posts/photo-captions.md");
let end = sep + 1;
while (end < lines.length && lines[end].startsWith("|")) end++;

// Captions already written, by photo id (cells as written, escapes kept).
const written = new Map();
for (const line of lines.slice(sep + 1, end)) {
  const [id = "", , ja = "", en = ""] = cellsOf(line);
  written.set(id.replace(/`/g, ""), { ja, en });
}

// One row per published photo, newest first, with a fresh thumbnail. Rows for
// photos no longer published are dropped, unless they hold a caption.
const ids = new Set(photos.map((p) => p.id));
const rows = photos.map((p) => {
  const { ja = "", en = "" } = written.get(p.id) ?? {};
  return `| ${p.id} | ![photo\\|120](${new URL(p.thumb, `${base}/`).href}) | ${ja} | ${en} |`;
});
const orphans = [...written].filter(([id, c]) => !ids.has(id) && (c.ja || c.en));
for (const [id, c] of orphans) rows.push(`| ${id} | (not published) | ${c.ja} | ${c.en} |`);

const added = photos.filter((p) => !written.has(p.id)).length;
const dropped = [...written.keys()].filter((id) => !ids.has(id)).length - orphans.length;
lines.splice(sep + 1, end - sep - 1, ...rows);
writeFileSync(NOTE, lines.join("\n") + "\n");
console.log(
  `photo-captions.md: ${photos.length} photos, ${added} new, ${dropped} unpublished rows removed` +
    (orphans.length ? `, ${orphans.length} captions kept for photos no longer published (at the bottom)` : ""),
);
