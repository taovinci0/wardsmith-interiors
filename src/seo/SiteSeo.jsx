import { Helmet } from 'react-helmet-async'
import { useLocation, useParams } from 'react-router-dom'
import { getBlogPostBySlug, getCaseStudyBySlug, getServiceBySlug } from '../data/innerPagesContent.js'
import { formatDocumentTitle, resolveSeoPathname, siteName } from './seoConfig.js'

/**
 * Central route-aware meta tags. Dynamic segments resolve titles from static seeds until Sanity drives each page.
 */
export function SiteSeo() {
  const { pathname } = useLocation()
  const params = useParams()
  const origin = typeof globalThis !== 'undefined' && globalThis.location?.origin ? globalThis.location.origin : ''

  const base = resolveSeoPathname(pathname)
  let pageTitle = base.title
  let description = base.description

  if (pathname.startsWith('/services/') && params.slug) {
    const s = getServiceBySlug(params.slug)
    if (s?.title) pageTitle = s.title
  } else if (pathname.startsWith('/case-studies/') && params.slug) {
    const c = getCaseStudyBySlug(params.slug)
    if (c?.title) pageTitle = c.title
  } else if (pathname.startsWith('/blog/') && params.slug) {
    const p = getBlogPostBySlug(params.slug)
    if (p?.title) pageTitle = p.title
    if (p?.excerpt) description = p.excerpt
  }

  const documentTitle = formatDocumentTitle(pageTitle)

  return (
    <Helmet htmlAttributes={{ lang: 'en-GB' }} prioritizeSeoTags>
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={documentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={documentTitle} />
      <meta name="twitter:description" content={description} />
      {origin ? <link rel="canonical" href={`${origin}${pathname}`} /> : null}
    </Helmet>
  )
}

/** Visible in dev when VITE_SANITY_PROJECT_ID is set — confirms env wiring. */
export function SanityDevBadge() {
  const configured = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID)
  if (!import.meta.env.DEV || !configured) return null

  return (
    <div
      className="pointer-events-none fixed bottom-2 left-2 z-[9999] rounded bg-primary px-2 py-1 font-sans text-[10px] text-white opacity-80"
      role="status"
    >
      Sanity env: {siteName}
    </div>
  )
}
