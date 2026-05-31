import { Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/footer.jsx";

// eager: true bundles all posts synchronously — no async loading needed at render time
const postModules = import.meta.glob("../posts/**/*.{md,mdx}", { eager: true });

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.(md|mdx)$/, "");
}

const posts = Object.entries(postModules)
  .map(([path, mod]) => ({
    slug: mod.frontmatter?.slug ?? slugFromPath(path),
    title: mod.frontmatter?.title ?? slugFromPath(path),
    date: mod.frontmatter?.date ?? "",
    description: mod.frontmatter?.description ?? "",
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

function formatDate(d) {
  return d
    ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
}

function PostCard({ slug, title, date, description }) {
  return (
    <Link
      to={`/blog/${slug}`}
      className="block px-5 py-4 rounded-xl bg-[rgba(150,200,150,0.1)] border border-white/8 no-underline text-inherit transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-[rgba(0,255,128,0.3)]"
    >
      <h2 className="text-[1.1rem] font-bold m-0 p-0 border-none text-white leading-snug">
        {title}
      </h2>
      {date && (
        <p className="text-[0.8rem] opacity-45 mt-1 mb-2 leading-none">{formatDate(date)}</p>
      )}
      {description && (
        <p className="text-[0.93rem] opacity-75 m-0 leading-snug">{description}</p>
      )}
    </Link>
  );
}

function BlogPage() {
  return (
    <>
      <main className="max-w-[780px] mx-auto px-4 w-full">
        <h1 className="font-bold mt-5">Blog</h1>
        <p className="mb-8 opacity-70 max-w-[520px]">
          Thoughts on robotics, ML, and things I&apos;ve built.
        </p>
        <div className="flex flex-col gap-3 pb-12">
          {posts.length === 0 ? (
            <p className="opacity-45">No posts yet.</p>
          ) : (
            posts.map((post) => <PostCard key={post.slug} {...post} />)
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BlogPage;
