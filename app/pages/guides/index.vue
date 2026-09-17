<script setup lang="ts">
import DocumentsTable from '~/components/DocumentsTable.vue';

useSeoMeta({
  title: 'guides',
  ogTitle: 'guides',
  description:
    'technical challenges I encountered and my process for solving them, documented',
  ogDescription:
    'technical challenges I encountered and my process for solving them, documented',
  twitterDescription:
    'technical challenges I encountered and my process for solving them, documented',
});

const { data: docs } = await useAsyncData('guides-list', () => {
  return queryCollection('guides')
    .order('date', 'DESC')
    .select('title', 'path', 'description', 'date')
    .all();
});
</script>

<template>
  <div class="flex flex-col items-center pt-20">
    <DocumentsTable :feed="docs" />
  </div>
</template>
