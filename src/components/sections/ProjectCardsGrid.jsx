import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const ROOM_LABELS = {
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  'home-office': 'Home office',
  'media-wall': 'Media wall',
  'tailored-space': 'Tailored space',
  'whole-home': 'Whole home',
}

/**
 * Large, consistent project cards — two per row on desktop. Cards without an
 * image are not rendered (a portfolio should look complete and curated).
 */
const CAPTION_GRADIENT =
  'linear-gradient(to top, rgba(12,16,16,0.82) 0%, rgba(12,16,16,0.32) 60%, rgba(12,16,16,0) 100%)'

export function ProjectCardsGrid({ items = [], columnsClass = 'md:grid-cols-2', variant = 'default' }) {
  const withImages = items.filter((p) => p.imageUrl)
  if (!withImages.length) return null

  if (variant === 'overlay') {
    return (
      <div className={`grid grid-cols-1 gap-7 ${columnsClass}`}>
        {withImages.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
          >
            <img
              src={p.imageUrl}
              alt={p.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8" style={{ background: CAPTION_GRADIENT }}>
              {p.location || (p.room && ROOM_LABELS[p.room]) ? (
                <p className="mb-2 font-sans text-[11px] font-light uppercase tracking-[0.1em] text-white/75">
                  {[p.location, p.room && ROOM_LABELS[p.room]].filter(Boolean).join(' · ')}
                </p>
              ) : null}
              <p className="font-serif text-2xl text-white">{p.title}</p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-10 ${columnsClass}`}>
      {withImages.map((p) => (
        <article key={p.slug} className="group">
          <Link to={`/projects/${p.slug}`} className="block">
            <div className="mb-6 aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <h3 className="mb-1 font-serif text-2xl text-primary transition-colors group-hover:text-accent-600">
              {p.title}
            </h3>
            <p className="flex items-center gap-2 font-sans text-sm text-neutral-600">
              {p.location ? (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 shrink-0" strokeWidth={1} aria-hidden />
                  {p.location}
                </span>
              ) : null}
              {p.room && ROOM_LABELS[p.room] ? (
                <span className="text-neutral-500">· {ROOM_LABELS[p.room]}</span>
              ) : null}
            </p>
          </Link>
        </article>
      ))}
    </div>
  )
}

export { ROOM_LABELS }
