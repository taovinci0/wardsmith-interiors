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

export const aboutPageQuery = /* groq */ `
  *[_type == "aboutPage"][0]{
    hero{
      eyebrow, heading,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      primaryButtonLabel, primaryButtonTo, secondaryButtonLabel, secondaryButtonTo
    },
    processIntro{
      eyebrow, heading, content,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      imageAspectClass, videoUrl, ctaLabel, enableAnimations
    },
    valuesItems[]{ title, content, icon_name },
    team{
      eyebrow, heading, body,
      members[]{ name, role, description, "imageUrl": coalesce(image.asset->url, imageUrl) }
    },
    processSteps{
      eyebrow, heading, tagline,
      steps[]{ title, description },
      "stepImageUrls": coalesce(stepImages[].asset->url, stepImageUrls)
    }
  }
`

export const contactPageQuery = /* groq */ `
  *[_type == "contactPage"][0]{
    hero{ eyebrow, heading, "imageUrl": coalesce(image.asset->url, imageUrl) },
    consultation{ heading, intro, phone, email, address, projectHeading, projectText, projectButtonLabel, projectButtonTo }
  }
`

export const faqsQuery = /* groq */ `
  *[_type == "faqsPage"][0]{
    items[]{ question, answer }
  }
`

export const servicesListQuery = /* groq */ `
  *[_type == "servicePage" && defined(slug.current)] | order(_createdAt asc){
    "slug": slug.current,
    title,
    shortDescription,
    "imageUrl": coalesce(image.asset->url, imageUrl)
  }
`

export const servicePageBySlugQuery = /* groq */ `
  *[_type == "servicePage" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    shortDescription,
    "imageUrl": coalesce(image.asset->url, imageUrl),
    "heroImageUrl": coalesce(heroImage.asset->url, heroImageUrl),
    processIntro{
      eyebrow, heading, content,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      imageAspectClass, videoUrl, ctaLabel, enableAnimations
    },
    process2{
      eyebrow, heading, content,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      videoUrl, ctaLabel
    },
    serviceProcessSteps{
      eyebrow, heading, tagline,
      steps[]{ title, description },
      "stepImageUrls": coalesce(stepImages[].asset->url, stepImageUrls),
      endCard{ heading, paragraph, buttonLabel, buttonTo }
    },
    serviceUsp{
      eyebrow, heading, content,
      "imageUrl1": coalesce(image1.asset->url, imageUrl1),
      "imageUrl2": coalesce(image2.asset->url, imageUrl2),
      ctaLabel, ctaTo
    },
    gallery{
      eyebrow, heading, paragraph,
      "imageUrls": coalesce(images[].asset->url, imageUrls)
    },
    serviceCta{ heading, content, buttonLabel, buttonTo }
  }
`

export const caseStudiesListQuery = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current)] | order(_createdAt asc){
    "slug": slug.current,
    title,
    location,
    servicesLine,
    "imageUrl": coalesce(image.asset->url, imageUrl)
  }
`

export const caseStudyBySlugQuery = /* groq */ `
  *[_type == "caseStudy" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    location,
    servicesLine,
    cost,
    projectOverview,
    "imageUrl": coalesce(image.asset->url, imageUrl),
    testimonialVideoUrl,
    "testimonialVideoPosterUrl": coalesce(testimonialVideoPoster.asset->url, testimonialVideoPosterUrl),
    galleryEyebrow,
    galleryHeading,
    galleryParagraph,
    "galleryImageUrls": coalesce(galleryImages[].asset->url, galleryImageUrls),
    ctaHeading,
    ctaContent,
    ctaButtonLabel,
    ctaButtonTo,
    "related": *[_type == "caseStudy" && slug.current != $slug] | order(_createdAt asc)[0...3]{
      "slug": slug.current,
      title,
      location,
      servicesLine,
      "imageUrl": coalesce(image.asset->url, imageUrl)
    }
  }
`

export const blogPostsListQuery = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)] | order(date desc){
    "slug": slug.current,
    title,
    category,
    date,
    excerpt,
    "imageUrl": coalesce(image.asset->url, imageUrl)
  }
`

export const blogPostBySlugQuery = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    category,
    date,
    excerpt,
    "imageUrl": coalesce(image.asset->url, imageUrl),
    body[]{
      ...,
      _type == "image" => { ..., "url": asset->url }
    },
    "related": *[_type == "blogPost" && slug.current != $slug] | order(date desc)[0...3]{
      "slug": slug.current,
      title,
      date,
      excerpt,
      "imageUrl": coalesce(image.asset->url, imageUrl)
    }
  }
`
