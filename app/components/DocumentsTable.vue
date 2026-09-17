<template>
  <div
    class="mt-20 w-full px-2 font-sohne text-xs tracking-tight sm:max-w-150"
    :tabindex="tabindex"
  >
    <div class="grid grid-cols-[auto_1fr] gap-x-8">
      <!-- Header -->
      <span class="py-2 font-thin text-accent">/&thinsp;&thinsp;DATE</span>
      <span class="py-2 font-thin text-accent">/&thinsp;&thinsp;NAME</span>
      <div class="col-span-2 border-b border-border/50" />

      <!-- Rows -->
      <template v-for="(entry, index) in feed" :key="index">
        <nuxt-link
          :to="entry.path"
          class="group col-span-2 grid h-12 cursor-pointer grid-cols-subgrid items-center gap-x-4 hover:bg-clickable hover:text-black sm:gap-x-8"
        >
          <span class="whitespace-nowrap opacity-80">
            {{ new Date(entry.date).toLocaleDateString() }}
          </span>
          <span class="line-clamp-2 pr-4 sm:pr-8">{{ entry.title }}</span>
        </nuxt-link>
        <div class="col-span-2 border-b border-border/50" />
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  /** Array of feed entries to display. Each entry should have: { date, name, path } */
  feed: {
    type: Array,
    required: true
  },

  /** Tab index for the wrapper element */
  tabindex: {
    type: Number,
    default: 2,
  },
});
</script>
