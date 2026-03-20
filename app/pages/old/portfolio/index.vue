<template>
  <main>
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">
          <!-- portfolio -->
          <section class="mil-portfolio-slider-frame">
              <div class="mil-animation-frame">
                  <div class="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="1" data-value-2="2" style="top: -60px; right: -4px;"></div>
              </div>
              <div class="container">
                  <div class="row align-items-end">
                      <div class="col-lg-9">
                          <div class="swiper-container mil-portfolio-slider mil-up">
                              <div class="swiper-wrapper">
                                  
                                  <div class="swiper-slide" v-for="item in portfolioItems" :key="item.slug">
                                      <div class="mil-portfolio-item mil-slider-item" data-swiper-parallax="-30">
                                          <div class="mil-cover-frame mil-drag">
                                              <div class="mil-cover" data-swiper-parallax-scale="1.3">
                                                  <img :src="item.image" :alt="item.title" class="mil-cover-img" />
                                              </div>
                                          </div>
                                          <div class="mil-descr" data-swiper-parallax-x="104%" data-swiper-parallax-opacity="0">
                                              <div class="mil-descr-text" data-swiper-parallax-y="100%" data-swiper-parallax-opacity="0">
                                                  <div class="mil-labels mil-mb-15">
                                                      <div class="mil-label mil-upper mil-accent">
                                                          {{ item.client }}
                                                      </div>
                                                      <div class="mil-label mil-upper">
                                                          {{ item.date }}
                                                      </div>
                                                  </div>
                                                  <h5>{{ item.title }}</h5>
                                              </div>
                                              <div data-swiper-parallax-y="120" data-swiper-parallax-opacity="0" style="pointer-events: auto;">
                                                  <NuxtLink :to="`/portfolio/${item.slug}`" class="mil-button mil-arrow-place" style="position: relative; z-index: 50; pointer-events: auto;" :prefetch="false">
                                                      <span>View Project</span>
                                                  </NuxtLink>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>
                      <div class="col-lg-3 mil-relative">
                          <div class="mil-portfolio-nav">
                              <div class="mil-portfolio-btns-frame">
                                  <div class="swiper-portfolio-pagination"></div>
                                  <div class="mil-slider-nav">
                                      <div class="mil-slider-arrow mil-prev mil-portfolio-prev mil-arrow-place"></div>
                                      <div class="mil-slider-arrow mil-portfolio-next mil-arrow-place"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <!-- portfolio end -->
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const portfolioItems = ref([
    {
        title: "Modern Ecommerce Redesign",
        client: "TechStyle Boutique",
        date: "10 24 2023",
        image: "/img/photo/1.jpg",
        slug: "ecommerce-redesign"
    },
    {
        title: "Corporate Identity App",
        client: "Globex Corporation",
        date: "08 12 2023",
        image: "/img/photo/2.jpg",
        slug: "corporate-identity-app"
    },
    {
        title: "SaaS Dashboard UI/UX",
        client: "CloudSync",
        date: "05 06 2023",
        image: "/img/photo/3.jpg",
        slug: "saas-dashboard"
    }
]);

onMounted(() => {
    // Small delay to let Vue render the loop before Swiper binds to it
    setTimeout(() => {
        if (window.initPortfolioSlider) {
            window.initPortfolioSlider();
        }
        
        // Re-trigger global refreshScrollAnimations in main.js
        if (window.refreshScrollAnimations) {
            window.refreshScrollAnimations();
        }
    }, 50);
});
</script>
