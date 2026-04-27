<template>
  <main class="services-hub-wrapper min-h-screen bg-[#050505]">
    
    <!-- 1. Massive Typography Hero -->
    <section class="services-hero h-[80vh] md:h-screen flex flex-col justify-center items-center relative z-10 pt-20 px-6">
        <ul class="mil-breadcrumbs mil-light mil-mb-60 absolute top-32 md:top-40">
            <li><NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink></li>
            <li><a class="cursor-default">{{ $t('nav.services') }}</a></li>
        </ul>
        
        <div class="text-center mt-10 md:mt-20">
            <h1 class="services-hero-title text-5xl md:text-[8rem] lg:text-[10rem] leading-[0.9] font-[100] text-white tracking-tighter uppercase mx-auto" style="color: white !important;">
                <span class="block overflow-hidden pb-4"><span class="inline-block title-line">{{ $t('services_page.title_part1') }} <span class="font-bold text-primary">{{ $t('services_page.title_part2') }}</span></span></span>
                <span class="block overflow-hidden pb-4 mil-thin"><span class="inline-block title-line">{{ $t('services_page.title_part3') }} <span class="font-bold">{{ $t('services_page.title_part4') }}</span></span></span>
            </h1>
        </div>
        
        <div class="scroll-indicator absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-4">
             <span class="text-xs tracking-widest uppercase text-gray-500">Explore Services</span>
             <div class="w-[1px] h-12 md:h-16 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
    </section>

    <!-- 2. Fullscreen Stacking Service Panels -->
    <div class="services-stack-container relative w-full">
        
        <!-- Panel 1: Web Development -->
        <section class="stack-panel panel-1 h-screen w-full relative overflow-hidden bg-[#0A0A0A] z-10 flex items-center shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
            <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" class="w-full h-full object-cover opacity-10 filter grayscale scale-110 panel-bg" alt="Web Development" />
                <div class="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent"></div>
            </div>
            <div class="container relative z-10 px-6 md:px-20 mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="panel-content">
                        <div class="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">01.</div>
                        <h2 class="text-5xl md:text-7xl lg:text-8xl font-[100] text-white leading-none mb-6 md:mb-8" v-html="$t('services_page.web_dev.title')"></h2>
                        <p class="text-lg md:text-2xl text-gray-400 font-light mb-8 md:mb-10 max-w-xl">{{ $t('services_page.web_dev.desc') }}</p>
                        
                        <ul class="space-y-4 mb-10 md:mb-12">
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.web_dev.f1') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.web_dev.f2') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.web_dev.f3') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.web_dev.f4') }}</li>
                        </ul>
                        
                        <NuxtLink :to="localePath('/web-development')" class="mil-button mil-arrow-place px-8 py-4 md:px-10 md:py-5">
                            <span>{{ $t('services_page.btn_read_more') }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Panel 2: SEO -->
        <section class="stack-panel panel-2 h-screen w-full relative overflow-hidden bg-[#111111] z-20 flex items-center shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
             <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-10 filter grayscale scale-110 panel-bg" alt="SEO" />
                <div class="absolute inset-0 bg-gradient-to-l from-[#111111] via-[#111111]/90 to-transparent"></div>
            </div>
            <div class="container relative z-10 px-6 md:px-20 mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="hidden lg:block"></div> <!-- Spacer for alternating layout -->
                    <div class="panel-content text-left lg:text-right">
                        <div class="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">02.</div>
                        <h2 class="text-5xl md:text-7xl lg:text-8xl font-[100] text-white leading-none mb-6 md:mb-8" v-html="$t('services_page.seo.title')"></h2>
                        <p class="text-lg md:text-2xl text-gray-400 font-light mb-8 md:mb-10 lg:ml-auto max-w-xl">{{ $t('services_page.seo.desc') }}</p>
                        
                        <ul class="space-y-4 mb-10 md:mb-12 flex flex-col lg:items-end">
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary lg:order-last"></span>{{ $t('services_page.seo.f1') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary lg:order-last"></span>{{ $t('services_page.seo.f2') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary lg:order-last"></span>{{ $t('services_page.seo.f3') }}</li>
                        </ul>
                        
                        <NuxtLink :to="localePath('/seo')" class="mil-button mil-arrow-place px-8 py-4 md:px-10 md:py-5">
                            <span>{{ $t('services_page.btn_read_more') }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Panel 3: Digital Marketing -->
        <section class="stack-panel panel-3 h-screen w-full relative overflow-hidden bg-[#050505] z-30 flex items-center shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
            <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" class="w-full h-full object-cover opacity-10 filter grayscale scale-110 panel-bg" alt="Digital Marketing" />
                <div class="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent"></div>
            </div>
            <div class="container relative z-10 px-6 md:px-20 mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="panel-content">
                        <div class="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">03.</div>
                        <h2 class="text-5xl md:text-7xl lg:text-8xl font-[100] text-white leading-none mb-6 md:mb-8" v-html="$t('services_page.marketing.title')"></h2>
                        <p class="text-lg md:text-2xl text-gray-400 font-light mb-8 md:mb-10 max-w-xl">{{ $t('services_page.marketing.desc') }}</p>
                        
                        <ul class="space-y-4 mb-10 md:mb-12">
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.marketing.f1') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.marketing.f2') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.marketing.f3') }}</li>
                            <li class="flex items-center gap-4 text-white/80 text-sm md:text-base"><span class="w-2 h-2 rounded-full bg-primary"></span>{{ $t('services_page.marketing.f4') }}</li>
                        </ul>
                        
                        <NuxtLink :to="localePath('/digital-marketing')" class="mil-button mil-arrow-place px-8 py-4 md:px-10 md:py-5">
                            <span>{{ $t('services_page.btn_read_more') }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

    </div>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import { useLocalePath } from '#imports';

const localePath = useLocalePath();
let ctx;

onMounted(() => {
    // Wait for GSAP and ScrollTrigger to attach to window
    const gsWaitInterval = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(gsWaitInterval);
            initServicesGSAP(window.gsap, window.ScrollTrigger);
        }
    }, 50);
});

function initServicesGSAP(gsap, ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    
    // Global defaults for performance
    gsap.defaults({ lazy: false });
    gsap.ticker.wake();
    gsap.ticker.lagSmoothing(0);
    
    nextTick(() => {
        setTimeout(() => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                ctx = gsap.context(() => {
                    
                    // 1. Hero Entrance Animation
                    const heroLines = document.querySelectorAll('.title-line');
                    const heroTl = gsap.timeline();
                    
                    heroTl.fromTo(heroLines, 
                        { y: 150, opacity: 0, rotateZ: 5, transformOrigin: "left center" },
                        { y: 0, opacity: 1, rotateZ: 0, duration: 1.5, stagger: 0.15, ease: "power4.out" }
                    )
                    .to('.scroll-indicator', { opacity: 1, y: -20, duration: 1, ease: 'power2.out' }, "-=0.5");

                    // 2. Fullscreen Stacking Panels
                    const panels = gsap.utils.toArray('.stack-panel');
                    
                    panels.forEach((panel, i) => {
                        // For all panels except the last one, we pin them
                        if (i < panels.length - 1) {
                            ScrollTrigger.create({
                                trigger: panel,
                                start: "top top",
                                pin: true,
                                pinSpacing: false,
                                scrub: true
                            });
                        }
                        
                        // Entrance animation for content inside the panel
                        const content = panel.querySelector('.panel-content');
                        const bg = panel.querySelector('.panel-bg');
                        
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 60%",
                                toggleActions: "play none none reverse"
                            }
                        });

                        tl.fromTo(bg, 
                            { scale: 1.2, filter: "grayscale(100%) brightness(0.3)" },
                            { scale: 1, filter: "grayscale(70%) brightness(0.8)", duration: 2.5, ease: "power2.out" }
                        )
                        .fromTo(content,
                            { y: 120, opacity: 0, skewY: 2 },
                            { y: 0, opacity: 1, duration: 1.5, skewY: 0, ease: "power4.out" },
                            "<0.2"
                        );
                    });

                    ScrollTrigger.refresh();
                });
            });

            mm.add("(max-width: 767px)", () => {
                // Simplified mobile animations
                gsap.fromTo('.title-line', 
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.1 }
                );
                gsap.utils.toArray('.stack-panel').forEach(panel => {
                    gsap.fromTo(panel.querySelector('.panel-content'), 
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });
            });
        }, 100);
    });
}

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>

<style scoped>
    /* Hide animated elements immediately via CSS to prevent flash */
    .title-line {
        opacity: 0;
        transform: translateY(150px);
    }
    .panel-content {
        opacity: 0;
        transform: translateY(120px);
    }
    .scroll-indicator {
        opacity: 0;
    }
    
    .title-line,
    .panel-content,
    .panel-bg {
        will-change: transform, opacity;
        backface-visibility: hidden;
    }
</style>
