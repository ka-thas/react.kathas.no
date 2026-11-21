# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Ka Thas, served at kathas.no. React 19 + Vite SPA, styled with Tailwind CSS v4, deployed on Vercel with a single serverless API route.

## Commands

```bash
npm run dev      # Vite dev server (note: /api/* routes do NOT run here — see below)
npm run build    # vite build to dist/, then the Quartz blog into dist/blog
npm run dev:blog # build + serve the Quartz blog alone (Quartz's dev server)
npm run preview  # serve the built dist/
npm run lint     # eslint over the repo
```

There is no test suite. Verify changes via `npm run dev` and the browser.

To exercise the `/api/visit` serverless function locally you need the Vercel dev server (`vercel dev`), not `vite`, plus the Redis env vars in `.env.local`.

## Architecture

- **Routing** lives entirely in `src/App.jsx` via `react-router-dom`. Routes: `/`, `/projects`, `/social`, `/cv`, `/thesis`, one `/<slug>` per MDX page in `src/posts/`, and `*` (NotFound). `/blog` is **not** a React route (see below), so links to it must be plain `<a>` (full page load), not `<Link>`. `ScrollToTop` and `HomeSticker` render outside `<Routes>` so they apply to every page. Vercel rewrites all non-`/api` paths to `index.html` (`vercel.json`) for client-side routing.

- **Pages** (`src/pages/`) compose **components** (`src/components/`). Each page typically imports `../styles/global.css` and renders its own `<Footer />`.

- **The blog is a Quartz v5 site** in `blog/`, served at `kathas.no/blog/`. Notes are plain markdown in `blog/content/` (frontmatter `title`, `date`, `description`; Obsidian-style `[[wikilinks]]` work). **Adding a post = dropping a `.md` file there.** `blog/build.sh` shallow-clones the pinned Quartz tag into the gitignored `blog/.quartz/`, runs `npm ci` there (v5's plugins are `@quartz-community/*` npm packages), copies in `quartz.config.yaml` (theme: DM Sans + site colours; plugins and their layout positions), `quartz.ts` (adds the navbar to the header and builds the jzhao.xyz-style left pane: title with a search icon (icon-only via custom.scss), "Selected Writing" = posts with `featured: true`, "Recent Notes" = newest posts, both linking to `content/All posts.base`; on phones the lists move below the post), `custom.scss`, `icon.png` and our components from `blog/components/`, and builds into `dist/blog`. The right pane is table of contents + backlinks (explorer and graph are off). The blog is light-only and has no breadcrumbs, dark mode, reader mode or footer (those plugins are `enabled: false` in the YAML); its top bar is `blog/components/SiteNav.tsx`, which shares its links with the React `Navbar.jsx` via `src/data/navLinks.json` (edit links there). Non-blog links carry `data-router-ignore` so Quartz's SPA router does a full load into the React app. `blog/content/` is also an **Obsidian vault**: open that folder in Obsidian. Shared settings (`.obsidian/app.json`, `templates.json`) are committed and per-device files are gitignored. Pasted images go to `attachments/`; new posts start from `templates/post.md` (starts as `draft: true`). Quartz skips `templates/`, `.obsidian/` and `.trash/`. The evolutionary-algorithm slides live in `attachments/ea-images/`; both the evolutionary-algorithm and my-masters-thesis notes use them.

- **root.kathas.no** is a second Vercel project (Root Directory `blog`) that builds the same vault as a standalone Quartz site, to test Quartz as the main site. `blog/vercel.json` runs `build.sh` with `QUARTZ_BASE_URL=root.kathas.no QUARTZ_OUT=public KATHAS_NAV=off` (no kathas.no navbar). Those three settings are the only differences between the two blog builds; keep it that way, and keep site-specific settings in that build command rather than in the vault or config. Both projects rebuild on every push to `main`. The main kathas.no project ignores `blog/vercel.json`.

- **Books**: `src/data/books.json` (from `npm run update-books`, a Goodreads export) feeds both the React `/books` page and the blog. `scripts/books-to-vault.mjs` (run by `update-books`, or alone via `npm run books-to-vault`) writes one note per book to `blog/content/books/`, managing only the `title`, `cover`, `rating`, `read`, `goodreads` and `tags` properties and keeping any other text. The read date is `read:`, not `date:`, so books don't count as posts. `books/Books.base` renders them as a cards grid on the blog's Books page.

- **MDX pages** (`src/posts/*.mdx`) are the posts that embed React components (books, photos, big-day; my-masters-thesis moved to the blog, embedding the timeline via an iframe of `/embed/thesis-timeline`). They render via `PostPage.jsx` at `/<slug>`; restyle their bodies in its `md` object. `src/lib/posts.js` lists both kinds (Quartz notes read as `?raw` text) for the home page's recent posts. The Vite MDX plugin is limited to `.mdx` so it doesn't compile the Quartz `.md` files.

- **`vercel.json`**: `cleanUrls` so `/blog/<slug>` serves `<slug>.html`; `/blog` redirects to `/blog/` (Quartz uses relative links); old `/blog/<mdx-slug>` URLs redirect to `/<slug>`; unknown `/blog/*` paths get Quartz's 404; everything else non-`/api` rewrites to the SPA. Static files take precedence over rewrites.

- **Projects are a hardcoded array** in `src/pages/ProjectsPage.jsx` (`projectsData`), each rendered as a `ProjectCard` that opens a `ProjectModal`. Preview images live in the blog vault (`blog/content/attachments/projects/`) and are statically imported through `src/assets/projectImages.js` (key the image there, reference as `projectImages.<key>`). The blog also has one note per project in `blog/content/projects/` (plus `CV.md` for the CV page), so to add a project, append to `projectsData`, add its image import, and add its note (with `image: "[[preview-….webp]]"` and `order:` frontmatter, which `projects/Projects.base` uses for the cards grid on the blog's Projects page).

- **The actual project demos are separate apps**, not part of this build. They live under `public/projects/` as **git submodules** (see `.gitmodules`) and are served at the `projects.kathas.no` subdomain — `projectsData` links point there. Run `git submodule update --init --recursive` if those directories are empty.

- **Visitor counter** is the only backend: `api/visit.ts` is a Vercel serverless function backed by Upstash Redis (`@upstash/redis`), incrementing the `visitor-count` key. It reads `KV_REST_API_*` env vars (Vercel KV integration) and falls back to `UPSTASH_REDIS_REST_*`. `src/components/VisitorButton.jsx` GETs the count on mount and POSTs (optimistically) on click.

- **Image assets**: source images live in `src/assets/images/` (mostly `.webp` — see the `cwebp` conversion notes at the top of `projectImages.js`). Several image manifest files (`projectImages.js`, `portraitImages.js`, `stickerImages.js`, `captchaImages.js`) collect static imports into exported objects.

## Conventions

- Components are `.jsx` and authored as React 19 function components.
- **Styling is Tailwind utility classes inline in JSX**, frequently with arbitrary values for the site's dark/neon theme (accent green `#00ff80`, yellow `#efff78`). Page-scoped CSS lives in `src/styles/` (`global.css`, `stickers.css`). Match the existing inline-utility style rather than adding new CSS files.
- ESLint flag config in `eslint.config.js`: `no-unused-vars` ignores PascalCase/CONSTANT identifiers (`varsIgnorePattern: '^[A-Z_]'`), so unused capitalized imports won't error. React Hooks rules are enforced.

## Git

- Commit as `Ka Thas <ka@kathas.no>` (set `git config --local user.name/user.email` first if needed). Never as Claude.
- Commit messages are a single subject line only: no body, no `Co-Authored-By` or `Claude-Session` trailers.
