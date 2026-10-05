<template>
  <UPageHero
    as="section"
    class="home-hero"
    aria-labelledby="hero-title"
    :ui="{
      root: 'home-hero',
      container: 'hero-content',
      wrapper: 'hero-wrapper',
      header: 'hero-header',
      title: 'hero-title',
      description: 'hero-description',
      footer: 'hero-footer',
    }"
  >
    <template #top>
      <NuxtImg
        class="hero-image"
        src="/images/hero.jpg"
        alt=""
        width="1920"
        height="1280"
        sizes="640px sm:960px lg:1440px xl:1920px"
        format="webp"
        fetchpriority="high"
        loading="eager"
      />
    </template>

    <template #title>
      <span id="hero-title">
        <NuxtImg
          class="hero-title-logo"
          src="/images/Logos/Fondo Oscuro/BeeDevs_Logotipo_Nombre_280319.png"
          alt="BeeDevelopers"
          width="5863"
          height="530"
          sizes="240px sm:320px lg:420px"
          format="webp"
        />
      </span>
    </template>

    <template #description>
      <p>Comunidad estudiantil de innovación y desarrollo de software. Llevamos el aprendizaje más allá del aula mediante proyectos con tecnologías de alta gama.</p>
    </template>

    <template #footer>
      <UButton to="/#nosotros" class="bee-button">
        Comenzar ahora
      </UButton>
    </template>
  </UPageHero>
</template>
