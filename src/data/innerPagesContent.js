/**
 * Static inner-page copy and listings until Sanity is connected.
 * Shapes mirror WordPress templates for straightforward GROQ migration later.
 */

import { wpMediaUrl } from '../lib/wpAssetBase.js'
import { servicesList } from './homePageContent.js'
import { getServicePageBundle } from './serviceBundles.js'
import { wpBlogPosts } from './wpBlogPosts.js'

export const defaultHeroBg = wpMediaUrl('/wp-content/uploads/2025/12/hero-bg.jpg')

export const aboutPage = {
  hero: {
    eyebrow: 'About Us',
    heading: 'Trusted Family-Run Essex Business',
    imageUrls: [defaultHeroBg],
    primaryButtonLabel: 'Find Out More',
    primaryButtonTo: '/faqs',
    secondaryButtonLabel: 'Start Your Project',
    secondaryButtonTo: '/start-your-project',
  },
  processIntro: {
    eyebrow: 'The Ward Smith Way',
    heading: 'Why Ward Smith?',
    content: `Ward-Smith Interiors is a family owned business that operates across Essex. We specialise in designing, hand-crafting and installing beautiful, bespoke fitted furniture to help you create your dream home.

At Ward-Smith Interiors, it's just as much about the journey as the final destination, and that's why our service has the personal touch. We'll consult and take your input to heart every step of the way to ensure your peace of mind as we bring your vision to life.

We source only the highest-quality materials for our furniture, and this means that it's built to last.

Do you want smart solutions to your storage needs? Would you love a completely unique home that not only tells your story, but is functional and built to stand the test of time? Do you need peace of mind in your investment and to feel like you're being listened to? Choose Ward-Smith Interiors.`,
    imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06329-2.jpg'),
    imageAspectClass: 'aspect-square',
    videoUrl: '',
    ctaLabel: 'WATCH OUR PROCESS',
    enableAnimations: false,
  },
  valuesItems: [
    {
      title: 'The Personal touch',
      content:
        'YOU are the centre of every project. We pride ourselves in providing the best customer service in the industry. Your peace of mind is extremely important to us, and your input will be listened to every step of the way.',
      icon_name: 'heart-handshake',
    },
    {
      title: 'Quality & Integrity',
      content:
        'We only use the best quality hardware, wooden panels and materials. Our team is qualified, highly experienced and dedicated to the craft. We do not compromise when it comes to quality.',
      icon_name: 'award',
    },
    {
      title: 'Value',
      content:
        'Bespoke furniture is a long-term investment. We will be thorough in understanding your requirements and aim to add value through creative design and masterful craftsmanship. Your investment is safe in our hands.',
      icon_name: 'trending-up',
    },
    {
      title: 'Respect',
      content:
        'We will treat your home like our own and strive to minimise any mess or disruption. We will be smartly presented and will always behave in a professional manner.',
      icon_name: 'home',
    },
  ],
}

export const meetTheTeam = {
  eyebrow: 'MEET THE TEAM',
  heading: 'Learn more about the Ward-smith team',
  body:
    'Get to know the dedicated professionals behind Ward-Smith Interiors, a team passionate about crafting bespoke solutions and bringing your vision to life.',
  members: [
    {
      name: 'Sebastian Ward-Smith',
      role: 'Director',
      description:
        "Like Father, like son. Seb started out as a passionate woodworking enthusiast from the age of 5 working in his Dad's workshop. Seb is City & Guilds qualified Engineer and had a successful career working for the Ministry of Defence with a fine eye for precision and meticulous when it comes to the small details. After identifying a demand for creative storage solutions, it was time to change direction. Seb created Ward-Smith Interiors Ltd to channel his creativity and passion for woodworking. Seb is incredibly dedicated to self-improvement and developing his craft.",
      imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Ward-Smith-Seb-Headshot.webp'),
    },
    {
      name: 'Matthew Wynn',
      role: 'Lead Joiner',
      description:
        "Matt is a dedicated traditional carpenter with over 30 years' experience within the woodworking industry. Having completed his Advanced Carpentry and Joinery apprenticeship in 1991, Matt has a wealth of experience in all aspects of carpentry and joinery. Matt is also a qualified Locksmith, which goes hand-in-hand with joinery and fitting bespoke doors. Thanks to Matt's incredible experience, we are equipped to take on a huge variety of carpentry jobs. Fun fact: One of Matt's favourite things to do is hoovering! So rest assured, your house will be left spotless!",
      imageUrl: wpMediaUrl('/wp-content/uploads/2025/12/Ward-Smith-Matt-Headshot.webp'),
    },
  ],
}

