import { ArrowLink } from '../../common/ArrowLink.jsx'

/** "A big decision should never feel like a leap of faith" — heading +
 * workshop photo, then the five numbered steps along a hairline. */
export function ApproachStripSection({ data }) {
  if (!data?.steps?.length) return null
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-24">
          <div>
            <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
            <h2 className="heading-to-body-spacing max-w-[18ch] font-serif text-[2.2rem] leading-[1.12] text-primary md:text-[3rem]">
              {data.heading}
            </h2>
            <p className="font-sans font-light leading-relaxed text-neutral-600">{data.intro}</p>
          </div>
          <figure>
            <div className="overflow-hidden rounded-lg" style={{ aspectRatio: '4 / 3' }}>
              <img src={data.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <figcaption className="mt-3 font-sans text-xs font-light uppercase tracking-[0.1em] text-neutral-500">
              {data.imageCaption}
            </figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 border-t border-neutral-300 pt-12 sm:grid-cols-2 lg:grid-cols-5">
          {data.steps.map((st, i) => (
            <div key={st.title}>
              <p className="mb-4 font-serif text-2xl text-accent-600">{i + 1}</p>
              <h3 className="mb-2 font-serif text-xl leading-snug text-primary md:text-2xl">{st.title}</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-neutral-600">{st.content}</p>
            </div>
          ))}
        </div>

        <ArrowLink to={data.linkTo} className="mt-12">
          {data.linkLabel}
        </ArrowLink>
      </div>
    </section>
  )
}
