<script setup lang="ts">
useSeoMeta({
  title: "blog",
  ogTitle: "blog",
  description: "longer articles about things I'm interested in or experienced",
  ogDescription: "longer articles about things I'm interested in or experienced"
})

import DocumentsTable from "~/components/DocumentsTable.vue";

const { data: docs } = await useAsyncData('blog-list', () => {
	return queryCollection('blog')
		.order('date', 'DESC')
		.select('title', 'path', 'description', 'date')
		.all()
})
</script>

<template>
<!--	<div class="flex flex-col items-center justify-center h-full px-8 py-16 gap-6">-->
<!--		<ul class="list-disc">-->
<!--      <li v-for="doc in docs" :key="doc.path" >-->
<!--        <NuxtLink :to="doc.path" class="no-underline">{{ doc.title }}</NuxtLink>-->
<!--      </li>-->
<!--		</ul>-->
<!--	</div>-->
  <div class="pt-20 flex flex-col items-center">
    <DocumentsTable :feed="docs" />
  </div>
</template>
