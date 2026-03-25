<template>
  <main>
    <!-- banner -->
    <section class="mil-banner mil-dark-bg">
        <div class="mi-invert-fix">
            <div class="mil-animation-frame">
                <div class="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6"></div>
                <div class="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1"></div>
                <div class="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1"></div>
            </div>

            <div class="mil-gradient"></div>

            <div class="container h-full flex flex-col justify-center items-center relative z-20 pt-20">
                <div class="mil-banner-content text-center w-full max-w-5xl mx-auto">
                    <!-- Brand Subtitle -->
                    <div class="mb-6 overflow-hidden">
                        <span class="inline-block text-[#FFA500] tracking-[0.4em] uppercase text-sm md:text-base font-bold hero-subtitle">
                           {{ $t('home.banner.title_main') }}
                        </span>
                    </div>

                    <!-- Massive GSAP SplitText Title -->
                    <h1 class="hp-hero-title text-5xl md:text-[7rem] lg:text-[9rem] font-[100] text-white leading-[0.9] tracking-tighter mb-10 mx-auto" style="color: white !important;">
                        <span class="split-line block">{{ $t('home.banner.title_sub1') }}</span>
                        <span class="split-line block font-bold">{{ $t('home.banner.title_sub2') }}</span>
                    </h1>
                    
                    <!-- Sub-description & Buttons -->
                    <div class="hero-bottom-elements opacity-0 flex flex-col items-center gap-8 mt-12">
                        <p class="text-gray-400 text-lg md:text-2xl max-w-2xl font-light mx-auto">
                            {{ $t('home.banner.desc') }}
                        </p>

                        <div class="flex flex-col sm:flex-row items-center gap-6 mt-4">
                            <NuxtLink :to="localePath('/services')" class="mil-button mil-arrow-place px-10 py-5 text-lg">
                                <span>{{ $t('home.banner.btn_services') }}</span>
                            </NuxtLink>

                            <NuxtLink :to="localePath('/portfolio')" class="mil-link mil-muted mil-arrow-place text-lg group">
                                <span class="group-hover:text-white transition-colors">{{ $t('home.banner.btn_portfolio') }}</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- banner end -->
    

    <!-- 1. Typography Services Reveal -->
    <section class="services-reveal-section py-24 md:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden">
        <div class="container mx-auto px-6 md:px-20">
            <h2 class="huge-text text-5xl md:text-7xl lg:text-[7rem] font-[100] leading-none mb-12 tracking-tighter text-gray-900 dark:text-white uppercase">
                <div class="split-line overflow-hidden pb-4">{{ $t('home_new.expertise.title') }}</div>
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-row-reverse">
                <div class="mask-image-container relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-3xl">
                     <div class="mask-overlay absolute inset-0 bg-white dark:bg-[#0a0a0a] z-10 origin-bottom"></div>
                     <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1080&auto=format&fit=crop" class="w-full h-full object-cover scale-125 mask-img-target" alt="Process" />
                </div>
                <div class="services-desc">
                     <p class="stagger-text text-2xl md:text-4xl font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                         "{{ $t('home_new.expertise.subtitle') }}"
                     </p>
                </div>
            </div>
        </div>
    </section>


    <!-- 2. Horizontal Showcase Pinned Scroll -->
    <section class="horizontal-showcase-section bg-background-light dark:bg-[#111] overflow-hidden relative h-screen">
        <div class="horizontal-container flex h-full items-center w-max px-6 md:px-20">
            <!-- Intro Panel -->
            <div class="showcase-panel w-[100vw] h-full flex flex-col justify-center shrink-0 pr-20 relative">
                <h2 class="text-sm font-bold tracking-[0.3em] text-primary mb-4 uppercase">{{ $t('home_new.work.subtitle') }}</h2>
                <h3 class="text-5xl md:text-8xl font-[100] text-gray-900 dark:text-white leading-tight max-w-4xl" v-html="$t('home_new.work.title')"></h3>
            </div>
            
            <!-- Work Card 1 -->
            <div class="showcase-panel w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 mx-8 relative rounded-[40px] overflow-hidden group cursor-pointer block">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMkfay2QmV46oI1MRB7yDqxPTi9zT7WVSL3rMeIor3jQwvEHakb7qUGjcHrR0dKTx9V4rKJD7RsMPF8xNJZGBb--YYvmHzFaZPIXLsY7O_JC1w108EcXnlSzJHZlqxLAincPkdfj-pWmOX6DsbSAEpYRtndznBztxReZg98zjjN32oxoN9bcRiTv6bRz63VvZzE1y7yK5yK1wQVXnYzmuwatRB0d3VIOmzg3KEn1bikBVaYEa7lcZPq31sw9uNSurMKTTGqWqeYOo" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Work 1" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute bottom-10 left-10 z-10 w-full pr-10">
                    <h4 class="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2">{{ $t('home_new.work.projects[0].title') }}</h4>
                    <span class="text-primary tracking-widest uppercase text-sm md:text-base font-bold">{{ $t('home_new.work.projects[0].tag1') }}</span>
                    <!-- Optional View Project Button -->
                    <div class="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                         <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-primary transition-colors">
                              {{ $t('home_new.work.projects[0].btn') }}
                         </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Work Card 2 -->
            <div class="showcase-panel w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 mx-8 relative rounded-[40px] overflow-hidden group cursor-pointer block">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk1I7HplUlg-hvpnFRBeeQRoDjUp-dkbogBFDSlEilKt0nAKAqvdnHaEJA1Ul_FHE89dD-hoxk9h1qN00K7zSW3PoUcQybx2jpo9LkM6VStlTmNtKhkpl1fqUFBx3iaPvBQdHG-WQQDSko4H6A3CbbFkWEFnSpWqXrlODymGHjec_I7If9IHfcLWxd1lO4DT0nNYGQhKzFV7CscL_O3JZMNyKWas-OrKeU0sqU6TlJ_7Qb94qqkZydW8eLJ0Efnj9Sooq6fQF1Sp4" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Work 2" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute bottom-10 left-10 z-10 w-full pr-10">
                    <h4 class="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2">{{ $t('home_new.work.projects[1].title') }}</h4>
                    <span class="text-primary tracking-widest uppercase text-sm md:text-base font-bold">{{ $t('home_new.work.projects[1].tag1') }}</span>
                    <!-- Optional View Project Button -->
                    <div class="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                         <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-primary transition-colors">
                              {{ $t('home_new.work.projects[1].btn') }}
                         </NuxtLink>
                    </div>
                </div>
            </div>
            
            <!-- End Spacer Panel to let it scroll off -->
            <div class="showcase-panel w-[20vw] h-full shrink-0"></div>
        </div>
    </section>

    <!-- Stacking Sections Container -->
    <div ref="stackWrapper" class="mil-fade-wrapper relative overflow-hidden h-screen bg-[#050505]">
        <!-- Atmospheric Particle Layer -->
        <canvas ref="dustCanvas" class="absolute inset-0 z-[5] pointer-events-none opacity-0"></canvas>
        <!-- 3. Deep Parallax About -->
        <section class="deep-parallax-section mil-stack-section relative bg-background-dark overflow-hidden flex items-center justify-center py-20 border-y border-gray-900 z-10">
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
             <h2 class="text-sm font-bold tracking-[0.3em] text-primary mb-8 uppercase">{{ $t('home_new.strategy.subtitle') }}</h2>
             <div class="text-4xl md:text-6xl lg:text-7xl font-[100] text-white leading-tight max-w-5xl mx-auto drop-shadow-2xl" v-html="$t('home_new.strategy.title')"></div>
             
             <!-- Using existing stats keys to make the layer richer -->
             <div class="grid grid-cols-2 gap-8 md:gap-16 mt-20 md:mt-32 max-w-3xl mx-auto pointer-events-auto">
                 <div>
                    <div class="text-5xl md:text-7xl font-black text-primary mb-2">200+</div>
                    <div class="text-xs md:text-sm tracking-widest text-gray-400 uppercase">{{ $t('home_new.stats.s1_label') }}</div>
                 </div>
                 <div>
                    <div class="text-5xl md:text-7xl font-black text-primary mb-2">98%</div>
                    <div class="text-xs md:text-sm tracking-widest text-gray-400 uppercase">{{ $t('home_new.stats.s3_label') }}</div>
                 </div>
             </div>
        </div>
    </section>

    <!-- 4. The Process Flow -->
    <section class="process-flow-section mil-stack-section relative bg-white dark:bg-[#0a0a0a] overflow-hidden flex items-center">
        <div class="container mx-auto px-6 md:px-20 relative">
            <div class="flex flex-col md:flex-row gap-12 md:gap-24 relative">
                <!-- Left: Progress Line Container -->
                <div class="hidden md:block w-1 relative h-[calc(100% - 100px)] top-[50px]">
                    <div class="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                    <div class="process-progress-line absolute top-0 left-0 w-full bg-primary rounded-full origin-top scale-y-0 h-full shadow-[0_0_20px_rgba(255,153,0,0.5)]"></div>
                </div>
                
                <!-- Right: Steps -->
                <div class="flex-1 space-y-24 md:space-y-48 my-12">
                    <div v-for="(step, index) in $tm('home_new.strategy.steps')" :key="index" class="process-step relative">
                        <!-- Mobile marker -->
                        <div class="md:hidden w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-6 text-xl">
                            {{ index + 1 }}
                        </div>
                        <h3 class="process-step-title text-4xl md:text-7xl font-[100] mb-8 text-gray-900 dark:text-white transition-all duration-700 ease-out">
                            {{ $rt(step.title) }}
                        </h3>
                        <p class="process-step-desc text-xl md:text-3xl text-gray-500 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
                            {{ $rt(step.desc) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Latest Insights Grid -->
    <section class="insights-grid-section mil-stack-section relative bg-background-light dark:bg-[#111] overflow-hidden flex items-center">
        <div class="container mx-auto px-6 md:px-20">
            <div class="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
                <div class="max-w-3xl">
                    <h2 class="text-sm font-bold tracking-[0.4em] text-primary mb-6 uppercase">{{ $t('home_new.blog_preview.subtitle') }}</h2>
                    <h3 class="text-5xl md:text-[6rem] font-[100] text-gray-900 dark:text-white leading-[1.1]">{{ $t('home_new.blog_preview.title') }}</h3>
                </div>
                <div class="pb-4">
                    <NuxtLink :to="localePath('/blog')" class="mil-link mil-muted mil-arrow-place text-xl group">
                        <span class="group-hover:text-primary transition-colors">{{ $t('home_new.blog_preview.view_all') }}</span>
                    </NuxtLink>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="(post, index) in $tm('home_new.blog_preview.posts')" :key="index" class="blog-card-wrapper h-full">
                    <NuxtLink :to="localePath('/blog')" class="blog-card group flex flex-col h-full relative rounded-[40px] overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-900 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] hover:-translate-y-4">
                        <div class="aspect-[4/5] overflow-hidden relative">
                            <img :src="`https://images.unsplash.com/photo-${1550000000000 + index * 1000000}?q=80&w=1000&auto=format&fit=crop`" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" :alt="$rt(post.title)" />
                            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                        </div>
                        <div class="p-10 flex flex-col flex-1">
                            <div class="flex items-center gap-6 mb-8">
                                <span class="px-4 py-1.5 rounded-full bg-primary/10 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">{{ $rt(post.tag) }}</span>
                                <span class="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{{ $rt(post.date) }}</span>
                            </div>
                            <h4 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-primary transition-colors duration-500 line-clamp-2 leading-tight">
                                {{ $rt(post.title) }}
                            </h4>
                            <p class="text-gray-500 dark:text-gray-400 text-lg font-light mb-10 line-clamp-2 leading-relaxed">{{ $rt(post.desc) }}</p>
                            <div class="mt-auto pt-8 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between group-hover:border-primary/20 transition-colors">
                                <span class="text-xs font-bold tracking-[0.3em] uppercase">Read Publication</span>
                                <div class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500">
                                    <span class="material-icons text-lg">arrow_outward</span>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>


    <!-- 6. Cinematic Blur CTA -->
    <section class="cinematic-cta-section mil-stack-section relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden p-6 md:p-12">
        <div class="cta-scalable-wrapper w-full h-full md:max-h-[80vh] bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-[30px] md:rounded-[50px] border border-gray-800 flex flex-col items-center justify-center text-center px-6 md:px-20 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
            <!-- Glow effect inside -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,153,0,0.1)_0%,transparent_60%)]"></div>
            
            <h2 class="text-5xl md:text-[8rem] font-[100] mb-6 md:mb-8 leading-none max-w-5xl mx-auto text-white" v-html="$t('home_new.cta.title')"></h2>
            <p class="text-gray-400 text-lg md:text-3xl mb-12 md:mb-16 max-w-3xl mx-auto font-light">{{ $t('home_new.cta.desc') }}</p>
            
            <NuxtLink :to="localePath('/contact')" class="group relative px-10 py-5 md:px-16 md:py-6 bg-white text-black rounded-full overflow-hidden shadow-2xl">
                <span class="relative z-10 font-bold text-sm md:text-lg tracking-[0.2em] uppercase">{{ $t('home_new.cta.btn_talk') }}</span>
                <div class="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
            </NuxtLink>
        </div>
    </section>
    </div>

  </main>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, ref } from 'vue';
