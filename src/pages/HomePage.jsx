import { Link } from 'react-router-dom'
import { DarkPanelSection } from '../components/sections/DarkPanelSection.jsx'
import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { HeroHome } from '../components/sections/HeroHome.jsx'
import { KitchensHomeSection } from '../components/sections/KitchensHomeSection.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ProjectCardsGrid } from '../components/sections/ProjectCardsGrid.jsx'
import { SectionHeaderSplit } from '../components/sections/SectionHeaderSplit.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { ValuesSection } from '../components/sections/ValuesSection.jsx'
import { WhatWeMakeSection } from '../components/sections/WhatWeMakeSection.jsx'
import { useCms } from '../context/useCms.js'
import { finalCta, servicesList, testimonials, testimonialsSection, valuesItems } from '../data/homePageContent.js'
import { footerDefaults } from '../data/siteDefaults.js'

/**
 * v2 homepage order (design brief, S7): Hero → Kitchens → The Ward-Smith Way
 * (intro + values) → Selected projects → Living Spaces → How it works →
 * Client stories → Consultation.
 */
export function HomePage() {
  const { home, siteSettings } = useCms()
  const livingSpaces = (home?.servicesList?.length ? home.servicesList : servicesList).filter(
    (s) => s.slug !== 'bespoke-kitchens',
  )
  const areaCovered = siteSettings?.areaCovered || footerDefaults.areaCovered || 'Essex and surrounding areas'

  return (
    <>
      <HeroHome />

      <WhatWeMakeSection
        kitchensImageUrl={home?.kitchensSection?.imageUrls?.[0]}
        livingImageUrl={livingSpaces[0]?.imageUrl}
        projectsImageUrl={home?.selectedProjects?.find((p) => p.imageUrl)?.imageUrl}
      />

      <KitchensHomeSection data={home?.kitchensSection} />
      <ProcessIntroSection
        data={{
          ...(home?.processIntro || {}),
          imageAspectClass: 'aspect-[5/4]',
          linkLabel: 'Meet Seb and the team',
          linkTo: '/about-us',
        }}
        bg="bg-white"
      />
      <ValuesSection items={home?.valuesItems?.length ? home.valuesItems : valuesItems} bg="bg-white" />

      {home?.selectedProjects?.length ? (
        <section id="home-projects-section" className="section-padding bg-neutral-100">
          <div className="container-custom">
            <SectionHeaderSplit eyebrow="Projects" heading="Recent work, room by room." />
            <ProjectCardsGrid items={home.selectedProjects} variant="overlay" />
            <div className="mt-12">
              <Link to="/projects" className="btn-secondary inline-block">
                View all projects
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {livingSpaces.length ? (
        <section id="home-living-spaces-section" className="section-padding bg-white">
          <div className="container-custom">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow eyebrow-spacing text-accent-600">Living Spaces</p>
                <h2 className="font-serif text-[2.5rem] text-primary">Beyond the kitchen</h2>
              </div>
              <Link to="/living-spaces" className="btn-secondary inline-block">
                Explore living spaces
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {livingSpaces.slice(0, 4).map((s) => (
                <Link key={s.slug} to="/living-spaces" className="group block">
                  {s.imageUrl ? (
                    <div className="mb-4 aspect-[4/5] overflow-hidden rounded-lg">
                      <img
                        src={s.imageUrl}
                        alt={s.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <p className="font-serif text-xl text-primary transition-colors group-hover:text-accent-600">{s.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <DarkPanelSection
        bg="bg-neutral-100"
        eyebrow={home?.howItWorks?.eyebrow || 'How it works'}
        heading={home?.howItWorks?.heading || 'From first conversation to installation'}
        content="We'll procure the best quality materials and handcraft your build in our specialised workshop — fine tuning all the details with your feedback along the way."
        rows={[
          { label: 'Google Reviews', value: 'Rated 5.0' },
          { label: 'Workshop', value: 'Wicks Manor, Maldon' },
          { label: 'Covering', value: areaCovered },
        ]}
      >
        <Link
          to="/our-approach"
          className="group mt-6 inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent-600 transition-colors hover:text-accent-200"
        >
          <span>{home?.howItWorks?.ctaLabel || 'See our approach'}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </DarkPanelSection>

      <TestimonialsSection
        section={home?.testimonialsSection?.heading ? home.testimonialsSection : testimonialsSection}
        items={home?.testimonials?.length ? home.testimonials : testimonials}
        bg="bg-white"
      />
      <FinalCtaSection data={home?.finalCta?.heading ? home.finalCta : finalCta} />
    </>
  )
}
