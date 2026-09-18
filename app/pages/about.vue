<script setup lang="ts">
const { data: about } = await useAsyncData('about', () => {
  return queryCollection('about').path('/about').first();
});

useSeoMeta({
  title: 'Giulio Pimenoff',
  ogTitle: 'Giulio Pimenoff',
  description: 'profiling GiulioPimenoff...',
  ogDescription: 'profiling GiulioPimenoff...',
  twitterDescription: 'profiling GiulioPimenoff...',
});
</script>
<template>
  <div
      class="flex w-full flex-col items-center bg-background/50 pt-32 pb-20 text-sm"
  >
    <div class="flex w-full flex-col items-center justify-center gap-x-8">
      <div class="flex flex-col px-2 lg:px-0">
        <div class="mb-10 flex w-full flex-col font-sohne">
          <span class="text-xs text-accent">/ METADATA</span>
          <hr class="my-2 border-border opacity-80" >
          <div
              class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 opacity-80"
          >
            <span>name:</span>
            <span class="text-right">{{ about.title }}</span>
            <hr class="col-span-2 border-border opacity-20" >
            <span>release date:</span>
            <span class="text-right">{{
                new Date(about.date).toLocaleDateString()
              }}</span>
            <hr class="col-span-2 border-border opacity-20" >
            <span>links:</span>
            <div class="col-span- flex flex-wrap justify-end gap-2 py-1">
              <template v-for="link in about.links" :key="link.url">
                <a
                    :href="link.url"
                    target="_blank"
                    class="button-accent text-xs"
                >
                  {{ link.title.toUpperCase() }}
                </a>
              </template>
            </div>
            <hr class="col-span-2 border-border opacity-20" >
          </div>
        </div>

        <span class="mb-2 font-sohne text-xs text-accent">/ DESCRIPTION</span>

        <ContentRenderer
            tag="article"
            :value="about"
            class="prose w-full max-w-none min-w-0 md:prose-xl md:max-w-prose dark:text-[#d1d5db] dark:prose-invert"
        />
      </div>
    </div>
  </div>
</template>
