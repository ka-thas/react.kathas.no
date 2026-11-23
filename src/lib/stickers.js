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
      rotate: (h % 21) - 10, // a stable tilt, -10° to 10°
      shift: (Math.floor(h / 21) % 25) - 12, // a stable offset, -12px to 12px
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const stickerByName = Object.fromEntries(stickers.map((s) => [s.name, s]));

// A random sticker; pass names to leave out.
export function randomSticker(exclude = []) {
  const pool = stickers.filter((s) => !exclude.includes(s.name));
  return pool[Math.floor(Math.random() * pool.length)];
}
