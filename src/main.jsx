import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { CmsProvider } from './context/CmsProvider.jsx'
import { router } from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CmsProvider>
        <RouterProvider router={router} />
      </CmsProvider>
    </HelmetProvider>
  </StrictMode>,
)
