import { Link } from 'react-router-dom'
import { SectionHeaderSplit } from './SectionHeaderSplit.jsx'

/**
 * Homepage "What we make" — three image-led cards with overlay captions:
 * one wide kitchens card, living spaces and projects beside it.
 */
const CAPTION_GRADIENT =
  'linear-gradient(to top, rgba(12,16,16,0.82) 0%, rgba(12,16,16,0.32) 60%, rgba(12,16,16,0) 100%)'

function Card({ to, imageUrl, index, tag, title, blurb, wide = false }) {
  if (!imageUrl) return null
  return (
    <Link
      to={to}
      className={`group relative block overflow-hidden rounded-lg ${wide ? 'col-span-full aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'}`}
    >
      <img
        src={imageUrl}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8" style={{ background: CAPTION_GRADIENT }}>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <span className="font-serif text-xl text-accent-600">{index}</span>
          {tag ? (
            <span className="font-sans text-[11px] font-light uppercase tracking-[0.1em] text-white/75">{tag}</span>
          ) : null}
        </div>
        <p className={`font-serif text-white ${wide ? 'text-3xl' : 'text-2xl'} mb-1`}>{title}</p>
        {blurb ? <p className="font-sans text-sm font-light text-white/85">{blurb}</p> : null}
      </div>
    </Link>
  )
}

export function WhatWeMakeSection({ kitchensImageUrl, livingImageUrl, projectsImageUrl }) {
  if (!kitchensImageUrl && !livingImageUrl && !projectsImageUrl) return null

  return (
    <section id="what-we-make-section" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeaderSplit
          eyebrow="What we make"
          heading="One workshop, one standard of craft."
          intro="From first sketch to final fitting — kitchens, fitted furniture and the awkward spaces catalogue furniture cannot reach, all made by our own team."
        />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <Card
            to="/kitchens"
            imageUrl={kitchensImageUrl}
            index="01"
            tag="Our flagship service"
            title="Bespoke kitchens"
            blurb="Designed at your table, made at Wicks Manor, installed by the makers."
            wide
          />
          <Card
            to="/living-spaces"
            imageUrl={livingImageUrl}
            index="02"
            title="Living spaces"
            blurb="Bedrooms, offices, media walls and tailored spaces."
          />
          <Card
            to="/projects"
            imageUrl={projectsImageUrl}
            index="03"
            title="Completed projects"
            blurb="Recent work across Essex, room by room."
          />
        </div>
      </div>
    </section>
  )
}
