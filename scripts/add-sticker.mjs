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
//   - Names: Claude looks at the new stickers and names them (e.g. pizza-boxes).
//     1. Claude Code (`claude -p`, on your subscription), one call for the batch.
//     2. If that's not available: the Claude API, with ANTHROPIC_API_KEY in .env.local.
//     3. Otherwise names come from the file names.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = join(ROOT, "src/posts/attachments/stickers");
const IMAGE_EXT = /\.(heic|heics|heif|heifs|png|jpe?g|webp|gif|tiff?|avif)$/i;

const NAMING_RULES =
  "Each is a sticker cut out of a photo. Give each a short file name of 1 to 4 words in " +
  "kebab-case that says what it shows, like pizza-boxes or tokyo-tower. For a person, " +
  "describe the pose, action or clothing (thumbs-up, hi-vis-jacket), never who they are.";

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

function freeName(base) {
  let name = base;
  for (let n = 2; existsSync(join(OUT_DIR, `${name}.webp`)); n++) name = `${base}-${n}`;
  return name;
}

// ---- Naming ------------------------------------------------------------------------
// Both return { "<current file>.webp": "new-name" }, or null if they can't run.

// 1. Claude Code in headless mode: one call names the whole batch. Read is its only tool.
function nameWithClaudeCode(files) {
  try {
    execFileSync("claude", ["--version"], { stdio: "pipe" });
  } catch {
    return null; // Claude Code isn't installed
  }
  const prompt =
    `Name these sticker images. Open each one with the Read tool. ${NAMING_RULES}\n` +
    "Reply with one line per image, exactly `<file name> -> <new-name>`, and nothing else.\n\n" +
    files.map((f) => join(OUT_DIR, f)).join("\n");
  try {
    const out = execFileSync(
      "claude",
      ["-p", prompt, "--allowedTools", "Read", "--output-format", "text"],
      { cwd: ROOT, encoding: "utf8", timeout: 5 * 60_000, stdio: ["ignore", "pipe", "pipe"] }
    );
    const names = {};
    for (const line of out.split("\n")) {
      const m = line.match(/([\w.-]+\.webp)\s*(?:->|→)\s*`?([^`]+)`?\s*$/);
      if (m && files.includes(m[1])) names[m[1]] = kebab(m[2]);
    }
    return Object.keys(names).length ? names : null;
  } catch (error) {
    console.warn(`  Claude Code naming failed (${error.code === "ETIMEDOUT" ? "timed out" : "error"}).`);
    return null;
  }
}

// 2. The Claude API, one request per sticker. Needs ANTHROPIC_API_KEY (e.g. in .env.local).
async function nameWithApi(files) {
  try {
    process.loadEnvFile(join(ROOT, ".env.local"));
  } catch {
    // no .env.local; the SDK may still find a key in the environment
  }
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) return null;
  const client = new Anthropic();
  const names = {};
  for (const file of files) {
    try {
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
              {
                type: "image",
                source: { type: "base64", media_type: "image/webp", data: readFileSync(join(OUT_DIR, file)).toString("base64") },
              },
              { type: "text", text: `${NAMING_RULES} Reply with the name only.` },
            ],
          },
        ],
      });
      if (response.stop_reason === "refusal") continue;
      const text = response.content.find((b) => b.type === "text")?.text ?? "";
      if (kebab(text)) names[file] = kebab(text);
    } catch (error) {
      const why =
        error instanceof Anthropic.AuthenticationError
          ? "the API key was rejected"
          : error instanceof Anthropic.RateLimitError
            ? "rate limited"
            : error instanceof Anthropic.APIError
              ? `API error ${error.status}`
              : "request failed";
      console.warn(`  Claude API naming stopped (${why}).`);
      break;
    }
  }
  return Object.keys(names).length ? names : null;
}

// ---- Run ---------------------------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true });
const existing = new Map(
  readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".webp"))
    .map((f) => [sha(readFileSync(join(OUT_DIR, f))), f])
);

// Save each new sticker, named after its file for now.
const added = []; // { label, file }
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
  const name = freeName((chosenName && kebab(chosenName)) || fallback || "sticker");
  writeFileSync(join(OUT_DIR, `${name}.webp`), data);
  existing.set(hash, `${name}.webp`);
  added.push({ label, file: `${name}.webp` });
  console.log(`✓ ${label}  (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

// Then let Claude rename them by what they show.
if (added.length && useAi && !chosenName) {
  const files = added.map((a) => a.file);
  console.log(`\nNaming ${files.length} sticker${files.length > 1 ? "s" : ""}...`);
  const names = nameWithClaudeCode(files) ?? (await nameWithApi(files));
  if (!names) console.warn("  No Claude naming available; keeping the file names.");
  for (const a of added) {
    const wanted = names?.[a.file];
    if (!wanted || `${wanted}.webp` === a.file) continue;
    const target = `${freeName(wanted)}.webp`;
    renameSync(join(OUT_DIR, a.file), join(OUT_DIR, target));
    a.file = target;
  }
}

if (added.length) console.log("");
for (const a of added) console.log(`  ${a.label} → ${a.file}`);
console.log(`${added.length} added to src/posts/attachments/stickers/`);
