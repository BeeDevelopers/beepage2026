<script setup lang="ts">
const photos = [
  {
    src: '/images/Proyectos/BeeCode.jpeg',
    caption: 'Hack Day Dicis',
    alt: 'Estudiantes trabajando en equipo durante Hack Day Dicis',
    details: 'Competencia de desarrollo de software organizada por BeeDevelopers.',
  },
  {
    src: '/images/Proyectos/polilinker.JPG',
    caption: 'DevWeek',
    alt: 'Alumnos de BeeDevelopers reunidos con Polilinker al finalizar la ultima ponencia de la DevWeek',
    details: 'Semana de ponencias y actividades acerca del desarrollo de software organizada por BeeDevelopers.',
  },
  {
    src: '/images/Proyectos/polilinker2.JPG',
    caption: 'Polilinker',
    alt: 'Invitada especial para la DevWeek de BeeDevelopers compartiendo una presentación frente a los asistentes',
    details: 'Invitada especial para dar cierre a la DevWeek organizada por BeeDevelopers.',
  },
  {
    src: '/images/Proyectos/Hackaton4.jpeg',
    caption: 'NASA · Space Apps',
    alt: 'Camiseta NASA Space Apps Colón',
    details: 'Competencia de programacion y desarrollo de software oranizada en colaboración con la NASA y la Universidad Aeronautica de Queretaro (UNAQ).',
  },
  {
    src: '/images/Proyectos/Hackaton2.jpeg',
    caption: 'Hackatón · Participación',
    alt: 'Integrantes de BeeDevelopers desarrollando su proyecto para el hackaton',
    details: 'Integrantes de BeeDevelopers desarrollando su proyecto para el hackaton.',
  },
  {
    src: '/images/Proyectos/Hackaton3.jpeg',
    caption: 'Hackatón · Colaboración',
    alt: 'Integrantes colaborando frente a sus computadoras durante un hackatón',
    details: 'Integrantes de BeeDevelopers desarrollando una app durante el NASA Space Apps.',
  },
]
</script>

<template>
  <UPageSection
    id="proyectos"
    as="section"
    class="home-highlights section-space"
    aria-labelledby="highlights-title"
    title="¿Qué hemos hecho?"
    description="Algunos de nuestros proyectos e iniciativas realizadas."
    :ui="{
      root: 'home-highlights section-space',
      container: 'highlights-container',
      title: 'section-title',
      description: 'section-description',
    }"
  >
    <template #title>
      <span id="highlights-title">¿Qué hemos hecho?</span>
    </template>

    <div class="photo-grid">
      <PhotoCard v-for="photo in photos" :key="photo.src" v-bind="photo" />
    </div>
  </UPageSection>
</template>
