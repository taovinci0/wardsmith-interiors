import { Outlet } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'
import { SiteHeader } from '../components/layout/SiteHeader.jsx'
import { ScrollToTopOnRouteChange } from '../components/common/ScrollToTopOnRouteChange.jsx'
import { useBodyPageClass } from '../hooks/useBodyPageClass.js'
import { SanityDevBadge, SiteSeo } from '../seo/SiteSeo.jsx'

export function SiteLayout() {
  useBodyPageClass()

  return (
    <div id="smooth-wrapper">
      <SiteSeo />
      <ScrollToTopOnRouteChange />
      <SanityDevBadge />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[10000] -translate-y-[200%] rounded bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-transform focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to main content
      </a>
      <SiteHeader />

      <div id="smooth-content">
        <div id="page" className="site">
          <main id="main" className="site-main" tabIndex={-1}>
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
