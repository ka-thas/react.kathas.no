// Reads the body rows of Markdown tables in a note (like the ones edited in
// Obsidian), as arrays of trimmed cells. The header row is skipped. `\|` inside
// a cell, as in Obsidian's ![[img.webp\|80]], stays in the cell as a plain `|`.
export function tableRows(text = "") {
  const rows = [];
  let pastHeader = false;
  for (const line of text.split("\n")) {
    const cells = line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim().replace(/\\\|/g, "|"));
    if (cells.length < 2) continue; // not a table row
    if (/^:?-+:?$/.test(cells[0])) { pastHeader = true; continue; } // the | --- | row
    if (pastHeader) rows.push(cells);
  }
  return rows;
}
