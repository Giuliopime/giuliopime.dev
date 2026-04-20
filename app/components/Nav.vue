<template>
  <div class="w-full grid grid-cols-3 items-center py-3 px-6 font-thin border-b-[1px] border-gray-500 bg-black text-white">
    <nuxt-link to="/" class="no-underline">/</nuxt-link>
    <span class="justify-self-center">
      {{ route.path.slice(1) }}
    </span>
<!--    <div class="justify-self-end flex items-center gap-4">-->
<!--      <nuxt-link to="/blog" class="no-underline">blog</nuxt-link>-->
<!--      <nuxt-link to="/guides" class="no-underline">guides</nuxt-link>-->
<!--      <nuxt-link to="/projects" class="no-underline">projects</nuxt-link>-->
<!--    </div>-->
    <p class="justify-self-end font-thin"><nuxt-link to="blog" class="no-underline">blog</nuxt-link>&nbsp;&nbsp;•&nbsp;&nbsp;<nuxt-link to="guides" class="no-underline">guides</nuxt-link>&nbsp;&nbsp;•&nbsp;&nbsp;<nuxt-link to="projects" class="no-underline">projects</nuxt-link></p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>