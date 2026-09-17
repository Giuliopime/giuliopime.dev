<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-4">
    <h2 class="text-2xl">{{ error?.statusCode }}</h2>
    <p class="opacity-90">{{ error?.message }}</p>
    <button @click="handleError" class="mt-4 underline hover:text-accent">
      take me to a safe place!
    </button>
  </div>
</template>
