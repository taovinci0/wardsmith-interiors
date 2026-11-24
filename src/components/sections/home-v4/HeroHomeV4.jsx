import { Link } from 'react-router-dom'

/**
 * v4 hero — dark teal ground with a faint CAD elevation drawing (a nod to
 * the drawings every project starts from), serif headline with an italic
 * second line, single primary CTA + quiet secondary, proof strip beneath.
 */
function CadElevation({ className }) {
  const s = { fill: 'none', stroke: '#ffffff', strokeWidth: 1.2, opacity: 0.09 }
  return (
    <svg
      viewBox="0 0 900 640"
      className={className}
      aria-hidden
      preserveAspectRatio="xMaxYMid slice"
    >
      {/* wall cabinets */}
      <rect x="40" y="60" width="150" height="170" {...s} />
      <rect x="55" y="75" width="120" height="140" {...s} />
      <rect x="210" y="60" width="150" height="170" {...s} />
      <rect x="225" y="75" width="120" height="140" {...s} />
      <rect x="560" y="40" width="130" height="200" {...s} />
      <rect x="575" y="55" width="100" height="170" {...s} />
      <rect x="710" y="40" width="130" height="200" {...s} />
      <rect x="725" y="55" width="100" height="170" {...s} />
      {/* extractor arch */}
      <path d="M390 240 L390 140 Q450 70 510 140 L510 240" {...s} />
      <line x1="375" y1="240" x2="525" y2="240" {...s} />
      {/* pendants */}
      <line x1="430" y1="0" x2="430" y2="300" {...s} />
      <path d="M410 300 Q430 326 450 300" {...s} />
      <line x1="620" y1="0" x2="620" y2="280" {...s} />
      <path d="M600 280 Q620 306 640 280" {...s} />
      {/* worktop */}
      <line x1="20" y1="380" x2="880" y2="380" {...s} />
      <line x1="20" y1="392" x2="880" y2="392" {...s} />
      {/* base units with drawer lines */}
      <rect x="40" y="392" width="200" height="190" {...s} />
      <line x1="40" y1="455" x2="240" y2="455" {...s} />
      <line x1="40" y1="518" x2="240" y2="518" {...s} />
      <rect x="250" y="392" width="160" height="190" {...s} />
      <circle cx="330" cy="470" r="3" {...s} />
      <rect x="420" y="392" width="220" height="190" {...s} />
      <line x1="420" y1="488" x2="640" y2="488" {...s} />
      <rect x="650" y="392" width="190" height="190" {...s} />
      <line x1="650" y1="455" x2="840" y2="455" {...s} />
      <line x1="650" y1="518" x2="840" y2="518" {...s} />
    </svg>
  )
}

export function HeroHomeV4({ data }) {
  if (!data) return null
  return (
    <section className="hero relative overflow-hidden" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
      <CadElevation className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[70%] md:block" />

      <div className="container-custom relative pt-40 pb-0 md:pt-48">
        <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
        <h1 className="font-serif text-[2.6rem] leading-[1.08] text-white md:text-[4rem]">
          {data.headingLine1}
          <br />
          <em>{data.headingLine2}</em>
        </h1>
        <p className="mt-7 max-w-[46ch] font-sans font-light leading-relaxed text-neutral-200">
          {data.content}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-7">
          <Link to={data.primaryTo} className="btn-primary">
            {data.primaryLabel}
          </Link>
          <Link
            to={data.secondaryTo}
            className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-accent-600"
          >
            {data.secondaryLabel}
          </Link>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-12 gap-y-3 border-t border-white/15 py-7">
          {data.proofStrip.map((item) => (
            <li key={item} className="font-sans text-[13px] font-light text-neutral-200">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
