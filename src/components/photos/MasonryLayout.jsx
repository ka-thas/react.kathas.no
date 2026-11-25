import React, { useSyncExternalStore } from "react";
import PhotoFrame from "./PhotoFrame";
import { formatTripDates } from "../../lib/photos";

// Three columns from 681px up, two below (same breakpoint as the old photo wall).
const wide = window.matchMedia("(min-width: 681px)");
const subscribe = (onChange) => {
  wide.addEventListener("change", onChange);
  return () => wide.removeEventListener("change", onChange);
};
function useColumnCount() {
  return useSyncExternalStore(subscribe, () => wide.matches) ? 3 : 2;
}

// Each photo goes to the shortest column so far, so the newest photos stay at
// the top and the columns end about level.
function intoColumns(photos, count) {
  const cols = Array.from({ length: count }, () => ({ height: 0, photos: [] }));
  for (const photo of photos) {
    const col = cols.reduce((a, b) => (b.height < a.height ? b : a));
    col.photos.push(photo);
    col.height += photo.height / photo.width;
  }
  return cols;
}

/**
 * Gallery layout: one masonry wall per trip, newest trip first.
 * Every layout takes { groups, base, onOpen(photoId) }; see PhotosPage.
 */
function MasonryLayout({ groups, base, onOpen }) {
  const count = useColumnCount();

  return (
    <div className="flex flex-col gap-12">
      {groups.map((group) => {
        const key = group.trip?.id ?? "other";
        const n = group.photos.length;
        return (
          <section key={key} aria-labelledby={`trip-${key}`}>
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 mb-4">
              <h2 id={`trip-${key}`} className="text-2xl font-bold">
                {group.trip?.name ?? "Other"}
              </h2>
              <p className="text-sm text-ink/55">
                {group.trip && `${formatTripDates(group.trip)} · `}
                {n} {n === 1 ? "photo" : "photos"}
              </p>
            </header>
            <div className="flex items-start gap-3">
              {intoColumns(group.photos, count).map((col, i) => (
                <div key={i} className="flex flex-1 min-w-0 flex-col gap-3">
                  {col.photos.map((photo) => (
                    <PhotoFrame key={photo.id} photo={photo} base={base} onOpen={() => onOpen(photo.id)} />
                  ))}
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
