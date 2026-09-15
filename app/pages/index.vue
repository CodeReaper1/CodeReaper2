<template>
  <main ref="mainRef">
    <!-- banner -->
    <section class="mil-banner mil-dark-bg" data-nav-theme="dark">
        <div class="mi-invert-fix">
            <div class="mil-animation-frame">
                <div class="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6"></div>
                <div class="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1"></div>
                <div class="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1"></div>
            </div>

            <div class="mil-gradient"></div>

            <div class="container h-full flex flex-col justify-center items-center relative z-20 pt-20">
                <div class="mil-banner-content text-center w-full max-w-5xl mx-auto">
                    <div class="mb-6 overflow-hidden">
                        <span class="inline-block text-[#FFA500] tracking-[0.4em] uppercase text-sm md:text-base font-bold hero-subtitle">
                           {{ siteSettings?.homepageHeroSubtitle || $t('home.banner.title_main') }}
                        </span>
                    </div>

                    <h1 class="hp-hero-title text-5xl md:text-[7rem] lg:text-[9rem] font-[100] text-white leading-[0.9] tracking-tighter mb-10 mx-auto" style="color: white !important;">
                        <span class="split-line block">{{ siteSettings?.homepageHeroTitle1 || $t('home.banner.title_sub1') }}</span>
                        <span class="split-line block font-bold">{{ siteSettings?.homepageHeroTitle2 || $t('home.banner.title_sub2') }}</span>
                    </h1>
                    
                    <div class="hero-bottom-elements flex flex-col items-center gap-8 mt-12">
                        <p class="text-gray-400 text-lg md:text-2xl max-w-2xl font-light mx-auto">
                            {{ siteSettings?.homepageHeroDesc || $t('home.banner.desc') }}
                        </p>

                        <div class="flex flex-col sm:flex-row items-center gap-6 mt-4">
                            <NuxtLink :to="localePath('/services')" class="mil-button mil-arrow-place px-10 py-5 text-lg">
                                <span>{{ siteSettings?.homepageHeroBtn1 || $t('home.banner.btn_services') }}</span>
                            </NuxtLink>

                            <NuxtLink :to="localePath('/portfolio')" class="mil-link mil-muted mil-arrow-place text-lg group">
                                <span class="group-hover:text-white transition-colors">{{ siteSettings?.homepageHeroBtn2 || $t('home.banner.btn_portfolio') }}</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- banner end -->

    <!-- 2. Philosophy -->
    <section class="philo" id="philo" data-nav-theme="light">
        <div class="philo-head">
            <span>{{ philoLabel1 }}</span>
            <span>{{ philoLabel2 }}</span>
        </div>
        <p class="philo-txt"><template
            v-for="(w, i) in philoWords"
            :key="'pw' + i"
        ><em
            v-if="w.accent"
            class="pw accent"
        >{{ w.text }}</em><span
            v-else
            class="pw"
        >{{ w.text }}</span>{{ ' ' }}</template></p>
    </section>

    <HomePortfolioScanner :projects="showcaseProjects" />

    <!-- 3. Deep Parallax About -->
    <section class="deep-parallax-section relative h-[100vh] md:h-[130vh] bg-background-dark overflow-hidden flex items-center justify-center border-y border-gray-900 z-0" data-nav-theme="dark">
        <!-- Background Layer (Slower Reverse) -->
        <div class="parallax-layer absolute inset-0 opacity-10 flex flex-col justify-between p-10 pointer-events-none z-0" data-speed="0.2">
            <div class="text-[12rem] md:text-[20rem] font-black text-white tracking-tighter leading-none text-left w-full mix-blend-overlay">A.</div>
            <div class="text-[12rem] md:text-[20rem] font-black text-white tracking-tighter leading-none text-right w-full mix-blend-overlay">D.</div>
        </div>
        
        <!-- Mid Layer (Medium Fast) -->
        <div class="parallax-layer absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none" data-speed="-0.5">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1080&auto=format&fit=crop" class="w-[250px] md:w-[500px] h-[350px] md:h-[700px] object-cover rounded-[50px] md:rounded-[100px] mix-blend-luminosity opacity-30 md:opacity-20 absolute left-[5%] md:left-[10%] top-[10%] md:top-[20%] shadow-2xl" alt="Deco element" />
        </div>
        
        <!-- Foreground Text Layer (Normal Flow) -->
        <div class="parallax-layer relative z-20 container mx-auto px-6 text-center" data-speed="0">
             <h2 class="text-sm font-bold tracking-[0.3em] text-primary mb-8 uppercase">{{ siteSettings?.homepageStrategySubtitle || $t('home_new.strategy.subtitle') }}</h2>
             <div class="text-4xl md:text-6xl lg:text-7xl font-[100] text-white leading-tight max-w-5xl mx-auto drop-shadow-2xl" v-html="siteSettings?.homepageStrategyTitle || $t('home_new.strategy.title')"></div>
             
             <!-- Using existing stats keys to make the layer richer -->
             <div class="grid grid-cols-2 gap-8 md:gap-16 mt-20 md:mt-32 max-w-3xl mx-auto pointer-events-auto">
                 <div>
                    <div class="stat-counter text-5xl md:text-7xl font-black text-primary mb-2" :data-target="siteSettings?.homepageStat1Num || '200'" data-suffix="+">0+</div>
                    <div class="text-xs md:text-sm tracking-widest text-gray-400 uppercase">{{ siteSettings?.homepageStat1Label || $t('home_new.stats.s1_label') }}</div>
                 </div>
                 <div>
                    <div class="stat-counter text-5xl md:text-7xl font-black text-primary mb-2" :data-target="siteSettings?.homepageStat2Num || '98'" data-suffix="%">0%</div>
                    <div class="text-xs md:text-sm tracking-widest text-gray-400 uppercase">{{ siteSettings?.homepageStat2Label || $t('home_new.stats.s3_label') }}</div>
                 </div>
             </div>
        </div>
    </section>

    <!-- 4. The Process Flow -->
    <section class="process-flow-section py-24 md:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden relative" data-nav-theme="light">
        <div class="container mx-auto px-6 md:px-20 relative">
            <div class="flex flex-col md:flex-row gap-12 md:gap-24 relative">
                <!-- Left: Progress Line Container -->
                <div class="hidden md:block w-1 relative h-[calc(100% - 100px)] top-[50px]">
                    <div class="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                    <div class="process-progress-line absolute top-0 left-0 w-full bg-primary rounded-full origin-top scale-y-0 h-full shadow-[0_0_20px_rgba(255,153,0,0.5)]"></div>
                    <div class="process-progress-dot absolute left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_25px_8px_rgba(255,153,0,0.6)]" style="top: 0%;"></div>
                </div>
                
                <!-- Right: Steps -->
                <div class="flex-1 space-y-24 md:space-y-48 my-12">
                    <div v-for="(step, index) in (siteSettings?.homepageProcessSteps?.length ? siteSettings.homepageProcessSteps : $tm('home_new.strategy.steps'))" :key="index" class="process-step relative">
                        <!-- Mobile marker -->
                        <div class="md:hidden w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-6 text-xl">
                            {{ index + 1 }}
                        </div>
                        <h3 class="process-step-title text-4xl md:text-7xl font-[100] mb-8 text-gray-900 dark:text-white transition-all duration-700 ease-out">
                            {{ typeof step.title === 'string' ? step.title : $rt(step.title) }}
                        </h3>
                        <p class="process-step-desc text-xl md:text-3xl text-gray-500 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
                            {{ typeof step.desc === 'string' ? step.desc : $rt(step.desc) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Tech Stack & Tools -->
    <section class="stack-section py-24 md:py-40 bg-white dark:bg-[#0a0a0a] overflow-hidden relative" data-nav-theme="light">
        <!-- Floating background category strip -->
        <div class="stack-marquee absolute inset-x-0 top-16 md:top-24 pointer-events-none select-none opacity-[0.04] dark:opacity-[0.07] whitespace-nowrap text-[8rem] md:text-[14rem] font-black tracking-tighter uppercase text-gray-900 dark:text-white leading-none">
            <span class="inline-block pr-20">{{ stackTitle }}</span>
            <span class="inline-block pr-20">{{ stackTitle }}</span>
            <span class="inline-block pr-20">{{ stackTitle }}</span>
        </div>

        <div class="container mx-auto px-6 md:px-20 relative z-10">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
                <div class="max-w-2xl">
                    <h2 class="stack-subtitle text-sm font-bold tracking-[0.4em] text-primary mb-6 uppercase">{{ stackSubtitle }}</h2>
                    <h3 class="stack-title text-5xl md:text-[6rem] font-[100] text-gray-900 dark:text-white leading-[1.05] tracking-tighter">
                        <span class="split-line inline-block">{{ stackTitle }}</span>
                    </h3>
                </div>
                <p class="stack-desc text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light max-w-md leading-relaxed">{{ stackDesc }}</p>
            </div>

            <div class="stack-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                <div
                    v-for="(item, idx) in stackItems"
                    :key="item.name + idx"
                    class="stack-card group relative aspect-square rounded-[28px] bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-900 p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                    <div class="stack-card-glow absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,153,0,0.35)_0%,transparent_60%)] opacity-0"></div>
                    <div class="relative z-10 flex items-start justify-between">
                        <div class="stack-logo w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-900 flex items-center justify-center overflow-hidden shadow-sm">
                            <img
                                v-if="item.logo?.sourceUrl"
                                :src="item.logo.sourceUrl"
                                :alt="item.logo.altText || item.name"
                                class="w-full h-full object-contain p-2"
                            />
                            <span v-else class="text-xl font-black text-gray-900 dark:text-white">{{ item.name.charAt(0) }}</span>
                        </div>
                        <span class="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600">{{ String(idx + 1).padStart(2, '0') }}</span>
                    </div>
                    <div class="relative z-10">
                        <div class="text-[10px] font-bold tracking-[0.25em] uppercase text-primary mb-2">{{ item.category }}</div>
                        <div class="stack-card-name text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. FAQ -->
    <section class="faq-section" data-nav-theme="light">
        <div class="faq-shell">
            <div class="faq-copy">
                <h2 class="faq-subtitle">{{ faqSubtitle }}</h2>
                <h3 class="faq-title">
                    <span class="split-line inline-block">{{ faqTitle }}</span>
                </h3>
                <p class="faq-desc">{{ faqDesc }}</p>
            </div>

            <div class="faq-divider" aria-hidden="true">
                <span></span>
            </div>

            <div class="faq-list" aria-label="Frequently asked questions">
                <div
                    v-for="(item, idx) in faqItems"
                    :key="idx"
                    class="faq-item"
                    :class="{ 'faq-item-open': openFaq === idx }"
                >
                    <button
                        type="button"
                        class="faq-trigger"
                        :aria-expanded="openFaq === idx"
                        @click="toggleFaq(idx)"
                    >
                        <span class="faq-question">{{ item.question }}</span>
                        <span class="faq-icon" :class="{ 'faq-icon-open': openFaq === idx }">
                            <span class="faq-icon-bar"></span>
                            <span class="faq-icon-bar faq-icon-bar-v" :class="{ 'rotate-90': openFaq !== idx, 'rotate-0': openFaq === idx }"></span>
                        </span>
                    </button>
                    <div class="faq-answer-wrap" :style="{ height: '0px' }">
                        <div class="faq-answer-inner">
                            <p class="faq-answer">{{ item.answer }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. CTA — Orbital "Specialists" panel -->
    <section class="cta-section relative bg-[#050505] overflow-hidden px-4 md:px-8 py-12 md:py-20" data-nav-theme="dark">
        <div class="cta-card relative mx-auto max-w-[1400px] rounded-[32px] md:rounded-[48px] overflow-hidden">
            <!-- Gradient backdrop (animated) -->
            <div class="cta-bg absolute inset-0">
                <div class="cta-bg-base absolute inset-0 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#000]"></div>
                <div class="cta-bg-glow absolute -top-1/3 -left-1/4 w-[80%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,153,0,0.4)_0%,transparent_60%)] blur-3xl"></div>
                <div class="cta-bg-glow-2 absolute -bottom-1/3 -right-1/4 w-[80%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,100,0,0.3)_0%,transparent_60%)] blur-3xl"></div>
                <div class="cta-bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>');"></div>
            </div>

            <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 p-8 md:p-14 lg:p-20 min-h-[600px] md:min-h-[680px]">
                <!-- Left: copy -->
                <div class="flex flex-col justify-between">
                    <div>
                        <div class="cta-subtitle inline-flex items-center gap-3 mb-8">
                            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span class="text-[11px] md:text-xs font-bold tracking-[0.35em] uppercase text-white/70">{{ ctaSubtitle }}</span>
                        </div>

                        <h2 class="cta-title text-4xl md:text-6xl lg:text-[5.2rem] font-bold text-white leading-[1.02] tracking-tight mb-8">
                            <span v-for="(word, i) in ctaTitleWords" :key="i" class="cta-title-word inline-block overflow-hidden align-bottom pr-[0.25em]">
                                <span class="inline-block">{{ word }}</span>
                            </span>
                        </h2>

                        <p class="cta-desc text-base md:text-lg text-white/70 font-light leading-relaxed max-w-md mb-12">{{ ctaDesc }}</p>
                    </div>

                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <NuxtLink :to="localePath(ctaLink)" class="cta-btn group relative inline-flex items-center gap-3 pl-8 pr-4 py-3 md:py-4 rounded-full bg-[#111] border border-white/20 text-white font-bold text-sm md:text-base tracking-wider overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-primary/50 transition-colors duration-300">
                            <span class="cta-btn-glow absolute inset-0 bg-gradient-to-r from-primary via-[#FFB870] to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></span>
                            <span class="relative z-10">{{ ctaBtn }}</span>
                            <span class="cta-btn-arrow relative z-10 shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-black flex items-center justify-center text-2xl md:text-3xl leading-none transition-transform duration-300 group-hover:scale-110">→</span>
                        </NuxtLink>
                    </div>
                </div>

                <!-- Right: orbital stage -->
                <div class="cta-orbit-stage relative h-[420px] sm:h-[480px] md:h-[560px] lg:h-full min-h-[460px] flex items-center justify-center">
                    <!-- Rings (static visual) -->
                    <div class="cta-ring cta-ring-1 absolute rounded-full border border-white/15"></div>
                    <div class="cta-ring cta-ring-2 absolute rounded-full border border-white/10"></div>
                    <div class="cta-ring cta-ring-3 absolute rounded-full border border-white/[0.07]"></div>

                    <!-- Center chip -->
                    <div class="cta-center absolute z-20 text-center">
                        <div class="cta-stat-num text-5xl md:text-7xl font-black text-white tracking-tight leading-none" data-target="20000" data-suffix="+">0+</div>
                        <div class="cta-stat-label text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/70 mt-2">{{ ctaStatLabel }}</div>
                    </div>

                    <!-- Orbit 1 (inner, clockwise) -->
                    <div class="cta-orbit cta-orbit-1 absolute inset-0 z-10">
                        <div
                            v-for="(o, i) in orbitGroup1"
                            :key="'o1-' + i"
                            class="cta-orbit-slot absolute left-1/2 top-1/2"
                            :style="{ '--angle': (i * (360 / orbitGroup1.length)) + 'deg' }"
                        >
                            <div class="cta-orbit-counter">
                                <div
                                    class="cta-orbit-chip relative flex items-center justify-center overflow-hidden"
                                    :class="o.type === 'avatar' ? 'cta-orbit-avatar' : 'cta-orbit-icon'"
                                >
                                    <img
                                        v-if="o.img"
                                        :src="o.img"
                                        :alt="o.label"
                                        class="w-full h-full"
                                        :class="o.type === 'avatar' ? 'object-cover' : 'object-contain p-3 md:p-4'"
                                    />
                                    <span v-else class="text-xl md:text-2xl">{{ o.emoji }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Orbit 2 (middle, counter-clockwise) -->
                    <div class="cta-orbit cta-orbit-2 absolute inset-0 z-10">
                        <div
                            v-for="(o, i) in orbitGroup2"
                            :key="'o2-' + i"
                            class="cta-orbit-slot absolute left-1/2 top-1/2"
                            :style="{ '--angle': (i * (360 / orbitGroup2.length) + 30) + 'deg' }"
                        >
                            <div class="cta-orbit-counter">
                                <div
                                    class="cta-orbit-chip relative flex items-center justify-center overflow-hidden"
                                    :class="o.type === 'avatar' ? 'cta-orbit-avatar' : 'cta-orbit-icon'"
                                >
                                    <img
                                        v-if="o.img"
                                        :src="o.img"
                                        :alt="o.label"
                                        class="w-full h-full"
                                        :class="o.type === 'avatar' ? 'object-cover' : 'object-contain p-3 md:p-4'"
                                    />
                                    <span v-else class="text-xl md:text-2xl">{{ o.emoji }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Orbit 3 (outer, clockwise slow) -->
                    <div class="cta-orbit cta-orbit-3 absolute inset-0 z-10">
                        <div
                            v-for="(o, i) in orbitGroup3"
                            :key="'o3-' + i"
                            class="cta-orbit-slot absolute left-1/2 top-1/2"
                            :style="{ '--angle': (i * (360 / orbitGroup3.length) + 15) + 'deg' }"
                        >
                            <div class="cta-orbit-counter">
                                <div
                                    class="cta-orbit-chip relative flex items-center justify-center overflow-hidden"
                                    :class="o.type === 'avatar' ? 'cta-orbit-avatar' : 'cta-orbit-icon'"
                                >
                                    <img
                                        v-if="o.img"
                                        :src="o.img"
                                        :alt="o.label"
                                        class="w-full h-full"
                                        :class="o.type === 'avatar' ? 'object-cover' : 'object-contain p-3 md:p-4'"
                                    />
                                    <span v-else class="text-xl md:text-2xl">{{ o.emoji }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, nextTick } from 'vue';
import { useHead, useLocalePath, useI18n } from '#imports';

const localePath = useLocalePath();
const mainRef = ref(null);
const { t, tm, rt } = useI18n();

const { settings: siteSettings } = useSiteSettings();
const { projects: wpProjects } = usePortfolio(3);

const fallbackProjects = [
  { id: 'fb-1', title: 'Nexus Analytics', client: 'NEXUS TECH', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop', link: '/portfolio', imageAlt: 'Nexus Analytics' },
  { id: 'fb-2', title: 'Vibe Social', client: 'VIBE INC', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', link: '/portfolio', imageAlt: 'Vibe Social' },
  { id: 'fb-3', title: 'Apex Dashboard', client: 'APEX', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop', link: '/portfolio', imageAlt: 'Apex Dashboard' },
];

const showcaseProjects = computed(() =>
  wpProjects.value?.length ? wpProjects.value.slice(0, 3) : fallbackProjects
);

// ── Philosophy section ───────────────────────────────────────────────────
const philoLabel1 = computed(() => t('home_new.philosophy.label_1'));
const philoLabel2 = computed(() => t('home_new.philosophy.label_2'));

// The accent phrase lights up as one unit, so it is never split into words.
const splitWords = (s) =>
  String(s).trim().split(/\s+/).filter(Boolean).map((text) => ({ text, accent: false }));

const philoWords = computed(() => [
  ...splitWords(t('home_new.philosophy.lead')),
  { text: t('home_new.philosophy.accent'), accent: true },
  ...splitWords(t('home_new.philosophy.rest')),
]);

// ── Stack section ────────────────────────────────────────────────────────
const stackSubtitle = computed(() => siteSettings.value?.homepageStackSubtitle || t('home_new.stack.subtitle'));
const stackTitle = computed(() => siteSettings.value?.homepageStackTitle || t('home_new.stack.title'));
const stackDesc = computed(() => t('home_new.stack.desc'));
const stackItems = computed(() => {
  const fromCms = siteSettings.value?.homepageStackItems;
  if (Array.isArray(fromCms) && fromCms.length) return fromCms;
  const fromI18n = tm('home_new.stack.items');
  if (Array.isArray(fromI18n) && fromI18n.length) {
    return fromI18n.map((i) => ({ name: rt(i.name), category: rt(i.category), logo: null }));
  }
  return [];
});

// ── FAQ section ──────────────────────────────────────────────────────────
const faqSubtitle = computed(() => siteSettings.value?.homepageFaqSubtitle || t('home_new.faq.subtitle'));
const faqTitle = computed(() => siteSettings.value?.homepageFaqTitle || t('home_new.faq.title'));
const faqDesc = computed(() => t('home_new.faq.desc'));
const faqItems = computed(() => {
  const fromCms = siteSettings.value?.homepageFaqItems;
  if (Array.isArray(fromCms) && fromCms.length) return fromCms;
  const fromI18n = tm('home_new.faq.items');
  if (Array.isArray(fromI18n) && fromI18n.length) {
    return fromI18n.map((i) => ({ question: rt(i.question), answer: rt(i.answer) }));
  }
  return [];
});
const openFaq = ref(0);
function toggleFaq(idx) {
  openFaq.value = openFaq.value === idx ? -1 : idx;
  nextTick(() => animateFaqHeights());
}

// ── CTA section ──────────────────────────────────────────────────────────
const ctaSubtitle = computed(() => siteSettings.value?.homepageCtaSubtitle || t('home_new.cta.subtitle'));
const ctaTitle = computed(() => siteSettings.value?.homepageCtaTitle || t('home_new.cta.title'));
const ctaDesc = computed(() => siteSettings.value?.homepageCtaDesc || t('home_new.cta.desc'));
const ctaBtn = computed(() => siteSettings.value?.homepageCtaBtn || t('home_new.cta.btn_talk'));
const ctaLink = computed(() => siteSettings.value?.homepageCtaLink || '/contact');
const ctaStatLabel = computed(() => t('home_new.cta.stat_label'));
const ctaTitleWords = computed(() => String(ctaTitle.value).split(/\s+/).filter(Boolean));

// Orbit items — avatar-style for a "specialists" feel (mix avatars + social icons)
const orbitGroup1 = [
  { type: 'avatar', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80', label: 'Strategy' },
  { type: 'icon', img: '/img/social/tiktok.svg', label: 'TikTok' },
  { type: 'avatar', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80', label: 'Engineering' },
];
const orbitGroup2 = [
  { type: 'icon', img: '/img/social/instagram.svg', label: 'Instagram' },
  { type: 'avatar', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80', label: 'Art Direction' },
  { type: 'icon', img: '/img/social/facebook.svg', label: 'Facebook' },
  { type: 'avatar', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80', label: 'Product' },
];
const orbitGroup3 = [
  { type: 'avatar', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&q=80', label: 'Research' },
  { type: 'icon', img: '/img/social/tiktok.svg', label: 'TikTok' },
  { type: 'avatar', img: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=200&h=200&fit=crop&q=80', label: 'Ops' },
  { type: 'icon', img: '/img/social/instagram.svg', label: 'Instagram' },
  { type: 'avatar', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&q=80', label: 'Growth' },
];

useHead({
  link: [
    { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;500;700&display=swap', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,500;0,600;0,700;1,700&display=swap', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap', rel: 'stylesheet' }
  ]
});

// Shared GSAP reference for accordion updates
let gsapRef = null;
function animateFaqHeights() {
  if (!gsapRef || !mainRef.value) return;
  const items = mainRef.value.querySelectorAll('.faq-item');
  items.forEach((item, idx) => {
    const wrap = item.querySelector('.faq-answer-wrap');
    const barV = item.querySelector('.faq-icon-bar-v');
    const icon = item.querySelector('.faq-icon');
    if (!wrap) return;
    const isOpen = idx === openFaq.value;
    gsapRef.to(wrap, {
      height: isOpen ? wrap.firstElementChild.offsetHeight : 0,
      duration: 0.55,
      ease: 'expo.inOut',
    });
    if (barV) gsapRef.to(barV, { rotation: isOpen ? 0 : 90, duration: 0.5, ease: 'expo.inOut' });
    if (icon) gsapRef.to(icon, { backgroundColor: isOpen ? '#FF9900' : '', duration: 0.4, ease: 'power2.out' });
  });
}

let ctx;
let pollInterval;
let matchMediaCtl = null;

onMounted(() => {
  /** Theme main.js only runs initAppend once (isInitialized). Re-clone .mil-dodecahedron into hero on each home visit. */
  nextTick(() => {
    if (typeof window !== 'undefined' && typeof window.reinitAppend === 'function') {
      window.reinitAppend();
    }
  });

  pollInterval = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(pollInterval);
      pollInterval = null;
      initAnimations(window.gsap, window.ScrollTrigger);
    }
  }, 50);
});

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
  matchMediaCtl?.revert();
  matchMediaCtl = null;
  ctx?.revert();
});

// ── Helpers ──────────────────────────────────────────────────────────────
// Attach a magnetic hover to an element; returns cleanup fn
function makeMagnetic(gsap, el, pull = 0.2, dur = 0.5) {
  const qx = gsap.quickTo(el, 'x', { duration: dur, ease: 'power3.out' });
  const qy = gsap.quickTo(el, 'y', { duration: dur, ease: 'power3.out' });
  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    qx((e.clientX - (r.left + r.width / 2)) * pull);
    qy((e.clientY - (r.top + r.height / 2)) * pull);
  };
  const onLeave = () => { qx(0); qy(0); };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
}

function initAnimations(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out', duration: 0.9 });
  gsapRef = gsap;

  nextTick(() => {
    if (!mainRef.value) return;
    const root = mainRef.value;

    const mm = gsap.matchMedia();
    matchMediaCtl = mm;

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        const dur = reduceMotion ? 0 : undefined;
        const magneticCleanups = [];

        ctx = gsap.context(() => {
          // ═══ HERO (unchanged — user wants this preserved) ═══════════════════
          const heroTl = gsap.timeline({
            defaults: { ease: 'power3.out', duration: dur ?? 1 },
          });
          heroTl
            .fromTo('.hero-subtitle',
              { y: -30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: dur ?? 0.8 })
            .fromTo('.hp-hero-title .split-line',
              { y: 60, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.15, duration: dur ?? 1.2 },
              '-=0.4')
            .fromTo('.hero-bottom-elements',
              { y: 30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: dur ?? 1 },
              '-=0.6');

          const readScalePair = (el) => {
            const a1 = el.getAttribute('data-value-1');
            const a2 = el.getAttribute('data-value-2');
            return [parseFloat(a1 ?? ''), parseFloat(a2 ?? '')];
          };
          gsap.utils.toArray('.mil-scale').forEach((el) => {
            const [v1, v2] = readScalePair(el);
            if (!Number.isFinite(v1) || !Number.isFinite(v2)) return;
            gsap.fromTo(el,
              { scale: v1 },
              {
                scale: v2, ease: 'none',
                scrollTrigger: { trigger: el, scrub: true, toggleActions: 'play none none reverse' },
              });
          });

          // If the user prefers reduced motion, skip the choreographed sections entirely
          // (the philosophy words fall back to a readable static colour in CSS)
          if (reduceMotion) {
            ScrollTrigger.refresh();
            return;
          }

          // ═══ 1. PHILOSOPHY — per-word colour scrub ══════════════════════════
          // Both endpoint colours read pale on the cream ground; the dark band
          // is the midpoint of the ramp travelling through the paragraph.
          // duration / stagger IS that band's width, in words (~8).
          gsap.to('.philo .pw', {
            color: (i, el) => (el.classList.contains('accent') ? 'rgb(0, 205, 88)' : 'rgb(231, 231, 231)'),
            ease: 'none',
            duration: 1,
            stagger: 0.12,
            scrollTrigger: {
              trigger: '.philo',
              start: 'top 75%',
              end: 'bottom top',
              scrub: 1,
            },
          });
          // ═══ 3. DEEP PARALLAX — clip-path line reveal + counting stats + drift ═
          const parallaxHeadline = root.querySelector('.deep-parallax-section .parallax-layer[data-speed="0"] > div:nth-child(2)');
          const parallaxTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.deep-parallax-section',
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          });
          parallaxTl
            .from('.deep-parallax-section h2', {
              clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.out',
            });
          if (parallaxHeadline) {
            parallaxTl.from(parallaxHeadline, {
              clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.out',
            }, '-=0.6');
          }
          parallaxTl.from('.deep-parallax-section .stat-counter', {
            y: 40, autoAlpha: 0, stagger: 0.15, duration: 0.8,
          }, '-=0.6');

          root.querySelectorAll('.deep-parallax-section .stat-counter').forEach((el) => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            if (isNaN(target)) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 2.2, ease: 'power2.out',
              onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
              scrollTrigger: {
                trigger: el, start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          });

          if (isDesktop) {
            const bgLayer = root.querySelector('.deep-parallax-section [data-speed="0.2"]');
            if (bgLayer) {
              gsap.to(bgLayer.children, {
                yPercent: (i) => (i === 0 ? -50 : 50),
                rotation: (i) => (i === 0 ? -6 : 6),
                ease: 'none',
                scrollTrigger: {
                  trigger: '.deep-parallax-section',
                  start: 'top bottom', end: 'bottom top', scrub: 0.8,
                },
              });
            }
            const midImg = root.querySelector('.deep-parallax-section [data-speed="-0.5"] img');
            if (midImg) {
              gsap.fromTo(midImg,
                { yPercent: 30, rotation: -8, scale: 0.9 },
                {
                  yPercent: -45, rotation: 5, scale: 1.08, ease: 'none',
                  scrollTrigger: {
                    trigger: '.deep-parallax-section',
                    start: 'top bottom', end: 'bottom top', scrub: 0.8,
                  },
                });
            }
          }

          // ═══ 4. PROCESS FLOW — active-step spotlight + traveling dot ═══════
          const progressLine = root.querySelector('.process-progress-line');
          const progressDot = root.querySelector('.process-progress-dot');
          if (progressLine || progressDot) {
            ScrollTrigger.create({
              trigger: '.process-flow-section',
              start: 'top 40%',
              end: 'bottom 60%',
              scrub: true,
              onUpdate: (self) => {
                if (progressLine) progressLine.style.transform = `scaleY(${self.progress})`;
                if (progressDot) progressDot.style.top = `${self.progress * 100}%`;
              },
            });
          }

          const steps = gsap.utils.toArray('.process-step');
          steps.forEach((step) => {
            gsap.set(step, { autoAlpha: 0.25, scale: 0.98, transformOrigin: 'left center' });
          });

          steps.forEach((step) => {
            const title = step.querySelector('.process-step-title');
            const desc = step.querySelector('.process-step-desc');

            const revealTl = gsap.timeline({
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            });
            if (title) revealTl.from(title, {
              clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.out',
            });
            if (desc) revealTl.from(desc, { y: 30, autoAlpha: 0, duration: 0.8 }, '-=0.6');

            ScrollTrigger.create({
              trigger: step,
              start: 'top 65%',
              end: 'bottom 35%',
              onEnter: () => gsap.to(step, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'expo.out' }),
              onEnterBack: () => gsap.to(step, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'expo.out' }),
              onLeave: () => gsap.to(step, { autoAlpha: 0.25, scale: 0.98, duration: 0.6, ease: 'expo.out' }),
              onLeaveBack: () => gsap.to(step, { autoAlpha: 0.25, scale: 0.98, duration: 0.6, ease: 'expo.out' }),
            });
          });

          // ═══ 5. TECH STACK & TOOLS — header reveal, marquee drift, card grid stagger ═
          // Pre-set hidden state to avoid SSR flash
          gsap.set('.stack-section .stack-subtitle', { y: 20, autoAlpha: 0 });
          gsap.set('.stack-section .stack-title .split-line', { clipPath: 'inset(0 0 100% 0)' });
          gsap.set('.stack-section .stack-desc', { y: 24, autoAlpha: 0 });
          gsap.set('.stack-section .stack-card', { yPercent: 25, autoAlpha: 0, scale: 0.92 });

          const stackHeaderTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.stack-section',
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
          stackHeaderTl
            .to('.stack-section .stack-subtitle', {
              y: 0, autoAlpha: 1, duration: 0.7,
            })
            .to('.stack-section .stack-title .split-line', {
              clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out',
            }, '-=0.4')
            .to('.stack-section .stack-desc', {
              y: 0, autoAlpha: 1, duration: 0.8,
            }, '-=0.7');

          if (isDesktop) {
            const marquee = root.querySelector('.stack-marquee');
            if (marquee) {
              gsap.to(marquee, {
                xPercent: -33.33, ease: 'none',
                duration: 40, repeat: -1,
              });
            }
          }

          ScrollTrigger.batch('.stack-section .stack-card', {
            start: 'top 88%',
            interval: 0.08,
            onEnter: (batch) => {
              gsap.to(batch, {
                yPercent: 0, autoAlpha: 1, scale: 1,
                duration: 0.9, stagger: 0.08, ease: 'expo.out', overwrite: true,
              });
            },
            once: true,
          });

          gsap.utils.toArray('.stack-section .stack-card').forEach((card) => {
            const glow = card.querySelector('.stack-card-glow');
            const logo = card.querySelector('.stack-logo');
            const enter = () => {
              gsap.to(card, { y: -8, duration: 0.6, ease: 'power3.out' });
              if (glow) gsap.to(glow, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });
              if (logo) gsap.to(logo, { rotate: -6, scale: 1.08, duration: 0.5, ease: 'back.out(2)' });
            };
            const leave = () => {
              gsap.to(card, { y: 0, duration: 0.6, ease: 'power3.out' });
              if (glow) gsap.to(glow, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' });
              if (logo) gsap.to(logo, { rotate: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
            };
            card.addEventListener('mouseenter', enter);
            card.addEventListener('mouseleave', leave);
            magneticCleanups.push(() => {
              card.removeEventListener('mouseenter', enter);
              card.removeEventListener('mouseleave', leave);
            });
          });

          // ═══ 6. FAQ — header reveal, item stagger, accordion click animation ══════
          // Pre-set hidden state to avoid SSR flash
          gsap.set('.faq-section .faq-subtitle', { y: 20, autoAlpha: 0 });
          gsap.set('.faq-section .faq-title .split-line', { clipPath: 'inset(0 0 100% 0)' });
          gsap.set('.faq-section .faq-desc', { y: 24, autoAlpha: 0 });
          gsap.set('.faq-section .faq-item', { y: 40, autoAlpha: 0 });

          const faqHeaderTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.faq-section',
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
          faqHeaderTl
            .to('.faq-section .faq-subtitle', { y: 0, autoAlpha: 1, duration: 0.7 })
            .to('.faq-section .faq-title .split-line', {
              clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out',
            }, '-=0.4')
            .to('.faq-section .faq-desc', { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.7');

          gsap.to('.faq-section .faq-item', {
            y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.8, ease: 'expo.out',
            scrollTrigger: {
              trigger: '.faq-section .faq-item',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });

          // Initial open state for the active FAQ item
          requestAnimationFrame(() => animateFaqHeights());

          // ═══ 7. CTA — orbital specialists panel ══════════════════════════════════
          // Entrance: card rise + gradient pulse
          const ctaEntrance = gsap.timeline({
            scrollTrigger: {
              trigger: '.cta-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
          ctaEntrance
            .from('.cta-card', {
              yPercent: 8, autoAlpha: 0, scale: 0.96,
              duration: 1.3, ease: 'expo.out',
            })
            .from('.cta-section .cta-subtitle', { y: 16, autoAlpha: 0, duration: 0.6 }, '-=0.8')
            .from('.cta-section .cta-title-word > span', {
              yPercent: 110, stagger: 0.06, duration: 1, ease: 'expo.out',
            }, '-=0.6')
            .from('.cta-section .cta-desc', { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.6')
            .from('.cta-section .cta-btn', {
              scaleX: 0.3, scaleY: 1.4, autoAlpha: 0,
              transformOrigin: 'left center',
              duration: 0.9, ease: 'back.out(2)',
            }, '-=0.5');

          // Continuous glow pulse (respect reduced motion: already skipped above)
          gsap.to('.cta-bg-glow', {
            scale: 1.15, autoAlpha: 0.9,
            duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut',
            transformOrigin: 'center center',
          });
          gsap.to('.cta-bg-glow-2', {
            scale: 1.1, autoAlpha: 0.85,
            duration: 5.5, yoyo: true, repeat: -1, ease: 'sine.inOut',
            transformOrigin: 'center center',
          });

          // Orbit rotations — each orbit at different speed / direction
          const orbitSpecs = [
            { el: '.cta-orbit-1', dur: 28, dir: 1 },
            { el: '.cta-orbit-2', dur: 42, dir: -1 },
            { el: '.cta-orbit-3', dur: 70, dir: 1 },
          ];
          orbitSpecs.forEach((spec) => {
            gsap.to(spec.el, {
              rotation: 360 * spec.dir, duration: spec.dur, ease: 'none', repeat: -1,
              transformOrigin: 'center center',
            });
            // Counter-rotate each item so chips stay upright
            gsap.to(`${spec.el} .cta-orbit-counter`, {
              rotation: -360 * spec.dir, duration: spec.dur, ease: 'none', repeat: -1,
              transformOrigin: 'center center',
            });
          });

          // Subtle floating on each chip for organic feel
          gsap.utils.toArray('.cta-orbit-chip').forEach((chip, i) => {
            gsap.to(chip, {
              y: '+=8', duration: 2 + (i % 3) * 0.5,
              yoyo: true, repeat: -1, ease: 'sine.inOut',
              delay: (i * 0.15) % 1.2,
            });
          });

          // Scroll-linked subtle parallax on the whole stage
          if (isDesktop) {
            gsap.to('.cta-orbit-stage', {
              yPercent: -6, ease: 'none',
              scrollTrigger: {
                trigger: '.cta-section',
                start: 'top bottom', end: 'bottom top', scrub: 1,
              },
            });
          }

          // Counter-up for 20k+ stat
          const statEl = root.querySelector('.cta-stat-num');
          if (statEl) {
            const target = parseInt(statEl.dataset.target, 10) || 20000;
            const suffix = statEl.dataset.suffix || '+';
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 2.4, ease: 'power2.out',
              onUpdate: () => {
                const v = Math.round(obj.val);
                statEl.textContent = (v >= 1000 ? Math.round(v / 1000) + 'k' : v) + suffix;
              },
              scrollTrigger: {
                trigger: statEl, start: 'top 85%',
                toggleActions: 'play none none reset',
              },
            });
          }

          // Magnetic CTA button + hover glow reveal
          if (isDesktop) {
            const ctaBtn = root.querySelector('.cta-section .cta-btn');
            if (ctaBtn) magneticCleanups.push(makeMagnetic(gsap, ctaBtn, 0.35, 0.4));
          }
          const ctaBtn = root.querySelector('.cta-section .cta-btn');
          if (ctaBtn) {
            const glow = ctaBtn.querySelector('.cta-btn-glow');
            const arrow = ctaBtn.querySelector('.cta-btn-arrow');
            const onEnter = () => {
              if (glow) gsap.to(glow, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
              if (arrow) gsap.to(arrow, { x: 4, rotation: -20, duration: 0.4, ease: 'back.out(2)' });
            };
            const onLeave = () => {
              if (glow) gsap.to(glow, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' });
              if (arrow) gsap.to(arrow, { x: 0, rotation: 0, duration: 0.4, ease: 'power3.out' });
            };
            ctaBtn.addEventListener('mouseenter', onEnter);
            ctaBtn.addEventListener('mouseleave', onLeave);
            magneticCleanups.push(() => {
              ctaBtn.removeEventListener('mouseenter', onEnter);
              ctaBtn.removeEventListener('mouseleave', onLeave);
            });
          }

          ScrollTrigger.refresh();
        }, mainRef.value);

        return () => magneticCleanups.forEach((fn) => fn());
      }
    );
  });
}
</script>

<style scoped>
.hero-subtitle,
.hp-hero-title .split-line,
.hero-bottom-elements,
.huge-text,
.stagger-text,
.process-step-title,
.process-step-desc,
.stack-card,
.faq-item,
.cta-card,
.cta-orbit-chip {
  will-change: transform, opacity;
}

.mask-overlay,
.mask-img-target {
  will-change: transform;
}

/* Clip-path reveal targets — hint the compositor and suppress any CSS
   transitions that would fight GSAP's frame-by-frame updates. */
.services-reveal-section .huge-text .split-line,
.services-reveal-section .stagger-text,
.deep-parallax-section h2,
.deep-parallax-section .parallax-layer[data-speed="0"] > div:nth-child(2),
.process-step-title,
.stack-section .stack-title .split-line,
.faq-section .faq-title .split-line {
  will-change: clip-path;
  transition: none;
}

/* Ensure clip-path reveal target starts hidden before JS takes over */
.mask-image-container {
  clip-path: inset(100% 0 0 0);
}

/* Stat counters should not shift on text length change */
.stat-counter,
.cta-stat-num {
  font-variant-numeric: tabular-nums;
}

/* Magnetic hover targets need GPU hinting */
.cta-btn,
.stack-card {
  will-change: transform;
}

/* ═══ STACK ═════════════════════════════════════════════════════════════ */
.stack-marquee {
  will-change: transform;
}

/* ═══ FAQ ═══════════════════════════════════════════════════════════════ */
.faq-section {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: clamp(5.5rem, 11vh, 8rem) clamp(1.25rem, 5vw, 5rem);
  background:
    radial-gradient(circle at 50% 86%, rgba(255, 153, 0, 0.12), transparent 18rem),
    radial-gradient(circle at 8% 12%, rgba(255, 153, 0, 0.06), transparent 18rem),
    #f7f6f1;
  color: #070707;
  font-family: Outfit, Arial, sans-serif;
}

.faq-section::before,
.faq-section::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

.faq-section::before {
  inset: 0;
  opacity: 0.42;
  background-image:
    linear-gradient(90deg, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: radial-gradient(circle at center, black 0%, transparent 72%);
}

.faq-section::after {
  top: 18%;
  right: -7rem;
  width: 20rem;
  height: 20rem;
  border: 1px solid rgba(255, 153, 0, 0.16);
  opacity: 0.42;
  transform: rotate(45deg);
}

.faq-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(260px, 0.85fr) 56px minmax(360px, 1.22fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  width: min(100%, 1180px);
  min-height: 68vh;
  margin: 0 auto;
}

.faq-copy {
  max-width: 430px;
}

.faq-subtitle {
  margin: 0 0 1.65rem;
  color: #c7831b;
  font-size: 0.75rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.42em;
  text-transform: uppercase;
}

.faq-title {
  margin: 0 0 1.75rem;
  color: #080808;
  font-size: clamp(3.5rem, 6.4vw, 5.9rem);
  font-weight: 100;
  line-height: 1.02;
  letter-spacing: -0.055em;
}

.faq-title .split-line {
  display: inline-block;
}

.faq-desc {
  max-width: 420px;
  margin: 0;
  color: #141414;
  font-size: clamp(1rem, 1.6vw, 1.14rem);
  font-weight: 400;
  line-height: 1.55;
}

.faq-divider {
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 520px;
}

.faq-divider::before {
  content: "";
  width: 10px;
  min-height: 100%;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.02));
}

.faq-divider span {
  position: absolute;
  top: 32%;
  width: 28px;
  height: 340px;
  border-radius: 999px;
  background: #ff9900;
  box-shadow:
    0 18px 45px rgba(255, 153, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.faq-divider span::after {
  content: "→";
  position: absolute;
  top: 1.1rem;
  left: 50%;
  color: #ffffff;
  font-size: 1.35rem;
  font-weight: 800;
  transform: translateX(-50%);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  overflow: hidden;
  border: 1.5px solid rgba(255, 153, 0, 0.64);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.62);
  box-shadow:
    0 18px 45px rgba(255, 153, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(10px);
  transition:
    transform 240ms ease,
    box-shadow 240ms ease,
    border-color 240ms ease,
    background-color 240ms ease;
  -webkit-backdrop-filter: blur(10px);
}

.faq-item:hover {
  border-color: rgba(255, 153, 0, 0.92);
  box-shadow:
    0 24px 58px rgba(255, 153, 0, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.88);
  transform: translateY(-2px);
}

.faq-item-open {
  border-color: #ff9900;
  background: rgba(255, 255, 255, 0.78);
  box-shadow:
    0 30px 70px rgba(255, 153, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.faq-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 74px;
  padding: 1.2rem 1.55rem 1.15rem;
  border: 0;
  gap: 1.5rem;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.faq-question {
  color: #0b0b0b;
  font-size: clamp(1.15rem, 1.8vw, 1.42rem);
  font-weight: 800;
  line-height: 1.18;
}

.faq-icon {
  position: relative;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: #d28410;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
}

.faq-icon-open {
  color: #ffffff;
}

.faq-answer-wrap {
  overflow: hidden;
  will-change: height;
}

.faq-answer-inner {
  padding: 0 1.55rem 1.55rem;
}

.faq-answer {
  max-width: 640px;
  margin: 0;
  color: #171717;
  font-size: clamp(0.95rem, 1.25vw, 1.05rem);
  font-weight: 400;
  line-height: 1.55;
}

.faq-icon-bar {
  position: absolute;
  width: 13px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  transform-origin: center center;
}

@media (max-width: 1024px) {
  .faq-section {
    min-height: auto;
  }

  .faq-shell {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .faq-copy {
    max-width: 620px;
  }

  .faq-divider {
    display: none;
  }
}

@media (max-width: 560px) {
  .faq-section {
    padding-inline: 1rem;
  }

  .faq-trigger {
    min-height: 68px;
    padding: 1rem 1.1rem;
  }

  .faq-answer-inner {
    padding: 0 1.1rem 1.2rem;
  }
}

/* ═══ CTA — ORBITAL STAGE ═══════════════════════════════════════════════ */
.cta-section {
  --orbit-r1: 90px;
  --orbit-r2: 155px;
  --orbit-r3: 220px;
  --chip-size: 48px;
  --chip-size-lg: 64px;
}

@media (min-width: 640px) {
  .cta-section {
    --orbit-r1: 110px;
    --orbit-r2: 180px;
    --orbit-r3: 250px;
  }
}

@media (min-width: 1024px) {
  .cta-section {
    --orbit-r1: 130px;
    --orbit-r2: 210px;
    --orbit-r3: 290px;
  }
}

.cta-ring {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cta-ring-1 {
  width: calc(var(--orbit-r1) * 2);
  height: calc(var(--orbit-r1) * 2);
}
.cta-ring-2 {
  width: calc(var(--orbit-r2) * 2);
  height: calc(var(--orbit-r2) * 2);
}
.cta-ring-3 {
  width: calc(var(--orbit-r3) * 2);
  height: calc(var(--orbit-r3) * 2);
}

.cta-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(40, 20, 70, 0.75) 0%, rgba(20, 10, 40, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(255, 185, 120, 0.08);
}

@media (min-width: 768px) {
  .cta-center {
    width: 150px;
    height: 150px;
  }
}

.cta-orbit {
  pointer-events: none;
}

.cta-orbit-slot {
  width: 0;
  height: 0;
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--orbit-radius) * -1));
  pointer-events: auto;
}

.cta-orbit-1 .cta-orbit-slot { --orbit-radius: var(--orbit-r1); }
.cta-orbit-2 .cta-orbit-slot { --orbit-radius: var(--orbit-r2); }
.cta-orbit-3 .cta-orbit-slot { --orbit-radius: var(--orbit-r3); }

.cta-orbit-counter {
  position: relative;
  transform-origin: center center;
}

.cta-orbit-chip {
  width: var(--chip-size);
  height: var(--chip-size);
  border-radius: 14px;
  transform: translate(-50%, -50%);
  position: relative;
}

@media (min-width: 768px) {
  .cta-orbit-chip {
    width: var(--chip-size-lg);
    height: var(--chip-size-lg);
    border-radius: 18px;
  }
}

.cta-orbit-avatar {
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 185, 120, 0.15);
  background: #1a0d33;
}

.cta-orbit-icon {
  background: linear-gradient(135deg, #1a0d33 0%, #3a1e6d 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.cta-bg-glow,
.cta-bg-glow-2 {
  will-change: transform, opacity;
  transform-origin: center center;
}

/* CTA title word wrapper — words animate with yPercent from below */
.cta-title-word {
  line-height: 1.02;
}
.cta-title-word > span {
  will-change: transform;
}

/* Philosophy — cream section, per-word colour scrub */
.philo {
  background: #f8f7f1;
  padding: 7.75rem clamp(1.5rem, 5.7vw, 5rem) 6.5rem;
  font-family: Rubik, Outfit, Arial, sans-serif;
}

.philo-head {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.6rem;
}

.philo-head span {
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.66);
}

.philo-txt {
  margin: 0;
  max-width: 13em;
  font-size: clamp(1.72rem, 6.83vw, 3.6rem);
  font-weight: 700;
  line-height: 1.165;
}

/* Resting colours — the tween drives `color` from here to the lit values. */
.philo .pw {
  color: rgba(20, 20, 20, 0.16);
}

.philo .pw.accent {
  color: rgba(0, 205, 88, 0.18);
  font-style: italic;
}

@media (min-width: 900px) {
  .philo {
    padding-top: 11rem;
    padding-bottom: 10rem;
  }

  .philo-head {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .philo .pw {
    color: rgba(20, 20, 20, 0.85);
  }

  .philo .pw.accent {
    color: rgb(0, 205, 88);
  }
}
</style>
