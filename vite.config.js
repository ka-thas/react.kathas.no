import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [
    // Only .mdx: blog/content/*.md are Quartz notes, imported as ?raw text by src/lib/posts.js.
    { enforce: 'pre', ...mdx({ include: /\.mdx$/, remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
    react(),
    tailwindcss(),
  ],
})
