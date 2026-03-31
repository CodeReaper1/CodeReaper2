<template>
  <div class="pg15-page min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-7xl">

      <!-- Header -->
      <div class="mb-12 border-b border-gray-800 pb-6">
        <h1 class="text-4xl md:text-6xl font-[100] tracking-tighter">
          UI <span class="font-bold">PLAYGROUND</span>
          <span class="ml-4 text-2xl md:text-4xl text-[#FF9900]">15</span>
        </h1>
        <p class="text-gray-400 mt-4 text-lg font-light">Test and preview new sections before assembling them on main pages.</p>
      </div>
    </div>

    <div class="playground-content space-y-0">

      <!-- ============================================================
           SECTION 1 — HORIZONTAL SCROLL PORTFOLIO
           Animation: Pinned horizontal scroll + card scale/fade
                      + progress bar scrub
      ============================================================ -->
      <section class="pg15-hscroll-section relative h-screen overflow-hidden">
        <!-- Progress bar -->
        <div class="absolute top-0 left-0 w-full h-[2px] bg-gray-800 z-20">
          <div class="pg15-hscroll-progress h-full bg-[#FF9900] rounded-full" style="transform: scaleX(0); transform-origin: left center;"></div>
        </div>

        <!-- Fixed header -->
        <div class="absolute top-10 left-8 md:left-16 z-10">
          <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-5">Selected Work</span>
          <h2 class="text-4xl md:text-6xl lg:text-7xl font-[100] leading-[0.9] tracking-tighter text-white uppercase">
            <div class="overflow-hidden pb-2"><span class="pg15-hscroll-title-line inline-block">Our</span></div>
            <div class="overflow-hidden pb-2"><span class="pg15-hscroll-title-line inline-block font-bold">Portfolio</span></div>
          </h2>
        </div>

        <!-- Scroll counter -->
        <div class="absolute bottom-10 left-8 md:left-16 z-10 flex items-center gap-4">
          <span class="text-[10px] tracking-[0.4em] uppercase text-gray-600">Scroll →</span>
          <div class="w-12 h-[1px] bg-gray-700"></div>
        </div>

        <!-- Horizontal track -->
        <div class="pg15-hscroll-track flex items-center h-full gap-8 pl-[50vw] pr-[30vw]">
          <div
            v-for="(project, i) in projects"
            :key="i"
            class="pg15-hscroll-card shrink-0 w-[380px] md:w-[450px] h-[500px] md:h-[560px] bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden relative group cursor-default"
          >
            <!-- Image -->
            <div class="absolute inset-0">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
            </div>

            <!-- Content -->
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-[10px] tracking-[0.3em] uppercase text-[#FF9900]">{{ project.category }}</span>
                <span class="w-1 h-1 rounded-full bg-gray-600"></span>
                <span class="text-[10px] tracking-[0.3em] uppercase text-gray-500">{{ project.year }}</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight">{{ project.title }}</h3>
              <!-- Accent line -->
              <div class="w-10 h-[2px] bg-[#FF9900] rounded-full mt-5 group-hover:w-20 transition-all duration-500"></div>
            </div>

            <!-- Card number -->
            <div class="absolute top-6 right-6 text-[10px] tracking-[0.3em] text-white/20 font-bold">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
          </div>
        </div>
      </section>


      <!-- ============================================================
           SECTION 2 — TEXT SCRAMBLE / DECODE
           Animation: Characters cycle through random chars then resolve
                      left-to-right on scroll entry
      ============================================================ -->
      <section class="pg15-decode-section py-24 md:py-32 bg-[#050505] px-8 md:px-16 relative overflow-hidden">
        <div class="container mx-auto max-w-5xl">

          <!-- Header -->
          <div class="mb-20">
            <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-5">Our Philosophy</span>
            <h2 class="text-4xl md:text-6xl lg:text-7xl font-[100] leading-[0.9] tracking-tighter text-white uppercase">
              <div class="overflow-hidden pb-2"><span class="pg15-decode-title-line inline-block">What We</span></div>
              <div class="overflow-hidden pb-2"><span class="pg15-decode-title-line inline-block font-bold">Believe In</span></div>
            </h2>
          </div>

          <!-- Philosophy blocks -->
          <div class="space-y-16 md:space-y-20">
            <div
              v-for="(item, i) in philosophies"
              :key="i"
              class="pg15-decode-item flex gap-6 md:gap-10"
            >
              <!-- Vertical accent bar -->
              <div class="pg15-decode-accent w-[3px] shrink-0 bg-[#FF9900] rounded-full self-stretch" style="transform: scaleY(0); transform-origin: top center;"></div>

              <div class="flex-1">
                <!-- Label -->
                <span class="pg15-decode-label block text-[11px] font-bold tracking-[0.45em] text-gray-600 uppercase mb-4 opacity-0">{{ item.label }}</span>
                <!-- Scrambled text -->
                <p class="pg15-decode-text text-xl md:text-2xl lg:text-3xl font-[100] leading-[1.5] text-gray-300 tracking-tight">
                  {{ item.text }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      <!-- ============================================================
           SECTION 3 — PARALLAX DEPTH + ROTATION REVEAL
           Animation: Cards with varying parallax speeds + rotateX entry
                      + background numbers at inverted speed
      ============================================================ -->
      <section class="pg15-parallax-section py-24 md:py-32 bg-[#0a0a0a] rounded-3xl border border-gray-800 overflow-hidden px-8 md:px-16 mx-6 relative">

        <!-- Header -->
        <div class="container mx-auto max-w-7xl mb-20">
          <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-5">Why Choose Us</span>
          <h2 class="text-4xl md:text-6xl lg:text-7xl font-[100] leading-[0.9] tracking-tighter text-white uppercase">
            <div class="overflow-hidden pb-2"><span class="pg15-parallax-title-line inline-block">Our</span></div>
            <div class="overflow-hidden pb-2"><span class="pg15-parallax-title-line inline-block font-bold">Difference</span></div>
          </h2>
        </div>

        <!-- Cards grid -->
        <div class="container mx-auto max-w-7xl pg15-parallax-container grid grid-cols-1 md:grid-cols-2 gap-8" style="perspective: 1200px;">
          <div
            v-for="(diff, i) in differentiators"
            :key="i"
            class="pg15-parallax-card bg-[#111] border border-gray-800 rounded-2xl p-10 relative overflow-hidden"
            :class="{ 'md:mt-16': i % 2 === 1 }"
            :data-speed="[0.3, 0.7, 0.5, 1.0][i]"
          >
            <!-- Background decorative number -->
            <div
              class="pg15-parallax-bg-num absolute -top-2 -right-2 text-[7rem] md:text-[9rem] font-black text-white/[0.03] leading-none select-none pointer-events-none"
              :data-speed="[0.6, 0.3, 0.8, 0.4][i]"
            >
              {{ diff.num }}
            </div>

            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl border border-gray-700 flex items-center justify-center text-[#FF9900] text-xl mb-6 relative z-10">
              {{ diff.icon }}
            </div>

            <!-- Content -->
            <h3 class="text-xl md:text-2xl font-bold text-white mb-4 relative z-10">{{ diff.title }}</h3>
            <p class="text-gray-400 font-light text-sm md:text-base leading-relaxed relative z-10">{{ diff.desc }}</p>

            <!-- Bottom accent line -->
            <div class="w-10 h-[2px] bg-[#FF9900] rounded-full mt-8"></div>
          </div>
        </div>

      </section>

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

const projects = [
  { title: 'Meridian Finance', category: 'Web Design', year: '2025', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { title: 'Aether Wellness', category: 'Brand Identity', year: '2024', image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80' },
  { title: 'Noctis Studios', category: 'E-Commerce', year: '2025', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
  { title: 'Vertex Analytics', category: 'Web Application', year: '2024', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { title: 'Prism Creative', category: 'Digital Marketing', year: '2025', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80' },
];

const philosophies = [
  { label: '01 / Craft', text: 'We treat every pixel and every line of code as a deliberate choice. Nothing ships that we would not proudly put our name on.' },
  { label: '02 / Clarity', text: 'Complexity is the enemy of conversion. We strip away noise until only the essential message remains — sharp, clear, compelling.' },
  { label: '03 / Momentum', text: 'Launch day is not the finish line. We build systems designed for continuous growth, iteration, and measurable improvement.' },
];

const differentiators = [
  { num: '01', title: 'Performance Obsessed', desc: 'Every site we ship scores 90+ on Core Web Vitals. Speed is not a feature request — it is a baseline requirement baked into every decision.', icon: '⚡' },
  { num: '02', title: 'Conversion Driven', desc: 'Beautiful design means nothing without results. We A/B test, iterate, and optimise until the numbers prove the approach works.', icon: '◎' },
  { num: '03', title: 'Transparent Process', desc: 'No black boxes. You get access to real-time dashboards, weekly reports, and direct access to the team building your product.', icon: '◈' },
  { num: '04', title: 'Long-Term Partners', desc: 'We do not do one-off projects and disappear. Eighty percent of our clients have been with us for over two years and counting.', icon: '◆' },
];


/* ------------------------------------------------------------------ */
/*  Text scramble helper                                                */
/* ------------------------------------------------------------------ */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

function scrambleText(gsap, el, finalText, duration = 1.8) {
  const len = finalText.length;
  const obj = { progress: 0 };

  return gsap.to(obj, {
    progress: 1,
    duration,
    ease: 'power2.inOut',
    onUpdate() {
      const p = obj.progress;
      const lockedCount = Math.floor(p * len);
      let result = '';
      for (let i = 0; i < len; i++) {
        if (finalText[i] === ' ') {
          result += ' ';
        } else if (i < lockedCount) {
          result += finalText[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = result;
    },
  });
}


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

      /* ── Section 1: Horizontal Scroll Portfolio ── */

      // Heading lines slide up
      gsap.fromTo(
        '.pg15-hscroll-title-line',
        { y: '110%' },
        {
          y:        '0%',
          duration: 1.2,
          stagger:  0.18,
          ease:     'power4.out',
          scrollTrigger: {
            trigger:       '.pg15-hscroll-section',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Calculate horizontal scroll distance
      const track = document.querySelector('.pg15-hscroll-track');
      if (track) {
        const getScrollDistance = () => track.scrollWidth - window.innerWidth;

        const hScrollTween = gsap.to('.pg15-hscroll-track', {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger:            '.pg15-hscroll-section',
            start:              'top top',
            end:                () => `+=${getScrollDistance()}`,
            pin:                true,
            scrub:              1,
            anticipatePin:      1,
            invalidateOnRefresh: true,
          },
        });

        // Progress bar
        gsap.to('.pg15-hscroll-progress', {
          scaleX: 1,
          ease:   'none',
          scrollTrigger: {
            trigger: '.pg15-hscroll-section',
            start:   'top top',
            end:     () => `+=${getScrollDistance()}`,
            scrub:   1,
          },
        });

        // Individual card scale-up
        gsap.utils.toArray('.pg15-hscroll-card').forEach(card => {
          gsap.fromTo(card,
            { scale: 0.88, opacity: 0.3 },
            {
              scale:    1,
              opacity:  1,
              duration: 1,
              ease:     'power2.out',
              scrollTrigger: {
                trigger:            card,
                containerAnimation: hScrollTween,
                start:              'left 85%',
                end:                'left 40%',
                scrub:              1,
              },
            }
          );
        });
      }


      /* ── Section 2: Text Scramble / Decode ── */

      // Heading lines slide up
      gsap.fromTo(
        '.pg15-decode-title-line',
        { y: '110%' },
        {
          y:        '0%',
          duration: 1.2,
          stagger:  0.18,
          ease:     'power4.out',
          scrollTrigger: {
            trigger:       '.pg15-decode-section',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Each decode item
      document.querySelectorAll('.pg15-decode-item').forEach((item, i) => {
        const textEl    = item.querySelector('.pg15-decode-text');
        const accentEl  = item.querySelector('.pg15-decode-accent');
        const labelEl   = item.querySelector('.pg15-decode-label');
        const finalText = philosophies[i].text;

        // Initialize with scrambled text
        textEl.textContent = finalText.replace(/[^\s]/g, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)]
        );

        ScrollTrigger.create({
          trigger: item,
          start:   'top 75%',
          once:    true,
          onEnter: () => {
            // Label fade in
            gsap.to(labelEl, { opacity: 1, duration: 0.6, ease: 'power2.out' });
            // Accent bar grows
            gsap.to(accentEl, { scaleY: 1, duration: 1.4, ease: 'power3.out' });
            // Text decode
            scrambleText(gsap, textEl, finalText, 1.8);
          },
        });
      });


      /* ── Section 3: Parallax Depth + Rotation Reveal ── */

      // Heading lines slide up
      gsap.fromTo(
        '.pg15-parallax-title-line',
        { y: '110%' },
        {
          y:        '0%',
          duration: 1.2,
          stagger:  0.18,
          ease:     'power4.out',
          scrollTrigger: {
            trigger:       '.pg15-parallax-section',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Staggered rotateX entry
      gsap.fromTo(
        '.pg15-parallax-card',
        {
          rotateX:              -15,
          y:                    120,
          opacity:              0,
          transformOrigin:      'bottom center',
          transformPerspective: 1200,
        },
        {
          rotateX:  0,
          y:        0,
          opacity:  1,
          duration: 1.2,
          stagger:  0.2,
          ease:     'power3.out',
          scrollTrigger: {
            trigger:       '.pg15-parallax-container',
            start:         'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax on scroll — each card moves at its own speed
      gsap.utils.toArray('.pg15-parallax-card').forEach(card => {
        const speed = parseFloat(card.dataset.speed);
        gsap.to(card, {
          y: () => -speed * 120,
          ease: 'none',
          scrollTrigger: {
            trigger: '.pg15-parallax-section',
            start:   'top bottom',
            end:     'bottom top',
            scrub:   1,
          },
        });
      });

      // Background numbers — inverted parallax for depth
      gsap.utils.toArray('.pg15-parallax-bg-num').forEach(num => {
        const speed = parseFloat(num.dataset.speed);
        gsap.to(num, {
          y: () => speed * 80,
          ease: 'none',
          scrollTrigger: {
            trigger: '.pg15-parallax-section',
            start:   'top bottom',
            end:     'bottom top',
            scrub:   1,
          },
        });
      });


      ScrollTrigger.refresh();
    });
  }, 100);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>


<style scoped>
.pg15-page {
  font-family: 'Outfit', sans-serif;
}

/* ── Section 1: Horizontal scroll ── */
.pg15-hscroll-section {
  will-change: transform;
}
.pg15-hscroll-track {
  will-change: transform;
}
.pg15-hscroll-card {
  will-change: transform, opacity;
  transition: border-color 0.35s ease;
}
.pg15-hscroll-card:hover {
  border-color: rgba(255, 153, 0, 0.25);
}
.pg15-hscroll-progress {
  will-change: transform;
}

/* ── Section 2: Text scramble ── */
.pg15-decode-text {
  will-change: contents;
}
.pg15-decode-accent {
  will-change: transform;
}

/* ── Section 3: Parallax ── */
.pg15-parallax-card {
  will-change: transform, opacity;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
}
.pg15-parallax-card:hover {
  border-color: rgba(255, 153, 0, 0.25);
  box-shadow: 0 24px 64px rgba(255, 153, 0, 0.06);
}
.pg15-parallax-bg-num {
  will-change: transform;
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
