/**
 * "The rooms you use most" — full-width editorial statement (heading left,
 * copy right), then an asymmetric image pairing: small portrait + wide
 * landscape with caption. Matches the approved canvas.
 */
export function RoomsFirstSection({ data }) {
  if (!data) return null
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
          <div>
            <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
            <h2 className="max-w-[16ch] font-serif text-[2.2rem] leading-[1.15] text-primary md:text-[3rem]">
              {data.heading}
            </h2>
          </div>
          <div className="max-w-[44ch] lg:pb-1.5">
            {data.paragraphs.map((p, i) => (
              <p
                key={p.slice(0, 32)}
                className={`mb-4 font-sans font-light leading-relaxed last:mb-0 ${
                  i === data.paragraphs.length - 1 ? 'text-primary' : 'text-neutral-600'
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <figure className="m-0 md:self-end">
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img src={data.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            {data.imageCaption ? (
              <figcaption className="mt-3 font-sans text-xs font-light uppercase tracking-[0.1em] text-neutral-500">
                {data.imageCaption}
              </figcaption>
            ) : null}
          </figure>
          {data.wideImageUrl ? (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img src={data.wideImageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
