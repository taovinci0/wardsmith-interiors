import { ContactConsultationSection } from '../components/sections/ContactConsultationSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { contactPage } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { contactPageQuery } from '../sanity/queries.js'

export function ContactPage() {
  const { data } = useSanityData(contactPageQuery)
  const hero = data?.hero ?? contactPage.hero
  const heroImageUrls = hero.imageUrls ?? (hero.imageUrl ? [hero.imageUrl] : contactPage.hero.imageUrls)

  return (
    <>
      <HeroPage
        eyebrow={hero.eyebrow || undefined}
        heading={hero.heading}
        imageUrls={heroImageUrls}
        showButtons={contactPage.hero.showButtons ?? true}
        contentPaddingTop={contactPage.hero.contentPaddingTop}
      />
      <ContactConsultationSection {...(data?.consultation || {})} />
    </>
  )
}
