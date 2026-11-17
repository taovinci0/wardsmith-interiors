/**
 * Framed feature grid — one bordered frame, cells divided by hairlines,
 * each cell opening with a numbered meta row. items: [{ title, content, tag? }]
 */
export function FeatureGridFramed({ items = [], columns = 3 }) {
  if (!items.length) return null
  const colsClass =
    columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-300">
      <div className={`grid grid-cols-1 gap-px ${colsClass}`}>
        {items.map((it, i) => (
          <div key={it.title} className="bg-white p-8">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <span className="font-serif text-xl text-accent-600">{String(i + 1).padStart(2, '0')}</span>
              {it.tag ? (
                <span className="font-sans text-xs font-light tracking-[0.1em] text-neutral-500 uppercase">
                  {it.tag}
                </span>
              ) : null}
            </div>
            <h3 className="mb-2 font-serif text-xl leading-snug text-primary">{it.title}</h3>
            {it.content ? (
              <p className="font-sans text-sm font-light leading-relaxed text-neutral-600">{it.content}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
