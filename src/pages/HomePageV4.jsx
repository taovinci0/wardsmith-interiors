import { HeroHome } from '../components/sections/HeroHome.jsx'
import { KitchensHomeSection } from '../components/sections/KitchensHomeSection.jsx'
import { TestimonialsSection } from '../components/sections/TestimonialsSection.jsx'
import { RoomsFirstSection } from '../components/sections/home-v4/HomeEditorialSections.jsx'
import { ConsideredGridSection } from '../components/sections/home-v4/ConsideredGridSection.jsx'
import { FeaturedProjectSection } from '../components/sections/home-v4/FeaturedProjectSection.jsx'
import { RoomByRoomSection } from '../components/sections/home-v4/RoomByRoomSection.jsx'
import { PromiseSection } from '../components/sections/home-v4/PromiseSection.jsx'
import { ApproachStripSection } from '../components/sections/home-v4/ApproachStripSection.jsx'
import { FinalCtaDualSection } from '../components/sections/home-v4/FinalCtaDualSection.jsx'
import { useCms } from '../context/useCms.js'
import { homeV4 } from '../data/homeV4Content.js'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Ward-Smith+Interiors+Maldon+reviews'

/**
 * Homepage v4 — Seb's wireframe layout (Nov 2026), rendered entirely in
 * the site's existing visual language: the shipped full-height photo hero
 * with his copy, then his section order in our treatments.
 */
export function HomePageV4() {
  const { home } = useCms()

  return (
    <>
      {/* 1 — existing hero (photo + brandmark), Seb's words */}
      <HeroHome override={homeV4.heroOverride} />

      {/* 2 — the rooms you use most */}
      <RoomsFirstSection data={homeV4.roomsFirst} />

      {/* 3 — kitchens are where we do our finest work (CMS section, as shipped) */}
      <KitchensHomeSection data={home?.kitchensSection} />

      {/* 4 — considered down to the last drawer */}
      <ConsideredGridSection data={homeV4.considered} />

      {/* 5 — featured project (placeholder; hides in production until a
             completed kitchen caseStudy exists) */}
      <FeaturedProjectSection data={homeV4.featuredProject} />

      {/* 6 — the same care, room by room */}
      <RoomByRoomSection data={homeV4.roomByRoom} />

      {/* 7 — the dark act: promise + commitments + guarantee card */}
      <PromiseSection data={homeV4.promise} guarantee={homeV4.guarantee} />

      {/* 8 — a big decision should never feel like a leap of faith */}
      <ApproachStripSection data={homeV4.approach} />

      {/* 9 — in their words + rating row */}
      <TestimonialsSection section={homeV4.testimonialsHead} items={homeV4.testimonials} bg="bg-white" />
      <section className="bg-white pb-24">
        <div className="container-custom flex flex-wrap items-center justify-between gap-6 border-t border-neutral-300 pt-10">
          <p className="m-0 flex items-baseline gap-4">
            <span className="font-serif text-4xl text-primary">5.0</span>
            <span className="font-sans text-sm font-light text-neutral-600">
              Rated on Google by homeowners across Essex
            </span>
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:text-accent-600"
          >
            <span>Read our reviews</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>

      {/* 10 — tell us about your home */}
      <FinalCtaDualSection data={homeV4.finalCta} />
    </>
  )
}
