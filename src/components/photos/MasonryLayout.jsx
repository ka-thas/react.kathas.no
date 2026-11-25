import React, { useMemo, useSyncExternalStore } from "react";
import PhotoFrame from "./PhotoFrame";
import { formatTripDates } from "../../lib/photos";
import { stickers } from "../../lib/stickers";

// Three columns from 681px up, two below (same breakpoint as the old photo wall).
const wide = window.matchMedia("(min-width: 681px)");
const subscribe = (onChange) => {
  wide.addEventListener("change", onChange);
  return () => wide.removeEventListener("change", onChange);
};
function useColumnCount() {
  return useSyncExternalStore(subscribe, () => wide.matches) ? 3 : 2;
}

const between = (lo, hi) => lo + Math.random() * (hi - lo);
const ALIGN = ["self-start", "self-center", "self-end"];

// Charmera photos are nearly all 4:3, so plain columns line up like a grid.
// A sticker every few photos staggers them. Picked once per visit, and no
// sticker shows up twice until every one has had a turn.
function sprinkleStickers(groups) {
  const pool = [...stickers].sort(() => Math.random() - 0.5);
  let next = 0;
  return groups.map((group) => {
    const items = [];
    let gap = Math.round(between(2, 5));
    group.photos.forEach((photo, i) => {
      items.push({ key: photo.id, photo });
      if (--gap > 0 || i === group.photos.length - 1 || pool.length === 0) return;
      const sticker = pool[next++ % pool.length];
      const size = between(0.42, 0.7); // share of the column width
      items.push({
        key: `sticker-${i}-${sticker.name}`,
        sticker,
        size,
        tilt: between(-14, 14),
        align: ALIGN[Math.floor(Math.random() * ALIGN.length)],
      });
      gap = Math.round(between(3, 6));
    });
    return items;
  });
}

// Each item goes to the shortest column so far, so the newest photos stay at
// the top and the columns end about level. Stickers count as roughly square.
function intoColumns(items, count) {
  const cols = Array.from({ length: count }, () => ({ height: 0, items: [] }));
  for (const item of items) {
    const col = cols.reduce((a, b) => (b.height < a.height ? b : a));
    col.items.push(item);
    col.height += item.photo ? item.photo.height / item.photo.width : item.size;
  }
  return cols;
}

function GallerySticker({ sticker, size, tilt, align }) {
  return (
    <img
      src={sticker.src}
      alt=""
      aria-hidden="true"
      title={sticker.label}
      loading="lazy"
      draggable="false"
      className={`${align} block h-auto py-1 select-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110`}
      style={{ width: `${size * 100}%`, rotate: `${tilt}deg` }}
    />
  );
}

/**
 * Gallery layout: one masonry wall per trip, with stickers sprinkled in.
 * Every layout takes { groups, base, onOpen(photoId) }; see PhotosPage.
 */
function MasonryLayout({ groups, base, onOpen }) {
  const count = useColumnCount();
  const itemsByGroup = useMemo(() => sprinkleStickers(groups), [groups]);

  return (
    <div className="flex flex-col gap-12">
      {groups.map((group, g) => {
        const key = group.trip?.id ?? "other";
        const n = group.photos.length;
        return (
          <section key={key} aria-labelledby={`trip-${key}`}>
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 mb-4">
              <h2 id={`trip-${key}`} className="text-2xl font-bold">
                {group.trip?.name ?? "Other"}
              </h2>
              <p className="text-sm text-black/55">
                {group.trip && `${formatTripDates(group.trip)} · `}
                {n} {n === 1 ? "photo" : "photos"}
              </p>
            </header>
            <div className="flex items-start gap-3">
              {intoColumns(itemsByGroup[g], count).map((col, i) => (
                <div key={i} className="flex flex-1 min-w-0 flex-col gap-3">
                  {col.items.map((item) =>
                    item.photo ? (
                      <PhotoFrame key={item.key} photo={item.photo} base={base} onOpen={() => onOpen(item.photo.id)} />
                    ) : (
                      <GallerySticker key={item.key} {...item} />
                    ),
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default MasonryLayout;
