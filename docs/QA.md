# QA checklist — Apex headless (Nuxt + WordPress)

Use this for manual regression before release. Adjust URLs if your GraphQL host or frontend domain differs.

## Environment

| Item | Expected |
|------|----------|
| GraphQL | `https://api.apexdigital.dev/graphql` responds with `apexSiteSettings` including Services fields after WP deploy |
| Nuxt dev | `npm run dev` — `http://localhost:3000` |
| Production build | `npm run build` completes with no errors |

## WordPress / CMS (Apex Settings)

Path: **WP Admin → Apex Settings**.

- [ ] **Homepage fields** still save and appear on `/` after save (hero, FAQ, stack, CTA, etc.).
- [ ] **Services Page** section is present with: meta title, eyebrow, headline HTML, subtitle, scroll hint, and **Service blocks** table.
- [ ] At least one service row: title, description, image URL, features (one per line), CTA label, CTA path (`/web-development`, `/seo`, `/digital-marketing`).
- [ ] Save without PHP notices; reload form — values persist.
- [ ] GraphQL introspection or query returns: `servicesPageMetaTitle`, `servicesHeroEyebrow`, `servicesHeroTitleHtml`, `servicesHeroSubtitle`, `servicesScrollHint`, `servicesCards { indexLabel title description imageUrl imageAlt features ctaLabel ctaPath }`.

If Services fields are missing in GraphQL, deploy the theme `functions.php` that registers the new types and resolver fields.

## Frontend — global

- [ ] **Layout**: Logo, menu, frame labels, language switch (EN ↔ BG) work.
- [ ] **Navigation**: No console errors from duplicate GSAP cores; menu opens/closes.
- [ ] **i18n**: `/` and `/bg/` (or equivalent) load; `localePath` links stay on locale prefix where configured.

## Services page (`/services`)

- [ ] **CMS-driven**: After filling Apex Services fields, hero and cards match CMS (including HTML in title/description where used).
- [ ] **Fallback**: With Services rows empty in WP, page still shows three default offerings (i18n `services_page.*` + stock images).
- [ ] **CTAs**: Each card links to the path from CMS (with locale prefix).
- [ ] **Animation**: Hero and cards animate on scroll (desktop); simplified on small viewports.
- [ ] **Reduced motion**: OS “Reduce motion” on — content visible, no reliance on scroll-only reveals for readability.
- [ ] **Resilience**: If global GSAP scripts load late, content becomes visible (fallback ~4s) or immediately under reduced motion.
- [ ] **Document title**: `useHead` uses `servicesPageMetaTitle` when set, else sensible default.

## Homepage (`/`)

- [ ] `useSiteSettings` / `apexSiteSettings` content displays when set.
- [ ] Horizontal scroll / GSAP sections behave; no stuck overlays after route changes.

## Portfolio

- [ ] Portfolio index loads projects from GraphQL or fallback data.
- [ ] Detail `portfolio/[slug]` resolves and shows media/text.

## Service child routes

Spot-check: `/web-development`, `/seo`, `/digital-marketing` — load, internal links back to `/services` work.

## Build / deploy

- [ ] `npm run build` (from `nuxt-frontend`).
- [ ] `npm run preview` (optional) — spot-check `/` and `/services`.

---

*Last updated: reflects Services landing redesign, `useServicesPage` composable, Apex Settings Services repeater, and WPGraphQL `ApexServicesCard` exposure.*
