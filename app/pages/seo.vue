<template>
  <main class="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">

        <!-- 1. Hero Section — Word-by-Word Reveal + Counter Tickers -->
        <section class="seo-hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Background Parallax Image (yPercent shift, NOT zoom like DM) -->
            <div class="absolute inset-0 z-0 seo-hero-bg">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" class="w-full h-full object-cover opacity-30" alt="SEO Strategy" />
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
            </div>

            <!-- Subtle grid pattern overlay -->
            <div class="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none seo-grid-overlay"></div>

            <div class="container relative z-10 px-6 md:px-12 text-center pt-32">
                <ul class="flex justify-center gap-4 text-sm text-gray-400 mb-8 seo-fade-up">
                    <li><NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
                    <li>/</li>
                    <li><NuxtLink :to="localePath('/services')" class="hover:text-white transition-colors">{{ $t('nav.services') }}</NuxtLink></li>
                    <li>/</li>
                    <li class="text-[#00C9A7]">{{ $t('nav.seo') }}</li>
                </ul>
                <h1 class="seo-huge-text text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
                    <span class="block split-line">{{ $t('services_inner.seo.banner1') }}</span>
                    <span class="block split-line font-light text-gray-400">{{ $t('services_inner.seo.banner2') }}</span>
                </h1>
                <p class="seo-fade-up text-xl md:text-3xl font-light !text-gray-300 max-w-3xl mx-auto mt-8">
                    {{ $t('services_inner.seo.approach3') }} {{ $t('services_inner.seo.banner3') }}
                </p>

                <!-- Counter Tickers -->
                <div class="flex justify-center gap-12 md:gap-20 mt-16 seo-fade-up">
                    <div class="text-center">
                        <div class="seo-counter text-4xl md:text-5xl font-bold text-[#00C9A7]" data-target="97.3">0</div>
                        <div class="text-sm text-gray-500 mt-2 tracking-wider uppercase">Avg. Score</div>
                    </div>
                    <div class="text-center">
                        <div class="seo-counter text-4xl md:text-5xl font-bold text-[#00C9A7]" data-target="2.1">0</div>
                        <div class="text-sm text-gray-500 mt-2 tracking-wider uppercase">Traffic Growth</div>
                    </div>
                    <div class="text-center">
                        <div class="seo-counter text-4xl md:text-5xl font-bold text-white" data-target="1">0</div>
                        <div class="text-sm text-gray-500 mt-2 tracking-wider uppercase">Page Rank</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 2. Approach Section — Horizontal Split-Screen Slide-In (with circle-expand clip-path transition) -->
        <section class="seo-approach-section relative py-32 bg-[#0a0a0a] text-white z-20" style="will-change: clip-path;">
            <div class="container px-6 md:px-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="seo-approach-image relative h-[500px] md:h-[700px] w-full overflow-hidden rounded-[2rem] transform-gpu">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover" alt="SEO Analytics" />
                    </div>
                    <div class="seo-approach-text">
                        <h2 class="text-4xl md:text-6xl !text-white font-medium tracking-tight mb-8 seo-stagger-text">
                            {{ $t('services_inner.seo.approach1') }} <br/>
                            <span class="font-light !text-gray-500">{{ $t('services_inner.seo.approach2') }}</span>
                        </h2>
                        <p class="text-xl md:text-2xl font-light !text-gray-400 leading-relaxed mb-12 seo-stagger-text">
                            {{ $t('services_inner.seo.approach_desc') }}
                        </p>
                        <div class="seo-stagger-text">
                            <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center gap-4 text-lg border-b border-[#00C9A7] pb-2 text-[#00C9A7] hover:text-white hover:border-white transition-all">
                                <span>{{ $t('services_inner.view_works') }}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transform -rotate-45"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3D Perspective wrapper for approach→showcase transition -->
        <div class="seo-perspective-wrapper" style="perspective: 1200px;">

        <!-- 3. Showcase — Stagger Cascade Waterfall -->
        <section class="seo-showcase-section relative py-32 bg-[#050505] overflow-hidden" style="transform-style: preserve-3d;">
            <div class="container relative z-10 px-6 md:px-12 max-w-6xl mx-auto">
                <div class="text-center mb-20 seo-showcase-header">
                    <span class="text-[#00C9A7] tracking-[0.3em] text-sm font-bold uppercase mb-4 block">OPTIMIZATION PILLARS</span>
                    <h2 class="text-4xl md:text-6xl text-white font-light">Dominating <span class="text-gray-500 italic">Search Real Estate</span></h2>
                </div>

                <!-- Waterfall Cards (vertical cascade, NOT 2x2 grid) -->
                <div class="flex flex-col gap-8 max-w-4xl mx-auto">
                    <!-- Card 1 -->
                    <div class="seo-showcase-card bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group flex gap-8 items-start" style="border-left: 3px solid rgba(0, 201, 167, 0.4);">
                        <div class="flex-shrink-0 w-14 h-14 rounded-full border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        </div>
                        <div>
                            <h3 class="text-2xl text-white font-medium mb-3">{{ $t('services_inner.seo.acc1_name') }}</h3>
                            <p class="text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.acc1_p1') }}</p>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="seo-showcase-card bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group flex gap-8 items-start" style="border-left: 3px solid rgba(0, 201, 167, 0.5);">
                        <div class="flex-shrink-0 w-14 h-14 rounded-full border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </div>
                        <div>
                            <h3 class="text-2xl text-white font-medium mb-3">{{ $t('services_inner.seo.acc2_name') }}</h3>
                            <p class="text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.acc2_p1') }}</p>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="seo-showcase-card bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group flex gap-8 items-start" style="border-left: 3px solid rgba(0, 201, 167, 0.6);">
                        <div class="flex-shrink-0 w-14 h-14 rounded-full border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        </div>
                        <div>
                            <h3 class="text-2xl text-white font-medium mb-3">{{ $t('services_inner.seo.acc3_name') }}</h3>
                            <p class="text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.acc3_p1') }}</p>
                        </div>
                    </div>

                    <!-- Card 4 -->
                    <div class="seo-showcase-card bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group flex gap-8 items-start" style="border-left: 3px solid rgba(0, 201, 167, 0.7);">
                        <div class="flex-shrink-0 w-14 h-14 rounded-full border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <div>
                            <h3 class="text-2xl text-white font-medium mb-3">{{ $t('services_inner.seo.acc4_name') }}</h3>
                            <p class="text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.acc4_p1') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </div><!-- end perspective wrapper -->

        <!-- Horizontal Gradient Wipe overlay (showcase→process transition) -->
        <div class="seo-wipe-overlay fixed inset-0 z-[50] pointer-events-none" style="background: linear-gradient(to right, #050505 50%, transparent 50%); display: none;"></div>

        <!-- Process & CTA Transformation Container -->
        <div class="seo-transformation-container relative bg-[#050505] overflow-hidden">

            <!-- 4. Process — Vertical Timeline with Drawing Line -->
            <section class="seo-process-section relative pt-48 pb-64 z-10">
            <div class="container relative z-10 px-6 max-w-5xl mx-auto">
                <div class="text-center mb-32 seo-process-header">
                    <h2 class="text-4xl md:text-6xl text-gray-400 font-light mb-6">
                        {{ $t('services_inner.process_title1') }} <span class="text-white">{{ $t('services_inner.process_title2') }}</span>
                    </h2>
                    <p class="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto" v-html="$t('services_inner.seo.prices_desc')"></p>
                </div>

                <!-- Timeline Layout -->
                <div class="relative">
                    <!-- Central Drawing Line -->
                    <div class="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block">
                        <div class="seo-timeline-line w-full h-full bg-[#00C9A7]/40 origin-top" style="transform: scaleY(0);"></div>
                    </div>

                    <div class="flex flex-col gap-24">
                        <!-- Step 1 (left) -->
                        <div class="seo-timeline-card md:grid md:grid-cols-2 md:gap-16 items-center">
                            <div class="bg-[#111] border border-white/5 rounded-[2rem] p-10 md:p-12 relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-br from-[#00C9A7]/5 to-transparent pointer-events-none"></div>
                                <div class="relative z-10">
                                    <span class="text-[#00C9A7] tracking-[0.3em] text-sm font-bold uppercase mb-4 block">{{ $t('services_inner.step1') }}</span>
                                    <div class="text-6xl font-[100] text-white/10 leading-none mb-4">01</div>
                                    <h4 class="text-2xl md:text-3xl text-white font-medium mb-4 leading-tight" v-html="$t('services_inner.seo.step1_title')"></h4>
                                    <p class="text-lg text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step1_desc') }}</p>
                                </div>
                            </div>
                            <div class="hidden md:block"></div>
                        </div>

                        <!-- Step 2 (right) -->
                        <div class="seo-timeline-card md:grid md:grid-cols-2 md:gap-16 items-center">
                            <div class="hidden md:block"></div>
                            <div class="bg-[#131313] border border-white/5 rounded-[2rem] p-10 md:p-12 relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-bl from-[#00C9A7]/8 to-transparent pointer-events-none"></div>
                                <div class="relative z-10">
                                    <span class="text-[#00C9A7] tracking-[0.3em] text-sm font-bold uppercase mb-4 block">{{ $t('services_inner.step2') }}</span>
                                    <div class="text-6xl font-[100] text-white/10 leading-none mb-4">02</div>
                                    <h4 class="text-2xl md:text-3xl text-white font-medium mb-4 leading-tight" v-html="$t('services_inner.seo.step2_title')"></h4>
                                    <p class="text-lg text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step2_desc') }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3 (left) -->
                        <div class="seo-timeline-card md:grid md:grid-cols-2 md:gap-16 items-center">
                            <div class="bg-[#161616] border border-[#00C9A7]/15 rounded-[2rem] p-10 md:p-12 relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-br from-[#00C9A7]/10 to-transparent pointer-events-none"></div>
                                <div class="relative z-10">
                                    <span class="text-[#00C9A7] tracking-[0.3em] text-sm font-bold uppercase mb-4 block">{{ $t('services_inner.step3') }}</span>
                                    <div class="text-6xl font-[100] text-white/10 leading-none mb-4">03</div>
                                    <h4 class="text-2xl md:text-3xl text-white font-medium mb-4 leading-tight" v-html="$t('services_inner.seo.step3_title')"></h4>
                                    <p class="text-lg text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step3_desc') }}</p>
                                </div>
                            </div>
                            <div class="hidden md:block"></div>
                        </div>

                        <!-- Step 4 (right) -->
                        <div class="seo-timeline-card md:grid md:grid-cols-2 md:gap-16 items-center">
                            <div class="hidden md:block"></div>
                            <div class="bg-[#1a1a1a] border border-[#00C9A7]/25 rounded-[2rem] p-10 md:p-12 relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-bl from-[#00C9A7]/15 to-transparent pointer-events-none"></div>
                                <div class="relative z-10">
                                    <span class="text-[#00C9A7] tracking-[0.3em] text-sm font-bold uppercase mb-4 block">{{ $t('services_inner.step4') }}</span>
                                    <div class="text-6xl font-[100] text-white/10 leading-none mb-4">04</div>
                                    <h4 class="text-2xl md:text-3xl text-white font-medium mb-4 leading-tight" v-html="$t('services_inner.seo.step4_title')"></h4>
                                    <p class="text-lg text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step4_desc') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            <!-- 5. CTA — Morphing Entrance -->
            <section class="seo-cta-section absolute bottom-0 left-0 w-full h-screen flex items-center justify-center z-20 opacity-0 pointer-events-none">
                <div class="seo-cta-wrapper w-full max-w-[95vw] h-[80vh] rounded-[3rem] overflow-hidden relative flex flex-col items-center justify-center text-center px-6">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <h2 class="relative z-10 text-white text-5xl md:text-8xl font-medium tracking-tight mb-8 max-w-4xl">
                        Ready to elevate your <span class="italic text-[#00C9A7]/80">search rankings</span>?
                    </h2>
                    <NuxtLink :to="localePath('/contact')" class="seo-cta-button relative z-10 bg-[#00C9A7] text-black px-10 py-5 rounded-full text-xl font-medium hover:scale-105 transition-transform" style="opacity: 0; transform: scale(0.5);">
                        {{ $t('services_inner.individual_meeting') }}
                    </NuxtLink>
                </div>
            </section>
            
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useHead, useLocalePath } from '#imports';

