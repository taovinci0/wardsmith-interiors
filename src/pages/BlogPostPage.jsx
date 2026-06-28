import { useParams, Link } from 'react-router-dom'
import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { BlogRelatedSection } from '../components/sections/BlogRelatedSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { PortableBody } from '../components/PortableBody.jsx'
import { defaultHeroBg, getBlogPostBySlug, getRelatedBlogPosts } from '../data/innerPagesContent.js'
import { useSanityData } from '../hooks/useSanityData.js'
import { blogPostBySlugQuery } from '../sanity/queries.js'

export function BlogPostPage() {
  const { slug } = useParams()
  const { data, loading } = useSanityData(blogPostBySlugQuery, slug ? { slug } : null)
  const post = data ?? (slug ? getBlogPostBySlug(slug) : null)
  const related = post?.related?.length ? post.related : slug ? getRelatedBlogPosts(slug, 3) : []

  if (!post) {
    if (loading) return <section className="section-padding" />
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="mb-4 font-serif text-3xl text-primary">Post not found</h1>
          <Link to="/blog" className="btn-primary inline-block">
            Back to blog
          </Link>
        </div>
      </section>
    )
  }

  // Sanity body is Portable Text (array); static fallback body is a plain string.
  const isPortable = Array.isArray(post.body)
  const paragraphs = isPortable
    ? []
    : String(post.body || '').split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  const eyebrow = post.category || 'Blog'

  return (
    <>
      <HeroPage
        eyebrow={eyebrow}
        heading={post.title}
        imageUrls={[post.imageUrl || defaultHeroBg]}
        showButtons={false}
      />
      <section className="section-padding bg-neutral-100">
        <div className="container-custom mx-auto max-w-3xl">
          <p className="mb-8 font-sans text-sm uppercase tracking-widest text-accent-600">{post.date}</p>
          <p className="mb-10 font-serif text-xl font-light text-primary">{post.excerpt}</p>
          {isPortable ? (
            <PortableBody value={post.body} />
          ) : (
            paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="mb-6 font-sans text-lg font-light leading-relaxed text-neutral-600 last:mb-0">
                {p}
              </p>
            ))
          )}
        </div>
      </section>
      <BlogRelatedSection posts={related} />
      <FinalCtaSection />
    </>
  )
}
