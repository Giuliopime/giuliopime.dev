<script setup lang="ts">
</script>
<template>
  <div class="flex flex-col font-[sohne] font-light mt-20">
    <div class="flex flex-col text-8xl text-sky tracking-[-0.055em]">
      <span>Giulio here</span>
      <span class="vert-center gap-6">Welcome to my space<span class="text-canary font-[pix]">:)</span></span>
    </div>

    <div class="flex flex-col mt-10 text-3xl font-thin tracking-[-0.055em]">
      <p class="backdrop-blur-[1px] w-fit">
        I architect and craft backends, ideally in Kotlin. Sometimes I touch swift code too.
      </p>
      <p class="backdrop-blur-[1px] w-fit">
        I touch css only with a gun to my head.
      </p>
    </div>

    <div class="flex flex-col mt-20">
      <span class="text-sky text-7xl tracking-[-0.055em]">Feed</span>
      <div class="flex mt-10">
        <div class="flex flex-col font-[sohne] font-lighter w-1/4">
          <div class="flex justify-between items-center">
            <span class="text-xs">/&thinsp;FILTER</span>
            <button class="text-coral text-xs">CLEAR FILTERS</button>
          </div>
          <hr class="my-1">
          <div class="flex">
            <div class="flex flex-col text-alien">
              <span class="vert-center gap-2"><Icon name="pixelarticons:folder" class="text-2xl" />Type</span>
              <div class="vert-center opacity-70 hover:opacity-100 cursor-pointer">
                <input type="checkbox" name="project" class="mx-2" />
                <label for="project">Project</label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>