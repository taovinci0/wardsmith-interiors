/**
 * Vercel Serverless Function — POST /api/enquiry
 *
 * The production enquiry endpoint (the netlify/ version never ran — the site
 * deploys on Vercel). Sends a notification email via Resend and persists the
 * enquiry as an `enquirySubmission` document in Sanity, each only when its env
 * vars are configured:
 *   RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL   — email notification
 *   SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN — CMS persistence
 */

const REQUIRED = [
  'enquiry_name',
  'enquiry_email',
  'enquiry_phone',
  'enquiry_address',
  'enquiry_space_type',
  'enquiry_project_description',
  'enquiry_stage',
  'enquiry_budget',
  'enquiry_timeline',
]

const esc = (v) =>
  String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

async function sendViaResend(payload, attachments) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.RESEND_TO_EMAIL
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !to || !from) return { skipped: true }

  const row = (label, value) => `<p><strong>${label}:</strong> ${esc(value) || '-'}</p>`
  const html = [
    '<h2>New Ward-Smith Enquiry</h2>',
    row('Name', payload.enquiry_name),
    row('Email', payload.enquiry_email),
    row('Phone', payload.enquiry_phone),
    row('Address', payload.enquiry_address),
    row('Space', payload.enquiry_space_type),
    row('Stage', payload.enquiry_stage),
    row('Budget', payload.enquiry_budget),
    row('Timeline', payload.enquiry_timeline),
    `<p><strong>Description:</strong><br/>${esc(payload.enquiry_project_description).replace(/\n/g, '<br/>')}</p>`,
    row('Inspiration', payload.enquiry_inspiration),
    row('Dimensions', payload.enquiry_dimensions),
    row('Requirements', payload.enquiry_requirements),
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.enquiry_email,
      subject: `New enquiry from ${payload.enquiry_name}`,
      html,
      attachments: (attachments || []).slice(0, 3).map((a) => ({ filename: a.name, content: a.base64 })),
    }),
  })
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`)
  return { sent: true }
}

async function createSanityDoc(payload, attachments) {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_WRITE_TOKEN
  if (!projectId || !token) return { skipped: true }

  const doc = {
    _type: 'enquirySubmission',
    name: payload.enquiry_name,
    email: payload.enquiry_email,
    phone: payload.enquiry_phone,
    address: payload.enquiry_address,
    spaceType: payload.enquiry_space_type,
    projectDescription: payload.enquiry_project_description,
    stage: payload.enquiry_stage,
    inspiration: payload.enquiry_inspiration || '',
    dimensions: payload.enquiry_dimensions || '',
    requirements: payload.enquiry_requirements || '',
    budget: payload.enquiry_budget,
    timeline: payload.enquiry_timeline,
    termsAccepted: Boolean(payload.enquiry_terms),
    attachments: (attachments || []).slice(0, 3).map((a) => ({
      _type: 'object',
      name: a.name,
      mimeType: a.type,
      size: a.size || 0,
      base64: a.base64 || '',
    })),
    submittedAt: new Date().toISOString(),
  }

  const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  })
  if (!res.ok) throw new Error(`Sanity mutate failed: ${res.status} ${await res.text()}`)
  return { stored: true }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const payload = req.body || {}
  for (const key of REQUIRED) {
    if (payload[key] == null || payload[key] === '') {
      return res.status(400).json({ ok: false, error: `Missing required field: ${key}` })
    }
  }

  const attachments = Array.isArray(payload.enquiry_files) ? payload.enquiry_files : []

  try {
    const [email, stored] = await Promise.all([
      sendViaResend(payload, attachments),
      createSanityDoc(payload, attachments),
    ])
    if (email.skipped && stored.skipped) {
      return res
        .status(503)
        .json({ ok: false, error: 'Enquiry service is not configured yet. Please call or email us directly.' })
    }
    return res.status(200).json({ ok: true, email: !email.skipped, stored: !stored.skipped })
  } catch (err) {
    console.error('enquiry failed:', err)
    return res.status(502).json({ ok: false, error: 'Could not submit enquiry. Please try again or contact us directly.' })
  }
}
