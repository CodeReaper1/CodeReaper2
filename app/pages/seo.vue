<template>
  <main class="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">

        <!-- 1. Cinematic Hero Section -->
        <section class="dm-hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Background Parallax Image -->
            <div class="absolute inset-0 z-0 dm-hero-bg">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" class="w-full h-full object-cover opacity-30" alt="SEO Strategy" />
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
            </div>
            
            <div class="container relative z-10 px-6 md:px-12 text-center pt-32">
                <ul class="flex justify-center gap-4 text-sm text-gray-400 mb-8 dm-fade-up">
                    <li><NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
                    <li>/</li>
                    <li><NuxtLink :to="localePath('/services')" class="hover:text-white transition-colors">{{ $t('nav.services') }}</NuxtLink></li>
                    <li>/</li>
                    <li class="text-white">{{ $t('nav.seo') }}</li>
                </ul>
                <h1 class="dm-huge-text text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
                    <span class="block split-line" style="color: white !important;">{{ $t('services_inner.seo.banner1') }}</span>
                    <span class="block split-line font-light text-gray-400">{{ $t('services_inner.seo.banner2') }}</span>
                </h1>
                <p class="dm-fade-up text-xl md:text-3xl font-light !text-gray-300 max-w-3xl mx-auto mt-8">
                    {{ $t('services_inner.seo.approach3') }} {{ $t('services_inner.seo.banner3') }}
                </p>
            </div>
        </section>

        <!-- 2. Typography Approach Reveal (Masking) -->
        <section class="dm-approach-section relative py-32 bg-white text-black dark:bg-[#0a0a0a] dark:text-white rounded-t-[3rem] -mt-10 z-20">
            <div class="container px-6 md:px-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="dm-mask-container relative h-[500px] md:h-[700px] w-full overflow-hidden rounded-[2rem]">
                        <div class="dm-mask-overlay absolute inset-0 bg-[#0a0a0a] z-10 origin-bottom"></div>
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover scale-125 dm-mask-img" alt="SEO Analytics" />
                    </div>
                    <div class="dm-approach-text">
                        <h2 class="text-4xl md:text-6xl text-black dark:!text-white font-medium tracking-tight mb-8 dm-stagger-text">
                            {{ $t('services_inner.seo.approach1') }} <br/>
                            <span class="font-light !text-gray-500">{{ $t('services_inner.seo.approach2') }}</span>
                        </h2>
                        <p class="text-xl md:text-2xl font-light !text-gray-500 dark:!text-gray-400 leading-relaxed mb-12 dm-stagger-text">
                            {{ $t('services_inner.seo.approach_desc') }}
                        </p>
                        <div class="dm-stagger-text">
                            <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center gap-4 text-lg border-b border-white pb-2 hover:text-gray-400 hover:border-gray-400 transition-all">
                                <span>{{ $t('services_inner.view_works') }}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transform -rotate-45"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. The Growth Matrix (GSAP Zoom-Through) replacing Accordions -->
        <section class="dm-matrix-section relative h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
            
            <!-- Background Ambient Glow -->
            <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div class="w-[50vw] h-[50vw] bg-[#FFA500]/5 rounded-full blur-[120px] mix-blend-screen opacity-50 dm-matrix-glow"></div>
            </div>

            <!-- Central Grid Wrapper -->
            <div class="dm-matrix-wrapper relative z-10 w-full max-w-7xl px-6">
                
                <div class="text-center mb-16 dm-matrix-titles">
                    <span class="text-[#FFA500] tracking-[0.3em] text-sm font-bold uppercase mb-4 block">OPTIMIZATION MATRIX</span>
                    <h2 class="text-4xl md:text-6xl text-white font-light">Dominating <span class="text-gray-500 italic">Search Real Estate</span></h2>
                </div>

                <!-- 2x2 Responsive Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 dm-matrix-grid relative">
                    
                    <!-- Center Logo / Anchor (Optional, but looks cool) -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20 dm-matrix-center-orb">
                        <div class="bg-[#111] border border-[#FFA500]/30 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,165,0,0.1)] backdrop-blur-md">
                            <span class="text-white font-bold text-xl tracking-tighter">SEO</span>
                        </div>
                    </div>

                    <!-- Card 1: Top Left -->
                    <div class="dm-matrix-card dm-card-1 bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="w-12 h-12 rounded-full border border-[#FFA500]/30 flex items-center justify-center mb-6 text-[#FFA500]">
                            <!-- Target Icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        </div>
                        <h3 class="text-2xl text-white font-medium mb-4">{{ $t('services_inner.seo.acc1_name') }}</h3>
                        <p class="text-gray-400 font-light">{{ $t('services_inner.seo.acc1_p1') }}</p>
                    </div>

                    <!-- Card 2: Top Right -->
                    <div class="dm-matrix-card dm-card-2 bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group">
                        <div class="absolute inset-0 bg-gradient-to-bl from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="w-12 h-12 rounded-full border border-[#FFA500]/30 flex items-center justify-center mb-6 text-[#FFA500]">
                            <!-- Network Icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </div>
                        <h3 class="text-2xl text-white font-medium mb-4">{{ $t('services_inner.seo.acc2_name') }}</h3>
                        <p class="text-gray-400 font-light">{{ $t('services_inner.seo.acc2_p1') }}</p>
                    </div>

                    <!-- Card 3: Bottom Left -->
                    <div class="dm-matrix-card dm-card-3 bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group">
                        <div class="absolute inset-0 bg-gradient-to-tr from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="w-12 h-12 rounded-full border border-[#FFA500]/30 flex items-center justify-center mb-6 text-[#FFA500]">
                            <!-- Code/Tech Icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        </div>
                        <h3 class="text-2xl text-white font-medium mb-4">{{ $t('services_inner.seo.acc3_name') }}</h3>
                        <p class="text-gray-400 font-light">{{ $t('services_inner.seo.acc3_p1') }}</p>
                    </div>

                    <!-- Card 4: Bottom Right -->
                    <div class="dm-matrix-card dm-card-4 bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform-gpu relative overflow-hidden group">
                        <div class="absolute inset-0 bg-gradient-to-tl from-[#FFA500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="w-12 h-12 rounded-full border border-[#FFA500]/30 flex items-center justify-center mb-6 text-[#FFA500]">
                            <!-- Map Pin Icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <h3 class="text-2xl text-white font-medium mb-4">{{ $t('services_inner.seo.acc4_name') }}</h3>
                        <p class="text-gray-400 font-light">{{ $t('services_inner.seo.acc4_p1') }}</p>
                    </div>

                </div>
            </div>
        </section>

        <!-- 4. Process Stacking Sequence -->
        <section class="dm-pricing-section relative pt-48 pb-64 bg-[#050505] overflow-visible">
            <div class="container relative z-10 px-6 max-w-5xl mx-auto">
                <div class="text-center mb-32 dm-pricing-header">
                    <h2 class="text-4xl md:text-6xl text-gray-400 font-light mb-6">
                        {{ $t('services_inner.process_title1') }} <span class="text-white">{{ $t('services_inner.process_title2') }}</span>
                    </h2>
                    <p class="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto" v-html="$t('services_inner.seo.prices_desc')"></p>
                </div>

                <div class="dm-cards-wrapper relative pb-[10vh]">
                    <!-- Step 1 -->
                    <div class="dm-stack-card sticky top-[10vh] w-full bg-[#111] border border-white/5 rounded-[2.5rem] p-10 md:p-16 shadow-2xl mb-[8vh] overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#FFA500]/5 to-transparent pointer-events-none"></div>
                        <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                            <div class="md:col-span-4 flex flex-col items-start border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                                <span class="text-[#FFA500] tracking-[0.3em] text-sm font-bold uppercase mb-4">{{ $t('services_inner.step1') }}</span>
                                <div class="text-7xl md:text-8xl font-[100] text-white/20 leading-none">01</div>
                            </div>
                            <div class="md:col-span-8">
                                <h4 class="text-3xl md:text-5xl text-white font-medium mb-6 leading-tight" v-html="$t('services_inner.seo.step1_title')"></h4>
                                <p class="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step1_desc') }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="dm-stack-card sticky top-[15vh] w-full bg-[#151515] border border-white/5 rounded-[2.5rem] p-10 md:p-16 shadow-2xl mb-[8vh] overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#FFA500]/10 to-transparent pointer-events-none"></div>
                        <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                             <div class="md:col-span-4 flex flex-col items-start border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                                <span class="text-[#FFA500] tracking-[0.3em] text-sm font-bold uppercase mb-4">{{ $t('services_inner.step2') }}</span>
                                <div class="text-7xl md:text-8xl font-[100] text-white/20 leading-none">02</div>
                            </div>
                            <div class="md:col-span-8">
                                <h4 class="text-3xl md:text-5xl text-white font-medium mb-6 leading-tight" v-html="$t('services_inner.seo.step2_title')"></h4>
                                <p class="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step2_desc') }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="dm-stack-card sticky top-[20vh] w-full bg-[#1a1a1a] border border-[#FFA500]/20 rounded-[2.5rem] p-10 md:p-16 shadow-2xl mb-[8vh] overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#FFA500]/15 to-transparent pointer-events-none"></div>
                        <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                             <div class="md:col-span-4 flex flex-col items-start border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                                <span class="text-[#FFA500] tracking-[0.3em] text-sm font-bold uppercase mb-4">{{ $t('services_inner.step3') }}</span>
                                <div class="text-7xl md:text-8xl font-[100] text-white/20 leading-none">03</div>
                            </div>
                            <div class="md:col-span-8">
                                <h4 class="text-3xl md:text-5xl text-white font-medium mb-6 leading-tight" v-html="$t('services_inner.seo.step3_title')"></h4>
                                <p class="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step3_desc') }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Step 4 -->
                    <div class="dm-stack-card sticky top-[25vh] w-full bg-[#1f1f1f] border border-[#FFA500]/30 rounded-[2.5rem] p-10 md:p-16 shadow-2xl mb-[0vh] overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#FFA500]/20 to-transparent pointer-events-none"></div>
                        <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                             <div class="md:col-span-4 flex flex-col items-start border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                                <span class="text-[#FFA500] tracking-[0.3em] text-sm font-bold uppercase mb-4">{{ $t('services_inner.step4') }}</span>
                                <div class="text-7xl md:text-8xl font-[100] text-white/20 leading-none">04</div>
                            </div>
                            <div class="md:col-span-8">
                                <h4 class="text-3xl md:text-5xl text-white font-medium mb-6 leading-tight" v-html="$t('services_inner.seo.step4_title')"></h4>
                                <p class="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">{{ $t('services_inner.seo.step4_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. Cinematic Footer CTA -->
        <section class="dm-cta-section relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden pt-32 pb-32">
            <div class="dm-cta-wrapper w-full max-w-[95vw] h-[80vh] rounded-[3rem] overflow-hidden relative flex flex-col items-center justify-center text-center px-6">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <h2 class="relative z-10 text-white text-5xl md:text-8xl font-medium tracking-tight mb-8 max-w-4xl">
                    Ready to elevate your <span class="italic text-gray-300">search rankings</span>?
                </h2>
                <NuxtLink :to="localePath('/contact')" class="relative z-10 bg-white text-black px-10 py-5 rounded-full text-xl font-medium hover:scale-105 transition-transform">
                    {{ $t('services_inner.individual_meeting') }}
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



useHead({
  title: 'Search Engine Optimization | Apex Digital',
  meta: [
    { name: 'description', content: 'Comprehensive SEO and growth strategies.' }
  ]
});

// Helper for splitting text
function splitTextToChars(element) {
    if (!element) return;
    const text = element.innerText;
    element.innerHTML = '';
    
    // Split text into words to preserve word wrapping
    const words = text.split(' ');
    
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';
        
        // Split word into characters
        const chars = word.split('');
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char-animate block opacity-0 translate-y-[100px] !text-white';
            // Important for transforms on inline elements
            charSpan.style.display = 'inline-block'; 
            charSpan.style.transformOrigin = '0% 50%';
            charSpan.innerText = char;
            wordSpan.appendChild(charSpan);
        });
        
        element.appendChild(wordSpan);
        
        // Add a space after each word except the last one
        if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.innerHTML = '&nbsp;';
            spaceSpan.style.display = 'inline-block';
            element.appendChild(spaceSpan);
        }
    });
}

let ctx;

onMounted(() => {
    // Robust SSR polling mechanism for GSAP
    const gsWaitInterval = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(gsWaitInterval);
            initGSAPAnimations(window.gsap, window.ScrollTrigger);
        }
    }, 50);
});

function initGSAPAnimations(gsap, ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.wake();
    gsap.ticker.lagSmoothing(0);

    // Prepare typography elements
    document.querySelectorAll('.dm-huge-text .split-line').forEach(splitTextToChars);

    nextTick(() => {
        setTimeout(() => {
            ctx = gsap.context(() => {
                
                // --- 1. Hero Reveal ---
                const heroTl = gsap.timeline();
                
                // Slow zoom on background
                gsap.to('.dm-hero-bg img', {
                    scale: 1.15,
                    duration: 20,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true
                });

                heroTl.fromTo('.dm-hero-section .char-animate',
                    { y: 150, opacity: 0, rotationZ: 10, scale: 0.8 },
                    { y: 0, opacity: 1, rotationZ: 0, scale: 1, duration: 1.2, ease: "back.out(1.2)", stagger: 0.03, force3D: true }
                ).fromTo('.dm-fade-up',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.2 },
                    "-=0.8"
                );

                // --- 2. Approach Reveal ---
                const approachTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".dm-approach-section",
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                approachTl.fromTo(".dm-mask-overlay",
                    { scaleY: 1 },
                    { scaleY: 0, duration: 1.5, ease: "power4.inOut" }
                )
                .fromTo(".dm-mask-img",
                    { scale: 1.3 },
                    { scale: 1, duration: 1.5, ease: "power4.out" }, "-=1.5"
                )
                .fromTo(".dm-stagger-text",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.15 }, "-=1"
                );

                // --- 3. The Growth Matrix (Assemble & Zoom) ---
                const matrixTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".dm-matrix-section",
                        pin: true,
                        scrub: 1, // Smooth scrolling physics
                        start: "top top",
                        end: "+=200%" // Pin for 2 viewport heights to handle both assembly and zoom out
                    }
                });

                // Phase 1: Assembly (Cards fly in from off-canvas to assemble grid)
                matrixTl.fromTo(".dm-card-1", { xPercent: -100, yPercent: -100, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, ease: "power2.out" }, 0)
                        .fromTo(".dm-card-2", { xPercent: 100, yPercent: -100, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, ease: "power2.out" }, 0)
                        .fromTo(".dm-card-3", { xPercent: -100, yPercent: 100, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, ease: "power2.out" }, 0)
                        .fromTo(".dm-card-4", { xPercent: 100, yPercent: 100, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, ease: "power2.out" }, 0)
                        // Also fade in the titles and center orb during assembly
                        .fromTo(".dm-matrix-titles, .dm-matrix-center-orb", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "back.out(1.2)" }, 0);

                // Pause slightly in the timeline so the assembled grid is readable
                matrixTl.to({}, { duration: 0.5 }); 

                // Phase 2: Zoom Through (Massive scale up and fade out to reveal next section)
                matrixTl.to(".dm-matrix-wrapper", {
                    scale: 5, // Huge scale to fly "through" the center
                    opacity: 0,
                    filter: "blur(20px)",
                    ease: "power3.in"
                });

                // --- 4. Process Stacking Sequence ---
                const processCards = gsap.utils.toArray('.dm-stack-card');
                
                // Header Entrance
                gsap.fromTo('.dm-pricing-header', 
                    { opacity: 0, y: 50 },
                    { 
                        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: ".dm-pricing-section",
                            start: "top 75%",
                        }
                    }
                );

                // Card Stacking Parallax/Scale Effect
                processCards.forEach((card, index) => {
                    // Entrance animation for each card
                    gsap.fromTo(card, 
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1, y: 0,
                            duration: 1, ease: 'power2.out',
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );

                    // If it's not the last card, animate its scale/blur as the user scrolls past it
                    if (index !== processCards.length - 1) {
                        gsap.to(card, {
                            scale: 0.92,
                            opacity: 0.3,
                            filter: "blur(6px)",
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 15%", // Start scaling when the card hits near the top
                                endTrigger: processCards[index + 1], // Finish scaling when the NEXT card hits near the top
                                end: "top 30%",
                                scrub: 1 // Add 1 second of momentum for super smooth playback
                            }
                        });
                    }
                });

                // --- 5. Cinematic Footer CTA ---
                gsap.fromTo(".dm-cta-wrapper",
                    { scale: 0.8, filter: "blur(10px)", borderRadius: "10rem" },
                    {
                        scale: 1,
                        filter: "blur(0px)",
                        borderRadius: "3rem",
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".dm-cta-section",
                            start: "top 85%",
                            end: "center center",
                            scrub: 1
                        }
                    }
                );

                ScrollTrigger.refresh();
            }); // End context
        }, 100);
    });
}

onUnmounted(() => {
    if (ctx) {
        ctx.revert(); // Cleanup GSAP
    }
});
</script>

<style scoped>
.split-line {
  overflow: hidden;
}
/* Ensure characters don't get clipped weirdly during rotation */
.char-animate {
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
}
</style>
