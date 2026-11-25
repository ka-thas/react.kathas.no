// Keeps src/posts/sticker-comments.md in step with the sticker files: every sticker
// gets a row (with the sticker embedded, so Obsidian shows it), and Ka fills in the
// comments. lib/stickers.js reads the table when the site builds.
//
//   node scripts/sticker-comments.mjs     add rows for stickers the table doesn't have yet
//   (npm run sticker does this by itself after adding stickers)
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const STICKERS = join(ROOT, "src/posts/attachments/stickers");
export const COMMENTS_FILE = join(ROOT, "src/posts/sticker-comments.md");

const TEMPLATE = `---
title: Sticker comments
publish: false
---

One line of context or an inside joke per sticker, shown in a bubble when someone taps it on the [[stickers]] wall. Leave a comment empty for no bubble. The wall shows the stickers in this table's order, so move a row to move its sticker. \`npm run sticker\` adds a row for each new sticker.

| Sticker | Comment |
| --- | --- |
`;

// The sticker a row is about: the file in its first cell, as ![[name.webp|80]] or plain name.
export function rowSticker(line) {
  const cell = line.split(/(?<!\\)\|/)[1]?.trim() ?? "";
  const embed = cell.match(/\[\[([^\]|\\]+)/);
  return (embed ? embed[1] : cell).replace(/\.\w+$/, "").trim();
}

export function syncCommentsTable() {
  const text = existsSync(COMMENTS_FILE) ? readFileSync(COMMENTS_FILE, "utf8") : TEMPLATE;
  const lines = text.replace(/\n+$/, "").split("\n");
  const known = new Set(lines.filter((l) => l.startsWith("|")).map(rowSticker));
  const missing = readdirSync(STICKERS)
    .filter((f) => /\.(webp|png)$/.test(f) && !known.has(f.replace(/\.\w+$/, "")))
    .sort();
  if (missing.length === 0 && existsSync(COMMENTS_FILE)) return [];

  // Add the rows right after the table, so any text below it stays below it.
  let last = lines.findLastIndex((l) => l.startsWith("|"));
  if (last === -1) last = lines.length - 1;
  lines.splice(last + 1, 0, ...missing.map((f) => `| ![[${f}\\|80]] |  |`));
  writeFileSync(COMMENTS_FILE, lines.join("\n") + "\n");
  return missing;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const added = syncCommentsTable();
  console.log(added.length ? `Added ${added.length} rows to src/posts/sticker-comments.md` : "Every sticker has a row.");
}
