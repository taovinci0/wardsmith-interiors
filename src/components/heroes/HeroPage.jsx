import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useHeroIntroAnimation } from '../../hooks/useHeroIntroAnimation.js'

/**
 * Inner-page hero (WP `hero-page.php` / `hero-service` / archive heroes): 750px, word mask, optional CTAs.
 */
export function HeroPage({
  eyebrow,
  heading,
  imageUrls = [],
  primaryButtonLabel,
  primaryButtonTo,
  secondaryButtonLabel,
  secondaryButtonTo,
  showButtons = true,
  /** Extra hero-content padding-top (contact hero uses ~10rem in WP) */
  contentPaddingTop,
}) {
  const heroRef = useRef(null)
  const slides =
    imageUrls.length > 0
      ? imageUrls.map((url) => ({ url }))
      : [{ url: null }]

  useHeroIntroAnimation(heroRef, [
    heading,
    eyebrow,
    primaryButtonLabel,
    secondaryButtonLabel,
    imageUrls.join(','),
  ])

  const words = heading ? heading.split(' ') : []

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="hero-page relative w-full overflow-hidden"
    >
      <div className="hero-slider absolute inset-0 h-full w-full">
        {slides.map((slide, i) => (
          <div
            key={slide.url ?? `slide-${i}`}
            className={`hero-slide absolute inset-0 h-full w-full ${i === 0 ? '' : 'opacity-0'}`}
            data-slide-index={i}
            style={
              slide.url
                ? {
                    backgroundImage: `url('${slide.url}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : {
                    background:
                      'linear-gradient(135deg, #1a383c 0%, #224a4f 40%, #2d5f65 100%)',
                  }
            }
          />
        ))}
      </div>

      <div className="hero-overlay pointer-events-none absolute inset-0" />

      <div
        className="hero-content container-custom relative z-10 flex h-full flex-col justify-end pb-10"
        style={contentPaddingTop ? { paddingTop: contentPaddingTop } : undefined}
      >
        {eyebrow ? (
          <p className="hero-eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p>
        ) : null}

        {words.length ? (
          <h1 className="hero-title mb-12 flex w-10/12 flex-wrap items-baseline gap-x-[0.35em] gap-y-1 font-serif text-[4rem] leading-[1.05] text-white md:text-[5.5rem]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="hero-title-word inline-block overflow-hidden">
                <span className="hero-title-word-inner inline-block">{word}</span>
              </span>
            ))}
          </h1>
        ) : null}

        {showButtons && (primaryButtonLabel || secondaryButtonLabel) ? (
          <div className="hero-buttons flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-end">
            {primaryButtonLabel && primaryButtonTo ? (
              <Link to={primaryButtonTo} className="btn-primary">
                {primaryButtonLabel}
              </Link>
            ) : null}
            {secondaryButtonLabel && secondaryButtonTo ? (
              <Link to={secondaryButtonTo} className="btn-secondary">
                {secondaryButtonLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
