import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import "../styles/global.css";
import Footer from "../components/Footer.jsx";
import { getPostBySlug, formatDate } from "../lib/posts";
import { urlFor } from "../lib/sanityClient";

const portableTextComponents = {
  block: {
    h1: (p) => <h1 className="text-3xl font-extrabold mb-2 mt-8 leading-tight">{p.children}</h1>,
    h2: (p) => (
      <h2 className="text-2xl font-bold mt-10 mb-3 pb-1.5 border-b border-black/10">
        {p.children}
      </h2>
    ),
    h3: (p) => <h3 className="text-xl font-semibold mt-7 mb-2">{p.children}</h3>,
    h4: (p) => <h4 className="text-base font-semibold mt-5 mb-1.5">{p.children}</h4>,
    normal: (p) => <p className="mb-4 leading-[1.78]">{p.children}</p>,
    blockquote: (p) => (
      <blockquote className="border-l-[3px] border-accent-green pl-4 py-1 bg-accent-green/5 rounded-r-md mb-4 opacity-90">
        {p.children}
      </blockquote>
    ),
  },
  marks: {
    link: (p) => (
      <a
        href={p.value?.href}
        className="text-accent-green underline underline-offset-[3px] hover:text-accent-yellow transition-colors"
      >
        {p.children}
      </a>
    ),
    strong: (p) => <strong className="font-bold text-black">{p.children}</strong>,
    em: (p) => <em className="italic">{p.children}</em>,
    code: (p) => (
      <code className="font-mono bg-black/8 px-1.5 py-0.5 rounded text-[0.875em]">
        {p.children}
      </code>
    ),
  },
  list: {
    bullet: (p) => <ul className="list-disc pl-6 mb-4">{p.children}</ul>,
    number: (p) => <ol className="list-decimal pl-6 mb-4">{p.children}</ol>,
  },
  listItem: {
    bullet: (p) => <li className="my-1 leading-[1.65]">{p.children}</li>,
    number: (p) => <li className="my-1 leading-[1.65]">{p.children}</li>,
  },
  types: {
    image: ({ value }) => (
      <img
        className="max-w-full rounded-lg my-3"
        src={urlFor(value).width(1200).url()}
        alt={value.alt || ""}
      />
    ),
  },
};

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    getPostBySlug(slug).then(setPost);
  }, [slug]);

  if (post === undefined) {
    return (
      <>
        <main className="max-w-[680px] mx-auto px-4 py-24 text-center">
          <p className="opacity-45">Loading…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
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

  const { title, date, description, body } = post;

  return (
    <>
      <main className="max-w-[680px] mx-auto px-4 pb-16">
        <Link
          to="/blog"
          className="text-sm text-black/55 no-underline mt-5 mb-8 hover:text-accent-green transition-colors duration-150"
        >
          ← Blog
        </Link>

        <header className="mb-8 pb-5 border-b border-black/10">
          <h1 className="text-[clamp(1.8rem,5vw,2.5rem)] font-extrabold m-0 mb-2 leading-[1.15]">
            {title}
          </h1>
          {date && <p className="text-sm opacity-40 m-0 mt-1">{formatDate(date)}</p>}
          {description && (
            <p className="mt-2 text-base opacity-60 m-0 leading-snug">{description}</p>
          )}
        </header>

        <article>
          {Array.isArray(body) && <PortableText value={body} components={portableTextComponents} />}
        </article>
      </main>
      <Footer />
    </>
  );
}

export default BlogPostPage;
