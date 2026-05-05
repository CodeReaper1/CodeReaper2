---
version: alpha
name: Apex Digital
description: High-contrast, type-led identity for a digital agency. Black canvas with one decisive orange accent, Outfit type used at extreme weights (ultra-thin display + bold action), generous spacing, soft 1–2rem radii.

colors:
  primary: "#FF9900"
  background-light: "#F2F2F2"
  background-dark: "#000000"
  surface-dark: "#0A0A0A"
  surface-elevated: "#1A1A1A"
  ink: "#0A0A0A"
  ink-muted: "#6B7280"
  paper: "#FFFFFF"
  cursor-accent: "#B8FF6A"

typography:
  display-xl:
    fontFamily: Outfit
    fontSize: 9rem
    fontWeight: 100
    lineHeight: 0.9
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Outfit
    fontSize: 7rem
    fontWeight: 100
    lineHeight: 0.95
    letterSpacing: -0.02em
  h1:
    fontFamily: Outfit
    fontSize: 4rem
    fontWeight: 100
    lineHeight: 1
    letterSpacing: -0.015em
  h2:
    fontFamily: Outfit
    fontSize: 2.5rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Outfit
    fontSize: 1.5rem
    fontWeight: 300
    lineHeight: 1.5
  body-md:
    fontFamily: Outfit
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Outfit
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.28em

rounded:
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  pill: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  "2xl": 96px
  "3xl": 160px

components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    hoverBackgroundColor: "{colors.primary}"
    hoverTextColor: "{colors.ink}"
    borderRadius: "{rounded.pill}"
    typography: "{typography.label-caps}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    borderColor: "{colors.paper}"
    borderRadius: "{rounded.pill}"
  card-image:
    backgroundColor: "{colors.surface-elevated}"
    borderColor: "rgba(255,255,255,0.10)"
    borderRadius: "{rounded.xl}"
  section-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.ink}"
  section-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.paper}"
  marquee-band:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
---

# Apex Digital — Visual Identity

## Overview

Apex Digital reads as a confident, premium digital agency. The UI is type-led and contrast-heavy: deep black canvases broken by one decisive orange accent. Extremes do the work — Outfit at weight 100 for the headline display, Outfit at weight 700 (uppercase, wide-tracked) for labels and CTAs. Mid-weight body type is reserved for paragraphs.

The personality is **architectural minimalism with a single moment of warmth**. Sections alternate between full-bleed dark and soft off-white (`#F2F2F2`); the orange `primary` only appears when something demands action — a CTA, an accent stripe, a state change. Animation is generous in duration and snap-free: scrubbed scroll choreography over instant transitions, `expo.out` / `power3.inOut` over elastic.

Audience: founders, marketing leads, design-conscious clients who can tell the difference between a generic SaaS template and an authored design. Every visible decision should justify its presence.

## Colors

The palette is built on three roles plus one hero accent.

- **Primary (`#FF9900`) — "Apex Orange":** the only color that earns animation. Used for CTAs, hover states, the case-studies marquee band, accent stripes, and active-step highlights in the navigation. Treat it as a finite resource — overuse dilutes it.
- **Background dark (`#000000`) / Surface dark (`#0A0A0A`):** the canvas of the site. `surface-dark` is the working background for most dark sections; pure `#000` is reserved for the hero band and full-screen overlays (the open menu).
- **Background light (`#F2F2F2`):** the secondary canvas for "breath" sections (services reveal, CTAs on light). Always paired with ink-on-light type and a soft border treatment, never with the orange except as a bar accent.
- **Surface elevated (`#1A1A1A`):** dark cards and panels — gives subtle separation from the surface without breaking the monochrome.
- **Ink (`#0A0A0A`) / Ink muted (`#6B7280`):** body type on light, secondary metadata on dark.
- **Paper (`#FFFFFF`):** small chrome (the always-visible logo on dark sections, button surfaces).
- **Cursor accent (`#B8FF6A`):** isolated to the custom "READ MORE" cursor on the case-studies stage. Outside that one component, do not use it.

## Typography

One family, two extremes. The full system is in `typography.*`; the working roles:

