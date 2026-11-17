import { Link } from 'react-router-dom'

/**
 * Homepage section 2 — Kitchens, directly after the hero. Static, image-led.
 */
export function KitchensHomeSection({ data }) {
  if (!data?.heading) return null
  const [img1, img2] = data.imageUrls || []

  return (
    <section id="home-kitchens-section" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            {data.eyebrow ? <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p> : null}
            <h2 className="heading-to-body-spacing max-w-[16ch] font-serif text-[2.25rem] leading-[1.15] text-primary md:text-[3rem]">
              {data.heading}
            </h2>
            {data.content ? (
              <p className="mb-8 max-w-[52ch] font-sans text-lg font-light leading-relaxed text-neutral-600">{data.content}</p>
            ) : null}
            <Link to="/kitchens" className="btn-primary inline-block">
              {data.ctaLabel || 'Explore our kitchens'}
            </Link>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] items-start gap-6">
            {img1 ? (
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img src={img1} alt="Bespoke Ward-Smith kitchen" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ) : null}
            {img2 ? (
              <div className="aspect-[4/5] overflow-hidden rounded-lg lg:mt-[72px]">
                <img src={img2} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
