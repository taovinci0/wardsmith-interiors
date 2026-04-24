import { Link } from 'react-router-dom'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { blogArchive, blogPostsSeed } from '../data/innerPagesContent.js'

export function BlogArchivePage() {
  const { hero } = blogArchive

  return (
    <>
      <HeroPage
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        imageUrls={hero.imageUrls}
        showButtons={false}
      />
      <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {blogPostsSeed.map((post) => (
              <article key={post.slug} className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-sm">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <p className="mb-2 font-sans text-xs uppercase tracking-widest text-accent-600">{post.date}</p>
                    <h2 className="mb-3 font-serif text-2xl text-primary group-hover:text-accent-600">{post.title}</h2>
                    <p className="font-sans font-light text-neutral-600">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
