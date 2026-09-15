<template>
  <div class="mil-wrapper" id="top">
      <!-- cursor -->
      <div class="mil-ball">
        <span class="mil-icon-1">
          <svg viewBox="0 0 128 128">
              <path d="M106.1,41.9c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2L116.8,61H11.2l14.9-14.9c1.2-1.2,1.2-3.1,0-4.2 c-1.2-1.2-3.1-1.2-4.2,0l-20,20c-1.2,1.2-1.2,3.1,0,4.2l20,20c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2  L11.2,67h105.5l-14.9,14.9c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l20-20c1.2-1.2,1.2-3.1,0-4.2L106.1,41.9  z" />
          </svg>
        </span>
        <div class="mil-more-text">{{ $t('layout.cursor.more') }}</div>
        <div class="mil-choose-text">{{ $t('layout.cursor.choose') }}</div>
      </div>
      <!-- cursor end -->

      <!-- preloader -->
      <div class="mil-preloader" style="z-index: 999999 !important;">
        <div class="mil-preloader-animation">
          <div class="mil-pos-abs mil-animation-1">
            <p class="mil-h3 mil-muted mil-thin">{{ $t('layout.preloader.l1') }}</p>
            <p class="mil-h3 mil-muted">{{ $t('layout.preloader.l2') }}</p>
            <p class="mil-h3 mil-muted mil-thin">{{ $t('layout.preloader.l3') }}</p>
          </div>
          <div class="mil-pos-abs mil-animation-2">
            <div class="mil-reveal-frame">
              <p class="mil-reveal-box"></p>
              <p class="mil-h3 mil-muted mil-thin">{{ $t('layout.preloader.l4') }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- preloader end -->

      <!-- scrollbar progress -->
      <div class="mil-progress-track">
          <div class="mil-progress"></div>
      </div>
      <!-- scrollbar progress end -->

    <!-- menu -->
    <div class="mil-menu-frame">
      <div class="mil-frame-top">
          <NuxtLink to="/" class="mil-logo">A.</NuxtLink>
          <div class="mil-menu-btn">
              <span></span>
          </div>
      </div>
      <div class="container">
        <div class="mil-menu-content">
          <div class="row">
            <div class="col-xl-5">
              <nav class="mil-main-menu" id="swupMenu">
                <ul>
                  <li class="mil-has-children"><NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink></li>
                  <li class="mil-has-children"><NuxtLink :to="localePath('/portfolio')">{{ $t('nav.portfolio') }}</NuxtLink></li>
                  <li class="mil-has-children">
                    <!-- Toggles the submenu only — the overview page is the first item inside it -->
                    <a
                      role="button"
                      tabindex="0"
                      style="cursor: pointer"
                      @keydown.enter.prevent="$event.currentTarget.click()"
                      @keydown.space.prevent="$event.currentTarget.click()"
                    >{{ $t('nav.services') }}</a>
                    <ul>
                        <li><NuxtLink :to="localePath('/services')">{{ $t('nav.all_services') }}</NuxtLink></li>
                        <li><NuxtLink :to="localePath('/seo')">{{ $t('nav.seo') }}</NuxtLink></li>
                        <li><NuxtLink :to="localePath('/web-development')">{{ $t('nav.web_dev') }}</NuxtLink></li>
                        <li><NuxtLink :to="localePath('/digital-marketing')">{{ $t('nav.digital_marketing') }}</NuxtLink></li>
                    </ul>
                  </li>
                  <li class="mil-has-children"><NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink></li>
                  <li v-if="$i18n.locale === 'en'" style="margin-top:20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top:20px;"><NuxtLink :to="switchLocalePath('bg')">🇧🇬 &nbsp; Български</NuxtLink></li>
                  <li v-else style="margin-top:20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top:20px;"><NuxtLink :to="switchLocalePath('en')">🇬🇧 &nbsp; English</NuxtLink></li>
                </ul>
              </nav>
            </div>
            <div class="col-xl-7">
              <div class="mil-menu-right-frame">
                <div class="mil-animation-in">
                  <div class="mil-animation-frame">
                    <div class="mil-animation mil-position-1 mil-scale" data-value-1="2" data-value-2="2"></div>
                  </div>
                </div>
                <div class="mil-menu-right">
                    <div class="row">
                        <div class="col-lg-8 mil-mb-60">
                            <h6 class="mil-muted mil-mb-30">{{ $t('layout.menu.projects') }}</h6>
                            <ul class="mil-menu-list">
                                <li><a href="#" class="mil-light-soft">{{ $t('layout.menu.project1') }}</a></li>
                                <li><a href="#" class="mil-light-soft">{{ $t('layout.menu.project2') }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- menu -->

    <!-- curtain -->
    <div class="mil-curtain"></div>
    <!-- curtain end -->

    <!-- frame -->
    <div class="mil-frame">
      <div class="mil-frame-top">
          <NuxtLink to="/" class="mil-logo">A.</NuxtLink>
          <div class="mil-menu-btn">
              <span></span>
          </div>
      </div>
      <div class="mil-frame-bottom">
          <div class="mil-current-page">{{ currentPageName }}</div>
          <div class="mil-back-to-top">
              <a href="#top" class="mil-link mil-dark mil-arrow-place">
                  <span>{{ $t('layout.frame.back_to_top') }}</span>
              </a>
          </div>
      </div>
    </div>
    <!-- frame end -->

    <!-- content -->
    <div class="mil-content">
      <div class="mil-main-transition">
        <slot />
      </div>
    </div>
    <!-- content end -->

    <!-- footer -->
    <footer class="mil-dark-bg">
      <div class="mi-invert-fix">
          <div class="container mil-p-120-60">
              <div class="row justify-content-between">
                  <div class="col-md-4 col-lg-4 mil-mb-60">
                      <div class="mil-muted mil-logo mil-up mil-mb-30">Apex Digital</div>
                      <p class="mil-light-soft mil-up mil-mb-30">{{ $t('footer.subscribe') }}</p>
                      <form class="mil-subscribe-form mil-up">
                          <input type="text" :placeholder="$t('footer.email')">
                          <button type="submit" class="mil-button mil-icon-button-sm mil-arrow-place"></button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </footer>
    <!-- footer end -->

    <!-- hidden elements -->
    <div class="mil-hidden-elements">
      <div class="mil-dodecahedron">
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="mil-pentagon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      </div>
      <!-- SVGs for shapes -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mil-arrow">
          <path d="M 14 5.3417969 C 13.744125 5.3417969 13.487969 5.4412187 13.292969 5.6367188 L 13.207031 5.7226562 C 12.816031 6.1136563 12.816031 6.7467188 13.207031 7.1367188 L 17.070312 11 L 4 11 C 3.448 11 3 11.448 3 12 C 3 12.552 3.448 13 4 13 L 17.070312 13 L 13.207031 16.863281 C 12.816031 17.254281 12.816031 17.887344 13.207031 18.277344 L 13.292969 18.363281 C 13.683969 18.754281 14.317031 18.754281 14.707031 18.363281 L 20.363281 12.707031 C 20.754281 12.316031 20.754281 11.682969 20.363281 11.292969 L 14.707031 5.6367188 C 14.511531 5.4412187 14.255875 5.3417969 14 5.3417969 z" />
      </svg>
      <svg width="250" viewBox="0 0 300 1404" fill="none" xmlns="http://www.w3.org/2000/svg" class="mil-lines">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 892L1 941H299V892C299 809.71 232.29 743 150 743C67.7096 743 1 809.71 1 892ZM0 942H300V892C300 809.157 232.843 742 150 742C67.1573 742 0 809.157 0 892L0 942Z" class="mil-move" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M299 146V97L1 97V146C1 228.29 67.7096 295 150 295C232.29 295 299 228.29 299 146ZM300 96L0 96V146C0 228.843 67.1573 296 150 296C232.843 296 300 228.843 300 146V96Z" class="mil-move" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M299 1H1V1403H299V1ZM0 0V1404H300V0H0Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M150 -4.37115e-08L150 1404L149 1404L149 0L150 -4.37115e-08Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M150 1324C232.29 1324 299 1257.29 299 1175C299 1092.71 232.29 1026 150 1026C67.7096 1026 1 1092.71 1 1175C1 1257.29 67.7096 1324 150 1324ZM150 1325C232.843 1325 300 1257.84 300 1175C300 1092.16 232.843 1025 150 1025C67.1573 1025 0 1092.16 0 1175C0 1257.84 67.1573 1325 150 1325Z" class="mil-move" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M300 1175H0V1174H300V1175Z" class="mil-move" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M150 678C232.29 678 299 611.29 299 529C299 446.71 232.29 380 150 380C67.7096 380 1 446.71 1 529C1 611.29 67.7096 678 150 678ZM150 679C232.843 679 300 611.843 300 529C300 446.157 232.843 379 150 379C67.1573 379 0 446.157 0 529C0 611.843 67.1573 679 150 679Z" class="mil-move" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M299 380H1V678H299V380ZM0 379V679H300V379H0Z" class="mil-move" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocalePath, useSwitchLocalePath } from '#i18n';

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const currentPageName = computed(() => {
  const path = route.path;
  if (path === '/') return 'HOMEPAGE';
  if (path.startsWith('/portfolio')) return 'PORTFOLIO';
  if (path.startsWith('/services')) return 'SERVICES';
  if (path.startsWith('/contact')) return 'CONTACT';
  return '';
});

onMounted(() => {
  // Initialize nav color inversion (polls for GSAP availability)
  const navPoll = setInterval(() => {
    if (window.gsap && window.ScrollTrigger) {
      clearInterval(navPoll);
      if (window.__initNavColorInversion) {
        // Small delay for DOM to settle
        setTimeout(() => window.__initNavColorInversion(), 200);
      }
    }
  }, 50);

  // We loaded main.js globally via nuxt.config.ts, but we need to trigger the swup event
  // so main.js knows when Nuxt routes have changed
  router.afterEach(() => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      document.dispatchEvent(new Event("swup:contentReplaced"));
      
      // Clean up and re-append SVGs (like arrows, dodecahedron)
      if (window.reinitAppend) window.reinitAppend();

      // Re-initialize GSAP animations for the new route
      if (window.refreshScrollAnimations) window.refreshScrollAnimations();
      if (window.reinitCursor) window.reinitCursor();
      if (window.reinitProgressBar) window.reinitProgressBar();
      if (window.initItemSlider1) window.initItemSlider1();
      if (window.initItemSlider2) window.initItemSlider2();
      
      // Attempt to re-init ScrollTrigger if object exists globally
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }

      // Re-initialize nav color inversion for the new route
      if (window.__cleanupNavColorInversion) window.__cleanupNavColorInversion();
      setTimeout(() => {
        if (window.__initNavColorInversion) window.__initNavColorInversion();
      }, 300);
    }, 100);
  });
});

