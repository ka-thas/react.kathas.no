import { useParams, Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/Footer.jsx";
import { md } from "../components/mdComponents.jsx";
import { isPublished } from "../lib/posts";

// eager: true bundles all posts synchronously — no async loading needed at render time
// Project notes (posts/projects/) are pages of their own, at /projects/<slug>.
const postModules = import.meta.glob(["../posts/**/*.{md,mdx}", "!../posts/projects/**"], { eager: true });

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.(md|mdx)$/, "");
}

const posts = Object.fromEntries(
  Object.entries(postModules)
    .filter(([, mod]) => isPublished(mod))
    .map(([path, mod]) => [mod.frontmatter?.slug ?? slugFromPath(path), mod])
);

function formatDate(d) {
  return d
    ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
}

function BlogPostPage() {
  const { slug } = useParams();
  const mod = posts[slug];

  if (!mod) {
    return (
      <>
      <main className="max-w-[680px] mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4 opacity-30">404</p>
        <p className="opacity-60 mb-6">Post not found.</p>
        <Link to="/blog" className="text-accent-green px-5 py-2.5 rounded-lg bg-accent-green/10 border border-accent-green/30 text-accent-green no-underline font-medium hover:bg-accent-green/18 transition-colors duration-150">
          ← Back to blog
        </Link>
      </main>
        <Footer />
      </>
    );
  }

  const Content = mod.default;
  const { title, date, description } = mod.frontmatter ?? {};

  return (
    <>
      <main className="max-w-[680px] mx-auto px-4 pb-16">
        <header className="mb-8 pb-5 border-b border-ink/10">
          <h1 className="text-[clamp(1.8rem,5vw,2.5rem)] font-extrabold m-0 mb-2 leading-[1.15]">
            {title}
          </h1>
          {date && <p className="text-sm opacity-40 m-0 mt-1">{formatDate(date)}</p>}
          {description && (
            <p className="mt-2 text-base opacity-60 m-0 leading-snug">{description}</p>
          )}
        </header>

        <article>
          <Content components={md} />
        </article>
      </main>
      <Footer />
    </>
  );
}

export default BlogPostPage;
