<template>
  <div
      class="mt-20 w-full sm:max-w-[600px] px-2 text-xs font-sohne tracking-tight"
      :tabindex="tabindex"
  >
    <div class="grid grid-cols-[auto_1fr] gap-x-8">

      <!-- Header -->
      <span class="font-thin text-coral py-2">/&thinsp;&thinsp;DATE</span>
      <span class="font-thin text-coral py-2">/&thinsp;&thinsp;NAME</span>
      <div class="col-span-2 border-b border-white/50"></div>

      <!-- Rows -->
      <template v-for="(entry, index) in feed" :key="index">
        <nuxt-link
            :to="entry.path"
            class="group col-span-2 grid grid-cols-subgrid gap-x-4 sm:gap-x-8 hover:bg-sky hover:text-black cursor-pointer items-center h-12"
        >
          <span class="opacity-80 whitespace-nowrap">
            {{ new Date(entry.date).toLocaleDateString() }}
          </span>
          <span class="line-clamp-2 pr-4 sm:pr-8">{{ entry.title }}</span>
        </nuxt-link>
        <div class="col-span-2 border-b border-white/50"></div>
      </template>

    </div>
  </div>
</template>

<script setup>
defineProps({
  /** Array of feed entries to display. Each entry should have: { date, name, path } */
  feed: {
    type: Array,
    required: true,
    default: () => [],
  },

  /** Tab index for the wrapper element */
  tabindex: {
    type: Number,
    default: 2,
  },
})
</script>