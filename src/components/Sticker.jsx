import React from "react";
import { Link } from "react-router-dom";

/**
 * A playful die-cut sticker that doubles as a navigation button.
 * Renders the image bare (no card) so the sticker's own outline shows; it
 * tilts at rest, gently floats, and grows on hover. `label` is used for the
 * accessible name, and shown as a visible caption when `showLabel` is set.
 */
function Sticker({
    to,
    img,
    label,
    rotate = 0,
    floatDur = 4,
    className = "",
    title,
    external = false,
    showLabel = false,
}) {
    const inner = (
        <>
            <img
                src={img}
                alt=""
                aria-hidden="true"
                draggable="false"
                className="sticker-img"
            />
            {showLabel && <span className="sticker-label">{label}</span>}
        </>
    );

    const style = {
        "--rot": `${rotate}deg`,
        "--float-dur": `${floatDur}s`,
    };

    if (external) {
        return (
            <a
                href={to}
                target="_blank"
                rel="noreferrer"
                title={title || label}
                aria-label={title || label}
                className={`sticker-btn ${className}`}
                style={style}
            >
                {inner}
            </a>
        );
    }

    return (
        <Link
            to={to}
            title={title || label}
            aria-label={title || label}
            className={`sticker-btn ${className}`}
            style={style}
        >
            {inner}
        </Link>
    );
}

export default Sticker;
