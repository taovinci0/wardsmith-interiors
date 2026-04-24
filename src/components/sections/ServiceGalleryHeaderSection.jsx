import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsapClient.js'

/** WP `service-gallery-with-header.php` — header + staggered grid (section-reveals gallery). */
export function ServiceGalleryHeaderSection({ eyebrow, heading, paragraph, imageUrls = [] }) {
  const headerRef = useRef(null)
  const itemsRef = useRef([])

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const ctx = gsap.context(() => {
      const els = itemsRef.current.filter(Boolean)
      if (!els.length) return

      gsap.set(els, { opacity: 0, x: 40 })

      gsap.timeline({
        scrollTrigger: {
          trigger: header.closest('section') || header,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }).to(els, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1,
      }, 0.4)
    }, headerRef)

    return () => ctx.revert()
  }, [imageUrls.length])

  if (!eyebrow && !heading && !paragraph && !imageUrls.length) return null

  return (
    <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container-custom">
        {eyebrow || heading || paragraph ? (
          <div
            ref={headerRef}
            className="gallery-header-animate mx-auto mb-24 max-w-[720px] text-center"
          >
            {eyebrow ? (
              <p className="gallery-header-eyebrow eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p>
            ) : null}
            {heading ? (
              <h2 className="gallery-header-heading heading-to-body-spacing font-serif text-[3rem] text-primary">{heading}</h2>
            ) : null}
            {paragraph ? (
              <p className="gallery-header-body font-sans font-light text-neutral-600">{paragraph}</p>
            ) : null}
          </div>
        ) : null}

        {imageUrls.length ? (
          <div className="gallery-images-container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {imageUrls.map((url, i) => (
              <div
                key={url}
                ref={(el) => {
                  itemsRef.current[i] = el
                }}
                className="gallery-image-item aspect-[4/3] overflow-hidden rounded-[24px]"
              >
                <img src={url} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
