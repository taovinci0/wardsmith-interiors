import { ArrowLink } from '../../common/ArrowLink.jsx'
import { siteLogoUrl } from '../../../data/siteDefaults.js'

/**
 * One kitchen project told properly: full-bleed establishing shot with the
 * brandmark watermark (echoing the hero), then "what they needed / what we
 * made" columns and three detail photos. Hidden in production until a
 * completed kitchen caseStudy exists.
 */
export function FeaturedProjectSection({ data }) {
  if (!data) return null
  return (
    <section className="bg-white">
      <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden md:h-[68vh]">
        <img src={data.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top right, rgba(10, 20, 22, 0.35) 0%, rgba(10, 20, 22, 0.05) 60%)' }}
        />
        <img
          src={siteLogoUrl}
          alt=""
          aria-hidden
          className="pointer-events-none absolute w-auto"
          style={{ top: '-10%', right: '-4%', height: '118%', opacity: 0.06, filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <div className="container-custom section-padding">
        <p className="eyebrow eyebrow-spacing text-accent-600">{data.eyebrow}</p>
        <h2 className="mb-12 max-w-[24ch] font-serif text-[2.2rem] leading-[1.12] text-primary md:text-[3rem]">
          {data.heading}
        </h2>

        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <p className="eyebrow mb-4 text-neutral-600">{data.neededLabel}</p>
            <p className="font-sans font-light leading-relaxed text-neutral-600">{data.needed}</p>
          </div>
          <div>
            <p className="eyebrow mb-4 text-neutral-600">{data.madeLabel}</p>
            <p className="font-sans font-light leading-relaxed text-neutral-600">{data.made}</p>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.details.map((d) => (
            <figure key={d.caption}>
              <div className="overflow-hidden rounded-lg" style={{ aspectRatio: '4 / 3' }}>
                <img src={d.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <figcaption className="mt-3 font-sans text-sm font-light text-neutral-600">
                {d.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <ArrowLink to={data.linkTo}>{data.linkLabel}</ArrowLink>
      </div>
    </section>
  )
}
