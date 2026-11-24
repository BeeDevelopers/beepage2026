<script setup lang="ts">
// scale agranda las celdas del panal; por defecto miden 56 px de ancho.
const { scale = 1 } = defineProps<{ scale?: number }>()
const patternId = useId()
</script>

<template>
  <svg class="honeycomb-pattern" aria-hidden="true">
    <defs>
      <pattern :id="patternId" width="56" height="100" patternUnits="userSpaceOnUse" :patternTransform="scale === 1 ? undefined : `scale(${scale})`">
        <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="currentColor" :stroke-width="1.5 / scale" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
