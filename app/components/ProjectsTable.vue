<template>
  <div
    class="mt-20 w-full px-2 font-sohne text-xs tracking-tight sm:max-w-150"
    :tabindex="tabindex"
  >
    <div class="grid grid-cols-[auto_1fr] gap-x-8">
      <!-- Header -->
      <span class="py-2 font-thin text-accent"
        >/&thinsp;&thinsp;{{ major ? 'MAJOR' : 'MINOR' }}</span
      >
      <div class="col-span-2 border-b border-border/50"/>

      <!-- Rows -->
      <template v-for="(entry, index) in feed" :key="index">
        <nuxt-link
          :to="entry.path"
          class="group col-span-2 grid cursor-pointer grid-cols-subgrid items-start gap-x-4 py-3 hover:bg-clickable hover:text-black sm:gap-x-8"
        >
          <span class="pt-0.5 whitespace-nowrap opacity-80">
            {{ new Date(entry.date).toLocaleDateString() }}
          </span>
          <div class="flex flex-col gap-1.5 pr-4 sm:pr-8">
            <span class="line-clamp-2 leading-snug">{{ entry.title }}</span>
            <span
              class="line-clamp-3 leading-snug opacity-75 sm:line-clamp-2"
              >{{ entry.description }}</span
            >
            <!--            <div v-if="entry.tags?.length" class="flex flex-wrap gap-1">-->
            <!--              <span-->
            <!--                  v-for="tag in entry.tags"-->
            <!--                  :key="tag"-->
            <!--                  class="opacity-50 group-hover:opacity-70 border border-current px-1 rounded-sm text-[0.65rem]"-->
            <!--              >-->
            <!--                {{ tag }}-->
            <!--              </span>-->
            <!--            </div>-->
          </div>
        </nuxt-link>
        <div class="col-span-2 border-b border-border/50"/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content';

defineProps({
  /** Array of feed entries to display. Each entry should have: { date, name, path } */
  feed: {
    type: Array<ProjectsCollectionItem>,
    required: true
  },

  /** Whether showcasing major projects */
  major: {
    type: Boolean,
    required: true
  },

  /** Tab index for the wrapper element */
  tabindex: {
    type: Number,
    default: 2,
  },
});
</script>
