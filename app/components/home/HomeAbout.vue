<script setup lang="ts">
const values = [
  { title: 'Habilidades blandas:', text: 'liderazgo, trabajo en equipo y hablar en público, practicados en cada actividad.' },
  { title: 'Convivencia:', text: 'una comunidad de estudiantes de distintas carreras donde es fácil hacer equipo y amistades.' },
  { title: 'Vinculación:', text: 'contacto con ponentes, empresas y otras universidades en eventos como DevWeek y NASA Space Apps.' },
]
</script>

<template>
  <section id="nosotros" class="home-section home-about" aria-labelledby="about-title">
    <div class="home-container about-layout">
      <div class="about-collage">
        <svg class="about-hexes" aria-hidden="true" viewBox="0 0 84 110">
          <polygon points="56,2 82,17 82,47 56,62 30,47 30,17" fill="none" stroke="#ffda4a" stroke-width="2" />
          <polygon points="28,50 54,65 54,95 28,110 2,95 2,65" fill="#ffda4a" opacity=".6" />
        </svg>
        <NuxtImg
          class="about-photo-main"
          src="/images/Nosotros.jpeg"
          alt="Integrantes de BeeDevelopers reunidos con la bandera del grupo frente a la UNAQ"
          width="1600"
          height="1000"
          sizes="100vw md:560px"
          format="webp"
          loading="lazy"
        />
        <svg class="about-hexes about-hexes--low" aria-hidden="true" viewBox="0 0 112 64">
          <polygon points="28,2 54,17 54,47 28,62 2,47 2,17" fill="#073354" opacity=".12" />
          <polygon points="84,2 110,17 110,47 84,62 58,47 58,17" fill="none" stroke="#e0b100" stroke-width="2" />
        </svg>
        <NuxtImg
          class="about-photo-secondary"
          src="/images/Proyectos/polilinker2.JPG"
          alt="Ponente compartiendo una presentación durante la DevWeek"
          width="800"
          height="600"
          sizes="50vw md:300px"
          format="webp"
          loading="lazy"
        />
      </div>

      <div class="about-copy">
        <p class="section-label">
          // sobre nosotros
        </p>
        <h2 id="about-title" class="section-heading">
          En BeeDevelopers la tecnología se vuelve comunidad
        </h2>
        <p class="about-text">
          Somos un grupo estudiantil que mezcla la tecnología con lo social. Programar es el punto de partida: aquí lo importante es crecer como persona, aprender a trabajar con otros y encontrar a tu gente.
        </p>
        <ul class="about-values">
          <li v-for="value in values" :key="value.title">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            <span><strong>{{ value.title }}</strong> {{ value.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
