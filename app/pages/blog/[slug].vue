<script setup>
definePageMeta({
	layout: 'content',
})

const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
	return queryCollection('blog').path(`/blog/${slug}`).first()
})

useSeoMeta({
	title: post.value?.title,
	description: post.value?.description,

	ogTitle: post.value?.title,
	ogDescription: post.value?.description,
	ogType: 'article',
	ogLocale: 'en_US',

	'article:published_time': post.value?.date,
	'article:author': 'giuliopimenoff',
});
</script>

<template>
	<div class="flex flex-col items-center w-full pt-8 pb-96 px-4">
		<div class="flex gap-4 mb-8 text-lg border border-black px-4 py-2">
			<b>{{ post.title }}</b>
			· {{ new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(post.date)) }}
			<h2></h2>
		</div>

		<ContentRenderer tag="article" :value="post" class="prose md:prose-xl dark:prose-invert" />
	</div>
</template>

<style scoped>
article {
	line-height: 1.6em;
}
</style>
