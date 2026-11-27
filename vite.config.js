import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkWikiLink from "remark-wiki-link";
import remarkMdxImages from "remark-mdx-images";
import { pagePreviews } from "./scripts/page-previews.mjs";

const mdxPlugin = mdx({
  remarkPlugins: [
    remarkFrontmatter,
    remarkMdxFrontmatter,
    [
      remarkWikiLink,
      {
        pageResolver: (name) => [name], // keep the file name as is
        hrefTemplate: (name) => `/blog/${name}`, // match BlogPostPage's route
        aliasDivider: "|",
      },
    ],
    remarkMdxImages,
  ],
});

// In dev, /photos-bucket/* is passed through to the R2 photo bucket, so the
// gallery works on any localhost port without listing each one in R2's CORS.
const photosBucket = (
  process.env.VITE_PHOTOS_BASE_URL ?? loadEnv("development", process.cwd(), "VITE_").VITE_PHOTOS_BASE_URL ?? ""
).trim().replace(/\/+$/, "");

export default defineConfig({
  server: photosBucket
    ? {
        proxy: {
          "/photos-bucket": {
            target: photosBucket,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/photos-bucket/, ""),
          },
        },
      }
    : {},
  plugins: [
    {
      ...mdxPlugin,
      enforce: "pre",
      // `?raw` imports (search.js) should stay plain text, not be compiled as MDX.
      transform(code, id) {
        return id.includes("?raw")
          ? null
          : mdxPlugin.transform.call(this, code, id);
      },
    },
    react(),
    tailwindcss(),
    pagePreviews(), // per-page link previews in dist/, see the script
  ],
});
