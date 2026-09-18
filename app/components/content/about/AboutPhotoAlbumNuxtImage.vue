<script setup lang="ts">
import type { PhotoRendererMetadata } from 'vue-photo-album';
import ProseImg from '../ProseImg.vue';

const props = defineProps<PhotoRendererMetadata>();
</script>

<template>
  <ProseImg
    class="about-photo-renderer"
    :src="props.photo.src"
    :alt="props.photo.alt"
    :title="props.photo.title"
    :width="props.photo.width"
    :height="props.photo.height"
  />
</template>

<style scoped>
.about-photo-renderer :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