const localePath = useLocalePath();

useHead({
  title: 'Search Engine Optimization | Apex Digital',
  meta: [
    { name: 'description', content: 'Comprehensive SEO and growth strategies.' }
  ]
});

// Word-by-word text splitter (unique to SEO page — DM uses char-by-char)
function splitTextToWords(element) {
    if (!element) return;
    const text = element.innerText;
    element.innerHTML = '';

    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'seo-word-animate';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(80px)';
        wordSpan.innerText = word;
        element.appendChild(wordSpan);

        if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            space.style.display = 'inline-block';
            element.appendChild(space);
        }
    });
}

let ctx;
let pollingInterval;

onMounted(() => {
    pollingInterval = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(pollingInterval);
            initGSAPAnimations(window.gsap, window.ScrollTrigger);
        }
    }, 50);
});

function initGSAPAnimations(gsap, ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.wake();
    gsap.ticker.lagSmoothing(0);

    // Prepare word-level text splitting
    document.querySelectorAll('.seo-huge-text .split-line').forEach(splitTextToWords);

    nextTick(() => {
        setTimeout(() => {
            ctx = gsap.context(() => {

                // --- 1. Hero: Word-by-Word Reveal ---
                const heroTl = gsap.timeline();

                // Parallax shift on bg (NOT zoom like DM)
                gsap.to('.seo-hero-bg', {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.seo-hero-section',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1
                    }
                });

                heroTl.to('.seo-hero-section .seo-word-animate', {
                    y: 0, opacity: 1,
                    duration: 0.8, ease: "power3.out",
                    stagger: 0.12,
                    force3D: true
                }).fromTo('.seo-fade-up',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.2 },
                    "-=0.6"
                );

                // Counter tickers
                document.querySelectorAll('.seo-counter').forEach((counter) => {
                    const target = parseFloat(counter.dataset.target);
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: target,
                        duration: 2.5,
                        delay: 0.8,
                        ease: "power1.out",
                        onUpdate: () => {
                            if (target >= 10) {
                                counter.textContent = obj.val.toFixed(1);
                            } else if (target > 1) {
                                counter.textContent = obj.val.toFixed(1) + 'x';
                            } else {
                                counter.textContent = '#' + Math.round(obj.val);
                            }
                        }
                    });
                });

                // --- T1: Hero → Approach — Clip-Path Circle Expand ---
                gsap.fromTo('.seo-approach-section',
                    { clipPath: "circle(0% at 50% 0%)" },
                    {
                        clipPath: "circle(150% at 50% 0%)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".seo-approach-section",
                            start: "top 100%",
                            end: "top 20%",
                            scrub: 1
                        }
                    }
                );

                // --- 2. Approach: Horizontal Split-Screen Slide-In ---
                const approachTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".seo-approach-section",
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                });

                approachTl
                    .fromTo('.seo-approach-image',
                        { xPercent: -100, opacity: 0 },
                        { xPercent: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
                    )
                    .fromTo('.seo-approach-text',
                        { xPercent: 50, opacity: 0 },
                        { xPercent: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
                        "-=1"
                    )
                    .fromTo('.seo-stagger-text',
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out" },
                        "-=0.6"
                    );

                // --- T2: Approach → Showcase — 3D Perspective Tilt ---
                gsap.to('.seo-approach-section', {
                    rotateX: -8,
                    opacity: 0.3,
                    scale: 0.95,
                    transformOrigin: "center bottom",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".seo-approach-section",
                        start: "bottom 80%",
                        end: "bottom 20%",
                        scrub: 1
                    }
                });

                gsap.fromTo('.seo-showcase-section',
                    { rotateX: 8, transformOrigin: "center top" },
                    {
                        rotateX: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".seo-showcase-section",
                            start: "top 100%",
                            end: "top 50%",
                            scrub: 1
                        }
                    }
                );

                // --- 3. Showcase: Stagger Cascade Waterfall ---
                gsap.fromTo('.seo-showcase-header',
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".seo-showcase-section",
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                gsap.fromTo('.seo-showcase-card',
                    { xPercent: 60, opacity: 0, rotateY: -15 },
                    {
                        xPercent: 0, opacity: 1, rotateY: 0,
                        duration: 1, ease: "power3.out",
                        stagger: { each: 0.2, from: "start" },
                        scrollTrigger: {
                            trigger: ".seo-showcase-section",
                            start: "top 65%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // --- T3: Showcase → Process — Horizontal Gradient Wipe ---
                // Using a simpler approach: the process header fades in with a horizontal clip
                gsap.fromTo('.seo-process-section',
                    { clipPath: "inset(0 100% 0 0)" },
                    {
                        clipPath: "inset(0 0% 0 0)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".seo-process-section",
                            start: "top 100%",
                            end: "top 50%",
                            scrub: 1
                        }
                    }
                );

                // --- 4. Process: Vertical Timeline ---
                // Header entrance
                gsap.fromTo('.seo-process-header',
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: ".seo-process-section",
                            start: "top 75%",
                        }
                    }
                );

                // Timeline line draw
                gsap.to('.seo-timeline-line', {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".seo-process-section",
                        start: "top 60%",
                        end: "bottom 60%",
                        scrub: 1
                    }
                });

                // Alternating timeline cards
                gsap.utils.toArray('.seo-timeline-card').forEach((card, i) => {
                    const fromX = i % 2 === 0 ? -60 : 60;
                    gsap.fromTo(card,
                        { x: fromX, opacity: 0 },
                        {
                            x: 0, opacity: 1,
                            duration: 0.8, ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });

                // --- 5. Transformation: Process -> CTA ---
                const transformTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".seo-transformation-container",
                        start: "bottom bottom", // Wait until the end of the timeline
                        end: "+=150%", // How long the scrub animation lasts
                        pin: true,
                        scrub: 1
                    }
                });

                transformTl
                    // 1. Process section moves up, fades out, and scales down
                    .to('.seo-process-section', {
                        y: -50,
                        opacity: 0,
                        scale: 0.95,
                        duration: 1,
                        ease: "power2.inOut"
                    })
                    // 3. Make CTA interactable as soon as animation starts
                    .set('.seo-cta-section', {
                        pointerEvents: "auto"
                    }, "<")
                    // 4. Fade in CTA wrapper
                    .to('.seo-cta-section', {
                        opacity: 1,
                        duration: 0.5
                    }, "<0.2") // Start slightly after Process fade out begins
                    // 5. Scale up CTA wrapper
                    .fromTo('.seo-cta-wrapper',
                        { scale: 0.8, y: 50 },
                        { scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
                        "<"
                    )
                    // 6. Pop the CTA button elastically
                    .to('.seo-cta-button', {
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: "elastic.out(1.2, 0.4)"
                    }, "-=0.5");

                ScrollTrigger.refresh();
            }); // End context
        }, 100);
    });
}

onUnmounted(() => {
    if (pollingInterval) clearInterval(pollingInterval);
    if (ctx) ctx.revert();
});
</script>

<style scoped>
.split-line {
  overflow: hidden;
}
.seo-word-animate {
  will-change: transform, opacity;
}
.seo-grid-overlay {
  background-image:
    linear-gradient(rgba(0, 201, 167, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 201, 167, 0.3) 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>
