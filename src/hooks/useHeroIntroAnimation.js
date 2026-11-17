import { useLayoutEffect } from 'react'
import gsap from 'gsap'

/**
 * Hero entrance. The full cinematic pass (image settles from a soft scale +
 * fade, then eyebrow / title / buttons / proof strip rise) plays once per
 * visit — the very first hero the visitor sees. On client-side navigations
 * the image is shown immediately (no opacity-0 start, so no white flash
 * between pages) and only the content does a quicker, quieter rise.
 * The header is deliberately never animated, and CMS data arriving after
 * mount must not replay the timeline.
 */
let introHasPlayed = false

export function useHeroIntroAnimation(heroRef) {
  useLayoutEffect(() => {
    if (!heroRef.current) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const hero = heroRef.current
    const firstVisit = !introHasPlayed
    introHasPlayed = true

    const ctx = gsap.context(() => {
      if (firstVisit) {
        const firstSlide = hero.querySelector('.hero-slide')
        if (firstSlide) {
          gsap.fromTo(
            firstSlide,
            { scale: 1.05, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
          )
        }
      }

      const content = hero.querySelectorAll('.hero-eyebrow, .hero-title, .hero-buttons, .hero-proof')
      if (content.length) {
        gsap.fromTo(
          content,
          { y: firstVisit ? 24 : 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: firstVisit ? 0.9 : 0.6,
            ease: 'power3.out',
            stagger: firstVisit ? 0.12 : 0.08,
            delay: firstVisit ? 0.25 : 0,
          },
        )
      }
    }, heroRef)

    return () => ctx.revert()
    // Run once per mount: content swaps from CMS re-render in place without replaying.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
