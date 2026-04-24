import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useCms } from '../../context/useCms.js'
import { heroHomeDefaults } from '../../data/siteDefaults.js'
import { useHeroIntroAnimation } from '../../hooks/useHeroIntroAnimation.js'

export function HeroHome() {
  const { home } = useCms()
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
    if (!merged.imageUrls?.length) merged.imageUrls = heroHomeDefaults.imageUrls
    return merged
  }, [home])

  const words = heading.split(' ')
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

      <div className="hero-content container-custom relative z-10 flex h-full flex-col justify-end pb-10">
        {eyebrow ? (
          <p className="hero-eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p>
        ) : null}

        <h1 className="hero-title mb-12 flex w-10/12 flex-wrap items-baseline gap-x-[0.35em] gap-y-1 font-serif text-[4rem] leading-[1.05] text-white md:text-[5.5rem]">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="hero-title-word inline-block overflow-hidden">
              <span className="hero-title-word-inner inline-block">{word}</span>
            </span>
          ))}
        </h1>

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
      </div>
    </section>
  )
}
