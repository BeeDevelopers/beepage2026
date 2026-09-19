<script setup lang="ts">
defineProps<{ id: string, title: string, description?: string }>()
</script>

<template>
  <div class="section-heading">
    <h2 :id="id">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
