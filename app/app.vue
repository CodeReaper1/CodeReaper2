<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Ensure the DOM and Vue's internal refs are hydrated before initializing jQuery/GSAP
  const initTheme = () => {
    if (window.ApexThemeInit && window.jQuery) {
      window.ApexThemeInit(window.jQuery);
    } else {
      setTimeout(initTheme, 50);
    }
  };
  
  setTimeout(initTheme, 100);
});
</script>

<style>
/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}

/* Ensure the main transition container has a minimum height to prevent the footer from jumping up during transitions */
.mil-main-transition {
  min-height: 100vh;
}
</style>
