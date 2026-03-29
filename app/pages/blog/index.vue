<script setup lang="ts">
const { data: docs } = await useAsyncData('documents-list', () => {
	return queryCollection('blog')
		.order('date', 'DESC')
		.select('title', 'path', 'description')
		.all()
})

useHead({
	title: "i write stuff here",
	meta: [
		// Basic description
		{ name: 'description', content: "with an irregular schedule" },

		// Open Graph
		{ property: 'og:title', content: "i write stuff here" },
		{ property: 'og:description', content: "with an irregular schedule" },
		{ property: 'og:type', content: 'article' },
		{ property: 'og:locale', content: 'en_US' },
	],
});
</script>

<template>
	<div class="flex flex-col items-center justify-center h-full px-8 py-16 gap-6">
		<span class="font-bold text-xl">stuff i wrote</span>

		<ul class="list-disc">
      <li>
        <NuxtLink v-for="doc in docs" :key="doc.path" :to="doc.path">
           {{ doc.title }}
        </NuxtLink>
      </li>
		</ul>
	</div>
</template>
