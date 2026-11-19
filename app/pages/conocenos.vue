<script setup lang="ts">
useSeoMeta({
  title: 'Conócenos más | BeeDevelopers',
  description: 'BeeDevelopers es el grupo estudiantil de tecnología de la DICIS, Universidad de Guanajuato: nuestra historia, misión, valores, actividades y cómo unirte.',
})

const breadcrumbItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Conócenos más' },
]

// Índice de la página: cada enlace apunta al id de su sección.
const pageSections = [
  { id: 'historia', label: 'Historia' },
  { id: 'mision', label: 'Lo que nos mueve' },
  { id: 'valores', label: 'Valores' },
  { id: 'actividades', label: 'Actividades' },
  { id: 'comunidad', label: 'Comunidad' },
  { id: 'preguntas', label: 'Preguntas frecuentes' },
  { id: 'unete', label: 'Únete' },
]

// Orden cronológico. Dentro de un mismo año, el orden es aproximado.
const milestones = [
  {
    year: '2019',
    title: 'Día del Estudiante',
    text: 'Una de nuestras primeras participaciones: organizamos una actividad de videojuegos en la DICIS.',
  },
  {
    year: '2020',
    title: 'Primera DevWeek',
    text: 'Organizamos nuestra primera semana de talleres, pláticas y conferencias sobre desarrollo de software y tecnología.',
  },
  {
    year: '2023',
    title: 'Primer SheCodes',
    text: 'Abrimos un espacio seguro para que las mujeres de la Universidad aprendan a programar entre compañeras.',
  },
  {
    year: '2023',
    title: 'Segundo lugar en el Hackatón URBANA',
    text: 'En octubre, nuestro equipo BeeSketeers obtuvo el segundo lugar en Apaseo el Grande con un chatbot para orientar a la ciudadanía y facilitar los trámites de gobierno.',
  },
  {
    year: '2025',
    title: 'Hack Day DICIS',
    text: 'Organizamos nuestro primer hackatón en el campus, con Major League Hacking, que incluyó un premio especial al mejor uso de Gemini.',
  },
]

const supporters = ['Major League Hacking', 'GitHub Campus Experts']

const objectives = [
  'Complementar la formación universitaria con experiencias prácticas en programación y tecnología.',
  'Desarrollar habilidades de comunicación, organización y trabajo en equipo mediante proyectos y eventos estudiantiles.',
  'Facilitar la participación de estudiantes con distintos niveles de experiencia y contribuir a reducir la brecha de género en tecnología.',
]

const values = [
  { title: 'Colaboración', text: 'Compartimos conocimientos, repartimos tareas y nos apoyamos cuando alguien necesita ayuda.' },
  { title: 'Inclusión', text: 'Damos la bienvenida a estudiantes de cualquier carrera, también a quienes empiezan desde cero.' },
  { title: 'Respeto', text: 'Escuchamos las ideas y tomamos en serio las preguntas de cada integrante.' },
  { title: 'Iniciativa', text: 'Proponemos mejoras, probamos ideas y participamos en su desarrollo.' },
  { title: 'Compromiso', text: 'Cumplimos los acuerdos y damos seguimiento a las actividades que asumimos.' },
]

const activities = [
  {
    title: 'DevWeek',
    text: 'Una semana de talleres, pláticas y conferencias sobre desarrollo de software, tecnología y habilidades profesionales. Reunimos a estudiantes, docentes y ponentes invitados para compartir herramientas y experiencias.',
  },
  {
    title: 'SheCodes',
    text: 'Un espacio seguro para que las mujeres de la Universidad aprendan a programar entre compañeras. Una de sus ediciones incluyó un curso de Python básico para dar los primeros pasos en programación.',
  },
  {
    title: 'BeeMatch',
    text: 'Para el Día del Amor y la Amistad, combinamos programación y convivencia. Los participantes responden un cuestionario sobre sus gustos y nuestro algoritmo busca coincidencias entre sus respuestas.',
  },
  {
    title: 'Hackatones y Talent Land',
    text: 'Organizamos hackatones en la DICIS y formamos equipos para participar en competencias como NASA Space Apps Challenge. Cada año también asistimos a Talent Land para conocer proyectos y explorar distintas áreas de la tecnología.',
  },
]

