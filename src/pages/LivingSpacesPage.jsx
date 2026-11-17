import { ArrowLink } from '../components/common/ArrowLink.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { GreenBandCtaSection } from '../components/sections/GreenBandCtaSection.jsx'
import { defaultHeroBg } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { livingSpacesPageQuery } from '../sanity/queries.js'

export function LivingSpacesPage() {
  const { data } = useSanityData(livingSpacesPageQuery)
  const hero = data?.hero
  const spaces = data?.spaces || []

  return (
    <>
      <HeroPage
        eyebrow={hero?.eyebrow || 'Living Spaces'}
        heading={hero?.heading || 'The same standard, throughout the home'}
        imageUrls={[hero?.imageUrl || defaultHeroBg]}
        showButtons={false}
      />

      {hero?.intro ? (
        <section className="bg-white" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
          <div className="container-custom">
            <p className="mx-auto max-w-[760px] font-serif text-2xl font-light leading-relaxed text-primary">
              {hero.intro}
            </p>
          </div>
        </section>
      ) : null}

      {spaces.map((space, i) => (
        <section key={space.title} className={`section-padding ${i % 2 ? 'bg-neutral-100' : 'bg-white'}`}>
          <div className="container-custom">
            <div className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${i % 2 ? 'lg:[direction:rtl]' : ''}`}>
              <div className="lg:[direction:ltr]">
                {space.imageUrls?.length ? (
                  <div className="grid gap-6">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg">
                      <img src={space.imageUrls[0]} alt={space.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    {space.imageUrls.length > 1 ? (
                      <div className="grid grid-cols-2 gap-6">
                        {space.imageUrls.slice(1, 3).map((u) => (
                          <div key={u} className="aspect-square overflow-hidden rounded-lg">
                            <img src={u} alt="" className="h-full w-full object-cover" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="lg:[direction:ltr]">
                <p className="mb-4 font-serif text-xl text-accent-600">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="heading-to-body-spacing max-w-[16ch] font-serif text-[2rem] leading-[1.15] text-primary md:text-[2.5rem]">
                  {space.title}
                </h2>
                {String(space.content || '')
                  .split(/\n{2,}/)
                  .map((p) => (
                    <p key={p.slice(0, 32)} className="mb-5 max-w-[52ch] font-sans text-lg font-light leading-relaxed text-neutral-600">
                      {p}
                    </p>
                  ))}
                {space.relatedProject?.slug ? (
                  <ArrowLink to={`/projects/${space.relatedProject.slug}`} className="mt-2">
                    See a related project
                  </ArrowLink>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ))}

      <GreenBandCtaSection
        id="living-spaces-cta-section"
        heading="Have a space in mind?"
        content="Tell us about the room and we'll talk through what's possible — storage, finishes, budget and timings."
        primaryLabel="Book a consultation"
        primaryTo="/contact"
      />
    </>
  )
}
