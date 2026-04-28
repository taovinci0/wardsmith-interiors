import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { HeroHome } from '../components/sections/HeroHome.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { ServicesHorizontalSection } from '../components/sections/ServicesHorizontalSection.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { TrustSection } from '../components/sections/TrustSection.jsx'
import { UspSection } from '../components/sections/UspSection.jsx'
import { ValuesSection } from '../components/sections/ValuesSection.jsx'
import { useCms } from '../context/useCms.js'
import {
  finalCta,
  servicesList,
  servicesSection,
  testimonials,
  testimonialsSection,
  trust,
  usp,
  valuesItems,
} from '../data/homePageContent.js'

export function HomePage() {
  const { home } = useCms()

  return (
    <>
      <HeroHome />
      <ProcessIntroSection data={home?.processIntro} />
      <ValuesSection items={home?.valuesItems?.length ? home.valuesItems : valuesItems} />
      <ServicesHorizontalSection
        section={home?.servicesSection?.heading ? home.servicesSection : servicesSection}
        items={home?.servicesList?.length ? home.servicesList : servicesList}
      />
      <UspSection data={home?.usp?.heading ? home.usp : usp} />
      <TrustSection data={home?.trust?.heading ? home.trust : trust} />
      <TestimonialsSection
        section={home?.testimonialsSection?.heading ? home.testimonialsSection : testimonialsSection}
        items={home?.testimonials?.length ? home.testimonials : testimonials}
      />
      <FinalCtaSection data={home?.finalCta?.heading ? home.finalCta : finalCta} />
    </>
  )
}
