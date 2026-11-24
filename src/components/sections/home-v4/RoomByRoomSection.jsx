import { ArrowLink } from '../../common/ArrowLink.jsx'
import { SectionHeaderSplit } from '../SectionHeaderSplit.jsx'

/** "The same care, room by room" — four portrait cards for the rest of the home. */
export function RoomByRoomSection({ data }) {
  if (!data?.items?.length) return null
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        <SectionHeaderSplit eyebrow={data.eyebrow} heading={data.heading} intro={data.intro} />

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((it) => (
            <div key={it.title}>
              <div className="mb-6 overflow-hidden rounded-lg" style={{ aspectRatio: '3 / 4' }}>
                <img src={it.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="mb-2 font-serif text-2xl leading-snug text-primary">{it.title}</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-neutral-600">{it.content}</p>
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
