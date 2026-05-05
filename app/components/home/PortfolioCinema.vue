<template>
  <section
    ref="rootRef"
    class="portfolio-cinema"
    data-nav-theme="dark"
    :style="{ '--hero-image': `url(${currentProject.image})` }"
    aria-label="Portfolio showcase"
  >
    <div class="portfolio-stage">
      <div class="portfolio-backdrop" aria-hidden="true">
        <div class="portfolio-word">PORTFOLIO</div>
      </div>

      <div class="portfolio-rail" :class="{ 'is-switching': isSwitching }">
        <article
          v-for="(project, idx) in visibleProjects"
          :key="project.id || project.slug || idx"
          class="showcase-card"
          :class="[`showcase-card--${idx}`, { 'is-active': idx === 2 }]"
          @click="idx === 2 ? null : activateVisible(idx)"
        >
          <div class="showcase-card-float">
            <NuxtLink
              :to="localePath(project.link || '/portfolio')"
              class="showcase-card-link"
              :tabindex="idx === 2 ? 0 : -1"
              :aria-label="`View ${plainTitle(project.title)}`"
            >
              <div class="card-copy">
                <span class="card-kicker">{{ project.kind }}:</span>
                <h2 v-html="project.title"></h2>
                <p>{{ project.subtitle }}</p>
              </div>

              <div class="card-device" :class="project.device">
                <div v-if="project.device === 'phone'" class="phone-notch"></div>
                <div v-else class="browser-bar">
                  <span></span><span></span><span></span>
                </div>
                <img :src="project.image" :alt="project.imageAlt || plainTitle(project.title)" />
              </div>
            </NuxtLink>
          </div>
        </article>
      </div>

      <div class="portfolio-cta-wrap">
        <NuxtLink :to="localePath(currentProject.link || '/portfolio')" class="portfolio-cta">
          See Showcase
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useLocalePath } from '#i18n';

const localePath = useLocalePath();

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});

const rootRef = ref(null);
const activeIndex = ref(0);
const isSwitching = ref(false);

const fallbackProjects = [
  {
    id: 'fitlife',
    title: 'FITLIFE<br>TRACKER',
    subtitle: 'Mobile wellness product',
    kind: 'App',
    device: 'phone',
    image: '/img/works/1.jpg',
    imageAlt: 'Mobile app project preview',
    link: '/portfolio',
  },
  {
    id: 'commerce',
    title: 'COMMERCE<br>ENGINE',
    subtitle: 'Headless storefront',
    kind: 'Web',
    device: 'browser',
    image: '/img/works/2.jpg',
    imageAlt: 'Commerce website preview',
    link: '/portfolio',
  },
  {
    id: 'apex',
    title: 'APEX<br>HORIZON',
    subtitle: 'Immersive brand platform',
    kind: 'Project',
    device: 'phone',
    image: '/img/works/3.jpg',
    imageAlt: 'Apex portfolio preview',
    link: '/portfolio',
  },
  {
    id: 'finance',
    title: 'GLOBAL<br>FINANCE HUB',
    subtitle: 'Analytics dashboard',
    kind: 'Web',
    device: 'browser',
    image: '/img/works/4.jpg',
    imageAlt: 'Finance dashboard preview',
    link: '/portfolio',
  },
  {
    id: 'motion',
    title: 'MOTION<br>VAULT',
    subtitle: 'Launch campaign',
    kind: 'Video',
    device: 'phone',
    image: '/img/works/5.jpg',
    imageAlt: 'Motion campaign preview',
    link: '/portfolio',
  },
];

const normalizedProjects = computed(() => {
  const source = Array.isArray(props.projects) && props.projects.length ? props.projects : fallbackProjects;
  const mapped = source.map((project, idx) => ({
    id: project.id || project.slug || `project-${idx}`,
    slug: project.slug,
    title: titleToTwoLines(project.title || project.client || 'Apex Project'),
    subtitle: project.subtitle || project.client || (idx % 2 === 0 ? 'Digital Experience' : 'Conversion-focused Web Build'),
    kind: project.kind || (idx % 3 === 0 ? 'Project' : idx % 3 === 1 ? 'Web' : 'Brand'),
    device: project.device || (idx % 3 === 1 ? 'browser' : 'phone'),
    image: project.image || '/img/works/1.jpg',
    imageAlt: project.imageAlt || project.title || 'Portfolio project preview',
    link: project.link || (project.slug ? `/portfolio/${project.slug}` : '/portfolio'),
  }));

  return mapped.length >= 5 ? mapped : [...mapped, ...fallbackProjects].slice(0, 5);
});

