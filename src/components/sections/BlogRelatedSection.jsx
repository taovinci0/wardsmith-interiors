import { Link } from 'react-router-dom'

export function BlogRelatedSection({ posts = [] }) {
  if (!posts.length) return null

  return (
    <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container-custom">
        <div className="blog-related-header-animate mx-auto mb-16 max-w-[720px] text-center">
          <p className="blog-related-eyebrow eyebrow eyebrow-spacing text-accent-600">Related Posts</p>
          <h2 className="blog-related-heading heading-to-body-spacing font-serif text-[3rem] text-primary">More Articles</h2>
        </div>

        <div className="blog-related-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="group">
              <Link to={`/blog/${p.slug}`} className="block">
                {p.imageUrl ? (
                  <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[24px]">
                    <img
                      src={p.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <p className="mb-2 font-sans text-xs uppercase tracking-widest text-accent-600">{p.date}</p>
                <h3 className="mb-2 font-serif text-2xl text-primary transition-colors group-hover:text-accent-600">
                  {p.title}
                </h3>
                {p.excerpt ? <p className="font-sans text-sm font-light text-neutral-600">{p.excerpt}</p> : null}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
