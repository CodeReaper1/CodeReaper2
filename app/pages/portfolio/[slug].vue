<template>
  <main class="mil-dark-bg min-h-screen text-white pb-32">
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">

        <!-- Banner with Featured Image as Background -->
        <div class="mil-inner-banner mil-dark-bg mil-parallax" :style="project?.featuredImage ? `background-image: url(${project.featuredImage}); background-size: cover; background-position: center;` : ''" data-value-1="-20" data-value-2="20">
          <div class="mil-overlay" style="position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.6);"></div>
          <div class="mil-banner-content mil-up" style="position: relative; z-index: 1;">
            <div class="container">
              <ul class="mil-breadcrumbs mil-light mil-mb-60">
                <li><NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/portfolio')">Portfolio</NuxtLink></li>
                <li class="mil-current">{{ project?.title || 'Project' }}</li>
              </ul>
              <h1 class="mil-mb-60">{{ project?.title }}</h1>
            </div>
          </div>
        </div>

        <div v-if="pending" class="container mil-p-120-120 text-center">
            <h3 class="mil-muted">Loading project...</h3>
        </div>

        <!-- Project Content -->
        <section v-else-if="project" id="project">
          <div class="container mil-p-120-120">
            <div class="row justify-content-between">
              
              <!-- Sidebar Info -->
              <div class="col-lg-4">
                <div class="mil-p-0-120">
                  <ul v-if="project.client || project.clientLogo" class="mil-service-list mil-dark mil-mb-60">
                    <li class="mil-up d-flex justify-content-flex-start align-items-center align-content-center">
                      <h5 class="mil-mb-0 mil-mr-15" style="font-size:1.3rem">Client: &nbsp;<span class="mil-accent">{{ project.client }}</span></h5>
                      <img v-if="project.clientLogo" :src="project.clientLogo" alt="Client Logo" style="max-height: 40px; object-fit: contain;">
                    </li>
                  </ul>

                  <template v-if="project.description">
                    <h5 class="mil-up mil-mb-30">About Project</h5>
                    <div class="mil-up mil-mb-30 mil-text-m text-gray-300" v-html="project.description"></div>
                  </template>

                  <template v-if="project.goal">
                    <h5 class="mil-up mil-mb-10">Project Goal</h5>
                    <div class="mil-up mil-mb-30 mil-text-m text-gray-300" v-html="project.goal"></div>
                  </template>

                  <template v-if="project.steps">
                    <h5 class="mil-up mil-mb-10">Steps Taken</h5>
                    <div class="mil-up mil-mb-30 mil-text-m text-gray-300" v-html="project.steps"></div>
                  </template>

                  <template v-if="project.results">
                    <h5 class="mil-up mil-mb-10">Results</h5>
                    <div class="mil-up mil-mb-60 mil-text-m text-gray-300" v-html="project.results"></div>
                  </template>

                  <a v-if="project.website" :href="project.website" target="_blank" class="mil-link mil-accent mil-up mil-arrow-place">
                    <span>Visit website</span>
                  </a>
                </div>
              </div>
              
              <!-- Gallery -->
              <div class="col-lg-7">
                <div v-for="(image, idx) in project.gallery" :key="idx" class="mil-image-frame mil-horizontal mil-up mil-mb-30" style="position:relative; overflow:hidden; border-radius: 10px;">
                  <img :src="image.sourceUrl" :alt="image.altText || project.title" style="width: 100%; height: auto;" class="mil-scale" data-value-1="1.1" data-value-2="1" />
                  <a data-fancybox="gallery" :href="image.sourceUrl" class="mil-zoom-btn">
                    <img src="/img/icons/zoom.svg" alt="zoom">
                  </a>
                </div>
              </div>

            </div>

            <!-- Navigation to next/previous projects -->
            <div class="mil-works-nav mil-up mil-mt-120">
              <NuxtLink :to="localePath('/portfolio')" class="mil-link mil-dark mil-arrow-place mil-icon-left">
                <span>← All projects</span>
              </NuxtLink>
            </div>
            
          </div>
        </section>

        <div v-else class="container mil-p-120-120 text-center">
            <h2 class="mil-mb-60">Project not found</h2>
            <NuxtLink :to="localePath('/portfolio')" class="mil-link mil-accent mil-arrow-place">
              <span>← Back to Portfolio</span>
            </NuxtLink>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useLocalePath, useHead } from '#imports';

// Custom page transition with GSAP to give it a completely different feel
definePageMeta({
  pageTransition: {
    name: 'custom-page',
    mode: 'out-in',
    onEnter: (el, done) => {
      if (window.gsap) {
        window.gsap.fromTo(el, 
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", onComplete: done }
        );
      } else {
        done();
      }
    },
    onLeave: (el, done) => {
      if (window.gsap) {
        window.gsap.to(el, 
          { opacity: 0, y: -50, duration: 0.5, ease: "power2.in", onComplete: done }
        );
      } else {
        done();
      }
    }
  }
});

const route = useRoute();
const localePath = useLocalePath();
const slug = route.params.slug;

const GRAPHQL_URL = 'https://api.apexdigital.dev/graphql';

const { data: project, pending } = await useFetch(GRAPHQL_URL, {
  key: `portfolio-${slug}`,
  method: 'POST',
  body: {
    query: `
      query GetPortfolioBySlug($slug: ID!) {
        portfolioItem(id: $slug, idType: SLUG) {
          title
          content
          client
          clientLogo
          description1
          description2
          description3
          additionalInfo
          website
          gallery {
            sourceUrl
            altText
          }
          featuredImage {
            node { sourceUrl altText }
          }
        }
      }
    `,
    variables: { slug },
  },
  transform: (response) => {
    const item = response?.data?.portfolioItem;
    if (!item) return null;

    return {
      title: item.title,
      client: item.client || '',
      clientLogo: item.clientLogo || '',
      description: item.description1 || item.content || '',
      goal: item.description2 || '',
      steps: item.description3 || '',
      results: item.additionalInfo || '',
      website: item.website || '',
      featuredImage: item.featuredImage?.node?.sourceUrl || '',
      gallery: item.gallery || [],
    };
  },
});

useHead({
  title: () => `${project.value?.title || 'Project'} | Apex Digital`,
});

onMounted(() => {
  setTimeout(() => {
    if (window.initFancybox) window.initFancybox();
    if (window.refreshScrollAnimations) window.refreshScrollAnimations();
    // Re-initialize GSAP features
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }, 150);
});
</script>
