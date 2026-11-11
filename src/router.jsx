import { Navigate, createBrowserRouter, useParams } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { BlogArchivePage } from './pages/BlogArchivePage.jsx'
import { BlogPostPage } from './pages/BlogPostPage.jsx'
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { FaqsPage } from './pages/FaqsPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { KitchensPage } from './pages/KitchensPage.jsx'
import { LivingSpacesPage } from './pages/LivingSpacesPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { OurApproachPage } from './pages/OurApproachPage.jsx'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.jsx'
import { ProjectsArchivePage } from './pages/ProjectsArchivePage.jsx'
import { TermsOfBusinessPage } from './pages/TermsOfBusinessPage.jsx'

/** Old service URLs map onto the v2 structure. */
const SERVICE_REDIRECTS = {
  'bespoke-kitchens': '/kitchens',
  bedrooms: '/living-spaces',
  'home-offices': '/living-spaces',
  'tailored-spaces': '/living-spaces',
  'media-walls': '/living-spaces',
  'carpentry-services': '/',
}

function ServiceRedirect() {
  const { slug } = useParams()
  return <Navigate to={SERVICE_REDIRECTS[slug] || '/kitchens'} replace />
}

function SlugRedirect({ base }) {
  const { slug } = useParams()
  return <Navigate to={`${base}/${slug}`} replace />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'kitchens', element: <KitchensPage /> },
      { path: 'living-spaces', element: <LivingSpacesPage /> },
      { path: 'our-approach', element: <OurApproachPage /> },
      { path: 'projects', element: <ProjectsArchivePage /> },
      { path: 'projects/:slug', element: <CaseStudyDetailPage /> },
      { path: 'journal', element: <BlogArchivePage /> },
      { path: 'journal/:slug', element: <BlogPostPage /> },
      { path: 'about-us', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'terms-of-business', element: <TermsOfBusinessPage /> },

      // v1 → v2 redirects (server-side 301s also exist in vercel.json)
      { path: 'services', element: <Navigate to="/kitchens" replace /> },
      { path: 'services/:slug', element: <ServiceRedirect /> },
      { path: 'case-studies', element: <Navigate to="/projects" replace /> },
      { path: 'case-studies/:slug', element: <SlugRedirect base="/projects" /> },
      { path: 'blog', element: <Navigate to="/journal" replace /> },
      { path: 'blog/:slug', element: <SlugRedirect base="/journal" /> },
      { path: 'start-your-project', element: <Navigate to="/contact" replace /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
