import tailwindcss from '@tailwindcss/vite';

// https://nuxt.comO/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [],
    },
  },

  colorMode: {
    preference: 'dark',
  },

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
        },
        highlight: {
          theme: 'gruvbox-dark-hard',
          langs: ['kotlin', 'swift', 'yaml'],
        },
      },
    },
  },
});
