import { useState } from 'react'
import { testimonials, testimonialsSection as head } from '../../data/homePageContent.js'
import { SectionHeaderSplit } from './SectionHeaderSplit.jsx'
import { VideoModal } from '../common/VideoModal.jsx'

/**
 * Client stories — grid of video testimonial cards (poster + play → modal),
 * stars and name/location meta below each card, Google badge underneath.
 */
export function TestimonialsSection({ section = head, items = testimonials, bg = 'bg-neutral-100', showBadge = true }) {
  const [videoOpen, setVideoOpen] = useState(false)
  const [activeVideoUrl, setActiveVideoUrl] = useState(null)

  const cards = items.filter((t) => t.posterImageUrl).slice(0, 4)
  if (!cards.length) return null

  return (
    <section id="testimonials-section" className={`section-padding ${bg}`}>
      <div className="container-custom">
        <SectionHeaderSplit
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.subheading}
        />

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {cards.map((t) => (
            <div key={t.id || t.name} className="group">
              <button
                type="button"
                className="relative mb-4 block w-full cursor-pointer overflow-hidden rounded-lg border-0 bg-transparent p-0"
                style={{ aspectRatio: '3 / 4' }}
                onClick={() => {
                  if (!t.videoUrl) return
                  setActiveVideoUrl(t.videoUrl)
                  setVideoOpen(true)
                }}
                aria-label={`Play ${t.name}'s video review`}
              >
                <img
                  src={t.posterImageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                  {t.videoUrl ? (
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform duration-300 group-hover:scale-110">
                      <svg className="ml-1 block h-6 w-6" fill="#224A4F" viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  ) : null}
                </span>
              </button>
              <p className="mb-1 text-xs tracking-[0.25em] text-accent-600" aria-label="Five stars">
                ★★★★★
              </p>
              <p className="font-sans text-sm text-neutral-500">
                <span className="font-medium text-neutral-600">{t.name}</span>
                {t.location ? <> · {t.location}</> : null}
              </p>
            </div>
          ))}
        </div>

        {showBadge ? (
        <div className="mt-14 flex justify-center border-t border-neutral-300 pt-10">
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3" style={{ boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.12)' }}>
            <img src="/images/Google__G__logo.svg" alt="Google" className="h-8 w-8" />
            <div>
              <p className="font-sans text-sm font-bold uppercase leading-tight tracking-[0.05em] text-neutral-900">Excellent</p>
              <p className="font-sans text-xs leading-tight text-neutral-600">Rated 5.0/5.0 on Google Reviews</p>
            </div>
          </div>
        </div>
        ) : null}
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={activeVideoUrl} />
    </section>
  )
}
