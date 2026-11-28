// The main pages' titles and descriptions, in one place. Used for the heading on
// the page, the browser tab ("Photosynthesis - Ka Thas", see PageTitle.jsx) and
// the link preview (scripts/page-previews.mjs, which runs in Node at build time,
// so keep this file plain: no Vite-only imports).
// Blog posts and projects take theirs from the note's frontmatter instead.
export const SITE_NAME = "Ka Thas";

export const pages = {
  projects: { path: "/projects", title: "Projects", description: "A curated collection of my projects." },
  blog: {
    path: "/blog",
    title: "Blog ☕️",
    description: "A space of ideas, thoughts, projects and other writings I’d want to share with the world.",
  },
  photos: {
    path: "/photos",
    title: "Photosynthesis",
    description: "Moments from my life in Japan. Captured with Kodak Charmera.",
  },
  thesis: {
    path: "/thesis",
    title: "Master's Thesis 🎓",
    description: "Dashboard for everything regarding my master's thesis.",
  },
  cv: { path: "/cv", title: "CV", description: "Studying AI and robotics at UiO." },
  social: {
    path: "/social",
    title: "Socials",
    description: "Hi, I'm Ka from Oslo. I like sketching, plants and coffee. Always happy to chat ~",
  },
};

// "Photosynthesis - Ka Thas"; just "Ka Thas" without a title (the front page).
export const tabTitle = (title) => (title ? `${title} - ${SITE_NAME}` : SITE_NAME);