onUnmounted(() => {
  if (window.__cleanupNavColorInversion) window.__cleanupNavColorInversion();
});
</script>

<style>
/* ── Chrome stacking overrides ───────────────────────────────────
   The original theme uses very low z-indices on the menu (9),
   curtain (4), and frame (2). Page sections with Tailwind z-10/z-20
   leak through the open menu. Lift the chrome above any reasonable
   page-level z-index so the menu fully covers content when open.
*/
.mil-curtain { z-index: 9990 !important; }
.mil-menu-frame { z-index: 9991 !important; }
.mil-frame { z-index: 9999 !important; }

/* The theme sets `overflow: hidden` here, which makes the wrapper a scroll
   container and stops `position: sticky` anywhere inside a page from ever
   sticking. `clip` hides the same overflow without creating that container. */
.mil-wrapper { overflow: clip; }

/* Force the always-visible logo and burger to white whenever the menu
   is open (otherwise data-nav-theme="light" sections leave them dark
   and they read poorly against the menu's black background). */
.mil-menu-frame.mil-active ~ .mil-frame .mil-logo {
  color: #fff !important;
}
.mil-menu-frame.mil-active ~ .mil-frame .mil-menu-btn span,
.mil-menu-frame.mil-active ~ .mil-frame .mil-menu-btn span::before,
.mil-menu-frame.mil-active ~ .mil-frame .mil-menu-btn span::after {
  background: #fff !important;
}

