import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowLink } from '../common/ArrowLink.jsx'
import { gsap } from '../../lib/gsapClient.js'
import { processIntro as defaultProcessIntro } from '../../data/homePageContent.js'
import { VideoModal } from '../common/VideoModal.jsx'

export function ProcessIntroSection({ data: dataProp, bg = 'bg-neutral-100' } = {}) {
  const data = { ...defaultProcessIntro, ...dataProp }
  const sectionRef = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)

  const hasContent =
    data.eyebrow || data.heading || data.content || data.imageUrl || data.videoUrl

  const showVideoCard = Boolean(data.videoUrl && data.imageUrl && data.enableAnimations)
  const imageAspectClass = data.imageAspectClass || 'aspect-[4/5]'

  useLayoutEffect(() => {
    if (!sectionRef.current || !data.enableAnimations) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const section = sectionRef.current
    const ctx = gsap.context(() => {
      const image = section.querySelector('.process-intro-image')
      const mask = section.querySelector('.process-intro-mask')
      const copy = section.querySelectorAll('.process-intro-reveal')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      if (mask && image) {
        gsap.set(mask, { scaleY: 1, transformOrigin: 'top center' })
        gsap.set(image, { scale: 1.1 })
        tl.to(mask, { scaleY: 0, duration: 1.4, ease: 'expo.out' }, 0)
        tl.to(image, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0)
      }

      if (copy.length) {
        gsap.set(copy, { opacity: 0, y: 24 })
        tl.to(copy, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.15)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [showVideoCard])

  const allParagraphs = data.content
    ? data.content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : []

  // Trailing short paragraphs (up to two) merge into one serif pull-line.
  let pullCount = 0
  while (
    pullCount < 2 &&
    allParagraphs.length - pullCount > 1 &&
    allParagraphs[allParagraphs.length - 1 - pullCount].length <= 130
  ) {
    pullCount += 1
  }
  const paragraphs = pullCount ? allParagraphs.slice(0, -pullCount) : allParagraphs
  const pullLine = pullCount ? allParagraphs.slice(-pullCount).join(' ') : null

  if (!hasContent) {
    return null
  }

  return (
    <section
      id="process-intro-section"
      ref={sectionRef}
      className={`process-intro-section section-padding ${bg}`}
      data-enable-animations={data.enableAnimations ? 'true' : 'false'}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            {data.eyebrow ? (
              <p className="process-intro-reveal eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
            ) : null}

            {data.heading ? (
              <h2 className="process-intro-reveal heading-to-body-spacing max-w-[16ch] font-serif text-[2.25rem] leading-[1.15] text-primary md:text-[3rem]">
                {data.heading}
              </h2>
            ) : null}

            {paragraphs.length || pullLine ? (
              <div className="process-intro-reveal mb-8 max-w-[56ch] font-sans font-light leading-relaxed text-neutral-600">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
                {pullLine ? (
                  <p className="mb-0 mt-7 max-w-[44ch] font-serif text-[1.35rem] leading-[1.45] text-primary">
                    {pullLine}
                  </p>
                ) : null}
              </div>
            ) : null}

            {data.linkLabel && data.linkTo ? (
              <ArrowLink to={data.linkTo} className="process-intro-reveal">
                {data.linkLabel}
              </ArrowLink>
            ) : null}

            {!showVideoCard && data.videoUrl ? (
              <a
                href={data.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="process-intro-reveal process-intro-cta inline-flex items-center gap-3 font-sans text-xsm font-medium uppercase tracking-widest text-primary transition-colors duration-300 hover:text-primary-dark"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-300 text-primary">
                  <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>{data.ctaLabel || 'WATCH OUR PROCESS'}</span>
              </a>
            ) : null}
          </div>

          {data.imageUrl ? (
            <div className="order-1 lg:order-2">
              <div className={`relative overflow-hidden rounded-lg ${imageAspectClass}`}>
                <img
                  src={data.imageUrl}
                  alt={data.heading || 'Process'}
                  className="process-intro-image h-full w-full object-cover"
                />
                {data.enableAnimations ? (
                  <div className={`process-intro-mask pointer-events-none absolute inset-0 z-[1] origin-top ${bg}`} />
                ) : null}
                {showVideoCard ? (
                  <>
                    <div className="absolute inset-0 z-[2] bg-black/30" />
                    <button
                      type="button"
                      className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-0"
                      onClick={() => {
                        setVideoUrl(data.videoUrl)
                        setVideoOpen(true)
                      }}
                    >
                      <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white/90 transition-transform duration-300 hover:scale-110">
                        <svg className="ml-1 block h-8 w-8" fill="#224A4F" viewBox="0 0 24 24" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={videoUrl} />
    </section>
  )
}
