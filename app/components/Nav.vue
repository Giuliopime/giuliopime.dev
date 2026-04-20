<template>
  <div class="flex items-center justify-between font-[sohne-mono] text-xs py-3 tracking-tight">
    <div class="vert-center gap-1">
      <nuxt-link to="/">
        <img src="/favicon.ico" alt="home" class="w-[1.4rem] h-auto hover:opacity-75" />
      </nuxt-link>
      <nuxt-link to="/projects" class="nav-button"><span class="mr-1">[P]</span>PROJECTS</nuxt-link>
      <nuxt-link to="/blog" class="nav-button"><span class="mr-1">[B]</span>BLOG</nuxt-link>
      <nuxt-link to="/guides" class="nav-button"><span class="mr-1">[G]</span>GUIDES</nuxt-link>
    </div>

    <div class="vert-center">
      <a href="mailto:ping@giuliopime.dev" class="nav-button"><span class="mr-1">[C]</span>CONTACT</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>
.nav-button {
  @apply py-1 px-2 bg-sky bg-opacity-20 text-sky hover:bg-opacity-100 hover:text-black;
}
</style>