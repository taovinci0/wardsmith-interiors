import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

export function CaseStudyRelatedSection({ items = [] }) {
  if (!items.length) return null

  return (
    <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container-custom">
        <div className="case-study-related-header-animate mx-auto mb-16 max-w-[720px] text-center">
          <p className="case-study-related-eyebrow eyebrow eyebrow-spacing text-accent-600">Related Projects</p>
          <h2 className="case-study-related-heading heading-to-body-spacing font-serif text-[3rem] text-primary">More Case Studies</h2>
        </div>

        <div className="case-study-related-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <article key={c.slug} className="group">
              <Link to={`/case-studies/${c.slug}`} className="block">
                {c.imageUrl ? (
                  <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[24px]">
                    <img
                      src={c.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <h3 className="mb-2 font-serif text-2xl text-primary transition-colors group-hover:text-accent-600">
                  {c.title}
                </h3>
                {c.location ? (
                  <p className="mb-2 flex items-center gap-1 font-sans text-sm text-neutral-600">
                    <MapPin className="inline h-4 w-4" strokeWidth={1} aria-hidden />
                    {c.location}
                  </p>
                ) : null}
                {c.servicesLine ? (
                  <p className="font-sans text-sm text-neutral-500">{c.servicesLine}</p>
                ) : null}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
