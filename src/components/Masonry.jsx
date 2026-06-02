import React from "react";
import { portraitImages } from "../assets/portraitImages";

/**
 * Masonry photo wall. Defaults to the same photos used by the Portrait slot, so
 * the home/social shuffle and this gallery stay in sync from one source.
 * Images lazy-load as you scroll — the full set is never fetched upfront.
 */
function Masonry({ images = portraitImages }) {
    return (
        <div className="columns-2 min-[681px]:columns-3 gap-3 my-6">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`Ka Thas, photo ${i + 1}`}
                    loading="lazy"
                    className="w-full block mb-3 rounded-[0.6rem] break-inside-avoid shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                />
            ))}
        </div>
    );
}

export default Masonry;
