import { Helmet } from 'react-helmet-async'
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
import { processIntro as processIntroFallback } from '../data/homePageContent.js'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Ward-Smith+Interiors+Maldon+reviews'

function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden className="shrink-0 self-center">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/**
 * Homepage v4 preview at /home-v2 — Seb's wireframe layout in the site's
 * visual language, per the approved design canvas. noindex: the real
 * homepage stays canonical until this one is signed off and swapped in.
 */
export function HomePageV4() {
  const { home } = useCms()
  const film = home?.processIntro?.videoUrl ? home.processIntro : processIntroFallback

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* 1 — existing hero (photo + brandmark), Seb's words, two-line title */}
      <HeroHome override={homeV4.heroOverride} />

      {/* 2 — the rooms you use most */}
      <RoomsFirstSection data={homeV4.roomsFirst} />

      {/* 3 — kitchens are where we do our finest work (CMS section, as shipped) */}
      <KitchensHomeSection data={home?.kitchensSection} />

      {/* 4 — considered down to the last drawer */}
      <ConsideredGridSection data={homeV4.considered} />

      {/* 5 — featured project (placeholder; hide before homepage swap if no
             completed kitchen caseStudy exists) */}
      <FeaturedProjectSection data={homeV4.featuredProject} />

      {/* 6 — the same care, room by room */}
      <RoomByRoomSection data={homeV4.roomByRoom} />

      {/* 7 — the dark act: promise + workshop film + commitments + guarantee */}
      <PromiseSection
        data={homeV4.promise}
        guarantee={homeV4.guarantee}
        filmPosterUrl={film?.imageUrl}
        filmVideoUrl={film?.videoUrl}
      />

      {/* 8 — approach: framed 3+2 grid with CTA tile */}
      <ApproachStripSection data={homeV4.approach} />

      {/* 9 — in their words + Google rating row */}
      <TestimonialsSection section={homeV4.testimonialsHead} items={homeV4.testimonials} bg="bg-white" />
      <section className="bg-white pb-24">
        <div className="container-custom flex flex-wrap items-center justify-between gap-6 border-t border-neutral-300 pt-10">
          <p className="m-0 flex items-baseline gap-4">
            <span className="font-serif text-4xl text-primary">5.0</span>
            <GoogleG />
            <span className="font-sans text-sm font-light text-neutral-600">
              Rated on Google by homeowners across Essex · 56 reviews
            </span>
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary underline decoration-primary/35 decoration-1 underline-offset-[6px] transition-colors hover:text-accent-600"
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

      {/* 10 — tell us about your home (dual-path, corner plus-grid) */}
      <FinalCtaDualSection data={homeV4.finalCta} />
    </>
  )
}
