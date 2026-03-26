<template>
  <main class="bg-[#050505] min-h-screen" style="font-family:'Outfit',sans-serif">

    <!-- Hero Banner -->
    <section class="blog-hero relative pt-32 pb-24 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgba(255,153,0,0.05)] rounded-full blur-[120px] pointer-events-none"></div>
      <div class="container mx-auto px-6 md:px-20 relative">
        <p class="blog-hero-label text-xs font-bold tracking-[0.5em] text-[#FF9900] uppercase mb-6">Our Publications</p>
        <h1 class="blog-hero-title text-6xl md:text-[8rem] font-[100] text-white leading-none mb-8">
          All <span class="italic text-gray-500 font-[100]">Things</span><br />
          We Write About
        </h1>
        <p class="blog-hero-sub max-w-xl text-gray-500 text-xl font-[300] leading-relaxed">
          Insights on web performance, SEO, design systems, and digital marketing — written by practitioners, not algorithms.
        </p>
      </div>
    </section>

    <!-- Divider -->
    <div class="container mx-auto px-6 md:px-20">
      <div class="blog-index-divider w-full h-px bg-gray-800 origin-left"></div>
    </div>

    <!-- Posts Grid -->
    <section class="blog-grid-section py-20 md:py-32">
      <div class="container mx-auto px-6 md:px-20">

        <!-- Featured Post -->
        <NuxtLink
          :to="localePath(`/blog/${posts[0].slug}`)"
          class="blog-featured-card group flex flex-col lg:flex-row rounded-[30px] overflow-hidden bg-[#0d0d0d] border border-gray-800/50 mb-6 hover:border-[rgba(255,153,0,0.3)] transition-all duration-500"
        >
          <div class="lg:w-[55%] aspect-[16/9] lg:aspect-auto overflow-hidden">
            <img
              :src="posts[0].image"
              :alt="posts[0].title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
          <div class="flex-1 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-4 mb-8">
                <span class="px-3 py-1 rounded-full bg-[rgba(255,153,0,0.1)] text-[10px] font-bold tracking-[0.2em] text-[#FF9900] uppercase">{{ posts[0].category }}</span>
                <span class="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                  <span class="w-1 h-1 rounded-full bg-[rgba(255,153,0,0.6)] inline-block"></span>
                  {{ posts[0].readTime }}
                </span>
              </div>
              <h2 class="text-3xl md:text-4xl font-[300] text-white leading-snug mb-6 group-hover:text-[#FF9900] transition-colors duration-500">{{ posts[0].title }}</h2>
              <p class="text-gray-500 text-base font-[300] leading-relaxed line-clamp-3">{{ posts[0].excerpt }}</p>
            </div>
            <div class="mt-8 flex items-center justify-between pt-8 border-t border-gray-800/60 group-hover:border-[rgba(255,153,0,0.2)] transition-colors">
              <div>
                <p class="text-xs text-gray-600 tracking-widest uppercase">{{ posts[0].date }}</p>
                <p class="text-xs text-gray-600 tracking-widest uppercase mt-1">By {{ posts[0].author }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase group-hover:text-[#FF9900] transition-colors">Read Article</span>
                <div class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center group-hover:bg-[#FF9900] group-hover:border-[#FF9900] transition-all duration-500">
                  <span class="material-icons text-base text-gray-400 group-hover:text-white transition-colors">arrow_outward</span>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Remaining posts grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink
            v-for="post in posts.slice(1)"
            :key="post.slug"
            :to="localePath(`/blog/${post.slug}`)"
            class="blog-grid-card group flex flex-col rounded-[20px] overflow-hidden bg-[#0d0d0d] border border-gray-800/50 hover:border-[rgba(255,153,0,0.3)] transition-all duration-500"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="px-2.5 py-1 rounded-full bg-[rgba(255,153,0,0.1)] text-[9px] font-bold tracking-[0.2em] text-[#FF9900] uppercase">{{ post.category }}</span>
                <span class="flex items-center gap-1 text-[9px] font-bold text-gray-600 tracking-widest uppercase">
                  <span class="w-1 h-1 rounded-full bg-[rgba(255,153,0,0.4)] inline-block"></span>
                  {{ post.readTime }}
                </span>
              </div>
              <h3 class="text-lg font-[300] text-gray-200 leading-snug mb-3 group-hover:text-[#FF9900] transition-colors duration-500 line-clamp-2">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm font-[300] leading-relaxed line-clamp-2 mb-4">{{ post.excerpt }}</p>
              <div class="mt-auto pt-4 border-t border-gray-800/60 flex items-center justify-between">
                <span class="text-[9px] text-gray-700 tracking-widest uppercase">{{ post.date }}</span>
                <span class="material-icons text-sm text-gray-700 group-hover:text-[#FF9900] group-hover:translate-x-0.5 transition-all">arrow_forward</span>
              </div>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLocalePath, useHead } from '#imports';

useHead({
  link: [
    { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;700&display=swap', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
  ]
});

const localePath = useLocalePath();
const { posts } = useBlogPosts();

onMounted(() => {
  const gsWaitInterval = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(gsWaitInterval);
      initBlogGSAP(window.gsap, window.ScrollTrigger);
    }
  }, 50);
});

function initBlogGSAP(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance timeline
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo('.blog-hero-label',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo('.blog-hero-title',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
      '-=0.4'
    )
    .fromTo('.blog-hero-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      '-=0.6'
    );

  // Divider line draws left → right
  gsap.fromTo('.blog-index-divider',
    { scaleX: 0 },
    {
      scaleX: 1, duration: 1, ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.blog-index-divider',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      }
    }
  );

  // Featured card slides in from left
  gsap.fromTo('.blog-featured-card',
    { x: -50, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.blog-featured-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }
  );

  // Grid cards stagger up with scale
  gsap.fromTo('.blog-grid-card',
    { y: 50, opacity: 0, scale: 0.96 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.blog-grid-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    }
  );
}
</script>
