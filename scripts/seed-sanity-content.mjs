import { createClient } from '@sanity/client'
import {
  finalCta,
  processIntro,
  servicesList,
  servicesSection,
  testimonials,
  testimonialsSection,
  trust,
  usp,
  valuesItems,
} from '../src/data/homePageContent.js'
import { heroHomeDefaults } from '../src/data/siteDefaults.js'
import { getServicePageBundle } from '../src/data/serviceBundles.js'
import { caseStudiesSeed, blogPostsSeed } from '../src/data/innerPagesContent.js'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: false,
})

function toBlocks(text = '') {
  return [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text }],
    },
  ]
}

async function upsert(doc) {
  return client.createOrReplace(doc)
}

function withKeys(items = [], keyFromItem) {
  return items.map((item, index) => ({
    ...item,
    _key: String(keyFromItem?.(item, index) ?? index),
  }))
}

async function run() {
  await upsert({
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home Page',
    hero: heroHomeDefaults,
    processIntro,
    valuesItems: withKeys(valuesItems, (item, index) => item.title || `value-${index}`),
    servicesSection,
    servicesList: withKeys(servicesList, (item, index) => item.slug || `service-${index}`),
    usp,
    trust,
    testimonialsSection,
    testimonials: withKeys(testimonials, (item, index) => item.id || `testimonial-${index}`),
    finalCta,
  })

  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Ward-Smith Interiors',
    defaultTitleSuffix: 'Ward-Smith Interiors',
    defaultOgImage: '',
  })

  for (const service of servicesList) {
    const bundle = getServicePageBundle(service.slug)
    await upsert({
      _id: `service-${service.slug}`,
      _type: 'servicePage',
      title: service.title,
      slug: { _type: 'slug', current: service.slug },
      imageUrl: service.imageUrl || '',
      heroImageUrl: bundle?.heroImageUrl || '',
      processIntroHeading: bundle?.processIntro?.heading || '',
      processIntroContent: bundle?.processIntro?.content || '',
      galleryHeading: bundle?.gallery?.heading || '',
      galleryParagraph: bundle?.gallery?.paragraph || '',
      serviceCtaHeading: bundle?.serviceCta?.heading || '',
      serviceCtaContent: bundle?.serviceCta?.content || '',
    })
  }

  for (const cs of caseStudiesSeed) {
    await upsert({
      _id: `case-study-${cs.slug}`,
      _type: 'caseStudy',
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      location: cs.location || '',
      servicesLine: cs.servicesLine || '',
      imageUrl: cs.imageUrl || '',
      cost: cs.cost || '',
      projectOverview: cs.projectOverview || '',
      galleryHeading: cs.galleryHeading || '',
      galleryParagraph: cs.galleryParagraph || '',
      galleryImageUrls: cs.galleryImageUrls || [],
      ctaHeading: cs.ctaHeading || '',
      ctaContent: cs.ctaContent || '',
    })
  }

  for (const post of blogPostsSeed) {
    await upsert({
      _id: `blog-post-${post.slug}`,
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      category: post.category || 'Blog',
      date: post.date || '',
      imageUrl: post.imageUrl || '',
      excerpt: post.excerpt || '',
      body: toBlocks(post.body || ''),
    })
  }

  console.log(
    `Seed complete: ${servicesList.length} services, ${caseStudiesSeed.length} case studies, ${blogPostsSeed.length} posts`,
  )
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
