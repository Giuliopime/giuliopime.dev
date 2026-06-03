<template>
  <div class="min-h-full w-full pb-10">
    <div id="bg-image" />
    <Nav class="fixed left-0 right-0 px-4 z-50"/>
    <div class="fixed left-0 right-0 top-0 z-40 h-16 pointer-events-none gradient-blur-overlay"/>
    <slot />
  </div>
</template>

<style scoped>
.gradient-blur-overlay {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  mask-image: linear-gradient(to bottom, var(--c-background) 0%, var(--c-background) 40%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, var(--c-background) 0%, var(--c-background) 40%, transparent 100%);
  background: linear-gradient(to bottom, hsl(var(--c-background) / 0.7) 0%, hsl(var(--c-background) / 0.5) 35%, transparent 100%);
}
</style>