import { useEffect, useState } from 'react'

/**
 * Mirrors header-scroll.js: ScrollTrigger attaches after hero intro (~3s) to avoid fighting GSAP hero.
 */
export function useHeaderScrolled() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const delayMs = 3000

    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const id = window.setTimeout(() => {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }, delayMs)

    return () => {
      window.clearTimeout(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return scrolled
}
