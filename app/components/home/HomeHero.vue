<template>
  <section class="home-hero" aria-labelledby="hero-title">
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
    <HoneycombPattern class="hero-honeycomb" />

    <div class="hero-inner">
      <div class="hero-copy">
        <p class="hero-eyebrow">
          <span class="hero-eyebrow-group">
            <svg aria-hidden="true" viewBox="0 0 56 64"><polygon points="28,5 51,18.5 51,45.5 28,59 5,45.5 5,18.5" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" /><polygon points="28,22 37,27 37,37 28,42 19,37 19,27" fill="currentColor" /></svg>
            Grupo estudiantil
            <span class="hero-eyebrow-rule" aria-hidden="true" />
          </span>
          <span>DICIS · Universidad de Guanajuato</span>
        </p>

        <h1 id="hero-title" class="hero-title">
          <NuxtImg
            class="hero-title-logo"
            src="/images/Logos/Fondo Oscuro/BeeDevs_Logotipo_Nombre_280319.png"
            alt="BeeDevelopers"
            width="5863"
            height="530"
            sizes="320px sm:440px"
            format="webp"
          />
        </h1>

        <p class="hero-tagline">
          Aprende construyendo. <span>Construye en comunidad.</span>
        </p>

        <p class="hero-description">
          Somos un grupo estudiantil de la DICIS que mezcla la tecnología con lo social: aprendemos en equipo, organizamos eventos y crecemos como personas, no solo como programadores.
        </p>

        <div class="hero-actions">
          <UButton to="/#registro" class="bee-button">
            Únete a BeeDevelopers
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </UButton>
          <UButton to="/#proyectos" color="neutral" variant="outline" class="bee-ghost-button">
            Ver proyectos
          </UButton>
        </div>
      </div>

      <div class="code-card">
        <div class="code-card-bar">
          <span class="code-card-dot" style="background: #ff6b5e" aria-hidden="true" />
          <span class="code-card-dot" style="background: #ffda4a" aria-hidden="true" />
          <span class="code-card-dot" style="background: #5ed58a" aria-hidden="true" />
          <span class="code-card-file">beedevelopers.ts</span>
        </div>
        <pre><span class="code-comment">// Únete a BeeDevelopers</span>
<span class="code-keyword">const</span> tu = <span class="code-keyword">new</span> <span class="code-class">BeeDeveloper</span>({
  campus: <span class="code-string">'DICIS'</span>,
  experiencia: <span class="code-string">'cualquiera'</span>,
  ganas: <span class="code-number">Infinity</span>,
})

<span class="code-keyword">await</span> tu.<span class="code-method">aprender</span>()
<span class="code-keyword">await</span> tu.<span class="code-method">convivir</span>(<span class="code-string">'en equipo'</span>)
tu.<span class="code-method">crecer</span>() <span class="code-comment">// ✓ listo</span></pre>
      </div>
    </div>
  </section>
</template>
