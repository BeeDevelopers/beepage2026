<script setup lang="ts">
defineProps<{ src: string, alt: string, caption: string }>()
</script>

<template>
  <figure class="photo-card">
    <NuxtImg :src="src" :alt="alt" width="640" height="480" sizes="600px sm:400px lg:400px" format="webp" loading="lazy" />
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>
