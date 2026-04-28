import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { usp } from '../../data/homePageContent.js'
import { useSectionReveal } from '../../hooks/useSectionReveal.js'

export function UspSection({ data = usp }) {
  const revealRef = useRef(null)
  useSectionReveal(revealRef, 'usp')

  return (
    <section id="usp-section" className="section-padding relative overflow-hidden bg-accent-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v8M8 12h8' stroke='%23224A4F' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-custom relative z-10">
        <div ref={revealRef} className="usp-animate mb-12 text-center">
          {data.eyebrow ? (
            <p className="usp-animate-eyebrow eyebrow eyebrow-spacing text-primary">{data.eyebrow}</p>
          ) : null}
          {data.heading ? (
            <h2 className="usp-animate-heading heading-to-body-spacing font-serif text-[3rem] text-primary">
              {data.heading}
            </h2>
          ) : null}
          {data.content ? (
            <p className="usp-animate-body heading-to-body-spacing mx-auto max-w-3xl font-sans font-light text-primary">
              {data.content}
            </p>
          ) : null}
          {data.ctaLabel && data.ctaTo ? (
            <div className="usp-animate-cta heading-to-body-spacing">
              <Link to={data.ctaTo} className="btn-primary-dark">
                {data.ctaLabel}
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
            }}
          >
            <div
              className="absolute -top-3 left-6 z-20 px-3 pb-1 shadow-md"
              style={{ backgroundColor: '#224A4F', paddingTop: 0 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                OPTION A: BLUE
              </span>
            </div>
            <div className="relative aspect-[1.414] overflow-hidden">
              <img
                src={data.imageUrl1}
                alt=""
                className="usp-blueprint-img h-full w-full object-cover"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#e5e7eb',
                }}
              />
            </div>
          </div>

          <div
            className="usp-blueprint-frame usp-blueprint-frame--tilt-right group relative p-3 shadow-2xl"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '4px',
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
                src={data.imageUrl2}
                alt=""
                className="usp-blueprint-img h-full w-full object-cover"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#e5e7eb',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
