import { Link } from 'react-router-dom'
import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsapClient.js'
import { trust } from '../../data/homePageContent.js'

export function TrustSection({ data = trust }) {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const background = bgRef.current
    if (!section || !background) return undefined

    const ctx = gsap.context(() => {
      gsap.set(background, {
        opacity: 0,
        scale: 1.15,
        y: '-10%',
      })

      gsap.to(background, {
        opacity: 1,
        scale: 1,
        duration: 2.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          once: true,
        },
      })

      gsap.to(background, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="trust-section"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '900px' }}
    >
      <div
        id="trust-background"
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${data.backgroundImageUrl}')`,
          willChange: 'transform',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120%',
          top: '-10%',
        }}
      />

      <div
        className="container-custom relative z-20 flex items-end"
        style={{ minHeight: '900px', paddingBottom: '50px' }}
      >
        <div
          className="max-w-[600px] self-end"
          style={{
            backgroundColor: 'rgba(34, 74, 79, 0.8)',
            padding: '2rem',
            borderRadius: '1rem',
          }}
        >
          {data.heading ? (
            <h2 className="heading-to-body-spacing font-serif text-[3rem] text-white">{data.heading}</h2>
          ) : null}
          {data.content ? (
            <p className="heading-to-body-spacing font-sans font-light text-white">{data.content}</p>
          ) : null}
          {data.ctaLabel && data.ctaTo ? (
            <Link to={data.ctaTo} className="btn-primary">
              {data.ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
