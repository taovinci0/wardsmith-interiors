import { Link } from 'react-router-dom'

/**
 * Homepage section — "How it works, in brief". Three static steps and a link
 * to the full Our Approach page.
 */
export function HowItWorksSection({ data }) {
  if (!data?.steps?.length) return null

  return (
    <section id="home-how-it-works-section" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <div className="mb-14 max-w-[720px]">
          {data.eyebrow ? <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p> : null}
          <h2 className="font-serif text-[2.5rem] leading-tight text-primary">{data.heading}</h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {data.steps.map((s, i) => (
            <div key={s.title}>
              <p className="mb-3 font-serif text-4xl text-accent-600">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mb-2 font-serif text-xl text-primary">{s.title}</h3>
              <p className="font-sans font-light leading-relaxed text-neutral-600">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/our-approach" className="btn-secondary inline-block">
            {data.ctaLabel || 'See our approach'}
          </Link>
        </div>
      </div>
    </section>
  )
}
