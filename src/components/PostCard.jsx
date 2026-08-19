import { Link } from "react-router-dom";
import { isNew, formatDate } from "../lib/posts";

function PostCard({ slug, title, date, description }) {
  return (
    <Link
      to={`/blog/${slug}`}
      className="block px-5 py-4 rounded-xl bg-[rgba(150,200,150,0.1)] border border-white/8 no-underline text-inherit transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-[rgba(0,255,128,0.3)]"
    >
      <h2 className="inline-flex items-center gap-2 text-[1.1rem] font-bold m-0 p-0 border-none text-white leading-snug">
        {title}
        {isNew(date) && (
          <span className="text-[0.62rem] font-bold tracking-[0.04em] uppercase bg-[rgba(0,255,128,0.18)] text-[#00ff80] border border-[rgba(0,255,128,0.35)] rounded py-px px-[5px] leading-[1.4]">
            new
          </span>
        )}
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

export default PostCard;
