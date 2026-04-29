// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/icon', '@vueuse/nuxt'],

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