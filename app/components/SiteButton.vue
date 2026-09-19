<script setup lang="ts">
defineProps<{ to: string, pill?: boolean }>()
</script>

<template>
  <UButton :to="to" class="bee-button" :class="{ 'bee-button--pill': pill }">
    <slot />
  </UButton>
</template>
