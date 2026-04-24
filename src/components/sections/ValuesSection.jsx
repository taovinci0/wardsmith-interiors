import { useLayoutEffect, useRef } from 'react'
import { Award, HeartHandshake, Home, Ruler, ShieldCheck, Trees, TrendingUp } from 'lucide-react'
import { gsap } from '../../lib/gsapClient.js'
import { valuesItems } from '../../data/homePageContent.js'

const iconMap = {
  'heart-handshake': HeartHandshake,
  award: Award,
  'trending-up': TrendingUp,
  home: Home,
  ruler: Ruler,
  trees: Trees,
  'shield-check': ShieldCheck,
}

function ValuesIcon({ name }) {
  const Cmp = iconMap[name] ?? HeartHandshake
  return (
    <Cmp
      className="values-icon"
      strokeWidth={1}
      style={{ width: 48, height: 48, color: '#D8B08C' }}
      aria-hidden
    />
  )
}

export function ValuesSection({ items = valuesItems, columnsClass = 'md:grid-cols-3' }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const items = section.querySelectorAll('.values-item-reveal')
    if (!items.length) return undefined

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 40 })

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }).to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!items.length) return null

  return (
    <section id="values-section" ref={sectionRef} className="values-section bg-neutral-200 py-16">
      <div className="container-custom">
        <div className={`grid grid-cols-1 gap-8 ${columnsClass} md:gap-12`}>
          {items.map((item) => (
            <div key={item.title} className="values-item values-item-reveal w-full" style={{ width: '100%' }}>
              {item.icon_name ? (
                <div className="mb-6 flex justify-center">
                  <div
                    className="values-icon-wrapper flex items-center justify-center"
                    style={{
                      backgroundColor: '#224A4F',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      width: '80px',
                      height: '80px',
                    }}
                  >
                    <ValuesIcon name={item.icon_name} />
                  </div>
                </div>
              ) : null}
              {item.title ? (
                <h3 className="values-item-title heading-to-body-spacing text-center font-serif text-[2rem] leading-[1.2] text-primary">
                  {item.title}
                </h3>
              ) : null}
              {item.content ? (
                <div className="text-center font-sans text-sm font-light text-neutral-600">
                  {item.content.split(/\n\n+/).map((p) => (
                    <p key={p.slice(0, 20)} className="mb-3 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
