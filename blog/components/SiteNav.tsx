// kathas.no navbar for the Quartz blog, mirroring src/components/Navbar.jsx.
// build.sh copies this file and src/data/navLinks.json into .quartz/quartz/components/.
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import navLinks from "./navLinks.json"

type NavLink = { to: string; label: string; isNew?: boolean }

const isBlog = (to: string) => to.startsWith("/blog")

function Links({ cls }: { cls: string }) {
  return (
    <>
      {(navLinks as NavLink[]).map(({ to, label, isNew }) => (
        <a
          href={to}
          class={`${cls}${isBlog(to) ? " active" : ""}`}
          // Everything except the blog is the React app: skip Quartz's SPA router.
          {...(isBlog(to) ? {} : { "data-router-ignore": "" })}
        >
          {label}
          {isNew && <span class="site-nav-badge">new</span>}
        </a>
      ))}
    </>
  )
}

const SiteNav: QuartzComponent = () => (
  <nav class="site-nav" aria-label="kathas.no">
    <div class="site-nav-bar">
      <a href="/" class="site-nav-logo" data-router-ignore aria-label="Ka Thas">
        <img src="/assets/icons/seedling.svg" alt="Ka Thas" width="32" height="32" />
      </a>
      <div class="site-nav-links">
        <Links cls="site-nav-link" />
      </div>
      <button class="site-nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span />
        <span />
        <span />
      </button>
    </div>
    <div class="site-nav-menu">
      <Links cls="site-nav-link" />
    </div>
  </nav>
)

SiteNav.css = `
:root { --site-nav-h: 3.5rem; }

/* Sits above Quartz's grid at full width; body padding makes room for it. */
body { padding-top: var(--site-nav-h); }
.page-header > header { margin: 0; }

.site-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  font-family: var(--bodyFont);
}
.site-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--site-nav-h);
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.25rem;
  box-sizing: border-box;
}
.site-nav-logo { display: flex; background: none !important; }
.site-nav-logo img { width: 2rem; height: 2rem; margin: 0; }

.site-nav-links { display: flex; align-items: center; gap: 0.25rem; }

.site-nav a.site-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  color: color-mix(in srgb, var(--dark) 70%, transparent);
  background: none;
  transition: color 150ms, background-color 150ms;
}
.site-nav a.site-nav-link:hover {
  color: var(--dark);
  background: color-mix(in srgb, var(--dark) 6%, transparent);
}
.site-nav a.site-nav-link.active {
  color: var(--secondary);
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
}
.site-nav a.site-nav-link.active:hover {
  background: color-mix(in srgb, var(--secondary) 15%, transparent);
}

.site-nav-badge {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.4;
  padding: 1px 5px;
  border-radius: 0.25rem;
  color: var(--secondary);
  background: color-mix(in srgb, var(--secondary) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--secondary) 35%, transparent);
}

.site-nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2.25rem;
  height: 2.25rem;
  padding: 6px;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
.site-nav-toggle:hover { background: color-mix(in srgb, var(--dark) 6%, transparent); }
.site-nav-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--dark);
  transition: transform 250ms, opacity 250ms;
  transform-origin: center;
}
.site-nav.open .site-nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.site-nav.open .site-nav-toggle span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.site-nav.open .site-nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.site-nav-menu {
  display: none;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  padding: 0 1.25rem;
  border-top: 1px solid transparent;
  background: var(--light);
  transition: max-height 300ms, padding 300ms;
}
.site-nav-menu a.site-nav-link { padding: 0.65rem 0.5rem; font-size: 1rem; }
.site-nav.open .site-nav-menu {
  max-height: 400px;
  padding: 0.5rem 1.25rem 0.75rem;
  border-top-color: color-mix(in srgb, var(--dark) 8%, transparent);
}

@media (max-width: 600px) {
  .site-nav-links { display: none; }
  .site-nav-toggle, .site-nav-menu { display: flex; }
}
`

// Delegated once on document, so it keeps working after Quartz's SPA page swaps.
SiteNav.afterDOMLoaded = `
if (!window.__siteNavBound) {
  window.__siteNavBound = true
  document.addEventListener("click", (e) => {
    const nav = document.querySelector(".site-nav")
    if (!nav) return
    const toggle = e.target.closest(".site-nav-toggle")
    if (toggle) {
      const open = nav.classList.toggle("open")
      toggle.setAttribute("aria-expanded", String(open))
    } else if (e.target.closest(".site-nav-menu a")) {
      nav.classList.remove("open")
    }
  })
}
`

export default (() => SiteNav) satisfies QuartzComponentConstructor
