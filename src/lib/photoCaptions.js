// Photo captions, written in Obsidian: the table in src/posts/photo-captions.md
// (columns: ID | Photo | 日本語 | English), read when the site builds.
// `npm run photo-captions` adds a row for every published photo the table lacks.
import { tableRows } from "./mdTable";

const note = import.meta.glob("../posts/photo-captions.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

/** photo id -> { ja?, en? }, for rows with at least one caption filled in. */
export const noteCaptions = new Map();
for (const [id = "", , ja = "", en = ""] of tableRows(Object.values(note)[0])) {
  const caption = {};
  if (ja) caption.ja = ja;
  if (en) caption.en = en;
  if (id && (caption.ja || caption.en)) noteCaptions.set(id.replace(/`/g, ""), caption);
}
