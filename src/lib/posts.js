// Two kinds of posts:
//  - Quartz notes (blog/content/*.md): built separately into dist/blog and
//    served at /blog/<slug>. Read here as raw text only to list them.
//  - React MDX pages (src/posts/*.mdx): posts that embed React components,
//    rendered by PostPage at /<slug>.
const pageModules = import.meta.glob("../posts/*.mdx", { eager: true });
const noteSources = import.meta.glob("../../blog/content/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.(md|mdx)$/, "");
}

// Minimal frontmatter reader: flat `key: value` lines between the --- fences.
function parseFrontmatter(src) {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, k, v]) => [k, v.replace(/^["']|["']$/g, "")])
  );
}

export const pages = Object.entries(pageModules).map(([path, mod]) => {
  const slug = mod.frontmatter?.slug ?? slugFromPath(path);
  return { slug, href: `/${slug}`, module: mod, ...mod.frontmatter };
});

const notes = Object.entries(noteSources)
  .map(([path, src]) => {
    const slug = slugFromPath(path);
    return { slug, href: `/blog/${slug}`, ...parseFrontmatter(src) };
  })
  // Only dated notes are posts (same rule as the blog's Recent Notes in blog/quartz.ts).
  .filter((n) => n.slug !== "index" && n.draft !== "true" && n.date);

export const posts = [...notes, ...pages]
  .map(({ slug, href, title, date, description }) => ({
    slug,
    href,
    title: title ?? slug,
    date: date ?? "",
    description: description ?? "",
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function isNew(date) {
  if (!date) return false;
  return Date.now() - new Date(date).getTime() < 30 * 24 * 60 * 60 * 1000;
}

export function formatDate(d) {
  return d
    ? new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
    : "";
}
