import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsapClient.js'
import { servicesList, servicesSection as header } from '../../data/homePageContent.js'

export function ServicesHorizontalSection({ section = header, items = servicesList }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return undefined

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      function getScrollAmount() {
        const tw = track.scrollWidth
        const vw = window.innerWidth
        return -(Math.max(0, tw - vw))
      }

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(0, track.scrollWidth - window.innerWidth)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        gsap.set(track, { clearProps: 'transform' })
      }
    })

    mm.add('(max-width: 767px)', () => {
      gsap.set(track, { x: 0, clearProps: 'transform' })
      return () => {}
    })

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      mm.revert()
    }
  }, [])

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="relative flex min-h-0 flex-col overflow-hidden bg-neutral-100 pb-8 pt-24 text-primary md:h-screen md:min-h-0 md:pb-10 md:pt-28"
    >
      <div className="horizontal-scroll-main relative z-10">
        <div className="horizontal-scroll-main-inner">
          <div className="horizontal-scroll-intro pointer-events-none z-20 max-w-sm flex-shrink-0 md:max-w-full">
            <p className="eyebrow eyebrow-spacing text-accent-600">{section.eyebrow}</p>
            <h2 className="heading-to-body-spacing font-serif text-[3rem] text-primary">{section.heading}</h2>
            <p className="font-sans font-light text-neutral-600">{section.tagline}</p>
          </div>

          <div className="horizontal-scroll-track-outer">
            <div
              id="services-track"
              ref={trackRef}
              className="mobile-horizontal-scroll-track flex w-max min-h-0 items-start overflow-x-auto pr-[20%]"
            >
              {items.map((service, idx) => {
                const step = String(idx + 1).padStart(2, '0')
                const imageUrl =
                  service.imageUrl ||
                  `https://placehold.co/800x600/D9D9D9/224A4F?text=${encodeURIComponent(service.title)}`
                return (
                  <div
                    key={service.slug}
                    className="mobile-horizontal-scroll-card group relative mr-8 w-[40vw] flex-shrink-0 md:mr-16"
                  >
                    <div
                      className="horizontal-scroll-card-image relative mb-6 overflow-hidden"
                      style={{ border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2rem' }}
                    >
                      <div
                        className="absolute inset-0 z-10 transition-colors duration-500 group-hover:bg-transparent"
                        style={{ backgroundColor: 'rgba(34, 74, 79, 0.2)' }}
                      />
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div
                        className="absolute left-6 top-6 z-20 flex h-16 w-16 items-center justify-center rounded-full font-serif text-2xl text-primary backdrop-blur-md"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(34, 74, 79, 0.2)',
                        }}
                      >
                        {step}
                      </div>
                    </div>
                    <div className="pr-4">
                      <h3
                        className="heading-to-body-spacing font-serif text-primary"
                        style={{ fontSize: '2rem', lineHeight: 1.2 }}
                      >
                        {service.title}
                      </h3>
                      {service.shortDescription ? (
                        <p className="heading-to-body-spacing font-sans text-sm font-light text-neutral-600">
                          {service.shortDescription}
                        </p>
                      ) : null}
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-xsm inline-flex items-center gap-1 font-bold uppercase tracking-widest text-accent-600"
                      >
                        EXPLORE
                        <ArrowRight className="h-3 w-3" strokeWidth={1} aria-hidden />
                      </Link>
                    </div>
                  </div>
                )
              })}

              <div
                className="flex flex-shrink-0 flex-col items-start justify-center"
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                <h3 className="mb-8 font-serif text-4xl leading-tight text-accent-600 md:text-6xl">
                  Your Home
                  <br /> Awaits.
                </h3>
                <p className="mb-8 max-w-xs font-sans font-light text-neutral-600">
                  Ready to start your journey? Let&apos;s discuss your project today.
                </p>
                <Link to="/start-your-project" className="btn-secondary group flex items-center gap-4">
                  Start Project
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    style={{ color: 'inherit' }}
                    strokeWidth={1}
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-shrink-0 items-center justify-end gap-1 px-10 pt-4 text-primary">
        <span className="eyebrow text-primary">SCROLL</span>
        <ArrowRight className="h-3 w-3 text-primary" strokeWidth={2} aria-hidden />
      </div>
    </section>
  )
}
