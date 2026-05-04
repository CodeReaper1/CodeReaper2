# Nav color inversion (auto-contrast chrome)

The fixed top-left logo (`A.`) and the burger / X button live inside `.mil-frame`. As the user scrolls, those two elements flip between **black** (over light sections) and **white** (over dark sections) so they always read against whatever is behind them. When the menu is open, they are forced **white** regardless of the section underneath.

This document explains how the effect works, what role GSAP plays, and how to add or debug it on a new page.

---

## TL;DR

- A `data-nav-theme` attribute on `.mil-frame` drives a CSS variable swap (logo color, burger bar color).
- The attribute is set by a small JS observer that creates **one GSAP ScrollTrigger per section** on the page.
- When a section's range is "active" (its top is within ~50 px of the frame), the observer reads the section's `data-nav-theme`/class/computed bg and writes back `dark` or `light` on the frame.
- A sibling-combinator CSS rule forces white when `.mil-menu-frame.mil-active` is present.

All of it lives in [`app/layouts/default.vue`](../app/layouts/default.vue).

---

## The three layers

### 1. CSS — the visual swap

In `app/layouts/default.vue` (unscoped `<style>` block):

```css
/* Default: black chrome on light sections */
.mil-frame .mil-frame-top .mil-logo            { color: #000; transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.mil-frame .mil-frame-top .mil-menu-btn span,
.mil-frame .mil-frame-top .mil-menu-btn span:after,
.mil-frame .mil-frame-top .mil-menu-btn span:before {
  background: #000;
  transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark mode: white chrome */
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-logo            { color: #fff !important; }
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-menu-btn span,
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-menu-btn span:after,
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-menu-btn span:before {
  background: #fff !important;
}

/* Mobile (≤1200px): always white because the header gets a dark bar */
@media (max-width: 1200px) {
  .mil-frame .mil-frame-top .mil-logo,
  .mil-frame .mil-frame-top .mil-menu-btn span,
  .mil-frame .mil-frame-top .mil-menu-btn span:after,
  .mil-frame .mil-frame-top .mil-menu-btn span:before {
    color: #fff !important;
    background: #fff !important;
  }
}
```

Two important details:

- The 0.4 s `cubic-bezier(0.4, 0, 0.2, 1)` transition is what makes the swap feel smooth instead of an instant flicker. **All animation of color comes from CSS, not GSAP.**
- Both rules use the same `.mil-frame-top` ancestor selector so the specificity is matched and the cascade is predictable.

### 2. GSAP ScrollTrigger — the "which section is in view" detector

GSAP **does not animate** the color — it only fires `onToggle` / `onUpdate` callbacks that toggle the `data-nav-theme` attribute. The animation is owned by the CSS transition above.

The observer in `app/layouts/default.vue` (the second, non-`setup` `<script>` block):

```js
function initNavColorInversion() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const frame = document.querySelector('.mil-frame');
  const contentArea = document.querySelector('.mil-content');
  if (!frame || !contentArea) return;

  const triggers = [];
  const sections = Array.from(
    contentArea.querySelectorAll('section, footer, header, .mil-dark-bg, [data-nav-theme]')
  );

  sections.forEach((section) => {
    const isDark = isDarkSection(section);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 50px',     // section top hits 50 px below the viewport top (just under the frame)
      end:   'bottom 50px',
      onToggle: (self) => {
        if (self.isActive) setFrameMode(frame, isDark);
      },
      onUpdate: (self) => {
        if (self.isActive) setFrameMode(frame, isDark);
      },
    });

    triggers.push(st);
  });

  // Initial-load fallback: pick whichever trigger is currently active
  setTimeout(() => {
    let found = false;
    triggers.forEach((t) => {
      if (t.isActive) {
        setFrameMode(frame, isDarkSection(t.trigger));
        found = true;
      }
    });
    if (!found) setFrameMode(frame, false);
  }, 100);

  navColorCleanup = () => {
    triggers.forEach((st) => st.kill());
    triggers.length = 0;
  };
}
```

Why one ScrollTrigger per section instead of one global listener?

