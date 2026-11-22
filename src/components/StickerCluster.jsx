import React from "react";
import Sticker from "./Sticker";
import { stickerImages } from "../assets/stickerImages";

/**
 * Loose cluster of navigation stickers shown on the home page.
 * Each sticker shows a caption naming the page it links to.
 */
const destinations = [
    { to: "/projects", img: stickerImages.projects, label: "projects", rotate: -7, nudge: 0 },
    { to: "/cv", img: stickerImages.cv, label: "cv", rotate: 5, nudge: 36 },
    { to: "/blog/", img: stickerImages.blog, label: "blog", rotate: -4, nudge: 12 },
    { to: "/social", img: stickerImages.social, label: "socials", rotate: 8, nudge: 44 },
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
                        showLabel
                    />
                </div>
            ))}
        </div>
    );
}

export default StickerCluster;
