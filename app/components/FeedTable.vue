<template>
  <div
      class="mt-20 w-full sm:max-w-[600px] px-2 text-xs font-sohne tracking-tight"
      :tabindex="tabindex"
  >
    <div class="grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr_auto] gap-x-8">

      <!-- Header -->
      <slot name="header">
        <span class="hidden sm:block font-thin text-coral py-2">/&thinsp;&thinsp;DATE</span>
        <span class="font-thin text-coral py-2">/&thinsp;&thinsp;NAME</span>
        <span class="font-thin text-coral py-2 justify-self-end sm:justify-self-auto">/&thinsp;&thinsp;TYPE</span>
      </slot>
      <div class="col-span-2 sm:col-span-3 border-b border-white/50"></div>

      <!-- Rows -->
      <template v-for="(entry, index) in feed" :key="index">
        <nuxt-link
            :to="entry.path"
            class="group col-span-2 sm:col-span-3 grid grid-cols-subgrid gap-x-8 hover:bg-sky hover:text-black cursor-pointer items-center h-[4.25rem] sm:h-12"
        >
          <span class="hidden sm:block opacity-80 whitespace-nowrap">
            {{ new Date(entry.date).toLocaleDateString() }}
          </span>
          <div class="flex flex-col">
            <span class="opacity-80 sm:hidden mb-0.5 whitespace-nowrap">
              {{ new Date(entry.date).toLocaleDateString() }}
            </span>
            <span class="line-clamp-2">{{ entry.name }}</span>
          </div>
          <span class="sm:pr-8 self-center justify-self-end sm:justify-self-auto">
            <span class="type-badge group-hover:border-black/50 group-hover:text-black">
              {{ entry.type }}
            </span>
          </span>
        </nuxt-link>
        <div class="col-span-2 sm:col-span-3 border-b border-white/50"></div>
      </template>

    </div>
  </div>
</template>

<script setup>
defineProps({
  /** Array of feed entries to display. Each entry should have: { date, name, type, path } */
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