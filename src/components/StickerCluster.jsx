import React from "react";
import Sticker from "./Sticker";
import { stickerImages } from "../assets/stickerImages";

/**
 * Loose cluster of navigation stickers shown on the home page.
 * No labels say "menu" — visitors discover the pages by poking the stickers.
 */
const destinations = [
    { to: "/projects", img: stickerImages.projects, label: "projects", rotate: -7, floatDur: 4.2, nudge: 0 },
    { to: "/cv", img: stickerImages.cv, label: "cv", rotate: 5, floatDur: 5.1, nudge: 36 },
    { to: "/blog", img: stickerImages.blog, label: "blog", rotate: -4, floatDur: 3.8, nudge: 12 },
    { to: "/social", img: stickerImages.social, label: "socials", rotate: 8, floatDur: 4.6, nudge: 44 },
];

function StickerCluster() {
    return (
        <div className="w-full flex flex-wrap items-start justify-center gap-x-8 gap-y-6 py-8">
            {destinations.map((d) => (
                <div key={d.to} style={{ marginTop: `${d.nudge}px` }}>
                    <Sticker
                        to={d.to}
                        img={d.img}
                        label={d.label}
                        rotate={d.rotate}
                        floatDur={d.floatDur}
                    />
                </div>
            ))}
        </div>
    );
}

export default StickerCluster;
