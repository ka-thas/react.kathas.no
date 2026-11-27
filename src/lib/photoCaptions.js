// Photo captions, written in Obsidian: the table in src/posts/photo-captions.md
// (columns: ID | Photo | 日本語 | English), read when the site builds.
// `npm run photo-captions` adds a row for every published photo the table lacks.
import { tableRows } from "./mdTable";

const note = import.meta.glob("../posts/photo-captions.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Cells are Markdown: keep the words, and turn <br> (a line break in an Obsidian
// table) into a real one.
function plainText(cell) {
  return cell
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/!?\[\[([^\]|]*)\|?([^\]]*)\]\]/g, (_, page, text) => text || page) // [[page|text]]
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // [text](url)
    .replace(/(\*\*|__|\*|~~|==|`)(.+?)\1/g, "$2") // **bold**, *italic*, ~~struck~~, ==marked==, `code`
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .trim();
}

/** photo id -> { ja?, en? }, for rows with at least one caption filled in.
 * If an id has two rows, the first one with a caption wins. */
export const noteCaptions = new Map();
for (const [rawId = "", , ja = "", en = ""] of tableRows(Object.values(note)[0])) {
  const id = rawId.replace(/`/g, "");
  const caption = {};
  if (plainText(ja)) caption.ja = plainText(ja);
  if (plainText(en)) caption.en = plainText(en);
  if (id && (caption.ja || caption.en) && !noteCaptions.has(id)) noteCaptions.set(id, caption);
}
