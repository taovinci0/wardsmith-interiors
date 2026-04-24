import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { BlogArchivePage } from './pages/BlogArchivePage.jsx'
import { BlogPostPage } from './pages/BlogPostPage.jsx'
import { CaseStudiesArchivePage } from './pages/CaseStudiesArchivePage.jsx'
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { FaqsPage } from './pages/FaqsPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.jsx'
import { ServiceDetailPage } from './pages/ServiceDetailPage.jsx'
import { ServicesArchivePage } from './pages/ServicesArchivePage.jsx'
import { StartYourProjectPage } from './pages/StartYourProjectPage.jsx'
import { TermsOfBusinessPage } from './pages/TermsOfBusinessPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about-us', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      { path: 'start-your-project', element: <StartYourProjectPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'terms-of-business', element: <TermsOfBusinessPage /> },
      { path: 'services', element: <ServicesArchivePage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'case-studies', element: <CaseStudiesArchivePage /> },
      { path: 'case-studies/:slug', element: <CaseStudyDetailPage /> },
      { path: 'blog', element: <BlogArchivePage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
