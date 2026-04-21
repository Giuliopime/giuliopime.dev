<template>
  <div class="p-20 flex flex-col items-center">
    <img src="~/assets/images/uc_1.GIF" alt="Under Construction" draggable="false" class="select-none">

    <div class="mt-[60px] max-w-[400px] text-center">
      <p class="font-bold">Hey, Giulio here :)</p>
      <p class="mt-10">
        I architect and craft backends, ideally in Kotlin. Sometimes I touch swift code too.
      </p>
      <p>
        I touch css only with a gun to my head.
      </p>
    </div>

    <table class="mt-20 text-xs font-sohne tracking-tight w-[400px]" tabindex="2">
      <thead>
      <tr class="font-thin border-b border-white border-opacity-50 text-coral">
        <th class="text-start font-thin py-2">/&thinsp;&thinsp;DATE</th>
        <th class="text-start font-thin">/&thinsp;&thinsp;NAME</th>
        <th class="text-start font-thin">/&thinsp;&thinsp;TYPE</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(entry, index) in feed" :key="index" class="group border-b border-white border-opacity-50 hover:bg-sky hover:text-black cursor-pointer">
        <td class="py-3 pr-8 opacity-80">{{ new Date(entry.date).toLocaleDateString() }}</td>
        <td class="max-w-[400px] overflow-hidden overflow-ellipsis whitespace-nowrap pr-8">{{ entry.name }}</td>
        <td class="pr-8"><span class="border border-white border-opacity-50 py-0.5 px-1 uppercase text-white text-opacity-80 group-hover:border-black group-hover:border-opacity-50 group-hover:text-black">{{ entry.type }}</span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface FeedEntry {
  date: Date
  name: string
  type: string
}

const { data: projects } = await useAsyncData('projects-list', () => {
  return queryCollection('projects')
      .order('date', 'DESC')
      .select('title', 'date')
      .all()
})

const { data: blogs } = await useAsyncData('blog-list', () => {
  return queryCollection('blog')
      .order('date', 'DESC')
      .select('title', 'date')
      .all()
})

const { data: guides } = await useAsyncData('guides-list', () => {
  return queryCollection('guides')
      .order('date', 'DESC')
      .select('title', 'date')
      .all()
})

const feed = computed<FeedEntry[]>(() => {
  const projectEntries: FeedEntry[] =
      projects.value?.map((p: any) => ({
        date: new Date(p.date),
        name: p.title,
        type: 'project'
      })) ?? []

  const blogEntries: FeedEntry[] =
      blogs.value?.map((b: any) => ({
        date: new Date(b.date),
        name: b.title,
        type: 'blog'
      })) ?? []

  const guideEntries: FeedEntry[] =
      guides.value?.map((g: any) => ({
        date: new Date(g.date),
        name: g.title,
        type: 'guide'
      })) ?? []

  return [...projectEntries, ...blogEntries, ...guideEntries].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
  )
})
</script>