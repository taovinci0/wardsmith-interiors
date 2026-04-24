import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { MeetTheTeamSection } from '../components/sections/MeetTheTeamSection.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ProcessStepsSection } from '../components/sections/ProcessStepsSection.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { ValuesSection } from '../components/sections/ValuesSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { aboutPage } from '../data/innerPagesContent.js'

export function AboutPage() {
  const { hero, processIntro, valuesItems } = aboutPage

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
      <ProcessIntroSection data={processIntro} />
      <ValuesSection items={valuesItems} columnsClass="md:grid-cols-4" />
      <MeetTheTeamSection />
      <ProcessStepsSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  )
}