/* ── Nav color inversion system ──────────────────────────────────
   Uses [data-nav-theme] on sections to switch logo/burger color.
   Falls back to auto-detection if attribute is missing.
*/

/* Default: Dark elements for light backgrounds */
.mil-frame .mil-frame-top .mil-logo {
  color: #000;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.mil-frame .mil-frame-top .mil-menu-btn span,
.mil-frame .mil-frame-top .mil-menu-btn span:after,
.mil-frame .mil-frame-top .mil-menu-btn span:before {
  background: #000;
  transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Page name and back-to-top */
.mil-frame .mil-frame-bottom .mil-current-page {
  color: #000;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.mil-frame .mil-frame-bottom .mil-back-to-top a,
.mil-frame .mil-frame-bottom .mil-back-to-top a span {
  color: #000;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Frame Dark Theme: White elements for dark backgrounds */
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-logo {
  color: #fff !important;
}
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-menu-btn span,
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-menu-btn span:after,
.mil-frame[data-nav-theme="dark"] .mil-frame-top .mil-menu-btn span:before {
  background: #fff !important;
}
.mil-frame[data-nav-theme="dark"] .mil-frame-bottom .mil-current-page {
  color: #fff !important;
}
.mil-frame[data-nav-theme="dark"] .mil-frame-bottom .mil-back-to-top a,
.mil-frame[data-nav-theme="dark"] .mil-frame-bottom .mil-back-to-top a span {
  color: #fff !important;
}

/* Mobile: Force dark header bar (standard theme behavior) */
@media screen and (max-width: 1200px) {
  .mil-frame .mil-frame-top .mil-logo {
    color: #fff !important;
  }
  .mil-frame .mil-frame-top .mil-menu-btn span,
  .mil-frame .mil-frame-top .mil-menu-btn span:after,
  .mil-frame .mil-frame-top .mil-menu-btn span:before {
    background: #fff !important;
  }
}
</style>

<script>
// ── Nav color inversion system ─────────────────────
import { onMounted, onUnmounted } from 'vue';

let navColorCleanup = null;

function initNavColorInversion() {
  if (typeof window === 'undefined') return;
  if (!window.gsap || !window.ScrollTrigger) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const frame = document.querySelector('.mil-frame');
  if (!frame) return;

  const triggers = [];
  const contentArea = document.querySelector('.mil-content');
  if (!contentArea) return;

  // Find all sections, footers and any div with bg classes
  const sections = Array.from(contentArea.querySelectorAll('section, footer, header, .mil-dark-bg, [data-nav-theme]'));

  sections.forEach((section) => {
    const isDark = isDarkSection(section);
    
    // Create ScrollTrigger for each section
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 50px", // Trigger when section top hits the frame bottom area
      end: "bottom 50px",
      onToggle: (self) => {
        if (self.isActive) {
          setFrameMode(frame, isDark);
        }
      },
      // Ensure it works on initial load if we're already scrolled
      onUpdate: (self) => {
        if (self.isActive) {
          setFrameMode(frame, isDark);
        }
      }
    });
    triggers.push(st);
  });

  // Fallback: Check if we are inside any section on load
  setTimeout(() => {
    let found = false;
    triggers.forEach(t => {
      if (t.isActive) {
        setFrameMode(frame, isDarkSection(t.trigger));
        found = true;
      }
    });
    // If not in any section, default to light
    if (!found) setFrameMode(frame, false);
  }, 100);

  navColorCleanup = () => {
    triggers.forEach((st) => st.kill());
    triggers.length = 0;
  };
}

function isDarkSection(el, depth = 0) {
  if (!el || depth > 5) return false;

  // 1. Check explicit data attribute (priority — overrides everything)
  const explicitTheme = el.getAttribute && el.getAttribute('data-nav-theme');
  if (explicitTheme === 'dark') return true;
  if (explicitTheme === 'light') return false;

  // 2. Check explicit classes
  if (el.classList && el.classList.contains('mil-dark-bg')) return true;
  if (el.tagName === 'FOOTER') return true;

  // 3. Check className for dark Tailwind / arbitrary-hex hints
  const cls = (typeof el.className === 'string') ? el.className : '';
  if (/bg-(black|gray-900|gray-800|zinc-950|slate-950|background-dark)/.test(cls)) return true;
  if (cls.includes('bg-[#0')) return true; // matches bg-[#050505], bg-[#0a0a0a], etc.

  // 4. Check computed background luminance
  let isTransparent = false;
  try {
    const style = window.getComputedStyle(el);
    const bg = style.backgroundColor;

    if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)' || bg === 'rgba(255, 255, 255, 0)') {
      isTransparent = true;
    } else {
      const match = bg.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
        // Section has a real background — verdict is final
        return luminance < 128;
      }
    }
  } catch (e) {
    // Ignore errors in computed style
  }

  // 5. Section is transparent — walk up to the nearest ancestor with a real bg.
  // This is what catches pages like /seo where the wrapping <main class="bg-[#0a0a0a]">
  // is dark but inner <section>s are transparent.
  if (isTransparent && el.parentElement) {
    return isDarkSection(el.parentElement, depth + 1);
  }

  return false;
}

function setFrameMode(frame, isDark) {
  if (isDark) {
    frame.setAttribute('data-nav-theme', 'dark');
  } else {
    frame.setAttribute('data-nav-theme', 'light');
  }
}

if (typeof window !== 'undefined') {
  window.__initNavColorInversion = initNavColorInversion;
  window.__cleanupNavColorInversion = () => {
    if (navColorCleanup) navColorCleanup();
  };
}
</script>

