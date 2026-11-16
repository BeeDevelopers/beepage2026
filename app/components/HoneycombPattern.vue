<script setup lang="ts">
const patternId = useId()
</script>

<template>
  <svg class="honeycomb-pattern" aria-hidden="true">
    <defs>
      <pattern :id="patternId" width="56" height="100" patternUnits="userSpaceOnUse">
        <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="currentColor" stroke-width="1.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
