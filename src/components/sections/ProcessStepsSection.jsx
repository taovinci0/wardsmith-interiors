import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsapClient.js'
import { processStepsPage } from '../../data/innerPagesContent.js'

const defaultEnd = {
  headingLines: ['Your Home', 'Awaits.'],
  headingClassName: 'mb-8 font-serif text-4xl leading-tight text-white md:text-6xl',
  paragraph: "Ready to start your journey? Let's discuss your project today.",
  buttonLabel: 'Start Project',
  buttonTo: '/start-your-project',
}

function normalizeEndCard(endCard) {
  const merged = { ...defaultEnd, ...(endCard || {}) }
  let headingLines = merged.headingLines
  if (merged.heading && typeof merged.heading === 'string') {
    headingLines = merged.heading
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
  }
  if (!headingLines?.length) headingLines = defaultEnd.headingLines
  const { heading: _h, ...rest } = merged
  return { ...rest, headingLines }
}

/**
 * About page (`process-steps.php`) or service (`service-process-steps.php`) horizontal band.
 */
export function ProcessStepsSection({
  sectionId = 'process-steps-section',
  trackId = 'process-steps-track',
  eyebrow,
  heading,
  tagline,
  steps: stepsProp,
  stepImageUrls: stepImagesProp,
  endCard,
} = {}) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const eyebrowFinal = eyebrow ?? processStepsPage.eyebrow
  const headingFinal = heading ?? processStepsPage.heading
  const taglineFinal = tagline ?? processStepsPage.tagline
  const steps = stepsProp ?? processStepsPage.steps
  const stepImages = stepImagesProp ?? processStepsPage.stepImageUrls
  const end = normalizeEndCard(endCard)

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
  }, [sectionId, trackId, steps.length, stepImages.join(',')])

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className="relative flex min-h-0 flex-col overflow-hidden pb-8 pt-24 md:h-screen md:min-h-0 md:pb-10 md:pt-28"
      style={{ backgroundColor: '#224A4F' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v8M8 12h8' stroke='%23FFFFFF' stroke-width='1' fill='none' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
          opacity: 0.6,
        }}
      />

      <div className="horizontal-scroll-main relative z-10">
        <div className="horizontal-scroll-main-inner">
          <div className="horizontal-scroll-intro pointer-events-none z-20 max-w-sm flex-shrink-0 md:max-w-full">
            <p className="eyebrow eyebrow-spacing text-accent-600">{eyebrowFinal}</p>
            <h2 className="heading-to-body-spacing font-serif text-[3rem] text-white">{headingFinal}</h2>
            <p className="font-sans font-light text-white">{taglineFinal}</p>
          </div>

          <div className="horizontal-scroll-track-outer">
            <div
              id={trackId}
              ref={trackRef}
              className="mobile-horizontal-scroll-track flex w-max min-h-0 items-start overflow-x-auto pr-[20%]"
            >
              {steps.map((step, idx) => {
                const stepNum = String(idx + 1).padStart(2, '0')
                const imageUrl =
                  stepImages[idx] ||
                  `https://placehold.co/800x600/D9D9D9/FFFFFF?text=${encodeURIComponent(step.title)}`
                return (
                  <div
                    key={`${step.title}-${idx}`}
                    className="mobile-horizontal-scroll-card group relative mr-8 w-[40vw] flex-shrink-0 md:mr-16"
                  >
                    <div
                      className="horizontal-scroll-card-image relative mb-6 overflow-hidden"
                      style={{ border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2rem' }}
                    >
                      <div
                        className="absolute inset-0 z-10 transition-colors duration-500 group-hover:bg-transparent"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      />
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div
                        className="absolute left-6 top-6 z-20 flex h-16 w-16 items-center justify-center rounded-full font-serif text-2xl text-white backdrop-blur-md"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        {stepNum}
                      </div>
                    </div>
                    <div className="pr-4">
                      <h3 className="heading-to-body-spacing font-serif text-white" style={{ fontSize: '2rem', lineHeight: 1.2 }}>
                        {step.title}
                      </h3>
                      <p className="heading-to-body-spacing font-sans text-sm font-light text-white" style={{ opacity: 0.9 }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}

              <div
                className="flex flex-shrink-0 flex-col items-start justify-center self-center"
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                <h3 className={end.headingClassName}>
                  {end.headingLines.map((line, i) => (
                    <span key={`${i}-${line}`}>
                      {line}
                      {i < end.headingLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h3>
                <p className="mb-8 max-w-xs font-sans font-light text-white" style={{ opacity: 0.9 }}>
                  {end.paragraph}
                </p>
                <Link to={end.buttonTo} className="btn-primary group flex items-center gap-4">
                  {end.buttonLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    style={{ color: '#224A4F' }}
                    strokeWidth={1}
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-shrink-0 items-center justify-end gap-1 px-10 pt-4 text-white">
        <span className="eyebrow font-bold text-white">SCROLL</span>
        <ArrowRight className="h-3 w-3 text-white" strokeWidth={2} aria-hidden />
      </div>
    </section>
  )
}
