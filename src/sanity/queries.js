/**
 * GROQ queries for homepage singleton and site settings.
 *
 * Image fields are real Sanity image assets (uploaded / picked from the Media
 * Library). We resolve each one to its CDN URL and `coalesce` with the legacy
 * imported `/media/...` string, so the frontend keeps receiving plain URL
 * strings under the same keys it already uses — no component changes needed.
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
      "imageUrls": coalesce(images[].asset->url, imageUrls)
    },
    processIntro{
      eyebrow,
      heading,
      content,
      "imageUrl": coalesce(image.asset->url, imageUrl),
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
      "imageUrl": coalesce(image.asset->url, imageUrl)
    },
    usp{
      eyebrow,
      heading,
      content,
      "imageUrl1": coalesce(image1.asset->url, imageUrl1),
      "imageUrl2": coalesce(image2.asset->url, imageUrl2),
      ctaLabel,
      ctaTo
    },
    trust{
      heading,
      content,
      ctaLabel,
      ctaTo,
      "backgroundImageUrl": coalesce(backgroundImage.asset->url, backgroundImageUrl)
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
      "posterImageUrl": coalesce(posterImage.asset->url, posterImageUrl),
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
    "defaultOgImage": coalesce(ogImage.asset->url, defaultOgImage)
  }
`
