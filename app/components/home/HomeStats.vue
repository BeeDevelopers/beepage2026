<script setup lang="ts">
const stats = [
  { value: '20', suffix: '+', label: 'integrantes activos' },
  { value: '50', suffix: '+', label: 'eventos organizados' },
  { value: '10', suffix: '+', label: 'hackatones en equipo' },
  { value: '2018', label: 'construyendo desde' },
]
</script>

<template>
  <section class="home-stats" aria-label="BeeDevelopers en números">
    <dl class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat">
        <dt>{{ stat.label }}</dt>
        <dd>{{ stat.value }}<span v-if="stat.suffix">{{ stat.suffix }}</span></dd>
      </div>
    </dl>
  </section>
</template>
