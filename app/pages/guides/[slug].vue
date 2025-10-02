<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`guide-${slug}`, () => {
	return queryCollection('guides').path(`/guides/${slug}`).first()
})
</script>

<template>
	<ContentRenderer :value="post" />
</template>
