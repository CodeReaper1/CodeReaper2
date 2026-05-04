<template>
  <main
    ref="servicesRoot"
    class="services-v2 min-h-screen bg-[#030303] text-white"
    data-nav-theme="dark"
  >
    <!-- Hero (layout inspired by Framer home: centered tagline, dual CTAs, scroll row, mist gradient) -->
    <section
      class="svc-hero relative z-10 min-h-[88vh] flex flex-col justify-center px-5 md:px-12 lg:px-20 pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      <div class="svc-framer-bg pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute inset-0 bg-[#030303]" />
        <div class="svc-framer-bg-mist absolute -inset-[35%] opacity-[0.55]" />
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(255,140,0,0.12),transparent_52%)]"
        />
        <div
          class="absolute inset-0 opacity-[0.07] svc-framer-bg-checks mix-blend-overlay"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]" />
      </div>

      <ul class="mil-breadcrumbs mil-light relative z-10 mb-12 md:mb-14 max-w-6xl mx-auto w-full">
        <li>
          <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
        </li>
        <li>
          <a class="cursor-default">{{ $t('nav.services') }}</a>
        </li>
      </ul>

      <div class="relative z-10 max-w-[52rem] mx-auto w-full text-center flex flex-col items-center">
        <div class="svc-hero-badge mb-7 md:mb-8 flex justify-center">
          <span
            class="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2 text-[11px] md:text-xs font-medium tracking-[0.02em] text-zinc-300"
          >
            {{ page.eyebrow }}
          </span>
        </div>
        <h1
          class="svc-hero-title font-[100] text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-tight text-white px-1"
          v-html="page.titleHtml"
        />
        <p
          class="svc-hero-sub mt-7 md:mt-9 max-w-[34rem] mx-auto text-[15px] md:text-lg text-zinc-400 font-light leading-relaxed px-2"
        >
          {{ page.subtitle }}
        </p>
        <div class="svc-hero-btns mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-5 w-full">
          <NuxtLink
            :to="localePath(page.primaryCtaPath)"
            class="mil-button mil-arrow-place inline-flex px-9 py-4 md:px-10 md:py-5 w-full sm:w-auto justify-center sm:justify-start"
          >
            <span>{{ page.primaryCtaLabel }}</span>
          </NuxtLink>
          <NuxtLink
            :to="localePath(page.secondaryCtaPath)"
            class="inline-flex items-center justify-center rounded-full border border-white/18 px-9 py-4 md:px-10 md:py-5 text-sm font-medium tracking-wide text-white/90 transition-colors hover:bg-white/[0.06] w-full sm:w-auto"
          >
            {{ page.secondaryCtaLabel }}
          </NuxtLink>
        </div>
        <div
          class="svc-hero-scrollrow mt-16 md:mt-24 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[11px] md:text-xs text-zinc-500 tracking-[0.14em] uppercase"
        >
          <span class="whitespace-nowrap">{{ page.scrollPrimary }}</span>
          <span class="hidden sm:block h-px w-6 bg-white/12" aria-hidden="true" />
          <span class="hidden sm:block h-px w-6 bg-white/12" aria-hidden="true" />
          <span class="text-white/35" aria-hidden="true">
            <svg class="w-5 h-8" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="3" width="8" height="14" rx="4" stroke="currentColor" stroke-width="1.2" />
              <path d="M12 19v6M7 30c1.5 4 8.5 4 10 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </span>
          <span class="hidden sm:block h-px w-6 bg-white/12" aria-hidden="true" />
          <span class="hidden sm:block h-px w-6 bg-white/12" aria-hidden="true" />
          <span class="whitespace-nowrap normal-case tracking-normal text-zinc-500">{{ page.scrollSecondary }}</span>
        </div>
      </div>
    </section>

    <!-- Cards -->
    <section class="relative z-10 pb-24 md:pb-32">
      <div class="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
        <header class="svc-works-head flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-[100] tracking-tight text-white">
            {{ page.worksSectionTitle }}
          </h2>
          <span class="text-primary/90 mb-1 hidden sm:block" aria-hidden="true">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
              <path d="M7 10l5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </header>
        <div class="h-px w-full bg-white/[0.08] mb-14 md:mb-20" />
        <div class="space-y-20 md:space-y-32">
        <article
          v-for="(card, idx) in page.cards"
          :key="idx"
          class="svc-card group relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          :class="idx % 2 === 1 ? 'lg:flex-row-reverse' : ''"
        >
          <span
            class="pointer-events-none hidden lg:block absolute -left-4 top-4 text-[7rem] font-[100] leading-none text-white/[0.03] select-none z-0 font-mono"
            aria-hidden="true"
          >
            {{ card.indexLabel }}
          </span>

          <div
            class="svc-card-media lg:col-span-6 relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] border border-white/[0.06] bg-zinc-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]"
            :class="idx % 2 === 1 ? 'lg:order-2' : ''"
          >
            <img
              :src="card.imageUrl"
              :alt="card.imageAlt || stripHtml(card.title)"
              class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03] svc-panel-bg"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"
            />
            <span
              class="lg:hidden absolute bottom-4 left-4 text-xs font-mono text-primary font-bold tracking-widest"
            >
              {{ card.indexLabel }}
            </span>
          </div>

          <div
            class="svc-card-body lg:col-span-6 flex flex-col justify-center"
            :class="idx % 2 === 1 ? 'lg:order-1 lg:text-right lg:items-end' : ''"
          >
            <h2
              class="text-3xl md:text-5xl lg:text-6xl font-[100] leading-[1.1] mb-5 md:mb-7 text-white [&_strong]:font-bold [&_em]:italic"
              v-html="card.title"
            />
            <div
              class="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-xl mb-8 [&_strong]:text-zinc-200 [&_a]:text-primary"
              v-html="card.description"
            />
            <ul
              class="space-y-3 mb-10"
              :class="idx % 2 === 1 ? 'lg:items-end' : ''"
            >
              <li
                v-for="(feat, fi) in card.features"
                :key="fi"
                class="flex gap-3 text-sm md:text-base text-zinc-300"
                :class="idx % 2 === 1 ? 'lg:flex-row-reverse lg:text-right' : ''"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{{ feat }}</span>
              </li>
            </ul>
            <NuxtLink
              v-if="card.ctaPath"
              :to="localePath(card.ctaPath)"
              class="mil-button mil-arrow-place inline-flex px-8 py-4 md:px-10 md:py-5 w-fit"
            >
              <span>{{ card.ctaLabel }}</span>
            </NuxtLink>
          </div>
        </article>
        </div>
        <div class="flex justify-end pt-10 md:pt-14">
          <NuxtLink
            :to="localePath(page.projectsLinkPath)"
            class="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-primary transition-colors"
          >
            <span>{{ page.projectsLinkLabel }}</span>
            <svg
              class="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useLocalePath } from '#imports';

