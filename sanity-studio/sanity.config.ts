import { defineConfig, defineField, defineType } from 'sanity'
import { deskTool } from 'sanity/desk'

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

export default defineConfig({
  name: 'default',
  title: 'Ward-Smith Content Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [deskTool()],
  schema: {
    types: [servicePage, caseStudy, blogPost, enquirySubmission],
  },
})
