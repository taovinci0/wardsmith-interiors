import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function mediaRewritePlugin() {
  return {
    name: 'media-rewrite',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith('/media/')) {
          req.url = req.url.replace('/media/', '/wp-content/uploads/')
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mediaRewritePlugin()],
  server: {
    proxy: {
      // Local enquiry API: `node scripts/enquiry-api-dev.mjs` (default port 3333) — see README
      '/api': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
      },
    },
  },
})
