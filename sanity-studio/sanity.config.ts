import { defineConfig, defineField, defineType } from 'sanity'
import { deskTool, type StructureResolver } from 'sanity/desk'

const singletonTypes = new Set(['homePage', 'siteSettings'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

/**
 * Image field with hotspot cropping. This is what gives editors the
 * "Upload" + "Select from Media Library" experience.
 */
const image = (name: string, title?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
  })

/**
 * Legacy image-path field kept (hidden) only so previously-imported
 * `/media/...` string values are preserved in the document and still available
 * as a fallback to the frontend. Typed as `string` (not `url`) because the
 * imported values are relative paths, which would otherwise fail URL validation
 * and block publishing.
 */
const legacyUrl = (name: string) =>
  defineField({ name, type: 'string', hidden: true })

const legacyUrlArray = (name: string) =>
  defineField({ name, type: 'array', of: [{ type: 'string' }], hidden: true })

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.editor().id('homePage').schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() || '')),
    ])

const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    image('image', 'Card image'),
    image('heroImage', 'Hero image'),
    legacyUrl('imageUrl'),
    legacyUrl('heroImageUrl'),
    defineField({ name: 'processIntroHeading', type: 'string' }),
    defineField({ name: 'processIntroContent', type: 'text' }),
    defineField({ name: 'galleryHeading', type: 'string' }),
    defineField({ name: 'galleryParagraph', type: 'text' }),
    defineField({ name: 'serviceCtaHeading', type: 'string' }),
    defineField({ name: 'serviceCtaContent', type: 'text' }),
  ],
})

const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'servicesLine', type: 'string' }),
    image('image', 'Cover image'),
    legacyUrl('imageUrl'),
    defineField({ name: 'cost', type: 'string' }),
    defineField({ name: 'projectOverview', type: 'text' }),
    defineField({ name: 'testimonialVideoUrl', title: 'Testimonial video URL', type: 'url' }),
    image('testimonialVideoPoster', 'Testimonial video poster'),
    legacyUrl('testimonialVideoPosterUrl'),
    defineField({ name: 'galleryEyebrow', type: 'string' }),
    defineField({ name: 'galleryHeading', type: 'string' }),
    defineField({ name: 'galleryParagraph', type: 'text' }),
    defineField({ name: 'galleryImages', title: 'Gallery images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    legacyUrlArray('galleryImageUrls'),
    defineField({ name: 'ctaHeading', type: 'string' }),
    defineField({ name: 'ctaContent', type: 'text' }),
    defineField({ name: 'ctaButtonLabel', type: 'string' }),
    defineField({ name: 'ctaButtonTo', type: 'string' }),
  ],
})

const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'date', type: 'date' }),
    image('image', 'Featured image'),
    legacyUrl('imageUrl'),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
})

const enquirySubmission = defineType({
  name: 'enquirySubmission',
  title: 'Enquiry Submission',
  type: 'document',
  fields: [
    defineField({ name: 'submittedAt', type: 'datetime' }),
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({ name: 'spaceType', type: 'string' }),
    defineField({ name: 'projectDescription', type: 'text' }),
    defineField({ name: 'stage', type: 'string' }),
    defineField({ name: 'inspiration', type: 'text' }),
    defineField({ name: 'dimensions', type: 'text' }),
    defineField({ name: 'requirements', type: 'text' }),
    defineField({ name: 'budget', type: 'string' }),
    defineField({ name: 'timeline', type: 'string' }),
    defineField({ name: 'termsAccepted', type: 'boolean' }),
    defineField({
      name: 'attachments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'mimeType', type: 'string' }),
            defineField({ name: 'size', type: 'number' }),
            defineField({ name: 'base64', type: 'text' }),
          ],
        },
      ],
    }),
  ],
})

const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Home Page' }),
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'primaryButtonLabel', type: 'string' }),
        defineField({ name: 'primaryButtonTo', type: 'string' }),
        defineField({ name: 'secondaryButtonLabel', type: 'string' }),
        defineField({ name: 'secondaryButtonTo', type: 'string' }),
        defineField({ name: 'images', title: 'Slideshow images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
        legacyUrlArray('imageUrls'),
      ],
    }),
    defineField({
      name: 'processIntro',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'content', type: 'text' }),
        image('image', 'Image'),
        legacyUrl('imageUrl'),
        defineField({ name: 'imageAspectClass', type: 'string' }),
        defineField({ name: 'videoUrl', type: 'url' }),
        defineField({ name: 'ctaLabel', type: 'string' }),
        defineField({ name: 'enableAnimations', type: 'boolean' }),
      ],
    }),
    defineField({
      name: 'valuesItems',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'content', type: 'text' }),
            defineField({ name: 'icon_name', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'servicesSection',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'tagline', type: 'text' }),
      ],
    }),
    defineField({
      name: 'servicesList',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'slug', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'shortDescription', type: 'text' }),
            image('image', 'Image'),
            legacyUrl('imageUrl'),
          ],
        },
      ],
    }),
    defineField({
      name: 'usp',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'content', type: 'text' }),
        image('image1', 'Image 1'),
        image('image2', 'Image 2'),
        legacyUrl('imageUrl1'),
        legacyUrl('imageUrl2'),
        defineField({ name: 'ctaLabel', type: 'string' }),
        defineField({ name: 'ctaTo', type: 'string' }),
      ],
    }),
    defineField({
      name: 'trust',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'content', type: 'text' }),
        defineField({ name: 'ctaLabel', type: 'string' }),
        defineField({ name: 'ctaTo', type: 'string' }),
        image('backgroundImage', 'Background image'),
        legacyUrl('backgroundImageUrl'),
      ],
    }),
    defineField({
      name: 'testimonialsSection',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'subheading', type: 'text' }),
      ],
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', type: 'string' }),
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'location', type: 'string' }),
            defineField({ name: 'pull_quote', type: 'text' }),
            image('posterImage', 'Poster image'),
            legacyUrl('posterImageUrl'),
            defineField({ name: 'videoUrl', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'finalCta',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'content', type: 'text' }),
        defineField({ name: 'primaryLabel', type: 'string' }),
        defineField({ name: 'primaryTo', type: 'string' }),
      ],
    }),
  ],
})

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string' }),
    defineField({ name: 'defaultTitleSuffix', type: 'string' }),
    image('ogImage', 'Default social share image'),
    legacyUrl('defaultOgImage'),
  ],
})

export default defineConfig({
  name: 'default',
  title: 'Ward-Smith Content Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [deskTool({ structure })],
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter((actionItem) => actionItem.action && singletonActions.has(actionItem.action))
        : prev,
  },
  schema: {
    types: [homePage, siteSettings, servicePage, caseStudy, blogPost, enquirySubmission],
  },
})
