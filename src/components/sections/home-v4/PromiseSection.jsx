import { useState } from 'react'
import { Link } from 'react-router-dom'
import { VideoModal } from '../../common/VideoModal.jsx'

/**
 * The page's one dark band, on clean primary (plus-grid reserved for the
 * closer's corner field): the promise + the real workshop film, the six
 * commitments, and the cream guarantee card inside the band.
 */
export function PromiseSection({ data, guarantee, filmPosterUrl, filmVideoUrl }) {
  const [videoOpen, setVideoOpen] = useState(false)
  if (!data) return null

  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        {/* Promise + workshop film */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
            <h2 className="heading-to-body-spacing max-w-[14ch] font-serif text-[2.2rem] leading-[1.12] text-white md:text-[3rem]">
              {data.heading}
            </h2>
            <p className="mb-8 max-w-[52ch] font-sans font-light leading-relaxed text-neutral-200">
              {data.contentBefore}
              <em className="font-serif text-white">{data.contentItalic}</em>
              {data.contentAfter}
            </p>
            <Link
              to={data.linkTo}
              className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white underline decoration-white/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent-600"
            >
              {data.linkLabel}
            </Link>
          </div>

          <figure className="m-0">
            <button
              type="button"
              className="relative block w-full cursor-pointer overflow-hidden rounded-lg border-0 bg-white/5 p-0"
              style={{ aspectRatio: '16 / 10' }}
              onClick={() => filmVideoUrl && setVideoOpen(true)}
              aria-label="Play the workshop film"
            >
              {filmPosterUrl ? (
                <img src={filmPosterUrl} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              ) : null}
              <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100/90 transition-transform duration-300 hover:scale-110">
                  <svg className="ml-1 block h-7 w-7" fill="#224A4F" viewBox="0 0 24 24" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
            <figcaption className="mt-3 font-sans text-sm font-light text-neutral-200">{data.videoCaption}</figcaption>
          </figure>
        </div>

        {/* Six commitments */}
        <div className="mt-20 border-t border-white/15 pt-16">
          <h3 className="mb-12 font-serif text-[1.7rem] leading-snug text-white md:text-[2rem]">
            {data.commitmentsHeading}
          </h3>
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.commitments.map((c, i) => (
              <div key={c.title}>
                <p className="mb-3 font-sans text-xs tracking-[0.15em] text-accent-600">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="mb-2 font-serif text-2xl leading-snug text-white">{c.title}</h4>
                <p className="font-sans text-sm font-light leading-relaxed text-neutral-200">{c.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee card, inside the band */}
        {guarantee ? (
          <div className="mt-20 rounded-lg bg-neutral-100 px-8 py-12 md:px-14">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[220px_1fr] md:gap-16">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-primary/25 p-2.5">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-accent-600 text-primary">
                  <span className="font-serif text-[3.4rem] leading-none">{guarantee.years}</span>
                  <span className="mt-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em]">
                    Year guarantee
                  </span>
                </div>
              </div>
              <div>
                <p className="eyebrow eyebrow-spacing text-accent-600">{guarantee.eyebrow}</p>
                <h3 className="mb-4 font-serif text-[1.7rem] leading-snug text-primary md:text-[2rem]">
                  {guarantee.heading}
                </h3>
                <p className="mb-6 max-w-[58ch] font-sans font-light leading-relaxed text-neutral-600">
                  {guarantee.content}
                </p>
                <div className="flex flex-wrap gap-x-12 gap-y-2">
                  {guarantee.meta.map((m) => (
                    <p key={m} className="font-sans text-sm font-light text-neutral-600">
                      {m}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={filmVideoUrl} />
    </section>
  )
}
