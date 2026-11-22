import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkWikiLink from "remark-wiki-link";
import remarkMdxImages from 'remark-mdx-images'

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
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
      }),
    },
    react(),
    tailwindcss(),
  ],
});
