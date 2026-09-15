<template>
  <!-- overflow-clip, not overflow-hidden: `hidden` makes this a scroll container and kills position:sticky inside -->
  <main class="bg-[#0a0a0a] min-h-screen text-white overflow-clip">
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">

        <!-- 1. Cinematic Hero — Split Reveal with Geometric Canvas -->
        <!-- No mil-dark-bg here: the theme paints it with `backdrop-filter: invert(100%)`,
             which assumes a light page. This page is already dark, so the invert washed the
             whole hero out to near-white. data-nav-theme keeps the nav inversion working. -->
        <section class="wd-hero-section relative min-h-screen flex items-center overflow-hidden mil-banner" data-nav-theme="dark">
            <!-- Geometric Background Layer (dodecatrons preserved exactly) -->
            <div class="absolute inset-0 z-0 wd-hero-bg opacity-40">
                <div class="mi-invert-fix">
                    <div class="mil-animation-frame">
                        <div class="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6"></div>
                        <div class="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1"></div>
                        <div class="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1"></div>
                    </div>
                </div>
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-10 pointer-events-none"></div>
            </div>

            <!-- Ambient glow pulse -->
            <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#FF9900]/[0.04] blur-[120px] pointer-events-none z-[1] wd-glow-pulse"></div>

            <!-- Soft grey wash — the geometric layer reads as empty black at phone sizes -->
            <div class="wd-hero-wash lg:hidden absolute inset-0 z-[1] pointer-events-none" aria-hidden="true"></div>

            <div class="container relative z-20 px-6 md:px-12 pt-32 pb-20">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
                    <!-- Left: Text Content -->
                    <div class="lg:col-span-7 xl:col-span-6">
                        <ul class="flex gap-4 text-sm text-gray-400 mb-8 wd-fade-up">
                            <li><NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
                            <li>/</li>
                            <li><NuxtLink :to="localePath('/services')" class="hover:text-white transition-colors">{{ $t('nav.services') }}</NuxtLink></li>
                            <li>/</li>
                            <li class="text-[#FF9900]">{{ $t('nav.webdev') }}</li>
                        </ul>

                        <h1 class="wd-huge-text text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-8">
                            <span class="block split-line">{{ $t('services_inner.webdev.banner1') }}</span>
                            <span class="block split-line font-light text-gray-400 mt-2">{{ $t('services_inner.webdev.banner2') }} <span class="text-white">{{ $t('services_inner.webdev.banner3') }}</span></span>
                        </h1>

                        <p class="text-xl md:text-2xl text-gray-400 max-w-xl font-light leading-relaxed mb-12 wd-fade-up">
                            {{ $t('services_inner.webdev.approach_desc') }}
                        </p>

                        <div class="flex flex-col sm:flex-row items-start gap-5 wd-fade-up">
                            <NuxtLink :to="localePath('/contact')" class="group relative px-10 py-4 bg-white text-black rounded-full overflow-hidden font-bold text-sm tracking-[0.15em] uppercase">
                                <span class="relative z-10">Start a Project</span>
                                <div class="absolute inset-0 bg-[#FF9900] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
                            </NuxtLink>
                            <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm tracking-widest uppercase font-bold py-4">
                                {{ $t('services_inner.view_works') }}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform -rotate-45"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Right: Floating Metric Cards — absolute/scattered from lg up, a plain row below it -->
                    <div class="wd-metrics lg:col-span-5 xl:col-span-6 relative mt-14 lg:mt-0 grid grid-cols-2 gap-4 sm:gap-5 lg:block lg:h-[500px]">
                        <div class="wd-metric-card lg:absolute lg:top-[5%] lg:right-[10%] bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 md:px-8 md:py-6 lg:rotate-3">
                            <div class="text-3xl md:text-4xl font-bold text-[#FF9900] mb-1">99.9%</div>
                            <div class="text-[10px] md:text-xs tracking-widest text-gray-500 uppercase">Uptime SLA</div>
                        </div>
                        <div class="wd-metric-card lg:absolute lg:top-[35%] lg:left-[0%] bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 md:px-8 md:py-6 lg:-rotate-2">
                            <div class="text-3xl md:text-4xl font-bold text-white mb-1">&lt;0.8s</div>
                            <div class="text-[10px] md:text-xs tracking-widest text-gray-500 uppercase">Avg Load Time</div>
                        </div>
                        <div class="wd-metric-card col-span-2 lg:absolute lg:bottom-[10%] lg:right-[5%] bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 md:px-8 md:py-6 lg:rotate-1">
                            <div class="text-3xl md:text-4xl font-bold text-white mb-1">100</div>
                            <div class="text-[10px] md:text-xs tracking-widest text-gray-500 uppercase">PageSpeed Score</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 2. Approach Section — Morphing Circle Reveal (with diagonal clip-path wipe transition) -->
        <section class="wd-approach-section relative py-32 bg-white text-black dark:bg-[#0a0a0a] dark:text-white z-30" style="will-change: clip-path;">
            <div class="container px-6 md:px-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="wd-approach-left">
                        <div class="wd-approach-image-wrapper relative h-[500px] md:h-[700px] w-full overflow-hidden transform-gpu" style="border-radius: 50%; opacity: 0;">
                            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" class="w-full h-full object-cover" alt="Strategy" />
                        </div>
                    </div>
                    <div class="wd-approach-right">
                        <div class="wd-approach-text">
                            <h2 class="text-4xl md:text-6xl text-black dark:text-white font-medium tracking-tight mb-8 wd-stagger-text">
                                {{ $t('services_inner.webdev.approach1') }} <span class="font-light text-gray-500">{{ $t('services_inner.webdev.approach2') }}</span> <br/>
                                {{ $t('services_inner.webdev.approach3') }} <span class="font-light text-gray-500">{{ $t('services_inner.webdev.approach4') }}</span>
                            </h2>
                            <div class="wd-fade-up">
                                <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center gap-4 text-lg font-medium hover:text-[#FFA500] transition-colors">
                                    {{ $t('services_inner.view_works') }}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform -rotate-45"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. Pinned Horizontal Services (already unique — keep as-is, add progress bar) -->
        <section class="wd-horizontal-section relative h-screen bg-[#111] overflow-hidden">
            <!-- Progress indicator -->
            <div class="absolute top-0 left-0 right-0 h-[2px] z-20 bg-white/5">
                <div class="wd-scroll-progress h-full bg-[#FFA500] origin-left" style="transform: scaleX(0);"></div>
            </div>

            <div class="absolute top-12 left-12 text-sm max-w-[200px] text-gray-400 z-10">
                SCROLL TO EXPLORE EXPERTISE
            </div>

            <div class="wd-horizontal-container flex h-full items-center pl-[10vw] pr-[5vw] gap-[5vw] w-[400vw]">
                <!-- Item 1 -->
                <div class="w-[85vw] md:w-[60vw] flex-shrink-0 flex flex-col justify-center">
                    <div class="text-[8rem] md:text-[15rem] font-bold leading-none text-white/5 mb-[-5rem] md:mb-[-8rem]">01</div>
                    <h3 class="!text-white text-4xl md:text-7xl font-light mb-6">
                        {{ $t('services_inner.webdev.acc1_name') }}
                    </h3>
                    <p class="text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        {{ $t('services_inner.webdev.acc1_p1') }}
                    </p>
                    <p class="text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-relaxed mt-4">
                        {{ $t('services_inner.webdev.acc1_p2') }}
                    </p>
                </div>
                <!-- Item 2 -->
                <div class="w-[85vw] md:w-[60vw] flex-shrink-0 flex flex-col justify-center">
                    <div class="text-[8rem] md:text-[15rem] font-bold leading-none text-white/5 mb-[-5rem] md:mb-[-8rem]">02</div>
                    <h3 class="!text-white text-4xl md:text-7xl font-light mb-6">
                        {{ $t('services_inner.webdev.acc2_name') }}
                    </h3>
                    <p class="text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        {{ $t('services_inner.webdev.acc2_p1') }}
                    </p>
                </div>
                <!-- Item 3 -->
                <div class="w-[85vw] md:w-[60vw] flex-shrink-0 flex flex-col justify-center">
                    <div class="text-[8rem] md:text-[15rem] font-bold leading-none text-white/5 mb-[-5rem] md:mb-[-8rem]">03</div>
                    <h3 class="!text-white text-4xl md:text-7xl font-light mb-6">
                        {{ $t('services_inner.webdev.acc3_name') }}
                    </h3>
                    <p class="text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        {{ $t('services_inner.webdev.acc3_p1') }}
                    </p>
                </div>
                <!-- Item 4 -->
                <div class="w-[85vw] md:w-[60vw] flex-shrink-0 flex flex-col justify-center">
                    <div class="text-[8rem] md:text-[15rem] font-bold leading-none text-white/5 mb-[-5rem] md:mb-[-8rem]">04</div>
                    <h3 class="!text-white text-4xl md:text-7xl font-light mb-6">
                        {{ $t('services_inner.webdev.acc4_name') }}
                    </h3>
                    <p class="text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        {{ $t('services_inner.webdev.acc4_p1') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- 4. Process Sequence — Accordion Unfold (with vertical accordion unfold transition) -->
        <!-- overflow-x-clip, not overflow-hidden: `hidden` would make the sticky cards below stick to this box instead of the viewport -->
        <section class="wd-pricing-section relative pt-48 pb-32 bg-[#050505] overflow-clip" style="will-change: transform;">
            <div class="container relative z-10 px-6 max-w-5xl mx-auto">
                <div class="text-center mb-24 wd-pricing-header">
                    <h2 class="text-4xl md:text-6xl text-gray-400 font-light mb-6">
                        {{ $t('services_inner.process_title1') }} <span class="text-white">{{ $t('services_inner.process_title2') }}</span>
                    </h2>
                    <p class="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto" v-html="$t('services_inner.webdev.prices_desc')"></p>
                </div>

                <div class="wd-process-stack">
                    <!-- Step 1 -->
                    <div @click="toggleDropdown(0)" class="wd-process-dropdown group relative block bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 hover:bg-[#1a1a1a] transition-colors cursor-pointer overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="relative z-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                            <div class="flex-shrink-0 pt-2">
                                <div class="text-sm tracking-widest text-[#FFA500] mb-2 uppercase">{{ $t('services_inner.step1') }}</div>
                                <div class="text-4xl md:text-5xl font-light text-white">{{ $t('services_inner.step') }}</div>
                            </div>
                            <div class="flex-grow pt-2 relative">
                                <h4 class="text-2xl md:text-3xl text-white font-medium wd-process-title transition-colors" v-html="$t('services_inner.webdev.step1_title')"></h4>
                                <div class="wd-dropdown-content overflow-hidden h-0 opacity-0 relative">
                                    <p class="text-lg text-gray-400 leading-relaxed pt-4">{{ $t('services_inner.webdev.step1_desc') }}</p>
                                </div>
                            </div>
                            <div class="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all wd-dropdown-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wd-dropdown-icon transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div @click="toggleDropdown(1)" class="wd-process-dropdown group relative block bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 hover:bg-[#1a1a1a] transition-colors cursor-pointer overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="relative z-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                            <div class="flex-shrink-0 pt-2">
                                <div class="text-sm tracking-widest text-[#FFA500] mb-2 uppercase">{{ $t('services_inner.step2') }}</div>
                                <div class="text-4xl md:text-5xl font-light text-white">{{ $t('services_inner.step') }}</div>
                            </div>
                            <div class="flex-grow pt-2 relative">
                                <h4 class="text-2xl md:text-3xl text-white font-medium wd-process-title transition-colors" v-html="$t('services_inner.webdev.step2_title')"></h4>
                                <div class="wd-dropdown-content overflow-hidden h-0 opacity-0 relative">
                                    <p class="text-lg text-gray-400 leading-relaxed pt-4">{{ $t('services_inner.webdev.step2_desc') }}</p>
                                </div>
                            </div>
                            <div class="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all wd-dropdown-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wd-dropdown-icon transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div @click="toggleDropdown(2)" class="wd-process-dropdown group relative block bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 hover:bg-[#1a1a1a] transition-colors cursor-pointer overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="relative z-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                            <div class="flex-shrink-0 pt-2">
                                <div class="text-sm tracking-widest text-[#FFA500] mb-2 uppercase">{{ $t('services_inner.step3') }}</div>
                                <div class="text-4xl md:text-5xl font-light text-white">{{ $t('services_inner.step') }}</div>
                            </div>
                            <div class="flex-grow pt-2 relative">
                                <h4 class="text-2xl md:text-3xl text-white font-medium wd-process-title transition-colors" v-html="$t('services_inner.webdev.step3_title')"></h4>
                                <div class="wd-dropdown-content overflow-hidden h-0 opacity-0 relative">
                                    <p class="text-lg text-gray-400 leading-relaxed pt-4">{{ $t('services_inner.webdev.step3_desc') }}</p>
                                </div>
                            </div>
                            <div class="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all wd-dropdown-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wd-dropdown-icon transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4 -->
                    <div @click="toggleDropdown(3)" class="wd-process-dropdown group relative block bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 hover:bg-[#1a1a1a] transition-colors cursor-pointer overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="relative z-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                            <div class="flex-shrink-0 pt-2">
                                <div class="text-sm tracking-widest text-[#FFA500] mb-2 uppercase">{{ $t('services_inner.step4') }}</div>
                                <div class="text-4xl md:text-5xl font-light text-white">{{ $t('services_inner.step') }}</div>
                            </div>
                            <div class="flex-grow pt-2 relative">
                                <h4 class="text-2xl md:text-3xl text-white font-medium wd-process-title transition-colors" v-html="$t('services_inner.webdev.step4_title')"></h4>
                                <div class="wd-dropdown-content overflow-hidden h-0 opacity-0 relative">
                                    <p class="text-lg text-gray-400 leading-relaxed pt-4">{{ $t('services_inner.webdev.step4_desc') }}</p>
                                </div>
                            </div>
                            <div class="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all wd-dropdown-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wd-dropdown-icon transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Parallax Depth Layer (process→CTA transition) -->
        <div class="wd-parallax-layer absolute w-full pointer-events-none z-[5]" style="height: 200px; margin-top: -100px;">
            <div class="flex justify-between px-[10%] opacity-20">
                <div class="w-32 h-32 border border-[#FFA500]/20 rounded-2xl rotate-12"></div>
                <div class="w-24 h-24 border border-[#6C63FF]/20 rounded-full -rotate-6"></div>
                <div class="w-40 h-40 border border-white/10 rounded-3xl rotate-[20deg]"></div>
            </div>
        </div>

        <!-- 5. Cinematic Footer CTA — Inset Clip-Path Reveal -->
        <section class="wd-cta-section relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden pt-32 pb-32">
            <div class="wd-cta-wrapper w-full max-w-[95vw] h-[80vh] overflow-hidden relative flex flex-col items-center justify-center text-center px-6" style="clip-path: inset(10% round 3rem);">
                <!-- Using a code-themed background for Web Dev CTA -->
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-50 wd-cta-bg-img" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <h2 class="relative z-10 text-white text-5xl md:text-8xl font-medium tracking-tight mb-8 max-w-4xl">
                    Ready to build your <span class="italic text-gray-300">digital future</span>?
                </h2>
                <NuxtLink :to="localePath('/contact')" class="relative z-10 bg-white text-black px-10 py-5 rounded-full text-xl font-medium hover:scale-105 transition-transform">
                    {{ $t('services_inner.individual_solution') }}
                </NuxtLink>
            </div>
        </section>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useHead, useLocalePath } from '#imports';

const localePath = useLocalePath();

const { settings: siteSettings } = useSiteSettings();
const { sections: wdSections, getSection } = usePageSections('web-development');

const activeIndex = ref(-1);

const toggleDropdown = (index) => {
    if (!window.gsap) return;

    const isCurrentlyActive = activeIndex.value === index;
    const contents = document.querySelectorAll('.wd-dropdown-content');
    const icons = document.querySelectorAll('.wd-dropdown-icon');
    const titles = document.querySelectorAll('.wd-process-title');

    // Close all
    window.gsap.to(contents, { height: 0, opacity: 0, duration: 0.5, ease: "power2.inOut" });
    window.gsap.to(icons, { rotation: 0, duration: 0.5, ease: "power2.inOut" });
    window.gsap.to(titles, { color: "white", duration: 0.3 });
    activeIndex.value = -1;

    // Open target if it wasn't active
    if (!isCurrentlyActive) {
        window.gsap.to(contents[index], { height: "auto", opacity: 1, duration: 0.5, ease: "power2.inOut" });
        window.gsap.to(icons[index], { rotation: 90, duration: 0.5, ease: "power2.inOut" });
        window.gsap.to(titles[index], { color: "#FFA500", duration: 0.3 });
        activeIndex.value = index;
    }
};

useHead({
  title: 'Web Development | Apex Digital',
  meta: [
    { name: 'description', content: 'Comprehensive web development solutions.' }
  ]
});

// Char splitter for typewriter effect (left-to-right, unique to WD)
function splitTextToChars(element) {
    if (!element) return;
    const text = element.innerText;
    element.innerHTML = '';

    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';

        const chars = word.split('');
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char-animate';
            charSpan.style.display = 'inline-block';
            charSpan.style.transformOrigin = '0% 50%';
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'translateX(30px)';
            charSpan.style.filter = 'blur(4px)';
            charSpan.innerText = char;
            wordSpan.appendChild(charSpan);
        });

        element.appendChild(wordSpan);
        if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.style.display = 'inline-block';
            space.innerHTML = '&nbsp;';
            element.appendChild(space);
        }
    });
}

