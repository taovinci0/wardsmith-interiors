import { Link } from 'react-router-dom'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ServiceGalleryHeaderSection } from '../components/sections/ServiceGalleryHeaderSection.jsx'
import { FaqsAccordionSection } from '../components/sections/FaqsAccordionSection.jsx'
import { GreenBandCtaSection } from '../components/sections/GreenBandCtaSection.jsx'
import { ProjectCardsGrid } from '../components/sections/ProjectCardsGrid.jsx'
import { SectionHeaderSplit } from '../components/sections/SectionHeaderSplit.jsx'
import { FeatureGridFramed } from '../components/sections/FeatureGridFramed.jsx'
import { DarkPanelSection } from '../components/sections/DarkPanelSection.jsx'
import { defaultHeroBg } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { kitchensPageQuery } from '../sanity/queries.js'

export function KitchensPage() {
  const { data } = useSanityData(kitchensPageQuery)
  const hero = data?.hero
  const projects = data?.projects || []

  return (
    <>
      <HeroPage
        eyebrow={hero?.eyebrow || 'Bespoke Kitchens'}
        heading={hero?.heading || 'Kitchens designed, made and installed in Essex'}
        imageUrls={[hero?.imageUrl || defaultHeroBg]}
        showButtons={false}
      />

      {/* 2 — How we design */}
      <ProcessIntroSection
        data={
          data?.howWeDesign
            ? {
                eyebrow: data.howWeDesign.eyebrow,
                heading: data.howWeDesign.heading,
                content: data.howWeDesign.content,
                imageUrl: data.howWeDesign.imageUrl,
                videoUrl: data.howWeDesign.videoUrl,
                imageAspectClass: 'aspect-[4/5]',
                enableAnimations: false,
              }
            : undefined
        }
        bg="bg-white"
      />

      {/* 3 — How it is made, with detail photography */}
      {data?.howItsMade?.heading ? (
        <ServiceGalleryHeaderSection
          eyebrow={data.howItsMade.eyebrow}
          heading={data.howItsMade.heading}
          paragraph={data.howItsMade.content}
          imageUrls={data.howItsMade.imageUrls || []}
        />
      ) : null}

      {/* 4 — Kitchen projects */}
      {projects.length ? (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeaderSplit
              eyebrow={data?.projectsSection?.eyebrow || 'Projects'}
              heading={data?.projectsSection?.heading || 'Recent kitchen projects'}
              intro={data?.projectsSection?.content}
            />
            <ProjectCardsGrid items={projects} />
            <div className="mt-12">
              <Link to="/projects" className="btn-secondary inline-block">
                View all projects
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* 5 — What is included */}
      {data?.whatsIncluded?.items?.length ? (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeaderSplit
              eyebrow={data.whatsIncluded.eyebrow}
              heading={data.whatsIncluded.heading}
            />
            <FeatureGridFramed items={data.whatsIncluded.items} />
          </div>
        </section>
      ) : null}

      {/* 6 — Investment and timescale */}
      {data?.investment?.content || data?.investment?.bands?.length ? (
        <DarkPanelSection
          eyebrow={data.investment.eyebrow}
          heading={data.investment.heading}
          content={data.investment.content}
          rows={data.investment.bands || []}
        />
      ) : null}

      {/* 7 — Common questions */}
      {data?.faqs?.items?.length ? (
        <FaqsAccordionSection
          items={data.faqs.items}
          eyebrow="Common questions"
          heading="Kitchens, answered"
        />
      ) : null}

      {/* 8 — Consultation */}
      <GreenBandCtaSection
        id="kitchens-cta-section"
        heading="Book a design consultation"
        content="We'll visit your home, measure your space, and talk through how a Ward-Smith kitchen could work for you."
        primaryLabel="Book a consultation"
        primaryTo="/contact"
      />
    </>
  )
}
