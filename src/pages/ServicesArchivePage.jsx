import { Link } from 'react-router-dom'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { servicesArchive } from '../data/innerPagesContent.js'
import { servicesList } from '../data/homePageContent.js'

export function ServicesArchivePage() {
  const { hero } = servicesArchive

  return (
    <>
      <HeroPage
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        imageUrls={hero.imageUrls}
        primaryButtonLabel={hero.primaryButtonLabel}
        primaryButtonTo={hero.primaryButtonTo}
        secondaryButtonLabel={hero.secondaryButtonLabel}
        secondaryButtonTo={hero.secondaryButtonTo}
      />
      <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => {
              const imageUrl =
                service.imageUrl ||
                `https://placehold.co/800x600/E5CEBA/224A4F?text=${encodeURIComponent(service.title)}`
              return (
                <article key={service.slug} className="group">
                  <Link to={`/services/${service.slug}`} className="block">
                    <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[24px]">
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <h2 className="mb-2 font-serif text-2xl text-primary transition-colors group-hover:text-accent-600">
                      {service.title}
                    </h2>
                    {service.shortDescription ? (
                      <p className="font-sans text-sm font-light text-neutral-600">{service.shortDescription}</p>
                    ) : null}
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
