<template>
  <div class="playground-page min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-7xl">

      <!-- Header -->
      <div class="mb-12 border-b border-gray-800 pb-6">
        <h1 class="text-4xl md:text-6xl font-[100] tracking-tighter">
          UI <span class="font-bold">PLAYGROUND</span>
        </h1>
        <p class="text-gray-400 mt-4 text-lg font-light">Test and preview new sections before assembling them on main pages.</p>
      </div>

      <div class="playground-content space-y-24">

        <!-- ============================================================
             SECTION 1 — FEATURES
             Animation: Clip-path left-wipe reveal on scroll entry
                        + Magnetic hover displacement per card
        ============================================================ -->
        <section class="features-clip-section py-20 md:py-28 bg-[#0a0a0a] rounded-3xl border border-gray-800 overflow-hidden px-8 md:px-16 relative">

          <!-- Label + heading -->
          <div class="mb-16">
            <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-5">What We Do</span>
            <h2 class="text-4xl md:text-6xl lg:text-7xl font-[100] leading-[0.9] tracking-tighter text-white uppercase">
              <div class="overflow-hidden pb-2"><span class="feat-title-line inline-block">Core</span></div>
              <div class="overflow-hidden pb-2"><span class="feat-title-line inline-block font-bold">Features</span></div>
            </h2>
          </div>

          <!-- 4-col card grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div
              v-for="(feature, i) in features"
              :key="i"
              class="feat-card-wrap"
            >
              <div class="feat-card bg-[#111] border border-gray-800 rounded-2xl p-8 h-full flex flex-col gap-4">
                <div class="text-[#FF9900] text-3xl leading-none select-none">{{ feature.icon }}</div>
                <h3 class="text-xl font-bold text-white">{{ feature.title }}</h3>
                <p class="text-gray-400 font-light text-sm leading-relaxed flex-1">{{ feature.desc }}</p>
                <div class="w-8 h-[2px] bg-[#FF9900] rounded-full mt-auto"></div>
              </div>
            </div>
          </div>
        </section>


        <!-- ============================================================
             SECTION 2 — STATS / ABOUT
             Animation: Overflow-hidden title wipe + animated number
                        counters + scroll-scrubbed bar fills
        ============================================================ -->
        <section class="stats-section py-20 md:py-28 relative overflow-hidden">

          <!-- Decorative background number -->
          <div class="pointer-events-none select-none absolute -top-10 -right-10 text-[clamp(12rem,30vw,22rem)] font-black text-white/[0.018] tracking-tighter leading-none overflow-hidden">
            99
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <!-- Left: Text block -->
            <div>
              <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-6">By The Numbers</span>
              <h2 class="text-4xl md:text-5xl lg:text-[3.5rem] font-[100] leading-[1.1] tracking-tighter mb-8">
                <div class="overflow-hidden pb-1"><span class="stats-title-line inline-block">Results that</span></div>
                <div class="overflow-hidden pb-1"><span class="stats-title-line inline-block font-bold">speak for</span></div>
                <div class="overflow-hidden pb-1"><span class="stats-title-line inline-block">themselves.</span></div>
              </h2>
              <p class="stats-desc opacity-0 text-gray-400 text-lg font-light leading-relaxed max-w-md">
                We measure success not just in deliverables, but in the tangible impact we create for every client we partner with.
              </p>
            </div>

            <!-- Right: Stats grid -->
            <div class="grid grid-cols-2 gap-x-10 gap-y-10">
              <div
                v-for="(stat, i) in stats"
                :key="i"
                class="stat-item opacity-0"
              >
                <div class="flex items-baseline gap-[2px] mb-1">
                  <span class="counter-number text-4xl md:text-5xl font-black text-white tabular-nums" :data-target="stat.value">0</span>
                  <span class="text-2xl md:text-3xl font-black text-[#FF9900]">{{ stat.suffix }}</span>
                </div>
                <div class="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-3">{{ stat.label }}</div>
                <div class="h-[2px] bg-gray-800 rounded-full overflow-hidden">
                  <div
                    class="stat-bar h-full bg-gradient-to-r from-[#FF9900] to-[#FF9900]/30 rounded-full"
                    style="transform: scaleX(0); transform-origin: left center;"
                    :data-scale="stat.barScale"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- ============================================================
             SECTION 3 — SERVICES
             Animation: Alternating left/right slide-in per row on scroll
                        + GSAP height-accordion expand/collapse on hover
        ============================================================ -->
        <section class="services-accordion-section py-20 md:py-28 bg-[#0a0a0a] rounded-3xl border border-gray-800 overflow-hidden px-8 md:px-16">

          <!-- Header row -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span class="block text-[11px] font-bold tracking-[0.45em] text-[#FF9900] uppercase mb-4">How We Help</span>
              <h2 class="text-4xl md:text-6xl font-[100] leading-none tracking-tighter uppercase">
                Our <span class="font-bold">Services</span>
              </h2>
            </div>
            <p class="hidden md:block text-gray-400 font-light max-w-xs text-right text-sm leading-relaxed">
              Hover any row to explore what we offer.
            </p>
          </div>

          <!-- Accordion rows -->
          <div class="divide-y divide-gray-800">
            <div
              v-for="(service, i) in services"
              :key="i"
              class="service-row group"
              @mouseenter="expandRow($event)"
              @mouseleave="collapseRow($event)"
            >
              <!-- Always-visible header -->
              <div class="flex items-center justify-between py-6 md:py-8 cursor-default">
                <div class="flex items-center gap-5 md:gap-8 min-w-0">
                  <span class="text-[11px] text-[#FF9900] font-bold tracking-[0.3em] shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>
                  <h3 class="service-row-title text-xl md:text-3xl lg:text-4xl font-[100] text-white truncate transition-colors duration-300 group-hover:text-[#FF9900]">
                    {{ service.title }}
                  </h3>
                </div>
                <!-- Arrow icon -->
                <div class="service-arrow w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center text-gray-600 shrink-0 ml-4 transition-all duration-300 group-hover:border-[#FF9900] group-hover:text-[#FF9900]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <!-- Expandable body -->
              <div class="service-row-body overflow-hidden" style="height: 0; opacity: 0;">
                <div class="service-row-inner pb-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <p class="text-gray-400 font-light leading-relaxed text-sm md:text-base md:col-span-2">
                    {{ service.desc }}
                  </p>
                  <ul class="flex flex-wrap md:flex-col gap-2 md:gap-2">
                    <li
                      v-for="tag in service.tags"
                      :key="tag"
                      class="text-[10px] tracking-[0.25em] uppercase text-gray-500 flex items-center gap-2"
                    >
                      <span class="w-1 h-1 rounded-full bg-[#FF9900] shrink-0"></span>{{ tag }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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

const features = [
  {
    icon: '◈',
    title: 'Web Development',
    desc: 'Custom-built websites and web apps crafted with modern frameworks for performance, scale, and aesthetic excellence.',
  },
  {
    icon: '◎',
    title: 'Brand Strategy',
    desc: 'Strategic brand identities that position your business clearly and create lasting impressions in competitive markets.',
  },
  {
    icon: '◑',
    title: 'SEO & Growth',
    desc: 'Data-driven search optimization that puts your brand in front of the right audience at exactly the right moment.',
  },
  {
    icon: '◐',
    title: 'Digital Marketing',
    desc: 'Full-funnel digital campaigns that convert attention into action across every channel that matters to your audience.',
  },
];

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered', barScale: 0.82 },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', barScale: 0.98 },
  { value: 12,  suffix: 'y', label: 'Years of Experience', barScale: 0.60 },
  { value: 50,  suffix: '+', label: 'Active Clients',      barScale: 0.50 },
];

