<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`guide-${slug}`, () => {
	return queryCollection('guides').path(`/guides/${slug}`).first()
})

const { data: projects } = await useAsyncData('projects-list', () => {
  return queryCollection('projects')
      .order('date', 'DESC')
      .select('title', 'path', 'description', 'date', 'tags', 'major')
      .all()
})

const relatedProject = computed(() => {
  return projects.value?.find((a) => a.title?.toLowerCase() === post.value?.project?.toLowerCase())
})
</script>

<template>
  <div class="pt-20 flex flex-col items-center w-full pb-96 px-4">
    <div class="flex flex-col md:flex-row gap-4 mb-8 text-lg border border-white px-4 py-2">
      <b>{{ post.title }}</b>
      <span class="self-end md:self-start">· {{ new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(post.date)) }}</span>
    </div>

    <ContentRenderer tag="article" :value="post" class="prose md:prose-xl dark:prose-invert max-w-none md:max-w-prose w-full min-w-0" />

    <div class="flex flex-col justify-start mt-20" v-if="relatedProject">
      <span class="text-coral font-sohne text-xs py-2">/ RELATED-PROJECT</span>

      <div class="grid grid-cols-[1fr_auto] gap-x-8">
        <div class="col-span-2 border-b border-white/50"></div>
        <nuxt-link
            :to="relatedProject.path"
            class="group col-span-2 grid grid-cols-subgrid gap-x-4 sm:gap-x-8 hover:bg-sky hover:text-black cursor-pointer py-3 items-start"
        >
            <span class="hidden sm:block opacity-80 whitespace-nowrap">
              {{ new Date(relatedProject.date).toLocaleDateString() }}
            </span>
          <div class="flex flex-col gap-1.5 pr-4 sm:pr-8">
            <span class="line-clamp-2 leading-snug">{{ relatedProject.title }}</span>
            <span class="line-clamp-3 sm:line-clamp-2 leading-snug opacity-75">{{ relatedProject.description }}</span>
          </div>
        </nuxt-link>
        <div class="col-span-2 border-b border-white/50"></div>
      </div>
    </div>
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
