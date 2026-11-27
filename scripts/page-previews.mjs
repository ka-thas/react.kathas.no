// Link previews per page. Discord, iMessage, Slack etc. don't run the app, they
// only read the <meta> tags in the HTML, which for a single-page app is the same
// index.html everywhere. So after the build this writes a copy of dist/index.html
// for every page, with its own og:title, description and image:
//   dist/photos.html, dist/blog/<slug>.html, dist/projects/<slug>.html, ...
// Vercel serves them at /photos etc. (cleanUrls in vercel.json); every other
// path still falls back to index.html. The browser tab title stays "Ka Thas".
//
// Main pages: the PAGES list below. Blog posts: title and description from the
// frontmatter. Projects: title, and the first sentence of the write-up. The
// image is the note's first image (made into a JPEG in dist/og/), else the
// site's og-image.png.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const POSTS = join(ROOT, "src/posts");
const SITE = "https://kathas.no";

// The main pages: their heading and intro, as on the page.
const PAGES = [
  { path: "/projects", title: "Projects", description: "A curated collection of my projects." },
  {
    path: "/blog",
    title: "Blog ☕️",
    description: "A space of ideas, thoughts, projects and other writings I’d want to share with the world.",
  },
  { path: "/photos", title: "Photosynthesis", description: "Moments from my life in Japan. Captured with Kodak Charmera." },
  { path: "/thesis", title: "Master's Thesis 🎓", description: "Dashboard for everything regarding my master's thesis." },
  { path: "/cv", title: "CV", description: "Studying AI and robotics at UiO." },
  { path: "/social", title: "Socials", description: "Hi, I'm Ka from Oslo. I like sketching, plants and coffee. Always happy to chat ~" },
];

// Flat `key: value` frontmatter is all the notes use.
function parseNote(file) {
  const text = readFileSync(file, "utf8");
  const [, head = "", body = text] = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? [];
  const fm = {};
  for (const line of head.split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { fm, body };
}

// The first paragraph of plain text, cut to a sentence or two.
function firstSentence(body) {
  const para = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !/^(!\[|<|#|import |export |\||---|>)/.test(p));
  if (!para) return "";
  const text = para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [text](url)
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, "$1") // [[note|text]]
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 200) return text;
  const cut = text.slice(0, 200);
  const end = cut.lastIndexOf(". ");
  return end > 60 ? cut.slice(0, end + 1) : `${cut.slice(0, 160).trimEnd()}…`;
}

const attachments = new Map(); // file name -> path, for ![[name]] and moved files
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(dir, e.name));
    else attachments.set(e.name, join(dir, e.name));
  }
})(join(POSTS, "attachments"));

// The note's first image as a file on disk, if it's one we can read.
function firstImage(file, body) {
  const m = body.match(/!\[[^\]]*\]\(<?([^)>\s]+)>?\)/) ?? body.match(/!\[\[([^\]|\\]+)/);
  if (!m) return null;
  const src = decodeURI(m[1]);
  if (/^https?:/.test(src)) return null;
  const candidates = src.startsWith("/")
    ? [join(ROOT, "public", src)]
    : [join(dirname(file), src), attachments.get(src.split("/").pop())];
  return candidates.find((p) => p && existsSync(p) && /\.(webp|png|jpe?g)$/i.test(p)) ?? null;
}

function notes(dir, { recurse }) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return recurse && !["projects", "attachments", "templates"].includes(e.name) ? notes(p, { recurse }) : [];
    return /\.mdx?$/.test(e.name) ? [p] : [];
  });
}

function collectPages() {
  const pages = PAGES.map((p) => ({ ...p }));
  for (const file of notes(POSTS, { recurse: true })) {
    const { fm, body } = parseNote(file);
    if (fm.publish === "false") continue;
    const slug = fm.slug || file.split("/").pop().replace(/\.mdx?$/, "");
    pages.push({
      path: `/blog/${slug}`,
      title: fm.title || slug,
      description: fm.description || firstSentence(body),
      image: firstImage(file, body),
    });
  }
  for (const file of notes(join(POSTS, "projects"), { recurse: false })) {
    const { fm, body } = parseNote(file);
    const slug = fm.slug || file.split("/").pop().replace(/\.md$/, "");
    pages.push({
      path: `/projects/${slug}`,
      title: fm.title || slug,
      description: fm.description || firstSentence(body),
      image: firstImage(file, body),
    });
  }
  return pages;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Swap the content of one <meta> tag in the template.
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`page-previews: index.html has no <meta ${attr}="${key}">`);
  return html.replace(re, `$1${esc(value)}$2`);
}

export async function writePagePreviews(dist) {
  const template = readFileSync(join(dist, "index.html"), "utf8");
  const pages = collectPages();
  for (const page of pages) {
    let html = template;
    html = setMeta(html, "name", "description", page.description);
    html = setMeta(html, "property", "og:title", page.title);
    html = setMeta(html, "property", "og:description", page.description);
    html = setMeta(html, "property", "og:url", SITE + page.path);
    html = setMeta(html, "property", "og:image:alt", page.title);

    if (page.image) {
      const name = `og/${page.path.slice(1).replace(/\//g, "-")}.jpg`;
      mkdirSync(join(dist, "og"), { recursive: true });
      const { width, height } = await sharp(page.image)
        .resize({ width: 1200, withoutEnlargement: true })
        .flatten({ background: "#f1fff8" }) // JPEG has no transparency: the site's mint
        .jpeg({ quality: 80 })
        .toFile(join(dist, name));
      for (const key of ["og:image", "twitter:image"]) {
        html = setMeta(html, key === "og:image" ? "property" : "name", key, `${SITE}/${name}`);
      }
      html = setMeta(html, "property", "og:image:width", width);
      html = setMeta(html, "property", "og:image:height", height);
    }

    const out = join(dist, `${page.path.slice(1)}.html`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  }
  return pages.map((p) => relative(dist, join(dist, `${p.path.slice(1)}.html`)));
}

// Vite plugin: runs once the build has written dist/.
export function pagePreviews() {
  let outDir;
  return {
    name: "page-previews",
    apply: "build",
    configResolved(config) {
      outDir = join(config.root, config.build.outDir);
    },
    async closeBundle() {
      const files = await writePagePreviews(outDir);
      console.log(`page-previews: wrote ${files.length} pages with their own link preview`);
    },
  };
}
