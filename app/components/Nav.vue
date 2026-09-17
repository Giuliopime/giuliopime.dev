<template>
  <div
    ref="navbarContainer"
    class="grid grid-cols-2 items-center justify-between py-3 font-sohne text-xs tracking-tight select-none"
  >
    <div class="vert-center gap-1">
      <nuxt-link to="/" tabindex="0">
        <img
          src="/favicon.ico"
          alt="home"
          class="h-auto w-[1.4rem] min-w-[1.4rem] hover:opacity-75"
        >
      </nuxt-link>
      <nuxt-link
        to="/projects"
        :class="
          route.path.startsWith('/projects')
            ? 'button-clickable-active'
            : 'button-clickable'
        "
        ><span class="mr-1 hidden sm:inline">[P]</span>PROJECTS</nuxt-link
      >
      <nuxt-link
        to="/blog"
        :class="
          route.path.startsWith('/blog')
            ? 'button-clickable-active'
            : 'button-clickable'
        "
        ><span class="mr-1 hidden sm:inline">[B]</span>BLOG</nuxt-link
      >
      <nuxt-link
        to="/guides"
        :class="
          route.path.startsWith('/guides')
            ? 'button-clickable-active'
            : 'button-clickable'
        "
        ><span class="mr-1 hidden sm:inline">[G]</span>GUIDES</nuxt-link
      >
    </div>

    <div class="vert-center gap-1 justify-self-end">
      <a
        href="mailto:ping@giuliopime.dev"
        class="button-clickable hidden sm:inline"
        ><span class="mr-1 hidden sm:inline">[C]</span>CONTACT</a
      >
      <a
        href="mailto:ping@giuliopime.dev"
        class="icon-button-clickable sm:hidden"
      >
        <Icon name="pixelarticons:mail" class="text-base" />
      </a>
      <nuxt-link
        to="/github"
        target="_blank"
        class="icon-button-clickable"
        tabindex="1"
      >
        <Icon name="pixelarticons:github" class="text-base" />
      </nuxt-link>
      <button
        class="icon-button-clickable cursor-pointer"
        tabindex="2"
        @click="
          $colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'
        "
      >
        <Icon
          :name="
            $colorMode.value == 'dark'
              ? 'pixelarticons:sun'
              : 'pixelarticons:moon'
          "
          class="text-base"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const navbarContainer = ref<HTMLElement | null>(null);
const { y } = useWindowScroll();
const scrolledClasses = ['bg-transparent'];

watch(y, () => {
  if (y.value > 0) navbarContainer.value?.classList.add(...scrolledClasses);
  else navbarContainer.value?.classList.remove(...scrolledClasses);
});
</script>

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
