const PLUS_GRID = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v8M8 12h8' stroke='%23FFFFFF' stroke-width='1' fill='none' opacity='0.1'/%3E%3C/svg%3E")`

/**
 * Dark teal panel on a light band — for investment, guarantees, "why us" moments.
 * Carries the brand plus-grid texture. rows: [{ label, value }]
 */
export function DarkPanelSection({ eyebrow, heading, content, rows = [], bg = 'bg-white', children }) {
  if (!heading && !content && !rows.length) return null
  const paragraphs = content
    ? String(content).split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
    : []

  return (
    <section className={`section-padding ${bg}`}>
      <div className="container-custom">
        <div
          className="relative overflow-hidden rounded-lg bg-primary px-8 py-14 md:px-14"
          style={{ backgroundImage: PLUS_GRID }}
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              {eyebrow ? <p className="eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p> : null}
              {heading ? (
                <h2 className="heading-to-body-spacing max-w-[18ch] font-serif text-[2rem] leading-[1.15] text-white md:text-[2.5rem]">
                  {heading}
                </h2>
              ) : null}
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)} className="mb-4 font-sans font-light leading-relaxed text-neutral-100 last:mb-0">
                  {p}
                </p>
              ))}
              {children}
            </div>
            {rows.length ? (
              <dl className="self-center divide-y divide-white/10 border-y border-white/10">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="font-sans text-white">{r.label}</dt>
                    <dd className="text-right font-serif text-xl text-accent-600">{r.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
