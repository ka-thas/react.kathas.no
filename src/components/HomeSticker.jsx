import React from "react";
import { useLocation } from "react-router-dom";
import Sticker from "./Sticker";
import { stickerImages } from "../assets/stickerImages";

/**
 * Small home sticker fixed to the corner of every page except the home page,
 * so explorers always have a way back without a navbar.
 */
function HomeSticker() {
    const location = useLocation();
    if (location.pathname === "/") return null;

    return (
        <Sticker
            to="/"
            img={stickerImages.home}
            label="home"
            rotate={-6}
            floatDur={5}
            className="sticker-home sticker-sm"
        />
    );
}

export default HomeSticker;
