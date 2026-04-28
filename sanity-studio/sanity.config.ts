import { defineConfig, defineField, defineType } from 'sanity'
import { deskTool, type StructureResolver } from 'sanity/desk'

const singletonTypes = new Set(['homePage', 'siteSettings'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

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
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() || '')),
    ])

const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'imageUrl', type: 'url' }),
    defineField({ name: 'heroImageUrl', type: 'url' }),
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
    defineField({ name: 'imageUrl', type: 'url' }),
    defineField({ name: 'cost', type: 'string' }),
    defineField({ name: 'projectOverview', type: 'text' }),
    defineField({ name: 'galleryHeading', type: 'string' }),
    defineField({ name: 'galleryParagraph', type: 'text' }),
    defineField({ name: 'galleryImageUrls', type: 'array', of: [{ type: 'url' }] }),
    defineField({ name: 'ctaHeading', type: 'string' }),
    defineField({ name: 'ctaContent', type: 'text' }),
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
    defineField({ name: 'imageUrl', type: 'url' }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
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
        defineField({ name: 'imageUrls', type: 'array', of: [{ type: 'url' }] }),
      ],
    }),
    defineField({
      name: 'processIntro',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'content', type: 'text' }),
        defineField({ name: 'imageUrl', type: 'url' }),
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
            defineField({ name: 'imageUrl', type: 'url' }),
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
        defineField({ name: 'imageUrl1', type: 'url' }),
        defineField({ name: 'imageUrl2', type: 'url' }),
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
        defineField({ name: 'backgroundImageUrl', type: 'url' }),
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
            defineField({ name: 'posterImageUrl', type: 'url' }),
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
    defineField({ name: 'defaultOgImage', type: 'url' }),
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
