<script setup lang="ts">
const { data: docs } = await useAsyncData('guides-list', () => {
  return queryCollection('guides')
      .order('date', 'DESC')
      .select('title', 'path', 'description', 'date')
      .all()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full px-8 py-16 gap-6">
    <ul class="list-disc">
      <li v-for="doc in docs" :key="doc.path" >
        <NuxtLink :to="doc.path" class="no-underline">{{ doc.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
