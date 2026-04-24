import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsapClient.js'

/**
 * Matches WordPress `section-reveals.js` buildReveal():
 * eyebrow 0s / heading 0.1s / body 0.25s / buttons 0.35s + stagger 0.1
 */
export function useSectionReveal(triggerRef, variant) {
  useLayoutEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    let eyebrow
    let heading
    let body
    let buttons

    if (variant === 'usp') {
      eyebrow = trigger.querySelector('.usp-animate-eyebrow')
      heading = trigger.querySelector('.usp-animate-heading')
      body = trigger.querySelector('.usp-animate-body')
      buttons = trigger.querySelectorAll('.usp-animate-cta a')
    } else if (variant === 'finalCta') {
      eyebrow = null
      heading = trigger.querySelector('.final-cta-heading')
      body = trigger.querySelector('.final-cta-body')
      buttons = trigger.querySelectorAll('.final-cta-buttons a')
    } else if (variant === 'meetTeam') {
      eyebrow = trigger.querySelector('.meet-the-team-eyebrow')
      heading = trigger.querySelector('.meet-the-team-heading')
      body = trigger.querySelector('.meet-the-team-body')
      buttons = null
    } else {
      return undefined
    }

    const buttonEls = buttons?.length ? Array.from(buttons) : []
    const toInit = [eyebrow, heading, body, ...buttonEls].filter(Boolean)

    const ctx = gsap.context(() => {
      if (toInit.length) {
        gsap.set(toInit, { opacity: 0, y: 40 })
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      if (eyebrow) {
        timeline.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, 0)
      }
      if (heading) {
        timeline.to(heading, { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, 0.1)
      }
      if (body) {
        timeline.to(body, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, 0.25)
      }
      if (buttonEls.length) {
        timeline.to(buttonEls, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1 }, 0.35)
      }
    }, triggerRef)

    return () => ctx.revert()
  }, [triggerRef, variant])
}
