export function PagePlaceholder({ title, description }) {
  return (
    <section className="py-section">
      <div className="mx-auto max-w-container px-[5%]">
        <p className="mb-2 font-sans text-xs font-medium uppercase tracking-widest text-accent-600">
          Migration scaffold
        </p>
        <h1 className="mb-4 font-serif text-4xl text-primary md:text-5xl">{title}</h1>
        {description ? (
          <p className="max-w-2xl font-sans text-base leading-relaxed text-neutral-600">{description}</p>
        ) : null}
      </div>
    </section>
  )
}
