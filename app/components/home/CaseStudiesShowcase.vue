<template>
  <section
    ref="rootRef"
    class="case-studies-showcase relative bg-[#050505] text-white"
    data-nav-theme="dark"
  >
    <div class="case-studies-inner relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      <!-- Marquee band (behind content) -->
      <div
        class="case-studies-marquee-wrap pointer-events-none absolute left-0 right-0 top-1/2 z-0 -translate-y-1/2 overflow-x-clip py-4 md:py-6 bg-[#FF9900]"
        aria-hidden="true"
      >
        <div
          ref="marqueeTrackRef"
          class="case-studies-marquee-track flex w-max flex-nowrap will-change-transform"
        >
          <div
            v-for="chunk in 2"
            :key="'m' + chunk"
            class="case-studies-marquee-chunk shrink-0 px-4 text-3xl font-black leading-none tracking-tight text-[#0a0a0a] sm:text-4xl md:px-8 md:text-6xl"
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
          aria-label="Case studies steps"
        >
          <button
            v-for="(label, idx) in navLabels"
            :key="idx"
            type="button"
            class="case-studies-nav-item w-fit max-w-full text-left font-bold uppercase tracking-[0.2em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-sm lg:w-full lg:text-base"
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

        <!-- Center stage -->
        <div
          class="case-studies-stage relative lg:col-span-8"
          :class="{ 'cs-cursor-hide': useCustomCursor }"
          @pointerenter="onStageEnter"
          @pointerleave="onStageLeave"
          @pointermove="onStageMove"
        >
          <div
            class="relative mx-auto perspective-[1400px]"
            style="perspective: 1400px"
          >
            <!-- Back / mid decorative panels -->
            <div
              class="case-studies-deco case-studies-deco--back pointer-events-none absolute left-[8%] top-[10%] z-0 hidden aspect-[4/3] w-[55%] rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl md:block"
            />
            <div
              class="case-studies-deco case-studies-deco--mid pointer-events-none absolute right-[4%] top-[22%] z-[1] hidden aspect-[4/3] w-[48%] rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl md:block"
            />

            <NuxtLink
              :to="localePath(currentSlide.link)"
              class="case-studies-card group relative z-[2] mx-auto block aspect-[4/3] max-h-[min(56vh,520px)] w-full max-w-3xl origin-center overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-24px_rgba(0,0,0,0.85)] md:p-[1px]"
            >
              <img
                :key="currentSlide.id + '-' + currentSlide.image"
                :src="currentSlide.image"
                :alt="currentSlide.imageAlt || plainTitle(currentSlide.title)"
                class="case-studies-main-img h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80"
              />
            </NuxtLink>
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
          <div class="text-sm font-semibold text-white/90 md:text-base">{{ currentSlide.client }}</div>
        </div>
        <div>
          <div class="mb-1 text-[10px] font-bold tracking-[0.28em] text-white/40 md:text-xs">
            {{ t('case_studies.budget') }}
          </div>
          <div class="text-sm font-semibold text-white/90 md:text-base">—</div>
        </div>
        <div>
          <div class="mb-1 text-[10px] font-bold tracking-[0.28em] text-white/40 md:text-xs">
            {{ t('case_studies.duration') }}
          </div>
          <div class="text-sm font-semibold text-white/90 md:text-base">{{ currentSlide.date }}</div>
        </div>
      </div>
    </div>

    <!-- Custom cursor (fine pointer only) -->
    <div
      ref="cursorRef"
      class="case-studies-cursor pointer-events-none fixed left-0 top-0 z-[1200] flex items-center gap-4 opacity-0"
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
        <span class="mt-1 text-xs font-medium text-white/60">{{ locationLine }}</span>
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
  /** Same shape as homepage showcase: id, title, client, date, image, link, imageAlt */
  projects: {
    type: Array,
    default: () => [],
  },
});

const rootRef = ref(null);
const marqueeTrackRef = ref(null);
const cursorRef = ref(null);
const activeSlide = ref(0);
const cursorVisible = ref(false);
const useCustomCursor = ref(false);

