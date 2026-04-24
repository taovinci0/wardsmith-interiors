import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="py-section">
      <div className="mx-auto max-w-container px-[5%] text-center">
        <h1 className="mb-4 font-serif text-4xl text-primary md:text-5xl">Page not found</h1>
        <p className="mb-8 font-sans text-neutral-600">This route does not exist in the new app yet.</p>
        <Link
          to="/"
          className="inline-flex rounded-full bg-accent-600 px-6 py-3 font-sans text-xs font-medium uppercase tracking-wide text-primary"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
