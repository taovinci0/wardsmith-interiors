/** Default content mirroring WP theme fallbacks (footer.php + hero.php) until Sanity is wired. */

import { wpMediaUrl } from '../lib/wpAssetBase.js'
import { servicesList } from './homePageContent.js'

export const siteName = 'Ward-Smith Interiors'

/** Custom logo (theme `custom_logo` → uploads) — SVG, inverted to white in header via CSS */
export const siteLogoUrl = wpMediaUrl('/wp-content/uploads/2025/12/wardsmith.svg')

export const footerDefaults = {
  description:
    'Ward-Smith Interiors creates bespoke, handcrafted furniture for homes across Essex. Designed for living, built for life.',
  instagramUrl: '#',
  facebookUrl: '#',
  address: 'Wicks Manor, Witham Rd, Tolleshunt Major, Maldon CM9 8JU',
  phone: '07481 342 382',
  email: 'hello@wardsmithinteriors.co.uk',
}

/** Kitchens first, then others — matches mega menu walker ordering. */
export const serviceCards = servicesList.map((s) => ({
  title: s.title,
  slug: s.slug,
  imageUrl: s.imageUrl,
}))

/** v2 nav — kitchens first (design brief S1/V6): five links + one enquiry button. */
export const primaryNav = [
  { label: 'Kitchens', to: '/kitchens' },
  { label: 'Living Spaces', to: '/living-spaces' },
  { label: 'Projects', to: '/projects' },
  { label: 'Our Approach', to: '/our-approach' },
  { label: 'About', to: '/about-us' },
]

/** Footer column “Company” — labels match the page names they lead to (V7). */
export const footerExploreLinks = [
  { label: 'Our Approach', to: '/our-approach' },
  { label: 'About', to: '/about-us' },
  { label: 'Journal', to: '/journal' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
]

/** Footer column “What we make” (V7). */
export const footerCraftsmanshipLinks = [
  { label: 'Kitchens', to: '/kitchens' },
  { label: 'Living Spaces', to: '/living-spaces' },
  { label: 'Projects', to: '/projects' },
]

export const heroHomeDefaults = {
  eyebrow: 'WARD SMITH INTERIORS',
  /** Matches homepage meta `_hero_heading` (WP DB) */
  heading: 'Crafting Bespoke Essex Furniture Through Creative Design and Expert Craftsmanship',
  primaryButtonLabel: 'FIND OUT MORE',
  primaryButtonTo: '/about-us',
  secondaryButtonLabel: 'GET IN TOUCH',
  secondaryButtonTo: '/start-your-project',
  /** `_hero_images` attachment → full-size URL on Local */
  imageUrls: [wpMediaUrl('/wp-content/uploads/2025/12/hero-bg.jpg')],
}
