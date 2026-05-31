import { useParams, Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/footer.jsx";

// eager: true bundles all posts synchronously — no async loading needed at render time
const postModules = import.meta.glob("../posts/**/*.{md,mdx}", { eager: true });

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.(md|mdx)$/, "");
}

const posts = Object.fromEntries(
  Object.entries(postModules).map(([path, mod]) => [
    mod.frontmatter?.slug ?? slugFromPath(path),
    mod,
  ])
);

function formatDate(d) {
  return d
    ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
}

const md = {
  h1: (p) => <h1 className="text-3xl font-extrabold mb-2 mt-8 leading-tight" {...p} />,
  h2: (p) => (
    <h2
      className="text-2xl font-bold mt-10 mb-3 pb-1.5 border-b border-white/10"
      {...p}
    />
  ),
  h3: (p) => <h3 className="text-xl font-semibold mt-7 mb-2" {...p} />,
  h4: (p) => <h4 className="text-base font-semibold mt-5 mb-1.5" {...p} />,
  p: (p) => <p className="mb-4 leading-[1.78]" {...p} />,
  a: (p) => (
    <a
      className="text-[#00ff80] underline underline-offset-[3px] hover:text-[#efff78] transition-colors"
      {...p}
    />
  ),
  ul: (p) => <ul className="list-disc pl-6 mb-4" {...p} />,
  ol: (p) => <ol className="list-decimal pl-6 mb-4" {...p} />,
  li: (p) => <li className="my-1 leading-[1.65]" {...p} />,
  strong: (p) => <strong className="font-bold text-white" {...p} />,
  em: (p) => <em className="italic" {...p} />,
  hr: () => <hr className="border-0 border-t border-white/13 my-10" />,
  img: (p) => <img className="max-w-full rounded-lg my-3" {...p} />,
  blockquote: (p) => (
    <blockquote
      className="border-l-[3px] border-[#00ff80] pl-4 py-1 bg-[rgba(0,255,128,0.05)] rounded-r-md mb-4 opacity-90"
      {...p}
    />
  ),
  // className ("language-xxx") is present on fenced code blocks but absent on inline code
  code: ({ className, ...p }) =>
    className ? (
      <code className={`font-mono text-sm ${className}`} {...p} />
    ) : (
      <code className="font-mono bg-white/8 px-1.5 py-0.5 rounded text-[0.875em]" {...p} />
    ),
  pre: (p) => (
    <pre
      className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 text-sm leading-relaxed"
      {...p}
    />
  ),
  table: (p) => <table className="border-collapse w-full mb-4 text-[0.93rem]" {...p} />,
  th: (p) => (
    <th className="border border-white/12 px-3 py-2 text-left bg-white/6 font-semibold" {...p} />
  ),
  td: (p) => <td className="border border-white/12 px-3 py-2" {...p} />,
};

function BlogPostPage() {
  const { slug } = useParams();
  const mod = posts[slug];

  if (!mod) {
    return (
      <>
      <main className="max-w-[680px] mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4 opacity-30">404</p>
        <p className="opacity-60 mb-6">Post not found.</p>
        <Link to="/blog" className="text-[#00ff80] px-5 py-2.5 rounded-lg bg-[rgba(0,255,128,0.1)] border border-[rgba(0,255,128,0.3)] text-[#00ff80] no-underline font-medium hover:bg-[rgba(0,255,128,0.18)] transition-colors duration-150">
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
        <Link
          to="/blog"
          className="text-sm text-white/50 no-underline mt-5 mb-8 hover:text-[#00ff80] transition-colors duration-150"
        >
          ← Blog
        </Link>

        <header className="mb-8 pb-5 border-b border-white/10">
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
