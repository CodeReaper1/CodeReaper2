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
