import React from "react";
import { formatTripDates } from "../../lib/photos";

/** One trip's heading (name, dates, photo count) above its photos. Shared by the layouts. */
function TripSection({ group, children }) {
  const key = group.trip?.id ?? "other";
  const n = group.photos.length;
  return (
    <section aria-labelledby={`trip-${key}`}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 mb-4">
        <h2 id={`trip-${key}`} className="text-2xl font-bold">
          {group.trip?.name ?? "Other"}
        </h2>
        <p className="text-sm text-ink/55">
          {group.trip && `${formatTripDates(group.trip)} · `}
          {n} {n === 1 ? "photo" : "photos"}
        </p>
      </header>
      {children}
    </section>
  );
}

export default TripSection;
