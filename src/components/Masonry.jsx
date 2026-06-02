import React, { useEffect, useState, useCallback } from "react";
import { portraitImages } from "../assets/portraitImages";

/**
 * Masonry photo wall with a built-in lightbox. Defaults to the same photos used
 * by the Portrait slot, so the home/social shuffle and this gallery stay in sync
 * from one source. Images lazy-load as you scroll — the full set is never
 * fetched upfront. Click a photo to open it full-size; navigate with the arrow
 * keys (or on-screen buttons) and close with Escape or a backdrop click.
 */
function Masonry({ images = portraitImages }) {
    // null = closed; otherwise the index of the open photo.
    const [active, setActive] = useState(null);
    const isOpen = active !== null;

    const close = useCallback(() => setActive(null), []);
    const prev = useCallback(
        () => setActive((i) => (i + images.length - 1) % images.length),
        [images.length]
    );
    const next = useCallback(
        () => setActive((i) => (i + 1) % images.length),
        [images.length]
    );

    // Keyboard navigation + lock body scroll while the lightbox is open.
    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e) => {
            if (e.key === "Escape") close();
            else if (e.key === "ArrowLeft") prev();
            else if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, close, prev, next]);

    return (
        <>
            <div className="columns-2 min-[681px]:columns-3 gap-3 my-6">
                {images.map((src, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Open photo ${i + 1} of ${images.length}`}
                        className="block w-full mb-3 break-inside-avoid rounded-[0.6rem] overflow-hidden transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                        <img
                            src={src}
                            alt={`Ka Thas, photo ${i + 1}`}
                            loading="lazy"
                            className="w-full block rounded-[0.6rem] shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                        />
                    </button>
                ))}
            </div>

            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo viewer"
                    onClick={close}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-[fadeIn_150ms_ease-out]"
                >
                    <img
                        src={images[active]}
                        alt={`Ka Thas, photo ${active + 1}`}
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[90vh] max-w-[92vw] object-contain rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                    />

                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close"
                        className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full bg-white/10 text-white text-2xl leading-none hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                        ×
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); prev(); }}
                                aria-label="Previous photo"
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white text-3xl leading-none hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); next(); }}
                                aria-label="Next photo"
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white text-3xl leading-none hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            >
                                ›
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-sm tabular-nums">
                                {active + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Masonry;
