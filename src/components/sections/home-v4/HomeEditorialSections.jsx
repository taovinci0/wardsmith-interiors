import { ArrowLink } from '../../common/ArrowLink.jsx'

/**
 * The two editorial text/image moments at the top of the v4 homepage:
 * "rooms first" (text left, portrait detail right) and "finest work"
 * (large image left, text right).
 */
export function RoomsFirstSection({ data }) {
  if (!data) return null
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-24">
        <div>
          <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
          <h2 className="heading-to-body-spacing max-w-[18ch] font-serif text-[2.2rem] leading-[1.12] text-primary md:text-[3rem]">
            {data.heading}
          </h2>
          {data.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mb-4 max-w-[52ch] font-sans font-light leading-relaxed text-neutral-600 last:mb-0">
              {p}
            </p>
          ))}
        </div>
        <div className="overflow-hidden rounded-lg lg:mt-6" style={{ aspectRatio: '4 / 5' }}>
          <img src={data.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

export function FinestWorkSection({ data }) {
  if (!data) return null
  return (
    <section className="section-padding bg-neutral-100 pt-0">
      <div className="container-custom grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-24">
        <div className="overflow-hidden rounded-lg" style={{ aspectRatio: '1 / 1' }}>
          <img src={data.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
          <h2 className="heading-to-body-spacing max-w-[14ch] font-serif text-[2.2rem] leading-[1.12] text-primary md:text-[2.8rem]">
            {data.heading}
          </h2>
          {data.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mb-4 font-sans font-light leading-relaxed text-neutral-600">
              {p}
            </p>
          ))}
          <ArrowLink to={data.linkTo} className="mt-4">
            {data.linkLabel}
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}
