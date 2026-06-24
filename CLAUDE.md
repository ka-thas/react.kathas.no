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

- **Blog is MDX-driven.** Posts are `.mdx` files in `src/posts/` with frontmatter (`slug`, `title`, `date`, `description`). MDX is compiled at build time by the `@mdx-js/rollup` plugin (configured in `vite.config.js` with `remark-frontmatter` + `remark-mdx-frontmatter`). `BlogPage.jsx` and `BlogPostPage.jsx` discover posts with `import.meta.glob("../posts/**/*.{md,mdx}", { eager: true })` — **adding a post = dropping a new `.mdx` file in `src/posts/`**, no registration needed. `BlogPostPage` maps markdown elements to Tailwind-styled components via the `md` object passed as `components={md}`; edit there to restyle post bodies.

- **Projects are a hardcoded array** in `src/pages/ProjectsPage.jsx` (`projectsData`), each rendered as a `ProjectCard` that opens a `ProjectModal`. Preview images are statically imported through `src/assets/projectImages.js` (key the image there, reference as `projectImages.<key>`). To add a project, append to `projectsData` and add its image import.

- **The actual project demos are separate apps**, not part of this build. They live under `public/projects/` as **git submodules** (see `.gitmodules`) and are served at the `projects.kathas.no` subdomain — `projectsData` links point there. Run `git submodule update --init --recursive` if those directories are empty.

- **Visitor counter** is the only backend: `api/visit.ts` is a Vercel serverless function backed by Upstash Redis (`@upstash/redis`), incrementing the `visitor-count` key. It reads `KV_REST_API_*` env vars (Vercel KV integration) and falls back to `UPSTASH_REDIS_REST_*`. `src/components/VisitorButton.jsx` GETs the count on mount and POSTs (optimistically) on click.

- **Image assets**: source images live in `src/assets/images/` (mostly `.webp` — see the `cwebp` conversion notes at the top of `projectImages.js`). Several image manifest files (`projectImages.js`, `portraitImages.js`, `stickerImages.js`, `captchaImages.js`) collect static imports into exported objects.

## Conventions

- Components are `.jsx` and authored as React 19 function components.
- **Styling is Tailwind utility classes inline in JSX**, frequently with arbitrary values for the site's dark/neon theme (accent green `#00ff80`, yellow `#efff78`). Page-scoped CSS lives in `src/styles/` (`global.css`, `stickers.css`). Match the existing inline-utility style rather than adding new CSS files.
- ESLint flag config in `eslint.config.js`: `no-unused-vars` ignores PascalCase/CONSTANT identifiers (`varsIgnorePattern: '^[A-Z_]'`), so unused capitalized imports won't error. React Hooks rules are enforced.
- `CommitInfo.jsx` fetches the latest commit from the GitHub API (`ka-thas/react.kathas.no`) to show a "last updated" line — it depends on the repo name/path staying correct.
