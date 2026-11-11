import { Link } from 'react-router-dom'
import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { HeroHome } from '../components/sections/HeroHome.jsx'
import { HowItWorksSection } from '../components/sections/HowItWorksSection.jsx'
import { KitchensHomeSection } from '../components/sections/KitchensHomeSection.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ProjectCardsGrid } from '../components/sections/ProjectCardsGrid.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { ValuesSection } from '../components/sections/ValuesSection.jsx'
import { useCms } from '../context/useCms.js'
import { finalCta, servicesList, testimonials, testimonialsSection, valuesItems } from '../data/homePageContent.js'

/**
 * v2 homepage order (design brief, S7): Hero → Kitchens → The Ward-Smith Way
 * (intro + values) → Selected projects → Living Spaces → How it works →
 * Client stories → Consultation.
 */
export function HomePage() {
  const { home } = useCms()
  const livingSpaces = (home?.servicesList?.length ? home.servicesList : servicesList).filter(
    (s) => s.slug !== 'bespoke-kitchens',
  )

  return (
    <>
      <HeroHome />
      <KitchensHomeSection data={home?.kitchensSection} />
      <ProcessIntroSection data={home?.processIntro} />
      <ValuesSection items={home?.valuesItems?.length ? home.valuesItems : valuesItems} />

      {home?.selectedProjects?.length ? (
        <section id="home-projects-section" className="section-padding bg-white">
          <div className="container-custom">
            <div className="mb-14">
              <p className="eyebrow eyebrow-spacing text-accent-600">Projects</p>
              <h2 className="font-serif text-[2.5rem] text-primary">Selected projects</h2>
            </div>
            <ProjectCardsGrid items={home.selectedProjects} />
            <div className="mt-12">
              <Link to="/projects" className="btn-secondary inline-block">
                View all projects
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {livingSpaces.length ? (
        <section id="home-living-spaces-section" className="section-padding bg-neutral-100">
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

      <HowItWorksSection data={home?.howItWorks} />

      <TestimonialsSection
        section={home?.testimonialsSection?.heading ? home.testimonialsSection : testimonialsSection}
        items={home?.testimonials?.length ? home.testimonials : testimonials}
      />
      <FinalCtaSection data={home?.finalCta?.heading ? home.finalCta : finalCta} />
    </>
  )
}
