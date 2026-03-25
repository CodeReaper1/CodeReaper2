<template>
  <div class="playground3-page min-h-screen bg-[#050505] text-white">

    <!-- ─────────────────────────────────────────────
         SECTION 1 — Hero: Clip-path curtain reveal
    ───────────────────────────────────────────── -->
    <section ref="heroSection" class="hero-section relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background image with clip curtain -->
      <div class="curtain-overlay absolute inset-0 bg-[#050505] z-10 origin-top"></div>
      <div class="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop"
          class="hero-bg w-full h-full object-cover scale-110"
          alt="Hero background"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="relative z-20 text-center px-6 max-w-5xl mx-auto hero-content opacity-0">
        <span class="inline-block text-[#FFA500] tracking-[0.4em] uppercase text-xs font-bold mb-6">
          Playground 3 — Transitions
        </span>
        <h1 class="text-6xl md:text-9xl font-[100] tracking-tighter leading-[0.9] mb-8">
          CURTAIN<br /><strong>REVEAL</strong>
        </h1>
        <p class="text-gray-400 text-lg md:text-2xl font-light max-w-xl mx-auto">
          A full-screen curtain wipes away to unveil the hero, then the copy fades up.
        </p>
      </div>

      <!-- scroll hint -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0 scroll-hint">
        <span class="text-gray-500 tracking-widest uppercase text-xs">Scroll</span>
        <div class="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent scroll-line"></div>
      </div>
    </section>

    <!-- ─────────────────────────────────────────────
         SECTION 2 — Cards: Stagger slide-in on scroll
    ───────────────────────────────────────────── -->
    <section ref="cardsSection" class="cards-section py-32 px-6 bg-[#0a0a0a]">
      <div class="container mx-auto max-w-6xl">
        <div class="mb-16 overflow-hidden">
          <h2 class="cards-heading text-5xl md:text-7xl font-[100] tracking-tighter uppercase translate-y-full">
            Stagger <strong>Slide</strong>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(card, i) in cards"
            :key="i"
            class="stagger-card opacity-0 translate-y-16 rounded-3xl p-8 border border-gray-800 bg-[#111] flex flex-col gap-6 hover:border-[#FFA500] transition-colors duration-300"
          >
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center" :style="{ background: card.color + '22', border: '1px solid ' + card.color + '55' }">
              <span class="material-icons text-xl" :style="{ color: card.color }">{{ card.icon }}</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2 tracking-tight">{{ card.title }}</h3>
              <p class="text-gray-500 font-light leading-relaxed">{{ card.desc }}</p>
            </div>
            <div class="mt-auto flex items-center gap-2 text-sm font-bold tracking-wider uppercase" :style="{ color: card.color }">
              <span>Explore</span>
              <span class="material-icons text-base">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────────────────────────────────────────
         SECTION 3 — CTA: Horizontal marquee + scale-in
    ───────────────────────────────────────────── -->
    <section ref="ctaSection" class="cta-section relative py-40 overflow-hidden bg-[#050505]">
      <!-- Marquee strip -->
      <div class="marquee-wrapper absolute top-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none select-none">
        <div class="marquee-track flex gap-16 whitespace-nowrap">
          <span
            v-for="n in 10"
            :key="n"
            class="text-[10rem] md:text-[14rem] font-black uppercase tracking-tighter text-white/[0.03] leading-none shrink-0"
          >
            TRANSITIONS
          </span>
        </div>
      </div>

      <!-- CTA content -->
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto cta-content opacity-0 scale-90">
        <h2 class="text-5xl md:text-8xl font-[100] tracking-tighter leading-tight mb-8">
          Ready to<br /><strong>Build?</strong>
        </h2>
        <p class="text-gray-400 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto">
          Three transitions, one page. Curtain reveal, stagger slide, and scale-in — all driven by GSAP.
        </p>
        <NuxtLink to="/" class="inline-flex items-center gap-3 bg-[#FFA500] text-black font-bold px-10 py-5 rounded-full text-lg hover:bg-white transition-colors duration-300">
          <span>Back to Home</span>
          <span class="material-icons">arrow_forward</span>
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' }
});

const heroSection  = ref(null);
const cardsSection = ref(null);
const ctaSection   = ref(null);

const cards = [
  {
    icon: 'bolt',
    color: '#FFA500',
    title: 'Performance',
    desc: 'GSAP-powered animations that run at 60fps without dropping a single frame, even on mobile.'
  },
  {
    icon: 'auto_awesome',
    color: '#a78bfa',
    title: 'Creativity',
    desc: 'From curtain reveals to staggered cards — every interaction is crafted with intention.'
  },
  {
    icon: 'code',
    color: '#34d399',
    title: 'Clean Code',
    desc: 'Composable, scoped animations that integrate naturally with Nuxt 3 lifecycle hooks.'
  }
];

let ctx = null;
let marqueeAnim = null;

onMounted(() => {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  ctx = gsap.context(() => {

    // ── 1. Curtain reveal (on load) ───────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    tl.to('.curtain-overlay', {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.4
    })
    .to('.hero-bg', {
      scale: 1,
      duration: 1.6,
      ease: 'power2.out'
    }, '<0.2')
    .to('.hero-content', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.scroll-hint', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.2');

    // scroll line pulse
    gsap.to('.scroll-line', {
      scaleY: 0.3,
      transformOrigin: 'top',
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'power1.inOut'
    });

    // ── 2. Cards stagger slide-in on scroll ───────────────────
    ScrollTrigger.create({
      trigger: cardsSection.value,
      start: 'top 75%',
      onEnter: () => {
        gsap.to('.cards-heading', {
          y: 0,
          duration: 1,
          ease: 'power3.out'
        });
        gsap.to('.stagger-card', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2
        });
      }
    });

    // ── 3. CTA scale-in + marquee on scroll ───────────────────
    ScrollTrigger.create({
      trigger: ctaSection.value,
      start: 'top 70%',
      onEnter: () => {
        gsap.to('.cta-content', {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'back.out(1.4)'
        });
      }
    });

    // continuous marquee
    marqueeAnim = gsap.to('.marquee-track', {
      x: '-50%',
      duration: 30,
      repeat: -1,
      ease: 'none'
    });

    // speed up marquee on scroll proximity
    ScrollTrigger.create({
      trigger: ctaSection.value,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (marqueeAnim) marqueeAnim.timeScale(1 + self.getVelocity() / 800);
      }
    });

  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  if (marqueeAnim) marqueeAnim.kill();
  if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
.playground3-page {
  font-family: 'Outfit', sans-serif;
}

/* page transition fallback */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
