import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { GreenBandCtaSection } from '../components/sections/GreenBandCtaSection.jsx'
import { SectionHeaderSplit } from '../components/sections/SectionHeaderSplit.jsx'
import { DarkPanelSection } from '../components/sections/DarkPanelSection.jsx'
import { defaultHeroBg } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { ourApproachPageQuery } from '../sanity/queries.js'

/** Editorial prose band — heading column left, running copy right. */
function ProseSection({ eyebrow, heading, content, bg = 'bg-white' }) {
  if (!content) return null
  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <div>
            {eyebrow ? <p className="eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p> : null}
            {heading ? (
              <h2 className="font-serif text-[2rem] leading-[1.15] text-primary md:text-[2.5rem]">{heading}</h2>
            ) : null}
          </div>
          <div className="max-w-[62ch] border-t border-neutral-300 pt-8 lg:border-t-0 lg:pt-1">
            {String(content)
              .split(/\n{2,}/)
              .map((p) => (
                <p key={p.slice(0, 32)} className="mb-5 font-sans text-lg font-light leading-relaxed text-neutral-600 last:mb-0">
                  {p}
                </p>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function OurApproachPage() {
  const { data } = useSanityData(ourApproachPageQuery)
  const hero = data?.hero
  const steps = data?.process?.steps || []

  return (
    <>
      <HeroPage
        eyebrow={hero?.eyebrow || 'Our Approach'}
        heading={hero?.heading || 'How a Ward-Smith project runs'}
        imageUrls={[hero?.imageUrl || defaultHeroBg]}
        showButtons={false}
      />

      {/* 1 — The Ward-Smith Way */}
      <ProcessIntroSection
        data={
          data?.wardSmithWay
            ? {
                eyebrow: data.wardSmithWay.eyebrow,
                heading: data.wardSmithWay.heading,
                content: data.wardSmithWay.content,
                imageUrl: data.wardSmithWay.imageUrl,
                videoUrl: data.wardSmithWay.videoUrl,
                imageAspectClass: 'aspect-square',
                enableAnimations: false,
              }
            : undefined
        }
      />

      {/* 2 — Process, step by step (static, numbered — no pinned scrolling) */}
      {steps.length ? (
        <section className="section-padding bg-neutral-100">
          <div className="container-custom">
            <SectionHeaderSplit
              eyebrow={data?.process?.eyebrow || 'The Process'}
              heading={data?.process?.heading}
              intro={data?.process?.tagline}
            />
            <ol className="space-y-16">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="grid grid-cols-1 items-center gap-10 border-t border-neutral-300 pt-12 lg:grid-cols-2 lg:gap-20"
                >
                  <div className={i % 2 ? 'lg:order-2' : ''}>
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                      <span className="font-serif text-2xl text-accent-600">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-sans text-xs font-light tracking-[0.1em] text-neutral-500 uppercase">
                        Step {i + 1} of {steps.length}
                      </span>
                    </div>
                    <h3 className="mb-3 font-serif text-[2rem] leading-[1.2] text-primary">{s.title}</h3>
                    <p className="max-w-[52ch] font-sans text-lg font-light leading-relaxed text-neutral-600">
                      {s.description}
                    </p>
                  </div>
                  {s.imageUrl ? (
                    <div className={`aspect-[4/3] overflow-hidden rounded-lg ${i % 2 ? 'lg:order-1' : ''}`}>
                      <img src={s.imageUrl} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 3 — Investment guidance (dark panel moment) */}
      {data?.investment?.content ? (
        <DarkPanelSection
          eyebrow={data.investment.eyebrow}
          heading={data.investment.heading}
          content={data.investment.content}
        />
      ) : null}

      {/* 4 — Aftercare */}
      <ProseSection
        eyebrow={data?.aftercare?.eyebrow}
        heading={data?.aftercare?.heading}
        content={data?.aftercare?.content}
        bg="bg-neutral-100"
      />

      {/* 5 — Consultation */}
      <GreenBandCtaSection
        id="approach-cta-section"
        heading="Ready to start the conversation?"
        content="Book a complimentary design consultation — we'll walk through your space, your ideas and what happens next."
        primaryLabel="Book a consultation"
        primaryTo="/contact"
      />
    </>
  )
}
