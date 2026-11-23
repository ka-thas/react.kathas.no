// The sticker wall (src/posts/stickers.mdx). Every image in
// src/posts/attachments/stickers/ shows up here; add one with `npm run sticker`.
// The site's nav stickers (src/assets/images/stickers/) join the pile too.
const files = import.meta.glob(
  ["../posts/attachments/stickers/*.{webp,png}", "../assets/images/stickers/*.{webp,png}"],
  { eager: true, import: "default" }
);

// Same file name, same tilt and offset, so the pile doesn't reshuffle on reload.
function hash(text) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return Math.abs(h);
}

const stickers = Object.entries(files)
  .map(([path, src]) => {
    const name = path.split("/").pop().replace(/\.\w+$/, "");
    const h = hash(name);
    return {
      name,
      src,
      rotate: (h % 21) - 10, // -10° to 10°
      shift: (Math.floor(h / 21) % 25) - 12, // -12px to 12px up or down
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

function StickerWall() {
  if (stickers.length === 0) {
    return <p className="opacity-45">No stickers yet.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 py-8">
      {stickers.map((s) => (
        <span
          key={s.name}
          title={s.name.replace(/-/g, " ")}
          className="block transition-transform duration-200 hover:scale-110 hover:z-10"
          style={{ translate: `0 ${s.shift}px` }}
        >
          <img
            src={s.src}
            alt={`Sticker: ${s.name.replace(/-/g, " ")}`}
            loading="lazy"
            draggable="false"
            className="sticker-img"
            // Same height for every sticker, natural width, so rows pack unevenly (less grid-like).
            style={{ "--rot": `${s.rotate}deg`, width: "auto", height: "8.5rem" }}
          />
        </span>
      ))}
    </div>
  );
}

export default StickerWall;
