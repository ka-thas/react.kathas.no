# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Ka Thas, served at kathas.no. React 19 + Vite SPA, styled with Tailwind CSS v4, deployed on Vercel with a single serverless API route.

## Commands

```bash
npm run dev      # Vite dev server (note: /api/* routes do NOT run here — see below)
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # eslint over the repo
```

There is no test suite. Verify changes via `npm run dev` and the browser.

To exercise the `/api/visit` serverless function locally you need the Vercel dev server (`vercel dev`), not `vite`, plus the Redis env vars in `.env.local`.

## Architecture

- **Routing** lives entirely in `src/App.jsx` via `react-router-dom`. Routes: `/`, `/projects`, `/social`, `/cv`, `/blog`, `/blog/:slug`, and `*` (NotFound). `ScrollToTop` and `HomeSticker` render outside `<Routes>` so they apply to every page. Vercel rewrites all non-`/api` paths to `index.html` (`vercel.json`) for client-side routing.

- **Pages** (`src/pages/`) compose **components** (`src/components/`). Each page typically imports `../styles/global.css` and renders its own `<Footer />`.

- **Blog is MDX-driven.** Posts are `.mdx` files in `src/posts/` with frontmatter (`slug`, `title`, `date`, `description`). MDX is compiled at build time by the `@mdx-js/rollup` plugin (configured in `vite.config.js` with `remark-frontmatter` + `remark-mdx-frontmatter`). `BlogPage.jsx` and `BlogPostPage.jsx` discover posts with `import.meta.glob("../posts/**/*.{md,mdx}", { eager: true })` — **adding a post = dropping a new `.mdx` file in `src/posts/`**, no registration needed. Markdown elements are mapped to Tailwind-styled components by the `md` object in `src/components/mdComponents.jsx` (used by blog posts and project pages); edit there to restyle note bodies. `src/posts/projects/` is left out of the blog (see below).

- **Projects are notes in the Obsidian vault**: one `src/posts/projects/<Title>.md` per project. Frontmatter: `title`, `slug` (page at `/projects/<slug>`), `order` (position on `/projects`), and optional `demo` / `repo` URLs (the "Try it" / "GitHub" buttons). The body is the write-up; its first image (in `src/posts/attachments/projects/`) doubles as the card preview. `src/lib/projects.js` loads them for `ProjectsPage` (cards + `ProjectModal`), `ProjectPage` and search. **Adding a project = adding a note** there with its preview image.

- **The actual project demos are separate apps**, not part of this build. They live under `public/projects/` as **git submodules** (see `.gitmodules`) and are served at the `projects.kathas.no` subdomain — `projectsData` links point there. Run `git submodule update --init --recursive` if those directories are empty.

- **Visitor counter** is the only backend: `api/visit.ts` is a Vercel serverless function backed by Upstash Redis (`@upstash/redis`), incrementing the `visitor-count` key. It reads `KV_REST_API_*` env vars (Vercel KV integration) and falls back to `UPSTASH_REDIS_REST_*`. `src/components/VisitorButton.jsx` GETs the count on mount and POSTs (optimistically) on click.

- **Image assets**: source images live in `src/assets/images/` (mostly `.webp`; convert with `cwebp -q 50 input.png -o output.webp`); project previews live in the vault instead. Several image manifest files (`portraitImages.js`, `stickerImages.js`, `captchaImages.js`) collect static imports into exported objects.

- **Sticker wall** (`src/posts/stickers.mdx` → `StickerWall.jsx`) shows every image in `src/posts/attachments/stickers/` (the nav stickers too). `src/lib/stickers.js` exports that list (`stickers`, `stickerByName`, `randomSticker()`) for use anywhere on the site. Add them with `npm run sticker` (clipboard), `npm run sticker -- <folder or files>`, or `npm run sticker -- <name> [file]`: it trims the transparent padding, fits each in 480px and saves a `.webp` there (`scripts/add-sticker.mjs`, uses `sharp`, falls back to macOS `sips` for HEIC). Images already on the wall are skipped and taken names get `-2`. Claude then names the new stickers by content: first via Claude Code (`claude -p`, one call per batch, on the subscription), else the Claude API if `ANTHROPIC_API_KEY` is in `.env.local`, else they keep their file names (`--no-ai` to skip).

## Conventions

- Components are `.jsx` and authored as React 19 function components.
- **Styling is Tailwind utility classes inline in JSX**, frequently with arbitrary values for the site's dark/neon theme (accent green `#00ff80`, yellow `#efff78`). Page-scoped CSS lives in `src/styles/` (`global.css`, `stickers.css`). Match the existing inline-utility style rather than adding new CSS files.
- ESLint flag config in `eslint.config.js`: `no-unused-vars` ignores PascalCase/CONSTANT identifiers (`varsIgnorePattern: '^[A-Z_]'`), so unused capitalized imports won't error. React Hooks rules are enforced.

## Git

- Commit as `Ka Thas <ka@kathas.no>` (set `git config --local user.name/user.email` first if needed). Never as Claude.
- Commit messages are a single subject line only: no body, no `Co-Authored-By` or `Claude-Session` trailers.
