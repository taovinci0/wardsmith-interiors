import { useParams, Link } from 'react-router-dom'
import { GreenBandCtaSection } from '../components/sections/GreenBandCtaSection.jsx'
import { CaseStudyProcessIntroSection } from '../components/sections/CaseStudyProcessIntroSection.jsx'
import { CaseStudyRelatedSection } from '../components/sections/CaseStudyRelatedSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { ServiceGalleryHeaderSection } from '../components/sections/ServiceGalleryHeaderSection.jsx'
import { defaultHeroBg, getCaseStudyBySlug, getRelatedCaseStudies } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { caseStudyBySlugQuery } from '../sanity/queries.js'

export function CaseStudyDetailPage() {
  const { slug } = useParams()
  const { data, loading } = useSanityData(caseStudyBySlugQuery, slug ? { slug } : null)
  const cs = data ?? (slug ? getCaseStudyBySlug(slug) : null)
  const related = cs?.related?.length ? cs.related : slug ? getRelatedCaseStudies(slug, 3) : []

  if (!cs) {
    if (loading) return <section className="section-padding" />
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="mb-4 font-serif text-3xl text-primary">Project not found</h1>
          <Link to="/projects" className="btn-primary inline-block">
            All projects
          </Link>
        </div>
      </section>
    )
  }

  const galleryUrls = cs.galleryImageUrls?.length ? cs.galleryImageUrls : []

  return (
    <>
      <HeroPage
        eyebrow="Projects"
        heading={cs.title}
        imageUrls={[cs.imageUrl || defaultHeroBg]}
        showButtons={false}
      />
      <CaseStudyProcessIntroSection
        projectOverview={cs.projectOverview}
        location={cs.location}
        servicesLine={cs.servicesLine}
        cost={cs.cost}
        imageUrl={cs.imageUrl}
        testimonialVideoUrl={cs.testimonialVideoUrl}
        testimonialVideoPosterUrl={cs.testimonialVideoPosterUrl}
      />
      {cs.brief || cs.designDecisions || cs.specification?.length ? (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-14 lg:grid-cols-[1fr_320px]">
              <div>
                {cs.brief ? (
                  <div className="mb-12">
                    <h2 className="heading-to-body-spacing font-serif text-3xl text-primary">The brief</h2>
                    {cs.brief.split(/\n{2,}/).map((p) => (
                      <p key={p.slice(0, 32)} className="mb-5 font-sans text-lg font-light leading-relaxed text-neutral-600 last:mb-0">
                        {p}
                      </p>
                    ))}
                  </div>
                ) : null}
                {cs.designDecisions ? (
                  <div>
                    <h2 className="heading-to-body-spacing font-serif text-3xl text-primary">Design decisions</h2>
                    {cs.designDecisions.split(/\n{2,}/).map((p) => (
                      <p key={p.slice(0, 32)} className="mb-5 font-sans text-lg font-light leading-relaxed text-neutral-600 last:mb-0">
                        {p}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
              {cs.specification?.length ? (
                <aside>
                  <h2 className="mb-6 font-serif text-2xl text-primary">Specification</h2>
                  <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {cs.specification.map((s) => (
                      <div key={s.label} className="py-3">
                        <dt className="font-sans text-sm uppercase tracking-wide text-neutral-500">{s.label}</dt>
                        <dd className="font-sans text-primary">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
      {galleryUrls.length ? (
        <ServiceGalleryHeaderSection
          eyebrow={cs.galleryEyebrow || 'Project Gallery'}
          heading={cs.galleryHeading || 'See the Transformation'}
          paragraph={
            cs.galleryParagraph ||
            'Explore the finished project through our curated selection of images showcasing the craftsmanship and attention to detail.'
          }
          imageUrls={galleryUrls}
        />
      ) : null}
      <CaseStudyRelatedSection items={related} />
      <GreenBandCtaSection
        id="case-study-cta-section"
        heading={cs.ctaHeading || 'Ready to Transform Your Home?'}
        content={
          cs.ctaContent ||
          "Whether you have a clear brief in mind or need guidance to shape your ideas, we're here to help."
        }
        primaryLabel={cs.ctaButtonLabel || 'Start Your Project'}
        primaryTo={cs.ctaButtonTo || '/start-your-project'}
      />
    </>
  )
}
