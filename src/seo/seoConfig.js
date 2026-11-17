import { matchPath } from 'react-router-dom'
import { siteName } from '../data/siteDefaults.js'

const DEFAULT_DESC =
  'Bespoke fitted furniture and interiors across Essex — kitchens, bedrooms, home offices, and tailored joinery from Ward-Smith Interiors.'

/** Static defaults; extend with CMS-driven `siteSettings` in `SiteSeo.jsx` later. */
const ROUTES = [
  { path: '/', title: 'Bespoke Fitted Furniture in Essex', description: DEFAULT_DESC },
  { path: '/kitchens', title: 'Bespoke Kitchens in Essex', description: 'Kitchens designed, made and installed by Ward-Smith Interiors — from first sketch to fitting, all by our own Essex workshop.' },
  { path: '/living-spaces', title: 'Living Spaces', description: 'Bespoke fitted furniture for bedrooms, home offices, media walls and tailored spaces across Essex.' },
  { path: '/our-approach', title: 'Our Approach', description: 'How a Ward-Smith project runs — design, making, installation and aftercare, step by step.' },
  { path: '/projects', title: 'Projects', description: 'Recent bespoke kitchens and fitted furniture projects across Essex.' },
  { path: '/projects/:slug', title: 'Project', description: DEFAULT_DESC },
  { path: '/journal', title: 'Journal', description: 'Notes from the workshop — ideas, materials and inspiration from Ward-Smith Interiors.' },
  { path: '/journal/:slug', title: 'Article', description: DEFAULT_DESC },
  { path: '/about-us', title: 'About Us', description: 'Meet the Ward-Smith team and our approach to bespoke joinery in Essex.' },
  { path: '/contact', title: 'Contact', description: 'Get in touch with Ward-Smith Interiors — phone, email, and enquiry.' },
  { path: '/faqs', title: 'FAQs', description: 'Answers to common questions about bespoke furniture, lead times, and our process.' },
  { path: '/privacy-policy', title: 'Privacy Policy', description: 'How Ward-Smith Interiors handles your personal data.' },
  { path: '/terms-of-business', title: 'Terms of Business', description: 'Terms of business for Ward-Smith Interiors Ltd projects.' },
]

export function resolveSeoPathname(pathname) {
  for (const def of ROUTES) {
    const m = matchPath({ path: def.path, end: true }, pathname)
    if (m) {
      return { title: def.title, description: def.description }
    }
  }
  return {
    title: 'Page not found',
    description: DEFAULT_DESC,
  }
}

export function formatDocumentTitle(pageTitle) {
  if (!pageTitle || pageTitle === siteName) return siteName
  return `${pageTitle} | ${siteName}`
}

export { DEFAULT_DESC, siteName }
