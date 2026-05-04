<template>
  <section
    ref="rootRef"
    class="portfolio-stack relative bg-[#050505] text-white"
    data-nav-theme="dark"
  >
    <div class="portfolio-stack-inner relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      <!-- Orange CASE STUDIES marquee (z-0, behind cards) -->
      <div
        class="portfolio-stack-marquee-wrap pointer-events-none absolute left-0 right-0 top-1/2 z-0 -translate-y-1/2 overflow-x-clip py-4 md:py-6 bg-[#FF9900]"
        aria-hidden="true"
      >
        <div
          ref="marqueeTrackRef"
          class="portfolio-stack-marquee-track flex w-max flex-nowrap will-change-transform"
        >
          <div
            v-for="chunk in 2"
            :key="'pm' + chunk"
            class="portfolio-stack-marquee-chunk shrink-0 px-4 text-3xl font-black leading-none tracking-tight text-[#0a0a0a] sm:text-4xl md:px-8 md:text-6xl"
            aria-hidden="true"
          >
            {{ marqueeRailText }}
          </div>
        </div>
      </div>

      <div
        class="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-6 lg:px-12 xl:px-16"
      >
        <!-- Left step nav -->
        <nav
          class="flex flex-row items-start gap-6 lg:col-span-4 lg:flex-col lg:items-stretch lg:justify-center lg:gap-10"
          aria-label="Portfolio stack steps"
        >
          <button
            v-for="(label, idx) in navLabels"
            :key="idx"
            type="button"
            class="portfolio-stack-nav-item w-fit max-w-full text-left font-bold uppercase tracking-[0.2em] transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-sm lg:w-full lg:text-base"
            :class="
              activeSlide === idx
                ? 'text-primary'
                : 'text-white/35 hover:text-white/55'
            "
            :data-step="idx"
            @click="goToStep(idx)"
          >
            <span class="mr-2 text-primary/80">•</span>{{ label }}
          </button>
        </nav>

        <!-- Center 3D card stage -->
        <div
          ref="stageRef"
          class="portfolio-stack-stage relative lg:col-span-8"
          :class="{ 'ps-cursor-hide': useCustomCursor }"
          @pointerenter="onStageEnter"
          @pointerleave="onStageLeave"
          @pointermove="onStageMove"
        >
          <div
            class="portfolio-stack-stage-inner relative mx-auto"
            style="perspective: 1400px"
          >
            <div
              v-for="(slide, i) in slides"
              :key="slide.id || ('ps-card-' + i)"
              :ref="setCardRef"
              class="portfolio-stack-card absolute inset-0 mx-auto aspect-[4/3] max-h-[min(56vh,520px)] w-full max-w-3xl"
              :data-index="i"
            >
              <NuxtLink
                :to="localePath(slide.link || '/portfolio')"
                class="group relative block h-full w-full origin-center overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-24px_rgba(0,0,0,0.85)] md:p-[1px]"
              >
                <img
                  :src="slide.image"
                  :alt="slide.imageAlt || plainTitle(slide.title)"
                  class="portfolio-stack-card-img h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div
                  class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Meta row -->
      <div
        class="relative z-10 mx-auto mt-10 grid w-full max-w-[1400px] grid-cols-3 gap-4 border-t border-white/10 px-5 pb-10 pt-6 md:px-12 md:pb-14"
      >
        <div>
          <div class="mb-1 text-[10px] font-bold tracking-[0.28em] text-white/40 md:text-xs">
            {{ t('case_studies.client') }}
          </div>
          <div class="text-sm font-semibold text-white/90 md:text-base">
            {{ currentSlide.client || '—' }}
          </div>
        </div>
        <div>
          <div class="mb-1 text-[10px] font-bold tracking-[0.28em] text-white/40 md:text-xs">
            {{ t('case_studies.budget') }}
          </div>
          <div class="text-sm font-semibold text-white/90 md:text-base">
            {{ currentSlide.budget || '—' }}
          </div>
        </div>
        <div>
          <div class="mb-1 text-[10px] font-bold tracking-[0.28em] text-white/40 md:text-xs">
            {{ t('case_studies.duration') }}
          </div>
          <div class="text-sm font-semibold text-white/90 md:text-base">
            {{ currentSlide.duration || currentSlide.date || '—' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Custom READ MORE cursor (fine pointer only) -->
    <div
      ref="cursorRef"
      class="portfolio-stack-cursor pointer-events-none fixed left-0 top-0 z-[1200] flex items-center gap-4 opacity-0"
      aria-hidden="true"
    >
      <div
        class="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full border-2 border-[#b8ff6a] bg-[#b8ff6a]/95 text-center text-[11px] font-extrabold leading-tight tracking-wide text-[#0a0a0a] shadow-lg md:h-[112px] md:w-[112px] md:text-xs"
      >
        {{ t('case_studies.read_more') }}
      </div>
      <div class="hidden max-w-[200px] flex-col sm:flex">
        <span class="text-sm font-bold uppercase leading-tight text-white md:text-base">
          {{ plainTitle(currentSlide.title) }}
        </span>
        <span class="mt-1 text-xs font-medium text-white/60">{{ countryLine }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n, useLocalePath } from '#i18n';

const localePath = useLocalePath();
const { t } = useI18n();

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});

