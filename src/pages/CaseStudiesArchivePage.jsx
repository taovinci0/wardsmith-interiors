import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { caseStudiesArchive, caseStudiesSeed } from '../data/innerPagesContent.js'

export function CaseStudiesArchivePage() {
  const { hero } = caseStudiesArchive

  return (
    <>
      <HeroPage
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        imageUrls={hero.imageUrls}
        showButtons={false}
      />
      <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container-custom">
          <div className="case-studies-archive-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudiesSeed.map((cs) => (
              <article key={cs.slug} className="group">
                <Link to={`/case-studies/${cs.slug}`} className="block">
                  <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[24px]">
                    <img
                      src={cs.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mb-2 font-serif text-2xl text-primary transition-colors group-hover:text-accent-600">
                    {cs.title}
                  </h2>
                  {cs.location ? (
                    <p className="mb-2 flex items-center gap-1 font-sans text-sm text-neutral-600">
                      <MapPin className="h-4 w-4 shrink-0" strokeWidth={1} aria-hidden />
                      {cs.location}
                    </p>
                  ) : null}
                  {cs.servicesLine ? (
                    <p className="font-sans text-sm text-neutral-500">{cs.servicesLine}</p>
                  ) : null}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
