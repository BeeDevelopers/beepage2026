<script setup lang="ts">
const activities = [
  { title: 'Desarrollo de software', text: 'Creamos soluciones tecnológicas y llevamos nuestras ideas a proyectos reales.' },
  { title: 'Aprendizaje colaborativo', text: 'Compartimos conocimientos y aprendemos juntos mediante talleres y actividades.' },
  { title: 'Comunidad y participación', text: 'Nos conectamos a través de proyectos y eventos que acercan la tecnología a los estudiantes.' },
]
</script>

<template>
  <UPageSection
    id="actividades"
    as="section"
    class="home-activities"
    aria-labelledby="activities-title"
    title="¿Qué hacemos?"
    description="Aprendemos, creamos y compartimos en comunidad."
    :ui="{
      root: 'home-activities',
      container: 'activities-container',
      title: 'section-title',
      description: 'section-description',
    }"
  >
    <template #title>
      <span id="activities-title">¿Qué hacemos?</span>
    </template>

    <div class="activity-grid">
      <UCard v-for="activity in activities" :key="activity.title" class="activity-card">
        <h3>{{ activity.title }}</h3>
        <p>{{ activity.text }}</p>
      </UCard>
    </div>
  </UPageSection>
</template>
