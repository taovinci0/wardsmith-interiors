import { useParams, Link } from 'react-router-dom'
import { FinalCtaSection } from '../components/sections/FinalCtaSection.jsx'
import { BlogRelatedSection } from '../components/sections/BlogRelatedSection.jsx'
import { HeroPage } from '../components/heroes/HeroPage.jsx'
import { defaultHeroBg, getBlogPostBySlug, getRelatedBlogPosts } from '../data/innerPagesContent.js'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPostBySlug(slug) : null
  const related = slug ? getRelatedBlogPosts(slug, 3) : []

  if (!post) {
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

  const paragraphs = post.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
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
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mb-6 font-sans text-lg font-light leading-relaxed text-neutral-600 last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </section>
      <BlogRelatedSection posts={related} />
      <FinalCtaSection />
    </>
  )
}
