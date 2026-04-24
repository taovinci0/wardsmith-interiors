# Sanity schema notes (homepage)

Create a **singleton** document for the homepage so GROQ can use stable ids:

- `_type`: `homePage`
- `_id`: `homePage` (fixed id in Sanity)

## `homePage` fields

| Field | Type | Notes |
| --- | --- | --- |
| `hero` | object | Optional overrides for `HeroHome` |
| `hero.eyebrow` | string | |
| `hero.heading` | string | |
| `hero.primaryButtonLabel` | string | |
| `hero.primaryButtonTo` | string | Path e.g. `/about-us` |
| `hero.secondaryButtonLabel` | string | |
| `hero.secondaryButtonTo` | string | |
| `hero.imageUrls` | array of url | |
| `processIntro` | object | Merged into `ProcessIntroSection` |
| `processIntro.eyebrow` | string | |
| `processIntro.heading` | string | |
| `processIntro.content` | text | |
| `processIntro.imageUrl` | url | |
| `processIntro.imageAspectClass` | string | Tailwind aspect class |
| `processIntro.videoUrl` | url | |
| `processIntro.ctaLabel` | string | |
| `processIntro.enableAnimations` | boolean | |

Optional second singleton:

- `_type`: `siteSettings`
- `_id`: `siteSettings`

| Field | Type |
| --- | --- |
| `siteName` | string |
| `defaultTitleSuffix` | string |
| `defaultOgImage` | image (asset) |

Extend with services, case studies, and blog post types following `wp-to-sanity-model-map.md`.
