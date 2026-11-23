// Adds stickers to the sticker wall (src/posts/stickers.mdx).
//
//   npm run sticker                              the image on the clipboard (copy a sticker on the iPhone)
//   npm run sticker -- ~/Downloads/stickers2     every image in a folder
//   npm run sticker -- a.HEIC b.png              some files
//   npm run sticker -- latte-art [file]          one sticker with a name you pick
//   add --no-ai to skip the AI naming
//
// Each image is trimmed of its transparent padding, fitted in 480×480 and saved as
// src/posts/attachments/stickers/<name>.webp; the wall picks it up by itself.
//   - Any format macOS can open works: if sharp can't read a file (iPhone HEIC,
//     animated .HEICS), it's converted with `sips` first.
//   - Re-running is safe: an image that's already on the wall is skipped, and a
//     name that's taken gets -2, -3, ...
//   - Names: Claude looks at each sticker and names it (e.g. pizza-boxes). That needs
//     ANTHROPIC_API_KEY in .env.local; without it, names come from the file names.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import Anthropic from "@anthropic-ai/sdk";

const OUT_DIR = fileURLToPath(new URL("../src/posts/attachments/stickers/", import.meta.url));
const IMAGE_EXT = /\.(heic|heics|heif|heifs|png|jpe?g|webp|gif|tiff?|avif)$/i;

// ---- Arguments: paths are inputs, anything else is the name -----------------------
const args = process.argv.slice(2);
const useAi = !args.includes("--no-ai");
const rest = args.filter((a) => a !== "--no-ai");
const paths = rest.filter((a) => existsSync(a));
const words = rest.filter((a) => !existsSync(a));
if (words.length > 1 || (words.length === 1 && paths.length > 1)) {
  console.error(`Not found: ${words.join(", ")}\nA name only works with a single sticker.`);
  process.exit(1);
}
const chosenName = words[0];

const tmp = mkdtempSync(join(tmpdir(), "sticker-"));
process.on("exit", () => rmSync(tmp, { recursive: true, force: true }));

// Inputs: folders expand to the images inside; no paths means the clipboard.
let inputs = paths.flatMap((p) =>
  statSync(p).isDirectory()
    ? readdirSync(p)
        .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
        .sort()
        .map((f) => join(p, f))
    : [p]
);
if (paths.length === 0) inputs = [clipboardToFile()];
if (inputs.length === 0) {
  console.error("No images found.");
  process.exit(1);
}

// ---- Helpers -----------------------------------------------------------------------
function clipboardToFile() {
  const file = join(tmp, "clipboard.png");
  const script = [
    `set f to open for access POSIX file ${JSON.stringify(file)} with write permission`,
    "write (the clipboard as «class PNGf») to f",
    "close access f",
  ];
  try {
    execFileSync("osascript", script.flatMap((line) => ["-e", line]), { stdio: "pipe" });
  } catch {
    console.error("No image on the clipboard. Copy the sticker on the iPhone first, or pass a file or folder.");
    process.exit(1);
  }
  return file;
}

const kebab = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9æøå]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

function toWebp(file) {
  return sharp(file)
    .rotate() // respect the photo's orientation
    .trim() // cut the transparent edges
    .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 75, alphaQuality: 90 })
    .toBuffer({ resolveWithObject: true });
}

// sharp first; if it can't decode the file, let macOS convert it to PNG.
async function convert(file, i) {
  try {
    return await toWebp(file);
  } catch {
    const png = join(tmp, `converted-${i}.png`);
    execFileSync("sips", ["-s", "format", "png", file, "--out", png], { stdio: "pipe" });
    return toWebp(png);
  }
}

// Claude names the sticker from what it shows. Returns null if naming isn't available.
let client = null;
let aiOff = !useAi;
if (useAi) {
  try {
    process.loadEnvFile(fileURLToPath(new URL("../.env.local", import.meta.url)));
  } catch {
    // no .env.local; the SDK may still find a key in the environment
  }
}
async function aiName(webp) {
  if (aiOff) return null;
  try {
    client ??= new Anthropic();
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/webp", data: webp.toString("base64") } },
            {
              type: "text",
              text:
                "This is a sticker cut out of a photo. Give it a short file name of 1 to 4 words in " +
                "kebab-case that says what it shows, like pizza-boxes or tokyo-tower. For a person, " +
                "describe the pose, action or clothing (thumbs-up, hi-vis-jacket), never who they are. " +
                "Reply with the name only.",
            },
          ],
        },
      ],
    });
    if (response.stop_reason === "refusal") return null;
    const text = response.content.find((b) => b.type === "text")?.text ?? "";
    return kebab(text) || null;
  } catch (error) {
    aiOff = true; // don't retry for every sticker
    const why =
      error instanceof Anthropic.AuthenticationError
        ? "the API key was rejected"
        : error instanceof Anthropic.RateLimitError
          ? "rate limited"
          : error instanceof Anthropic.APIError
            ? `API error ${error.status}`
            : "no ANTHROPIC_API_KEY found (add it to .env.local)";
    console.warn(`  AI naming off (${why}); using file names instead.`);
    return null;
  }
}

function freeName(base) {
  let name = base;
  for (let n = 2; existsSync(join(OUT_DIR, `${name}.webp`)); n++) name = `${base}-${n}`;
  return name;
}

// ---- Run ---------------------------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true });
const existing = new Map(
  readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".webp"))
    .map((f) => [sha(readFileSync(join(OUT_DIR, f))), f])
);

let added = 0;
for (const [i, file] of inputs.entries()) {
  const label = paths.length ? basename(file) : "clipboard";
  let result;
  try {
    result = await convert(file, i);
  } catch {
    console.error(`✗ ${label}: can't read this image`);
    continue;
  }
  const { data, info } = result;

  const hash = sha(data);
  if (existing.has(hash)) {
    console.log(`- ${label}: already on the wall as ${existing.get(hash)}`);
    continue;
  }

  const fallback = paths.length ? kebab(basename(file, extname(file))) : "sticker";
  const base = (chosenName && kebab(chosenName)) || (await aiName(data)) || fallback || "sticker";
  const name = freeName(base);
  writeFileSync(join(OUT_DIR, `${name}.webp`), data);
  existing.set(hash, `${name}.webp`);
  added++;
  console.log(`✓ ${label} → ${name}.webp  (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
console.log(`\n${added} added to src/posts/attachments/stickers/`);
