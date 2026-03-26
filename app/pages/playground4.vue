<template>
  <div class="pg4-page min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-7xl">

      <!-- Header -->
      <div class="mb-12 border-b border-gray-800 pb-6">
        <h1 class="text-4xl md:text-6xl font-[100] tracking-tighter">
          UI <span class="font-bold">PLAYGROUND</span>
          <span class="ml-4 text-2xl md:text-4xl text-[#FF9900]">04</span>
        </h1>
        <p class="text-gray-400 mt-4 text-lg font-light">Test and preview new sections before assembling them on main pages.</p>
      </div>

      <div class="playground-content space-y-0">

        <!-- ============================================================
             SECTION 1 — HOW IT WORKS
             Animation: 3D rotateY flip-in on scroll per card (perspective)
                        Hover: card lifts + inner accent line expands
        ============================================================ -->
        <section class="flip-section py-24 md:py-32 relative overflow-hidden">
          <div class="mb-16">
            <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-5">How It Works</span>
            <h2 class="text-4xl md:text-6xl lg:text-7xl font-[100] leading-[0.9] tracking-tighter text-white uppercase">
              <div class="overflow-hidden pb-2"><span class="flip-title-line inline-block">The</span></div>
              <div class="overflow-hidden pb-2"><span class="flip-title-line inline-block font-bold">Process</span></div>
            </h2>
          </div>

          <!-- Process step cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flip-cards-grid" style="perspective: 1400px;">
            <div
              v-for="(step, i) in steps"
              :key="i"
              class="flip-card-wrap"
            >
              <div class="flip-card bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 h-full flex flex-col gap-5 relative overflow-hidden cursor-default">
                <!-- Step number -->
                <div class="text-[4rem] font-black leading-none text-white/[0.06] absolute top-4 right-6 select-none pointer-events-none">
                  {{ String(i + 1).padStart(2, '0') }}
                </div>
                <!-- Icon badge -->
                <div class="w-12 h-12 rounded-xl border border-gray-700 flex items-center justify-center text-[#FF9900] shrink-0">
                  <component :is="step.iconSvg" />
                </div>
                <h3 class="text-xl font-bold text-white relative z-10">{{ step.title }}</h3>
                <p class="text-gray-400 font-light text-sm leading-relaxed flex-1 relative z-10">{{ step.desc }}</p>
                <!-- Expanding accent line -->
                <div class="flip-card-line h-[2px] bg-[#FF9900] rounded-full origin-left" style="transform: scaleX(0.15);"></div>
              </div>
            </div>
          </div>
        </section>


        <!-- ============================================================
             SECTION 2 — ABOUT / OUR STORY
             Animation: JS word-split paragraph stagger
                        + scroll-scrubbed clip-path image unmask (scrub)
        ============================================================ -->
        <section class="about-words-section py-24 md:py-32 bg-[#0a0a0a] rounded-3xl border border-gray-800 px-8 md:px-16 overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <!-- Left: text -->
            <div>
              <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-6">Our Story</span>

              <h2 class="about-heading text-3xl md:text-4xl lg:text-5xl font-[100] leading-tight tracking-tighter mb-8 overflow-hidden">
                <span class="about-heading-inner inline-block">We don't just build websites.</span><br/>
                <span class="about-heading-inner inline-block font-bold">We build growth engines.</span>
              </h2>

              <!-- Word-split paragraph — populated by JS -->
              <p class="word-split-para text-gray-400 font-light text-lg leading-[1.9]">
                Every project starts with a single question: what does success actually look like for you? We listen, we research, and then we craft digital experiences designed not just to impress, but to convert, to retain, and to grow your brand in a market that never stands still.
              </p>

              <div class="about-cta-line mt-10 opacity-0 flex items-center gap-5">
                <div class="flex-1 h-[1px] bg-gray-800"></div>
                <span class="text-[11px] tracking-[0.4em] uppercase text-gray-500">Est. 2012</span>
              </div>
            </div>

            <!-- Right: image with scrub unmask -->
            <div class="about-image-wrap relative h-[420px] md:h-[560px] rounded-3xl overflow-hidden" style="clip-path: inset(0 100% 0 0);">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1080&auto=format&fit=crop"
                class="w-full h-full object-cover"
                alt="Team collaboration"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent"></div>
              <!-- Floating label -->
              <div class="absolute bottom-8 left-8 right-8">
                <div class="inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-5 py-3">
                  <span class="w-2 h-2 rounded-full bg-[#FF9900] animate-pulse"></span>
                  <span class="text-xs tracking-widest uppercase text-white/70">Building since 2012</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- ============================================================
             SECTION 3 — CALL TO ACTION
             Animation: Section pins to viewport; GSAP timeline scrubbed
                        to scroll progress drives scale(3→1) + blur(20→0)
                        on headline, then reveals subtext and button.
        ============================================================ -->
        <section class="cta-pin-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] border-t border-gray-800">
          <!-- Radial background glow -->
          <div class="cta-glow absolute inset-0 pointer-events-none"
               style="background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,153,0,0.07) 0%, transparent 70%); opacity: 0;">
          </div>

          <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <!-- Main headline — zooms from 3x -->
            <div class="overflow-hidden mb-6">
              <h2 class="cta-headline-inner text-5xl md:text-7xl lg:text-[6rem] font-[100] leading-[0.9] tracking-tighter text-white uppercase"
                  style="transform: scale(3); opacity: 0; filter: blur(20px); transform-origin: center center;">
                Ready to <span class="font-bold text-[#FF9900]">grow?</span>
              </h2>
            </div>

            <!-- Tagline -->
            <p class="cta-tagline text-gray-400 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-12"
               style="opacity: 0; transform: translateY(50px);">
              Let's build something that works as hard as you do. No fluff, no guesswork — just results.
            </p>

            <!-- Actions -->
            <div class="cta-actions flex flex-col sm:flex-row items-center justify-center gap-5"
                 style="opacity: 0; transform: translateY(40px);">
              <a href="#" class="mil-button mil-arrow-place px-10 py-5 text-base">
                <span>Start a Project</span>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors tracking-wider text-sm uppercase font-bold">
                View Our Work →
              </a>
            </div>
          </div>

          <!-- Scroll hint (fades out as timeline starts) -->
          <div class="cta-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
            <span class="text-[10px] tracking-[0.4em] uppercase text-gray-600">Scroll</span>
            <div class="w-[1px] h-10 bg-gradient-to-b from-gray-700 to-transparent"></div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted } from 'vue';

definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' }
});

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const steps = [
  {
    title: 'Discovery',
    desc: 'We dig into your goals, market, and competition to build a strategy grounded in data, not guesswork.',
    iconSvg: { template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M12.5 12.5L16 16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` },
  },
  {
    title: 'Strategy',
    desc: 'Every touchpoint is mapped. We architect solutions before a single line of code or pixel is created.',
    iconSvg: { template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>` },
  },
  {
    title: 'Execution',
    desc: 'Design and build happen in lockstep. Fast iteration, continuous feedback, zero surprises at launch.',
    iconSvg: { template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9L7.5 13.5L15 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  },
  {
    title: 'Growth',
    desc: 'We don\'t disappear post-launch. We track, analyse, and optimise until the numbers go where they need to go.',
    iconSvg: { template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 13L6.5 8L10 11L15 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4H15V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  },
];


/* ------------------------------------------------------------------ */
/*  GSAP scroll animations                                              */
/* ------------------------------------------------------------------ */

let ctx = null;

onMounted(() => {
  if (typeof window === 'undefined') return;

  setTimeout(() => {
    const gsap          = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    ctx = gsap.context(() => {

      /* ── Section 1: 3D rotateY flip-in ── */

      // Heading lines slide up
      gsap.fromTo(
        '.flip-title-line',
        { y: '110%' },
        {
          y:        '0%',
          duration: 1.2,
          stagger:  0.18,
          ease:     'power4.out',
          scrollTrigger: {
            trigger:       '.flip-section',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards flip in — rotateY from -90° to 0°
      gsap.fromTo(
        '.flip-card-wrap',
        {
          rotateY:          -90,
          opacity:          0,
          transformOrigin:  'left center',
          transformPerspective: 1400,
        },
        {
          rotateY:  0,
          opacity:  1,
          duration: 1.1,
          stagger:  0.18,
          ease:     'back.out(1.2)',
          scrollTrigger: {
            trigger:       '.flip-cards-grid',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Hover: expand the accent line + lift the card
      document.querySelectorAll('.flip-card-wrap').forEach(wrap => {
        const card = wrap.querySelector('.flip-card');
        const line = wrap.querySelector('.flip-card-line');

        wrap.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -8, boxShadow: '0 30px 70px rgba(255,153,0,0.1)', duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(line, { scaleX: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
        });
        wrap.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, boxShadow: '0 0px 0px rgba(255,153,0,0)', duration: 0.6, ease: 'power3.inOut', overwrite: 'auto' });
          gsap.to(line, { scaleX: 0.15, duration: 0.5, ease: 'power3.inOut', overwrite: 'auto' });
        });
      });


      /* ── Section 2: Word-split stagger + scrub image unmask ── */

      // Heading lines slide up
      gsap.fromTo(
        '.about-heading-inner',
        { y: '105%' },
        {
          y:        '0%',
          duration: 1.1,
          stagger:  0.14,
          ease:     'power4.out',
          scrollTrigger: {
            trigger:       '.about-words-section',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Word split: parse the paragraph text into individual word spans
      const paraEl = document.querySelector('.word-split-para');
      if (paraEl) {
        const rawText = paraEl.textContent.trim();
        const words   = rawText.split(/\s+/);
        paraEl.innerHTML = words
          .map(w => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
          .join(' ');

        gsap.fromTo(
          '.word-inner',
          { y: '100%', opacity: 0 },
          {
            y:        '0%',
            opacity:  1,
            duration: 0.55,
            stagger:  0.025,
            ease:     'power3.out',
            scrollTrigger: {
              trigger:       '.about-words-section',
              start:         'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Bottom decorative line
      gsap.to('.about-cta-line', {
        opacity:  1,
        duration: 0.8,
        ease:     'power2.out',
        scrollTrigger: {
          trigger:       '.about-words-section',
          start:         'top 55%',
          toggleActions: 'play none none reverse',
        },
      });

      // Image unmask via clip-path — scrub-linked to scroll progress
      gsap.fromTo(
        '.about-image-wrap',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease:     'none',
          scrollTrigger: {
            trigger: '.about-words-section',
            start:   'top 55%',
            end:     'center 20%',
            scrub:   1,
          },
        }
      );


      /* ── Section 3: Pinned zoom-out + blur reveal CTA ── */

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger:    '.cta-pin-section',
          start:      'top top',
          end:        '+=180%',
          pin:        true,
          scrub:      1.5,
          anticipatePin: 1,
        },
      });

      ctaTl
        // Background glow fades in
        .to('.cta-glow', { opacity: 1, duration: 0.3 }, 0)

        // Scroll hint fades out
        .to('.cta-scroll-hint', { opacity: 0, duration: 0.2 }, 0)

        // Headline zooms from 3x scale + blur to normal — the main event
        .to('.cta-headline-inner', {
          scale:    1,
          opacity:  1,
          filter:   'blur(0px)',
          duration: 1,
          ease:     'power2.out',
        }, 0)

        // Tagline slides up once headline is settling
        .to('.cta-tagline', {
          opacity:   1,
          y:         0,
          duration:  0.5,
          ease:      'power3.out',
        }, 0.65)

        // CTA actions follow
        .to('.cta-actions', {
          opacity:   1,
          y:         0,
          duration:  0.4,
          ease:      'power3.out',
        }, 0.8);

      ScrollTrigger.refresh();
    });
  }, 100);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>


<style scoped>
.pg4-page {
  font-family: 'Outfit', sans-serif;
}

/* ── Section 1: flip cards ── */
.flip-card-wrap {
  will-change: transform, opacity;
}
.flip-card {
  will-change: transform, box-shadow;
  transition: border-color 0.35s ease;
}
.flip-card:hover {
  border-color: rgba(255, 153, 0, 0.25);
}
.flip-card-line {
  will-change: transform;
}

/* ── Section 2: word split ── */
.word-wrap {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  /* small gap below each word row so descenders aren't clipped */
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
}
.word-inner {
  display: inline-block;
  will-change: transform, opacity;
}
.about-image-wrap {
  will-change: clip-path;
}
.about-heading .about-heading-inner {
  /* parent .overflow-hidden clips the slide-up */
}

/* ── Section 3: CTA ── */
.cta-headline-inner {
  will-change: transform, opacity, filter;
}
.cta-tagline,
.cta-actions {
  will-change: transform, opacity;
}

/* ── Page transition ── */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
