<script setup lang="ts">
import FeedTable from '~/components/FeedTable.vue';

const slug = useRoute().params.slug;
const { data: project } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('projects').path(`/projects/${slug}`).first();
});

useSeoMeta({
  title: () => project.value?.title,
  ogTitle: () => project.value?.title,
  description: () => project.value?.description,
  ogDescription: () => project.value?.description,
  twitterDescription: () => project.value?.description,
});

const { data: blogs } = await useAsyncData('blog-feed-list-project', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .select('title', 'date', 'path', 'project')
    .all();
});

const { data: guides } = await useAsyncData('guides-feed-list-project', () => {
  return queryCollection('guides')
    .order('date', 'DESC')
    .select('title', 'date', 'path', 'project')
    .all();
});

const relatedArticles = computed<FeedEntry[]>(() => {
  const blogEntries: FeedEntry[] =
    blogs.value
      ?.filter(
        (a) => a.project?.toLowerCase() == project.value?.title?.toLowerCase(),
      )
      .map((b: any) => ({
        date: new Date(b.date),
        name: b.title,
        type: 'blog',
        path: b.path,
      })) ?? [];

  const guideEntries: FeedEntry[] =
    guides.value
      ?.filter(
        (a) => a.project?.toLowerCase() == project.value?.title?.toLowerCase(),
      )
      .map((g: any) => ({
        date: new Date(g.date),
        name: g.title,
        type: 'guide',
        path: g.path,
      })) ?? [];

  return [...blogEntries, ...guideEntries].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
});
</script>
<template>
  <div class="flex w-full flex-col items-center bg-background/50 pt-32 text-sm">
    <div class="flex w-full flex-col items-center justify-center gap-x-8">
      <div class="flex flex-col px-2 lg:px-0">
        <div class="mb-10 flex w-full flex-col font-sohne">
          <span class="text-xs text-accent">/ METADATA</span>
          <hr class="my-2 border-border opacity-80" />
          <div
            class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 opacity-80"
          >
            <span>name:</span>
            <span class="text-right">{{ project.title }}</span>
            <hr class="col-span-2 border-border opacity-20" />
            <span>release date:</span>
            <span class="text-right">{{
              new Date(project.date).toLocaleDateString()
            }}</span>
            <!--          <hr class="opacity-20 col-span-2" />-->
            <!--          <span>tags:</span>-->
            <!--          <div v-if="project.tags?.length" class="flex flex-wrap gap-1">-->
            <!--            <span v-for="tag in project.tags" :key="tag" class="opacity-70 border border-current px-1 rounded-sm text-[0.65rem]">-->
            <!--              {{ tag }}-->
            <!--            </span>-->
            <!--          </div>-->
            <hr class="col-span-2 border-border opacity-20" />
            <span>links:</span>
            <div
              class="col-span- flex flex-wrap justify-end gap-x-2 gap-y-2 py-1"
            >
              <template v-for="link in project.links" :key="link.url">
                <a
                  :href="link.url"
                  target="_blank"
                  class="button-accent text-xs hover:text-white dark:bg-accent/10"
                >
                  {{ link.title.toUpperCase() }}
                </a>
              </template>
            </div>
            <hr class="col-span-2 border-border opacity-20" />
          </div>
        </div>

        <div
          class="mb-12 flex w-full flex-col justify-start"
          v-if="relatedArticles.length"
        >
          <FeedTable :feed="relatedArticles">
            <template #header>
              <span class="py-2 font-sohne text-xs text-accent"
                >/ RELATED-ARTICLES</span
              >
            </template>
          </FeedTable>
        </div>

        <span class="mb-2 font-sohne text-xs text-accent">/ DESCRIPTION</span>

        <ContentRenderer
          tag="article"
          :value="project"
          class="prose w-full min-w-0 max-w-none md:prose-xl dark:prose-invert md:max-w-prose dark:text-gray-100"
        />
      </div>
    </div>
  </div>
</template>
