import { PortableText } from '@portabletext/react'

const components = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 font-sans text-lg font-light leading-relaxed text-neutral-600 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => <h2 className="mb-4 mt-12 font-serif text-3xl text-primary first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-10 font-serif text-2xl text-primary first:mt-0">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-3 mt-8 font-serif text-xl text-primary first:mt-0">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="mb-6 border-l-4 border-accent-600 pl-6 font-serif text-xl font-light italic text-primary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 font-sans text-lg font-light text-neutral-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 font-sans text-lg font-light text-neutral-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//i.test(href)
      return (
        <a
          href={href}
          className="text-accent-600 underline underline-offset-4 hover:text-accent-700"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <img src={value.url} alt={value.alt || ''} className="my-8 w-full rounded-[24px]" loading="lazy" />
      ) : null,
  },
}

export function PortableBody({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null
  return <PortableText value={value} components={components} />
}
