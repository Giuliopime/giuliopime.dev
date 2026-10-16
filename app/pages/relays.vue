<script setup lang="ts">
import importedRelays from "~/assets/relays.json"

useSeoMeta({
  title: 'relays',
  ogTitle: 'relays',
  description: 'artifacts I stumbled upon which impacted me',
  ogDescription: 'artifacts I stumbled upon which impacted me',
  twitterDescription:
    'artifacts I stumbled upon which impacted me',
});

const relays = (importedRelays as RelayEntry[]).toSorted((a, b) => b.date_added.localeCompare(a.date_added));

const relayTypeToIcon: Record<RelayEntryType, string> = {
  book: "pixelarticons:book",
  film: "pixelarticons:movie",
  serie: "pixelarticons:movie",
  video: "pixelarticons:video",
  blog: "pixelarticons:notebook",
  article: "pixelarticons:article",
  individual: "pixelarticons:user-sharp",
  website: "pixelarticons:globe"
}
</script>

<template>
  <div class="flex flex-col items-center pt-40 pb-10 mb-48">

    <div class="flex flex-col items-center gap-y-8">
      <p class="text-4xl font-bold md:text-6xl text-center">Relays</p>
      <p class="text-center italic">Artifacts I stumbled upon which impacted me</p>
    </div>
    <div
      class="mt-20 w-full px-2 font-sohne text-xs tracking-tight sm:max-w-150"
    >
      <div class="grid grid-cols-[auto_1fr] gap-x-6">
        <!-- Header -->
        <span class="py-2 font-thin text-accent"
          >/&thinsp;&thinsp;TYPE</span
        >
        <span class="py-2 font-thin text-accent">/&thinsp;&thinsp;DATA</span>
        <span
          class="hidden sm:block justify-self-end py-2 font-thin text-accent sm:justify-self-auto"
          >/&thinsp;&thinsp;ADDED</span
        >

        <div class="col-span-2 border-b border-border/50 sm:col-span-3" />

        <!-- Rows -->
        <template v-for="(entry, index) in relays" :key="index">
          <nuxt-link
            :to="entry.url"
            class="group col-span-2 grid cursor-pointer grid-cols-subgrid items-start py-3 hover:bg-clickable hover:text-black sm:col-span-3 sm:gap-x-6"
            external
            target="_blank"
          >
            <span class="flex justify-center pt-0.5 whitespace-nowrap opacity-80">
               <Icon :name="relayTypeToIcon[entry.type]" :title="entry.type" class="text-xl" />
            </span>
            <div class="flex flex-col gap-1.5">
              <span class="line-clamp-2 leading-snug">{{ entry.title }}</span>
              <span
                class="leading-snug opacity-75"
                >{{ entry.description }}</span
              >
            </div>
            <span class="hidden whitespace-nowrap opacity-80 sm:block">
              {{ new Date(entry.date_added).toLocaleDateString() }}
            </span>
          </nuxt-link>
          <div class="col-span-2 border-b border-border/50 sm:col-span-3" />
        </template>
      </div>
    </div>
  </div>
</template>