let pollingInterval;
let ctx;

onMounted(() => {
    const checkGSAP = () => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(pollingInterval);
            initGSAP();
        }
    };
    pollingInterval = setInterval(checkGSAP, 50);

    if (window.refreshScrollAnimations) {
        window.refreshScrollAnimations();
    }
});

onUnmounted(() => {
    if (pollingInterval) clearInterval(pollingInterval);
    if (ctx) ctx.revert();
    stopProcessStack();
});

/* ── Process steps: sticky stacking cards ──────────────────────────────── */
const STACK_FADE_DISTANCE = 300;
let stackCards = [];
let stackFrame = 0;

function paintProcessStack() {
    stackFrame = 0;
    const stickyTop = window.innerWidth < 768 ? 84 : 96;
    stackCards.forEach((card, i) => {
        const next = stackCards[i + 1];
        if (!next) return;
        const distance = next.getBoundingClientRect().top - stickyTop;
        const progress = distance >= STACK_FADE_DISTANCE ? 0
            : distance <= 0 ? 1
            : 1 - distance / STACK_FADE_DISTANCE;
        card.style.opacity = String(1 - progress);
        card.style.filter = progress > 0 ? `blur(${(progress * 8).toFixed(1)}px)` : 'none';
        card.style.pointerEvents = progress > 0.9 ? 'none' : 'auto';
    });
}