- Each ScrollTrigger gives accurate enter/leave callbacks that account for layout: the section's *real* top vs the viewport, including pin-spacing reserves added by other ScrollTriggers (e.g. the PortfolioStack pinned section). A single `scroll` listener with `getBoundingClientRect()` would have to re-discover the same boundaries on every frame.
- `onUpdate` runs while the section is active so even resizes / dynamic layout shifts re-assert the right theme.

### 3. `isDarkSection()` — the heuristic

Each section is classified once at trigger-creation time. The classifier checks several signals in priority order:

1. **`data-nav-theme="dark" | "light"` attribute** on the section — explicit, always wins.
2. **`mil-dark-bg` class** or `<footer>` element — explicit dark.
3. **Tailwind / arbitrary-hex class hints** in `className` (e.g. `bg-black`, `bg-gray-900`, `bg-background-dark`, or `bg-[#0…]` arbitrary-hex).
4. **Computed `background-color`** luminance (perceived-brightness `0.299 R + 0.587 G + 0.114 B < 128` ⇒ dark).
5. If the section is **transparent** and none of the above matched, **walk up to the parent** (depth-capped at 5) and try again. This catches pages like `/seo` where individual `<section>`s are transparent but the wrapping `<main class="bg-[#0a0a0a]">` is dark.

```js
function isDarkSection(el, depth = 0) {
  if (!el || depth > 5) return false;

  const explicit = el.getAttribute && el.getAttribute('data-nav-theme');
  if (explicit === 'dark') return true;
  if (explicit === 'light') return false;

  if (el.classList && el.classList.contains('mil-dark-bg')) return true;
  if (el.tagName === 'FOOTER') return true;

  const cls = (typeof el.className === 'string') ? el.className : '';
  if (/bg-(black|gray-900|gray-800|zinc-950|slate-950|background-dark)/.test(cls)) return true;
  if (cls.includes('bg-[#0')) return true;

  let isTransparent = false;
  try {
    const bg = window.getComputedStyle(el).backgroundColor;
    if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)' || bg === 'rgba(255, 255, 255, 0)') {
      isTransparent = true;
    } else {
      const m = bg.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
      if (m) {
        const luminance = 0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3];
        return luminance < 128;
      }
    }
  } catch (e) { /* noop */ }

  if (isTransparent && el.parentElement) {
    return isDarkSection(el.parentElement, depth + 1);
  }
  return false;
}
```

---

## Lifecycle

`default.vue` ties the observer to Vue lifecycle and Vue Router:

1. **On mount** — poll for `window.gsap` and `window.ScrollTrigger` (the GSAP scripts are loaded globally via `<script>` tags in `nuxt.config.ts`). When both are ready, call `__initNavColorInversion()` after a 200 ms delay so the DOM has settled.
2. **On every route change** (`router.afterEach`) — wait 100 ms, fire a `swup:contentReplaced` event so the legacy theme JS reattaches handlers, then call `__cleanupNavColorInversion()` (kills all per-section ScrollTriggers) followed by another `__initNavColorInversion()` 300 ms later for the new page's sections.
3. **On unmount** — call `__cleanupNavColorInversion()` so we don't leak ScrollTrigger instances if the layout itself is replaced.

The cleanup step is critical: ScrollTrigger does **not** auto-kill triggers when the elements they track leave the DOM. Without `kill()` after a route change, the previous page's triggers stay registered and `ScrollTrigger.refresh()` will keep recomputing them against now-removed sections.

---

## Menu-open override

When the burger is clicked, `main.js` (the legacy theme script) toggles `.mil-active` on three elements: `.mil-menu-btn`, `.mil-menu`, and `.mil-menu-frame`. Since `.mil-menu-frame` and `.mil-frame` are direct siblings inside `.mil-wrapper`, a sibling combinator catches "menu open":

```css
.mil-menu-frame.mil-active ~ .mil-frame .mil-logo {
  color: #fff !important;
}
.mil-menu-frame.mil-active ~ .mil-frame .mil-menu-btn span,
.mil-menu-frame.mil-active ~ .mil-frame .mil-menu-btn span::before,
.mil-menu-frame.mil-active ~ .mil-frame .mil-menu-btn span::after {
  background: #fff !important;
}
```

This beats whatever `data-nav-theme` is currently set on `.mil-frame` because the menu's black overlay is drawn on top of the page content — the chrome must read against the menu, not the page.

