import { homeV4 } from '../data/homeV4Content.js'
import { HeroHomeV4 } from '../components/sections/home-v4/HeroHomeV4.jsx'
import {
  RoomsFirstSection,
  FinestWorkSection,
} from '../components/sections/home-v4/HomeEditorialSections.jsx'
import { ConsideredGridSection } from '../components/sections/home-v4/ConsideredGridSection.jsx'
import { FeaturedProjectSection } from '../components/sections/home-v4/FeaturedProjectSection.jsx'
import { RoomByRoomSection } from '../components/sections/home-v4/RoomByRoomSection.jsx'
import { PromiseSection } from '../components/sections/home-v4/PromiseSection.jsx'
import { ApproachStripSection } from '../components/sections/home-v4/ApproachStripSection.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { FinalCtaDualSection } from '../components/sections/home-v4/FinalCtaDualSection.jsx'

/**
 * Homepage v4 — Seb's November 2026 wireframe, built for local review.
 * Static content (src/data/homeV4Content.js) until the layout is signed
 * off; Sanity schema + wiring follow approval.
 */
export function HomePageV4() {
  return (
    <>
      <HeroHomeV4 data={homeV4.hero} />
      <RoomsFirstSection data={homeV4.roomsFirst} />
      <FinestWorkSection data={homeV4.finestWork} />
      <ConsideredGridSection data={homeV4.considered} />
      <FeaturedProjectSection data={homeV4.featuredProject} />
      <RoomByRoomSection data={homeV4.roomByRoom} />
      <PromiseSection data={homeV4.promise} guarantee={homeV4.guarantee} />
      <ApproachStripSection data={homeV4.approach} />
      <TestimonialsSection section={homeV4.testimonialsHead} items={homeV4.testimonials} />
      <FinalCtaDualSection data={homeV4.finalCta} />
    </>
  )
}
