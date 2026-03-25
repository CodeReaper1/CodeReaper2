<template>
  <div class="playground-page min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-7xl">
      <div class="mb-12 border-b border-gray-800 pb-6">
        <h1 class="text-4xl md:text-6xl font-[100] tracking-tighter">
          UI <span class="font-bold">PLAYGROUND</span>
        </h1>
        <p class="text-gray-400 mt-4 text-lg font-light">Test and preview new sections before assembling them on main pages.</p>
      </div>

      <!-- Add new experimental components below this line -->
      <div class="playground-content space-y-20">
        
        <section class="p-10 border border-gray-800 rounded-3xl bg-[#0a0a0a] flex items-center justify-center min-h-[500px] border-dashed">
          <p class="text-gray-500 tracking-widest uppercase text-sm font-bold flex items-center gap-2">
            <span class="material-icons">architecture</span>
            Drop new sections here
          </p>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
});

onMounted(() => {
  // Initialize any required GSAP animations or logic for the playground
  if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
});

onUnmounted(() => {
  // Cleanup
});
</script>

<style scoped>
.playground-page {
  font-family: 'Outfit', sans-serif;
}

/* Fallback simple transition if global 'page' isn't set */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