const services = [
  {
    title: 'Web Design & Development',
    desc: 'We design and build websites that are fast, accessible, and visually compelling — from landing pages to complex web applications. Every project is crafted with conversion and user experience at the forefront.',
    tags: ['Custom Design', 'Nuxt / Next.js', 'WordPress', 'E-commerce'],
  },
  {
    title: 'Search Engine Optimisation',
    desc: 'Technical and content-driven SEO strategies that improve visibility and drive qualified organic traffic. We focus on long-term results through structured data, performance optimisation, and authority building.',
    tags: ['Technical SEO', 'Content Strategy', 'Link Building', 'Analytics'],
  },
  {
    title: 'Brand Identity & Design',
    desc: 'We craft brand identities from the ground up — logo, typography, colour systems, and guidelines that ensure your visual presence is cohesive, memorable, and distinctly yours.',
    tags: ['Logo Design', 'Style Guides', 'Print & Digital', 'Rebranding'],
  },
  {
    title: 'Digital Marketing & Ads',
    desc: 'Paid media management across Google, Meta, and LinkedIn. We plan, execute, and optimise campaigns that maximise ROI while keeping brand messaging consistent across every touchpoint.',
    tags: ['Google Ads', 'Meta Ads', 'Retargeting', 'Reporting'],
  },
  {
    title: 'Performance & Analytics',
    desc: 'We audit and optimise your digital stack for speed, Core Web Vitals, and conversion rate — then set up the tracking infrastructure you need to make smarter decisions, faster.',
    tags: ['Core Web Vitals', 'GTM Setup', 'Heatmaps', 'A/B Testing'],
  },
];


/* ------------------------------------------------------------------ */
/*  Section 3 — Accordion hover helpers                                */
/* ------------------------------------------------------------------ */

function expandRow(e) {
  const gsap = window.gsap;
  if (!gsap) return;
  const body  = e.currentTarget.querySelector('.service-row-body');
  const inner = body.querySelector('.service-row-inner');
  gsap.to(body, {
    height:   inner.offsetHeight,
    opacity:  1,
    duration: 0.55,
    ease:     'power3.out',
  });
}

