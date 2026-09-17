<script setup lang="ts">
import DocumentsTable from '~/components/DocumentsTable.vue';

useSeoMeta({
  title: 'blog',
  ogTitle: 'blog',
  description: "longer articles about things I'm interested in or experienced",
  ogDescription:
    "longer articles about things I'm interested in or experienced",
  twitterDescription:
    "longer articles about things I'm interested in or experienced",
});

const { data: docs } = await useAsyncData('blog-list', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .select('title', 'path', 'description', 'date')
    .all();
});
</script>

<template>
  <div class="flex flex-col items-center pt-20 pb-10">
    <DocumentsTable :feed="docs" />
  </div>
</template>
