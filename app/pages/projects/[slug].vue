<script setup lang="ts">
import FeedTable from "~/components/FeedTable.vue";

const slug = useRoute().params.slug
const { data: project } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('projects').path(`/projects/${slug}`).first()
})

useSeoMeta({
  title: () => project.value?.title,
  ogTitle: () => project.value?.title,
  description: () => project.value?.description,
  ogDescription: () => project.value?.description,
  twitterDescription: () => project.value?.description,
})

const { data: blogs } = await useAsyncData('blog-feed-list-project', () => {
  return queryCollection('blog')
      .order('date', 'DESC')
      .select('title', 'date', 'path', 'project')
      .all()
})

const { data: guides } = await useAsyncData('guides-feed-list-project', () => {
  return queryCollection('guides')
      .order('date', 'DESC')
      .select('title', 'date', 'path', 'project')
      .all()
})

const relatedArticles = computed<FeedEntry[]>(() => {
  const blogEntries: FeedEntry[] =
      blogs.value?.filter((a) => a.project?.toLowerCase() == project.value?.title?.toLowerCase())
          .map((b: any) => ({
            date: new Date(b.date),
            name: b.title,
            type: 'blog',
            path: b.path
          })) ?? []

  const guideEntries: FeedEntry[] =
      guides.value?.filter((a) => a.project?.toLowerCase() == project.value?.title?.toLowerCase())
          .map((g: any) => ({
            date: new Date(g.date),
            name: g.title,
            type: 'guide',
            path: g.path
          })) ?? []

  return [...blogEntries, ...guideEntries].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
  )
})

</script>
<template>
  <div class="flex flex-col pt-32 w-full items-center text-sm bg-background/50">
    <div class="flex flex-col gap-x-8 w-full justify-center items-center">

      <div class="flex flex-col px-2 lg:px-0">
        <div class="flex flex-col w-full font-sohne mb-10">
          <span class="text-accent text-xs">/ METADATA</span>
          <hr class="my-2 opacity-80 border-border">
          <div class="grid grid-cols-[auto_1fr] items-center gap-y-2 gap-x-4 opacity-80">
            <span>name:</span>
            <span class="text-right">{{ project.title }}</span>
            <hr class="opacity-20 col-span-2 border-border" />
            <span>release date:</span>
            <span class="text-right">{{ new Date(project.date).toLocaleDateString() }}</span>
            <!--          <hr class="opacity-20 col-span-2" />-->
            <!--          <span>tags:</span>-->
            <!--          <div v-if="project.tags?.length" class="flex flex-wrap gap-1">-->
            <!--            <span v-for="tag in project.tags" :key="tag" class="opacity-70 border border-current px-1 rounded-sm text-[0.65rem]">-->
            <!--              {{ tag }}-->
            <!--            </span>-->
            <!--          </div>-->
            <hr class="opacity-20 col-span-2 border-border" />
            <span>links:</span>
            <div class="flex flex-wrap gap-x-2 gap-y-2 col-span- py-1 justify-end">
              <template v-for="link in project.links" :key="link.url">
                <a :href="link.url" target="_blank" class="button-accent dark:bg-accent/10 hover:text-white text-xs">
                  {{ link.title.toUpperCase() }}
                </a>
              </template>
            </div>
            <hr class="opacity-20 col-span-2 border-border" />
          </div>
        </div>

        <div class="flex flex-col justify-start mb-12 w-full" v-if="relatedArticles.length">
          <FeedTable :feed="relatedArticles">
            <template #header>
              <span class="text-accent font-sohne text-xs py-2">/ RELATED-ARTICLES</span>
            </template>
          </FeedTable>
        </div>

        <span class="text-accent font-sohne text-xs mb-2">/ DESCRIPTION</span>

        <ContentRenderer tag="article" :value="project" class="prose dark:text-gray-100 md:prose-xl dark:prose-invert max-w-none md:max-w-prose w-full min-w-0" />
      </div>
    </div>
  </div>
</template>