export const processStepsPage = {
  eyebrow: 'The Process',
  heading: 'A Thoughtful, Streamlined Process Built Around You',
  tagline:
    "A successful project begins with a deep understanding of the client's needs, and every Ward-Smith Interiors project starts with a detailed, personalised consultation.",
  steps: [
    {
      title: 'Reach out to us',
      description:
        "The first step of your journey is to reach out to us – we'd love to hear about your project ideas and find out if we can help you. This allows us to understand your wants and needs, and to answer any of your questions you may have. We'll also take this opportunity to make measurements and to organise a design consultation.",
    },
    {
      title: 'Design Meeting',
      description:
        "We will get to work on the design as per your specifications. If you've opted to use our design & build package, you'll receive high quality technical plans that allow you to visualise every aspect of your build. We will seek your feedback and input for any modifications, fine tuning all the details.",
    },
    {
      title: 'Your Proposal',
      description:
        "This is where the magic happens! We'll procure the best quality materials and handcraft your build in our specialised workshop.",
    },
    {
      title: 'Installation',
      description:
        "Near the final stages of manufacturing, we'll be in touch to organise a suitable date to install your bespoke furniture! We'll send you a quick checklist in advance to make sure the installation process is completely seamless, and that any disruption is minimised.",
    },
    {
      title: 'Post Install Check',
      description:
        'As part of our pride in providing excellent customer service, we will check in post-installation to ensure the final product has met your expectations and that you are satisfied!',
    },
  ],
  stepImageUrls: servicesList.slice(0, 5).map((s) => s.imageUrl || ''),
}

export const contactPage = {
  hero: {
    eyebrow: '',
    heading: 'Contact Us',
    imageUrls: [defaultHeroBg],
    showButtons: false,
    contentPaddingTop: '10rem',
  },
}

export const faqsPage = {
  hero: {
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    imageUrls: [defaultHeroBg],
    primaryButtonLabel: 'Find Out More',
    primaryButtonTo: '/about-us',
    secondaryButtonLabel: 'Start Your Project',
    secondaryButtonTo: '/start-your-project',
  },
}

export const caseStudiesArchive = {
  hero: {
    eyebrow: 'Case Studies',
    heading: 'Our Recent Projects',
    imageUrls: [defaultHeroBg],
    showButtons: false,
  },
}

export const blogArchive = {
  hero: {
    eyebrow: 'Blog',
    heading: 'News & Inspiration',
    imageUrls: [defaultHeroBg],
    showButtons: false,
  },
}

export const servicesArchive = {
  hero: {
    eyebrow: 'Services',
    heading: 'Crafted For Your Home',
    imageUrls: [defaultHeroBg],
    primaryButtonLabel: 'Start Your Project',
    primaryButtonTo: '/start-your-project',
    secondaryButtonLabel: 'Contact',
    secondaryButtonTo: '/contact',
  },
}

