import React, { useEffect, useState } from "react";
import { portraitImages } from "../assets/portraitImages";
import "../styles/portrait.css";

/**
 * Portrait slot for the home page. Cross-fades between the photos listed in
 * src/assets/portraitImages.js every `interval` ms. Falls back to a labeled
 * placeholder when no photos have been added yet.
 *
 * Images load lazily: only the photos the slideshow has reached (plus the next
 * one, prefetched a cycle ahead) are ever rendered, so the initial page load
 * fetches one image instead of the whole set.
 */
function Portrait({ interval = 4000, className = "" }) {
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

    if (images.length === 0) {
        return (
            <div className={`portrait-slot portrait-empty ${className}`}>
                <span>
                    add a photo in
                    <br />
                    src/assets/portraitImages.js
                </span>
            </div>
        );
    }

    return (
        <div className={`portrait-slot ${className}`}>
            {images.map((src, i) =>
                mounted.has(i) ? (
                    <img
                        key={i}
                        src={src}
                        alt="Ka Thas"
                        className="portrait-img"
                        style={{ opacity: i === index ? 1 : 0 }}
                    />
                ) : null,
            )}
        </div>
    );
}

export default Portrait;
