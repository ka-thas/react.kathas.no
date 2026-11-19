// Evolutionary-algorithm slides, shared with the Quartz blog: the files live in
// the Obsidian vault (blog/content/attachments/ea-images/), keyed here by number.
const modules = import.meta.glob("../../blog/content/attachments/ea-images/*.webp", {
  eager: true,
  import: "default",
});

const eaImages = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [Number(path.match(/(\d+)\.webp$/)[1]), url])
);

export default eaImages;
