
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

  // Helper for SplitText (since we don't have Club GSAP globally)
  const splitTextToChars = (elementSelector) => {
      const el = document.querySelector(elementSelector);
      if (!el) return [];
      const text = el.innerText;
      el.innerHTML = '';
      const chars = [];
      for (let char of text) {
          if (char === ' ') {
              el.appendChild(document.createTextNode(' '));
          } else if (char === '\n') {
              el.appendChild(document.createElement('br'));
          } else {
              const span = document.createElement('span');
              span.innerText = char;
              span.style.display = 'inline-block';
              span.style.opacity = '0'; // Initial state for GSAP
              // Force white color for title specifically to override style.css
              if (elementSelector.includes('dm-hero-title')) {
                  span.style.color = 'white';
                  span.style.setProperty('color', 'white', 'important');
              }
              span.classList.add('char-animate');
              el.appendChild(span);
              chars.push(span);
          }
      }
      return chars;
  };

  // 1. Hero Title GSAP Reveal Sequence
  setTimeout(() => {
      const heroChars = splitTextToChars('.pf-hero-title');
      
      const tl = gsap.timeline();
      
      tl.to(heroChars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "power3.out"
      });
  }, 100);

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
