/**
 * Homepage content aligned with Local WP DB (front page ID 9) until Sanity is connected.
 * Images resolve via VITE_WP_ORIGIN (see .env.development) + /wp-content/uploads/...
 */

import { wpMediaUrl } from '../lib/wpAssetBase.js'

export const processIntro = {
  eyebrow: 'The Ward Smith Way',
  heading: 'Bespoke Furniture Makers In Essex',
  content: `We pride ourselves on designing, handcrafting, and installing the highest quality bespoke furniture and storage solutions in Essex. Whether it's a fitted wardrobe, a home office, or breathing life into those awkward corners, you can trust us when style, storage, and space matter. We will work alongside you every step of the way to ensure we bring your vision to life.`,
  imageUrl: wpMediaUrl('/wp-content/uploads/2026/01/Screenshot-2026-01-15-at-10.27.29.png'),
  imageAspectClass: 'aspect-[4/5]',
  videoUrl: 'https://www.youtube.com/watch?v=DBcc2_0Lj30',
  ctaLabel: 'WATCH OUR PROCESS',
  enableAnimations: true,
}

export const valuesItems = [
  {
    title: 'British Brand',
    content:
      'From product design to manufacture and installation, your order is tailor-made by our skilled British craftsmen in our purpose-built workshop situated in the heart of the beautiful Essex countryside.',
    icon_name: 'ruler',
  },
  {
    title: 'Doing Our Bit',
    content:
      'We care about sustainability and do our best to have as little impact on our planet as possible. We use sustainably sourced materials that either have been recycled or can be recycled in the future.',
    icon_name: 'trees',
  },
  {
    title: 'Guarantee',
    content:
      'We are so confident in the quality of our products and craftsmanship that every installation comes with a 5-year guarantee. This gives you peace of mind when choosing Ward-Smith Interiors. See our Terms and Conditions for more details.',
    icon_name: 'shield-check',
  },
]

export const servicesSection = {
  eyebrow: 'WHAT WE CRAFT',
  heading: 'Tailored Interiors & Furniture',
  tagline:
    'From concept to completion, we deliver exceptional joinery solutions for every room in your home.',
}

/** Kitchens first — matches WP reorder (Bespoke Kitchens then menu_order). Thumbnails from DB. */
export const servicesList = [
  {
    slug: 'bespoke-kitchens',
    title: 'Bespoke Kitchens',
    shortDescription:
      'Smart, stylish fitted bedroom furniture designed to maximise space and transform the way you live.',
    imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/kitchens.jpg'),
  },
  {
    slug: 'bedrooms',
    title: 'Bedrooms',
    shortDescription:
      'Smart, stylish fitted bedroom furniture designed to maximise space and transform the way you live.',
    imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/bedrooms.jpg'),
  },
  {
    slug: 'home-offices',
    title: 'Home Office Furniture',
    shortDescription:
      'Smart, stylish fitted bedroom furniture designed to maximise space and transform the way you live.',
    imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/home-offices.jpg'),
  },
  {
    slug: 'tailored-spaces',
    title: 'Tailored Spaces',
    shortDescription:
      'Smart, stylish fitted bedroom furniture designed to maximise space and transform the way you live.',
    imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/tailored-spaces.jpg'),
  },
  {
    slug: 'media-walls',
    title: 'Media Walls',
    shortDescription:
      'Smart, stylish fitted bedroom furniture designed to maximise space and transform the way you live.',
    imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/media-walls.jpg'),
  },
  {
    slug: 'carpentry-services',
    title: 'Carpentry Services',
    shortDescription:
      'Skilled site carpentry, doors, and finishing details for bespoke interior projects across Essex.',
    imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/tailored-spaces.jpg'),
  },
]

export const usp = {
  eyebrow: 'THE WARD-SMITH DIFFERENCE',
  heading: 'Every Project Is Unique and Tailored to You',
  content:
    "We understand that every home is different, and every homeowner has unique needs and preferences. That's why we take a completely bespoke approach to every project, ensuring that your furniture and interiors are perfectly tailored to your space, style, and lifestyle.",
  imageUrl1: wpMediaUrl('/wp-content/uploads/2025/12/cad-1.png'),
  imageUrl2: wpMediaUrl('/wp-content/uploads/2025/12/cad-2.png'),
  ctaLabel: 'View Case Studies',
  ctaTo: '/case-studies',
}

export const trust = {
  heading: 'Not Sure Where to Start?',
  content:
    "If you're still exploring ideas or need guidance, we're here to help. Book a complimentary 20-minute call to talk through your space, ask questions, and gain clarity on the next steps for your project.",
  ctaLabel: 'BOOK A CALL',
  ctaTo: '/contact',
  backgroundImageUrl: wpMediaUrl('/wp-content/uploads/2025/12/need-something-2.png'),
}

export const testimonialsSection = {
  eyebrow: 'CLIENT STORIES',
  heading: 'Trusted by Essex Homeowners',
  subheading:
    'Real homeowners sharing their experience of working with Ward Smith Interiors.',
}

/** Same order as WP testimonial query: date DESC → Emma, Michael, Sarah */
export const testimonials = [
  {
    id: '27',
    name: 'Emma Williams',
    location: 'Braintree, Essex',
    pull_quote:
      'The bespoke home office they created is perfect for my needs. Beautiful design, excellent quality, and delivered on time. Highly recommend!',
    posterImageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Screenshot-2026-01-21-at-13.00.45.png'),
    videoUrl: 'https://youtube.com/shorts/nuEQ5tr-sks?si=2s4I2_JjYFh0yHeX',
  },
  {
    id: '26',
    name: 'Michael Thompson',
    location: 'Colchester, Essex',
    pull_quote:
      'From initial design to final installation, the team was professional and attentive. Our new fitted bedroom furniture has exceeded all expectations.',
    posterImageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Screenshot-2026-01-21-at-13.00.45.png'),
    videoUrl: 'https://youtube.com/shorts/nuEQ5tr-sks?si=2s4I2_JjYFh0yHeX',
  },
  {
    id: '25',
    name: 'Sarah Johnson',
    location: 'Chelmsford, Essex',
    pull_quote:
      "Ward-Smith Interiors transformed our kitchen completely. The attention to detail and craftsmanship is outstanding. We couldn't be happier with the result.",
    posterImageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Screenshot-2026-01-21-at-13.00.45.png'),
    videoUrl: 'https://youtube.com/shorts/nuEQ5tr-sks?si=2s4I2_JjYFh0yHeX',
  },
]

export const finalCta = {
  heading: 'Ready to Transform Your Home?',
  content:
    "Whether you have a clear brief in mind or need guidance to shape your ideas, we're here to help. Start your project with detailed specifications, or book a complimentary 20-minute consultation to explore your options and take the next step with confidence.",
  primaryLabel: 'Start Your Project',
  primaryTo: '/start-your-project',
}
