# WP to Sanity Model Map (Draft)

Initial mapping based on current theme templates, custom post types, and section-level meta box usage.

## Document Types

## `siteSettings`
- global footer settings
- legal links
- optional global CTA defaults
- optional social/contact fields

## `pageHome`
- hero
- process intro
- values
- services section config
- usp
- trust
- testimonials section config
- final cta

## `pageAbout`
- hero
- process intro
- values
- meet the team
- process steps
- testimonials
- final cta

## `pageContact`
- heroContact
- consultation form content/settings

## `pageFaqs`
- hero
- faq groups/items
- final cta

## `pageStartYourProject`
- multi-step enquiry form labels/help text
- submission settings

## `legalPage`
- slug (`privacy-policy`, `terms-of-business`)
- hero
- rich content body
- updated date/meta text

## `service`
- title, slug, featured image, excerpt, body
- hero fields
- process intro
- process 2 content
- process steps (horizontal cards)
- service usp
- gallery
- service cta

## `caseStudy`
- title, slug, featured image, excerpt, body
- hero fields
- process intro
- gallery/media
- related case studies refs
- cta
- location/services metadata for archive cards

## `testimonial`
- customer name/title
- quote/rich text
- avatar/image
- optional rating
- sort/order hints

## `blogPost`
- title, slug, featured image, excerpt, body
- category/taxonomy refs
- publish date
- related posts strategy

## Shared Object Types (Reusable Sections)

- `heroSection`
- `heroPageSection`
- `ctaSection`
- `processIntroSection`
- `valuesSection`
- `servicesSection`
- `trustSection`
- `testimonialCarouselSection`
- `faqAccordionSection`
- `gallerySection`

## Migration Notes

- WordPress meta keys must be enumerated and mapped one-to-one before migration scripts are written.
- Some WordPress behaviors are computed at runtime and need explicit fields in Sanity.
- Form submissions should not be stored in Sanity by default; use API storage/notification flow.

## Next Step

- Produce a field-level mapping table (`wp_meta_key -> sanity_field_path`) before schema implementation.
