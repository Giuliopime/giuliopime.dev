<template>
	<div id="default-layout" class="dark h-full w-full">
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
<script setup lang="ts">
</script>