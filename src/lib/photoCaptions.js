// Photo captions, written in Obsidian: the table in src/posts/photo-captions.md
// (columns: ID | Photo | Caption), read when the site builds.
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

/** photo id -> caption, for rows with a caption filled in.
 * If an id has two rows, the first one with a caption wins. */
export const noteCaptions = new Map();
for (const [rawId = "", , cell = ""] of tableRows(Object.values(note)[0])) {
  const id = rawId.replace(/`/g, "");
  const caption = plainText(cell);
  if (id && caption && !noteCaptions.has(id)) noteCaptions.set(id, caption);
}
