<script setup>
definePageMeta({
	layout: 'content',
})

const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
	return queryCollection('blog').path(`/blog/${slug}`).first()
})
</script>

<template>
	<div class="flex justify-center w-full">
		<ContentRenderer tag="article" :value="post" class="prose dark:prose-invert" />
	</div>
</template>
