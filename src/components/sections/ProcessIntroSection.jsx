import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsapClient.js'
import { processIntro as defaultProcessIntro } from '../../data/homePageContent.js'
import { VideoModal } from '../common/VideoModal.jsx'

export function ProcessIntroSection({ data: dataProp } = {}) {
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
      const imageWrapper = section.querySelector('.process-intro-image-wrapper')
      const image = section.querySelector('.process-intro-image')
      const mask = section.querySelector('.process-intro-mask')
      const eyebrow = section.querySelector('.process-intro-eyebrow')
      const heading = section.querySelector('.process-intro-heading')
      const body = section.querySelector('.process-intro-body')
      const cta = section.querySelector('.process-intro-cta')

      if (!imageWrapper || !image || !mask) return

      gsap.set(mask, {
        scaleY: 1,
        transformOrigin: 'top center',
        display: 'block',
        opacity: 1,
      })
      gsap.set(image, { scale: 1.1 })

      if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 20 })
      if (heading) {
        const words = heading.querySelectorAll('.process-intro-title-word-inner')
        if (words.length) gsap.set(words, { y: '110%' })
      }
      if (body) gsap.set(body, { opacity: 0, y: 20 })
      if (cta) gsap.set(cta, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        mask,
        { scaleY: 1, transformOrigin: 'top center' },
        { scaleY: 0, duration: 1.4, ease: 'expo.out', transformOrigin: 'top center' },
        0,
      )
      tl.fromTo(image, { scale: 1.1 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0)

      if (eyebrow) {
        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.1)
      }
      if (heading) {
        const words = heading.querySelectorAll('.process-intro-title-word-inner')
        if (words.length) {
          tl.to(words, { y: '0%', duration: 1.5, ease: 'power4.out', stagger: 0.03 }, 0.2)
        }
      }
      if (body) {
        tl.to(body, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.4)
      }
      if (cta) {
        tl.to(cta, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [showVideoCard])

  const paragraphs = data.content
    ? data.content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : []

  const headingWords = data.heading ? data.heading.split(' ') : []

  if (!hasContent) {
    return null
  }

  return (
    <section
      id="process-intro-section"
      ref={sectionRef}
      className="process-intro-section section-padding bg-neutral-100"
      data-enable-animations={data.enableAnimations ? 'true' : 'false'}
    >
      <div className="container-custom">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <div className="order-2 flex-1 md:order-1 md:w-auto">
            {data.eyebrow ? (
              <p
                className="process-intro-eyebrow eyebrow eyebrow-spacing"
                style={{ color: '#D8B08C' }}
              >
                {data.eyebrow}
              </p>
            ) : null}

            {data.heading ? (
              <h2 className="process-intro-heading heading-to-body-spacing flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1 font-serif text-[3rem] leading-[1.15] text-primary md:text-[3.75rem]">
                {headingWords.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="process-intro-title-word inline-block overflow-hidden"
                    style={{ verticalAlign: 'bottom' }}
                  >
                    <span className="process-intro-title-word-inner inline-block">{word}</span>
                  </span>
                ))}
              </h2>
            ) : null}

            {paragraphs.length ? (
              <div className="process-intro-body mb-8 max-w-md font-sans font-light text-neutral-600">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}

            {!showVideoCard && data.videoUrl ? (
              <a
                href={data.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="process-intro-cta inline-flex items-center gap-3 font-sans text-xsm font-medium uppercase tracking-widest text-primary transition-colors duration-300 hover:text-primary-dark"
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

          {showVideoCard && data.imageUrl ? (
            <div className="relative order-1 flex-1 md:order-2 md:w-auto">
              <div
                className="process-intro-image-container relative mx-auto"
                style={{ overflow: 'visible' }}
              >
                <div
                  className={`process-intro-image-wrapper relative ${imageAspectClass}`}
                  style={{
                    borderRadius: '2rem',
                    width: '85%',
                    maxWidth: '500px',
                    margin: '0 auto',
                  }}
                >
                  <div
                    className="process-intro-border pointer-events-none absolute"
                    style={{
                      top: '-1.5rem',
                      left: '-1.5rem',
                      width: '100%',
                      height: '100%',
                      border: '2px solid #E5CEBA',
                      borderRadius: '2rem',
                      zIndex: 0,
                    }}
                  />
                  <div
                    className="relative z-10 h-full w-full overflow-hidden"
                    style={{ borderRadius: '2rem' }}
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.heading || 'Process'}
                      className="process-intro-image h-full w-full object-cover"
                      style={{ borderRadius: '2rem' }}
                    />
                    {data.enableAnimations ? (
                      <div
                        className="process-intro-mask pointer-events-none absolute inset-0 z-[1]"
                        style={{
                          borderRadius: '2rem',
                          backgroundColor: '#F7F5F2',
                          transformOrigin: 'top center',
                        }}
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 z-[2] bg-black/30"
                      style={{ borderRadius: '2rem' }}
                    />
                    <button
                      type="button"
                      className="process-intro-video-trigger absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-0"
                      style={{ borderRadius: '2rem' }}
                      onClick={() => {
                        setVideoUrl(data.videoUrl)
                        setVideoOpen(true)
                      }}
                    >
                      <div
                        className="mb-3 flex h-28 w-28 items-center justify-center rounded-full font-serif text-2xl backdrop-blur-md transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: '2px solid rgba(34, 74, 79, 0.3)',
                        }}
                      >
                        <svg className="ml-1 block h-14 w-14" fill="#224A4F" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p
                        className="eyebrow font-sans text-sm uppercase tracking-widest text-white"
                        style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                      >
                        Watch Video
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : data.imageUrl ? (
            <div className="relative order-1 flex-1 md:order-2 md:w-auto">
              <div className="process-intro-image-container relative mx-auto" style={{ overflow: 'visible' }}>
                <div
                  className={`process-intro-image-wrapper relative ${imageAspectClass}`}
                  style={{
                    borderRadius: '2rem',
                    width: '85%',
                    maxWidth: '500px',
                    margin: '0 auto',
                  }}
                >
                  <div
                    className="process-intro-border pointer-events-none absolute"
                    style={{
                      top: '-1.5rem',
                      left: '-1.5rem',
                      width: '100%',
                      height: '100%',
                      border: '2px solid #E5CEBA',
                      borderRadius: '2rem',
                      zIndex: 0,
                    }}
                  />
                  <div
                    className="relative z-10 h-full w-full overflow-hidden"
                    style={{ borderRadius: '2rem' }}
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.heading || 'Process'}
                      className="process-intro-image h-full w-full object-cover"
                      style={{ display: 'block', borderRadius: '2rem' }}
                    />
                    {data.enableAnimations ? (
                      <div
                        className="process-intro-mask pointer-events-none absolute inset-0 z-20"
                        style={{
                          borderRadius: '2rem',
                          backgroundColor: '#F7F5F2',
                          transformOrigin: 'top center',
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={videoUrl} />
    </section>
  )
}
