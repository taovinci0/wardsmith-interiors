import { useLayoutEffect } from 'react'
import gsap from 'gsap'

/**
 * Hero entrance — one gentle pass per mount: the image settles (soft scale +
 * fade), then eyebrow / title / buttons / proof strip rise in sequence.
 * The header is deliberately never animated, and CMS data arriving after
 * mount must not replay the timeline.
 */
export function useHeroIntroAnimation(heroRef) {
  useLayoutEffect(() => {
    if (!heroRef.current) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const hero = heroRef.current
    const ctx = gsap.context(() => {
      const firstSlide = hero.querySelector('.hero-slide')
      if (firstSlide) {
        gsap.fromTo(
          firstSlide,
          { scale: 1.05, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
        )
      }

      const content = hero.querySelectorAll('.hero-eyebrow, .hero-title, .hero-buttons, .hero-proof')
      if (content.length) {
        gsap.fromTo(
          content,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.25 },
        )
      }
    }, heroRef)

    return () => ctx.revert()
    // Run once per mount: content swaps from CMS re-render in place without replaying.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
