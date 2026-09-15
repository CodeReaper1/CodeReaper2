export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'bg', iso: 'bg-BG', file: 'bg.json', name: 'Български' }
    ],
    defaultLocale: 'en',
    // Without this a key missing from a locale renders as the raw key path.
    vueI18n: './i18n.config.ts',
    lazy: true,
    strategy: 'prefix_except_default', // '/bg' for Bulgarian, '/' for English
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Apex Digital | Headless',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'stylesheet', href: '/css/plugins/bootstrap-grid.css' },
        { rel: 'stylesheet', href: '/css/plugins/font-awesome.min.css' },
        { rel: 'stylesheet', href: '/css/plugins/swiper.min.css' },
        { rel: 'stylesheet', href: '/css/plugins/fancybox.min.css' },
        { rel: 'stylesheet', href: '/css/style.css' }
      ],
      script: [
        { src: 'https://code.jquery.com/jquery-3.6.0.min.js', tagPosition: 'bodyClose' },
        { src: '/js/plugins/swiper.min.js', tagPosition: 'bodyClose' },
        { src: '/js/plugins/fancybox.min.js', tagPosition: 'bodyClose' },
        { src: '/js/plugins/gsap.min.js', tagPosition: 'bodyClose' },
        // { src: '/js/plugins/smooth-scroll.js', tagPosition: 'bodyClose' },
        { src: '/js/plugins/ScrollTrigger.min.js', tagPosition: 'bodyClose' },
        { src: '/js/plugins/ScrollTo.min.js', tagPosition: 'bodyClose' },
        // Excluding swup and relying on Vue Router
        { src: '/js/main.js', tagPosition: 'bodyClose' }
      ]
    }
  }
})