const rootRef = ref(null);
const stageRef = ref(null);
const marqueeTrackRef = ref(null);
const cursorRef = ref(null);
const cardRefs = ref([]);
const activeSlide = ref(0);
const cursorVisible = ref(false);
const useCustomCursor = ref(false);

function setCardRef(el) {
  if (el && !cardRefs.value.includes(el)) cardRefs.value.push(el);
}

const marqueeRailText = computed(() => {
  const phrase = String(t('case_studies.marquee')).trim().replace(/\s+/g, ' ');
  const unit = `${phrase} · `;
  return Array.from({ length: 14 }, () => unit).join('');
});

const navLabels = computed(() => [
  t('case_studies.nav_1'),
  t('case_studies.nav_2'),
  t('case_studies.nav_3'),
]);

const slides = computed(() => {
  const list = Array.isArray(props.projects) ? [...props.projects] : [];
  const pad = {
    id: 'ps-fallback',
    title: 'APEX PROJECT',
    client: 'Apex Digital',
    date: '—',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    link: '/portfolio',
    imageAlt: '',
  };
  while (list.length < 3) list.push({ ...pad, id: `ps-fallback-${list.length}` });
  return list.slice(0, 3);
});

const currentSlide = computed(() => slides.value[activeSlide.value] || slides.value[0]);

const countryLine = computed(() => {
  const s = currentSlide.value;
  return s?.country || s?.client || t('case_studies.location_unknown');
});

function plainTitle(s) {
  if (!s) return '';
  return String(s).replace(/<[^>]+>/g, '').trim();
}

const SLOTS = {
  front: { xPercent: 0,   yPercent: 0,   rotateY: 0,   scale: 1.00, autoAlpha: 1.00, zIndex: 30 },
  mid:   { xPercent: 34,  yPercent: -6,  rotateY: -22, scale: 0.78, autoAlpha: 0.85, zIndex: 20 },
  back:  { xPercent: -30, yPercent: 6,   rotateY: 24,  scale: 0.66, autoAlpha: 0.70, zIndex: 10 },
};

const SLOT_ORDER = [
  ['front', 'mid',   'back'],   // step 0 active card 0 in front
  ['back',  'front', 'mid'],    // step 1 active card 1 in front
  ['mid',   'back',  'front'],  // step 2 active card 2 in front
];

let ctx = null;
let mm = null;
let pollInterval = null;
let marqueeTween = null;
let pinST = null;
let qx = null;
let qy = null;
let gsapRef = null;
let lastStepSynced = -1;

function applySlots(stepIdx, animated = true) {
  if (!gsapRef) return;
  const order = SLOT_ORDER[Math.max(0, Math.min(2, stepIdx))];
  cardRefs.value.forEach((el, i) => {
    if (!el) return;
    const target = SLOTS[order[i]] || SLOTS.front;
    const tweenVars = {
      ...target,
      duration: animated ? 1.15 : 0,
      ease: animated ? 'power3.inOut' : 'none',
      delay: animated ? i * 0.06 : 0,
      overwrite: 'auto',
    };
    gsapRef.to(el, tweenVars);
  });
}

function goToStep(idx) {
  if (typeof window === 'undefined') return;
  const clamped = Math.max(0, Math.min(2, idx));
  if (!pinST) {
    activeSlide.value = clamped;
    return;
  }
  const p = (clamped + 0.5) / 3;
  const start = pinST.start ?? 0;
  const end = pinST.end ?? start;
  const scrollTarget = start + (end - start) * p;
  window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
}

function onStageEnter(e) {
  if (!useCustomCursor.value || !cursorRef.value || !gsapRef) return;
  cursorVisible.value = true;
  gsapRef.set(cursorRef.value, { autoAlpha: 1 });
  moveCursor(e.clientX, e.clientY);
}

function onStageLeave() {
  if (!cursorRef.value || !gsapRef) return;
  cursorVisible.value = false;
  gsapRef.set(cursorRef.value, { autoAlpha: 0 });
}

function moveCursor(clientX, clientY) {
  if (!qx || !qy) return;
  const off = 48;
  qx(clientX - off);
  qy(clientY - off);
}

function onStageMove(e) {
  if (!useCustomCursor.value || !cursorVisible.value) return;
  moveCursor(e.clientX, e.clientY);
}

