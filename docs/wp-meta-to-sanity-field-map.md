# WP Meta -> Sanity Field Map (Phase 1)

Field-level mapping for migration scripts and schema implementation.

## Conventions

- WP media ID fields become Sanity `image` fields (asset reference).
- WP JSON-in-meta arrays become Sanity arrays/objects.
- Repeated indexed keys (for steps) become arrays of objects in Sanity.

## Home / Generic Page Sections

| WP key | Proposed Sanity field path | Notes |
|---|---|---|
| `_hero_eyebrow` | `hero.eyebrow` | |
| `_hero_heading` | `hero.heading` | |
| `_hero_description` | `hero.description` | |
| `_hero_primary_button_label` | `hero.primaryButton.label` | |
| `_hero_primary_button_url` | `hero.primaryButton.url` | |
| `_hero_secondary_button_label` | `hero.secondaryButton.label` | |
| `_hero_secondary_button_url` | `hero.secondaryButton.url` | |
| `_hero_images` (json) | `hero.slides[]` | Array of images |
| `_process_intro_eyebrow` | `processIntro.eyebrow` | |
| `_process_intro_heading` | `processIntro.heading` | |
| `_process_intro_content` | `processIntro.content` | |
| `_process_intro_image` | `processIntro.image` | Media ID |
| `_process_intro_video_url` | `processIntro.videoUrl` | |
| `_process_intro_cta_label` | `processIntro.ctaLabel` | |
| `_values_items` (json) | `values.items[]` | title/content/iconName |
| `_services_section_eyebrow` | `servicesSection.eyebrow` | |
| `_services_section_heading` | `servicesSection.heading` | |
| `_services_section_tagline` | `servicesSection.tagline` | |
| `_usp_eyebrow` | `usp.eyebrow` | |
| `_usp_heading` | `usp.heading` | |
| `_usp_content` | `usp.content` | |
| `_usp_image_1` | `usp.images[0]` | Media ID |
| `_usp_image_2` | `usp.images[1]` | Media ID |
| `_usp_cta_label` | `usp.cta.label` | |
| `_usp_cta_url` | `usp.cta.url` | |
| `_trust_heading` | `trust.heading` | |
| `_trust_content` | `trust.content` | |
| `_trust_cta_label` | `trust.cta.label` | |
| `_trust_cta_url` | `trust.cta.url` | |
| `_testimonials_section_eyebrow` | `testimonialsSection.eyebrow` | |
| `_testimonials_section_heading` | `testimonialsSection.heading` | |
| `_testimonials_section_subheading` | `testimonialsSection.subheading` | |
| `_cta_heading` | `finalCta.heading` | |
| `_cta_content` | `finalCta.content` | |
| `_cta_primary_label` | `finalCta.primaryButton.label` | |
| `_cta_primary_url` | `finalCta.primaryButton.url` | |

## About Page Specific

| WP key | Proposed Sanity field path | Notes |
|---|---|---|
| `_team_seb_image` | `meetTheTeam.sebastian.image` | Media ID |
| `_team_matt_image` | `meetTheTeam.matthew.image` | Media ID |
| `_process_step_image_1..5` | `processSteps.items[0..4].image` | Title/desc are currently static defaults in template |

## Service Post Type

