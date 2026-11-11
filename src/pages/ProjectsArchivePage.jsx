import { useState } from 'react'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { ProjectCardsGrid } from '../components/sections/ProjectCardsGrid.jsx'
import { caseStudiesSeed, defaultHeroBg } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { projectsListQuery } from '../sanity/queries.js'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'kitchen', label: 'Kitchens' },
  { value: 'living', label: 'Living Spaces' },
]

const kitchensFirst = (a, b) => (a.room === 'kitchen' ? 0 : 1) - (b.room === 'kitchen' ? 0 : 1)

export function ProjectsArchivePage() {
  const { data } = useSanityData(projectsListQuery)
  const [filter, setFilter] = useState('all')

  const all = (data && data.length ? data : caseStudiesSeed).slice().sort(kitchensFirst)
  const items =
    filter === 'all'
      ? all
      : filter === 'kitchen'
        ? all.filter((p) => p.room === 'kitchen')
        : all.filter((p) => p.room && p.room !== 'kitchen')

  return (
    <>
      <HeroPage eyebrow="Projects" heading="Completed projects" imageUrls={[defaultHeroBg]} showButtons={false} />
      <section className="bg-neutral-100" style={{ paddingTop: '6rem', paddingBottom: '8rem' }}>
        <div className="container-custom">
          <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter projects by room">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`rounded-full border px-5 py-2 font-sans text-sm transition-colors ${
                  filter === f.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-neutral-400 bg-transparent text-primary hover:border-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {items.length ? (
            <ProjectCardsGrid items={items} />
          ) : (
            <p className="font-sans font-light text-neutral-600">More projects in this category are on their way.</p>
          )}
        </div>
      </section>
    </>
  )
}
