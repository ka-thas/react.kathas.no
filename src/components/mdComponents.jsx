import { Link } from "react-router-dom";
import InlineCode from "./InlineCode.jsx";

// How markdown elements look in notes from the vault (blog posts and project pages).
export const md = {
  h1: (p) => <h1 className="text-3xl font-extrabold mb-2 mt-8 leading-tight" {...p} />,
  h2: (p) => (
    <h2
      className="text-2xl font-bold mt-10 mb-3 pb-1.5 border-b border-black/10"
      {...p}
    />
  ),
  h3: (p) => <h3 className="text-xl font-semibold mt-7 mb-2" {...p} />,
  h4: (p) => <h4 className="text-base font-semibold mt-5 mb-1.5" {...p} />,
  p: (p) => <p className="mb-4 leading-[1.78]" {...p} />,
  a: ({ href = "", ...p }) => {
    const cls = "text-accent-green underline underline-offset-[3px] hover:text-accent-yellow transition-colors";
    // Site paths (wikilinks, /cv, …) go through the router: no reload, no flash.
    return href.startsWith("/")
      ? <Link to={href} className={cls} {...p} />
      : <a href={href} className={cls} {...p} />;
  },
  ul: (p) => <ul className="list-disc pl-6 mb-4" {...p} />,
  ol: (p) => <ol className="list-decimal pl-6 mb-4" {...p} />,
  li: (p) => <li className="my-1 leading-[1.65]" {...p} />,
  strong: (p) => <strong className="font-bold text-black" {...p} />,
  em: (p) => <em className="italic" {...p} />,
  hr: () => <hr className="border-0 border-t border-black/15 my-10" />,
  img: (p) => <img className="max-w-full rounded-lg my-3" {...p} />,
  blockquote: (p) => (
    <blockquote
      className="border-l-[3px] border-accent-green pl-4 py-1 bg-accent-green/5 rounded-r-md mb-4 opacity-90"
      {...p}
    />
  ),
  // className ("language-xxx") is present on fenced code blocks but absent on inline code
  code: ({ className, ...p }) =>
    className ? (
      <code className={`font-mono text-sm text-white/90 ${className}`} {...p} />
    ) : (
      <InlineCode {...p} />
    ),
  pre: (p) => (
    <pre
      className="bg-[#16271e] border border-black/10 rounded-lg p-4 overflow-x-auto mb-4 text-sm leading-relaxed"
      {...p}
    />
  ),
  table: (p) => <table className="border-collapse w-full mb-4 text-[0.93rem]" {...p} />,
  th: (p) => (
    <th className="border border-black/15 px-3 py-2 text-left bg-black/5 font-semibold" {...p} />
  ),
  td: (p) => <td className="border border-black/15 px-3 py-2" {...p} />,
};
