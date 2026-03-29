<template>
	<div class="p-20 flex flex-col items-center">
		<img src="~/assets/images/uc_1.GIF" alt="Under Construction">

		<div class="flex items-center gap-4 mt-[60px]">
			<threerrows />
			<NuxtLink to="/blog" class="font-bold text-xl text-center">i wrote smth</NuxtLink>
			<threerrows class="rotate-180" />
		</div>

		<div class="mt-[60px] max-w-[400px]">
			<h2 class="text-center text-[18px] font-bold mb-[30px]">meanwhile here are some ways to find me</h2>
			<ul class="links-list text-left">
				<li>Email: <a href="mailto:ping@giuliopime.dev">ping@giuliopime.dev</a></li>
				<li>Github: <a href="/github" target="_blank">Giuliopime</a></li>
				<li>Medium: <a href="/medium" target="_blank">@giuliopime</a></li>
				<li>Instagram: <a href="/instagram" target="_blank">@giuliopimenoff</a></li>
				<li>Threads: <a href="/threads" target="_blank">@giuliopimenoff</a></li>
				<li>Twitter: <a href="/twitter" target="_blank">@giuliopime</a></li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.links-list li {
	@apply my-[15px] text-[16px];
}
</style>

<script setup lang="ts">
</script>