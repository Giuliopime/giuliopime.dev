<template>
	<div class="h-full w-full flex flex-col px-5">
    <div class="theme-bg" />
    <Nav class="fixed left-0 right-0 px-5 z-50" />
		<slot />
	</div>
</template>

<style>
.theme-bg {
  z-index: -1;
  background-image: url(~/assets/images/star-bg.gif);
  background-repeat: repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
}
</style>