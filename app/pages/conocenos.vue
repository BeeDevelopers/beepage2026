<script setup lang="ts">
useSeoMeta({
  title: 'Conócenos más | BeeDevelopers',
  description: 'Quiénes somos, nuestra misión, valores, organización e integrantes de BeeDevelopers, el grupo estudiantil de tecnología y comunidad de la DICIS.',
})

const breadcrumbItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Conócenos más' },
]

// Índice de la página: cada enlace apunta al id de su sección.
const pageSections = [
  { id: 'historia', label: 'Historia' },
  { id: 'mision', label: 'Misión y visión' },
  { id: 'valores', label: 'Valores' },
  { id: 'organizacion', label: 'Cómo nos organizamos' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'comunidad', label: 'Comunidad' },
  { id: 'preguntas', label: 'Preguntas frecuentes' },
  { id: 'unete', label: 'Únete' },
]

// Las preguntas son las dudas habituales de quien quiere entrar; las respuestas se completan con la mesa directiva.
const faqItems = [
  { label: '¿Necesito saber programar para entrar?', content: '[Respuesta]' },
  { label: '¿Qué carreras pueden participar?', content: '[Respuesta]' },
  { label: '¿Cuánto tiempo tengo que dedicarle?', content: '[Respuesta]' },
  { label: '¿Cuándo y dónde se reúnen?', content: '[Respuesta]' },
  { label: '¿Tiene algún costo?', content: '[Respuesta]' },
]
</script>