function collapseRow(e) {
  const gsap = window.gsap;
  if (!gsap) return;
  const body = e.currentTarget.querySelector('.service-row-body');
  gsap.to(body, {
    height:   0,
    opacity:  0,
    duration: 0.4,
    ease:     'power3.inOut',
  });
}


/* ------------------------------------------------------------------ */
/*  Scroll animations (all 3 sections)                                 */
/* ------------------------------------------------------------------ */

let ctx = null;

onMounted(() => {
  if (typeof window === 'undefined') return;

  setTimeout(() => {
    const gsap          = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    ctx = gsap.context(() => {

      /* ── Section 1: Feature cards ── */

      // Heading lines slide up out of overflow:hidden parent
      gsap.fromTo(
        '.feat-title-line',
        { y: '110%' },
        {
          y:        '0%',
          duration: 1.2,
          stagger:  0.18,
          ease:     'power4.out',
          scrollTrigger: {
            trigger:       '.features-clip-section',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards wipe in from the right via clip-path
      gsap.fromTo(
        '.feat-card-wrap',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath:  'inset(0 0% 0 0)',
          opacity:   1,
          duration:  0.9,
          stagger:   0.14,
          ease:      'power3.inOut',
          scrollTrigger: {
            trigger:       '.features-clip-section',
            start:         'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Magnetic hover: card drifts toward cursor, snaps back elastically
      document.querySelectorAll('.feat-card-wrap').forEach(wrap => {
        const card = wrap.querySelector('.feat-card');
        wrap.addEventListener('mousemove', e => {
          const r  = wrap.getBoundingClientRect();
          const dx = (e.clientX - r.left  - r.width  / 2) / 7;
          const dy = (e.clientY - r.top   - r.height / 2) / 7;
          gsap.to(card, { x: dx, y: dy, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        });
        wrap.addEventListener('mouseleave', () => {
          gsap.to(card, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' });
        });
      });


      /* ── Section 2: Stats / counters ── */

      // Title lines
      gsap.fromTo(
        '.stats-title-line',
        { y: '110%' },
        {
          y:        '0%',
          duration: 1.2,
          stagger:  0.12,
          ease:     'power4.out',
          scrollTrigger: {
            trigger:       '.stats-section',
            start:         'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description fade in
      gsap.to('.stats-desc', {
        opacity:  1,
        y:        0,
        duration: 1,
        ease:     'power3.out',
        scrollTrigger: {
          trigger:       '.stats-section',
          start:         'top 72%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stat items stagger up
      gsap.fromTo(
        '.stat-item',
        { y: 40 },
        {
          y:        0,
          opacity:  1,
          duration: 1,
          stagger:  0.14,
          ease:     'power3.out',
          scrollTrigger: {
            trigger:       '.stats-section',
            start:         'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animated number counters
      document.querySelectorAll('.counter-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const obj    = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start:   'top 85%',
          once:    true,
          onEnter: () => {
            gsap.to(obj, {
              val:      target,
              duration: 2,
              ease:     'power2.out',
              onUpdate() {
                el.textContent = Math.round(obj.val);
              },
            });
          },
        });
      });

      // Progress bar fills (scaleX)
      document.querySelectorAll('.stat-bar').forEach(bar => {
        const scale = parseFloat(bar.dataset.scale);
        ScrollTrigger.create({
          trigger: bar,
          start:   'top 88%',
          once:    true,
          onEnter: () => {
            gsap.to(bar, {
              scaleX:   scale,
              duration: 1.6,
              ease:     'power3.out',
              delay:    0.25,
            });
          },
        });
      });


      /* ── Section 3: Service rows ── */

      // Alternating left / right slide-in per row
      gsap.utils.toArray('.service-row').forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: i % 2 === 0 ? -70 : 70, opacity: 0 },
          {
            x:        0,
            opacity:  1,
            duration: 0.9,
            ease:     'power3.out',
            scrollTrigger: {
              trigger:       row,
              start:         'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
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
.playground-page {
  font-family: 'Outfit', sans-serif;
}

/* ── Section 1 ── */
.feat-card-wrap {
  will-change: clip-path, opacity, transform;
}
.feat-card {
  will-change: transform;
  transition: box-shadow 0.35s ease, border-color 0.35s ease;
}
.feat-card:hover {
  box-shadow: 0 24px 64px rgba(255, 153, 0, 0.08);
  border-color: rgba(255, 153, 0, 0.25);
}

/* ── Section 2 ── */
.stats-desc {
  transform: translateY(20px);
}
.stat-item {
  will-change: transform, opacity;
}
.stat-bar {
  will-change: transform;
}
.counter-number {
  font-variant-numeric: tabular-nums;
}

/* ── Section 3 ── */
.service-row {
  will-change: transform, opacity;
}
.service-row-body {
  will-change: height, opacity;
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