const faqItems = [
  { label: '¿Necesito saber programar?', content: 'Puedes entrar aunque nunca hayas programado. El grupo también es un espacio para empezar.' },
  { label: '¿Puedo entrar si estudio otra carrera?', content: 'Sí. BeeDevelopers está abierto a estudiantes de cualquier carrera.' },
  { label: '¿Tiene algún costo?', content: 'Unirte a BeeDevelopers es gratis.' },
  { label: '¿Puedo participar en una actividad sin ser integrante?', content: 'Sí. Nuestras actividades están abiertas a la comunidad estudiantil, y algunas otorgan horas formativas a quienes participan o asisten.' },
  { label: '¿Puedo hacer mi servicio social con BeeDevelopers?', content: 'Sí. Escríbenos por nuestras redes sociales y te compartimos las opciones disponibles.' },
]

const joinOptions = [
  { title: 'Practicar lo que te interesa.', text: 'Participa en un taller, prueba una herramienta o comparte una duda de la carrera con el grupo.' },
  { title: 'Participar en un hackatón.', text: 'Trabaja en una idea en equipo, desarrolla una solución y presenta el resultado.' },
  { title: 'Organizar algo propio.', text: 'Si hay un tema que te gustaría aprender o enseñar, puedes proponer un taller y participar en su organización, desde elegir el contenido hasta recibir a los asistentes.' },
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
            Somos BeeDevelopers
          </h1>
          <p class="mt-4 max-w-3xl text-[clamp(17px,1.25vw,22px)] leading-relaxed text-(--bee-text-on-hero)">
            Somos un grupo estudiantil de la División de Ingenierías de la Universidad de Guanajuato, Campus Irapuato-Salamanca. Nos reúne el interés por la tecnología y por compartir lo que aprendemos. Eso se refleja en lo que hacemos, desde un curso para quienes empiezan a programar hasta un hackatón organizado en nuestro propio campus.
          </p>
          <UButton to="/#registro" class="bee-button mt-8">
            Únete a BeeDevelopers
          </UButton>
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

    <!-- 2. Historia: hitos + apoyos (discreto) · blanco -->
    <section id="historia" class="home-section scroll-mt-24! bg-(--bee-cream)" aria-labelledby="historia-title">
      <div class="home-container">
        <p class="section-label">
          // nuestra historia
        </p>
        <h2 id="historia-title" class="section-heading">
          Nuestra historia
        </h2>

        <!-- Línea de tiempo vertical: hitos alternados a los lados en escritorio, a la derecha de la línea en móvil -->
        <ol class="timeline">
          <li v-for="milestone in milestones" :key="milestone.title" class="timeline-item">
            <div class="timeline-marker">
              <svg aria-hidden="true" viewBox="0 0 56 64">
                <polygon points="28,2 54,17 54,47 28,62 2,47 2,17" fill="#ffda4a" stroke="#fff" stroke-width="3" />
              </svg>
              <span class="timeline-year">{{ milestone.year }}</span>
            </div>
            <div class="timeline-body lift">
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.text }}</p>
            </div>
          </li>
        </ol>

        <!-- Apoyos: franja secundaria, sin protagonismo -->
        <div class="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-(--bee-border) pt-6">
          <p class="font-mono text-[13px] tracking-[.08em] uppercase">
            Con el apoyo de
          </p>
          <ul class="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium text-(--bee-navy)">
            <li v-for="supporter in supporters" :key="supporter">
              {{ supporter }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 3. Misión, visión y objetivos · crema -->
    <section id="mision" class="home-section scroll-mt-24!" aria-labelledby="mision-title">
      <div class="home-container">
        <p class="section-label">
          // misión y visión
        </p>
        <h2 id="mision-title" class="section-heading">
          Lo que nos mueve
        </h2>
        <div class="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 class="text-xl">
              Misión
            </h3>
            <p class="mt-3 text-[clamp(16px,1.1vw,19px)] leading-relaxed">
              Acercar la tecnología a la comunidad estudiantil de la UG mediante talleres, proyectos y eventos donde los estudiantes puedan aprender, compartir conocimientos y desarrollar sus propias ideas.
            </p>
          </div>
          <div>
            <h3 class="text-xl">
              Visión
            </h3>
            <p class="mt-3 text-[clamp(16px,1.1vw,19px)] leading-relaxed">
              Queremos que BeeDevelopers sea un punto de encuentro para estudiantes de la UG que buscan iniciarse en tecnología, profundizar en un tema o impulsar un proyecto que beneficie a su comunidad.
            </p>
          </div>
        </div>
        <h3 class="mt-12 text-xl">
          Objetivos
        </h3>
        <ul class="mt-4 flex max-w-4xl flex-col gap-3 text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          <li v-for="objective in objectives" :key="objective" class="list-inside list-disc">
            {{ objective }}
          </li>
        </ul>
      </div>
    </section>

    <!-- 4. Valores · blanco -->
    <section id="valores" class="home-section scroll-mt-24! bg-(--bee-cream)" aria-labelledby="valores-title">
      <div class="home-container">
        <p class="section-label">
          // cultura y valores
        </p>
        <h2 id="valores-title" class="section-heading">
          Nuestros valores
        </h2>
        <!-- Tarjetas: el diseño visual se define en un paso posterior -->
        <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <li v-for="value in values" :key="value.title">
            <h3 class="text-xl">
              {{ value.title }}
            </h3>
            <p class="mt-2 text-base leading-relaxed">
              {{ value.text }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 5. Actividades · navy -->
    <section id="actividades" class="home-section scroll-mt-24! bg-(--bee-header)" aria-labelledby="actividades-title">
      <div class="home-container">
        <div class="section-head">
          <div>
            <p class="section-label section-label--on-dark">
              // actividades
            </p>
            <h2 id="actividades-title" class="section-heading section-heading--on-dark">
              Lo que hacemos juntos
            </h2>
          </div>
          <p class="max-w-xl text-[clamp(16px,1.1vw,19px)] leading-relaxed text-(--bee-text-on-dark)">
            Desde nuestras primeras actividades hemos creado eventos propios y colaborado con otros grupos organizados de la División.
          </p>
        </div>
        <!-- Tarjetas con foto: pendientes de imágenes -->
        <ul class="mt-10 grid gap-6 md:grid-cols-2">
          <li v-for="activity in activities" :key="activity.title">
            <h3 class="text-xl text-white!">
              {{ activity.title }}
            </h3>
            <p class="mt-2 text-base leading-relaxed text-(--bee-text-on-dark)">
              {{ activity.text }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 6. Comunidad: fotos de convivencia + enlace a la galería · crema -->
    <section id="comunidad" class="home-section scroll-mt-24! bg-(--bee-cream)" aria-labelledby="comunidad-title">
      <div class="home-container">
        <p class="section-label">
          // nuestra comunidad
        </p>
        <h2 id="comunidad-title" class="section-heading">
          [Título de comunidad]
        </h2>
        <p class="mt-5 max-w-3xl text-[clamp(16px,1.1vw,19px)] leading-relaxed">
          [Fotos de reuniones, toma de protesta y convivencias: pendientes.]
        </p>
        <UButton to="/galeria" color="neutral" variant="outline" class="mt-8 min-h-11 rounded-lg px-6 text-sm font-semibold text-(--bee-navy) ring-(--bee-navy)">
          Ver galería completa
        </UButton>
      </div>
    </section>

    <!-- 7. Preguntas frecuentes · blanco -->
    <section id="preguntas" class="home-section scroll-mt-24!" aria-labelledby="preguntas-title">
      <div class="home-container max-w-4xl!">
        <p class="section-label">
          // preguntas frecuentes
        </p>
        <h2 id="preguntas-title" class="section-heading">
          Preguntas frecuentes
        </h2>
        <UAccordion :items="faqItems" class="mt-8" />
      </div>
    </section>

    <!-- 8. Únete: qué puedes hacer + llamada a la acción · navy + panal -->
    <section id="unete" class="home-section relative isolate scroll-mt-24! overflow-hidden bg-(--bee-header)" aria-labelledby="unete-title">
      <HoneycombPattern class="opacity-[.07]" />
      <div class="home-container">
        <p class="section-label section-label--on-dark">
          // únete
        </p>
        <h2 id="unete-title" class="section-heading section-heading--on-dark">
          Qué puedes hacer al unirte
        </h2>
        <ul class="mt-8 flex max-w-4xl flex-col gap-4 text-[clamp(16px,1.1vw,19px)] leading-relaxed text-(--bee-text-on-dark)">
          <li v-for="option in joinOptions" :key="option.title">
            <strong class="font-semibold text-white">{{ option.title }}</strong> {{ option.text }}
          </li>
        </ul>
        <p class="mt-6 max-w-4xl text-[15px] leading-relaxed text-(--bee-text-on-dark)">
          Algunas actividades otorgan horas formativas. Si te interesa hacer tu servicio social con nosotros, escríbenos por nuestras redes sociales.
        </p>
        <p class="mt-10 max-w-3xl text-[clamp(17px,1.25vw,22px)] leading-relaxed text-white">
          ¿Te interesa participar en un taller, sumarte a un proyecto u organizar un evento con el grupo? Completa el formulario de registro.
        </p>
        <UButton to="/#registro" class="bee-button mt-6">
          Únete a BeeDevelopers
        </UButton>
      </div>
    </section>
  </main>
</template>