/** Single rail copy: repeated phrase with NBSP so “CASE STUDIES” never breaks mid-word. */
const marqueeRailText = computed(() => {
  const phrase = String(t('case_studies.marquee')).trim().replace(/\s+/g, '\u00A0');
  const unit = `${phrase}\u00A0·\u00A0`;
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
    id: 'cs-fallback',
    title: 'APEX PROJECT',
    client: 'Apex Digital',
    date: '—',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    link: '/portfolio',
    imageAlt: '',
  };
  while (list.length < 3) list.push({ ...pad, id: `cs-fallback-${list.length}` });
  return list.slice(0, 3);
});

const currentSlide = computed(() => slides.value[activeSlide.value] || slides.value[0]);

const locationLine = computed(() => {
  const c = currentSlide.value?.client;
  return c ? String(c) : t('case_studies.location_unknown');
});

function plainTitle(s) {
  if (!s) return '';
  return String(s).replace(/<[^>]+>/g, '').trim();
}

let ctx = null;
let mm = null;
let pollInterval = null;
let marqueeTween = null;
let pinST = null;
let qx = null;
let qy = null;
let gsapRef = null;
let lastStepSynced = -1;

function goToStep(idx) {
  if (!pinST || typeof window === 'undefined') return;
  const clamped = Math.max(0, Math.min(2, idx));
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
  const items = root.querySelectorAll('.case-studies-nav-item');
  items.forEach((el, i) => {
    if (i === stepIndex) {
      gsap.fromTo(
        el,
        { scaleY: 0.88, skewX: 5 },
        {
          scaleY: 1,
          skewX: 0,
          duration: 0.85,
          ease: 'elastic.out(1, 0.38)',
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
            return () => {};
          }
          marqueeTween?.play();

          gsap.set('.case-studies-deco--back', {
            transformOrigin: 'center center',
            rotateY: -28,
            xPercent: -6,
            autoAlpha: 0.55,
          });
          gsap.set('.case-studies-deco--mid', {
            transformOrigin: 'center center',
            rotateY: 22,
            xPercent: 8,
            autoAlpha: 0.5,
          });

          if (isDesktop && rootRef.value) {
            pinST = ScrollTrigger.create({
              trigger: rootRef.value,
              start: 'top top',
              end: '+=280%',
              pin: true,
              scrub: 0.55,
              snap: {
                snapTo: (value) => {
                  const seg = 1 / 3;
                  return Math.round(value / seg) * seg;
                },
                duration: { min: 0.12, max: 0.35 },
                delay: 0,
                inertia: false,
              },
              onUpdate: (self) => {
                let step = Math.min(2, Math.max(0, Math.floor(self.progress * 3 + 1e-9)));
                if (step !== lastStepSynced) {
                  lastStepSynced = step;
                  activeSlide.value = step;
                }
                const p = self.progress;
                const highlight = p * 3;
                gsap.set('.case-studies-deco--back', { rotateY: -22 + highlight * 4 });
                gsap.set('.case-studies-deco--mid', { rotateY: 18 - highlight * 5 });
              },
            });
          } else {
            pinST = null;
            lastStepSynced = 0;
            activeSlide.value = 0;
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
      navElastic(gsapRef, val);
      const img = rootRef.value.querySelector('.case-studies-main-img');
      if (img) {
        gsapRef.fromTo(
          img,
          { scale: 1.06, autoAlpha: 0.65 },
          { scale: 1, autoAlpha: 1, duration: 0.55, ease: 'power2.out' },
        );
      }
    }
  });
});

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
});
</script>

<style scoped>
.case-studies-marquee-chunk {
  white-space: nowrap;
  word-break: keep-all;
  overflow-wrap: normal;
}

.case-studies-nav-item {
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

.case-studies-stage.cs-cursor-hide :deep(a) {
  cursor: none;
}

@media (pointer: coarse) {
  .case-studies-stage.cs-cursor-hide :deep(a) {
    cursor: pointer;
  }
}
</style>
