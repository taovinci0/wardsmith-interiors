/**
 * Build-time sitemap: core routes plus live journal/project slugs from Sanity.
 * Runs after `vite build`; writes dist/sitemap.xml. Fails soft (static routes
 * only) if Sanity is unreachable so a CMS blip can never break the build.
 */
import { writeFileSync } from 'node:fs'

const ORIGIN = 'https://wardsmithinteriors.co.uk'
const PROJECT = process.env.VITE_SANITY_PROJECT_ID || '9ryg64p4'
const DATASET = process.env.VITE_SANITY_DATASET || 'production'

const STATIC_ROUTES = [
  '/',
  '/kitchens',
  '/living-spaces',
  '/our-approach',
  '/projects',
  '/journal',
  '/about-us',
  '/contact',
  '/faqs',
  '/privacy-policy',
  '/terms-of-business',
]

const query = encodeURIComponent(
  '{"posts":*[_type=="blogPost" && defined(slug.current)].slug.current,"projects":*[_type=="caseStudy" && defined(slug.current) && defined(coalesce(image.asset, imageUrl)) && defined(projectOverview)].slug.current}',
)

let posts = []
let projects = []
try {
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
  )
  const json = await res.json()
  posts = json.result?.posts || []
  projects = json.result?.projects || []
} catch (err) {
  console.warn('[sitemap] Sanity unreachable, static routes only:', err.message)
}

const urls = [
  ...STATIC_ROUTES,
  ...projects.map((s) => `/projects/${s}`),
  ...posts.map((s) => `/journal/${s}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc></url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../dist/sitemap.xml', import.meta.url), xml)
console.log(`[sitemap] wrote dist/sitemap.xml with ${urls.length} URLs`)
