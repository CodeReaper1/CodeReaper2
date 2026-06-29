export default defineNuxtConfig({
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  modules: ['@nuxtjs/color-mode', 'nuxt-graphql-client'],

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap',
        },
      ],
    },
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  css: ['~/app/assets/css/coconut-theme.css'],

  runtimeConfig: {
    public: {
      'graphql-client': {
        clients: {
          default: {
            host: process.env.GQL_HOST || 'http://localhost:4000/graphql',
            headers: { Origin: process.env.APP_HOST || 'http://localhost:3000' },
            tokenStorage: false,
            fetchOptions: {
              mode: 'cors',
              credentials: 'include',
            },
          },
        },
      },
    },
  },

  nitro: {
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
  },
});
