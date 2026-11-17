import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const enquiryApiUrl = import.meta.env.VITE_ENQUIRY_API_URL || '/api/enquiry'

const SPACE_OPTIONS = ['Bedroom', 'Home Office', 'Kitchen', 'Media Wall', 'Understairs Storage', 'Other']

const STAGE_OPTIONS = [
  'Just starting to explore ideas',
  'Have a clear idea of what I want',
  'Ready to move forward with a design',
]

const BUDGET_OPTIONS = ['£3,000–£5,000', '£5,000–£10,000', '£10,000–£20,000', '£20,000+']

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 3 months',
  'Within 6 months',
  'Just planning ahead',
]

function stepClass(active) {
  return active ? 'block' : 'hidden'
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error(`Failed reading file: ${file.name}`))
    reader.onload = () => resolve(String(reader.result || ''))
    reader.readAsDataURL(file)
  })
}

const STEP_LABELS = ['Project overview', 'Measurements', 'Budget & timeline', 'Contact details']

/**
 * Multi-step enquiry (4 steps + thank you).
 * variant="card": framed card for embedding beside the contact rail (starts at step 1);
 * variant="standalone": full-band section with intro step (legacy pages).
 */
export function EnquiryFormSection({ variant = 'standalone' }) {
  const isCard = variant === 'card'
  const [step, setStep] = useState(isCard ? 1 : 0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const showProgress = step >= 1 && step <= 4

  async function submitEnquiry(form) {
    const fd = new FormData(form)
    const payload = {
      enquiry_name: fd.get('enquiry_name'),
      enquiry_email: fd.get('enquiry_email'),
      enquiry_phone: fd.get('enquiry_phone'),
      enquiry_address: fd.get('enquiry_address'),
      enquiry_space_type: fd.get('enquiry_space_type'),
      enquiry_project_description: fd.get('enquiry_project_description'),
      enquiry_stage: fd.get('enquiry_stage'),
      enquiry_inspiration: fd.get('enquiry_inspiration'),
      enquiry_dimensions: fd.get('enquiry_dimensions'),
      enquiry_requirements: fd.get('enquiry_requirements'),
      enquiry_budget: fd.get('enquiry_budget'),
      enquiry_timeline: fd.get('enquiry_timeline'),
      enquiry_terms: fd.get('enquiry_terms') === 'on',
    }
    const files = form.querySelector('#enquiry_files')?.files
    payload.attached_file_names = files && files.length ? [...files].map((f) => f.name) : []
    payload.attached_file_sizes = files && files.length ? [...files].map((f) => f.size) : []
    payload.attachments = []
    if (files && files.length) {
      const maxFiles = 3
      const selected = [...files].slice(0, maxFiles)
      for (const f of selected) {
        const dataUrl = await fileToDataUrl(f)
        const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
        if (!match) continue
        payload.attachments.push({
          name: f.name,
          type: match[1] || f.type || 'application/octet-stream',
          size: f.size,
          base64: match[2],
        })
      }
    }

    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch(enquiryApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const text = await res.text()
      if (!res.ok) throw new Error(text || res.statusText)
      setStep(5)
    } catch (e) {
      console.error(e)
      setSubmitError(
        'We could not send your enquiry just now. Please email hello@wardsmithinteriors.co.uk or try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const body = (
    <>
        <div
          className={`enquiry-progress ${isCard ? 'mb-9 border-b border-neutral-300 pb-6' : 'mb-12'}`}
          style={showProgress ? undefined : { display: 'none' }}
        >
          <div className={`flex flex-wrap gap-x-6 gap-y-3 ${isCard ? 'justify-between' : 'justify-center'}`}>
            {[1, 2, 3, 4].map((n, i) => (
              <div key={n} className="flex items-baseline gap-2.5" data-step={n}>
                <span className={`font-serif text-lg ${step >= n ? 'text-accent-600' : 'text-neutral-300'}`}>
                  {String(n).padStart(2, '0')}
                </span>
                <span
                  className={`hidden font-sans text-[11px] uppercase tracking-[0.12em] md:block ${
                    step >= n ? 'font-bold text-primary' : 'font-medium text-neutral-500'
                  }`}
                >
                  {STEP_LABELS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={isCard ? 'enquiry-form-container' : 'enquiry-form-container mx-auto max-w-3xl'}>
          <form
            id="enquiry-form"
            className={step === 5 ? 'hidden' : 'enquiry-form'}
            onSubmit={(e) => {
              e.preventDefault()
              if (step === 4) submitEnquiry(e.currentTarget)
            }}
          >
            <div className={stepClass(step === 0)} data-step="0">
              <h1 className="mb-8 font-serif text-primary" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.08 }}>
                Start your project.
              </h1>
              <div className="mb-8 font-sans text-lg font-light leading-relaxed text-neutral-600">
                <p>
                  Ready to transform your space? Fill out our detailed project form to share your vision, requirements, and
                  preferences. We&apos;ll use this information to create a tailored design solution for your home.
                </p>
              </div>
              <div className="form-field mt-8">
                <button type="button" className="btn-primary" onClick={() => setStep(1)}>
                  Start now
                </button>
              </div>
              <div className="mt-12 border-t border-neutral-300 pt-8">
                <p className="font-sans font-light text-neutral-600">
                  Prefer to talk it through first? Call or email us using the details above and we&apos;ll arrange a free
                  20 minute consultation.
                </p>
              </div>
            </div>

            <div className={stepClass(step === 4)} data-step="4">
              <h2 className="mb-8 font-serif text-[1.75rem] text-primary">Contact details</h2>
              <div className="mb-8">
                <label htmlFor="enquiry_name" className="form-label-ws">
                  Name <span className="text-accent-600">*</span>
                </label>
                <input id="enquiry_name" name="enquiry_name" className="form-input-ws" required autoComplete="name" />
              </div>
              <div className="mb-8">
                <label htmlFor="enquiry_email" className="form-label-ws">
                  Email <span className="text-accent-600">*</span>
                </label>
                <input
                  id="enquiry_email"
                  name="enquiry_email"
                  type="email"
                  className="form-input-ws"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="enquiry_phone" className="form-label-ws">
                  Phone Number <span className="text-accent-600">*</span>
                </label>
                <input id="enquiry_phone" name="enquiry_phone" type="tel" className="form-input-ws" required autoComplete="tel" />
              </div>
              <div className="mb-8">
                <label htmlFor="enquiry_address" className="form-label-ws">
                  Address <span className="text-accent-600">*</span>
                </label>
                <textarea id="enquiry_address" name="enquiry_address" className="form-textarea-ws" rows={3} required />
              </div>
              <div className="form-field mt-8">
                <label className="form-radio-label-ws max-w-none">
                  <input id="enquiry_terms" name="enquiry_terms" type="checkbox" className="mt-1 rounded border-neutral-300" required />
                  <span className="text-sm">
                    I agree to terms &amp; conditions provided by the Ward-Smith Interiors Ltd. By providing my phone number, I
                    agree to receive text messages from the business. <span className="text-accent-600">*</span>
                  </span>
                </label>
              </div>
              {submitError ? (
                <p className="mb-4 font-sans text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}
              <div className="form-field mt-8 flex gap-4">
                <button type="button" className="btn-secondary" onClick={() => setStep(3)} disabled={submitting}>
                  Back
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Submit Enquiry'}
                </button>
              </div>
            </div>

            <div className={stepClass(step === 1)} data-step="1">
              <h2 className="mb-8 font-serif text-[1.75rem] text-primary">Project overview</h2>
              <div className="mb-8">
                <label htmlFor="enquiry_space_type" className="form-label-ws">
                  What type of space are you looking to transform? <span className="text-accent-600">*</span>
                </label>
                <select id="enquiry_space_type" name="enquiry_space_type" className="form-select-ws" required defaultValue="">
                  <option value="">Please select...</option>
                  {SPACE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-8">
                <label htmlFor="enquiry_project_description" className="form-label-ws">
                  Please describe what you&apos;d like to achieve with the project. <span className="text-accent-600">*</span>
                </label>
                <textarea
                  id="enquiry_project_description"
                  name="enquiry_project_description"
                  className="form-textarea-ws"
                  rows={5}
                  placeholder="e.g., We want more storage and a modern look."
                  required
                />
              </div>
              <div className="mb-8">
                <p className="form-label-ws">
                  What stage are you currently at? <span className="text-accent-600">*</span>
                </p>
                <div className="radio-group mt-2 flex flex-col gap-3">
                  {STAGE_OPTIONS.map((val) => (
                    <label key={val} className="form-radio-label-ws">
                      <input type="radio" name="enquiry_stage" value={val} className="mt-1" required />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="enquiry_inspiration" className="form-label-ws">
                  Do you have any inspiration images, sketches, or Pinterest boards?{' '}
                  <span className="text-sm font-normal text-neutral-500">(Optional)</span>
                </label>
                <input
                  id="enquiry_inspiration"
                  name="enquiry_inspiration"
                  className="form-input-ws"
                  placeholder="Paste a link or describe your inspiration"
                />
                <p className="mt-2 font-sans text-sm font-light text-neutral-500">You can also attach files in the next step</p>
              </div>
              <div className="form-field mt-8 flex items-center justify-between gap-4">
                {!isCard ? (
                  <button type="button" className="btn-secondary" onClick={() => setStep(0)}>
                    Back
                  </button>
                ) : (
                  <p className="m-0 font-sans text-[13px] font-light text-neutral-500">Step 1 of 4 · takes about 3 minutes</p>
                )}
                <button type="button" className="btn-primary" onClick={() => setStep(2)}>
                  Continue
                </button>
              </div>
            </div>

            <div className={stepClass(step === 2)} data-step="2">
              <h2 className="mb-8 font-serif text-[1.75rem] text-primary">Measurements</h2>
              <div className="mb-8">
                <label htmlFor="enquiry_dimensions" className="form-label-ws">
                  Do you have approximate dimensions of the space?{' '}
                  <span className="text-sm font-normal text-neutral-500">(Optional)</span>
                </label>
                <textarea
                  id="enquiry_dimensions"
                  name="enquiry_dimensions"
                  className="form-textarea-ws"
                  rows={4}
                  placeholder="Enter dimensions or describe the space"
                />
                <p className="mt-2 font-sans text-sm font-light text-neutral-500">
                  You can also attach photos or rough sketches below
                </p>
              </div>
              <div className="mb-8">
                <label htmlFor="enquiry_requirements" className="form-label-ws">
                  Are there any specific requirements or constraints we should be aware of?{' '}
                  <span className="text-sm font-normal text-neutral-500">(Optional)</span>
                </label>
                <textarea
                  id="enquiry_requirements"
                  name="enquiry_requirements"
                  className="form-textarea-ws"
                  rows={4}
                  placeholder="e.g., sloped ceilings, chimney breast, alcove, angled walls, etc."
                />
              </div>
              <div className="mb-8">
                <label htmlFor="enquiry_files" className="form-label-ws">
                  Upload photos, sketches, or other files{' '}
                  <span className="text-sm font-normal text-neutral-500">(Optional)</span>
                </label>
                <input id="enquiry_files" name="enquiry_files" type="file" className="form-input-ws" multiple accept="image/*,.pdf" />
                <p className="mt-2 font-sans text-sm font-light text-neutral-500">Accepted formats: Images (JPG, PNG) and PDF files</p>
              </div>
              <div className="form-field mt-8 flex gap-4">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="button" className="btn-primary" onClick={() => setStep(3)}>
                  Continue
                </button>
              </div>
            </div>

            <div className={stepClass(step === 3)} data-step="3">
              <h2 className="mb-8 font-serif text-[1.75rem] text-primary">Budget and timeline</h2>
              <div className="mb-8">
                <p className="form-label-ws">
                  Do you have a budget range in mind for your project? <span className="text-accent-600">*</span>
                </p>
                <p className="mb-4 font-sans text-sm font-light text-neutral-500">
                  This helps us ensure design ideas align with your expectations.
                </p>
                <div className="radio-group mt-2 flex flex-col gap-3">
                  {BUDGET_OPTIONS.map((val) => (
                    <label key={val} className="form-radio-label-ws">
                      <input type="radio" name="enquiry_budget" value={val} className="mt-1" required />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <p className="form-label-ws">
                  When are you hoping to have your project completed? <span className="text-accent-600">*</span>
                </p>
                <div className="radio-group mt-2 flex flex-col gap-3">
                  {TIMELINE_OPTIONS.map((val) => (
                    <label key={val} className="form-radio-label-ws">
                      <input type="radio" name="enquiry_timeline" value={val} className="mt-1" required />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-field mt-8 flex gap-4">
                <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                  Back
                </button>
                <button type="button" className="btn-primary" onClick={() => setStep(4)}>
                  Continue
                </button>
              </div>
            </div>
          </form>

          {step === 5 ? (
            <div className="enquiry-step mx-auto max-w-2xl text-center" data-step="5">
              <h1 className="mb-8 font-serif text-primary" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.08 }}>
                Thank You
              </h1>
              <div className="mb-8 font-sans text-lg font-light leading-relaxed text-neutral-600">
                <p>
                  We&apos;ve received your project enquiry and will be in touch shortly to discuss your requirements and next
                  steps.
                </p>
              </div>
              <div className="mt-12">
                <Link to="/" className="btn-primary">
                  Return to Homepage
                </Link>
              </div>
            </div>
          ) : null}
        </div>
    </>
  )

  if (isCard) {
    return (
      <div id="enquiry-form-section" className="rounded-lg border border-neutral-300 bg-white p-6 md:p-10">
        {body}
      </div>
    )
  }

  return (
    <section id="enquiry-form-section" className="bg-neutral-100" style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
      <div className="container-custom">{body}</div>
    </section>
  )
}
