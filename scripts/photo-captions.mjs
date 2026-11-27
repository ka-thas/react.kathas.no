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

Captions for the [/photos](https://kathas.no/photos) gallery, shown like a movie subtitle inside the photo. Leave it empty for no caption; \`<br>\` starts a new line. Captions here win over any in the manifest, and go live on the next deploy. \`npm run photo-captions\` keeps one row per published photo, newest first (filled-in captions are always kept).

| ID | Photo | Caption |
| --- | --- | --- |
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

// A photo's file name and content hash, like "pict0013-755dc370cef4", from a thumbnail
// path or URL (thumbs/<id>-<hash>.jpg). It stays the same when only the photo's time,
// and so its id, changes.
function sameKey(text = "") {
  const stem = text.match(/thumbs\/([^/)\s]+?)\.jpe?g/i)?.[1];
  const parts = stem?.split("-") ?? [];
  return parts.length >= 4 ? `${parts.slice(2, -1).join("-")}-${parts.at(-1)}` : "";
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

// Captions already written, by photo id (cells as written, escapes kept). If an id
// has two rows, the first one with a caption wins, as on the site.
const written = new Map();
for (const line of lines.slice(sep + 1, end)) {
  const [id = "", photo = "", caption = ""] = cellsOf(line);
  const key = id.replace(/`/g, "");
  if (written.get(key)?.caption) continue;
  written.set(key, { caption, same: sameKey(photo) });
}

// A photo whose time changed has a new id: its caption moves to the new row.
const byKey = new Map(photos.map((p) => [sameKey(p.thumb), p.id]));
const moved = [];
for (const [id, c] of [...written]) {
  const to = byKey.get(c.same);
  if (!c.same || !to || to === id || !c.caption || photos.some((p) => p.id === id)) continue;
  if (written.get(to)?.caption) continue; // the new row has its own caption
  written.set(to, c);
  written.delete(id);
  moved.push(id);
}

// One row per published photo, newest first, with a fresh thumbnail. Rows for
// photos no longer published are dropped, unless they hold a caption.
const ids = new Set(photos.map((p) => p.id));
const rows = photos.map((p) => {
  const { caption = "" } = written.get(p.id) ?? {};
  return `| ${p.id} | ![photo\\|120](${new URL(p.thumb, `${base}/`).href}) | ${caption} |`;
});
const orphans = [...written].filter(([id, c]) => !ids.has(id) && c.caption);
for (const [id, c] of orphans) rows.push(`| ${id} | (not published) | ${c.caption} |`);

const added = photos.filter((p) => !written.has(p.id)).length;
const dropped = [...written.keys()].filter((id) => !ids.has(id)).length - orphans.length;
lines.splice(sep + 1, end - sep - 1, ...rows);
writeFileSync(NOTE, lines.join("\n") + "\n");
console.log(
  `photo-captions.md: ${photos.length} photos, ${added} new, ${dropped} unpublished rows removed` +
    (moved.length ? `, ${moved.length} captions moved to re-timed photos` : "") +
    (orphans.length ? `, ${orphans.length} captions kept for photos no longer published (at the bottom)` : ""),
);
