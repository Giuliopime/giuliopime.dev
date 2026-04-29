// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/icon', '@vueuse/nuxt'],

  app: {
    head: {
      title: 'giulio_pimenoff_uc.html',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content: 'i craft stuff'
        },

        {
          property: 'og:title',
          content: 'giulio_pimenoff_uc.html'
        },
        {
          property: 'og:description',
          content: 'i craft stuff'
        },
        {
          property: 'og:image',
          content: 'https://giuliopime.dev/pgp.png'
        },
        {
          property: 'og:url',
          content: 'https://giuliopime.dev'
        },
        {
          property: 'og:site_name',
          content: 'giulio_pimenoff_uc.html'
        },
        {
          property: 'og:type',
          content: 'website'
        },

        { name: 'theme-color', content: '#000000' },

        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
    },
  },

  tailwindcss: {
    cssPath: [`./app/assets/css/tailwind.css`, { injectPosition: "first" }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false
    }
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
        },
        highlight: {
          theme: 'gruvbox-dark-hard',
          langs: [
            'kotlin',
              'swift',
              'yaml'
          ]
        }
      }
    }
  }
})