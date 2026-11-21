// Quartz v5 entry, copied over the default by build.sh. Most settings live in
// quartz.config.yaml. This file adds what YAML can't express:
//  - the kathas.no navbar (blog/components/SiteNav.tsx, a local component) in the header
//  - the left pane, laid out like jzhao.xyz: title with a search icon, then "Selected Writing"
//    (posts with `featured: true`) and "Recent Notes" (newest posts). Both need
//    filter functions, which is why the slot is built here. On phones the two
//    lists move below the post.
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as Component from "./quartz/components"
import type { QuartzComponentProps } from "./quartz/components/types"
import { PageTitle } from "@quartz-community/page-title"
import { Search } from "@quartz-community/search"
import { RecentNotes } from "@quartz-community/recent-notes"
import SiteNav from "./quartz/components/SiteNav"

type FileData = QuartzComponentProps["fileData"]

// Real posts only: not the landing page or the All posts base.
const isPost = (f: FileData) => !["index", "all-posts.base"].includes(f.slug ?? "")
const allPosts = "all-posts.base" // blog/content/All posts.base (Bases keep .base in the slug)

const lists = () => [
  RecentNotes({
    title: "Selected Writing",
    limit: 4,
    showTags: false,
    linkToMore: allPosts,
    hideTagPages: true,
    hideFolderPages: true,
    filter: (f: FileData) => isPost(f) && f.frontmatter?.featured === true,
  }),
  RecentNotes({
    title: "Recent Notes",
    limit: 3,
    showTags: false,
    linkToMore: allPosts,
    hideTagPages: true,
    hideFolderPages: true,
    filter: isPost,
  }),
]

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  defaults: {
    // KATHAS_NAV=off (set by build.sh's caller, e.g. blog/vercel.json for root.kathas.no)
    // builds the blog as a standalone site without the kathas.no navbar.
    header: process.env.KATHAS_NAV === "off" ? [] : [SiteNav()],
    left: [
      // Title with just the search icon to its right (styled icon-only in custom.scss).
      Component.Flex({
        components: [{ Component: PageTitle() }, { Component: Search() }],
        gap: "0.5rem",
      }),
      ...lists().map((c) => Component.DesktopOnly(c)),
    ],
    afterBody: lists().map((c) => Component.MobileOnly(c)),
  },
})
