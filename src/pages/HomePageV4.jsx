import { Link } from 'react-router-dom'
import { ArrowLink } from '../components/common/ArrowLink.jsx'
import { DarkPanelSection } from '../components/sections/DarkPanelSection.jsx'
import { HeroHome } from '../components/sections/HeroHome.jsx'
import { KitchensHomeSection } from '../components/sections/KitchensHomeSection.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ProjectCardsGrid } from '../components/sections/ProjectCardsGrid.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { WhatWeMakeSection } from '../components/sections/WhatWeMakeSection.jsx'
import { CommitmentsSection } from '../components/sections/home-v4/CommitmentsSection.jsx'
import { GuaranteeBand } from '../components/sections/home-v4/GuaranteeBand.jsx'
import { FinalCtaDualSection } from '../components/sections/home-v4/FinalCtaDualSection.jsx'
import { useCms } from '../context/useCms.js'
import { servicesList, testimonials, testimonialsSection } from '../data/homePageContent.js'
import { homeV4 } from '../data/homeV4Content.js'
import { footerDefaults } from '../data/siteDefaults.js'

/**
 * Homepage v4 = the existing v3 page evolved with the trust pieces from
 * Seb's Nov 2026 wireframe: richer hero proof strip, six commitments
 * (replacing the abstract values), a 3-year guarantee band, and the
 * dual-path closing CTA. Hero, What We Make, Kitchens, projects and
 * living spaces stay as shipped.
 */
export function HomePageV4() {
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

      {/* Six commitments (wireframe) in place of the abstract values list */}
      <CommitmentsSection data={homeV4.promise} bg="bg-white" />

      {home?.selectedProjects?.length ? (
        <section id="home-projects-section" className="section-padding bg-neutral-100">
          <div className="container-custom">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow eyebrow-spacing text-accent-600">Projects</p>
                <h2 className="font-serif text-[2rem] leading-[1.15] text-primary md:text-[2.5rem]">
                  Recent work, room by room.
                </h2>
              </div>
              <ArrowLink to="/projects" className="mb-2">
                View all projects
              </ArrowLink>
            </div>
            <ProjectCardsGrid items={home.selectedProjects.slice(0, 2)} variant="overlay" />
          </div>
        </section>
      ) : null}

      {livingSpaces.length ? (
        <section id="home-living-spaces-section" className="section-padding bg-white">
          <div className="container-custom">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow eyebrow-spacing text-accent-600">Living Spaces</p>
                <h2 className="font-serif text-[2rem] leading-[1.15] text-primary md:text-[2.5rem]">
                  Beyond the kitchen.
                </h2>
              </div>
              <ArrowLink to="/living-spaces" className="mb-2">
                Explore living spaces
              </ArrowLink>
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
          { label: 'Google Reviews', value: 'Rated 5.0 from 56 reviews' },
          { label: 'Guarantee', value: "3 years' workmanship" },
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

      {/* 3-year guarantee (wireframe, Seb's wording) */}
      <GuaranteeBand data={homeV4.guarantee} />

      <TestimonialsSection
        section={homeV4.testimonialsHead}
        items={home?.testimonials?.length ? home.testimonials : testimonials}
        bg="bg-white"
      />

      {/* Dual-path closer (wireframe): two doors, one form */}
      <FinalCtaDualSection data={homeV4.finalCta} />
    </>
  )
}
