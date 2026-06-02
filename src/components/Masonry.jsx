import React from "react";
import { portraitImages } from "../assets/portraitImages";
import "../styles/masonry.css";

/**
 * Masonry photo wall. Defaults to the same photos used by the Portrait slot, so
 * the home/social shuffle and this gallery stay in sync from one source.
 * Images lazy-load as you scroll — the full set is never fetched upfront.
 */
function Masonry({ images = portraitImages }) {
    return (
        <div className="masonry">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`Ka Thas, photo ${i + 1}`}
                    loading="lazy"
                    className="masonry-img"
                />
            ))}
        </div>
    );
}

export default Masonry;
