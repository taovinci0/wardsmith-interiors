import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsapClient.js'

/**
 * Motion pass for the v4 homepage, in the house language: per-section
 * scroll reveals (fade + 24px rise, power3.out, play once, light stagger
 * inside grids) and a subtle scrubbed parallax on [data-parallax] images.
 * Hero excluded — it has its own entrance. Everything behind
 * prefers-reduced-motion, and nothing is CSS-hidden awaiting JS.
 */
export function useHomeV4Motion(rootRef, ready = true) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !ready) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const ctx = gsap.context(() => {
      const sections = Array.from(root.querySelectorAll('section')).filter(
        (s) => s.id !== 'hero-section',
      )

      sections.forEach((section) => {
        const container = section.querySelector(':scope > .container-custom, :scope > div.container-custom')
        const blocks = []
        const source = container || section
        Array.from(source.children).forEach((child) => {
          if (child.classList.contains('grid') && child.children.length > 1) {
            blocks.push(...Array.from(child.children))
          } else {
            blocks.push(child)
          }
        })
        if (!blocks.length) return

        gsap.set(blocks, { opacity: 0, y: 24 })
        gsap.to(blocks, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })
      })

      root.querySelectorAll('[data-parallax] img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('[data-parallax]'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [rootRef, ready])
}