const localePath = useLocalePath();
const { page } = useServicesPage();

let gsapRevealFallback = null;

useHead({
  title: () => page.value.metaTitle,
});

const servicesRoot = ref(null);
let ctx = null;
let mm = null;
let pollInterval = null;

function stripHtml(s) {
  if (!s) return '';
  return String(s).replace(/<[^>]+>/g, '').trim();
}

function initServicesGSAP(gsapLib, ScrollTrigger) {
  gsapLib.registerPlugin(ScrollTrigger);
  gsapLib.defaults({ lazy: false });
  gsapLib.ticker.wake();
  gsapLib.ticker.lagSmoothing(0);

  nextTick(() => {
    requestAnimationFrame(() => {
      const root = servicesRoot.value;
      if (!root || typeof window === 'undefined') return;

      ctx = gsapLib.context(() => {
        mm = gsapLib.matchMedia();

        mm.add('(prefers-reduced-motion: reduce)', () => {
          gsapLib.set('.svc-hero-badge, .svc-hero-title, .svc-hero-sub, .svc-hero-btns, .svc-hero-scrollrow', {
            opacity: 1,
            y: 0,
          });
          gsapLib.set('.svc-works-head', { opacity: 1, y: 0 });
          gsapLib.set('.svc-card-media, .svc-card-body', { opacity: 1, y: 0 });
          gsapLib.set('.svc-panel-bg', { scale: 1, autoAlpha: 1 });
        });

        mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
          const heroTl = gsapLib.timeline({ defaults: { ease: 'power4.out' } });
          heroTl
            .fromTo('.svc-hero-badge', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 })
            .fromTo('.svc-hero-title', { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.05 }, '-=0.3')
            .fromTo('.svc-hero-sub', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
            .fromTo('.svc-hero-btns', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75 }, '-=0.45')
            .fromTo('.svc-hero-scrollrow', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.35');

          gsapLib.fromTo(
            '.svc-works-head',
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.svc-works-head',
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            },
          );

          gsapLib.utils.toArray('.svc-card').forEach((cardEl) => {
            const media = cardEl.querySelector('.svc-card-media');
            const body = cardEl.querySelector('.svc-card-body');
            gsapLib.fromTo(
              [media, body],
              { opacity: 0, y: 48 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: cardEl,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              },
            );
            const bgImg = cardEl.querySelector('.svc-panel-bg');
            if (bgImg) {
              gsapLib.fromTo(
                bgImg,
                { scale: 1.08, autoAlpha: 0.85 },
                {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 1.4,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: cardEl,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                  },
                },
              );
            }
          });
        });

        mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
          gsapLib.fromTo(
            '.svc-hero-badge, .svc-hero-title, .svc-hero-sub, .svc-hero-btns, .svc-hero-scrollrow',
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          );

          gsapLib.fromTo(
            '.svc-works-head',
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.svc-works-head',
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            },
          );

          gsapLib.utils.toArray('.svc-card').forEach((cardEl) => {
            gsapLib.from(cardEl.querySelectorAll('.svc-card-media, .svc-card-body'), {
              opacity: 0,
              y: 28,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardEl,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            });
          });
        });

        ScrollTrigger.refresh();
      }, root);
    });
  });
}

