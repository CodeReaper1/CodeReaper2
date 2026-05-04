# GSAP and Nuxt in this project

This document describes how **GSAP** and **ScrollTrigger** are loaded, how they interact with **Nuxt 4** (Vue Router, SSR, page transitions), and how that fits together with the legacy **`main.js`** theme scripts.

For a shorter overview, see [site analysis / Styling and animations](./site%20analysis/02_styling_and_animations.md).

---

## 1. How GSAP is loaded (not from npm in page code)

GSAP and ScrollTrigger are **global scripts** injected at the end of `<body>` via `nuxt.config.ts`, in this order:

1. jQuery  
2. Swiper, Fancybox (plugins)  
3. **`/js/plugins/gsap`**  
4. **`/js/plugins/ScrollTrigger`**  
5. ScrollTo plugin  
6. **`/js/main.js`** (theme glue: DOM append, sliders, cursor, etc.)

There may be a GSAP-related package in `node_modules` for tooling or other pages, but **production page animations assume `window.gsap` and `window.ScrollTrigger`** from these files. Importing GSAP separately in a Vue component without registering the same ScrollTrigger build can cause **“Missing plugin? ScrollTrigger”** or mismatched behavior—so the codebase standard is to **always use the global instance** inside `onMounted` / client-only code paths.

---

## 2. Nuxt, SSR, and when animations run

- Nuxt still **renders pages on the server** for the initial request. GSAP touches the DOM and `window`, so animation **setup must not run during SSR**.
- Patterns used here:
  - **`onMounted`**: start polling or call `init…()` only after the component exists in the browser.
  - **`nextTick`**: wait for Vue to flush DOM updates (e.g. before querying refs or calling `ScrollTrigger.refresh()`).
  - **`typeof window !== 'undefined'`** guards where needed.

The app uses **`pageTransition: { name: 'page', mode: 'out-in' }`**: the old page tears down before the new one mounts. That makes **`onUnmounted` cleanup important** so ScrollTrigger listeners and tweens do not leak into the next route.

---

## 3. Waiting for globals: the `setInterval` poll

Script tags load **asynchronously** relative to Vue hydration. There is no single “GSAP ready” event wired in Nuxt, so pages typically use a short poll:

```text
setInterval every 50ms → if (window.gsap && window.ScrollTrigger) { clearInterval; init(...) }
```

Examples: **home** (`index.vue`), **services** (`services.vue`), **portfolio**, **layout** (nav inversion), etc.

---

## 4. Core GSAP patterns in Vue pages

### 4.1 `gsap.context()` + `onUnmounted`

Heavy pages wrap selectors in **`gsap.context(() => { … }, scopeElement)`** so all tweens and ScrollTriggers created inside can be **`revert()`ed** when the user leaves the page.

- **`scopeElement`** is usually a `ref` on `<main>` (or similar), so string selectors like `.svc-card` resolve **under that subtree** and do not accidentally target another route’s DOM.

### 4.2 `gsap.matchMedia()` and cleanup

**Home** and **services** use **`gsap.matchMedia()`** for:

- desktop vs mobile breakpoints  
- **`(prefers-reduced-motion: reduce)`** branches (instant or minimal motion)

`matchMedia` instances should be **`revert()`ed on unmount** alongside `ctx.revert()`, otherwise media-query callbacks can outlive the page and behave oddly on the next visit.

### 4.3 ScrollTrigger

- **`scrollTrigger` timelines**: reveal sections on enter.  
- **`scrub`**: scroll-linked motion (e.g. horizontal showcase, metric parallax, hero shape scales).  
- **`ScrollTrigger.refresh()`**: called after layout-changing setup or route changes so start/end positions recalculate.  
- **`toggleActions` / `onEnter` / `onLeaveBack`**: used for step-based sections (e.g. process flow).

### 4.4 `prefers-reduced-motion`

Implemented on newer pages (e.g. services) via **`matchMedia`** + **`gsap.set(...)`** to show final state without choreographed motion. Prefer this over only hiding elements in CSS if GSAP previously set opacity/transform.

---

## 5. Layout-level coordination (`default.vue`)

The layout registers **`router.afterEach`** (client-only, inside `onMounted`) to mimic **SWUP**-style lifecycle that `main.js` was written for:

- Dispatches **`swup:contentReplaced`** (some theme code listens for it).  
- Calls **`window.reinitAppend()`** (re-clones arrows, lines, **dodecahedron** into `.mil-animation`, etc.).  
- Calls optional globals: **`refreshScrollAnimations`**, **`reinitCursor`**, **`reinitProgressBar`**, sliders, etc.  
- **`ScrollTrigger.refresh()`** after a short timeout so new DOM measurements settle.

