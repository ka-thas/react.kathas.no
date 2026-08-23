// eager: true bundles all posts synchronously — no async loading needed at render time
const postModules = import.meta.glob("../posts/**/*.{md,mdx}", { eager: true });

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.(md|mdx)$/, "");
}

export const posts = Object.entries(postModules)
  .map(([path, mod]) => ({
    slug: mod.frontmatter?.slug ?? slugFromPath(path),
    title: mod.frontmatter?.title ?? slugFromPath(path),
    date: mod.frontmatter?.date ?? "",
    description: mod.frontmatter?.description ?? "",
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
