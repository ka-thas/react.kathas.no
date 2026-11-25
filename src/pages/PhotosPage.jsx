import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import Footer from "../components/Footer";
import MasonryLayout from "../components/photos/MasonryLayout";
import PhotoLightbox from "../components/photos/PhotoLightbox";
import { usePhotoManifest } from "../lib/usePhotoManifest";
import { formatLocalDay } from "../lib/photos";

// Swap the gallery layout here. Each one takes { groups, base, onOpen(photoId) }.
const layouts = { masonry: MasonryLayout };
const Layout = layouts.masonry;

// Noto Sans JP for the captions, only loaded once this page is visited.
const JP_FONT = "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap";
if (!document.querySelector(`link[href="${JP_FONT}"]`)) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = JP_FONT;
  document.head.append(link);
}

const pillBtn =
  "rounded-lg border border-accent-green/35 bg-accent-green/10 px-4 py-1.5 font-medium text-accent-green hover:bg-accent-green/15";

function PhotosPage() {
  const { status, groups, updated, base, retry } = usePhotoManifest();
  const [openId, setOpenId] = useState(null);

  // Every photo in page order, so the lightbox can step across trips.
  const items = useMemo(
    () => groups.flatMap((g) => g.photos.map((photo) => ({ photo, trip: g.trip }))),
    [groups],
  );
  const openIndex = items.findIndex((item) => item.photo.id === openId);

  const close = useCallback(() => setOpenId(null), []);
  const step = useCallback(
    (delta) =>
      setOpenId((id) => {
        const i = items.findIndex((item) => item.photo.id === id);
        return items[(i + delta + items.length) % items.length].photo.id;
      }),
    [items],
  );

  return (
    <>
      <main className="max-w-[1000px] mx-auto px-4 w-full pb-12">
        <h1 className="font-bold text-5xl mt-5 mb-4">Photosynthesis</h1>
        <p className="max-w-[620px] mb-10">
          Moments from my life in Japan. Captured with Kodak Charmera.
        </p>

        {status === "loading" && (
          <div aria-busy="true" className="grid grid-cols-2 min-[681px]:grid-cols-3 gap-3">
            <span className="sr-only">Loading photos</span>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="aspect-[4/3] rounded-[0.6rem] bg-accent-green/10 animate-pulse" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="flex flex-col items-start gap-3">
            <p>The photos didn't load this time. Maybe the film is still developing.</p>
            <button type="button" onClick={retry} className={pillBtn}>
              Try again
            </button>
          </div>
        )}

        {status === "ready" && groups.length === 0 && (
          <p className="opacity-60">No photos here yet. Check back soon 🌱</p>
        )}

        {status === "ready" && groups.length > 0 && (
          <>
            <Layout groups={groups} base={base} onOpen={setOpenId} />
            {updated && (
              <p className="mt-12 text-sm text-black/45">Last updated {formatLocalDay(updated)}</p>
            )}
          </>
        )}
      </main>
      <Footer />

      {openIndex !== -1 && (
        <PhotoLightbox items={items} index={openIndex} base={base} onClose={close} onStep={step} />
      )}
    </>
  );
}

export default PhotosPage;
