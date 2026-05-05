<template>
  <section
    ref="rootRef"
    class="portfolio-circle relative bg-[#0a0a0a] text-white"
    data-nav-theme="dark"
  >
    <div class="portfolio-circle-inner relative min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center py-16 md:py-24">
      <!-- Heading -->
      <div class="relative z-20 mb-10 px-6 text-center md:mb-12">
        <span class="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-primary md:text-xs">
          {{ t('portfolio_circle.eyebrow') || '— Selected Work' }}
        </span>
        <h2 class="font-display text-5xl uppercase leading-[0.9] tracking-tighter md:text-7xl lg:text-[8rem]" style="font-weight: 100;">
          {{ t('portfolio_circle.title') || 'Portfolio' }}
        </h2>
      </div>

      <!-- Wheel stage -->
      <div ref="stageRef" class="portfolio-circle-stage relative w-full max-w-[1200px] flex-1 min-h-[55vh]">
        <div
          ref="wheelRef"
          class="portfolio-circle-wheel absolute inset-0 origin-center"
        >
          <div
            v-for="(p, i) in slides"
            :key="p.id || ('pc-' + i)"
            :ref="setSlotRef"
            class="portfolio-circle-slot absolute left-1/2 top-1/2"
            :style="slotStyle(i)"
            :data-index="i"
          >
            <div
              :ref="setCardRef"
              class="portfolio-circle-card relative w-[min(72vw,360px)] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_-24px_rgba(0,0,0,0.85)] origin-center will-change-transform"
            >
              <NuxtLink :to="localePath(p.link || '/portfolio')" class="block h-full w-full">
                <img
                  :src="p.image"
                  :alt="p.imageAlt || plainTitle(p.title)"
                  class="h-full w-full object-cover"
                />
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div class="pointer-events-none absolute bottom-6 left-6 right-6">
                  <span class="block text-[10px] font-bold uppercase tracking-[0.28em] text-primary md:text-xs">
                    {{ p.client || '' }}
                  </span>
                  <h3 class="mt-2 font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl">
                    {{ plainTitle(p.title) }}
                  </h3>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA — fades in at end of timeline -->
      <div
        ref="ctaRef"
        class="portfolio-circle-cta relative z-20 mt-10 md:mt-12"
      >
        <button
          type="button"
          @click="scrollToNext"
          class="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-black transition-colors hover:bg-primary"
        >
          {{ t('portfolio_circle.cta') || 'See showcase' }}
          <span class="inline-block transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">↓</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useI18n, useLocalePath } from '#i18n';

const localePath = useLocalePath();
const { t: tFn } = useI18n();
function t(key) {
  // Return empty string when key missing so the `||` template fallback fires.
  // (vue-i18n returns the key itself when missing, which is truthy and breaks the ?? pattern.)
  const out = tFn(key);
  return out === key ? '' : out;
}

const props = defineProps({
  projects: { type: Array, default: () => [] },
  /** CSS selector that the CTA scrolls to. Defaults to the next sibling section. */
  nextSectionSelector: { type: String, default: '.portfolio-stack' },
});

const rootRef = ref(null);
const stageRef = ref(null);
const wheelRef = ref(null);
const ctaRef = ref(null);
const slotRefs = ref([]);
const cardRefs = ref([]);

function setSlotRef(el) { if (el && !slotRefs.value.includes(el)) slotRefs.value.push(el); }
function setCardRef(el) { if (el && !cardRefs.value.includes(el)) cardRefs.value.push(el); }

const slides = computed(() => {
  const list = Array.isArray(props.projects) ? [...props.projects] : [];
  const pad = {
    id: 'pc-fallback',
    title: 'APEX PROJECT',
    client: 'Apex Digital',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    link: '/portfolio',
    imageAlt: '',
  };
  while (list.length < 3) list.push({ ...pad, id: `pc-fallback-${list.length}` });
  return list.slice(0, 3);
});

function plainTitle(s) {
  if (!s) return '';
  return String(s).replace(/<[^>]+>/g, '').trim();
}

const RADIUS_VMIN = 22;

// Initial positions on the wheel — card 0 at top (focus), card 1 at bottom-right, card 2 at bottom-left.
function slotStyle(i) {
  const theta = (i * 120) * Math.PI / 180; // radians, clockwise from top
  const x = RADIUS_VMIN * Math.sin(theta);
  const y = -RADIUS_VMIN * Math.cos(theta);
  return {
    transform: `translate(-50%, -50%) translate(${x.toFixed(3)}vmin, ${y.toFixed(3)}vmin)`,
  };
}