/** Seed listings — replace with Sanity queries */
export const caseStudiesSeed = [
  {
    slug: 'witham-bedroom-refurbishment',
    title: 'Witham Bedroom Refurbishment',
    location: 'Witham, Essex',
    servicesLine: 'Fitted Wardrobes, Full Bedroom Refurb',
    imageUrl: wpMediaUrl('/wp-content/uploads/2026/01/WS-Witham-After-3.png'),
    testimonialVideoUrl: 'https://www.youtube.com/shorts/nuEQ5tr-sks',
    cost: '£50,000',
    projectOverview:
      'The client wanted a full refurbishment of their bedroom, utilising the alcove space with some fitted wardrobes.',
    galleryEyebrow: 'Project Gallery',
    galleryHeading: 'Witham Bedroom Refurbishment',
    galleryParagraph:
      'A full bedroom transformation with fitted wardrobes and bespoke detailing, delivered from initial consultation to final handover.',
    galleryImageUrls: [
      wpMediaUrl('/wp-content/uploads/2026/01/WS-Witham-After-3.png'),
      wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06329-2-2.png'),
      wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06344-2.png'),
      wpMediaUrl('/wp-content/uploads/2025/12/Copy-of-DSC06328-2.png'),
      wpMediaUrl('/wp-content/uploads/2025/12/WS-Witham-After-2.png'),
      wpMediaUrl('/wp-content/uploads/2025/12/4-1.png'),
    ],
    ctaHeading: 'Book a complimentary design consultation today.',
    ctaContent:
      "We'll visit your home, measure your space, and discuss how we can bring your vision to life.",
    ctaButtonLabel: 'Start Your Project',
    ctaButtonTo: '/start-your-project',
  },
  {
    slug: 'essex-bedroom-transformation',
    title: 'Essex Bedroom Transformation',
    location: 'Witham, Essex',
    servicesLine: 'Fitted Wardrobes, Project Management, Electrics, Plumbing, Plastering',
    imageUrl: wpMediaUrl('/wp-content/uploads/2026/01/Copy-of-DSC06336-2-1-scaled-1.jpg'),
    cost: '£50,000',
    projectOverview:
      'Our client wanted to completely transform their dated bedroom into a luxurious, boutique hotel-style space. The brief was clear: dark tones, ambient lighting, and a seamless finish throughout. To bring this vision to life, we stripped the room back to its foundations and rebuilt it with bespoke fittings and carefully considered details.',
    galleryEyebrow: 'Project Gallery',
    galleryHeading: 'Essex Bedroom Transformation',
    galleryParagraph:
      'A boutique hotel-inspired bedroom transformation with bespoke fittings, coordinated trades, and carefully layered finishes.',
    galleryImageUrls: [
      wpMediaUrl('/wp-content/uploads/2026/01/Copy-of-DSC06343-2-scaled-1.jpg'),
      wpMediaUrl('/wp-content/uploads/2026/01/Copy-of-DSC06322-2-scaled-1.jpg'),
      wpMediaUrl('/wp-content/uploads/2026/01/Copy-of-DSC06329-2.jpg'),
      wpMediaUrl('/wp-content/uploads/2026/01/Copy-of-Copy-of-DSC06324-2.jpg'),
    ],
    ctaHeading: 'Ready to transform your bedroom?',
    ctaContent:
      'Book a free design consultation and we will help you shape a space that balances storage, style, and everyday comfort.',
    ctaButtonLabel: 'Start Your Project',
    ctaButtonTo: '/start-your-project',
  },
]

function normalizeWpImage(url) {
  if (!url) return ''
  const path = url.replace(/^https?:\/\/[^/]+/i, '')
  return wpMediaUrl(path)
}

export const blogPostsSeed = wpBlogPosts
  .filter((post) => post.category !== 'Case Study')
  .map((post) => ({
    ...post,
    imageUrl: normalizeWpImage(post.imageUrl),
  }))

export function getServiceBySlug(slug) {
  const base = servicesList.find((s) => s.slug === slug)
  if (!base) return null
  const bundle = getServicePageBundle(slug)
  if (!bundle) {
    return {
      ...base,
      bodyParagraphs: [
        `${base.title}: add a bundle in serviceBundles.js for full WordPress-style sections.`,
      ],
    }
  }
  return { ...base, ...bundle }
}

export function getRelatedCaseStudies(slug, limit = 3) {
  return caseStudiesSeed.filter((c) => c.slug !== slug).slice(0, limit)
}

export function getRelatedBlogPosts(slug, limit = 3) {
  return blogPostsSeed.filter((p) => p.slug !== slug).slice(0, limit)
}

export function getCaseStudyBySlug(slug) {
  return caseStudiesSeed.find((c) => c.slug === slug) ?? null
}

export function getBlogPostBySlug(slug) {
  return blogPostsSeed.find((p) => p.slug === slug) ?? null
}

export const legalPages = {
  privacy: {
    hero: {
      eyebrow: 'Ward-Smith Interiors',
      heading: 'Privacy Policy',
      imageUrls: [defaultHeroBg],
      primaryButtonLabel: 'Contact',
      primaryButtonTo: '/contact',
      secondaryButtonLabel: 'Home',
      secondaryButtonTo: '/',
    },
    paragraphs: [
      'This privacy policy describes how Ward-Smith Interiors collects and uses personal information when you use this website or engage our services.',
      'We may update this policy from time to time. The effective date shown at publication should be reviewed periodically.',
      'For questions about this policy or your data, please contact us using the details in the site footer.',
    ],
  },
  terms: {
    hero: {
      eyebrow: 'Ward-Smith Interiors Ltd',
      heading: 'Terms of Business',
      imageUrls: [defaultHeroBg],
      primaryButtonLabel: 'Contact',
      primaryButtonTo: '/contact',
      secondaryButtonLabel: 'Home',
      secondaryButtonTo: '/',
    },
    paragraphs: [
      'These terms of business govern quotations, deposits, manufacturing, installation, and aftercare for Ward-Smith Interiors projects.',
      'A detailed schedule will be provided with your proposal. Payment stages and lead times may vary depending on scope and materials.',
      'For the full legal text, migrate your WordPress page content into Sanity or paste the approved copy here.',
    ],
  },
}
