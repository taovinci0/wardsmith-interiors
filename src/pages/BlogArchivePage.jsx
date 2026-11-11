import { Link } from 'react-router-dom'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { blogArchive, blogPostsSeed } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { blogPostsListQuery } from '../sanity/queries.js'

function formatDate(d) {
  const date = new Date(d)
  return Number.isNaN(date.getTime())
    ? d
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function shortExcerpt(text, max = 180) {
  const t = String(text || '').trim()
  if (t.length <= max) return t
  return `${t.slice(0, max).replace(/\s+\S*$/, '')}…`
}

export function BlogArchivePage() {
  const { hero } = blogArchive
  const { data } = useSanityData(blogPostsListQuery)
  const posts = data && data.length ? data : blogPostsSeed

  return (
    <>
      <HeroPage eyebrow="Journal" heading="Notes from the workshop" imageUrls={hero.imageUrls} showButtons={false} />
      <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
                <Link to={`/journal/${post.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <p className="mb-2 font-sans text-xs uppercase tracking-widest text-accent-600">{formatDate(post.date)}</p>
                    <h2 className="mb-3 font-serif text-2xl text-primary group-hover:text-accent-600">{post.title}</h2>
                    <p className="font-sans font-light text-neutral-600">{shortExcerpt(post.excerpt)}</p>
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
