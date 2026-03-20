<template>
  <div class="portfolio-page-wrapper bg-[#050505] min-h-screen">
    
    <!-- 2. The 3D Interactive Slider -->
    <div class="stitch-portfolio-v2 relative pt-20" id="portfolio-slider">
      <!-- Flying particles simulation -->
      <div class="particle p1"></div>
      <div class="particle p2"></div>
      <div class="particle p3"></div>
      <div class="particle p4"></div>

      <!-- Slider Content -->
      <main class="slider-content">
      
      <!-- View Toggle -->
      <div class="view-toggle">
        <button class="toggle-btn" :class="{ active: viewMode === 'mobile' }" @click="viewMode = 'mobile'">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M11 18H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ $t('projects.mobile').toUpperCase() }}
        </button>
        <button class="toggle-btn" :class="{ active: viewMode === 'desktop' }" @click="viewMode = 'desktop'">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="20" height="13" rx="2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M8 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ $t('projects.desktop').toUpperCase() }}
        </button>
      </div>

      <!-- Device Container -->
      <div class="device-wrapper" :class="viewMode" ref="imageWrapper">
        <div v-if="viewMode === 'mobile'" class="phone-notch"></div>
        <div v-if="viewMode === 'desktop'" class="browser-bar">
          <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
        </div>
        <img class="main-image" :src="currentProject.image" :alt="currentProject.subtitle" ref="mainImage" />
      </div>

    <!-- Top Project Meta & Title -->
    <div class="project-info-bottom" ref="projectInfoTop">
      <div class="meta-row">
        <span class="client">{{ $t('projects.client').toUpperCase() }}: <strong>{{ currentProject.client }}</strong></span>
        <span class="date">{{ $t('projects.date').toUpperCase() }}: <strong>{{ currentProject.date }}</strong></span>
      </div>

      <h1 class="project-title">
        <span class="title-main" v-html="currentProject.title"></span><br/>
        <span class="title-sub"><em>*{{ currentProject.subtitle }}*</em></span>
      </h1>

      <!-- Bottom Card / View Button -->
      <div class="action-card" ref="actionCard">
        <NuxtLink :to="localePath(currentProject.link)" class="view-btn">
          {{ $t('projects.view_project').toUpperCase() }}
          <span class="arrow-circle">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--primary-orange)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </NuxtLink>
      </div>
    </div>

    </main>

    <!-- Navigation Pill -->
    <footer class="slider-nav" ref="sliderNav">
       <div class="navigation-pill">
         <button class="nav-btn prev" @click="prevSlide" :disabled="currentIndex === 0">
           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </button>
         <span class="numbers">{{ currentIndex + 1 }} / {{ projects.length }}</span>
         <button class="nav-btn next" @click="nextSlide" :disabled="currentIndex === projects.length - 1">
           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </button>
       </div>
    </footer>
    </div>
  </div>
</template>

<script setup>
import { useLocalePath } from '#i18n';
const localePath = useLocalePath();

import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Removed layout: false to restore the global layout (menu, dodecahedron figures, footer)
// definePageMeta({
//   layout: false 
// });

// Import the missing "Outfit" font locally via Head manipulation
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;600;800&display=swap' }
  ]
});

const runtimeConfig = useRuntimeConfig();
const graphqlUrl = "https://api.apexdigital.dev/graphql";

const { data, pending, error } = await useFetch(graphqlUrl, {
  method: 'POST',
  body: {
    query: `
      query GetPortfolios {
        portfolioItems(first: 20) {
          nodes {
            id
            title
            slug
            date
            client
            clientLogo
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `
  },
  transform: (response) => {
    // Transform the GraphQL nodes into our standard expected project array format
    if (!response?.data?.portfolioItems?.nodes) return [];
    
    return response.data.portfolioItems.nodes.map(node => ({
      client: node.client || 'Apex Digital',
      date: new Date(node.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).toUpperCase(),
      title: node.title.toUpperCase(),
      subtitle: 'WEB PROJECT', // Fallback as WP custom fields are missing from early queries
      image: node.featuredImage?.node?.sourceUrl || '/img/photo/1.jpg',
      link: `/portfolio/${node.slug}`
    }));
  }
});

const projects = computed(() => {
  return data.value && data.value.length > 0 ? data.value : [
    // Fallback if WP fails or returns empty
    {
      client: 'NEXUS TECH',
      date: 'JAN 2024',
      title: 'B2B <strong>SAAS DASHBOARD</strong>',
      subtitle: 'WEB APP',
      image: '/img/photo/2.jpg',
      link: '/portfolio/b2b-saas'
    }
  ];
});

const currentIndex = ref(0);
const currentProject = computed(() => projects.value[currentIndex.value] || projects.value[0]);

const viewMode = ref('mobile'); // 'mobile' | 'desktop'

const imageWrapper = ref(null);
const mainImage = ref(null);
const projectInfoTop = ref(null);
const actionCard = ref(null);
const sliderNav = ref(null);

