import { Briefcase, MapPin, PoundSterling } from 'lucide-react'
import { getYoutubeEmbedSrc } from '../../lib/youtubeEmbed.js'

/** WP `case-study-process-intro.php` — overview, meta row, testimonial video or image. */
export function CaseStudyProcessIntroSection({
  projectOverview,
  location,
  servicesLine,
  cost,
  imageUrl,
  testimonialVideoUrl,
  testimonialVideoPosterUrl,
}) {
  const hasAny = Boolean(
    projectOverview || location || servicesLine || cost || imageUrl || testimonialVideoUrl,
  )
  if (!hasAny) return null

  const paragraphs = projectOverview
    ? projectOverview.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : []

  const embedSrc = testimonialVideoUrl ? getYoutubeEmbedSrc(testimonialVideoUrl) : null
  const poster = testimonialVideoPosterUrl || imageUrl

  return (
    <section id="case-study-process-intro-section" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <div className="order-2 w-full flex-1 md:order-1 md:w-auto">
            {paragraphs.length ? (
              <div className="mb-8">
                <h2 className="heading-to-body-spacing mb-4 font-serif text-[2.5rem] text-primary">Project Overview</h2>
                <div className="max-w-md font-sans font-light text-neutral-600">
                  {paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="mb-4 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {location || servicesLine || cost ? (
              <div className="mt-8 flex flex-col gap-4">
                {location ? (
                  <div
                    className="flex items-center gap-3 rounded-[24px] bg-neutral-200"
                    style={{ padding: '0.75rem' }}
                  >
                    <MapPin className="h-6 w-6 shrink-0 text-accent-600" strokeWidth={1} aria-hidden />
                    <span className="font-sans font-light text-neutral-600">{location}</span>
                  </div>
                ) : null}
                {servicesLine ? (
                  <div
                    className="flex items-center gap-3 rounded-[24px] bg-neutral-200"
                    style={{ padding: '0.75rem' }}
                  >
                    <Briefcase className="h-6 w-6 shrink-0 text-accent-600" strokeWidth={1} aria-hidden />
                    <span className="font-sans font-light text-neutral-600">{servicesLine}</span>
                  </div>
                ) : null}
                {cost ? (
                  <div
                    className="flex items-center gap-3 rounded-[24px] bg-neutral-200"
                    style={{ padding: '0.75rem' }}
                  >
                    <PoundSterling className="h-6 w-6 shrink-0 text-accent-600" strokeWidth={1} aria-hidden />
                    <span className="font-sans font-light text-neutral-600">{cost}</span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {embedSrc || poster ? (
            <div className="relative order-1 w-full flex-1 md:order-2 md:w-auto" style={{ overflow: 'visible' }}>
              <div
                className="relative mx-auto aspect-[4/5] w-full max-w-[500px]"
                style={{
                  borderRadius: '2rem',
                  width: '85%',
                  margin: '0 auto',
                  position: 'relative',
                }}
              >
                <div
                  className="pointer-events-none absolute"
                  style={{
                    top: '-1.5rem',
                    left: '-1.5rem',
                    width: '100%',
                    height: '100%',
                    border: '2px solid #E5CEBA',
                    borderRadius: '2rem',
                    zIndex: 0,
                  }}
                />
                <div
                  className="relative z-10 h-full w-full overflow-hidden bg-neutral-900"
                  style={{ borderRadius: '2rem' }}
                >
                  {embedSrc ? (
                    <iframe
                      title="Project video"
                      src={embedSrc}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : poster ? (
                    <img src={poster} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
