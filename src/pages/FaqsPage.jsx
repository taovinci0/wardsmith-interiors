import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { FaqsAccordionSection } from '../components/sections/FaqsAccordionSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { faqsPage } from '../data/innerPagesContent.js'
import { faqItems as faqItemsSeed } from '../data/faqItems.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { faqsQuery } from '../sanity/queries.js'

export function FaqsPage() {
  const { hero } = faqsPage
  const { data } = useSanityData(faqsQuery)
  const items = data?.items?.length ? data.items : faqItemsSeed

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
      <FaqsAccordionSection items={items} />
      <FinalCtaSection />
    </>
  )
}