import { useHead, useLocalePath } from '#imports';

const localePath = useLocalePath();
const stackWrapper = ref(null);
const dustCanvas = ref(null);

useHead({
  link: [
    { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;500;700&display=swap', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap', rel: 'stylesheet' }
  ]
});

let ctx;

// --- Atmospheric Particle System ---
class DustSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.intensity = 0; // 0 to 1
        this.resize();
        this.createParticles();
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    createParticles() {
        for (let i = 0; i < 40; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                alpha: Math.random() * 0.5
            });
        }
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.x += p.speedX * (1 + this.intensity * 2);
            p.y += p.speedY * (1 + this.intensity * 2);
            
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * (0.2 + this.intensity)})`;
            this.ctx.fill();
        });
    }
}

// Utility for splitting text manually inline (simulates SplitText)
function splitTextToChars(element) {
    if (!element) return;
    const text = element.innerText;
    element.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char; // preserve space width
        span.style.display = 'inline-block';
        span.className = 'char-animate';
        // Performance: promotion to own layer
        span.style.willChange = 'transform, opacity';
        element.appendChild(span);
    });
}

onMounted(() => {
    // A robust SSR polling mechanism
    const gsWaitInterval = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(gsWaitInterval);
            initHomepageGSAP(window.gsap, window.ScrollTrigger);
        }
    }, 50);
});

function initHomepageGSAP(gsap, ScrollTrigger) {
    if (window.ScrollToPlugin) gsap.registerPlugin(ScrollTrigger, window.ScrollToPlugin);
    else gsap.registerPlugin(ScrollTrigger);
    
    // Global defaults for performance
    gsap.defaults({ lazy: false });
    gsap.ticker.wake();
    gsap.ticker.lagSmoothing(0);

    // Prepare typography elements
    document.querySelectorAll('.hp-hero-title .split-line, .huge-text .split-line').forEach(splitTextToChars);

    nextTick(() => {
        // Initialize Dust System
        let dust;
        if (dustCanvas.value) {
            dust = new DustSystem(dustCanvas.value);
            gsap.ticker.add(() => dust.update());
        }

        setTimeout(() => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                ctx = gsap.context(() => {
                    
                    // --- 0. Homepage Hero Entrance (REFINED) ---
                    const heroChars = gsap.utils.toArray('.hp-hero-title .char-animate');
                    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
                    
                    heroTl.fromTo('.hero-subtitle', 
                      { y: -40, opacity: 0, letterSpacing: "1em" },
                      { y: 0, opacity: 1, letterSpacing: "0.4em", duration: 1.2 }
                    )
                    
                    if (heroChars.length) {
                        heroTl.fromTo(heroChars, 
                            { y: 100, opacity: 0, rotateX: -60, transformOrigin: "50% 50% -50" },
                            { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.02 },
                            "-=0.8"
                        );
                    }
                    
                    heroTl.fromTo('.hero-bottom-elements', 
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1.2 },
                        "-=1"
                    );

                    // --- 1. Typography Services Reveal ---
                    const servicesTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".services-reveal-section",
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    });
                    
                    const chars = document.querySelectorAll(".huge-text .char-animate");
                    if (chars.length) {
                        servicesTl.fromTo(chars,
                            { y: 150, opacity: 0, rotationZ: 15, scale: 0.8 },
                            { y: 0, opacity: 1, rotationZ: 0, scale: 1, duration: 1.2, ease: "back.out(1.5)", stagger: 0.03 }
                        );
                    }
                    
                    servicesTl.fromTo(".mask-overlay",
                        { scaleY: 1 },
                        { scaleY: 0, duration: 1.5, ease: "power4.inOut" }, "-=1"
                    )
                    .fromTo(".mask-img-target",
                        { scale: 1.3 },
                        { scale: 1, duration: 1.5, ease: "power4.out" }, "-=1.5"
                    )
                    .fromTo(".stagger-text",
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=1"
                    );

                    // --- 2. Horizontal Showcase Pinned Scroll ---
                    const showcaseContainer = document.querySelector(".horizontal-container");
                    if (showcaseContainer) {
                        gsap.to(showcaseContainer, {
                            x: () => -(showcaseContainer.scrollWidth - window.innerWidth) + "px",
                            ease: "none",
                            scrollTrigger: {
                                trigger: ".horizontal-showcase-section",
                                pin: true,
                                scrub: 1,
                                end: () => "+=" + showcaseContainer.scrollWidth
                            }
                        });
                    }

                    // --- Stationary Cross-Fade with Internal Scroll ---
                    const sections = gsap.utils.toArray('.mil-stack-section');
                    
                    if (sections.length && stackWrapper.value) {
                        // Initial setup
                        gsap.set(sections, { 
                            position: "absolute", 
                            top: 0, 
                            left: 0, 
                            width: "100%",
                            opacity: (i) => i === 0 ? 1 : 0,
                            pointerEvents: (i) => i === 0 ? "auto" : "none",
                            zIndex: (i) => 10 + i 
                        });

                        const mainTl = gsap.timeline({
                            scrollTrigger: {
                                trigger: stackWrapper.value,
                                start: "top top",
                                end: () => {
                                    let total = 0;
                                    sections.forEach((s, idx) => {
                                        const h = s.offsetHeight;
                                        const dist = Math.max(0, h - window.innerHeight);
                                        total += dist;
                                        // Only add transition distance if it's NOT the last section UNLESS there is content after the pile
                                        if (idx < sections.length - 1) {
                                            total += (window.innerHeight * 1.5); 
                                        }
                                    });
                                    // Add a small buffer at the very end
                                    return `+=${total + 100}`;
                                },
                                scrub: 1.5,
                                pin: true,
                                pinSpacing: true,
                                invalidateOnRefresh: true
                            }
                        });

                        sections.forEach((section, i) => {
                            const scrollDistance = Math.max(0, section.offsetHeight - window.innerHeight);
                            
                            // Initialize Section State
                            if (i > 0) {
                                gsap.set(section, { scale: 1.1, filter: "blur(20px)", brightness: 1.5 });
                            }
                            
                            // Initialize Logo Color (force white while pile exists)
                            mainTl.set(".mil-logo", { color: "#fff", immediateRender: true }, 0);

                            // 1. Internal scroll (with breathing room)
                            if (scrollDistance > 0) {
                                mainTl.to(section, {
                                    y: -scrollDistance,
                                    duration: scrollDistance / 400,
                                    ease: "none"
                                });
                            }

                            // 2. Atmospheric Cross-fade to next
                            if (i < sections.length - 1) {
                                const nextSection = sections[i + 1];
                                
                                // Detect if next section is light or dark to toggle logo color
                                const isNextLight = nextSection.classList.contains('bg-white') || nextSection.classList.contains('bg-background-light');
                                
                                // Pause before transition
                                mainTl.to({}, { duration: 0.5 });

                                // Pulse Particles
                                if (dust) {
                                    mainTl.to(dustCanvas.value, { opacity: 0.4, duration: 0.5 }, "<");
                                    mainTl.to(dust, { intensity: 1, duration: 1 }, "<");
                                }

                                // Toggle Logo Color
                                mainTl.to(".mil-logo", { 
                                    color: isNextLight ? "#000" : "#fff", 
                                    duration: 0.8,
                                    ease: "power2.inOut" 
                                }, "<");

                                // Outgoing Section Fade-Out-Place
                                mainTl.to(section, { 
                                    opacity: 0, 
                                    scale: 0.9, 
                                    filter: "blur(20px)", 
                                    pointerEvents: "none", 
                                    duration: 1.5,
                                    ease: "power2.inOut"
                                });

                                // Incoming Section Reveal-Place
                                mainTl.to(nextSection, { 
                                    opacity: 1, 
                                    scale: 1, 
                                    filter: "blur(0px)", 
                                    brightness: 1,
                                    pointerEvents: "auto", 
                                    duration: 1.5,
                                    ease: "power2.out"
                                }, "<"); 

                                // Fade out particles after transition
                                if (dust) {
                                    mainTl.to(dustCanvas.value, { opacity: 0, duration: 0.5 });
                                    mainTl.to(dust, { intensity: 0, duration: 1 }, "<");
                                }

                                // Pause after transition
                                mainTl.to({}, { duration: 0.5 });
                            }
                        });
                    }

                    // --- 3. Deep Parallax About layers ---
                    gsap.utils.toArray('.parallax-layer').forEach(layer => {
                        const speed = parseFloat(layer.getAttribute('data-speed'));
                        if (speed !== 0) {
                            gsap.to(layer, {
                                yPercent: -100 * speed,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: ".deep-parallax-section",
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 0.5
                                }
                            });
                        }
                    });

                    // --- 4. The Process Flow ---
                    gsap.to(".process-progress-line", {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".process-flow-section",
                            start: "top center",
                            end: "bottom center",
                            scrub: true
                        }
                    });

                    gsap.utils.toArray(".process-step").forEach((step, i) => {
                        gsap.from(step.querySelectorAll('.process-step-title, .process-step-desc'), {
                            y: 50,
                            opacity: 0,
                            duration: 1.2,
                            stagger: 0.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: step,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        });

                        ScrollTrigger.create({
                            trigger: step,
                            start: "top center",
                            end: "bottom center",
                            onEnter: () => step.querySelector('.process-step-title').classList.add('text-primary', 'italic', 'pl-4'),
                            onLeave: () => step.querySelector('.process-step-title').classList.remove('text-primary', 'italic', 'pl-4'),
                            onEnterBack: () => step.querySelector('.process-step-title').classList.add('text-primary', 'italic', 'pl-4'),
                            onLeaveBack: () => step.querySelector('.process-step-title').classList.remove('text-primary', 'italic', 'pl-4')
                        });
                    });

                    // --- 5. Latest Insights Grid ---
                    const blogCards = gsap.utils.toArray(".blog-card-wrapper");
                    gsap.from(blogCards, {
                        y: 100,
                        opacity: 0,
                        duration: 1.5,
                        stagger: 0.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: ".insights-grid-section",
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Tilt effect for cards
                    blogCards.forEach(card => {
                        const el = card.querySelector(".blog-card");
                        el.addEventListener("mousemove", (e) => {
                            const rect = el.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const rotateX = (y - centerY) / 40;
                            const rotateY = (centerX - x) / 40;

                            gsap.to(el, {
                                rotateX: rotateX,
                                rotateY: rotateY,
                                scale: 1.02,
                                duration: 0.6,
                                ease: "power3.out",
                                transformPerspective: 1000
                            });
                        });

                        el.addEventListener("mouseleave", () => {
                            gsap.to(el, {
                                rotateX: 0,
                                rotateY: 0,
                                scale: 1,
                                duration: 1.2,
                                ease: "elastic.out(1, 0.3)"
                            });
                        });
                    });

                    // --- 6. Cinematic Blur CTA ---
                    gsap.fromTo(".cta-scalable-wrapper",
                        { scale: 0.9, filter: "blur(10px)" },
                        {
                            scale: 1,
                            filter: "blur(0px)",
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ".cinematic-cta-section",
                                start: "top 85%",
                                end: "center center",
                                scrub: 1
                            }
                        }
                    );

                    ScrollTrigger.refresh();
                });
            });

            // Mobile specific behavior or fallback
            mm.add("(max-width: 767px)", () => {
                // Simplified animations for mobile to save battery/perf
                gsap.from('.hp-hero-title', { opacity: 0, y: 30, duration: 1 });
                gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.2 });
            });
        }, 100);
    });
}

onUnmounted(() => {
    if (ctx) {
        ctx.revert();
    }
});
</script>

<style scoped>
    .hp-hero-title .char-animate, 
    .huge-text .char-animate,
    .blog-card,
    .cta-scalable-wrapper {
        will-change: transform, opacity;
        backface-visibility: hidden;
    }

    .scroll-text-svg {
        animation: rotate 15s linear infinite;
    }
    @keyframes rotate {
        100% { transform: rotate(360deg); }
    }
    .vertical-text {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
    }
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
