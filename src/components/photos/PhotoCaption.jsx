import React, { useState } from "react";

const textCls =
  "text-white leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_0_10px_rgba(0,0,0,0.45)]";
const sizeCls = {
  sm: "bottom-[6%] text-[0.8rem] sm:text-sm",
  lg: "bottom-[5%] text-base sm:text-lg",
};

/**
 * A movie-style subtitle inside a photo frame. Japanese comes first; the English
 * translation fades in on hover (mouse) or on tap (phones). Put it inside an
 * element with the `group` class, so hovering the photo shows the English too.
 */
function PhotoCaption({ caption, size = "sm" }) {
  const [showEn, setShowEn] = useState(false);
  const place = `absolute inset-x-0 mx-auto w-fit max-w-[92%] px-2 py-1 text-center ${sizeCls[size]} ${textCls}`;

  // English only: nothing to toggle, and taps fall through to the photo.
  if (!caption.ja) {
    return <p className={`${place} m-0 pointer-events-none`}>{caption.en}</p>;
  }
  if (!caption.en) {
    return <p lang="ja" className={`${place} m-0 font-jp pointer-events-none`}>{caption.ja}</p>;
  }

  const line = "[grid-area:1/1] transition-opacity duration-300";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setShowEn((v) => !v);
      }}
      aria-pressed={showEn}
      className={`${place} grid cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
    >
      <span lang="ja" className={`${line} font-jp ${showEn ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}>
        {caption.ja}
      </span>
      <span lang="en" className={`${line} ${showEn ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {caption.en}
      </span>
    </button>
  );
}

export default PhotoCaption;
