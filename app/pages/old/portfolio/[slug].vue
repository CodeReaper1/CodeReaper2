<template>
  <main>
    <div class="mil-content">
        <div id="swupMain" class="mil-main-transition">
    <!-- banner -->
            <div class="mil-inner-banner">
                <div class="mil-banner-content mil-up">
                    <div class="mil-animation-frame">
                        <div class="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="6" data-value-2="1.4"></div>
                    </div>
                    <div class="container">
                        <ul class="mil-breadcrumbs mil-mb-60">
                            <li><NuxtLink to="/">Homepage</NuxtLink></li>
                            <li><NuxtLink to="/portfolio">Portfolio</NuxtLink></li>
                            <li class="mil-current">{{ project.title }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- banner end -->
        
            <!-- project -->
            <section>
                <div class="container mil-p-120-120" id="project">
                    <div class="row justify-content-between">
                        <div class="col-lg-4">
                            <div class="mil-p-0-120">
                                <ul class="mil-service-list mil-dark mil-mb-60">
                                    <li class="mil-up d-flex justify-content-flex-start align-items-center align-content-center">
                                        <h1 style="font-size:1.3rem">Client: &nbsp;<span class="mil-dark">{{ project.client }}</span></h1>
                                        <span v-if="project.clientLogo"><img :src="project.clientLogo" alt="Client Logo"></span>
                                    </li>
                                </ul>

                                <h5 class="mil-up mil-mb-30">About Project</h5>
                                <div class="mil-up mil-mb-30" v-html="project.description"></div>

                                <h5 class="mil-up mil-mb-10">Project Goal</h5>
                                <div class="mil-up mil-mb-30" v-html="project.goal"></div>

                                <h5 class="mil-up mil-mb-10">Steps Taken</h5>
                                <div class="mil-up mil-mb-30" v-html="project.steps"></div>

                                <h5 class="mil-up mil-mb-10">Results</h5>
                                <div class="mil-up mil-mb-60" v-html="project.results"></div>

                                <a v-if="project.website" :href="project.website" target="_blank" class="mil-link mil-dark mil-up mil-arrow-place">
                                    <span>Visit website</span>
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="mil-image-frame mil-horizontal mil-up mil-mb-30" v-for="(image, index) in project.gallery" :key="index">
                                <img :src="image.url" :alt="image.alt">
                                <a data-fancybox="gallery" :href="image.url" class="mil-zoom-btn">
                                    <img src="/img/icons/zoom.svg" alt="zoom">
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation to next/previous projects -->
                    <div class="mil-works-nav mil-up">
                        <NuxtLink v-if="project.prevSlug" :to="`/portfolio/${project.prevSlug}`" class="mil-link mil-dark mil-arrow-place mil-icon-left" :prefetch="false">
                            <span>Prev project</span>
                        </NuxtLink>
                        <NuxtLink to="/portfolio" class="mil-link mil-dark">
                            <span>All projects</span>
                        </NuxtLink>
                        <NuxtLink v-if="project.nextSlug" :to="`/portfolio/${project.nextSlug}`" class="mil-link mil-dark mil-arrow-place" :prefetch="false">
                            <span>Next project</span>
                        </NuxtLink>
                    </div>
                </div>
            </section>
            <!-- project end -->
        </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentSlug = route.params.slug;

// Dummy data based on the route slug
const project = ref({
    title: currentSlug.replace(/-/g, ' ').toUpperCase(),
    client: 'Dummy Client',
    clientLogo: '',
    description: '<p>This is a dummy description of the project, explaining the background and context of the work.</p>',
    goal: '<p>The goal was to create a modern, responsive interface for dummy users.</p>',
    steps: '<p>We redesigned the database, migrated to Next.js, and implemented a headless CMS.</p>',
    results: '<p>Increased conversion rate by 150% and reduced bounce rate.</p>',
    website: '#',
    gallery: [
        { url: '/img/photo/1.jpg', alt: 'Project Image 1' },
        { url: '/img/photo/2.jpg', alt: 'Project Image 2' },
        { url: '/img/photo/1.jpg', alt: 'Project Image 3' }
    ],
    prevSlug: 'previous-dummy-project',
    nextSlug: 'next-dummy-project'
});

onMounted(() => {
    // Small delay to ensure fancybox catches new DOM elements
    setTimeout(() => {
        if (window.initFancybox) {
            window.initFancybox();
        }

        // Re-trigger global refreshScrollAnimations in main.js
        if (window.refreshScrollAnimations) {
            window.refreshScrollAnimations();
        }
    }, 50);
});
</script>