function revealWithoutGsap() {
  const r = servicesRoot.value;
  if (!r || typeof window === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  r.querySelectorAll(
    '.svc-hero-badge, .svc-hero-title, .svc-hero-sub, .svc-hero-btns, .svc-hero-scrollrow, .svc-works-head, .svc-card-media, .svc-card-body',
  ).forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

onMounted(() => {
  gsapRevealFallback = window.setTimeout(revealWithoutGsap, 4000);
  pollInterval = window.setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      if (pollInterval !== null) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      if (gsapRevealFallback !== null) {
        clearTimeout(gsapRevealFallback);
        gsapRevealFallback = null;
      }
      initServicesGSAP(window.gsap, window.ScrollTrigger);
    }
  }, 50);
});

onUnmounted(() => {
  if (gsapRevealFallback !== null) {
    clearTimeout(gsapRevealFallback);
    gsapRevealFallback = null;
  }
  if (pollInterval !== null) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
  if (mm) {
    mm.revert();
    mm = null;
  }
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
});
</script>

<style scoped>
/* Cards start hidden for scroll reveal; hero is never opacity:0 in CSS (GSAP fromTo sets end to 1). */
@media (prefers-reduced-motion: reduce) {
  .svc-card-media,
  .svc-card-body,
  .svc-works-head {
    opacity: 1 !important;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .svc-card-media,
  .svc-card-body {
    opacity: 0;
  }

  .svc-works-head {
    opacity: 0;
  }
}

.svc-framer-bg-mist {
  background: conic-gradient(
    from 220deg at 45% 35%,
    rgba(248, 113, 22, 0.22),
    rgba(99, 102, 241, 0.14),
    rgba(248, 113, 22, 0.06),
    transparent 65%
  );
  filter: blur(72px);
  animation: svc-framer-mist 22s ease-in-out infinite;
}

.svc-framer-bg-checks {
  background-image: repeating-linear-gradient(
      -18deg,
      transparent,
      transparent 11px,
      rgba(255, 255, 255, 0.035) 11px,
      rgba(255, 255, 255, 0.035) 12px
    ),
    repeating-linear-gradient(
      18deg,
      transparent,
      transparent 11px,
      rgba(255, 255, 255, 0.02) 11px,
      rgba(255, 255, 255, 0.02) 12px
    );
}

@keyframes svc-framer-mist {
  0%,
  100% {
    transform: translate(-2%, -1%) rotate(0deg) scale(1);
    opacity: 0.52;
  }
  50% {
    transform: translate(2%, 2%) rotate(4deg) scale(1.06);
    opacity: 0.68;
  }
}

@media (prefers-reduced-motion: reduce) {
  .svc-framer-bg-mist {
    animation: none;
    opacity: 0.45;
  }
}

.svc-hero-title :deep(span),
.svc-hero-title :deep(strong) {
  color: inherit;
}

.svc-card-body :deep(p) {
  margin: 0;
}

.svc-card-body :deep(p + p) {
  margin-top: 0.75rem;
}

.svc-card-media,
.svc-panel-bg {
  will-change: transform, opacity;
  backface-visibility: hidden;
}
</style>
