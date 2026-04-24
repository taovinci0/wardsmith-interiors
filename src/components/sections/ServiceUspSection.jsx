import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSectionReveal } from '../../hooks/useSectionReveal.js'

/** WP `service-usp.php` — same layout as homepage USP with `#service-usp-section`. */
export function ServiceUspSection({ eyebrow, heading, content, imageUrl1, imageUrl2, ctaLabel, ctaTo }) {
  const revealRef = useRef(null)
  useSectionReveal(revealRef, 'usp')

  return (
    <section id="service-usp-section" className="section-padding relative overflow-hidden bg-neutral-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v8M8 12h8' stroke='%23224A4F' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-custom relative z-10">
        <div ref={revealRef} className="usp-animate mb-12 text-center">
          {eyebrow ? (
            <p className="usp-animate-eyebrow eyebrow eyebrow-spacing text-accent-600">{eyebrow}</p>
          ) : null}
          {heading ? (
            <h2 className="usp-animate-heading heading-to-body-spacing font-serif text-[3rem] text-primary">{heading}</h2>
          ) : null}
          {content ? (
            <p className="usp-animate-body heading-to-body-spacing mx-auto max-w-3xl font-sans font-light text-neutral-600">
              {content}
            </p>
          ) : null}
          {ctaLabel && ctaTo ? (
            <div className="usp-animate-cta heading-to-body-spacing">
              <Link to={ctaTo} className="btn-primary-dark">
                {ctaLabel}
              </Link>
            </div>
          ) : null}
        </div>

        <div
          className="mx-auto flex flex-col items-center justify-center gap-8 md:flex-row"
          style={{ maxWidth: 'fit-content' }}
        >
          <div
            className="usp-blueprint-frame group relative p-3 shadow-2xl"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              transition: 'transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1)',
            }}
          >
            <div
              className="absolute -top-3 left-6 z-20 px-3 pb-1 shadow-md"
              style={{ backgroundColor: '#224A4F', paddingTop: 0 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">OPTION A: BLUE</span>
            </div>
            <div className="relative aspect-[1.414] overflow-hidden">
              <img
                src={imageUrl1}
                alt=""
                className="h-full w-full object-cover group-hover:scale-110"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#e5e7eb',
                  transition: 'transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              />
            </div>
          </div>

          <div
            className="usp-blueprint-frame usp-blueprint-frame--tilt-right group relative p-3 shadow-2xl"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              transition: 'transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1)',
            }}
          >
            <div
              className="absolute -top-3 left-6 z-20 px-3 pb-1 shadow-md"
              style={{ backgroundColor: '#D8B08C', paddingTop: 0 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#224A4F' }}>
                OPTION B: CASHMERE
              </span>
            </div>
            <div className="relative aspect-[1.414] overflow-hidden">
              <img
                src={imageUrl2}
                alt=""
                className="h-full w-full object-cover group-hover:scale-110"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#e5e7eb',
                  transition: 'transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