function navElastic(gsap, stepIndex) {
  if (!gsap) return;
  const root = rootRef.value;
  if (!root) return;
  const items = root.querySelectorAll('.portfolio-stack-nav-item');
  items.forEach((el, i) => {
    if (i === stepIndex) {
      gsap.fromTo(
        el,
        { scaleY: 0.94, skewX: 3, autoAlpha: 0.65 },
        {
          scaleY: 1,
          skewX: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'back.out(1.4)',
        },
      );
    }
  });
}

function initGsap(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsapRef = gsap;
  gsap.defaults({ ease: 'power2.out' });

  nextTick(() => {
    if (!rootRef.value || !marqueeTrackRef.value) return;

    ctx = gsap.context(() => {
      // Set transform origin for proper 3D rotations on cards
      gsap.set('.portfolio-stack-card', { transformOrigin: 'center center', force3D: true });

      // Initial slot positions (no animation)
      applySlots(0, false);

      const track = marqueeTrackRef.value;
      const runMarquee = () => {
        marqueeTween?.kill();
        gsap.set(track, { x: 0 });
        const half = track.scrollWidth / 2 || 1;
        marqueeTween = gsap.to(track, {
          x: -half,
          duration: 22,
          ease: 'none',
          repeat: -1,
        });
      };
      requestAnimationFrame(() => requestAnimationFrame(runMarquee));

      if (window.matchMedia('(pointer: fine)').matches) {
        useCustomCursor.value = true;
        if (cursorRef.value) {
          qx = gsap.quickTo(cursorRef.value, 'x', { duration: 0.15, ease: 'power3.out' });
          qy = gsap.quickTo(cursorRef.value, 'y', { duration: 0.15, ease: 'power3.out' });
        }
      }

      mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;

          if (reduceMotion) {
            marqueeTween?.pause();
            activeSlide.value = 0;
            lastStepSynced = 0;
            applySlots(0, false);
            return () => {};
          }
          marqueeTween?.play();

          if (isDesktop && rootRef.value) {
            pinST = ScrollTrigger.create({
              trigger: rootRef.value,
              start: 'top top',
              end: '+=340%',
              pin: true,
              scrub: 1.2,
              snap: {
                snapTo: (value) => {
                  const seg = 1 / 3;
                  return Math.round(value / seg) * seg;
                },
                duration: { min: 0.55, max: 0.95 },
                delay: 0.08,
                ease: 'power3.inOut',
                inertia: false,
              },
              onUpdate: (self) => {
                const step = Math.min(2, Math.max(0, Math.floor(self.progress * 3 + 1e-9)));
                if (step !== lastStepSynced) {
                  lastStepSynced = step;
                  activeSlide.value = step;
                }
              },
            });
          } else {
            pinST = null;
            lastStepSynced = 0;
            activeSlide.value = 0;
            applySlots(0, false);
          }

          return () => {
            pinST?.kill();
            pinST = null;
          };
        },
        rootRef.value,
      );

      ScrollTrigger.refresh();
    }, rootRef.value);
  });
}

watch(activeSlide, (val, oldVal) => {
  nextTick(() => {
    if (!gsapRef || !rootRef.value) return;
    if (oldVal !== undefined && val !== oldVal) {
      applySlots(val, true);
      navElastic(gsapRef, val);
    }
  });
});

watch(
  () => slides.value.length,
  () => {
    cardRefs.value = [];
    nextTick(() => {
      if (gsapRef) applySlots(activeSlide.value, false);
    });
  },
);

onMounted(() => {
  if (typeof window === 'undefined') return;
  useCustomCursor.value = window.matchMedia('(pointer: fine)').matches;
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
  pinST?.kill();
  pinST = null;
  mm?.revert();
  mm = null;
  ctx?.revert();
  ctx = null;
  marqueeTween = null;
  qx = null;
  qy = null;
  gsapRef = null;
  cardRefs.value = [];
});
</script>

<style scoped>
.portfolio-stack-marquee-chunk {
  white-space: nowrap;
  word-break: keep-all;
  overflow-wrap: normal;
}

.portfolio-stack-stage-inner {
  position: relative;
  width: 100%;
  /* Reserve height so absolutely positioned cards have a stage to fill */
  aspect-ratio: 4 / 3;
  max-height: min(56vh, 520px);
}

.portfolio-stack-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.portfolio-stack-nav-item {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  box-shadow: none;
  border-radius: 0;
  color: inherit;
  font: inherit;
  line-height: inherit;
  cursor: pointer;
}

.portfolio-stack-stage.ps-cursor-hide :deep(a) {
  cursor: none;
}

@media (pointer: coarse) {
  .portfolio-stack-stage.ps-cursor-hide :deep(a) {
    cursor: pointer;
  }
}
</style>
