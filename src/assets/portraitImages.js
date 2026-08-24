// Photos of Ka for the home-page portrait slot.
//
// To add more: drop webp images into src/assets/images/me/ (convert with
// `magick input.HEIC -auto-orient -resize 1000x1000 -quality 72 out.webp`),
// then import and add them to the array below.
//
// Each entry is { src, caption }. `caption` is optional — omit it (or leave
// it undefined) for photos that don't need one. Captions show up in the
// Masonry photo wall's lightbox, not in the small home-page portrait slot.
//
// 0 images  -> a labeled placeholder slot is shown.
// 1 image   -> static photo.
// 2+ images -> they cross-fade (dissolve) on a timer.

import me00 from "./images/me/img_0386-2.webp";
import me01 from "./images/me/img_0899.webp";
import me02 from "./images/me/img_1064.webp";
import me03 from "./images/me/img_1301.webp";
import me04 from "./images/me/img_1307.webp";
import me05 from "./images/me/img_1494.webp";
import me06 from "./images/me/img_1504.webp";
import me07 from "./images/me/img_1698.webp";
import me09 from "./images/me/img_1788.webp";
import me10 from "./images/me/img_1857.webp";
import me11 from "./images/me/img_1977.webp";
import me12 from "./images/me/img_1981.webp";
import me13 from "./images/me/img_1998.webp";
import me14 from "./images/me/img_3760-2.webp";
import me15 from "./images/me/img_6376.webp";
import me16 from "./images/me/img_6533.webp";
import me17 from "./images/me/img_7070.webp";
import me18 from "./images/me/img_7103.webp";
import me19 from "./images/me/img_8292.webp";
import me20 from "./images/me/img_9369.webp";

export const portraitImages = [
  { src: me11 },
  { src: me00, caption: "Gangnam, Seoul" },
  { src: me01, caption: "Osaka Castle" },
  { src: me02, caption: "Miyajima Island, JP" },
  { src: me03 },
  { src: me04 },
  { src: me05, caption: "Amsterdam" },
  { src: me06, caption: "Leiden" },
  { src: me07, caption: "Leiden" },
  { src: me09},
  { src: me10, caption: "Samf, Trondheim" },
  { src: me12},
  { src: me13, caption: "Trondheim" },
  { src: me14, caption: "Botanisk Hage" },
  { src: me15, caption: "Copenhagen" },
  { src: me16, caption: "Science Museum, London" },
  { src: me17, caption: "Jajce, Bosnia" },
  { src: me18, caption: "Jajce, Bosnia" },
  { src: me19, caption: "Fadder" },
  { src: me20, caption: "Halloween 2023" },
];
