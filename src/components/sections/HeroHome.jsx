import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useCms } from '../../context/useCms.js'
import { heroHomeDefaults, siteLogoUrl } from '../../data/siteDefaults.js'
import { useHeroIntroAnimation } from '../../hooks/useHeroIntroAnimation.js'

/** Render the heading with the closing phrase in the accent colour, when it matches. */
const ACCENT_PHRASE = 'the people who call them home'

function renderHeading(heading) {
  if (!heading) return heading
  const idx = heading.toLowerCase().indexOf(ACCENT_PHRASE)
  if (idx === -1) return heading
  return (
    <>
      {heading.slice(0, idx)}
      <span className="text-accent-600">{heading.slice(idx, idx + ACCENT_PHRASE.length)}</span>
      {heading.slice(idx + ACCENT_PHRASE.length)}
    </>
  )
}

export function HeroHome() {
  const { home, siteSettings } = useCms()
  const areaCovered = siteSettings?.areaCovered || 'Essex and surrounding areas'
  const {
    eyebrow,
    heading,
    primaryButtonLabel,
    primaryButtonTo,
    secondaryButtonLabel,
    secondaryButtonTo,
    imageUrls,
  } = useMemo(() => {
    const merged = { ...heroHomeDefaults, ...(home?.hero || {}) }
    merged.imageUrls = (merged.imageUrls || []).filter(Boolean)
    if (!merged.imageUrls.length) merged.imageUrls = heroHomeDefaults.imageUrls
    return merged
  }, [home])
  const heroRef = useRef(null)

  const slides =
    imageUrls.length > 0
      ? imageUrls.map((url) => ({ url }))
      : [{ url: null }]

  useHeroIntroAnimation(heroRef)

  useEffect(() => {
    const root = heroRef.current
    if (!root || slides.length <= 1) return undefined

    const slideEls = root.querySelectorAll('.hero-slide')
    if (slideEls.length <= 1) return undefined

    let current = 0
    let intervalId

    const tick = () => {
      gsap.to(slideEls[current], {
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
      current = (current + 1) % slideEls.length
      gsap.fromTo(
        slideEls[current],
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
      )
    }

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(tick, 5000)
    }, 3000)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [slides.length])

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="hero relative h-screen w-full overflow-hidden"
    >
      <div className="hero-slider absolute inset-0 h-full w-full">
        {slides.map((slide, i) => (
          <div
            key={slide.url ?? `gradient-${i}`}
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

      {/* Brandmark watermark — oversized, faded, cropped off the top-right edge */}
      <img
        src={siteLogoUrl}
        alt=""
        aria-hidden
        className="pointer-events-none absolute w-auto"
        style={{
          top: '-12%',
          right: '-6%',
          height: '118%',
          opacity: 0.05,
          filter: 'brightness(0) invert(1)',
        }}
      />

      <div className="hero-content container-custom relative z-10 flex h-full flex-col justify-end pb-10">
        {eyebrow ? (
          <p className="hero-eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p>
        ) : null}

        <h1 className="hero-title mb-9 max-w-[21ch] font-serif text-[2.5rem] leading-[1.1] text-white md:text-[3.375rem]">
          {renderHeading(heading)}
        </h1>

        <div className="hero-buttons flex flex-wrap items-center gap-4">
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

        {/* Proof strip */}
        <div
          className="hero-proof mt-10 flex flex-wrap gap-x-12 gap-y-2 border-t border-white/20 pt-5"
          style={{ textShadow: '0 1px 10px rgba(0, 0, 0, 0.5)' }}
        >
          <p className="m-0 font-sans text-[13px] font-light text-white/90">
            <span className="font-medium text-accent-600">5.0</span>&ensp;Rated on Google Reviews
          </p>
          <p className="m-0 font-sans text-[13px] font-light text-white/90">Made at Wicks Manor, Maldon</p>
          <p className="m-0 font-sans text-[13px] font-light text-white/90">Covering {areaCovered}</p>
        </div>
      </div>
    </section>
  )
}
