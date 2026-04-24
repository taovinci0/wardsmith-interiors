import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { PrivacyPolicyContent } from '../components/legal/PrivacyPolicyContent.jsx'
import { legalPages } from '../data/innerPagesContent.js'

export function PrivacyPolicyPage() {
  const { hero } = legalPages.privacy

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
      <PrivacyPolicyContent />
    </>
  )
}
