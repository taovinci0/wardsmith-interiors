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
      "imageUrls": coalesce(images[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u, imageUrls)
    },
    processIntro{
      eyebrow,
      heading,
      content,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
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
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
    },
    usp{
      eyebrow,
      heading,
      content,
      "imageUrl1": coalesce(image1.asset->url + "?auto=format&w=1600&q=75", imageUrl1),
      "imageUrl2": coalesce(image2.asset->url + "?auto=format&w=1600&q=75", imageUrl2),
      ctaLabel,
      ctaTo
    },
    trust{
      heading,
      content,
      ctaLabel,
      ctaTo,
      "backgroundImageUrl": coalesce(backgroundImage.asset->url + "?auto=format&w=1600&q=75", backgroundImageUrl)
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
      "posterImageUrl": coalesce(posterImage.asset->url + "?auto=format&w=800&q=75", posterImageUrl),
      videoUrl
    },
    finalCta{
      heading,
      content,
      primaryLabel,
      primaryTo
    },
    kitchensSection{
      eyebrow, heading, content,
      "imageUrls": images[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u,
      ctaLabel
    },
    howItWorks{
      eyebrow, heading,
      steps[]{ title, description },
      ctaLabel
    },
    "selectedProjects": *[_type == "caseStudy" && defined(slug.current) && defined(coalesce(image.asset, imageUrl)) && defined(projectOverview)] | order(_createdAt desc)[0...4]{
      "slug": slug.current,
      title,
      location,
      room,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
    }
  }
`

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0]{
    siteName,
    defaultTitleSuffix,
    "defaultOgImage": coalesce(ogImage.asset->url, defaultOgImage),
    phone,
    email,
    address,
    areaCovered,
    instagramUrl,
    facebookUrl
  }
`

export const kitchensPageQuery = /* groq */ `
  *[_type == "kitchensPage"][0]{
    hero{ eyebrow, heading, intro, "imageUrl": image.asset->url + "?auto=format&w=1600&q=75" },
    howWeDesign{ eyebrow, heading, content, "imageUrl": image.asset->url + "?auto=format&w=1600&q=75", videoUrl },
    howItsMade{ eyebrow, heading, content, "imageUrls": images[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u },
    projectsSection{ eyebrow, heading },
    whatsIncluded{ eyebrow, heading, items[]{ title, content } },
    investment{ eyebrow, heading, content, bands[]{ label, value } },
    faqs{ heading, items[]{ question, answer } },
    "projects": *[_type == "caseStudy" && room == "kitchen" && defined(slug.current) && defined(coalesce(image.asset, imageUrl)) && defined(projectOverview)] | order(_createdAt desc)[0...6]{
      "slug": slug.current, title, location, "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
    }
  }
`

export const livingSpacesPageQuery = /* groq */ `
  *[_type == "livingSpacesPage"][0]{
    hero{ eyebrow, heading, intro, "imageUrl": image.asset->url + "?auto=format&w=1600&q=75" },
    spaces[]{
      title, content,
      "imageUrls": images[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u,
      relatedProject->{ "slug": slug.current, title }
    }
  }
`

export const ourApproachPageQuery = /* groq */ `
  *[_type == "ourApproachPage"][0]{
    hero{ eyebrow, heading, intro, "imageUrl": image.asset->url + "?auto=format&w=1600&q=75" },
    wardSmithWay{ eyebrow, heading, content, "imageUrl": image.asset->url + "?auto=format&w=1600&q=75", videoUrl },
    process{ eyebrow, heading, tagline, steps[]{ title, description, "imageUrl": image.asset->url + "?auto=format&w=1600&q=75" } },
    investment{ eyebrow, heading, content },
    aftercare{ eyebrow, heading, content }
  }
`

export const projectsListQuery = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current) && defined(coalesce(image.asset, imageUrl)) && defined(projectOverview)] | order(_createdAt desc){
    "slug": slug.current,
    title,
    location,
    servicesLine,
    room,
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
  }
