<template>
  <div class="w-full font-sohne text-xs tracking-tight" :tabindex="tabindex">
    <div class="grid grid-cols-[1fr_auto] gap-x-8 sm:grid-cols-[auto_1fr_auto]">
      <!-- Header -->
      <slot name="header">
        <span class="hidden py-2 font-thin text-accent sm:block"
          >/&thinsp;&thinsp;DATE</span
        >
        <span class="py-2 font-thin text-accent">/&thinsp;&thinsp;NAME</span>
        <span
          class="justify-self-end py-2 font-thin text-accent sm:justify-self-auto"
          >/&thinsp;&thinsp;TYPE</span
        >
      </slot>
      <div class="col-span-2 border-b border-border/50 sm:col-span-3" />

      <!-- Rows -->
      <template v-for="(entry, index) in feed" :key="index">
        <nuxt-link
          :to="entry.path"
          class="group col-span-2 grid h-17 cursor-pointer grid-cols-subgrid items-center gap-x-8 hover:bg-clickable hover:text-black sm:col-span-3 sm:h-12"
        >
          <span class="hidden whitespace-nowrap opacity-80 sm:block">
            {{ new Date(entry.date).toLocaleDateString() }}
          </span>
          <div class="flex flex-col">
            <span class="mb-0.5 whitespace-nowrap opacity-80 sm:hidden">
              {{ new Date(entry.date).toLocaleDateString() }}
            </span>
            <span class="line-clamp-2">{{ entry.name }}</span>
          </div>
          <span
            class="self-center justify-self-end sm:justify-self-auto sm:pr-8"
          >
            <span
              class="type-badge group-hover:border-black/50 group-hover:text-black"
            >
              {{ entry.type }}
            </span>
          </span>
        </nuxt-link>
        <div class="col-span-2 border-b border-border/50 sm:col-span-3" />
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  /** Array of feed entries to display. Each entry should have: { date, name, type, path } */
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
