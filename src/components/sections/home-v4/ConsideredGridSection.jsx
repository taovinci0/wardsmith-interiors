import { SectionHeaderSplit } from '../SectionHeaderSplit.jsx'

/**
 * "Considered down to the last drawer" — four photo cards, each opening
 * with the numbered serif meta row from the framed-grid language.
 */
export function ConsideredGridSection({ data }) {
  if (!data?.items?.length) return null
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        <SectionHeaderSplit eyebrow={data.eyebrow} heading={data.heading} intro={data.intro} />

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((it, i) => (
            <div key={it.title} className={i % 2 === 1 ? 'lg:mt-12' : ''}>
              <div className="mb-6 overflow-hidden rounded-lg" style={{ aspectRatio: '1 / 1' }}>
                <img src={it.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="mb-3 font-serif text-xl text-accent-600">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mb-2 font-serif text-2xl leading-snug text-primary">{it.title}</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-neutral-600">{it.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
