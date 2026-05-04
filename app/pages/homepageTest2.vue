<template>
  <main ref="mainRef" class="bg-background-light dark:bg-[#0a0a0a]">
    <!-- Page header -->
    <section class="py-24 md:py-32 bg-white dark:bg-[#0a0a0a] text-center" data-nav-theme="light">
      <div class="container mx-auto px-6">
        <h1 class="text-4xl md:text-6xl font-[100] tracking-tighter text-gray-900 dark:text-white">
          Homepage Test 2
        </h1>
        <p class="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Sandbox holding the original horizontal showcase and the original CaseStudiesShowcase. Kept here for review while the homepage uses the new PortfolioStack.
        </p>
      </div>
    </section>

    <!-- Original Horizontal Showcase Pinned Scroll -->
    <section
      class="horizontal-showcase-section bg-background-light dark:bg-[#111] overflow-hidden relative h-screen"
      data-nav-theme="light"
    >
      <div class="horizontal-container flex h-full items-center w-max px-6 md:px-20">
        <!-- Intro Panel -->
        <div class="showcase-panel w-[100vw] h-full flex flex-col justify-center shrink-0 pr-20 relative">
          <div class="flex flex-col md:flex-row md:items-end gap-10 md:gap-14 lg:gap-24 max-w-[min(92vw,72rem)]">
            <div class="intro-copy flex-1 min-w-0">
              <h2 class="text-sm font-bold tracking-[0.3em] text-primary mb-4 uppercase">
                {{ $t('home_new.work.subtitle') }}
              </h2>
              <h3
                class="text-5xl md:text-8xl font-[100] text-gray-900 dark:text-white leading-tight max-w-4xl"
                v-html="$t('home_new.work.title')"
              />
            </div>
            <div
              class="showcase-intro-float relative shrink-0 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[min(22vmin,168px)] md:h-[min(22vmin,168px)] pointer-events-none select-none"
              aria-hidden="true"
            >
              <div class="showcase-float-ring absolute inset-0 rounded-full border border-primary/20 dark:border-primary/30" />
              <div class="showcase-float-ring absolute inset-[14%] rounded-full border border-primary/30 dark:border-primary/40" />
              <div class="showcase-float-ring absolute inset-[30%] rounded-full bg-primary/[0.12] dark:bg-primary/20 shadow-[0_0_40px_rgba(255,153,0,0.12)]" />
              <div class="absolute -right-1 top-[22%] h-2 w-2 rounded-full bg-primary/60 md:h-2.5 md:w-2.5" />
              <div class="absolute left-[8%] bottom-[12%] h-1.5 w-1.5 rounded-full bg-gray-400/50 dark:bg-white/25" />
            </div>
          </div>
        </div>

        <!-- Dynamic Portfolio Cards -->
        <div
          v-for="(project, idx) in showcaseProjects"
          :key="project.id || idx"
          class="showcase-panel w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 mx-8 relative rounded-[40px] overflow-hidden group cursor-pointer block"
        >
          <img
            :src="project.image"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            :alt="project.imageAlt || project.title"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div class="absolute bottom-10 left-10 z-10 w-full pr-10">
            <span class="text-primary tracking-widest uppercase text-sm md:text-base font-bold block mb-2">{{ project.client }}</span>
            <h4 class="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2">{{ project.title }}</h4>
            <div class="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <NuxtLink
                :to="localePath(project.link)"
                class="inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-primary transition-colors"
              >
                VIEW PROJECT
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Outro Panel -->
        <div
          class="showcase-panel w-[85vw] md:w-[40vw] h-[60vh] md:h-[70vh] shrink-0 mx-8 relative rounded-[40px] overflow-hidden group cursor-pointer bg-gray-100 dark:bg-[#1a1a1a] flex flex-col justify-center items-center border border-gray-200 dark:border-gray-800"
        >
          <NuxtLink :to="localePath('/portfolio')" class="absolute inset-0 z-20" />
          <div class="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
            <span class="text-primary text-5xl">→</span>
          </div>
          <h4 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">View All Projects</h4>
          <p class="text-gray-500 dark:text-gray-400 text-lg">Explore our full portfolio</p>
        </div>
      </div>
    </section>

    <HomeCaseStudiesShowcase :projects="showcaseProjects" />
  </main>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useLocalePath } from '#imports';

