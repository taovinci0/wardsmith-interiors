# Frontend Parity Checklist

Track this file during migration. Do not mark complete until each item is verified against current WordPress frontend.

## 1) Global Layout + Tokens

- [ ] `header` structure and spacing parity
- [ ] `footer` structure, menu columns, legal mini-nav parity
- [ ] Color palette parity (`primary`, `accent`, `neutral`)
- [ ] Typography parity (Legquinne + Gotham loading and fallback behavior)
- [ ] Container widths and spacing system parity
- [ ] Button variants parity (`btn-primary`, `btn-secondary`, `btn-outline`)

## 2) Core Interactions

- [ ] Hero intro animation sequence parity
- [ ] Hero slider timing/fade/scale parity
- [ ] Sticky header transition behavior parity
- [ ] Mobile menu open/close animation parity
- [ ] Mobile mega-menu accordion behavior parity
- [ ] FAQ accordion behavior parity
- [ ] Section reveal animation parity
- [ ] Horizontal scroll sections parity (desktop pin/scrub + mobile swipe)

## 3) Route/Page Parity

- [ ] Home page (`front-page.php`) section order and behavior parity
- [ ] About page (`page-about-us.php`) section order and behavior parity
- [ ] Contact page (`page-contact.php`) hero + consultation form parity
- [ ] FAQs page (`page-faqs.php`) parity
- [ ] Start Your Project page (`page-start-your-project.php`) parity
- [ ] Privacy Policy page parity
- [ ] Terms of Business page parity
- [ ] Service single page parity
- [ ] Case study single page parity
- [ ] Blog archive page parity
- [ ] Case studies archive page parity
- [ ] Blog single page parity

## 4) Content/Data Rendering

- [ ] Homepage section content parity from CMS data
- [ ] About page data parity (including process intro + values behavior)
- [ ] Services data parity (cards + service detail sections)
- [ ] Case studies data parity (archive cards + detail sections)
- [ ] Testimonials data parity
- [ ] Global footer settings parity

## 5) Forms + Submission Flow

- [ ] Contact consultation form fields and validations parity
- [ ] Start-your-project multi-step form parity
- [ ] File upload behavior parity
- [ ] Email notification content parity
- [ ] Success/error state parity

## 6) Responsive + Browser QA

- [ ] Mobile (<768) parity
- [ ] Tablet (768-1023) parity
- [ ] Desktop (1024+) parity
- [ ] iOS Safari parity
- [ ] Android Chrome parity
- [ ] Desktop Chrome + Safari parity

## 7) SEO + URL Behavior

- [ ] Slug/route parity
- [ ] Archive/pagination parity
- [ ] Meta title/description parity
- [ ] Open Graph parity
- [ ] Canonical URL parity
- [ ] Redirects parity

## Signoff Rule

All critical routes and interactions must be checked before migration cutover.
