import { Link } from 'react-router-dom'

/**
 * "A big decision should never feel like a leap of faith" — heading +
 * workshop photo, then the five steps in the framed hairline grid (3 + 2),
 * with the sixth cell as a warm-grey CTA tile.
 */
export function ApproachStripSection({ data }) {
  if (!data?.steps?.length) return null
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-24">
          <div>
            <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
            <h2 className="heading-to-body-spacing max-w-[18ch] font-serif text-[2.2rem] leading-[1.12] text-primary md:text-[3rem]">
              {data.heading}
            </h2>
            <p className="font-sans font-light leading-relaxed text-neutral-600">{data.intro}</p>
          </div>
          <figure className="m-0">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img src={data.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <figcaption className="mt-3 font-sans text-xs font-light uppercase tracking-[0.1em] text-neutral-500">
              {data.imageCaption}
            </figcaption>
          </figure>
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-300">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {data.steps.map((st, i) => (
              <div key={st.title} className="bg-white p-10">
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span className="font-serif text-xl text-accent-600">{String(i + 1).padStart(2, '0')}</span>
                  {st.tag ? (
                    <span className="font-sans text-[11px] font-medium tracking-[0.12em] text-neutral-500 uppercase">
                      {st.tag}
                    </span>
                  ) : null}
                </div>
                <h3 className="mb-2 font-serif text-[1.75rem] leading-tight text-primary">{st.title}</h3>
                <p className="max-w-[40ch] font-sans text-[15px] font-light leading-relaxed text-neutral-600">
                  {st.content}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-between gap-6 bg-neutral-200 p-10">
              <p className="font-serif text-[1.75rem] leading-snug text-primary">{data.ctaLine}</p>
              <Link
                to={data.linkTo}
                className="inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary underline decoration-primary/35 decoration-1 underline-offset-[6px] transition-colors hover:text-accent-600"
              >
                <span>{data.linkLabel}</span>
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
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
