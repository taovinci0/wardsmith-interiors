/**
 * Netlify Function — POST /api/enquiry
 * Sends notification email via Resend and persists enquiry in Sanity when env vars are provided.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function badRequest(msg) {
  return {
    statusCode: 400,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: false, error: msg }),
  }
}

async function sendViaResend(payload, attachments) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.RESEND_TO_EMAIL
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !to || !from) return { skipped: true }

  const html = `
    <h2>New Ward-Smith Enquiry</h2>
    <p><strong>Name:</strong> ${payload.enquiry_name}</p>
    <p><strong>Email:</strong> ${payload.enquiry_email}</p>
    <p><strong>Phone:</strong> ${payload.enquiry_phone}</p>
    <p><strong>Address:</strong> ${payload.enquiry_address}</p>
    <p><strong>Space:</strong> ${payload.enquiry_space_type}</p>
    <p><strong>Stage:</strong> ${payload.enquiry_stage}</p>
    <p><strong>Budget:</strong> ${payload.enquiry_budget}</p>
    <p><strong>Timeline:</strong> ${payload.enquiry_timeline}</p>
    <p><strong>Description:</strong><br/>${String(payload.enquiry_project_description || '').replace(/\n/g, '<br/>')}</p>
    <p><strong>Inspiration:</strong> ${payload.enquiry_inspiration || '-'}</p>
    <p><strong>Dimensions:</strong> ${payload.enquiry_dimensions || '-'}</p>
    <p><strong>Requirements:</strong> ${payload.enquiry_requirements || '-'}</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New enquiry from ${payload.enquiry_name}`,
      html,
      attachments: (attachments || []).slice(0, 3).map((a) => ({
        filename: a.name,
        content: a.base64,
      })),
    }),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Resend failed: ${res.status} ${t}`)
  }
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
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Sanity mutate failed: ${res.status} ${t}`)
  }
  return { stored: true }
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) }
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return badRequest('Invalid JSON')
  }

  const required = [
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
  for (const key of required) {
    if (payload[key] == null || payload[key] === '') {
      return badRequest(`Missing field: ${key}`)
    }
  }

  if (!payload.enquiry_terms) {
    return badRequest('Terms must be accepted')
  }

  const attachments = Array.isArray(payload.attachments) ? payload.attachments : []

  try {
    await Promise.all([
      sendViaResend(payload, attachments),
      createSanityDoc(payload, attachments),
    ])
  } catch (error) {
    console.error('[enquiry] delivery/storage failure', error)
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Failed to process enquiry' }),
    }
  }

  console.log('[enquiry]', JSON.stringify({ ...payload, enquiry_email: '[redacted]', attachments: attachments.map((a) => ({ name: a.name, size: a.size })) }))

  return {
    statusCode: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true }),
  }
}
