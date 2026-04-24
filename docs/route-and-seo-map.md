# Route and SEO Map (WP -> Vite)

This is the initial routing map from the current WordPress theme templates.

## Primary Routes

- `/` -> Home (`front-page.php`)
- `/about-us/` -> About (`page-about-us.php`)
- `/contact/` -> Contact (`page-contact.php`)
- `/faqs/` -> FAQs (`page-faqs.php`)
- `/start-your-project/` -> Enquiry form (`page-start-your-project.php`)
- `/privacy-policy/` -> Legal (`page-privacy-policy.php`)
- `/terms-of-business/` -> Legal (`page-terms-of-business.php`)

## Dynamic Content Routes

- `/services/[slug]/` -> Service detail (`single-service.php`)
- `/services/` -> Service archive (verify active template behavior)
- `/case-studies/[slug]/` -> Case study detail (`single-case_study.php`)
- `/case-studies/` -> Case studies archive (`archive-case_study.php`)
- `/blog/[slug]/` (or post permalink structure) -> Blog single (`single.php`)
- `/blog/` (or posts index path) -> Blog archive (`archive.php` / posts page behavior)

## SEO Parity Tasks

- [ ] Confirm exact permalink settings and trailing slash policy.
- [ ] Confirm canonical tag behavior on all page types.
- [ ] Confirm title/meta description source strategy.
- [ ] Confirm OG/Twitter card strategy and image fallback rules.
- [ ] Confirm archive pagination URL format and meta handling.
- [ ] Confirm 404 page behavior and metadata.
- [ ] Build redirect map where route semantics differ.

## Notes

- WordPress currently auto-manages some SEO behavior. In Vite deployment, SEO rendering approach must be agreed (SSR/SSG/prerender strategy) to preserve parity for crawlers.
