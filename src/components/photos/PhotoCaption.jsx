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
 * Line breaks in the text are kept.
 */
function PhotoCaption({ caption, size = "sm" }) {
  const [showEn, setShowEn] = useState(false);
  const place = `absolute inset-x-0 mx-auto w-fit max-w-[92%] px-2 py-1 text-center whitespace-pre-line ${sizeCls[size]} ${textCls}`;

  // English only: nothing to toggle, and taps fall through to the photo.
  if (!caption.ja) {
    return <p className={`${place} m-0 pointer-events-none`}>{caption.en}</p>;
  }
  if (!caption.en) {
    return <p lang="ja" className={`${place} m-0 font-jp pointer-events-none`}>{caption.ja}</p>;
  }

  // A tap switches the language on phones. With a mouse, hovering already shows the
  // English, so clicks pass through to the photo (the grid opens it) instead.
  // Screen readers get the shown language only, plus what pressing does.
  const line = "[grid-area:1/1] transition-opacity duration-300";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setShowEn((v) => !v);
      }}
      className={`${place} grid cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 [@media(hover:hover)]:pointer-events-none`}
    >
      <span lang="ja" aria-hidden={showEn} className={`${line} font-jp ${showEn ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}>
        {caption.ja}
      </span>
      <span lang="en" aria-hidden={!showEn} className={`${line} ${showEn ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {caption.en}
      </span>
      <span className="sr-only">{showEn ? " (show in Japanese)" : " (show in English)"}</span>
    </button>
  );
}

export default PhotoCaption;