const animateTransition = (direction) => {
  const tl = gsap.timeline();
  
  tl.to([mainImage.value, projectInfoTop.value], {
    opacity: 0,
    y: direction === 'next' ? -15 : 15,
    duration: 0.3,
    ease: "power2.inOut"
  })
  .to(imageWrapper.value, {
    scale: 0.95,
    rotationY: direction === 'next' ? -5 : 5, 
    duration: 0.3,
    ease: "power1.inOut"
  }, "<")
  
  .call(() => {
    if (direction === 'next') currentIndex.value++;
    else currentIndex.value--;
  })
  
  .fromTo([mainImage.value, projectInfoTop.value], 
    { opacity: 0, y: direction === 'next' ? 15 : -15 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 }
  )
  .to(imageWrapper.value, {
    scale: 1,
    rotationY: 0,
    duration: 0.5,
    ease: "back.out(1.2)"
  }, "<");
};

const nextSlide = () => {
  if (currentIndex.value < projects.value.length - 1) {
    animateTransition('next');
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    animateTransition('prev');
  }
};

onMounted(() => {
  // Register ScrollTrigger
  if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
  }

  // Setup 3D perspective for the slider wrapper
  gsap.set(imageWrapper.value, { perspective: 800 });

  gsap.from(imageWrapper.value, {
    opacity: 0,
    scale: 0.9,
    y: 40,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: {
        trigger: ".stitch-portfolio-v2",
        start: "top 75%"
    }
  });
  
  gsap.from([projectInfoTop.value, sliderNav.value], {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".stitch-portfolio-v2",
        start: "top 70%"
    }
  });

  // Floating particles
  gsap.to(".particle", {
    y: "random(-100, 100)",
    x: "random(-100, 100)",
    rotation: "random(0, 360)",
    duration: "random(4, 10)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      amount: 4,
      each: 0.5
    }
  });
});
</script>

<style scoped>
/* Core Variables & Reset */
.stitch-portfolio-v2 {
  --primary-orange: #ff9900;
  --bg-dark: #07070a; /* Pure blackish */
  --text-light: #ffffff;
  --text-muted: #888888;
  
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-dark);
  background-image: url('/img/bg-stars.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: var(--text-light);
  font-family: 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.stitch-portfolio-v2::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at center, rgba(7,7,10,0.7) 0%, rgba(7,7,10,0.95) 100%);
  pointer-events: none;
  z-index: 0;
}

/* Particles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--primary-orange);
  border-radius: 50%;
  filter: blur(2px) drop-shadow(0 0 8px var(--primary-orange));
  opacity: 0.6;
  z-index: 0;
}
.p1 { top: 20%; left: 15%; width: 4px; height: 4px; }
.p2 { top: 35%; right: 20%; width: 8px; height: 8px; }
.p3 { bottom: 40%; left: 25%; }
.p4 { top: 15%; right: 35%; width: 3px; height: 3px; }

/* Header */
.slider-header {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;
}

.logo {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
}
.logo .dot { color: var(--primary-orange); }

