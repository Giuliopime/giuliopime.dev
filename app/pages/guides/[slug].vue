<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`guide-${slug}`, () => {
	return queryCollection('guides').path(`/guides/${slug}`).first()
})
</script>

<template>
  <div class="pt-20 flex flex-col items-center w-full pb-96 px-4">
    <div class="flex flex-col md:flex-row gap-4 mb-8 text-lg border border-white px-4 py-2">
      <b>{{ post.title }}</b>
      <span class="self-end md:self-start">· {{ new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(post.date)) }}</span>
    </div>

    <ContentRenderer tag="article" :value="post" class="prose md:prose-xl dark:prose-invert max-w-none md:max-w-prose w-full min-w-0" />
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
