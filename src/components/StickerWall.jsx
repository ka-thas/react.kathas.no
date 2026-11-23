// The sticker wall (src/posts/stickers.mdx): every sticker on the site, see lib/stickers.js.
import { stickers } from "../lib/stickers";

function StickerWall() {
  if (stickers.length === 0) {
    return <p className="opacity-45">No stickers yet.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 py-8">
      {stickers.map((s) => (
        <span
          key={s.name}
          title={s.label}
          className="block transition-transform duration-200 hover:scale-110 hover:z-10"
          style={{ translate: `0 ${s.shift}px` }}
        >
          <img
            src={s.src}
            alt={`Sticker: ${s.label}`}
            loading="lazy"
            draggable="false"
            className="sticker-img"
            style={{ "--rot": `${s.rotate}deg`, width: "auto", height: "8.5rem" }}
          />
        </span>
      ))}
    </div>
  );
}

export default StickerWall;
