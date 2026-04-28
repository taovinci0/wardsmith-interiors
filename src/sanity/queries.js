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
    },
    valuesItems[]{
      title,
      content,
      icon_name
    },
    servicesSection{
      eyebrow,
      heading,
      tagline
    },
    servicesList[]{
      slug,
      title,
      shortDescription,
      imageUrl
    },
    usp{
      eyebrow,
      heading,
      content,
      imageUrl1,
      imageUrl2,
      ctaLabel,
      ctaTo
    },
    trust{
      heading,
      content,
      ctaLabel,
      ctaTo,
      backgroundImageUrl
    },
    testimonialsSection{
      eyebrow,
      heading,
      subheading
    },
    testimonials[]{
      id,
      name,
      location,
      pull_quote,
      posterImageUrl,
      videoUrl
    },
    finalCta{
      heading,
      content,
      primaryLabel,
      primaryTo
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