function queueProcessStack() {
    if (!stackFrame) stackFrame = requestAnimationFrame(paintProcessStack);
}

function startProcessStack() {
    stackCards = Array.from(document.querySelectorAll('.wd-process-stack .wd-process-dropdown'));
    if (stackCards.length < 2) return;
    window.addEventListener('scroll', queueProcessStack, { passive: true });
    window.addEventListener('resize', queueProcessStack);
    paintProcessStack();
    // Sections above this one settle their height after GSAP init, which moves
    // the cards; repaint once that has happened.
    setTimeout(paintProcessStack, 400);
}

function stopProcessStack() {
    window.removeEventListener('scroll', queueProcessStack);
    window.removeEventListener('resize', queueProcessStack);
    if (stackFrame) cancelAnimationFrame(stackFrame);
    stackFrame = 0;
    stackCards = [];
}

function initGSAP() {
    window.ScrollTrigger.refresh();

    nextTick(() => {
        ctx = window.gsap.context(() => {
            const gsap = window.gsap;

            // --- 1. Hero: Typewriter Left-to-Right Decode ---
            document.querySelectorAll('.split-line').forEach(el => splitTextToChars(el));

            const heroTl = gsap.timeline();
            heroTl.to('.char-animate', {
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.6,
                ease: 'power4.out',
                stagger: { each: 0.025, from: "start" }
            })
            .fromTo('.wd-fade-up',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 },
                "-=0.8"
            );

            // Floating metric cards entrance
            gsap.fromTo('.wd-metric-card',
                { y: 60, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.5)', stagger: 0.2, delay: 0.6 }
            );

            // Subtle float animation for metric cards
            document.querySelectorAll('.wd-metric-card').forEach((card, i) => {
                gsap.to(card, {
                    y: i % 2 === 0 ? -12 : 12,
                    duration: 3 + i * 0.5,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                });
            });

            // Ambient glow pulse
            gsap.to('.wd-glow-pulse', {
                scale: 1.2,
                opacity: 0.8,
                duration: 4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });

            // Geometric bg parallax
            gsap.to('.wd-hero-bg', {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".wd-hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // --- T1: Hero → Approach — smooth transition, next section replaces current ---
            gsap.fromTo('.wd-approach-section',
                { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
                {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: ".wd-approach-section",
                        start: "top 90%",
                        end: "top 30%",
                        scrub: 1
                    }
                }
            );

            // --- 2. Approach: Morphing Circle Reveal ---
            const approachTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".wd-approach-section",
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            });

            approachTl
                .fromTo('.wd-approach-image-wrapper',
                    { scale: 0.3, borderRadius: "50%", opacity: 0 },
                    { scale: 1, borderRadius: "2rem", opacity: 1, duration: 1.5, ease: "expo.out" }
                )
                .fromTo('.wd-stagger-text',
                    { rotateX: 15, opacity: 0, y: 20, transformOrigin: "center bottom" },
                    { rotateX: 0, opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 },
                    "-=0.8"
                )
                .fromTo('.wd-approach-section .wd-fade-up',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.5"
                );

            // --- T2: Approach → Horizontal Scroll — Blur-fade + next section slides in ---
            ScrollTrigger.create({
                trigger: ".wd-approach-section",
                start: "top top",
                pin: true,
                pinSpacing: false,
            });

            gsap.to('.wd-approach-section', {
                opacity: 0,
                filter: "blur(12px)",
                scale: 0.95,
                ease: "none",
                scrollTrigger: {
                    trigger: ".wd-horizontal-section",
                    start: "top 100%",
                    end: "top 50%",
                    scrub: 1
                }
            });

            // --- 3. Pinned Horizontal Scroll + Progress Bar ---
            const horizontalST = gsap.to('.wd-horizontal-container', {
                xPercent: -75,
                ease: "none",
                scrollTrigger: {
                    trigger: ".wd-horizontal-section",
                    start: "top top",
                    end: "+=3000",
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        // Update progress bar
                        gsap.set('.wd-scroll-progress', { scaleX: self.progress });
                    }
                }
            });

            // --- T3: Horizontal → Process — Vertical Accordion Unfold ---
            gsap.fromTo('.wd-pricing-section',
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".wd-pricing-section",
                        start: "top 90%",
                        end: "top 40%",
                        scrub: 1
                    }
                }
            );

            // --- 4. Process Accordion Cards ---
            const pricingTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".wd-pricing-section",
                    start: "top 70%",
                }
            });

            pricingTl.fromTo('.wd-pricing-header',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
            );

            // Stacking cards: a card fades and blurs out over the last 300px of the
            // next card's approach to the sticky line. Measured live on scroll rather
            // than with ScrollTrigger — it caches start/end positions at refresh time,
            // and a position:sticky trigger reports wherever it is currently pinned.
            startProcessStack();

            // --- T4: Process → CTA — Parallax Depth Layers ---
            gsap.to('.wd-pricing-section .container', {
                yPercent: -15,
                opacity: 0.5,
                ease: "none",
                scrollTrigger: {
                    trigger: ".wd-cta-section",
                    start: "top 100%",
                    end: "top 50%",
                    scrub: 1
                }
            });

            gsap.fromTo('.wd-parallax-layer',
                { yPercent: 30 },
                {
                    yPercent: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".wd-cta-section",
                        start: "top 120%",
                        end: "top 0%",
                        scrub: 1
                    }
                }
            );

            // --- 5. CTA: Inset Clip-Path Reveal ---
            gsap.fromTo('.wd-cta-wrapper',
                { clipPath: "inset(10% round 3rem)" },
                {
                    clipPath: "inset(0% round 3rem)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".wd-cta-section",
                        start: "top 80%",
                        end: "center center",
                        scrub: 1
                    }
                }
            );

            // Reverse Ken Burns on CTA image
            gsap.fromTo('.wd-cta-bg-img',
                { scale: 1.3 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".wd-cta-section",
                        start: "top 80%",
                        end: "center center",
                        scrub: 1
                    }
                }
            );

        }); // end context
    });
}
</script>

<style scoped>
.wd-huge-text {
    font-family: "Clash Display", sans-serif;
}
.char-animate {
  will-change: transform, opacity, filter;
}
.wd-metric-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Process steps — sticky stacking cards: each pins under the nav and the next
   one slides over it, the one underneath fading and blurring out. */
.wd-process-stack {
  position: relative;
}

.wd-process-stack > .wd-process-dropdown {
  position: sticky;
  top: 96px;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

/* The gap is the scroll distance a card stays pinned before the next covers it. */
.wd-process-stack > .wd-process-dropdown + .wd-process-dropdown {
  margin-top: 46vh;
}

@media (max-width: 767px) {
  .wd-process-stack > .wd-process-dropdown {
    top: 84px;
  }

  .wd-process-stack > .wd-process-dropdown + .wd-process-dropdown {
    margin-top: 36vh;
  }
}

.wd-hero-wash {
  background:
    radial-gradient(120% 70% at 50% 0%, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.035) 38%, transparent 72%),
    radial-gradient(90% 50% at 85% 75%, rgba(255, 153, 0, 0.07) 0%, transparent 70%),
    linear-gradient(180deg, #161616 0%, #0c0c0c 55%, #050505 100%);
}
</style>
