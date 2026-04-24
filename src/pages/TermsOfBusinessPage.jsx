import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { TermsOfBusinessContent } from '../components/legal/TermsOfBusinessContent.jsx'
import { legalPages } from '../data/innerPagesContent.js'

export function TermsOfBusinessPage() {
  const { hero } = legalPages.terms

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
      <TermsOfBusinessContent />
    </>
  )
}
