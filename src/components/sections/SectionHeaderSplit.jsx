/**
 * Asymmetric section opener — eyebrow + heading left, supporting intro right.
 * The standard header for sub-page bands (replaces centred text blocks).
 */
export function SectionHeaderSplit({ eyebrow, heading, intro, className = 'mb-14' }) {
  if (!eyebrow && !heading && !intro) return null
  return (
    <div
      className={`grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end lg:gap-16 ${className}`}
    >
      <div>
        {eyebrow ? <p className="eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p> : null}
        {heading ? (
          <h2 className="max-w-[20ch] font-serif text-[2rem] leading-[1.15] text-primary md:text-[2.5rem]">
            {heading}
          </h2>
        ) : null}
      </div>
      {intro ? (
        <p className="font-sans font-light leading-relaxed text-neutral-600 lg:pb-2">{intro}</p>
      ) : null}
    </div>
  )
}
