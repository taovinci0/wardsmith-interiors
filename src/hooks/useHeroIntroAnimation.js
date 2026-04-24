import { useLayoutEffect } from 'react'
import gsap from 'gsap'

/**
 * Homepage / inner-page hero entrance — matches WordPress `hero.js` timeline.
 */
export function useHeroIntroAnimation(heroRef, deps = []) {
  useLayoutEffect(() => {
    if (!heroRef.current) return undefined

    const hero = heroRef.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      const firstSlide = hero.querySelector('.hero-slide')
      if (firstSlide) {
        gsap.set(firstSlide, { scale: 1.15, opacity: 0 })
        tl.to(
          firstSlide,
          {
            scale: 1,
            opacity: 1,
            duration: 2.2,
            ease: 'expo.out',
          },
          0,
        )
      }

      const header = document.querySelector('.site-header')
      if (header) {
        gsap.set(header, { y: -100, opacity: 0 })
        tl.to(
          header,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
          },
          0.5,
        )
      }

      const titleWords = hero.querySelectorAll('.hero-title-word-inner')
      if (titleWords.length) {
        gsap.set(titleWords, { y: '110%' })
        tl.to(
          titleWords,
          {
            y: '0%',
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.05,
          },
          0.8,
        )
      }

      const eyebrowEl = hero.querySelector('.hero-eyebrow')
      if (eyebrowEl) {
        gsap.set(eyebrowEl, { y: 40, opacity: 0 })
        tl.to(
          eyebrowEl,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
          },
          1.2,
        )
      }

      const buttons = hero.querySelectorAll('.hero-buttons a.btn-primary, .hero-buttons a.btn-secondary')
      if (buttons.length) {
        gsap.set(buttons, { y: 40, opacity: 0 })
        tl.to(
          buttons,
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.1,
          },
          1.2,
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, deps)
}
