<template>
  <div class="h-full py-20 flex flex-col items-center justify-center text-2xl text-center sm:text-start">
    <img src="~/assets/images/signature.png" alt="Giulio Pimenoff Verdolin" class="w-full sm:w-[44rem] h-auto px-6 sm:px-20" draggable="false"  />

    <div class="flex flex-col max-w-[46rem] mt-4 sm:mt-8 px-20">
      <p class="font-light">Software Engineer</p>

      <p class="font-thin mt-4">
        I architect and craft backends and iOS apps.
      </p>

<!--      <svg class="HeroDev-module__Ee_jna__Dev" viewBox="0 0 200 117" fill="none" xmlns="http://www.w3.org/2000/svg"><rect class="HeroDev-module__Ee_jna__rect" x="11" y="107" width="35" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="86" y="107" width="28" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="162" y="98" width="11" height="19" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="77" y="98" width="10" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="113" y="98" width="10" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="45" y="98" width="10" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="122" y="89" width="10" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="153" y="80" width="11" height="19" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="171" y="80" width="11" height="19" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="68" y="54" width="10" height="45" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="78" y="71" width="53" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="144" y="62" width="11" height="19" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="180" y="62" width="11" height="19" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="121" y="54" width="10" height="17" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="53" y="17" width="11" height="82" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="77" y="45" width="10" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" y="10" width="11" height="107" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="112" y="45" width="10" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="135" y="35" width="11" height="28" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="189" y="35" width="11" height="28" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="45" y="9" width="10" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" x="86" y="36" width="27" height="10" fill="currentColor" style="transform: translateY(0px);"></rect><rect class="HeroDev-module__Ee_jna__rect" width="46" height="10" fill="currentColor" style="transform: translateY(0px);"></rect></svg>-->

<!--      <p class="font-thin mt-2">-->
<!--        Read <nuxt-link to="blog">blog</nuxt-link> articles and <nuxt-link to="guides">guides</nuxt-link> that originate from my <nuxt-link to="projects">projects</nuxt-link> and find the colored words I wrote on <nuxt-link to="github" target="_blank">GitHub</nuxt-link>.-->
<!--      </p>-->
<!--      <p class="font-thin mt-2">-->
<!--        Read <nuxt-link to="github" target="_blank">code</nuxt-link>, <nuxt-link to="blog">articles</nuxt-link> and <nuxt-link to="guides">guides</nuxt-link> that originate from my <nuxt-link to="projects">projects</nuxt-link> and reach me at <nuxt-link to="email">giuliopime[at]gmail.com</nuxt-link>.-->
<!--      </p>-->

      <p class="font-thin mt-2">
         Reach me at <a href="mailto:ping@giuliopime.dev">ping@giuliopime.dev</a>.
      </p>

      <div class="flex items-center mt-10 justify-between gap-x-4 sm:gap-x-0">
        <p class="font-thin text-lg text-gray-500 text-start"><nuxt-link to="blog" class="no-underline">blog</nuxt-link> • <nuxt-link to="guides" class="no-underline">guides</nuxt-link> • <nuxt-link to="projects" class="no-underline">projects</nuxt-link></p>
        <div class="flex gap-2 items-center text-gray-400">
          <a href="https://github.com/Giuliopime" target="_blank">
            <Icon name="pixelarticons:github" />
          </a>
        </div>
      </div>

<!--      <p class="font-thin mt-8 text-center text-xl">-->
<!--        <nuxt-link to="email">email</nuxt-link> • <nuxt-link to="github" target="_blank">github</nuxt-link>-->
<!--      </p>-->
    </div>
  </div>
</template>

<style scoped>
.links-list li {
  @apply my-[15px] text-[16px];
}
</style>

<script setup lang="ts">
definePageMeta({
  layout: 'nonav'
})
</script>