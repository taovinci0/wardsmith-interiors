import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsapClient.js'
import { SectionHeaderSplit } from './SectionHeaderSplit.jsx'

/** Split header + staggered detail-photography grid. */
export function ServiceGalleryHeaderSection({ eyebrow, heading, paragraph, imageUrls = [] }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll('.gallery-image-item')
      if (!els.length) return

      gsap.fromTo(
        els,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [imageUrls.length])

  if (!eyebrow && !heading && !paragraph && !imageUrls.length) return null

  return (
    <section ref={sectionRef} className="section-padding bg-neutral-100">
      <div className="container-custom">
        <SectionHeaderSplit eyebrow={eyebrow} heading={heading} intro={paragraph} />

        {imageUrls.length ? (
          <div className="gallery-images-container grid grid-cols-1 gap-8 md:grid-cols-3">
            {imageUrls.map((url, i) => (
              <div
                key={url}
                className={`gallery-image-item overflow-hidden rounded-lg ${
                  i % 3 === 1 ? 'aspect-[4/5] md:mt-12' : 'aspect-[4/5]'
                }`}
              >
                <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