const visibleProjects = computed(() => {
  const list = normalizedProjects.value;
  const total = list.length;
  return [-2, -1, 0, 1, 2].map((offset) => list[(activeIndex.value + offset + total) % total]);
});

const currentProject = computed(() => visibleProjects.value[2] || normalizedProjects.value[0]);

function titleToTwoLines(value) {
  const clean = plainTitle(value).toUpperCase();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= 1) return clean;
  const splitAt = Math.ceil(words.length / 2);
  return `${words.slice(0, splitAt).join(' ')}<br>${words.slice(splitAt).join(' ')}`;
}

function plainTitle(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function activateVisible(idx) {
  const offset = idx - 2;
  if (!offset || isSwitching.value || typeof window === 'undefined') return;

  const total = normalizedProjects.value.length;
  isSwitching.value = true;
  activeIndex.value = (activeIndex.value + offset + total) % total;
  window.setTimeout(() => {
    isSwitching.value = false;
  }, 520);
}

let ctx = null;
let mm = null;
let pollInterval = null;

function initPortfolioGsap(gsap) {
  nextTick(() => {
    if (!rootRef.value) return;

    ctx = gsap.context(() => {
      gsap.set('.portfolio-word', { autoAlpha: 0, yPercent: -7, scale: 1.05 });
      gsap.set('.showcase-card', { autoAlpha: 0 });
      gsap.set('.showcase-card-float', { y: 34, scale: 0.98 });
      gsap.set('.portfolio-cta', { autoAlpha: 0, y: 18, scale: 0.94 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to('.portfolio-word', { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.25 })
        .to('.showcase-card', {
          autoAlpha: 1,
          duration: 0.8,
          stagger: { amount: 0.28, from: 'center' },
        }, '-=0.85')
        .to('.showcase-card-float', {
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: { amount: 0.28, from: 'center' },
        }, '<')
        .to('.portfolio-cta', { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.5');

      mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions;
          if (reduceMotion) {
            gsap.set(['.portfolio-word', '.showcase-card', '.portfolio-cta'], { clearProps: 'all', autoAlpha: 1 });
            return () => {};
          }

          gsap.to('.showcase-card-float', {
            y: (i) => (i === 2 ? -22 : i % 2 === 0 ? -12 : -16),
            rotation: (i) => (i === 2 ? 1.5 : i < 2 ? -0.8 : 0.8),
            duration: (i) => (i === 2 ? 1.85 : 2.2 + i * 0.12),
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: { each: 0.08, from: 'center' },
          });
          gsap.to('.portfolio-word', {
            backgroundPosition: '58% 50%',
            duration: 9,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });

          return () => {};
        },
        rootRef.value,
      );
    }, rootRef.value);
  });
}

onMounted(() => {
  if (typeof window === 'undefined') return;
  pollInterval = window.setInterval(() => {
    if (window.gsap) {
      window.clearInterval(pollInterval);
      pollInterval = null;
      initPortfolioGsap(window.gsap);
    }
  }, 50);
});

onUnmounted(() => {
  if (pollInterval) window.clearInterval(pollInterval);
  mm?.revert();
  mm = null;
  ctx?.revert();
  ctx = null;
});
</script>

<style scoped>
.portfolio-cinema {
  --apex-orange: #ff9900;
  --apex-amber: #ffa500;
  --card-stroke: rgba(255, 255, 255, 0.13);
  min-height: clamp(820px, 108dvh, 980px);
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 72%, rgba(255, 153, 0, 0.18), transparent 16rem),
    radial-gradient(circle at 62% 28%, rgba(255, 165, 0, 0.14), transparent 18rem),
    linear-gradient(180deg, #02050b 0%, #010208 58%, #000 100%);
  color: white;
  font-family: Outfit, Arial, sans-serif;
}

.portfolio-stage {
  position: relative;
  display: grid;
  min-height: clamp(820px, 108dvh, 980px);
  place-items: center;
  padding: clamp(4rem, 7vh, 5.5rem) 0 clamp(6rem, 9vh, 7rem);
  isolation: isolate;
}

.portfolio-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(circle at center, black 0%, transparent 72%);
}

.portfolio-backdrop {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: clamp(2.7rem, 7vh, 4.2rem);
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.portfolio-word {
  width: max-content;
  font-size: clamp(5.4rem, 18.2vw, 16.2rem);
  font-weight: 900;
  line-height: 0.78;
  letter-spacing: -0.085em;
  color: transparent;
  background-image:
    linear-gradient(90deg, rgba(255,153,0,0.42), rgba(255,255,255,0.88) 48%, rgba(255,165,0,0.38)),
    var(--hero-image);
  background-size: cover, 112% auto;
  background-position: center, 50% 45%;
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0.74;
  filter: saturate(0.85) contrast(1.18);
  text-transform: uppercase;
  user-select: none;
}

.portfolio-rail {
  position: relative;
  z-index: 1;
  width: min(100vw, 1536px);
  height: min(58vw, 560px);
  min-height: 500px;
  margin-top: clamp(1rem, 5vh, 3.4rem);
  perspective: 1500px;
  transform-style: preserve-3d;
}

.showcase-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(250px, 25vw, 420px);
  aspect-ratio: 1.12 / 1;
  border-radius: 15px;
  background:
    radial-gradient(circle at 58% 110%, rgba(255,153,0,0.2), transparent 52%),
    linear-gradient(145deg, rgba(31,32,42,0.96), rgba(14,15,22,0.98));
  border: 1px solid var(--card-stroke);
  box-shadow: 0 36px 90px rgba(0, 0, 0, 0.62);
  overflow: visible;
  cursor: pointer;
  transform-style: preserve-3d;
  transition:
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 520ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}

.showcase-card-float {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  will-change: transform;
}

.showcase-card::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), transparent 36%);
  pointer-events: none;
  z-index: 3;
}