**Nav color inversion** uses GSAP ScrollTrigger instances to toggle **`data-nav-theme`** on `.mil-frame` based on visible sections (`__initNavColorInversion` / `__cleanupNavColorInversion`).

---

## 6. Interaction with `public/js/main.js`

`main.js` is jQuery-era theme code. Important interactions:

| Mechanism | Role |
|-----------|------|
| **`initAppend`** | Runs once (guarded by `isInitialized`) to clone hidden template nodes (e.g. `.mil-dodecahedron` from `.mil-hidden-elements`) into live `.mil-animation` slots. |
| **`reinitAppend`** | Resets the flag and runs cleanup + append again—needed for **Vue client navigation** because `initAppend` does not run twice on its own. |
| **`router.afterEach` in layout** | Calls `reinitAppend()` on every route change. |
| **Home `index.vue`** | Also calls **`reinitAppend()` in `nextTick` on mount** so the hero always gets geometry when landing on `/` (including “first app load was not home” and edge races). |

If cloned DOM is missing, hero “geometric” layers can appear empty even when GSAP runs.

---

## 7. Data attributes and GSAP (gotcha)

Hero scale tweens read **`data-value-1`** and **`data-value-2`** (e.g. `7` → `1.6`). In the browser, **`el.dataset.value1` is not reliable** for these attribute names in this stack; use:

```js
parseFloat(el.getAttribute('data-value-1'))
parseFloat(el.getAttribute('data-value-2'))
```

Otherwise scrub tweens never run (`NaN` → skip), and shapes look wrong or static.

---

## 8. Page-by-page reference (high level)

| Area | File(s) | Notes |
|------|---------|--------|
| Home | `app/pages/index.vue` | Large `initAnimations`: hero, services reveal, horizontal pin, parallax, process, stack, FAQ, CTA orbit; `reinitAppend` + `matchMedia` cleanup; **`gsapRef`** for FAQ accordion height animations. |
| Services | `app/pages/services.vue` | Scoped `gsap.context`, `matchMedia`, reduced motion; **4s CSS fallback** if GSAP never loads; hero `fromTo` ends at visible opacity (avoid CSS `opacity: 0` + `from()` trap). |
| Portfolio index | `app/pages/portfolio/index.vue` | `gsap.context` on refs; particles; uses `window.gsap`. |
| Portfolio detail | `app/pages/portfolio/[slug].vue` | Lightweight `window.gsap` usage + `ScrollTrigger.refresh()`. |
| Web dev / SEO / Digital marketing / Contact | respective `*.vue` | Similar global GSAP + context + ScrollTrigger patterns. |
| Playgrounds | `playground*.vue` | Experiments; some kill all triggers manually—don’t copy blindly into production pages. |
| Layout | `app/layouts/default.vue` | Route hooks, `reinitAppend`, `ScrollTrigger.refresh`, nav ScrollTriggers. |

---

## 9. Checklist when adding a new animated page

1. **Client-only init**: `onMounted` + guard `window.gsap` / `window.ScrollTrigger`.  
2. **Poll or defer** until globals exist if init races.  
3. **Scoped context**: `gsap.context(fn, rootRef)`; selectors relative to `rootRef`.  
4. **`onUnmounted`**: `ctx?.revert()`, **`matchMedia` `.revert()`** if used, clear intervals/timeouts.  
5. After navigation or layout shifts: **`ScrollTrigger.refresh()`** (layout already does this globally; pages may still need it after async content).  
6. **Reduced motion**: branch in `matchMedia` or `matchMedia` equivalent.  
7. If the page uses **`main.js` clones** (arrows, dodecahedron), ensure **`reinitAppend`** runs when the DOM is new (layout handles most cases; home has an extra mount hook).  
8. Avoid importing a **second** GSAP for ScrollTrigger unless you fully control plugins and versions.

---

## 10. Related files

- `nuxt.config.ts` — script order and page transition mode  
- `public/js/main.js` — `initAppend` / `reinitAppend`, theme scroll helpers  
- `public/css/style.css` — legacy `.mil-*` animation frames / keyframes (e.g. hero `jump`)  
- `app/layouts/default.vue` — router `afterEach`, nav inversion  
- `docs/site analysis/02_styling_and_animations.md` — condensed styling + animation overview  

This should be enough to onboard someone to **why** globals are used, **where** lifecycle hooks run, and **how** to extend the project without breaking ScrollTrigger on client routing.
