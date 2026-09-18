<script setup lang="ts">
import { PhotoAlbum } from 'vue-photo-album';
import AboutPhotoAlbumNuxtImage from './AboutPhotoAlbumNuxtImage.vue';

const photos = [
  {
    src: '/img/about/gvalthorens.webp',
    key: 'gvalthorens',
    alt: 'Val Thorens ski trip, slept in my car for 10 days, it was cold yes :)',
    title: 'Val Thorens ski trip, slept in my car for 10 days, it was cold yes :)',
    width: 1832,
    height: 1031,
  },
  {
    src: '/img/about/gsaildoctor.webp',
    key: 'gsaildoctor',
    alt: 'Me trying to fix the mainsail',
    title: 'Me trying to fix the mainsail',
    width: 1200,
    height: 1600,
  },
  {
    src: '/img/about/gsurf.webp',
    key: 'gsurf',
    alt: 'Surfing in Fuerteventura!',
    title: 'Surfing in Fuerteventura!',
    width: 1190,
    height: 1190,
  },
  {
    src: '/img/about/gbackpacking.webp',
    key: 'gbackpacking',
    alt: 'Sail backpacking from Barcelona to Sardegna',
    title: 'Sail backpacking from Barcelona to Sardegna',
    width: 1195,
    height: 1195,
  },
  {
    src: '/img/about/gpow.webp',
    key: 'gpow',
    alt: 'Pow pow 🔫🔫🔫',
    title: 'Pow pow 🔫🔫🔫',
    width: 1512,
    height: 2016,
  },
  {
    src: '/img/about/gsunset.webp',
    key: 'gsunset',
    alt: 'Sunset in an abandoned hotel',
    title: 'Sunset in an abandoned hotel',
    width: 2142,
    height: 2856,
  },
];

const rowConstraints = {
  maxPhotos: 2,
};
</script>

<template>
  <div class="about-photo-album">
    <PhotoAlbum
      :photos="photos"
      layout="rows"
      :target-row-height="260"
      :row-constraints="rowConstraints"
      :spacing="12"
      :padding="0"
      :photo-renderer="AboutPhotoAlbumNuxtImage"
    />
  </div>
</template>

<style scoped>
.about-photo-album :deep(img) {
  margin: 0 !important;
}
</style>
