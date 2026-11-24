import { Link } from 'react-router-dom'

const PLUS_GRID = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v8M8 12h8' stroke='%23FFFFFF' stroke-width='1' fill='none' opacity='0.1'/%3E%3C/svg%3E")`

/**
 * Closing band — one destination (the enquiry form), two doors in:
 * "arrange a call" and "send us your plans". Both carry an intent
 * param so the form can preselect the journey.
 */
export function FinalCtaDualSection({ data }) {
  if (!data) return null
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-primary-dark)', backgroundImage: PLUS_GRID }}
    >
      <div className="container-custom">
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
              className={
                card.tone === 'light'
                  ? 'rounded-lg bg-neutral-100 p-9 md:p-12'
                  : 'rounded-lg border border-white/25 p-9 md:p-12'
              }
            >
              <h3
                className={`mb-4 font-serif text-2xl leading-snug md:text-[1.8rem] ${
                  card.tone === 'light' ? 'text-primary' : 'text-white'
                }`}
              >
                {card.heading}
              </h3>
              <p
                className={`mb-8 font-sans text-sm font-light leading-relaxed md:text-base ${
                  card.tone === 'light' ? 'text-neutral-600' : 'text-neutral-200'
                }`}
              >
                {card.content}
              </p>
              <Link to={card.to} className={card.tone === 'light' ? 'btn-primary-dark' : 'btn-primary'}>
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
