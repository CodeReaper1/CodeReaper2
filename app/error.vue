<template>
  <NuxtLayout>
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">

        <!-- 404 -->
        <div class="mil-404-banner mil-dark-bg">
            <div class="mil-animation-frame">
                <div class="mil-animation mil-position-4 mil-scale" data-value-1="9" data-value-2="1.4" style="right: 40%;"></div>
            </div>
            <div class="mi-invert-fix mil-up">
                <div class="container">
                    <div class="mil-404-frame">

                        <div class="mil-scale-frame">
                            <h1 class="mil-404" :data-text="error.statusCode || 404">{{ error.statusCode || 404 }}</h1>
                        </div>

                        <h4 class="mil-404-text mil-dark mil-mb-60">
                            {{ error.message || $t('error.fallback') }}
                        </h4>
                        
                        <button @click="handleError" class="mil-button mil-arrow-place" style="border: none; background: transparent;">
                            <span>{{ $t('error.back_home') }}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <!-- 404 end -->

      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  error: Object
});

const handleError = () => clearError({ redirect: '/' });

onMounted(() => {
    // Attempt to re-init ScrollTrigger / Animations when error page mounts
    if (window.refreshScrollAnimations) {
        window.refreshScrollAnimations();
    }
});
</script>
