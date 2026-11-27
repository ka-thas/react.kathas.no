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
      className={`absolute inset-x-0 mx-auto m-0 max-w-[92%] text-center whitespace-pre-line font-caption pointer-events-none text-white leading-[1.75] ${sizeCls[size]}`}
    >
      {/* Old movie subtitles: a black box behind each line. */}
      <span className="bg-black/85 px-1.5 py-0.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
        {caption}
      </span>
    </p>
  );
}

export default PhotoCaption;
