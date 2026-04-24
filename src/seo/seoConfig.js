import { matchPath } from 'react-router-dom'
import { siteName } from '../data/siteDefaults.js'

const DEFAULT_DESC =
  'Bespoke fitted furniture and interiors across Essex — kitchens, bedrooms, home offices, and tailored joinery from Ward-Smith Interiors.'

/** Static defaults; extend with CMS-driven `siteSettings` in `SiteSeo.jsx` later. */
const ROUTES = [
  { path: '/', title: 'Bespoke Fitted Furniture in Essex', description: DEFAULT_DESC },
  { path: '/about-us', title: 'About Us', description: 'Meet the Ward-Smith team and our approach to bespoke joinery in Essex.' },
  { path: '/contact', title: 'Contact', description: 'Get in touch with Ward-Smith Interiors — phone, email, and enquiry.' },
  { path: '/faqs', title: 'FAQs', description: 'Answers to common questions about bespoke furniture, lead times, and our process.' },
  { path: '/start-your-project', title: 'Start Your Project', description: 'Tell us about your space and begin your bespoke furniture project.' },
  { path: '/privacy-policy', title: 'Privacy Policy', description: 'How Ward-Smith Interiors handles your personal data.' },
  { path: '/terms-of-business', title: 'Terms of Business', description: 'Terms of business for Ward-Smith Interiors Ltd projects.' },
  { path: '/services', title: 'Services', description: 'Bespoke kitchens, bedrooms, home offices, media walls, and carpentry across Essex.' },
  { path: '/services/:slug', title: 'Service', description: DEFAULT_DESC },
  { path: '/case-studies', title: 'Case Studies', description: 'Recent bespoke interior projects across Essex.' },
  { path: '/case-studies/:slug', title: 'Case Study', description: DEFAULT_DESC },
  { path: '/blog', title: 'Blog', description: 'News, ideas, and inspiration from Ward-Smith Interiors.' },
  { path: '/blog/:slug', title: 'Article', description: DEFAULT_DESC },
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
