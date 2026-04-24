import { useState } from 'react'
import { faqItems } from '../../data/faqItems.js'

export function FaqsAccordionSection({ items = faqItems }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faqs-section" className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {items.map((faq, index) => {
              const isOpen = openIndex === index
              const panelId = `faq-panel-${index}`
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[24px] border bg-white transition-colors ${
                    isOpen ? 'border-primary/20' : 'border-primary/10'
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between p-6 text-left text-xl leading-relaxed text-primary transition-colors hover:text-primary-dark"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(index)}
                  >
                    <span className="flex-1 pr-4 font-sans font-semibold">{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-primary transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      aria-hidden
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {isOpen ? (
                    <div id={panelId} className="overflow-hidden">
                      <div className="px-6 pb-6 font-sans font-light leading-relaxed text-neutral-600">
                        <p className="mb-0">{faq.answer}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
