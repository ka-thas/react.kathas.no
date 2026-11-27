import React from "react";

const sizeCls = {
  sm: "bottom-[6%] text-[0.8rem] sm:text-sm",
  lg: "bottom-[5%] text-base sm:text-lg",
};

/**
 * A movie-style subtitle inside a photo frame. Line breaks in the text are kept,
 * and taps and clicks go through to the photo.
 */
function PhotoCaption({ caption, size = "sm" }) {
  return (
    <p
      className={`absolute inset-x-0 mx-auto m-0 w-fit max-w-[92%] px-2 py-1 text-center whitespace-pre-line font-caption pointer-events-none text-white leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_0_10px_rgba(0,0,0,0.45)] ${sizeCls[size]}`}
    >
      {caption}
    </p>
  );
}

export default PhotoCaption;
