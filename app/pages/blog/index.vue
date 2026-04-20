<script setup lang="ts">
const { data: docs } = await useAsyncData('documents-list', () => {
	return queryCollection('blog')
		.order('date', 'DESC')
		.select('title', 'path', 'description', 'date')
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
<!--	<div class="flex flex-col items-center justify-center h-full px-8 py-16 gap-6">-->
<!--		<ul class="list-disc">-->
<!--      <li v-for="doc in docs" :key="doc.path" >-->
<!--        <NuxtLink :to="doc.path" class="no-underline">{{ doc.title }}</NuxtLink>-->
<!--      </li>-->
<!--		</ul>-->
<!--	</div>-->
  <div class="w-full font-thin">
    <div v-for="doc in docs" :key="doc.path" class="px-4 py-2 border-b-[1px] border-gray-400 w-full flex justify-between">
      <input placeholder="Search for anything" class="grow">
    </div>
    <div v-for="doc in docs" :key="doc.path" class="px-4 py-2 border-b-[1px] border-gray-400 w-full flex justify-between">
      <span>{{doc.title}}</span><span>{{formatDate(doc.date)}}</span>
    </div>
  </div>
</template>
