<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
}>()

const letter = (index: number) => String.fromCharCode(97 + index)
</script>

<template>
  <ol class="space-y-3">
    <li
        v-for="(link, index) in links"
        :key="link.id"
        class="list-none"
    >
      <a
          :href="`#${link.id}`"
          class="inline-flex gap-1 underline hover:no-underline"
      >
        <span>{{ index + 1 }}.</span>
        {{ link.text }}
      </a>

      <ol
          v-if="link.children?.length"
          class="mt-2 space-y-1 pl-6"
      >
        <li
            v-for="(child, childIndex) in link.children"
            :key="child.id"
            class="list-none"
        >
          <a
              :href="`#${child.id}`"
              class="inline-flex gap-1 underline hover:no-underline"
          >
            <span>{{ letter(childIndex) }}.</span>
            {{ child.text }}
          </a>
        </li>
      </ol>
    </li>
  </ol>
</template>