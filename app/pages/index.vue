<template>
  <div class="pt-[6.5rem] flex flex-col items-center">
    <img src="~/assets/images/uc_1.GIF" alt="Under Construction" draggable="false" class="select-none px-8 sm:px-20">

    <div class="mt-[60px] max-w-[500px] text-center px-8 sm:px-20 ">
      <p class="font-bold">Hey, Giulio here :)</p>
      <p class="mt-10">
        I architect and craft backends, ideally in <span class="selection:bg-">Kotlin</span>. Sometimes I touch Swift code too.
      </p>
      <p>
        I touch css only with a gun to my head.
      </p>
    </div>

    <FeedTable
        :feed="feed"
    />

  </div>
</template>

<script setup lang="ts">
import FeedTable from "~/components/FeedTable.vue";

interface FeedEntry {
  date: Date
  name: string
  type: string
  path: string
}

const { data: projects } = await useAsyncData('projects-list', () => {
  return queryCollection('projects')
      .order('date', 'DESC')
      .select('title', 'date', 'path')
      .all()
})

const { data: blogs } = await useAsyncData('blog-list', () => {
  return queryCollection('blog')
      .order('date', 'DESC')
      .select('title', 'date', 'path')
      .all()
})

const { data: guides } = await useAsyncData('guides-list', () => {
  return queryCollection('guides')
      .order('date', 'DESC')
      .select('title', 'date', 'path')
      .all()
})

const feed = computed<FeedEntry[]>(() => {
  const projectEntries: FeedEntry[] =
      projects.value?.map((p: any) => ({
        date: new Date(p.date),
        name: p.title,
        type: 'project',
        path: p.path
      })) ?? []

  const blogEntries: FeedEntry[] =
      blogs.value?.map((b: any) => ({
        date: new Date(b.date),
        name: b.title,
        type: 'blog',
        path: b.path
      })) ?? []

  const guideEntries: FeedEntry[] =
      guides.value?.map((g: any) => ({
        date: new Date(g.date),
        name: g.title,
        type: 'guide',
        path: g.path
      })) ?? []

  return [...projectEntries, ...blogEntries, ...guideEntries].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
  )
})
</script>