# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test runner is configured.

## Architecture

Personal portfolio SPA for Ka Thas (robotics/ML student at UiO). Built with React 19, React Router v7, Vite, and Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js` directives needed in CSS, just `@import "tailwindcss"`).

**Routing** (`src/App.jsx`): four routes — `/` (home), `/projects`, `/contact`, `/social`.

**State**: purely local `useState` — no global state library. `ProjectsPage` manages the selected project for modal display; `ContactPage` manages a clipboard copy notification.

**Static data**: project entries are hardcoded in `ProjectsPage.jsx`. Images are imported centrally in `src/assets/projectImages.js` and referenced by key in the project data array — add new images there first before referencing them.

**Styling**: mix of Tailwind utility classes and page-scoped CSS files (`src/styles/`). The custom font (Urbanist) and gradient text patterns are defined in `global.css`.

**Deployment**: Vercel. `vercel.json` has a catch-all rewrite to `index.html` for SPA routing.
