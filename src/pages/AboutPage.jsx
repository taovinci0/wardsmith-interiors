import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { MeetTheTeamSection } from '../components/sections/MeetTheTeamSection.jsx'
import { ProcessIntroSection } from '../components/sections/ProcessIntroSection.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { ValuesSection } from '../components/sections/ValuesSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { aboutPage } from '../data/innerPagesContent.js'
import { testimonials, testimonialsSection } from '../data/homePageContent.js'
import { useCms } from '../context/useCms.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { aboutPageQuery } from '../sanity/queries.js'

export function AboutPage() {
  const { data } = useSanityData(aboutPageQuery)
  const { home } = useCms()
  const hero = data?.hero ?? aboutPage.hero
  const processIntro = data?.processIntro ?? aboutPage.processIntro
  const valuesItems = data?.valuesItems?.length ? data.valuesItems : aboutPage.valuesItems
  const heroImageUrls = hero.imageUrls ?? (hero.imageUrl ? [hero.imageUrl] : aboutPage.hero.imageUrls)

  return (
    <>
      <HeroPage
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        imageUrls={heroImageUrls}
        primaryButtonLabel={hero.primaryButtonLabel}
        primaryButtonTo={hero.primaryButtonTo}
        secondaryButtonLabel={hero.secondaryButtonLabel}
        secondaryButtonTo={hero.secondaryButtonTo}
      />
      <ProcessIntroSection
        data={{
          ...processIntro,
          imageAspectClass: 'aspect-[5/4]',
          linkLabel: 'See our approach',
          linkTo: '/our-approach',
        }}
        bg="bg-white"
      />
      <ValuesSection items={valuesItems} columnsClass="md:grid-cols-4" bg="bg-white" />
      <MeetTheTeamSection data={data?.team} />
      <TestimonialsSection
        section={home?.testimonialsSection?.heading ? home.testimonialsSection : testimonialsSection}
        items={home?.testimonials?.length ? home.testimonials : testimonials}
        bg="bg-white"
      />
      <FinalCtaSection />
    </>
  )
}
