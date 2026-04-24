import { useParams, Link } from 'react-router-dom'
import { GreenBandCtaSection } from '../components/sections/GreenBandCtaSection.jsx'
import { CaseStudyProcessIntroSection } from '../components/sections/CaseStudyProcessIntroSection.jsx'
import { CaseStudyRelatedSection } from '../components/sections/CaseStudyRelatedSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { ServiceGalleryHeaderSection } from '../components/sections/ServiceGalleryHeaderSection.jsx'
import { defaultHeroBg, getCaseStudyBySlug, getRelatedCaseStudies } from '../data/innerPagesContent.js'

export function CaseStudyDetailPage() {
  const { slug } = useParams()
  const cs = slug ? getCaseStudyBySlug(slug) : null
  const related = slug ? getRelatedCaseStudies(slug, 3) : []

  if (!cs) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="mb-4 font-serif text-3xl text-primary">Case study not found</h1>
          <Link to="/case-studies" className="btn-primary inline-block">
            All case studies
          </Link>
        </div>
      </section>
    )
  }

  const galleryUrls = cs.galleryImageUrls?.length ? cs.galleryImageUrls : []

  return (
    <>
      <HeroPage
        eyebrow="Case Studies"
        heading={cs.title}
        imageUrls={[cs.imageUrl || defaultHeroBg]}
        showButtons={false}
      />
      <CaseStudyProcessIntroSection
        projectOverview={cs.projectOverview}
        location={cs.location}
        servicesLine={cs.servicesLine}
        cost={cs.cost}
        imageUrl={cs.imageUrl}
        testimonialVideoUrl={cs.testimonialVideoUrl}
        testimonialVideoPosterUrl={cs.testimonialVideoPosterUrl}
      />
      {galleryUrls.length ? (
        <ServiceGalleryHeaderSection
          eyebrow={cs.galleryEyebrow || 'Project Gallery'}
          heading={cs.galleryHeading || 'See the Transformation'}
          paragraph={
            cs.galleryParagraph ||
            'Explore the finished project through our curated selection of images showcasing the craftsmanship and attention to detail.'
          }
          imageUrls={galleryUrls}
        />
      ) : null}
      <CaseStudyRelatedSection items={related} />
      <GreenBandCtaSection
        id="case-study-cta-section"
        heading={cs.ctaHeading || 'Ready to Transform Your Home?'}
        content={
          cs.ctaContent ||
          "Whether you have a clear brief in mind or need guidance to shape your ideas, we're here to help."
        }
        primaryLabel={cs.ctaButtonLabel || 'Start Your Project'}
        primaryTo={cs.ctaButtonTo || '/start-your-project'}
      />
    </>
  )
}
