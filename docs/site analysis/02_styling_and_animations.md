# Styling and Animations Guide

## Overview
The visual identity of the application relies on a blend of utility-first CSS (Tailwind) and a legacy custom CSS foundation (`style.css`), powered by sophisticated procedural javascript animations using GSAP.

## Styling Setup
1. **Tailwind CSS**: 
   - Configured in `tailwind.config.ts`.
   - Utilizes plugins: `@tailwindcss/container-queries`, `@tailwindcss/forms`, `@tailwindcss/typography`.
   - Used heavily inside the `.vue` page templates for structural layout and utility classes.
2. **Global CSS (`public/style.css`)**: 
   - A significant amount of the application's unique layout, typography scaling, and component sizing (e.g. `.mil-wrapper`, `.mil-menu-frame`) comes from a pre-built template stylesheet. 
   - Included globally via `nuxt.config.ts`.
3. **Bootstrap Grid**: 
   - Also included globally. You will often see `row`, `col-lg-8` mixed with Tailwind classes or custom BEM classes.

## GSAP and Procedural Animations
Animations are NOT handled by Vue `<Transition>` components. The app heavily relies on GSAP.
- **GSAP & ScrollTrigger**: Loaded via CDN/local scripts in `nuxt.config.ts`.
- **Global Initialization (`public/js/main.js`)**: Contains functions like `refreshScrollAnimations`, `initItemSlider1`, `reinitCursor`.
- **Lifecycle Integration**: 
   - In `app/layouts/default.vue`, the `router.afterEach` hook delays for 100ms, then triggers a custom `swup:contentReplaced` event.
   - It then manually fires `window.reinitCursor()`, `window.initItemSlider1()`, and `ScrollTrigger.refresh()` to ensure GSAP binds to the newly rendered DOM nodes.
- **Component-Level GSAP**:
   - Complex interactive sections (like the 3D portfolio slider in `app/pages/portfolio.vue`) bypass `main.js` and initialize their own GSAP timelines using `gsap.context()` inside `onMounted`. They must be cleaned up using `ctx.revert()` in `onUnmounted`.
