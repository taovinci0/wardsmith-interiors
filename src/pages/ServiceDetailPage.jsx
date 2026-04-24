import { useParams, Link } from 'react-router-dom'
import { GreenBandCtaSection } from '../components/sections/GreenBandCtaSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { Process2Section } from '../components/sections/Process2Section.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ProcessStepsSection } from '../components/sections/ProcessStepsSection.jsx'
import { ServiceGalleryHeaderSection } from '../components/sections/ServiceGalleryHeaderSection.jsx'
import { ServiceUspSection } from '../components/sections/ServiceUspSection.jsx'
import { defaultHeroBg, getServiceBySlug } from '../data/innerPagesContent.js'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? getServiceBySlug(slug) : null

  if (!service) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="mb-4 font-serif text-3xl text-primary">Service not found</h1>
          <Link to="/services" className="btn-primary inline-block">
            All services
          </Link>
        </div>
      </section>
    )
  }

  const { processIntro, process2, serviceProcessSteps, serviceUsp, gallery, serviceCta } = service

  return (
    <>
      <HeroPage
        eyebrow="Services"
        heading={service.title}
        imageUrls={[service.heroImageUrl || service.imageUrl || defaultHeroBg]}
        showButtons={false}
      />
      {processIntro ? <ProcessIntroSection data={processIntro} /> : null}
      {process2 ? (
        <Process2Section
          eyebrow={process2.eyebrow}
          heading={process2.heading}
          content={process2.content}
          imageUrl={process2.imageUrl}
          videoUrl={process2.videoUrl}
          ctaLabel={process2.ctaLabel}
        />
      ) : null}
      {serviceProcessSteps ? (
        <ProcessStepsSection
          sectionId="service-process-steps-section"
          trackId="service-process-steps-track"
          eyebrow={serviceProcessSteps.eyebrow}
          heading={serviceProcessSteps.heading}
          tagline={serviceProcessSteps.tagline}
          steps={serviceProcessSteps.steps}
          stepImageUrls={serviceProcessSteps.stepImageUrls}
          endCard={serviceProcessSteps.endCard}
        />
      ) : null}
      {serviceUsp ? (
        <ServiceUspSection
          eyebrow={serviceUsp.eyebrow}
          heading={serviceUsp.heading}
          content={serviceUsp.content}
          imageUrl1={serviceUsp.imageUrl1}
          imageUrl2={serviceUsp.imageUrl2}
          ctaLabel={serviceUsp.ctaLabel}
          ctaTo={serviceUsp.ctaTo}
        />
      ) : null}
      {gallery ? (
        <ServiceGalleryHeaderSection
          eyebrow={gallery.eyebrow}
          heading={gallery.heading}
          paragraph={gallery.paragraph}
          imageUrls={gallery.imageUrls}
        />
      ) : null}
      {serviceCta ? (
        <GreenBandCtaSection
          id="service-cta-section"
          heading={serviceCta.heading}
          content={serviceCta.content}
          primaryLabel={serviceCta.buttonLabel}
          primaryTo={serviceCta.buttonTo}
        />
      ) : null}
    </>
  )
}
