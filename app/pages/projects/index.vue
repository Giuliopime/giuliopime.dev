<script setup lang="ts">
useSeoMeta({
  title: "projects",
  ogTitle: "projects",
  description: "most of the interesting things I build end up listed here.",
  ogDescription: "most of the interesting things I build end up listed here."
})

const { data: docs } = await useAsyncData('projects-list', () => {
  return queryCollection('projects')
      .order('date', 'DESC')
      .select('title', 'path', 'description', 'date', 'tags', 'major')
      .all()
})

const majorDocs = computed(() => docs.value?.filter((d) => d.major) ?? [])
const minorDocs = computed(() => docs.value?.filter((d) => !d.major) ?? [])
</script>

<template>
  <div class="pt-20 flex flex-col items-center">
    <ProjectsTable v-if="majorDocs.length > 0" :feed="majorDocs" major />
    <ProjectsTable v-if="minorDocs.length > 0" class="mt-16" :feed="minorDocs" :major="false" />
  </div>
</template>