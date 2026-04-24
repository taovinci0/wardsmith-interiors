import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { FaqsAccordionSection } from '../components/sections/FaqsAccordionSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { faqsPage } from '../data/innerPagesContent.js'

export function FaqsPage() {
  const { hero } = faqsPage

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
      <FaqsAccordionSection />
      <FinalCtaSection />
    </>
  )
}