- **`display-xl` / `display-lg`:** hero and section-marquee type. Outfit weight 100 at 7–9 rem with negative letter-spacing. Always uppercase. Lines clip with `inset(0 0 100% 0) → 0` reveal animations on scroll.
- **`h1` / `h2`:** internal section titles, also Outfit thin. The contrast between thin display and bold labels is the core typographic gesture.
- **`body-lg`:** pull-quotes, hero descriptions. Weight 300, generous leading.
- **`body-md`:** paragraphs, list items. Weight 400, leading 1.6.
- **`label-caps`:** all small chrome — meta rows (CLIENT / BUDGET / DURATION), navigation steps, button text. Weight 700, uppercase, `0.28em` letter-spacing. This is the visual contract of "this is a label, not content."

Pair display with label-caps; never pair display with body-md without a label-caps in between.

## Layout

- **Container:** max-width `1400px`, horizontal padding `1.25rem` mobile → `4rem` desktop. The centerline is sacred — full-bleed elements (marquee bands, parallax images) extend past it; type stays inside.
- **Vertical rhythm:** sections are `py-24` (mobile) / `py-32` (desktop). Pinned scroll sections reserve `+=300%` to `+=340%` of viewport.
- **Grid:** 12-col on `lg`, 1-col below. The most-used split is 4/8 (left nav + main stage) and 5/7 (image + copy).
- **Spacing scale:** see `spacing.*`. Use the named tokens — `gap-md`, `mt-xl`, etc., not raw pixel values.

## Elevation & Depth

The system uses **two and only two** elevation tools:

1. **Soft shadow** for cards on dark: `shadow-[0_40px_100px_-24px_rgba(0,0,0,0.85)]`. Reserved for the case-studies card stage and similar focus moments.
2. **3D perspective** on parents that hold rotated children: `perspective: 1400px`. The PortfolioStack uses this for the back/mid/front card arrangement.

No drop shadows on light sections. No inner shadows. No "frosted glass" / backdrop-filter — it conflicts with the type-led identity.

## Shapes

- **Round corners:** `rounded.sm` (0.5rem) for inline elements, `rounded.md` (1rem) for buttons and small cards, `rounded.lg` (1.5rem) for image containers, `rounded.xl` (2rem) for the hero/showcase cards. `rounded.pill` only for buttons and tag pills.
- **Polygonal clip-paths:** allowed when the gesture is intentional. Currently used in the expertise section: `clip-path: polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)` to give the image a directional pointer.
- **Diagonal stripes:** the orange accent stripe in the expertise section uses an `8°` rotation (`-rotate-[8deg]`) — the only place in the system where geometry breaks the orthogonal grid. Don't add more.

## Components

- **`button-primary`:** the conversion CTA. White surface, ink type, pill radius, label-caps. Hovers to orange (the *only* place a fill becomes orange).
- **`button-ghost`:** the secondary CTA. Transparent with paper border on dark sections.
- **`card-image`:** the image-led card used by case studies and portfolio. Surface-elevated background, hairline border, `rounded.xl`, soft shadow.
- **`section-light` / `section-dark`:** the two body alternations. Always carry a `data-nav-theme` attribute so the auto-contrast chrome (see `docs/NAV-COLOR-INVERSION.md`) can flip the logo color.
- **`marquee-band`:** the orange horizontal band used by the case-studies showcase. Display-lg type in ink. Infinite x-translate via GSAP.

## Do's and Don'ts

- **Do** mark every section with `data-nav-theme="dark"` or `="light"` — the chrome observer needs it for contrast.
- **Do** prefer `power3.inOut` and `expo.out` for transitions. Reserve `back.out(1.4)` for label flips and small overshoots.
- **Do** keep `scrub` values in the `1.0–1.6` range for cinematic scroll. Below `0.8` reads as snappy; above `2.0` reads as laggy.
- **Don't** use orange (`primary`) for body text or large fills. It's an accent — bars, stripes, hover states, active-step indicators, and CTAs. Never a wall of color.
- **Don't** use `elastic.out(...)` for state transitions on text or chrome. The rebound reads as jittery against the otherwise-cinematic motion. Elastic is reserved for playful single-element overshoots, not state changes.
- **Don't** introduce additional fonts. Outfit at the four roles above covers every use case in the system.
- **Don't** introduce gradients on type or surfaces. The contrast comes from monochrome blocks, not transitions.
- **Don't** use raw hex codes in component CSS. Reference `colors.*` or extend them in `tailwind.config.ts` if a new token is genuinely needed.
- **Don't** stack two pinned ScrollTriggers in the same section without `pinSpacing` checks — the snap-on-snap fight reads as overlap (we already learned this with CaseStudiesShowcase + PortfolioStack).
