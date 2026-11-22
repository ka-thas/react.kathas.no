import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkWikiLink from "remark-wiki-link";
import remarkMdxImages from "remark-mdx-images";

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

export default defineConfig({
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
  ],
});