---

## Z-index stacking

The menu overlay sits at very high z-indices so no page-level Tailwind `z-10`/`z-20` can punch through:

```css
.mil-curtain    { z-index: 9990 !important; }
.mil-menu-frame { z-index: 9991 !important; }
.mil-frame      { z-index: 9999 !important; }
```

`.mil-frame` stays on top so the burger stays clickable at all times (especially on mobile, where the menu's internal `.mil-frame-top` is hidden by the theme's media query).

---

## How to add a new section

The reliable, explicit way:

```html
<section class="..." data-nav-theme="dark"> ... </section>
<section class="..." data-nav-theme="light"> ... </section>
```

`data-nav-theme` always wins over any heuristic, so it survives refactors that change Tailwind classes or background colors.

If you skip the attribute, the heuristic still works as long as **one** of these is true:

- The section has a `mil-dark-bg` class.
- The section's className contains `bg-black`, `bg-gray-900`, `bg-gray-800`, `bg-zinc-950`, `bg-slate-950`, `bg-background-dark`, or any `bg-[#0…]` arbitrary hex.
- The section's computed `background-color` is non-transparent and dark.
- The section is transparent **and** an ancestor (within 5 levels) matches one of the above.

For new dark sections, prefer the explicit attribute — it makes the page self-document and avoids future surprises if Tailwind class names change.

---

## Debugging

If a section doesn't flip the chrome correctly:

1. **Open DevTools → Elements**, find `.mil-frame` and watch its `data-nav-theme` attribute as you scroll. If it never changes when scrolling into the section, the observer either didn't pick that section up or `isDarkSection()` returned the wrong value.
2. **Check the section is in the query**: the observer only watches `section, footer, header, .mil-dark-bg, [data-nav-theme]` inside `.mil-content`. A `<div>` with no theme attribute won't be observed.
3. **Add `markers: true`** to the `ScrollTrigger.create()` call in `initNavColorInversion()` while debugging — you'll see the start (`top 50px`) and end (`bottom 50px`) lines for each section. (Remove before committing.)
4. **Force the verdict** by adding `data-nav-theme="dark"` (or `"light"`) explicitly. If that fixes it, the heuristic was the problem; if it doesn't, the observer isn't running on that section at all.
5. **Console-log inside `isDarkSection`** to trace which branch returned what — useful for transparent sections where the parent walk should kick in.

---

## Common pitfalls

- **Not adding `data-nav-theme` on a transparent dark section.** The heuristic now walks up parents, but only when the section's computed background is *transparent*. If the section has a non-transparent **light** background but lives inside a dark wrapper, the heuristic will say "light" — that's correct for the section itself, but if the visual treatment makes the chrome look wrong, mark it explicitly.
- **Stacking many pinned sections.** Each pinned ScrollTrigger inserts a pin-spacer; the `top 50px / bottom 50px` window for the nav observer still works because GSAP measures against the real layout, but if you ever see late toggles, refresh after the pinned section is set up: `ScrollTrigger.refresh()`.
- **Adding new pages without re-running the observer.** Route changes are already handled (`router.afterEach` cleans up and re-inits). If you add an in-page DOM swap that creates new sections without a route change, call `window.__cleanupNavColorInversion()` then `window.__initNavColorInversion()` yourself.
- **Markers left in production.** `markers: true` is for development only — strip it before shipping.

---

## File map

| File | Role |
|---|---|
| [`app/layouts/default.vue`](../app/layouts/default.vue) | The whole system — chrome markup, CSS rules, ScrollTrigger observer, lifecycle wiring. |
| [`public/js/main.js`](../public/js/main.js) | Legacy theme script. Toggles `.mil-active` on `.mil-menu-btn` / `.mil-menu-frame` when the burger is clicked. |
| [`public/css/style.css`](../public/css/style.css) | Theme base styles. The default low z-indices for `.mil-frame`/`.mil-curtain`/`.mil-menu-frame` come from here and are overridden in `default.vue`. |
| Page files (e.g. `app/pages/index.vue`, `app/pages/seo.vue`) | Where `data-nav-theme="dark"` / `"light"` should be placed on individual sections. |
