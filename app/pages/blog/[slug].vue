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

useHead({
	title: post.value?.title,
	meta: [
		// Basic description
		{ name: 'description', content: post.value?.description },

		// Open Graph
		{ property: 'og:title', content: post.value?.title },
		{ property: 'og:description', content: post.value?.description },
		{ property: 'og:type', content: 'article' },
		{ property: 'og:locale', content: 'en_US' },

		// Article metadata
		{ property: 'article:published_time', content: post.value?.date },
		{ property: 'article:author', content: 'giuliopimenoff' },
	],
});
</script>

<template>
	<div class="flex flex-col items-center w-full pt-8 pb-96 px-4">
		<div class="flex flex-col md:flex-row gap-4 mb-8 text-lg border border-black px-4 py-2">
			<b>{{ post.title }}</b>
			<span class="self-end md:self-start">· {{ new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(post.date)) }}</span>
		</div>

		<ContentRenderer tag="article" :value="post" class="prose md:prose-xl dark:prose-invert max-w-none md:max-w-prose" />
	</div>
</template>

<style scoped>
article {
	line-height: 1.6em;
}

article :where(iframe) {
	width: 100%;
	height: 56.25vw; /* 16:9 aspect ratio (9/16 * 100) based on viewport width */
	max-width: 560px;
}

@media (min-width: 768px) {
	article :where(iframe) {
		width: 560px;
		height: 315px;
		max-width: none;
	}
}
</style>