.menu-btn {
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-btn svg { width: 28px; height: 28px; }

/* Main Content Layout */
.slider-content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 5%;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

/* Toggle Switch UI */
.view-toggle {
  display: inline-flex;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 30px;
  padding: 5px;
  margin: 0 auto 30px auto;
  gap: 5px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 10px 24px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.toggle-btn svg {
  width: 18px; 
  height: 18px;
  stroke: currentColor;
}

.toggle-btn.active {
  background: var(--text-light);
  color: var(--bg-dark);
}

/* Base Device Container with Morph Transitions */
.device-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #000;
  margin: 0 auto 30px auto;
  transition: max-width 0.6s cubic-bezier(0.8, 0, 0.2, 1), 
              aspect-ratio 0.6s cubic-bezier(0.8, 0, 0.2, 1), 
              border-radius 0.6s cubic-bezier(0.8, 0, 0.2, 1),
              border-width 0.6s cubic-bezier(0.8, 0, 0.2, 1),
              box-shadow 0.6s cubic-bezier(0.8, 0, 0.2, 1);
}

/* State: Mobile/Phone */
.device-wrapper.mobile {
  max-width: 250px;
  aspect-ratio: 9/19;
  border-radius: 36px;
  border: 8px solid #1a1a1a;
  box-shadow: 
    0 0 0 2px #333,
    0 30px 60px rgba(0,0,0,0.8), 
    0 0 40px rgba(255, 153, 0, 0.25),
    inset 0 0 15px rgba(255, 153, 0, 0.15);
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 20px;
  background: #1a1a1a;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  z-index: 5;
}

/* State: Desktop/Browser */
.device-wrapper.desktop {
  max-width: 800px;
  aspect-ratio: 16/10;
  border-radius: 12px;
  border: 4px solid #1a1a1a;
  box-shadow: 
    0 0 0 2px #333,
    0 30px 60px rgba(0,0,0,0.8), 
    0 0 60px rgba(255, 153, 0, 0.15),
    inset 0 0 20px rgba(255, 153, 0, 0.05);
}

.browser-bar {
  height: 24px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
  border-bottom: 1px solid #333;
  z-index: 5;
  position: relative;
}

.browser-bar .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.r { background: #ff5f56; }
.dot.y { background: #ffbd2e; }
.dot.g { background: #27c93f; }

/* Image scaling inside active container */
.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.95;
  transition: opacity 0.3s ease;
}

/* Typography & Info (Centered vertically below) */
.project-info-bottom {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.meta-row {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 15px;
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--text-muted);
  text-transform: uppercase;
}
.meta-row strong {
  color: var(--text-light);
  font-weight: 600;
}

.project-title {
  font-size: 52px;
  line-height: 1.1;
  font-weight: 300;
  margin-bottom: 25px;
}
/* Ensure the strong tag parsed via v-html is white and bold! */
:deep(.title-main strong) {
  font-weight: 800;
  color: var(--text-light);
}

.title-sub {
  font-style: italic;
  font-weight: 200;
  font-size: 40px;
  color: #cccccc;
}

/* Action Card / View Button */
.action-card {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.view-btn {
  display: inline-flex;
  align-items: center;
  background: var(--primary-orange);
  color: var(--bg-dark);
  padding: 16px 36px;
  border-radius: 40px;
  font-weight: 800;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 1px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.view-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 25px rgba(255, 153, 0, 0.4);
}

.arrow-circle {
  background: var(--bg-dark);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}

.arrow-circle svg {
  width: 18px;
  height: 18px;
  stroke: var(--primary-orange);
}

/* Bottom Navigation */
.slider-nav {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px;
  margin-bottom: 10px;
}

.navigation-pill {
  display: inline-flex;
  align-items: center;
  background: #111113;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  padding: 8px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.nav-btn {
  background: transparent;
  border: none;
  color: var(--text-light);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s ease;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.nav-btn:hover:not(:disabled) {
  color: var(--primary-orange);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.navigation-pill .numbers {
  margin: 0 20px;
  font-weight: 600;
  font-size: 14px;
  color: var(--text-muted);
}

/* Responsive / Screen Fitting adjustments */
@media (max-width: 768px), (max-height: 850px) {
  .logo { font-size: 24px; }
  .slider-header { padding: 15px 20px; }
  .menu-btn svg { width: 24px; height: 24px; }
  
  .slider-content {
      padding: 0 5%;
      align-items: center;
      justify-content: flex-start;
  }
  
  .view-toggle { 
      margin-bottom: 25px; 
      padding: 5px;
  }
  .toggle-btn { 
      padding: 8px 18px; 
      font-size: 12px; 
  }

  /* Shrink device heavily to fit viewport height, but give it breathing room */
  .device-wrapper.mobile { 
      height: 35vh; /* Scale strictly by height */
      min-height: 220px;
      max-height: 380px;
      width: auto; /* Let aspect ratio determine width */
      max-width: none;
      border-width: 5px;
      border-radius: 24px;
      margin-bottom: 25px;
  }
  .phone-notch { width: 80px; height: 14px; border-radius: 0 0 10px 10px; }

  /* Ensure desktop ratio is strictly maintained and scales down */
  .device-wrapper.desktop { 
      width: 100%;
      height: auto;
      max-height: none; /* Prevent squashing on short viewports */
      aspect-ratio: 16/10; 
      margin-bottom: 25px;
  }
  .browser-bar { height: 18px; padding: 0 10px; }
  .browser-bar .dot { width: 8px; height: 8px; }

  .meta-row { 
      gap: 20px; 
      margin-bottom: 12px; 
      font-size: 12px; 
  }
  
  /* Use clamp to avoid breaking large words on tiny screens */
  .project-title { 
      font-size: clamp(20px, 6vw, 26px); 
      margin-bottom: 15px; 
      word-wrap: break-word; /* Ensure extremely long words break if needed */
  }
  .title-sub { 
      font-size: clamp(14px, 4vw, 18px); 
  }

  /* MORE SPACING ABOVE NAVIGATION */
  .action-card { 
      margin-bottom: 40px; 
  }
  .view-btn { 
      padding: 12px 28px; 
      font-size: 13px; 
  }
  .arrow-circle {
      width: 28px;
      height: 28px;
      margin-left: 15px;
  }
  .arrow-circle svg { width: 16px; height: 16px; }

  /* LARGER NAVIGATION PILL ON MOBILE */
  .slider-nav { 
      padding: 10px; 
      margin-bottom: 15px; 
  }
  .navigation-pill { 
      padding: 10px 20px; 
  }
  .nav-btn {
      width: 44px;
      height: 44px;
  }
  .nav-btn svg { width: 22px; height: 22px; }
  .navigation-pill .numbers { margin: 0 16px; font-size: 15px; }
}

@media (max-width: 480px) and (max-height: 700px) {
  /* Extreme squeeze for small iPhones */
  .device-wrapper.mobile { 
      height: 30vh; 
      margin-bottom: 15px;
  }
  .view-toggle { margin-bottom: 15px; }
  .action-card { margin-bottom: 25px; }
  .project-title { font-size: clamp(18px, 5vw, 22px); }
  .title-sub { font-size: clamp(12px, 4vw, 16px); }
  .navigation-pill { padding: 8px 16px; }
  .nav-btn { width: 38px; height: 38px; }
}
</style>
