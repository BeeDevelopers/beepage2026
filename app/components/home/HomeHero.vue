<template>
  <section class="home-hero" aria-labelledby="hero-title">
    <NuxtImg class="hero-image" src="/images/hero.jpg" alt="" width="1920" height="1280" sizes="640px sm:960px lg:1440px xl:1920px" format="webp" fetchpriority="high" loading="eager" />
    <UContainer class="hero-content content-container">
      <h1 id="hero-title">BeeDevelopers</h1>
      <p>Comunidad estudiantil de innovación y desarrollo de software. Llevamos el aprendizaje más allá del aula mediante proyectos con tecnologías de alta gama.</p>
      <SiteButton to="/#nosotros">Comenzar ahora</SiteButton>
    </UContainer>
  </section>
</template>
