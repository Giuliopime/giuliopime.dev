<script setup lang="ts">
import DocumentsTable from "~/components/DocumentsTable.vue";

const { data: docs } = await useAsyncData('guides-list', () => {
  return queryCollection('guides')
      .order('date', 'DESC')
      .select('title', 'path', 'description', 'date')
      .all()
})
</script>

<template>
  <div class="pt-20 flex flex-col items-center">
    <DocumentsTable :feed="docs" />
  </div>
</template>
