import { EnquiryFormSection } from '../components/sections/EnquiryFormSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { contactPage } from '../data/innerPagesContent.js'
import { footerDefaults } from '../data/siteDefaults.js'
import { useCms } from '../context/useCms.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { contactPageQuery } from '../sanity/queries.js'

const telHref = (phone) => `tel:${phone.replace(/[^0-9+]/g, '')}`

export function ContactPage() {
  const { data } = useSanityData(contactPageQuery)
  const { siteSettings } = useCms()
  const hero = data?.hero ?? contactPage.hero
  const heroImageUrls = hero.imageUrls ?? (hero.imageUrl ? [hero.imageUrl] : contactPage.hero.imageUrls)

  const phone = siteSettings?.phone || footerDefaults.phone
  const email = siteSettings?.email || footerDefaults.email
  const address = siteSettings?.address || footerDefaults.address
  const areaCovered = siteSettings?.areaCovered

  return (
    <>
      <HeroPage
        eyebrow={hero.eyebrow || undefined}
        heading={hero.heading}
        imageUrls={heroImageUrls}
        showButtons={contactPage.hero.showButtons ?? true}
        contentPaddingTop={contactPage.hero.contentPaddingTop}
      />

      {/* Contact details and area covered at the top of the page */}
      <section className="bg-white" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <p className="eyebrow eyebrow-spacing text-accent-600">Phone</p>
              <a href={telHref(phone)} className="font-serif text-2xl text-primary hover:text-accent-600">
                {phone}
              </a>
            </div>
            <div>
              <p className="eyebrow eyebrow-spacing text-accent-600">Email</p>
              <a href={`mailto:${email}`} className="font-serif text-2xl text-primary hover:text-accent-600">
                {email}
              </a>
            </div>
            <div>
              <p className="eyebrow eyebrow-spacing text-accent-600">Workshop</p>
              <p className="font-sans font-light leading-relaxed text-neutral-600">{address}</p>
              {areaCovered ? (
                <p className="mt-2 font-sans text-sm text-neutral-500">Covering {areaCovered}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* One consultation/enquiry journey — project questions first, contact details last */}
      <EnquiryFormSection />
    </>
  )
}
