import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { finalCta } from '../../data/homePageContent.js'
import { useSectionReveal } from '../../hooks/useSectionReveal.js'

export function FinalCtaSection() {
  const revealRef = useRef(null)
  useSectionReveal(revealRef, 'finalCta')

  return (
    <section
      id="final-cta-section"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#224A4F', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v8M8 12h8' stroke='%23FFFFFF' stroke-width='1' fill='none' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
          opacity: 0.6,
        }}
      />

      <div className="container-custom relative z-10">
        <div ref={revealRef} className="final-cta-animate mx-auto max-w-3xl text-center">
          {finalCta.heading ? (
            <h2 className="final-cta-heading heading-to-body-spacing font-serif text-[3rem] text-white">
              {finalCta.heading}
            </h2>
          ) : null}
          {finalCta.content ? (
            <p className="final-cta-body heading-to-body-spacing font-sans font-light text-white">
              {finalCta.content}
            </p>
          ) : null}
          <div
            className="final-cta-buttons mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ width: 'fit-content' }}
          >
            <Link to="/contact" className="btn-secondary">
              Book a Call
            </Link>
            {finalCta.primaryLabel && finalCta.primaryTo ? (
              <Link to={finalCta.primaryTo} className="btn-primary">
                {finalCta.primaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
