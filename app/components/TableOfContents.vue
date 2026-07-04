<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
}>()
</script>

<template>
  <ol class="list-decimal list-inside space-y-3">
    <li
        v-for="link in links"
        :key="link.id"
    >
      <a
          :href="`#${link.id}`"
          class="underline hover:no-underline"
      >
        {{ link.text }}
      </a>

      <ol
          v-if="link.children?.length"
          class="list-[lower-alpha] list-inside pl-6 mt-2 space-y-1"
      >
        <li
            v-for="child in link.children"
            :key="child.id"
        >
          <a
              :href="`#${child.id}`"
              class="underline hover:no-underline"
          >
            {{ child.text }}
          </a>
        </li>
      </ol>
    </li>
  </ol>
</template>