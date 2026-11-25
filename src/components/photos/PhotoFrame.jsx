import React from "react";
import PhotoCaption from "./PhotoCaption";
import { photoAlt, photoUrl } from "../../lib/photos";

/**
 * One thumbnail in the gallery. Its width and height from the manifest reserve
 * the space up front, so the layout doesn't jump while images load.
 */
function PhotoFrame({ photo, base, onOpen, className = "" }) {
  return (
    <figure
      className={`group relative m-0 overflow-hidden rounded-[0.6rem] bg-accent-green/10 shadow-[0_4px_12px_rgba(0,0,0,0.18)] ${className}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-green"
      >
        <img
          src={photoUrl(base, photo.thumb)}
          alt={photoAlt(photo)}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>
      {photo.caption && <PhotoCaption caption={photo.caption} />}
    </figure>
  );
}

export default PhotoFrame;
