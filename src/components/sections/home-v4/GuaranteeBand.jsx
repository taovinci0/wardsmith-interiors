/**
 * Craftsmanship guarantee — roundel + promise on a quiet light band.
 * data = homeV4.guarantee (3-year workmanship, per Seb Nov 2026).
 */
export function GuaranteeBand({ data, bg = 'bg-neutral-100' }) {
  if (!data) return null
  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-custom">
        <div className="rounded-lg border border-neutral-300 bg-white px-8 py-12 md:px-14">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-primary/25 p-3">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-accent-600 text-primary">
                <span className="font-serif text-5xl leading-none">{data.years}</span>
                <span className="mt-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em]">
                  Year guarantee
                </span>
              </div>
            </div>
            <div>
              <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
              <h2 className="mb-4 font-serif text-[1.7rem] leading-snug text-primary md:text-[2rem]">
                {data.heading}
              </h2>
              <p className="mb-6 max-w-[58ch] font-sans font-light leading-relaxed text-neutral-600">
                {data.content}
              </p>
              <div className="flex flex-wrap gap-x-12 gap-y-2">
                {data.meta.map((m) => (
                  <p key={m} className="font-sans text-sm font-light text-neutral-600">
                    {m}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
