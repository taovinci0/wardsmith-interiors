import { useState } from 'react'
import { Link } from 'react-router-dom'

const inputClass =
  'w-full rounded-lg border border-primary/20 bg-white px-4 py-3 font-sans text-neutral-900 outline-none transition-colors focus:border-accent-600'

export function ContactConsultationSection({
  heading = 'Still unsure?',
  intro = 'Book a free 20 minute consultation to discuss your project and get expert advice.',
  projectHeading = 'Start Your Project',
  projectText = 'Already know what you want? Send us your project details.',
  projectButtonLabel = 'Start Your Project',
  projectButtonTo = '/start-your-project',
  phone,
  email,
  address,
} = {}) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-neutral-100" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-[3rem] text-primary">{heading}</h2>
              <p className="mb-6 font-sans text-lg font-light leading-relaxed text-neutral-600">{intro}</p>
            </div>

            {submitted ? (
              <div className="mb-8 rounded-lg bg-primary p-8 text-center text-white">
                <h3 className="mb-4 font-serif text-2xl">Request received</h3>
                <p className="font-sans font-light">
                  In production this will post to your server. For now this is a UI-only confirmation.
                </p>
              </div>
            ) : (
              <form id="consultation-booking-form" className="consultation-form" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="consultation_name" className="mb-2 block font-sans text-sm font-medium text-primary">
                    Name <span className="text-accent-600">*</span>
                  </label>
                  <input type="text" id="consultation_name" name="consultation_name" className={inputClass} required />
                </div>
                <div className="mb-6">
                  <label htmlFor="consultation_email" className="mb-2 block font-sans text-sm font-medium text-primary">
                    Email <span className="text-accent-600">*</span>
                  </label>
                  <input type="email" id="consultation_email" name="consultation_email" className={inputClass} required />
                </div>
                <div className="mb-6">
                  <label htmlFor="consultation_phone" className="mb-2 block font-sans text-sm font-medium text-primary">
                    Phone Number <span className="text-accent-600">*</span>
                  </label>
                  <input type="tel" id="consultation_phone" name="consultation_phone" className={inputClass} required />
                </div>
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="consultation_date" className="mb-2 block font-sans text-sm font-medium text-primary">
                      Preferred Date <span className="text-accent-600">*</span>
                    </label>
                    <input type="date" id="consultation_date" name="consultation_date" className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="consultation_time" className="mb-2 block font-sans text-sm font-medium text-primary">
                      Preferred Time <span className="text-accent-600">*</span>
                    </label>
                    <select id="consultation_time" name="consultation_time" className={inputClass} required defaultValue="">
                      <option value="" disabled>
                        Select time…
                      </option>
                      {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-8">
                  <label className="flex cursor-pointer items-start gap-3 font-sans text-sm text-neutral-600">
                    <input type="checkbox" name="consultation_terms" className="mt-1" required />
                    <span>
                      I agree to the terms & conditions. By providing my phone number, I agree to receive messages from
                      Ward-Smith Interiors about my enquiry. <span className="text-accent-600">*</span>
                    </span>
                  </label>
                </div>
                <button type="submit" className="btn-primary">
                  Book Consultation
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 className="mb-8 font-serif text-[3rem] text-primary">{projectHeading}</h2>
            <div className="mt-12 border-t border-neutral-300 pt-8">
              <p className="mb-4 font-sans font-light text-neutral-600">{projectText}</p>
              <Link to={projectButtonTo} className="btn-secondary inline-block">
                {projectButtonLabel}
              </Link>
            </div>
            {phone || email || address ? (
              <div className="mt-12 border-t border-neutral-300 pt-8 font-sans font-light text-neutral-600">
                {phone ? (
                  <p className="mb-2">
                    <span className="font-medium text-primary">Phone:</span>{' '}
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-accent-600">{phone}</a>
                  </p>
                ) : null}
                {email ? (
                  <p className="mb-2">
                    <span className="font-medium text-primary">Email:</span>{' '}
                    <a href={`mailto:${email}`} className="hover:text-accent-600">{email}</a>
                  </p>
                ) : null}
                {address ? (
                  <p className="whitespace-pre-line">
                    <span className="font-medium text-primary">Address:</span> {address}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