| WP key | Proposed Sanity field path | Notes |
|---|---|---|
| `_service_short_description` | `shortDescription` | |
| `_service_hero_background_image` | `hero.backgroundImage` | Media ID |
| `_process_intro_*` | `processIntro.*` | Same mapping as shared section |
| `_process_2_eyebrow` | `processTwo.eyebrow` | |
| `_process_2_heading` | `processTwo.heading` | |
| `_process_2_content` | `processTwo.content` | |
| `_process_2_image` | `processTwo.image` | Media ID |
| `_process_2_video_url` | `processTwo.videoUrl` | |
| `_process_2_cta_label` | `processTwo.ctaLabel` | |
| `_service_usp_eyebrow` | `serviceUsp.eyebrow` | |
| `_service_usp_heading` | `serviceUsp.heading` | |
| `_service_usp_content` | `serviceUsp.content` | |
| `_service_usp_image_1` | `serviceUsp.images[0]` | Media ID |
| `_service_usp_image_2` | `serviceUsp.images[1]` | Media ID |
| `_service_usp_cta_label` | `serviceUsp.cta.label` | |
| `_service_usp_cta_url` | `serviceUsp.cta.url` | |
| `_service_gallery_header_eyebrow` | `galleryHeader.eyebrow` | |
| `_service_gallery_header_heading` | `galleryHeader.heading` | |
| `_service_gallery_header_paragraph` | `galleryHeader.paragraph` | |
| `_service_gallery_images` (json) | `gallery.images[]` | |
| `_service_process_steps_eyebrow` | `processSteps.eyebrow` | |
| `_service_process_steps_heading` | `processSteps.heading` | |
| `_service_process_steps_description` | `processSteps.description` | |
| `_service_process_step_title_1..N` | `processSteps.items[].title` | Build ordered array |
| `_service_process_step_description_1..N` | `processSteps.items[].description` | Build ordered array |
| `_service_process_step_image_1..N` | `processSteps.items[].image` | Media ID |
| `_service_process_steps_end_heading` | `processSteps.endCta.heading` | |
| `_service_process_steps_end_paragraph` | `processSteps.endCta.paragraph` | |
| `_service_process_steps_end_button_label` | `processSteps.endCta.button.label` | |
| `_service_process_steps_end_button_url` | `processSteps.endCta.button.url` | |
| `_service_cta_heading` | `serviceCta.heading` | |
| `_service_cta_content` | `serviceCta.content` | |
| `_service_cta_button_label` | `serviceCta.button.label` | |
| `_service_cta_button_url` | `serviceCta.button.url` | |
| `_service_types` (json) | `serviceTypes[]` | if still used |
| `_service_faqs` (json) | `faqs[]` | if still used |

## Case Study Post Type

| WP key | Proposed Sanity field path | Notes |
|---|---|---|
| `_case_study_location` | `location` | |
| `_case_study_services` | `servicesSummary` | |
| `_case_study_cost` | `cost` | |
| `_case_study_hero_image` | `hero.image` | Media ID |
| `_case_study_project_overview` | `processIntro.projectOverview` | |
| `_case_study_testimonial_video_url` | `processIntro.testimonialVideoUrl` | |
| `_case_study_testimonial_video_poster` | `processIntro.testimonialVideoPoster` | Media ID |
| `_case_study_testimonial_fallback_image` | `processIntro.testimonialFallbackImage` | Media ID |
| `_case_study_gallery_images` (json) | `gallery.images[]` | |
| `_case_study_cta_heading` | `caseStudyCta.heading` | |
| `_case_study_cta_content` | `caseStudyCta.content` | |
| `_case_study_cta_button_label` | `caseStudyCta.button.label` | |
| `_case_study_cta_button_url` | `caseStudyCta.button.url` | |

## Testimonial Post Type

| WP key | Proposed Sanity field path | Notes |
|---|---|---|
| `_testimonial_name` | `customerName` | |
| `_testimonial_location` | `customerLocation` | |
| `_testimonial_project_type` | `projectTypeLabel` | |
| `_testimonial_pull_quote` | `pullQuote` | |
| `_testimonial_rating` | `rating` | |
| `_testimonial_video_url` | `video.url` | |
| `_testimonial_video_poster` | `video.posterImage` | Media ID |

## Site-Wide Footer Options (Not Post Meta)

| WP option key | Proposed Sanity field path | Notes |
|---|---|---|
| `ward_smith_footer_description` | `siteSettings.footer.description` | |
| `ward_smith_instagram_url` | `siteSettings.footer.social.instagramUrl` | |
| `ward_smith_facebook_url` | `siteSettings.footer.social.facebookUrl` | |
| `ward_smith_contact_address` | `siteSettings.footer.contact.address` | |
| `ward_smith_contact_phone` | `siteSettings.footer.contact.phone` | |
| `ward_smith_contact_email` | `siteSettings.footer.contact.email` | |

## Form Submission Fields (For API, not Sanity by default)

From current `form-handlers.php`:

- Consultation: name, email, phone, date, time
- Enquiry: name, email, phone, address, space type, description, stage, inspiration, dimensions, requirements, budget, timeline, files[]

## Open Mapping Tasks

- Confirm exact structure of `_hero_images`, `_service_gallery_images`, `_case_study_gallery_images`, `_values_items`, `_service_types`, `_service_faqs`.
- Confirm whether `service-intro` and `service-features` legacy fields are still active in templates.
- Confirm final blog permalink strategy for Vite routing.
