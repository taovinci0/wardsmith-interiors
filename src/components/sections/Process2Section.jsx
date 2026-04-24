/**
 * WP `process-2.php` — image left, text right (reverse of process intro).
 */
export function Process2Section({ eyebrow, heading, content, imageUrl, videoUrl, ctaLabel }) {
  const paragraphs = content ? content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) : []
  const headingWords = heading ? heading.split(' ') : []

  return (
    <section id="process-2-section" className="process-2-section section-padding bg-neutral-100">
      <div className="container-custom">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {imageUrl ? (
            <div className="relative order-1 w-full flex-1 md:order-1 md:w-auto" style={{ overflow: 'visible' }}>
              <div
                className="process-2-image-wrapper relative mx-auto aspect-[4/5]"
                style={{
                  borderRadius: '2rem',
                  width: '85%',
                  maxWidth: '500px',
                  margin: '0 auto',
                  position: 'relative',
                }}
              >
                <div
                  className="process-2-border pointer-events-none absolute"
                  style={{
                    top: '-1.5rem',
                    left: '-1.5rem',
                    width: '100%',
                    height: '100%',
                    border: '2px solid #E5CEBA',
                    borderRadius: '2rem',
                    zIndex: 0,
                    display: 'block',
                  }}
                />
                <div className="relative z-10 h-full w-full overflow-hidden" style={{ borderRadius: '2rem' }}>
                  {videoUrl ? (
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                      <img
                        src={imageUrl}
                        alt=""
                        className="process-2-image h-full w-full object-cover"
                        style={{ display: 'block', borderRadius: '2rem' }}
                      />
                    </a>
                  ) : (
                    <img
                      src={imageUrl}
                      alt=""
                      className="process-2-image h-full w-full object-cover"
                      style={{ display: 'block', borderRadius: '2rem' }}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : null}

          <div className="order-2 w-full flex-1 md:order-2 md:w-auto">
            {eyebrow ? (
              <p className="process-2-eyebrow eyebrow eyebrow-spacing" style={{ color: '#D8B08C' }}>
                {eyebrow}
              </p>
            ) : null}
            {headingWords.length ? (
              <h2 className="process-2-heading heading-to-body-spacing flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1 font-serif text-[3rem] leading-[1.15] text-primary md:text-[3.75rem]">
                {headingWords.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="process-2-title-word inline-block overflow-hidden"
                    style={{ verticalAlign: 'bottom' }}
                  >
                    <span className="process-2-title-word-inner inline-block">{word}</span>
                  </span>
                ))}
              </h2>
            ) : null}
            {paragraphs.length ? (
              <div className="process-2-body mb-8 max-w-md font-sans font-light text-neutral-600">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
            {videoUrl ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="process-2-cta inline-flex items-center gap-3 font-sans text-xsm font-medium uppercase tracking-widest text-primary transition-colors duration-300 hover:text-primary-dark"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-300 text-primary">
                  <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>{ctaLabel || 'WATCH OUR PROCESS'}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