`

export const aboutPageQuery = /* groq */ `
  *[_type == "aboutPage"][0]{
    hero{
      eyebrow, heading,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
      primaryButtonLabel, primaryButtonTo, secondaryButtonLabel, secondaryButtonTo
    },
    processIntro{
      eyebrow, heading, content,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
      imageAspectClass, videoUrl, ctaLabel, enableAnimations
    },
    valuesItems[]{ title, content, icon_name },
    team{
      eyebrow, heading, body,
      members[]{ name, role, description, "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl) }
    },
    processSteps{
      eyebrow, heading, tagline,
      steps[]{ title, description },
      "stepImageUrls": coalesce(stepImages[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u, stepImageUrls)
    }
  }
`

export const contactPageQuery = /* groq */ `
  *[_type == "contactPage"][0]{
    hero{ eyebrow, heading, "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl) },
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
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
  }
`

export const servicePageBySlugQuery = /* groq */ `
  *[_type == "servicePage" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    shortDescription,
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
    "heroImageUrl": coalesce(heroImage.asset->url + "?auto=format&w=2000&q=75", heroImageUrl),
    processIntro{
      eyebrow, heading, content,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
      imageAspectClass, videoUrl, ctaLabel, enableAnimations
    },
    process2{
      eyebrow, heading, content,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
      videoUrl, ctaLabel
    },
    serviceProcessSteps{
      eyebrow, heading, tagline,
      steps[]{ title, description },
      "stepImageUrls": coalesce(stepImages[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u, stepImageUrls),
      endCard{ heading, paragraph, buttonLabel, buttonTo }
    },
    serviceUsp{
      eyebrow, heading, content,
      "imageUrl1": coalesce(image1.asset->url + "?auto=format&w=1600&q=75", imageUrl1),
      "imageUrl2": coalesce(image2.asset->url + "?auto=format&w=1600&q=75", imageUrl2),
      ctaLabel, ctaTo
    },
    gallery{
      eyebrow, heading, paragraph,
      "imageUrls": coalesce(images[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u, imageUrls)
    },
    serviceCta{ heading, content, buttonLabel, buttonTo }
  }
`

export const caseStudiesListQuery = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current) && defined(coalesce(image.asset, imageUrl)) && defined(projectOverview)] | order(_createdAt asc){
    "slug": slug.current,
    title,
    location,
    servicesLine,
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
  }
`

/** Best complete project for the homepage feature: kitchens first, newest first. */
export const featuredProjectQuery = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current) && defined(coalesce(image.asset, imageUrl)) && defined(projectOverview)]
    | order(select(room == "kitchen" => 0, 1) asc, _createdAt desc)[0]{
    "slug": slug.current,
    title,
    location,
    room,
    projectOverview,
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=2000&q=75", imageUrl),
    "galleryImageUrls": coalesce(galleryImages[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u, galleryImageUrls)[0...3]
  }
`

export const caseStudyBySlugQuery = /* groq */ `
  *[_type == "caseStudy" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    location,
    servicesLine,
    room,
    cost,
    projectOverview,
    brief,
    designDecisions,
    specification[]{ label, value },
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
    testimonialVideoUrl,
    "testimonialVideoPosterUrl": coalesce(testimonialVideoPoster.asset->url + "?auto=format&w=1600&q=75", testimonialVideoPosterUrl),
    galleryEyebrow,
    galleryHeading,
    galleryParagraph,
    "galleryImageUrls": coalesce(galleryImages[]{"u": asset->url + "?auto=format&w=1200&q=75"}[].u, galleryImageUrls),
    ctaHeading,
    ctaContent,
    ctaButtonLabel,
    ctaButtonTo,
    "related": *[_type == "caseStudy" && slug.current != $slug && defined(coalesce(image.asset, imageUrl)) && defined(projectOverview)] | order(_createdAt asc)[0...3]{
      "slug": slug.current,
      title,
      location,
      servicesLine,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
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
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
  }
`

export const blogPostBySlugQuery = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    category,
    date,
    excerpt,
    "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl),
    body[]{
      ...,
      _type == "image" => { ..., "url": asset->url + "?auto=format&w=1200&q=75" }
    },
    "related": *[_type == "blogPost" && slug.current != $slug] | order(date desc)[0...3]{
      "slug": slug.current,
      title,
      date,
      excerpt,
      "imageUrl": coalesce(image.asset->url + "?auto=format&w=1600&q=75", imageUrl)
    }
  }
`
