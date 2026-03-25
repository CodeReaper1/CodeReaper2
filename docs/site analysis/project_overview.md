# Project Overview & Architecture Analysis (Apex Digital Nuxt Frontend)

## 1. Project Stack & Core Technologies
This is a modern headless frontend web application built with a focus on high-performance animations and multilingual support.
- **Framework**: Nuxt 3 (Vue 3, Composition API)
- **Styling**: Tailwind CSS (with official plugins: container-queries, forms, typography) + Custom CSS + Bootstrap Grid (for structural grid layouts).
- **Animations**: GSAP (GreenSock Animation Platform) + ScrollTrigger.
- **Data Fetching/Backend**: Headless WordPress via GraphQL API (`https://api.apexdigital.dev/graphql`).
- **Internationalization (i18n)**: `@nuxtjs/i18n` (Supports English `en` and Bulgarian `bg`).
- **Deployment**: Vercel.

## 2. Directory Structure & App Architecture
The project does not follow the standard flat Nuxt structure, but organizes most frontend resources under the `app/` and `public/` directories:
- **`app/pages/`**: Contains the route definitions (`index.vue`, `portfolio.vue`, `services.vue`, `seo.vue`, `web-development.vue`, etc.).
- **`app/layouts/`**: Contains `default.vue`, which is the main wrapper for the app. It includes the global custom cursor, preloader, animated menu frame, and background footer elements.
- **`public/js/` & `public/css/`**: Contains legacy or global scripts and styles (Swiper, Fancybox, GSAP plugins, and a monolithic `main.js` that initializes non-Vue procedural animations).
- **Global Configs**: Defined in `nuxt.config.ts` (head meta, script injections) and `tailwind.config.ts`.

## 3. Data Fetching & API State
- All data synchronization from the Headless WordPress backend happens via GraphQL. 
- A typical pattern (as seen in `portfolio.vue`) uses Nuxt's `useFetch` composable pointing to the external GraphQL endpoint.
- It leverages the `transform` option in `useFetch` to map the deeply nested GraphQL nodes into flat array objects used by the Vue templates.
- **No standard `app/components` or `app/composables` directories exist in this current iteration**, implying page components contain their logical blocks and templates directly or rely heavily on global layout elements.

## 4. Animation & Client-Side Scripting Logic
This application heavily bridges the gap between traditional Vue reactivity and vanilla DOM manipulation:
- **GSAP & ScrollTrigger** are the lifeblood of the site. `app/pages/portfolio.vue` defines timelines locally in Vue `onMounted` hooks.
- **Global Event Bus (`main.js`)**: Due to the application porting a template that previously relied on Swup (Page Transitions), `app/layouts/default.vue` fakes Swup's lifecycle events. When Vue Router finishes a route change (`router.afterEach`), it dispatches `"swup:contentReplaced"` to the `document` and triggers a suite of global window functions (e.g. `window.reinitCursor()`, `window.initItemSlider1()`, `ScrollTrigger.refresh()`). This allows the monolithic `main.js` to re-bind events to newly mounted DOM nodes.
- Custom DOM elements like the animated custom cursor and dodecahedron SVG background are maintained in the `default.vue` layout.

## 5. Deployment Setup
- Powered by `nuxt build` and hosted on Vercel. The logs (`vercel-prod-deploy.log`, `vercel-build.log`) indicate stable Vercel CI/CD.
- Multilingual routing strategy in Vercel relies on `prefix_except_default` (`/` for EN, `/bg` for BG).

## 6. Recommendations / Known Gotchas for AI Agents
- **Avoid standard component abstraction blindly**: Since the project doesn't use `app/components`, respect the monolithic page structures when editing unless a refactor is explicitly requested.
- **Animation Debugging**: If GSAP animations break upon navigation, verify that the `router.afterEach` hook in `default.vue` is correctly calling the corresponding `window.reinit...` methods from `main.js`.
- **CSS Precedence**: Tailwind utilities interact with raw CSS classes defined in `public/style.css` and `main.js` manipulation. Avoid overriding inline styling set by GSAP variables.
- **i18n Translation Files**: The site has extensive `.json` locale dictionaries. New hardcoded text should ALWAYS be localized using the `$t('key')` syntax in templates.