const localePath = useLocalePath();
const mainRef = ref(null);

const { projects: wpProjects } = usePortfolio(3);

const fallbackProjects = [
  { id: 'fb-1', title: 'Nexus Analytics', client: 'NEXUS TECH', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop', link: '/portfolio', imageAlt: 'Nexus Analytics' },
  { id: 'fb-2', title: 'Vibe Social', client: 'VIBE INC', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', link: '/portfolio', imageAlt: 'Vibe Social' },
  { id: 'fb-3', title: 'Apex Dashboard', client: 'APEX', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop', link: '/portfolio', imageAlt: 'Apex Dashboard' },
];

const showcaseProjects = computed(() =>
  wpProjects.value?.length ? wpProjects.value.slice(0, 3) : fallbackProjects,
);

let ctx = null;
let mm = null;
let pollInterval = null;

function initAnimations(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  nextTick(() => {
    if (!mainRef.value) return;
    const root = mainRef.value;

    mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        if (reduceMotion) {
          ScrollTrigger.refresh();
          return;
        }

        ctx = gsap.context(() => {
          if (!isDesktop) return;
          const container = root.querySelector('.horizontal-container');
          if (!container) return;

          const horizontalTween = gsap.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth) + 'px',
            ease: 'none',
            scrollTrigger: {
              trigger: '.horizontal-showcase-section',
              pin: true,
              scrub: 1,
              end: () => '+=' + container.scrollWidth,
              invalidateOnRefresh: true,
            },
          });

          const introPanel = container.querySelector('.showcase-panel');
          if (introPanel) {
            gsap.from(introPanel.querySelectorAll('h2, h3'), {
              yPercent: 60, autoAlpha: 0, stagger: 0.12, duration: 1.2,
              scrollTrigger: {
                trigger: '.horizontal-showcase-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            });
            const floatDeco = introPanel.querySelector('.showcase-intro-float');
            if (floatDeco) {
              gsap.from(floatDeco, {
                autoAlpha: 0, scale: 0.85, rotation: -12, duration: 1, ease: 'power3.out',
                scrollTrigger: {
                  trigger: '.horizontal-showcase-section',
                  start: 'top 78%',
                  toggleActions: 'play none none reverse',
                },
              });
              gsap.to(floatDeco, {
                y: -12, rotation: 6, duration: 3.6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.2,
              });
              introPanel.querySelectorAll('.showcase-float-ring').forEach((ring, i) => {
                gsap.to(ring, {
                  scale: 1.05 + i * 0.02,
                  opacity: i === 2 ? 0.95 : 0.85,
                  duration: 2.4 + i * 0.35,
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  delay: i * 0.12,
                });
              });
            }
          }

          const cards = container.querySelectorAll('.showcase-panel.rounded-\\[40px\\]');
          const showcaseScrub = 1.25;
          cards.forEach((card) => {
            const img = card.querySelector('img');
            if (img) {
              gsap.fromTo(img,
                { xPercent: -10 },
                {
                  xPercent: 10, ease: 'none',
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: 'left right', end: 'right left', scrub: showcaseScrub,
                  },
                });
            }
            gsap.timeline({
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left right',
                end: 'right left',
                scrub: showcaseScrub,
              },
            })
              .fromTo(card,
                { scale: 0.85, filter: 'brightness(0.55)' },
                { scale: 1, filter: 'brightness(1)', duration: 0.36, ease: 'power2.out' })
              .to(card, { scale: 0.85, filter: 'brightness(0.55)', duration: 0.64, ease: 'power2.in' });
          });
        }, root);

        ScrollTrigger.refresh();
        return () => { ctx?.revert(); ctx = null; };
      },
      mainRef.value,
    );
  });
}

onMounted(() => {
  if (typeof window === 'undefined') return;
  pollInterval = window.setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.clearInterval(pollInterval);
      pollInterval = null;
      initAnimations(window.gsap, window.ScrollTrigger);
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
@media (max-width: 767px) {
  @media (prefers-reduced-motion: no-preference) {
    .showcase-intro-float {
      animation: showcase-intro-drift 4.2s ease-in-out infinite alternate;
    }
  }
}

@keyframes showcase-intro-drift {
  from { transform: translateY(0) rotate(-3deg); }
  to   { transform: translateY(-12px) rotate(5deg); }
}
</style>
