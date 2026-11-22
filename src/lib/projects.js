// Projects are notes in the Obsidian vault: src/posts/projects/<Title>.md.
//   frontmatter  title, slug (page at /projects/<slug>), order (position on /projects),
//                demo and repo (URLs for the "Try it" and "GitHub" buttons; both optional)
//   body         the write-up. Its first image is also the card's preview on /projects.
// Images live in src/posts/attachments/projects/.
const modules = import.meta.glob("../posts/projects/*.md", { eager: true });
const raw = import.meta.glob("../posts/projects/*.md", { query: "?raw", import: "default", eager: true });
const images = import.meta.glob("../posts/attachments/**/*.{webp,png,jpg,jpeg,gif,svg}", {
  eager: true,
  import: "default",
});

// Image URL by file name, so the card finds it whatever link style Obsidian wrote.
const imageByName = Object.fromEntries(
  Object.entries(images).map(([path, url]) => [path.split("/").pop(), url])
);

const firstImage = /!\[([^\]]*)\]\(<?([^)>]+?)>?\)/;

export const projects = Object.entries(modules)
  .map(([path, mod]) => {
    const fm = mod.frontmatter ?? {};
    const body = raw[path].replace(/^---[\s\S]*?---/, "");
    const [, imgAlt = "", imgPath = ""] = body.match(firstImage) ?? [];
    const name = path.split("/").pop().replace(/\.md$/, "");
    return {
      id: fm.slug ?? name,
      title: fm.title ?? name,
      order: fm.order ?? Infinity,
      imgSrc: imageByName[decodeURI(imgPath).split("/").pop()],
      imgAlt,
      links: [
        fm.demo && { href: fm.demo, text: "Try it", type: "demo" },
        fm.repo && { href: fm.repo, text: "GitHub", type: "repo" },
      ].filter(Boolean),
      // Plain text for search: the body without images.
      text: body.replace(/!\[[^\]]*\]\([^)]*\)/g, "").trim(),
      Content: mod.default,
    };
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const projectsBySlug = Object.fromEntries(projects.map((p) => [p.id, p]));
