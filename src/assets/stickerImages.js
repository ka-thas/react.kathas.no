// Which sticker each nav button uses (StickerCluster, HomeSticker). Any sticker
// from the wall works here: use its file name, see lib/stickers.js.
import { stickerByName } from "../lib/stickers";

const nav = {
  projects: "barn-leker",
  blog: "latte",
  social: "eskil-cone-head",
  photos: "charmera",
  cv: "tiger-painting",
  home: "club-penguin",
};

export const stickerImages = Object.fromEntries(
  Object.entries(nav).map(([page, name]) => [page, stickerByName[name].src])
);
