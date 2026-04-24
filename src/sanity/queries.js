/**
 * GROQ queries for homepage singleton and site settings.
 * Schema field names should match `docs/sanity-schema-notes.md` when you create the Studio.
 */

export const homePageQuery = /* groq */ `
  *[_type == "homePage"][0]{
    _id,
    hero{
      eyebrow,
      heading,
      primaryButtonLabel,
      primaryButtonTo,
      secondaryButtonLabel,
      secondaryButtonTo,
      imageUrls
    },
    processIntro{
      eyebrow,
      heading,
      content,
      imageUrl,
      imageAspectClass,
      videoUrl,
      ctaLabel,
      enableAnimations
    }
  }
`

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0]{
    siteName,
    defaultTitleSuffix,
    defaultOgImage
  }
`
