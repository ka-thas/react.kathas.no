// Every sticker on the site, for use anywhere:
//   import { stickers, stickerByName, randomSticker } from "../lib/stickers";
//   <img src={stickerByName.deer.src} alt={stickerByName.deer.label} />
// The one source: src/posts/attachments/stickers/ (add with `npm run sticker`).
// Each image is only a URL here, so importing this file doesn't load any
// sticker until it's shown.
const files = import.meta.glob("../posts/attachments/stickers/*.{webp,png}", {
  eager: true,
  import: "default",
});

// Comments: one line per sticker, shown in a bubble on the wall. They live in a
// table in src/posts/sticker-comments.md (edit in Obsidian), matched here by file name.
// The table's row order is also the wall's order: move a row to move its sticker.
const commentsTable = import.meta.glob("../posts/sticker-comments.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const comments = {};
const order = {}; // file name -> row number
let pastHeader = false;
for (const line of Object.values(commentsTable)[0]?.split("\n") ?? []) {
  const cells = line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim().replace(/\\\|/g, "|"));
  if (cells.length < 2) continue; // not a table row
  if (/^:?-+:?$/.test(cells[0])) { pastHeader = true; continue; } // the | --- | row
  if (!pastHeader) continue;
  const name = (cells[0].match(/\[\[([^\]|\\]+)/)?.[1] ?? cells[0]).replace(/\.\w+$/, "");
  order[name] ??= Object.keys(order).length;
  if (cells[1]) comments[name] = cells[1];
}

// Same file name, same tilt and offset, so layouts don't reshuffle on reload.
function hash(text) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return Math.abs(h);
}

export const stickers = Object.entries(files)
  .map(([path, src]) => {
    const name = path.split("/").pop().replace(/\.\w+$/, "");
    const h = hash(name);
    return {
      name, // file name, e.g. "pizza-boxes"
      label: name.replace(/-/g, " "), // for alt text and titles
      src,
      comment: comments[name] ?? "", // one line for the wall's bubble, if any
      rotate: (h % 21) - 10, // a stable tilt, -10° to 10°
      shift: (Math.floor(h / 21) % 25) - 12, // a stable offset, -12px to 12px
    };
  })
  // In table order; stickers without a row go last, A to Z.
  .sort((a, b) => (order[a.name] ?? Infinity) - (order[b.name] ?? Infinity) || a.name.localeCompare(b.name));

export const stickerByName = Object.fromEntries(stickers.map((s) => [s.name, s]));

// A random sticker; pass names to leave out.
export function randomSticker(exclude = []) {
  const pool = stickers.filter((s) => !exclude.includes(s.name));
  return pool[Math.floor(Math.random() * pool.length)];
}
