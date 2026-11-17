<script setup lang="ts">
useSeoMeta({
  title: 'BeeDevelopers | Grupo estudiantil de tecnología y comunidad',
  description: 'BeeDevelopers es el grupo estudiantil de la DICIS que mezcla tecnología con lo social: hackatones, talleres, ponencias y una comunidad para crecer en equipo.',
})
</script>

<template>
  <main id="contenido" tabindex="-1">
    <HomeHero />
    <HomeStats />
    <HomeActivityMarquee />
    <HomeAbout />
    <HomeHighlights />
    <HomeRegistrationSection>
      <HomeRegistrationForm />
    </HomeRegistrationSection>
  </main>
</template>
