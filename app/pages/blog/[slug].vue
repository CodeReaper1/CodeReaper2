<template>
  <main class="bg-[#050505] min-h-screen" style="font-family:'Outfit',sans-serif">

    <template v-if="post">

      <!-- Hero -->
      <section class="post-hero relative pt-32 pb-20 overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[rgba(255,153,0,0.04)] rounded-full blur-[100px] pointer-events-none"></div>
        <div class="container mx-auto px-6 md:px-20 relative">
          <div class="max-w-4xl">

            <!-- Breadcrumb + meta row -->
            <div class="post-hero-meta flex flex-wrap items-center gap-4 mb-10">
              <NuxtLink
                :to="localePath('/blog')"
                class="text-[10px] font-bold tracking-[0.4em] text-gray-600 uppercase hover:text-[#FF9900] transition-colors"
              >← All Posts</NuxtLink>
              <span class="w-px h-4 bg-gray-700"></span>
              <span class="px-3 py-1 rounded-full bg-[rgba(255,153,0,0.1)] text-[10px] font-bold tracking-[0.2em] text-[#FF9900] uppercase">{{ post.category }}</span>
              <span class="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                <span class="w-1.5 h-1.5 rounded-full bg-[#FF9900] inline-block"></span>
                {{ post.readTime }}
              </span>
            </div>

            <h1 class="post-hero-title text-4xl md:text-[4.5rem] font-[200] text-white leading-[1.1] mb-8">{{ post.title }}</h1>
            <p class="post-hero-excerpt text-gray-400 text-xl font-[300] leading-relaxed max-w-2xl">{{ post.excerpt }}</p>

            <!-- Byline -->
            <div class="post-hero-byline flex items-center gap-5 mt-10 pt-8 border-t border-gray-800/60">
              <div class="w-11 h-11 rounded-full bg-[rgba(255,153,0,0.15)] border border-[rgba(255,153,0,0.3)] flex items-center justify-center shrink-0">
                <span class="text-[#FF9900] font-bold text-base">{{ post.author.charAt(0) }}</span>
              </div>
              <div>
                <p class="text-white text-sm font-medium">{{ post.author }}</p>
                <p class="text-gray-600 text-xs tracking-widest uppercase mt-0.5">{{ post.date }}</p>
              </div>
              <div class="ml-auto hidden md:flex items-center gap-2">
                <span class="text-[10px] text-gray-700 tracking-widest uppercase">{{ post.wordCount.toLocaleString() }} words</span>
                <span class="w-px h-4 bg-gray-800"></span>
                <span class="text-[10px] text-[#FF9900] font-bold tracking-widest uppercase">{{ post.readTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cover Image -->
      <div class="post-cover container mx-auto px-6 md:px-20 mb-20">
        <div class="w-full aspect-[21/9] rounded-[20px] md:rounded-[30px] overflow-hidden">
          <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Article Body -->
      <section class="post-body-section pb-24 md:pb-32">
        <div class="container mx-auto px-6 md:px-20">
          <div class="max-w-3xl mx-auto">
            <div class="post-body prose-custom" v-html="post.body"></div>
          </div>
        </div>
      </section>

      <!-- Related Posts -->
      <section class="related-section bg-[#080808] border-t border-gray-800/40 py-20 md:py-28">
        <div class="container mx-auto px-6 md:px-20">
          <div class="flex items-end justify-between mb-14">
            <div>
              <p class="text-xs font-bold tracking-[0.5em] text-[#FF9900] uppercase mb-4">Keep Reading</p>
              <h2 class="text-3xl md:text-5xl font-[100] text-white">More Posts</h2>
            </div>
            <NuxtLink
              :to="localePath('/blog')"
              class="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase hover:text-[#FF9900] transition-colors border-b border-gray-700 hover:border-[#FF9900] pb-1"
            >View All</NuxtLink>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <NuxtLink
              v-for="related in relatedPosts"
              :key="related.slug"
              :to="localePath(`/blog/${related.slug}`)"
              class="related-card group flex flex-col rounded-[20px] overflow-hidden bg-[#0d0d0d] border border-gray-800/50 hover:border-[rgba(255,153,0,0.3)] transition-all duration-500"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img :src="related.image" :alt="related.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div class="p-6 flex flex-col flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-2.5 py-1 rounded-full bg-[rgba(255,153,0,0.1)] text-[9px] font-bold tracking-[0.15em] text-[#FF9900] uppercase">{{ related.category }}</span>
                  <span class="flex items-center gap-1 text-[9px] text-gray-600 tracking-widest uppercase">
                    <span class="w-1 h-1 rounded-full bg-[rgba(255,153,0,0.4)] inline-block"></span>
                    {{ related.readTime }}
                  </span>
                </div>
                <h3 class="text-lg font-[300] text-gray-200 leading-snug group-hover:text-[#FF9900] transition-colors duration-300 line-clamp-2 mb-auto">{{ related.title }}</h3>
                <div class="mt-4 pt-4 border-t border-gray-800/60 flex justify-between items-center">
                  <span class="text-[9px] text-gray-700 tracking-widest uppercase">{{ related.date }}</span>
                  <span class="material-icons text-sm text-gray-700 group-hover:text-[#FF9900] transition-colors">arrow_forward</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

    </template>

    <!-- Post not found -->
    <template v-else>
      <div class="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p class="text-xs font-bold tracking-[0.5em] text-[#FF9900] uppercase mb-6">404</p>
        <h1 class="text-5xl md:text-7xl font-[100] text-white mb-8">Post Not Found</h1>
        <p class="text-gray-500 text-lg font-[300] mb-10">That article doesn't exist or may have been moved.</p>
        <NuxtLink
          :to="localePath('/blog')"
          class="px-8 py-4 rounded-full bg-[#FF9900] text-black font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors"
        >Back to Blog</NuxtLink>
      </div>
    </template>

  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLocalePath, useHead } from '#imports';

useHead({
  link: [
    { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;700&display=swap', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
  ]
});

const route = useRoute();
const localePath = useLocalePath();
const { posts, getPost } = useBlogPosts();

const post = getPost(route.params.slug);
const relatedPosts = computed(() =>
  posts.filter(p => p.slug !== post?.slug).slice(0, 3)
);

onMounted(() => {
  if (!post) return;

  const gsWaitInterval = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(gsWaitInterval);
      initPostGSAP(window.gsap, window.ScrollTrigger);
    }
  }, 50);
});

function initPostGSAP(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo('.post-hero-meta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
    .fromTo('.post-hero-title',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
      '-=0.4'
    )
    .fromTo('.post-hero-excerpt',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      '-=0.6'
    )
    .fromTo('.post-hero-byline',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.5'
    );

  // Cover image
  gsap.fromTo('.post-cover',
    { y: 50, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 1.3, ease: 'power3.out',
      scrollTrigger: { trigger: '.post-cover', start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );

  // Article body
  gsap.fromTo('.post-body',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: '.post-body-section', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  // Related cards stagger
  gsap.fromTo('.related-card',
    { y: 40, opacity: 0, scale: 0.97 },
    {
      y: 0, opacity: 1, scale: 1,
      stagger: 0.12, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.related-section', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );
}
</script>

<style scoped>
.prose-custom :deep(p) {
  color: rgb(156 163 175);
  font-size: 1.125rem;
  line-height: 1.85;
  margin-bottom: 1.5rem;
  font-weight: 300;
}
.prose-custom :deep(h3) {
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 3rem;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}
.prose-custom :deep(h2) {
  color: white;
  font-size: 2rem;
  font-weight: 300;
  margin-top: 3.5rem;
  margin-bottom: 1.25rem;
}
.prose-custom :deep(code) {
  color: #FF9900;
  background: rgba(255, 153, 0, 0.1);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.prose-custom :deep(em) {
  color: rgb(209 213 219);
  font-style: italic;
}
.prose-custom :deep(strong) {
  color: white;
  font-weight: 600;
}
</style>
