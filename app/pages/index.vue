<template>
  <div class="flex flex-col items-center pt-26">
    <img
      src="~/assets/images/uc_1.GIF"
      alt="Under Construction"
      draggable="false"
      class="px-8 select-none sm:px-20"
    >

    <div class="mt-15 max-w-125 px-8 text-center sm:px-20">
      <p class="font-bold">Hey, Giulio here :)</p>
      <p class="mt-10">
        I architect and craft backend systems, ideally in
        <span class="selection:bg-">Kotlin</span>. Sometimes I do Swift
        development too.
      </p>
      <p>I touch css only with a gun to my head.</p>

      <p class="mt-8 mb-0.5">If you are tight on time</p>
      <nuxt-link
        to="/cv_pimenoff_verdolin_giulio.pdf"
        target="_blank"
        class="button-clickable text-xs"
      >
        DOWNLOAD MY CV
      </nuxt-link>
    </div>

    <FeedTable :feed="feed" class="mt-20 px-2 sm:max-w-150" />
  </div>
</template>

<script setup lang="ts">
import FeedTable from '~/components/FeedTable.vue';

useSeoMeta({
  title: 'giuliopime.dev',
  description: 'the place where I write about things I do or think.',
  ogDescription: 'the place where I write about things I do or think.',
  twitterDescription: 'the place where I write about things I do or think.',
});

const { data: projects } = await useAsyncData('projects-feed-list', () => {
  return queryCollection('projects')
    .order('date', 'DESC')
    .select('title', 'date', 'path')
    .limit(3)
    .all();
});

const { data: blogs } = await useAsyncData('blog-feed-list', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .select('title', 'date', 'path')
    .all();
});

const { data: guides } = await useAsyncData('guides-feed-list', () => {
  return queryCollection('guides')
    .order('date', 'DESC')
    .select('title', 'date', 'path')
    .all();
});

const feed = computed<FeedEntry[]>(() => {
  const projectEntries: FeedEntry[] =
    projects.value?.map((p) => ({
      date: new Date(p.date),
      name: p.title,
      type: 'project',
      path: p.path,
    })) ?? [];

  const blogEntries: FeedEntry[] =
    blogs.value?.map((b) => ({
      date: new Date(b.date),
      name: b.title,
      type: 'blog',
      path: b.path,
    })) ?? [];

  const guideEntries: FeedEntry[] =
    guides.value?.map((g) => ({
      date: new Date(g.date),
      name: g.title,
      type: 'guide',
      path: g.path,
    })) ?? [];

  return [...projectEntries, ...blogEntries, ...guideEntries]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);
});
</script>
