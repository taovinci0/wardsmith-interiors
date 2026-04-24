import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsapClient.js'
import { testimonials, testimonialsSection as head } from '../../data/homePageContent.js'
import { VideoModal } from '../common/VideoModal.jsx'

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [videoOpen, setVideoOpen] = useState(false)
  const [activeVideoUrl, setActiveVideoUrl] = useState(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const currentIndexRef = useRef(currentIndex)
  const skipInitialIndexEffect = useRef(true)

  const items = testimonials

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length)
  }, [items.length])

  const centerToIndex = useCallback((index, animate) => {
    const v = viewportRef.current
    const t = trackRef.current
    const els = itemRefs.current
    if (!v || !t || !els[index]) return

    itemRefs.current.forEach((el, i) => {
      if (!el) return
      el.classList.toggle('is-active', i === index)
      el.classList.toggle('is-side', i !== index)
    })

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const currentX = Number(gsap.getProperty(t, 'x')) || 0
        const viewportRect = v.getBoundingClientRect()
        const itemRect = els[index].getBoundingClientRect()
        const viewportCenter = viewportRect.left + viewportRect.width / 2
        const itemCenter = itemRect.left + itemRect.width / 2
        const delta = viewportCenter - itemCenter
        const targetX = currentX + delta

        if (animate) {
          gsap.to(t, {
            x: targetX,
            duration: 0.8,
            ease: 'power4.out',
          })
          els.forEach((item, i) => {
            if (!item) return
            if (i !== index) {
              gsap.to(item, {
                scale: 0.92,
                opacity: 0.5,
                y: 8,
                duration: 0.8,
                ease: 'power4.out',
              })
            } else {
              gsap.fromTo(
                item,
                { scale: 0.92, opacity: 0.5, y: 8 },
                { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' },
              )
            }
          })
        } else {
          gsap.set(t, { x: targetX })
          els.forEach((item, i) => {
            if (!item) return
            gsap.set(item, {
              scale: i === index ? 1 : 0.92,
              opacity: i === index ? 1 : 0.5,
              y: i === index ? 0 : 8,
            })
          })
        }
      })
    })
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track || !items.length) return undefined

    gsap.set(track, { x: 0 })
    items.forEach((_, i) => {
      const el = itemRefs.current[i]
      if (!el) return
      gsap.set(el, {
        scale: i === currentIndexRef.current ? 1 : 0.92,
        opacity: i === currentIndexRef.current ? 1 : 0.5,
        y: i === currentIndexRef.current ? 0 : 8,
      })
    })

    const t1 = window.setTimeout(() => centerToIndex(currentIndexRef.current, false), 120)

    let resizeTimer
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => centerToIndex(currentIndexRef.current, false), 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [items, centerToIndex])

  useEffect(() => {
    if (skipInitialIndexEffect.current) {
      skipInitialIndexEffect.current = false
      return
    }
    centerToIndex(currentIndex, true)
  }, [currentIndex, centerToIndex])

  function goPrev() {
    setCurrentIndex((i) => (i - 1 + items.length) % items.length)
  }

  function goNext() {
    setCurrentIndex((i) => (i + 1) % items.length)
  }

  if (!items.length) return null

  return (
    <section id="testimonials-section" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <div className="mb-24 text-center">
          {head.eyebrow ? (
            <p className="eyebrow eyebrow-spacing text-accent-600">{head.eyebrow}</p>
          ) : null}
          {head.heading ? (
            <h2 className="heading-to-body-spacing font-serif text-[3rem] text-primary">{head.heading}</h2>
          ) : null}
          {head.subheading ? (
            <p className="mt-4 max-w-2xl font-sans text-lg font-light text-neutral-600 mx-auto">
              {head.subheading}
            </p>
          ) : null}
        </div>

        <div className="relative w-full">
          <div ref={viewportRef} className="testimonials-carousel-viewport relative mx-auto">
            <div ref={trackRef} className="testimonials-carousel-track flex items-start">
              {items.map((t, index) => {
                const hasPoster = Boolean(t.posterImageUrl)
                const hasVideo = Boolean(t.videoUrl)

                return (
                  <div
                    key={t.id}
                    ref={(el) => {
                      itemRefs.current[index] = el
                    }}
                    className="testimonial-carousel-item flex-shrink-0"
                    data-testimonial-index={index}
                  >
                    {hasPoster ? (
                      <div
                        className="testimonial-video-container group relative mb-4 w-full cursor-pointer"
                        style={{ position: 'relative', overflow: 'hidden', borderRadius: '1.5rem' }}
                      >
                        <img
                          src={t.posterImageUrl}
                          alt={t.name}
                          className="w-full"
                          style={{ aspectRatio: '16/9', objectFit: 'cover' }}
                        />
                        <div
                          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
                          style={{
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)',
                            zIndex: 1,
                          }}
                        />
                        {hasVideo ? (
                          <button
                            type="button"
                            className="testimonial-play-button testimonial-video-trigger absolute left-4 top-4 z-50 border-0 bg-transparent p-0"
                            style={{ pointerEvents: 'auto' }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveVideoUrl(t.videoUrl)
                              setVideoOpen(true)
                            }}
                          >
                            <div
                              className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                              style={{ border: '2px solid rgba(34, 74, 79, 0.2)' }}
                            >
                              <svg className="ml-1 block h-7 w-7" fill="#224A4F" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </button>
                        ) : null}
                        <div
                          className="absolute bottom-0 left-0 z-[25] p-6"
                          style={{ pointerEvents: 'none' }}
                        >
                          <p
                            className="testimonial-name mb-1 font-sans font-medium text-white"
                            style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 1)' }}
                          >
                            {t.name}
                          </p>
                          {t.location ? (
                            <p
                              className="testimonial-location font-sans text-sm text-white"
                              style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 1)' }}
                            >
                              {t.location}
                            </p>
                          ) : null}
                        </div>
                        {index !== currentIndex ? (
                          <button
                            type="button"
                            className="absolute inset-0 z-[15] cursor-pointer border-0 bg-transparent p-0"
                            aria-label="Show testimonial"
                            onClick={() => setCurrentIndex(index)}
                          />
                        ) : null}
                      </div>
                    ) : (
                      <div className="mb-4 rounded-3xl bg-neutral-200 p-6 text-left">
                        <p className="font-sans font-medium text-primary">{t.name}</p>
                        {t.location ? (
                          <p className="text-sm text-neutral-600">{t.location}</p>
                        ) : null}
                      </div>
                    )}

                    {t.pull_quote ? (
                      <blockquote
                        className="mt-4 font-serif italic text-primary"
                        style={{ lineHeight: 1.4, fontWeight: 400 }}
                      >
                        &ldquo;{t.pull_quote}&rdquo;
                      </blockquote>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mb-12 mt-12 flex items-center justify-center gap-4">
            <button
              type="button"
              className="testimonial-carousel-prev flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-neutral-100"
              style={{ border: '1px solid rgba(34, 74, 79, 0.15)' }}
              aria-label="Previous testimonial"
              onClick={goPrev}
            >
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="testimonial-carousel-next flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-neutral-100"
              style={{ border: '1px solid rgba(34, 74, 79, 0.15)' }}
              aria-label="Next testimonial"
              onClick={goNext}
            >
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-300 pt-12">
          <div className="mt-12 flex items-center justify-center">
            <div
              className="mx-auto flex items-center gap-3 rounded-full bg-white py-3 shadow-lg"
              style={{
                boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.15)',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
              }}
            >
              <div className="flex-shrink-0">
                <img src="/images/Google__G__logo.svg" alt="Google" className="h-9 w-9" />
              </div>
              <div className="flex flex-col">
                <p
                  className="font-sans font-bold uppercase text-neutral-900"
                  style={{ fontSize: '0.875rem', letterSpacing: '0.05em', lineHeight: 1.2 }}
                >
                  EXCELLENT
                </p>
                <p className="font-sans text-neutral-600" style={{ fontSize: '0.75rem', lineHeight: 1.2 }}>
                  Rated 5.0/5.0 on Google Reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={activeVideoUrl} />
    </section>
  )
}
