<template>
  <UPageSection
    id="nosotros"
    as="section"
    class="home-about"
    aria-labelledby="about-title"
    title="¿Qué es BeeDevelopers?"
    :ui="{
      root: 'home-about',
      container: 'about-grid',
      wrapper: 'about-copy',
      title: 'section-title',
      description: 'about-description',
    }"
  >
    <template #title>
      <span id="about-title">¿Qué es BeeDevelopers?</span>
    </template>

    <template #description>
      <p>BeeDevelopers es un grupo estudiantil de desarrollo tecnológico de la DICIS. Nuestra misión es fomentar el aprendizaje colaborativo y la creación de soluciones innovadoras que impacten positivamente en nuestra comunidad universitaria.</p>
      <p>Formamos un ecosistema donde la teoría se encuentra con la práctica, permitiendo a los estudiantes trabajar en proyectos reales con tecnologías de desarrollo de gama alta.</p>
    </template>

    <NuxtImg
      class="about-image"
      src="/images/Nosotros.jpeg"
      alt="Integrantes de BeeDevelopers reunidos con la bandera del grupo frente a la UNAQ"
      width="1600"
      height="900"
      sizes="100vw md:50vw"
      format="webp"
      loading="lazy"
    />
  </UPageSection>
</template>
