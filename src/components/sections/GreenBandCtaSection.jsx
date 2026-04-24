import { Link } from 'react-router-dom'

/** WP `service-cta.php` / `case-study-cta.php` — green band + pattern + two buttons. */
export function GreenBandCtaSection({ id = 'service-cta-section', heading, content, primaryLabel, primaryTo, showBookCall = true }) {
  return (
    <section
      id={id}
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
        <div className="final-cta-animate mx-auto max-w-3xl text-center">
          {heading ? (
            <h2 className="final-cta-heading heading-to-body-spacing font-serif text-[3rem] text-white">{heading}</h2>
          ) : null}
          {content ? (
            <p className="final-cta-body heading-to-body-spacing font-sans font-light text-white">{content}</p>
          ) : null}
          <div
            className="final-cta-buttons mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ width: 'fit-content' }}
          >
            {showBookCall ? (
              <Link to="/contact" className="btn-secondary">
                Book a Call
              </Link>
            ) : null}
            {primaryLabel && primaryTo ? (
              <Link to={primaryTo} className="btn-primary">
                {primaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
