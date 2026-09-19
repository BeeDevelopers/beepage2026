<script setup lang="ts">
const photos = [
  { src: '/images/Proyectos/BeeCode.jpeg', caption: 'Hack Day Dicis', alt: 'Estudiantes trabajando en equipo con computadoras durante Hack Day Dicis' },
  { src: '/images/Proyectos/polilinker.JPG', caption: 'DevWeek', alt: 'Participantes reunidos junto a la identidad de BeeDevelopers en DevWeek' },
  { src: '/images/Proyectos/polilinker2.JPG', caption: 'Polilinker', alt: 'Actividad de BeeDevelopers en Polilinker' },
  { src: '/images/Proyectos/Hackaton2.jpeg', caption: 'Hackatón · Participación', alt: 'Participantes durante una actividad de hackatón' },
  { src: '/images/Proyectos/Hackaton3.jpeg', caption: 'Hackatón · Colaboración', alt: 'Actividad de colaboración durante un hackatón' },
  { src: '/images/Proyectos/Hackaton4.jpeg', caption: 'Hackatón · Space Apps', alt: 'Detalle de una camiseta con el emblema NASA Space Apps Colón' },
]
</script>

<template>
  <section id="proyectos" class="home-highlights section-space" aria-labelledby="highlights-title">
    <UContainer class="content-container">
      <SectionHeading id="highlights-title" title="¿Qué hemos hecho?" description="Algunos de nuestros proyectos e iniciativas realizadas." />
      <div class="photo-grid">
        <PhotoCard v-for="photo in photos" :key="photo.src" v-bind="photo" />
      </div>
    </UContainer>
  </section>
</template>
