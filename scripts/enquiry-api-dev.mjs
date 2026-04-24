/**
 * Minimal JSON enquiry receiver for local development.
 * Run: node scripts/enquiry-api-dev.mjs
 * Vite proxies /api → http://127.0.0.1:3333 (see vite.config.js)
 */

import http from 'node:http'

const PORT = Number(process.env.ENQUIRY_API_PORT || 3333)

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS' && req.url?.startsWith('/api')) {
    res.writeHead(204, cors)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/api/enquiry') {
    let body = ''
    req.on('data', (c) => {
      body += c
    })
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}')
        console.log('[enquiry-api-dev]', new Date().toISOString(), JSON.stringify(parsed, null, 2))
      } catch {
        console.warn('[enquiry-api-dev] invalid JSON body')
      }
      res.writeHead(200, { ...cors, 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true }))
    })
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Not found')
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Enquiry dev API listening on http://127.0.0.1:${PORT}/api/enquiry`)
})
