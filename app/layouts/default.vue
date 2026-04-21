<template>
  <div id="default-layout" class="dark h-full w-full">
    <Nav class="px-4 z-50"/>
    <slot />
  </div>
</template>

<style scoped>
#default-layout {
  background-image: url('https://www.transparenttextures.com/patterns/dark-mosaic.png');
  background-color: #000;
  color: #FBFBFB;
}
</style>