.showcase-card--0 {
  transform: translate3d(-244%, -44%, -220px) rotateZ(-5deg) rotateY(26deg) scale(0.87);
  opacity: 0.5;
  filter: brightness(0.62);
}
.showcase-card--1 {
  transform: translate3d(-143%, -46%, -80px) rotateZ(4deg) rotateY(17deg) scale(0.96);
  opacity: 0.88;
}
.showcase-card--2 {
  width: clamp(305px, 28vw, 440px);
  transform: translate3d(-50%, -44%, 80px) rotateZ(3.5deg) scale(1.05);
  opacity: 1;
  z-index: 5;
  border-color: rgba(255, 188, 67, 0.85);
  box-shadow:
    0 0 0 7px rgba(255,153,0,0.16),
    0 0 34px rgba(255,153,0,0.95),
    0 0 70px rgba(255,165,0,0.42),
    0 44px 100px rgba(0,0,0,0.82);
  cursor: default;
}
.showcase-card--2::after {
  content: '';
  position: absolute;
  inset: 9px;
  border-radius: 11px;
  border: 2px solid rgba(255, 192, 77, 0.9);
  box-shadow: inset 0 0 22px rgba(255,153,0,0.26);
  pointer-events: none;
  z-index: 4;
}
.showcase-card--3 {
  transform: translate3d(49%, -43%, -72px) rotateZ(2.5deg) rotateY(-19deg) scale(0.96);
  opacity: 0.9;
}
.showcase-card--4 {
  transform: translate3d(153%, -43%, -220px) rotateZ(5deg) rotateY(-28deg) scale(0.86);
  opacity: 0.48;
  filter: brightness(0.62);
}

.portfolio-rail.is-switching .showcase-card {
  pointer-events: none;
}

.showcase-card-link {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  border-radius: inherit;
}

.card-copy {
  position: relative;
  z-index: 2;
  padding: clamp(1.25rem, 2vw, 1.75rem);
}

