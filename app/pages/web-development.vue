<template>
  <main class="bg-[#0a0a0a] min-h-screen text-white overflow-hidden">
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">

        <!-- 1. Cinematic Hero Section with Geometric Canvas -->
        <section class="wd-hero-section relative min-h-screen flex items-center justify-center overflow-hidden mil-banner mil-dark-bg">
            <!-- Geometric Background Layer -->
            <div class="absolute inset-0 z-0 wd-hero-bg opacity-40">
                <div class="mi-invert-fix">
                    <div class="mil-animation-frame">
                        <div class="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6"></div>
                        <div class="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1"></div>
                        <div class="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1"></div>
                    </div>
                </div>
                <!-- Gradient Overlay for Contrast -->
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-10 pointer-events-none"></div>
            </div>
            
            <div class="container relative z-20 px-6 md:px-12 text-center pt-32">
                <ul class="flex justify-center gap-4 text-sm text-gray-400 mb-8 wd-fade-up">
                    <li><NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
                    <li>/</li>
                    <li><NuxtLink :to="localePath('/services')" class="hover:text-white transition-colors">{{ $t('nav.services') }}</NuxtLink></li>
                    <li>/</li>
                    <li class="text-white">{{ $t('nav.webdev') }}</li>
                </ul>
                <h1 class="wd-huge-text text-white text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
                    <span class="block split-line">{{ $t('services_inner.webdev.banner1') }}</span>
                    <span class="block split-line font-light text-gray-400">{{ $t('services_inner.webdev.banner2') }} <span class="text-white">{{ $t('services_inner.webdev.banner3') }}</span></span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed wd-fade-up">
                    {{ $t('services_inner.webdev.approach_desc') }}
                </p>
            </div>
        </section>

        <!-- 2. Typography Approach Reveal (Masking) -->
        <section class="wd-approach-section relative py-32 bg-white text-black dark:bg-[#0a0a0a] dark:text-white rounded-t-[3rem] -mt-10 z-30">
            <div class="container px-6 md:px-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="wd-mask-container relative h-[500px] md:h-[700px] w-full overflow-hidden rounded-[2rem]">
                        <div class="wd-mask-overlay absolute inset-0 bg-white dark:bg-[#0a0a0a] z-10 origin-bottom"></div>
                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" class="w-full h-full object-cover scale-125 wd-mask-img" alt="Strategy" />
                    </div>
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
        </section>

        <!-- 3. Pinned Horizontal Services -->
        <section class="wd-horizontal-section relative h-screen bg-[#111] overflow-hidden">
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

        <!-- 4. Process Sequence (GSAP Accordions) -->
        <section class="wd-pricing-section relative pt-48 pb-32 bg-[#050505] overflow-hidden">
            <div class="container relative z-10 px-6 max-w-5xl mx-auto">
                <div class="text-center mb-24 wd-pricing-header">
                    <h2 class="text-4xl md:text-6xl text-gray-400 font-light mb-6">
                        {{ $t('services_inner.process_title1') }} <span class="text-white">{{ $t('services_inner.process_title2') }}</span>
                    </h2>
                    <p class="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto" v-html="$t('services_inner.webdev.prices_desc')"></p>
                </div>

                <div class="flex flex-col gap-8">
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

        <!-- 5. Cinematic Footer CTA -->
        <section class="wd-cta-section relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden pt-32 pb-32">
            <div class="wd-cta-wrapper w-full max-w-[95vw] h-[80vh] rounded-[3rem] overflow-hidden relative flex flex-col items-center justify-center text-center px-6">
                <!-- Using a code-themed background for Web Dev CTA -->
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-50" />
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

const activeIndex = ref(-1);

const toggleDropdown = (index) => {
    // Only run if GSAP is ready
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
        
        const chars = word.split('');
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char-animate block opacity-0 translate-y-[100px]';
            charSpan.style.display = 'inline-block'; 
            charSpan.style.transformOrigin = '0% 50%';
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

// Variables for GSAP cleanup
let pollingInterval;
let ctx;

onMounted(() => {
    // We must wait for `window.gsap` & `window.ScrollTrigger` from the generic script tag injection
    const checkGSAP = () => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(pollingInterval);
            initGSAP();
        }
    };
    pollingInterval = setInterval(checkGSAP, 50);

    // Also trigger global generic refresh if it exists
    if (window.refreshScrollAnimations) {
        window.refreshScrollAnimations();
    }
});

onUnmounted(() => {
    if (pollingInterval) clearInterval(pollingInterval);
    if (ctx) ctx.revert(); 
});

function initGSAP() {
    // Enforce ScrollTrigger refresh
    window.ScrollTrigger.refresh();

    nextTick(() => {
        // Create a GSAP Context for safe cleanup
        ctx = window.gsap.context(() => {

            // --- 1. Hero Text Reveal & Parallax ---
            document.querySelectorAll('.split-line').forEach(el => splitTextToChars(el));
            
            const heroTl = window.gsap.timeline();
            heroTl.to('.char-animate', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.02,
                ease: 'expo.out'
            })
            .fromTo('.wd-fade-up', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 },
                "-=0.8"
            );

            // Let the geometric shapes do their thing via existing CSS/old JS overrides,
            // but we can ensure the wd-hero-bg shifts on scroll
            window.gsap.to('.wd-hero-bg', {
                yPercent: 30, // move down slightly to create parallax
                ease: "none",
                scrollTrigger: {
                    trigger: ".wd-hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // --- 2. Approach Mask Reveal ---
            const approachTl = window.gsap.timeline({
                scrollTrigger: {
                    trigger: ".wd-approach-section",
                    start: "top 70%",
                }
            });

            approachTl.to('.wd-mask-overlay', {
                scaleY: 0,
                duration: 1.5,
                ease: 'expo.inOut'
            })
            .fromTo('.wd-mask-img', 
                { scale: 1.2 }, 
                { scale: 1, duration: 1.5, ease: 'power2.out' }, 
                "-=1.5"
            )
            .fromTo('.wd-stagger-text', 
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
                "-=1"
            );

            // --- 3. Pinned Horizontal Services ---
            const horizontalScroll = window.gsap.to('.wd-horizontal-container', {
                xPercent: -75, // Move left based on width (400vw total = 3 panels hidden = -75%)
                ease: "none",
                scrollTrigger: {
                    trigger: ".wd-horizontal-section",
                    start: "top top",
                    end: "+=3000", // The amount of scrolling needed
                    pin: true,
                    scrub: 1
                }
            });

            // --- 4. Process Sequence Cards ---
            const pricingTl = window.gsap.timeline({
                scrollTrigger: {
                    trigger: ".wd-pricing-section",
                    start: "top 70%",
                }
            });

            pricingTl.fromTo('.wd-pricing-header', 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
            ).fromTo('.wd-process-dropdown',
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)', stagger: 0.2 },
                "-=0.5"
            );

            // --- 5. Cinematic Footer CTA ---
            const ctaTl = window.gsap.timeline({
                scrollTrigger: {
                    trigger: ".wd-cta-section",
                    start: "top 80%",
                }
            });

            ctaTl.fromTo('.wd-cta-wrapper',
                { scale: 0.9, filter: "blur(10px)" },
                { scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
            );

        }); // end context
    });
}
</script>

<style scoped>
/* Preserve smooth font rendering, overrides and masks */
.wd-huge-text {
    font-family: "Clash Display", sans-serif; /* Adjust to project font if different */
}
.wd-mask-container {
    mask-image: radial-gradient(white, black);
    -webkit-mask-image: -webkit-radial-gradient(white, black);
}
</style>
