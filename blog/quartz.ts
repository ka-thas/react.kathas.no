// Quartz v5 entry, copied over the default by build.sh. Everything is configured
// in quartz.config.yaml except our own kathas.no navbar, which isn't a plugin:
// it's a local component (blog/components/SiteNav.tsx, copied into
// .quartz/quartz/components/) placed in the header slot here.
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import SiteNav from "./quartz/components/SiteNav"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  defaults: {
    header: [SiteNav()],
  },
})
