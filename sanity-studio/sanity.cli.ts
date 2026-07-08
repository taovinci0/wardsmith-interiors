import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '9ryg64p4',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'wardsmith',
})