function scrollToNext() {
  if (typeof window === 'undefined') return;
  const target = document.querySelector(props.nextSectionSelector);
  if (!target) return;
  if (window.gsap && window.ScrollToPlugin) {
    window.gsap.to(window, {
      duration: 1.0,
      scrollTo: { y: target, offsetY: 0 },
      ease: 'power3.inOut',
    });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

let ctx = null;
let mm = null;
let pollInterval = null;
let timeline = null;
let gsapRef = null;

function initGsap(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsapRef = gsap;

  nextTick(() => {
    if (!rootRef.value || !cardRefs.value.length) return;

    ctx = gsap.context(() => {
      // Pre-paint initial card states so there is no flash before the timeline starts.
      gsap.set(cardRefs.value, {
        rotation: 0,
        scale: 0.65,
        autoAlpha: 0.45,
        transformOrigin: 'center center',
      });
      gsap.set(cardRefs.value[0], { scale: 1.0, autoAlpha: 1.0 });
      gsap.set(wheelRef.value, { rotation: 0, transformOrigin: 'center center' });
      gsap.set(ctaRef.value, { autoAlpha: 0, y: 32 });

      mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;

          if (reduceMotion) {
            // Reduce-motion: just show all cards at full visibility, CTA visible, no pin.
            gsap.set(cardRefs.value, { rotation: 0, scale: 1, autoAlpha: 1 });
            gsap.set(ctaRef.value, { autoAlpha: 1, y: 0 });
            return () => {};
          }

          if (!isDesktop) {
            // Mobile: skip the wheel; make all cards visible in a vertical stack via CSS,
            // fade in the CTA on scroll.
            gsap.set(cardRefs.value, { rotation: 0, scale: 1, autoAlpha: 1 });
            const mobileTl = gsap.timeline({
              scrollTrigger: {
                trigger: rootRef.value,
                start: 'top 80%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse',
              },
            });
            mobileTl.to(ctaRef.value, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
            return () => { mobileTl.kill(); };
          }

          // Desktop scoped scrub timeline — pinned, 4 phases (entry, two rotations, CTA reveal).
          timeline = gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            scrollTrigger: {
              trigger: rootRef.value,
              start: 'top top',
              end: '+=320%',
              pin: true,
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          // Phase 0 (0 → 1): entrance — cards fade + slide in, the focus card pops bigger.
          timeline
            .from(cardRefs.value, {
              autoAlpha: 0,
              y: 80,
              scale: 0.4,
              stagger: 0.18,
              duration: 0.9,
              ease: 'power3.out',
            }, 0)
            // Make sure focus card lands at scale 1 (override stagger end-state).
            .to(cardRefs.value[0], { scale: 1.0, autoAlpha: 1.0, duration: 0.4, ease: 'power3.out' }, 0.7);

          // Phase 1 (1 → 2): rotate wheel -120°, card[1] takes focus.
          timeline
            .to(wheelRef.value, { rotation: -120, duration: 1, ease: 'power2.inOut' }, 1)
            .to(cardRefs.value, { rotation: 120, duration: 1, ease: 'power2.inOut' }, '<')
            .to(cardRefs.value[0], { scale: 0.65, autoAlpha: 0.45, duration: 1, ease: 'power2.inOut' }, '<')
            .to(cardRefs.value[1], { scale: 1.0,  autoAlpha: 1.0,  duration: 1, ease: 'power2.inOut' }, '<')
            .to(cardRefs.value[2], { scale: 0.65, autoAlpha: 0.45, duration: 1, ease: 'power2.inOut' }, '<');

          // Phase 2 (2 → 3): rotate wheel -240°, card[2] takes focus.
          timeline
            .to(wheelRef.value, { rotation: -240, duration: 1, ease: 'power2.inOut' }, 2)
            .to(cardRefs.value, { rotation: 240, duration: 1, ease: 'power2.inOut' }, '<')
            .to(cardRefs.value[0], { scale: 0.65, autoAlpha: 0.45, duration: 1, ease: 'power2.inOut' }, '<')
            .to(cardRefs.value[1], { scale: 0.65, autoAlpha: 0.45, duration: 1, ease: 'power2.inOut' }, '<')
            .to(cardRefs.value[2], { scale: 1.0,  autoAlpha: 1.0,  duration: 1, ease: 'power2.inOut' }, '<');

          // Phase 3 (3 → 4): CTA slides up + fades in.
          timeline
            .to(ctaRef.value, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
            }, 3)
            // Tiny scale flourish at the very end of the scroll.
            .from(ctaRef.value.querySelector('button'), {
              scale: 0.92,
              duration: 0.5,
              ease: 'back.out(1.6)',
            }, '<+=0.1');

          return () => {
            timeline?.kill();
            timeline = null;
          };
        },
        rootRef.value,
      );

      ScrollTrigger.refresh();
    }, rootRef.value);
  });
}

onMounted(() => {
  if (typeof window === 'undefined') return;
  pollInterval = window.setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.clearInterval(pollInterval);
      pollInterval = null;
      initGsap(window.gsap, window.ScrollTrigger);
    }
  }, 50);
});

onUnmounted(() => {
  if (pollInterval) window.clearInterval(pollInterval);
  timeline?.kill();
  timeline = null;
  mm?.revert();
  mm = null;
  ctx?.revert();
  ctx = null;
  gsapRef = null;
  slotRefs.value = [];
  cardRefs.value = [];
});
</script>

<style scoped>
.portfolio-circle-card {
  /* Pre-paint the from-state so cards don't flash before GSAP runs. */
  opacity: 0.45;
  transform: scale(0.65);
}
.portfolio-circle-cta {
  /* Pre-paint CTA hidden so it doesn't flash before the timeline reveal. */
  opacity: 0;
  transform: translateY(32px);
}

/* Mobile: vertical stack instead of wheel */
@media (max-width: 767px) {
  .portfolio-circle-wheel {
    position: relative;
    inset: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 0;
  }
  .portfolio-circle-slot {
    position: relative;
    left: auto;
    top: auto;
    transform: none !important;
  }
  .portfolio-circle-card {
    /* Mobile shows all cards at full size — JS overrides on mount, this is the SSR fallback. */
    opacity: 1;
    transform: none;
  }
}
</style>
