export function LegalDocumentSection({ paragraphs = [] }) {
  if (!paragraphs.length) return null

  return (
    <section className="bg-neutral-100" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
      <div className="container-custom">
        <article className="mx-auto max-w-3xl font-sans font-light text-neutral-600">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mb-6 text-base leading-relaxed last:mb-0">
              {p}
            </p>
          ))}
        </article>
      </div>
    </section>
  )
}
