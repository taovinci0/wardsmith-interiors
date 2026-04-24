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

export const primaryNav = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Services', to: '/services', hasMega: true },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

/** Footer column “Explore” — mirrors primary nav intent. */
export const footerExploreLinks = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Services', to: '/services' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const footerCraftsmanshipLinks = [
  { label: 'Bespoke Kitchens', to: '/services/bespoke-kitchens' },
  { label: 'Fitted Wardrobes', to: '/services/bedrooms' },
  { label: 'Home Studies', to: '/services/home-offices' },
  { label: 'Media Units', to: '/services/media-walls' },
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
