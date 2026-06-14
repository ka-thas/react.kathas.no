import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { portraitImages } from "../assets/portraitImages";

/**
 * Portrait slot for the home page. Cross-fades between the photos listed in
 * src/assets/portraitImages.js every `interval` ms. Falls back to a labeled
 * placeholder when no photos have been added yet.
 *
 * Images load lazily: only the photos the slideshow has reached (plus the next
 * one, prefetched a cycle ahead) are ever rendered, so the initial page load
 * fetches one image instead of the whole set.
 *
 * `className`, when given, replaces the default square treatment for the slot
 * (the social page passes a circular variant). Leave it empty for the home
 * page's rounded square.
 */
function Portrait({ interval = 4000, className = "", to }) {
    const images = portraitImages;
    const [index, setIndex] = useState(0);
    // Indices we've mounted an <img> for. Starts with the first photo and the
    // next one; grows by one each cycle so we never download all photos upfront.
    const [mounted, setMounted] = useState(() =>
        new Set(images.length > 1 ? [0, 1] : [0]),
    );

    useEffect(() => {
        if (images.length <= 1) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const id = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, interval);
        return () => clearInterval(id);
    }, [images.length, interval]);

    // Mount the upcoming photo one cycle early so it's downloaded (at opacity 0)
    // before we fade to it — avoids a blank flash on the transition.
    useEffect(() => {
        if (images.length <= 1) return;
        const next = (index + 1) % images.length;
        setMounted((prev) =>
            prev.has(next) ? prev : new Set(prev).add(next),
        );
    }, [index, images.length]);

    const slotBase = "relative overflow-hidden shrink-0 bg-[#14241c]";
    const slotShape =
        className ||
        "w-full aspect-square rounded-none sm:w-44 sm:h-44 sm:aspect-auto sm:rounded-[1.4rem] sm:shadow-[0_6px_16px_rgba(0,0,0,0.28)]";

    const content =
        images.length === 0 ? (
            <div
                className={`${slotBase} w-44 h-44 rounded-[1.4rem] flex items-center justify-center text-center p-3 border border-dashed border-white/35 ${className}`}
            >
                <span className="text-[0.72rem] leading-[1.35] text-white/55">
                    add a photo in
                    <br />
                    src/assets/portraitImages.js
                </span>
            </div>
        ) : (
            <div className={`${slotBase} ${slotShape}`}>
                {images.map((src, i) =>
                    mounted.has(i) ? (
                        <img
                            key={i}
                            src={src}
                            alt="Ka Thas"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out will-change-[opacity] motion-reduce:transition-none"
                            style={{ opacity: i === index ? 1 : 0 }}
                        />
                    ) : null,
                )}
            </div>
        );

    if (to) {
        return (
            <Link
                to={to}
                className="block w-screen relative left-1/2 -translate-x-1/2 sm:w-auto sm:left-auto sm:translate-x-0 sm:inline-block leading-none cursor-pointer transition-transform duration-200 sm:hover:scale-[1.04]"
                aria-label="See more photos"
            >
                {content}
            </Link>
        );
    }

    return content;
}

export default Portrait;
