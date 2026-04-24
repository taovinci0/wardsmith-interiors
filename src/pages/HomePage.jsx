import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { HeroHome } from '../components/sections/HeroHome.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ServicesHorizontalSection } from '../components/sections/ServicesHorizontalSection.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { TrustSection } from '../components/sections/TrustSection.jsx'
import { UspSection } from '../components/sections/UspSection.jsx'
import { ValuesSection } from '../components/sections/ValuesSection.jsx'
import { useCms } from '../context/useCms.js'

export function HomePage() {
  const { home } = useCms()

  return (
    <>
      <HeroHome />
      <ProcessIntroSection data={home?.processIntro} />
      <ValuesSection />
      <ServicesHorizontalSection />
      <UspSection />
      <TrustSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  )
}
