<template>
  <div ref="navbarContainer" class="grid grid-cols-2 items-center justify-between font-sohne text-xs py-3 tracking-tight select-none">
    <div class="vert-center gap-1">
      <nuxt-link to="/" tabindex="0">
        <img src="/favicon.ico" alt="home" class="min-w-[1.4rem] w-[1.4rem] h-auto hover:opacity-75" />
      </nuxt-link>
      <nuxt-link to="/projects" :class="route.path.startsWith('/projects') ? 'button-sky-active' : 'button-sky'"><span class="hidden sm:inline mr-1">[P]</span>PROJECTS</nuxt-link>
      <nuxt-link to="/blog" :class="route.path.startsWith('/blog') ? 'button-sky-active' : 'button-sky'"><span class="hidden sm:inline mr-1">[B]</span>BLOG</nuxt-link>
      <nuxt-link to="/guides" :class="route.path.startsWith('/guides') ? 'button-sky-active' : 'button-sky'"><span class="hidden sm:inline mr-1">[G]</span>GUIDES</nuxt-link>
    </div>

    <div class="vert-center gap-1 justify-self-end">
      <a href="mailto:ping@giuliopime.dev" class="button-sky"><span class="hidden sm:inline mr-1">[C]</span>CONTACT</a>
      <nuxt-link to="/github" class="icon-button-sky" tabindex="1">
        <Icon name="pixelarticons:github" class="text-base" />
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.gradient-blur {
  position: relative;
}

.gradient-blur::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(4px); /* equivalent to backdrop-blur-sm */
  -webkit-backdrop-filter: blur(4px);
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}
</style>

<script setup lang="ts">
const route = useRoute()

const navbarContainer = ref<HTMLElement | null>(null)
const { y } = useWindowScroll()
const scrolledClasses = [
  'bg-transparent'
]

watch(y, () => {
  if (y.value > 0)
    navbarContainer.value?.classList.add(...scrolledClasses)
  else
    navbarContainer.value?.classList.remove(...scrolledClasses)
})
</script>