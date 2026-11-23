// Adds a sticker to the sticker wall (src/posts/stickers.mdx).
//   npm run sticker -- <name>               from the clipboard (copy a sticker on the iPhone)
//   npm run sticker -- <name> <image-file>  from a file (e.g. AirDropped to ~/Downloads)
// Trims the transparent padding, fits it in 480×480 and saves
// src/posts/attachments/stickers/<name>.webp. The wall picks it up by itself.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [rawName, file] = process.argv.slice(2);
if (!rawName) {
  console.error("Usage: npm run sticker -- <name> [image-file]");
  process.exit(1);
}

const name = rawName
  .toLowerCase()
  .replace(/[^a-z0-9æøå]+/g, "-")
  .replace(/^-|-$/g, "");
const outDir = fileURLToPath(new URL("../src/posts/attachments/stickers/", import.meta.url));
const out = join(outDir, `${name}.webp`);
if (existsSync(out)) {
  console.error(`A sticker called "${name}" already exists: ${out}`);
  process.exit(1);
}

// No file given: save the clipboard's image as a PNG (macOS only).
let input = file;
let tmp;
if (!input) {
  tmp = mkdtempSync(join(tmpdir(), "sticker-"));
  input = join(tmp, "clipboard.png");
  const script = [
    `set f to open for access POSIX file ${JSON.stringify(input)} with write permission`,
    "write (the clipboard as «class PNGf») to f",
    "close access f",
  ];
  try {
    execFileSync("osascript", script.flatMap((line) => ["-e", line]), { stdio: "pipe" });
  } catch {
    console.error("No image on the clipboard. Copy the sticker on the iPhone first, or pass a file.");
    rmSync(tmp, { recursive: true, force: true });
    process.exit(1);
  }
} else if (/\.hei[cf]s?$/i.test(input)) {
  // .heics/.heifs are animated stickers; sips keeps the first frame.
  // sharp's bundled libvips can't decode iPhone HEIC (HEVC), so let macOS convert it.
  tmp = mkdtempSync(join(tmpdir(), "sticker-"));
  const png = join(tmp, "converted.png");
  execFileSync("sips", ["-s", "format", "png", input, "--out", png], { stdio: "pipe" });
  input = png;
}

try {
  mkdirSync(outDir, { recursive: true });
  const info = await sharp(input)
    .rotate() // respect the photo's orientation
    .trim() // cut the transparent edges
    .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 75, alphaQuality: 90 })
    .toFile(out);
  console.log(`Saved ${out}\n  ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`);
} finally {
  if (tmp) rmSync(tmp, { recursive: true, force: true });
}
