<script setup>
import TableOfContents from '~/components/TableOfContents.vue';

const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`guide-${slug}`, () => {
  return queryCollection('guides').path(`/guides/${slug}`).first();
});

useSeoMeta({
  title: post.value?.title,
  ogTitle: post.value?.title,
  description: post.value?.description,
  ogDescription: post.value?.description,
  twitterDescription: post.value?.description,
  ogType: 'article',
  articlePublishedTime: post.value?.date,
  articleAuthor: ['https://giuliopime.dev'],
});

const { data: projects } = await useAsyncData('projects-list', () => {
  return queryCollection('projects')
    .order('date', 'DESC')
    .select('title', 'path', 'description', 'date', 'tags', 'major')
    .all();
});

const relatedProject = computed(() => {
  return projects.value?.find(
    (a) => a.title?.toLowerCase() === post.value?.project?.toLowerCase(),
  );
});
</script>

<template>
  <div class="flex w-full flex-col items-center pb-96 pt-20">
    <div class="flex max-w-[950px] flex-col gap-8 py-20 text-center">
      <b class="text-4xl md:text-6xl">{{ post.title }}</b>
      <span>{{
        new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(new Date(post.date))
      }}</span>
    </div>

    <div
      class="flex w-full justify-center gap-x-10 bg-background px-4 pb-8 pt-16 dark:bg-zinc-950"
    >
      <div class="hidden flex-1 lg:block" />
      <ContentRenderer
        tag="article"
        :value="post"
        class="prose w-full min-w-0 max-w-none md:prose-xl dark:prose-invert md:max-w-prose dark:text-gray-100"
      />
      <div class="hidden flex-1 lg:block">
        <div class="sticky top-16 self-start text-sm leading-4 opacity-80">
          <TableOfContents :links="post.body?.toc?.links ?? []" />
        </div>
      </div>
    </div>

    <div
      class="mt-20 flex flex-col justify-start px-4 sm:min-w-[32rem] md:min-w-[42rem]"
      v-if="relatedProject"
    >
      <span class="py-2 font-sohne text-xs text-accent">/ RELATED-PROJECT</span>

      <div class="grid grid-cols-[1fr_auto] gap-x-8">
        <div class="col-span-2 border-b border-border/50"></div>
        <nuxt-link
          :to="relatedProject.path"
          class="group col-span-2 grid cursor-pointer grid-cols-subgrid items-start gap-x-4 py-3 hover:bg-clickable hover:text-black sm:gap-x-8"
        >
          <span class="hidden whitespace-nowrap opacity-80 sm:block">
            {{ new Date(relatedProject.date).toLocaleDateString() }}
          </span>
          <div class="flex flex-col gap-1.5 pr-4 sm:pr-8">
            <span class="line-clamp-2 leading-snug">{{
              relatedProject.title
            }}</span>
            <span
              class="line-clamp-3 leading-snug opacity-75 sm:line-clamp-2"
              >{{ relatedProject.description }}</span
            >
          </div>
        </nuxt-link>
        <div class="col-span-2 border-b border-border/50"></div>
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
