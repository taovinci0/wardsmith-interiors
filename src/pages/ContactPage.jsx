import { ContactConsultationSection } from '../components/sections/ContactConsultationSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { contactPage } from '../data/innerPagesContent.js'

export function ContactPage() {
  const { hero } = contactPage

  return (
    <>
      <HeroPage
        eyebrow={hero.eyebrow || undefined}
        heading={hero.heading}
        imageUrls={hero.imageUrls}
        showButtons={hero.showButtons ?? true}
        contentPaddingTop={hero.contentPaddingTop}
      />
      <ContactConsultationSection />
    </>
  )
}