<template>
  <main id="contenido" tabindex="-1">
    <!-- 1. Encabezado · navy + panal -->
    <section class="relative isolate overflow-hidden bg-(--bee-header) text-white" aria-labelledby="conocenos-title">
      <HoneycombPattern class="hero-honeycomb" />
      <div class="home-section">
        <div class="home-container">
          <UBreadcrumb
            :items="breadcrumbItems"
            :ui="{
              link: 'font-mono text-base text-[#c9d7e1] hover:text-white',
              linkLabel: 'text-inherit',
              separatorIcon: 'size-5 text-[#c9d7e1]',
            }"
          />
          <h1 id="conocenos-title" class="section-heading section-heading--on-dark mt-5!">
            Conócenos más
          </h1>
          <p class="mt-4 max-w-2xl text-[clamp(17px,1.25vw,22px)] leading-relaxed text-(--bee-text-on-hero)">
            [Texto introductorio: quiénes somos en una o dos frases.]
          </p>
        </div>
      </div>
    </section>

    <!-- Índice de secciones · barra fija -->
    <nav class="sticky top-0 z-20 border-b border-(--bee-border) bg-white/95 backdrop-blur" aria-label="Secciones de la página">
      <ul class="mx-auto flex max-w-(--bee-content-max) gap-2 overflow-x-auto px-(--bee-gutter) py-3">
        <li v-for="section in pageSections" :key="section.id" class="flex-none">
          <a
            :href="`#${section.id}`"
            class="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap text-(--bee-navy) hover:bg-(--bee-surface)"
          >
            {{ section.label }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- 2. Historia: origen breve + BeeDevelopers hoy + aliados (discreto) · blanco -->
    <section id="historia" class="home-section scroll-mt-24!" aria-labelledby="historia-title">
      <div class="home-container">
        <p class="section-label">
          // nuestra historia
        </p>
        <h2 id="historia-title" class="section-heading">
          [De dónde venimos y quiénes somos hoy]
        </h2>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          [Origen en un párrafo corto, sin fechas exactas.]
        </p>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          [BeeDevelopers hoy: generación actual, qué estamos haciendo este semestre.]
        </p>

        <!-- Aliados y logros: franja secundaria, sin protagonismo -->
        <div class="mt-12 border-t border-(--bee-border) pt-8">
          <p class="font-mono text-[13px] tracking-[.08em] text-(--bee-text) uppercase">
            Han estado con nosotros
          </p>
          <p class="mt-3 text-[15px] leading-relaxed">
            [Aliados: empresas, universidades y eventos con los que hemos colaborado.]
          </p>
          <p class="mt-2 text-[15px] leading-relaxed">
            [Logro: 2.º lugar en un hackatón (evento y año por confirmar).]
          </p>
        </div>
      </div>
    </section>

    <!-- 3. Misión y visión · crema -->
    <section id="mision" class="home-section scroll-mt-24! bg-(--bee-cream)" aria-labelledby="mision-title">
      <div class="home-container">
        <p class="section-label">
          // misión y visión
        </p>
        <h2 id="mision-title" class="section-heading">
          [Título de misión, visión y objetivos]
        </h2>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          [Misión · Visión · Objetivos — solo si existen oficialmente.]
        </p>
      </div>
    </section>

    <!-- 4. Cultura y valores · blanco -->
    <section id="valores" class="home-section scroll-mt-24!" aria-labelledby="valores-title">
      <div class="home-container">
        <p class="section-label">
          // cultura y valores
        </p>
        <h2 id="valores-title" class="section-heading">
          [Título de cultura y valores]
        </h2>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          [Valores del grupo]
        </p>
      </div>
    </section>

    <!-- 5. Cómo nos organizamos: estructura y áreas (reemplaza «lo que hacemos» para no repetir el inicio) · navy -->
    <section id="organizacion" class="home-section scroll-mt-24! bg-(--bee-header)" aria-labelledby="organizacion-title">
      <div class="home-container">
        <p class="section-label section-label--on-dark">
          // cómo nos organizamos
        </p>
        <h2 id="organizacion-title" class="section-heading section-heading--on-dark">
          [Título de la organización]
        </h2>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed text-(--bee-text-on-dark)">
          [Mesa directiva, coordinaciones o áreas y qué hace cada una.]
        </p>
      </div>
    </section>

    <!-- 6. Equipo / integrantes · blanco -->
    <section id="equipo" class="home-section scroll-mt-24!" aria-labelledby="equipo-title">
      <div class="home-container">
        <p class="section-label">
          // el equipo
        </p>
        <h2 id="equipo-title" class="section-heading">
          [Título del equipo]
        </h2>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          [Tarjetas de integrantes: nombre, rol, carrera y foto, con su autorización.]
        </p>
      </div>
    </section>

    <!-- 7. Comunidad: pocas fotos de convivencia + enlace a la galería completa · crema -->
    <section id="comunidad" class="home-section scroll-mt-24! bg-(--bee-cream)" aria-labelledby="comunidad-title">
      <div class="home-container">
        <p class="section-label">
          // nuestra comunidad
        </p>
        <h2 id="comunidad-title" class="section-heading">
          [Título de comunidad]
        </h2>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          [Fotos de reuniones, toma de protesta y convivencias.]
        </p>
        <UButton to="/galeria" color="neutral" variant="outline" class="mt-8 min-h-11 rounded-lg px-6 text-sm font-semibold text-(--bee-navy) ring-(--bee-navy)">
          Ver galería completa
        </UButton>
      </div>
    </section>

    <!-- 8. Preguntas frecuentes · blanco -->
    <section id="preguntas" class="home-section scroll-mt-24!" aria-labelledby="preguntas-title">
      <div class="home-container max-w-4xl!">
        <p class="section-label">
          // preguntas frecuentes
        </p>
        <h2 id="preguntas-title" class="section-heading">
          ¿Tienes dudas antes de unirte?
        </h2>
        <UAccordion :items="faqItems" class="mt-8" />
      </div>
    </section>

    <!-- 9. Únete y síguenos: cierre con llamada a la acción · navy + panal -->
    <section id="unete" class="home-section relative isolate scroll-mt-24! overflow-hidden bg-(--bee-header)" aria-labelledby="unete-title">
      <HoneycombPattern class="opacity-[.07]" />
      <div class="home-container">
        <p class="section-label section-label--on-dark">
          // únete
        </p>
        <h2 id="unete-title" class="section-heading section-heading--on-dark">
          [Frase de cierre para invitar a unirse]
        </h2>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <UButton to="/#registro" class="bee-button">
            Únete a BeeDevelopers
          </UButton>
          <p class="text-[15px] text-(--bee-text-on-dark)">
            [Redes sociales: reutilizar los enlaces del footer.]
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
