import { Link } from 'react-router-dom'

const PLUS_CORNER = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v8M8 12h8' stroke='%23FFFFFF' stroke-width='1' fill='none' opacity='0.22'/%3E%3C/svg%3E")`
const CORNER_MASK =
  'radial-gradient(ellipse at top right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 45%, rgba(0, 0, 0, 0) 80%)'

/**
 * Closing band — one destination (the enquiry form), two doors in. The
 * plus-grid appears once on the page, as a masked corner field in the
 * band's empty top-right. Lead card on accent-200 (peach), second on
 * surface-100, per the design-system dual-path rule.
 */
export function FinalCtaDualSection({ data }) {
  if (!data) return null
  return (
    <section className="section-padding relative overflow-hidden bg-primary">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[78%] w-[46%]"
        style={{ backgroundImage: PLUS_CORNER, WebkitMaskImage: CORNER_MASK, maskImage: CORNER_MASK }}
      />
      <div className="container-custom relative">
        <h2 className="mb-6 font-serif text-[2.6rem] leading-[1.08] text-white md:text-[3.6rem]">
          {data.heading}
        </h2>
        <p className="mb-14 max-w-[54ch] font-sans font-light leading-relaxed text-neutral-200">
          {data.content}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.cards.map((card) => (
            <div
              key={card.heading}
              className={`rounded-lg p-9 md:p-12 ${card.tone === 'peach' ? 'bg-accent-200' : 'bg-neutral-100'}`}
            >
              <h3 className="mb-4 font-serif text-2xl leading-snug text-primary md:text-[1.8rem]">
                {card.heading}
              </h3>
              <p
                className="mb-8 font-sans text-sm font-light leading-relaxed md:text-base"
                style={card.tone === 'peach' ? { color: '#44403a' } : undefined}
              >
                {card.content}
              </p>
              <Link to={card.to} className={card.tone === 'peach' ? 'btn-primary-dark' : 'btn-primary'}>
                {card.buttonLabel}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 font-sans text-sm font-light text-neutral-200">{data.footnote}</p>
      </div>
    </section>
  )
}