.card-kicker {
  display: block;
  margin-bottom: 0.3rem;
  color: rgba(255,255,255,0.52);
  font-size: clamp(0.8rem, 1.35vw, 1rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1;
  text-transform: uppercase;
}

.card-copy h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(1.95rem, 3vw, 3.05rem);
  font-weight: 900;
  line-height: 0.96;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.showcase-card--2 .card-copy h2 {
  font-size: clamp(2.25rem, 3.45vw, 3.55rem);
}

.card-copy p {
  margin: 0.55rem 0 0;
  color: rgba(255,255,255,0.58);
  font-size: clamp(0.95rem, 1.35vw, 1.12rem);
  font-style: italic;
  font-weight: 300;
  line-height: 1.15;
}

.card-device {
  position: absolute;
  right: 10%;
  bottom: -7%;
  width: 48%;
  overflow: hidden;
  border: 4px solid #05060a;
  background: #03040a;
  box-shadow: 0 20px 42px rgba(0,0,0,0.58);
  transform: rotate(-8deg);
  z-index: 1;
}

.card-device.phone {
  aspect-ratio: 9 / 18.6;
  max-width: 154px;
  border-radius: 25px;
}

.card-device.browser {
  right: 9%;
  bottom: 9%;
  width: 64%;
  aspect-ratio: 16 / 10;
  border-radius: 10px;
  transform: rotate(0deg);
}

.card-device img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 2;
  width: 42%;
  height: 7%;
  transform: translateX(-50%);
  border-radius: 0 0 10px 10px;
  background: #05060a;
}

.browser-bar {
  position: absolute;
  inset: 0 0 auto;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 18px;
  padding-left: 9px;
  background: #090a11;
}

.browser-bar span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.28);
}

.portfolio-cta-wrap {
  position: relative;
  z-index: 2;
  margin-top: clamp(-3.2rem, -4vh, -1.8rem);
}

.portfolio-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 156px;
  min-height: 50px;
  padding: 0.85rem 1.7rem;
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 999px;
  color: white;
  background:
    radial-gradient(circle at 50% 120%, rgba(255,153,0,0.55), transparent 55%),
    rgba(18, 22, 32, 0.78);
  box-shadow:
    0 0 22px rgba(255,153,0,0.18),
    inset 0 0 18px rgba(255,255,255,0.04);
  font-size: 0.9rem;
  font-weight: 900;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.portfolio-cta:hover {
  transform: translateY(-2px);
  border-color: rgba(255,153,0,0.72);
  box-shadow:
    0 0 26px rgba(255,153,0,0.42),
    inset 0 0 18px rgba(255,255,255,0.06);
}

@media (max-width: 900px) {
  .portfolio-stage {
    padding-top: 5rem;
    justify-content: start;
  }

  .portfolio-backdrop {
    padding-top: 5rem;
  }

  .portfolio-word {
    font-size: clamp(4.4rem, 23vw, 8rem);
    letter-spacing: -0.075em;
  }

  .portfolio-rail {
    width: 100vw;
    height: 590px;
    min-height: 590px;
    margin-top: 7rem;
  }

  .showcase-card {
    width: min(78vw, 350px);
  }

  .showcase-card--0,
  .showcase-card--4 {
    opacity: 0;
    pointer-events: none;
  }

  .showcase-card--1 {
    transform: translate3d(-122%, -43%, -120px) rotateZ(-5deg) rotateY(24deg) scale(0.82);
    opacity: 0.45;
  }

  .showcase-card--2 {
    width: min(83vw, 370px);
    transform: translate3d(-50%, -43%, 80px) rotateZ(2.5deg) scale(1);
  }

  .showcase-card--3 {
    transform: translate3d(22%, -42%, -120px) rotateZ(5deg) rotateY(-24deg) scale(0.82);
    opacity: 0.45;
  }

  .portfolio-cta-wrap {
    margin-top: -4.2rem;
  }
}

@media (max-width: 560px) {
  .portfolio-rail {
    height: 560px;
    min-height: 560px;
    margin-top: 6.25rem;
  }

  .showcase-card--1,
  .showcase-card--3 {
    opacity: 0.22;
  }

  .card-copy {
    padding: 1.15rem;
  }

  .card-copy h2,
  .showcase-card--2 .card-copy h2 {
    font-size: clamp(2rem, 10vw, 2.85rem);
  }

  .card-device.phone {
    max-width: 130px;
  }
}
</style>
