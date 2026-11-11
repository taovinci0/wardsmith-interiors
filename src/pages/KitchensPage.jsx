import { Link } from 'react-router-dom'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ServiceGalleryHeaderSection } from '../components/sections/ServiceGalleryHeaderSection.jsx'
import { FaqsAccordionSection } from '../components/sections/FaqsAccordionSection.jsx'
import { GreenBandCtaSection } from '../components/sections/GreenBandCtaSection.jsx'
import { ProjectCardsGrid } from '../components/sections/ProjectCardsGrid.jsx'
import { defaultHeroBg } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { kitchensPageQuery } from '../sanity/queries.js'

function TextBlockSection({ eyebrow, heading, content, children, bg = 'bg-white' }) {
  if (!heading && !content) return null
  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-custom">
        <div className="mx-auto max-w-[760px]">
          {eyebrow ? <p className="eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p> : null}
          {heading ? (
            <h2 className="heading-to-body-spacing font-serif text-[2.5rem] leading-tight text-primary">{heading}</h2>
          ) : null}
          {content
            ? String(content)
                .split(/\n{2,}/)
                .map((p) => (
                  <p key={p.slice(0, 32)} className="mb-5 font-sans text-lg font-light leading-relaxed text-neutral-600 last:mb-0">
                    {p}
                  </p>
                ))
            : null}
          {children}
        </div>
      </div>
    </section>
  )
}

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
        <section className="section-padding bg-neutral-100">
          <div className="container-custom">
            <div className="mb-14">
              <p className="eyebrow eyebrow-spacing text-accent-600">{data?.projectsSection?.eyebrow || 'Projects'}</p>
              <h2 className="font-serif text-[2.5rem] text-primary">
                {data?.projectsSection?.heading || 'Recent kitchen projects'}
              </h2>
            </div>
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
        <TextBlockSection eyebrow={data.whatsIncluded.eyebrow} heading={data.whatsIncluded.heading}>
          <ul className="mt-6 space-y-5">
            {data.whatsIncluded.items.map((it) => (
              <li key={it.title} className="border-l-2 border-accent-600 pl-5">
                <p className="font-sans font-medium text-primary">{it.title}</p>
                {it.content ? <p className="font-sans font-light text-neutral-600">{it.content}</p> : null}
              </li>
            ))}
          </ul>
        </TextBlockSection>
      ) : null}

      {/* 6 — Investment and timescale */}
      {data?.investment?.content || data?.investment?.bands?.length ? (
        <TextBlockSection
          eyebrow={data.investment.eyebrow}
          heading={data.investment.heading}
          content={data.investment.content}
          bg="bg-neutral-100"
        >
          {data.investment.bands?.length ? (
            <dl className="mt-8 divide-y divide-neutral-300 border-y border-neutral-300">
              {data.investment.bands.map((b) => (
                <div key={b.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="font-sans text-primary">{b.label}</dt>
                  <dd className="font-sans font-light text-neutral-600">{b.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </TextBlockSection>
      ) : null}

      {/* 7 — Common questions */}
      {data?.faqs?.items?.length ? <FaqsAccordionSection items={data.faqs.items} /> : null}

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
