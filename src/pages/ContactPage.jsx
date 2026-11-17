import { EnquiryFormSection } from '../components/sections/EnquiryFormSection.jsx'
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

  const phone = siteSettings?.phone || footerDefaults.phone
  const email = siteSettings?.email || footerDefaults.email
  const address = siteSettings?.address || footerDefaults.address
  const areaCovered = siteSettings?.areaCovered

  return (
    <>
      {/* Editorial opener — no photo hero; header is solid teal on this page */}
      <section className="bg-neutral-100" style={{ paddingTop: '11rem', paddingBottom: '4rem' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow eyebrow-spacing text-accent-600">{hero.eyebrow || 'Contact'}</p>
              <h1 className="max-w-[16ch] font-serif text-[2.5rem] leading-[1.08] text-primary md:text-[3.25rem]">
                Start with a conversation.
              </h1>
            </div>
            <p className="font-sans font-light leading-relaxed text-neutral-600 lg:pb-2">
              Tell us about your project below, or call in at the workshop — whichever feels easier. No obligation, no
              hard sell.
            </p>
          </div>
        </div>
      </section>

      {/* Details rail + enquiry card */}
      <section className="bg-white" style={{ paddingTop: '6rem', paddingBottom: '8rem' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20">
            <div className="flex flex-col gap-7">
              <div className="border-t border-neutral-300 pt-5">
                <p className="eyebrow eyebrow-spacing text-accent-600">Phone</p>
                <a href={telHref(phone)} className="font-serif text-[1.375rem] text-primary hover:text-accent-600">
                  {phone}
                </a>
              </div>
              <div className="border-t border-neutral-300 pt-5">
                <p className="eyebrow eyebrow-spacing text-accent-600">Email</p>
                <a href={`mailto:${email}`} className="break-all font-serif text-xl text-primary hover:text-accent-600">
                  {email}
                </a>
              </div>
              <div className="border-t border-neutral-300 pt-5">
                <p className="eyebrow eyebrow-spacing text-accent-600">Workshop</p>
                <p className="font-sans font-light leading-relaxed text-neutral-600">{address}</p>
                {areaCovered ? (
                  <p className="mt-2 font-sans text-sm text-neutral-500">Covering {areaCovered}</p>
                ) : null}
              </div>
              <div className="border-t border-neutral-300 pt-5">
                <p className="font-sans text-sm font-light leading-relaxed text-neutral-500">
                  Prefer to talk it through first? Call or email us and we&apos;ll arrange a free 20 minute consultation.
                </p>
              </div>
            </div>

            <EnquiryFormSection variant="card" />
          </div>
        </div>
      </section>
    </>
  )
}
