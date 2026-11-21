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
  { title: 'Colaboración', icon: 'i-lucide-users', text: 'Compartimos conocimientos, repartimos tareas y nos apoyamos cuando alguien necesita ayuda.' },
  { title: 'Inclusión', icon: 'i-lucide-heart', text: 'Damos la bienvenida a estudiantes de cualquier carrera, también a quienes empiezan desde cero.' },
  { title: 'Respeto', icon: 'i-lucide-message-circle', text: 'Escuchamos las ideas y tomamos en serio las preguntas de cada integrante.' },
  { title: 'Iniciativa', icon: 'i-lucide-lightbulb', text: 'Proponemos mejoras, probamos ideas y participamos en su desarrollo.' },
  { title: 'Compromiso', icon: 'i-lucide-check', text: 'Cumplimos los acuerdos y damos seguimiento a las actividades que asumimos.' },
]

const activities = [
  {
    title: 'DevWeek',
    tag: 'Desde 2020',
    text: 'Una semana de talleres, pláticas y conferencias sobre desarrollo de software, tecnología y habilidades profesionales. Reunimos a estudiantes, docentes y ponentes invitados para compartir herramientas y experiencias.',
  },
  {
    title: 'SheCodes',
    tag: 'Desde 2023',
    text: 'Un espacio seguro para que las mujeres de la Universidad aprendan a programar entre compañeras. Una de sus ediciones incluyó un curso de Python básico para dar los primeros pasos en programación.',
  },
  {
    title: 'BeeMatch',
    tag: '14 de febrero',
    text: 'Para el Día del Amor y la Amistad, combinamos programación y convivencia. Los participantes responden un cuestionario sobre sus gustos y nuestro algoritmo busca coincidencias entre sus respuestas.',
  },
  {
    title: 'Hackatones y Talent Land',
    tag: 'Cada año',
    text: 'Organizamos hackatones en la DICIS y formamos equipos para participar en competencias como NASA Space Apps Challenge. Cada año también asistimos a Talent Land para conocer proyectos y explorar distintas áreas de la tecnología.',
  },
  {
    title: 'Kermeses y ventas',
    tag: 'Días festivos',
    text: 'Cuando hay kermeses en la universidad, ponemos nuestro puesto. ¡Los Jarritos nunca faltan! Es otra forma de convivir con la comunidad fuera del salón y, además, contribuye a los fondos del grupo.',
  },
  {
    title: 'BeeTech Support',
    tag: 'Ayuda técnica',
    text: 'Ayudamos a los estudiantes con su tecnología: les explicamos qué beneficios incluye su correo institucional, limpiamos sus dispositivos e instalamos los programas a los que tienen acceso con su cuenta.',
  },
]

// Índice: marca la sección que está a la vista. La línea de detección va un poco debajo de la barra fija.
const activeSection = ref('')
const indexList = ref<HTMLElement | null>(null)
let sectionObserver: IntersectionObserver | undefined

onMounted(() => {
  sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
      // De regreso al encabezado: ninguna sección queda marcada.
      else if (entry.target.id === pageSections[0]?.id && entry.boundingClientRect.top > 0) {
        activeSection.value = ''
      }
    }
  }, { rootMargin: '-90px 0px -70% 0px' })

  for (const section of pageSections) {
    const element = document.getElementById(section.id)
    if (element) sectionObserver.observe(element)
  }
})

onBeforeUnmount(() => sectionObserver?.disconnect())

// En pantallas angostas el índice se desliza de lado: mantiene visible el enlace activo.
watch(activeSection, (id) => {
  const list = indexList.value
  const link = list?.querySelector<HTMLElement>(`a[href="#${id}"]`)
  if (!list || !link) return
  list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' })
})

// Mosaico de Comunidad: lugares para fotos de convivencia (pendientes). La primera es la grande.
const communityPhotos = ['Toma de protesta', 'Reunión del grupo', 'Convivencia', 'Salida del grupo']

const faqItems = [
  { label: '¿Necesito saber programar?', content: 'Puedes entrar aunque nunca hayas programado. El grupo también es un espacio para empezar.' },
  { label: '¿Puedo entrar si estudio otra carrera?', content: 'Sí. BeeDevelopers está abierto a estudiantes de cualquier carrera.' },
  { label: '¿Tiene algún costo?', content: 'Unirte a BeeDevelopers es gratis.' },
  { label: '¿Puedo participar en una actividad sin ser integrante?', content: 'Sí. Nuestras actividades están abiertas a la comunidad estudiantil, y algunas otorgan horas formativas a quienes participan o asisten.' },
  { label: '¿Puedo hacer mi servicio social con BeeDevelopers?', content: 'Sí. Escríbenos por nuestras redes sociales y te compartimos las opciones disponibles.' },
]

const joinOptions = [
  { title: 'Practicar lo que te interesa', text: 'Participa en un taller, prueba una herramienta o comparte una duda de la carrera con el grupo.' },
  { title: 'Participar en un hackatón', text: 'Trabaja en una idea en equipo, desarrolla una solución y presenta el resultado.' },
  { title: 'Organizar algo propio', text: 'Si hay un tema que te gustaría aprender o enseñar, propón un taller y participa en su organización, desde elegir el contenido hasta recibir a los asistentes.' },
]
</script>

<template>
  <main id="contenido" tabindex="-1">
    <!-- 1. Encabezado · navy + panal, con la terminal a la derecha -->
    <section class="relative isolate overflow-hidden bg-(--bee-header) text-white" aria-labelledby="conocenos-title">
      <HoneycombPattern class="hero-honeycomb" />
      <div class="hero-inner conocenos-hero">
        <div class="hero-copy">
          <UBreadcrumb
            :items="breadcrumbItems"
            :ui="{
              link: 'font-mono text-base text-(--bee-text-on-dark) hover:text-white',
              linkLabel: 'text-inherit',
              separatorIcon: 'size-5 text-(--bee-text-on-dark)',
            }"
          />
          <h1 id="conocenos-title" class="conocenos-hero-title">
            Somos <span>BeeDevelopers</span>
          </h1>
          <p class="hero-description">
            Somos un grupo estudiantil de la División de Ingenierías de la Universidad de Guanajuato, Campus Irapuato-Salamanca. Nos reúne el interés por la tecnología y por compartir lo que aprendemos.
          </p>
          <div class="hero-actions">
            <UButton to="/#registro" class="bee-button" trailing-icon="i-lucide-arrow-right">
              Únete a BeeDevelopers
            </UButton>
            <UButton to="#historia" color="neutral" variant="outline" class="bee-ghost-button">
              Nuestra historia
            </UButton>
          </div>
        </div>

        <ConocenosTerminal :milestones="milestones" :activities="activities" :values="values" />
      </div>
    </section>

    <!-- Índice de secciones · barra fija -->
    <nav class="sticky top-0 z-20 border-b border-(--bee-border) bg-white/95 backdrop-blur" aria-label="Secciones de la página">
      <ul ref="indexList" class="mx-auto flex max-w-(--bee-page-max) gap-1.5 overflow-x-auto px-(--bee-gutter) py-3">
        <li v-for="section in pageSections" :key="section.id" class="flex-none">
          <a
            :href="`#${section.id}`"
            :aria-current="activeSection === section.id ? 'location' : undefined"
            class="conocenos-index-link inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap text-(--bee-navy) hover:bg-(--bee-surface)"
          >
            {{ section.label }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- 2. Historia: línea de tiempo + apoyos (discreto) · blanco con panal; las celdas del fondo miden lo mismo que los hexágonos de la línea -->
    <section id="historia" class="home-section conocenos-section conocenos-section--honeycomb scroll-mt-24!" aria-labelledby="historia-title">
      <HoneycombPattern class="conocenos-honeycomb" :scale="72 / 56" />
      <div class="home-container">
        <p class="section-label">
          // nuestra historia
        </p>
        <h2 id="historia-title" class="section-heading">
          Nuestra historia
        </h2>

        <ol class="timeline">
          <li v-for="milestone in milestones" :key="milestone.title" class="timeline-item">
            <div class="timeline-marker" aria-hidden="true">
              <svg viewBox="0 0 56 64">
                <polygon points="28,2 54,17 54,47 28,62 2,47 2,17" fill="#ffda4a" stroke="#fff" stroke-width="4" />
              </svg>
            </div>
            <div class="timeline-body lift">
              <p class="timeline-year">
                {{ milestone.year }}
              </p>
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.text }}</p>
            </div>
          </li>
        </ol>

        <div class="conocenos-supporters">
          <p class="conocenos-supporters-label">
            Con el apoyo de
          </p>
          <ul>
            <li v-for="supporter in supporters" :key="supporter">
              {{ supporter }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 3. Misión, visión y objetivos · blanco -->
    <section id="mision" class="home-section conocenos-section scroll-mt-24!" aria-labelledby="mision-title">
      <div class="home-container">
        <p class="section-label">
          // misión y visión
        </p>
        <h2 id="mision-title" class="section-heading">
          Lo que nos mueve
        </h2>

        <div class="conocenos-statements">
          <article class="conocenos-statement conocenos-statement--dark">
            <svg class="conocenos-statement-hexagon" aria-hidden="true" viewBox="0 0 56 64">
              <polygon points="28,2 54,17 54,47 28,62 2,47 2,17" fill="none" stroke="currentColor" stroke-width="2" />
            </svg>
            <h3 class="conocenos-statement-label">
              Misión
            </h3>
            <p class="conocenos-statement-text">
              Acercar la tecnología a la comunidad estudiantil de la UG mediante talleres, proyectos y eventos donde los estudiantes puedan aprender, compartir conocimientos y desarrollar sus propias ideas.
            </p>
          </article>
          <article class="conocenos-statement">
            <svg class="conocenos-statement-hexagon" aria-hidden="true" viewBox="0 0 56 64">
              <polygon points="28,2 54,17 54,47 28,62 2,47 2,17" fill="none" stroke="currentColor" stroke-width="2" />
            </svg>
            <h3 class="conocenos-statement-label">
              Visión
            </h3>
            <p class="conocenos-statement-text">
              Queremos que BeeDevelopers sea un punto de encuentro para estudiantes de la UG que buscan iniciarse en tecnología, profundizar en un tema o impulsar un proyecto que beneficie a su comunidad.
            </p>
          </article>
        </div>

        <h3 class="conocenos-subheading">
          Nuestros objetivos
        </h3>
        <ol class="conocenos-objectives">
          <li v-for="(objective, index) in objectives" :key="objective">
            <span class="conocenos-objective-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <p>{{ objective }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 4. Valores · navy, tarjetas blancas -->
    <section id="valores" class="home-section conocenos-section conocenos-section--navy scroll-mt-24!" aria-labelledby="valores-title">
      <div class="home-container">
        <p class="section-label section-label--on-dark">
          // cultura y valores
        </p>
        <h2 id="valores-title" class="section-heading section-heading--on-dark">
          Nuestros valores
        </h2>
        <ul class="conocenos-values">
          <li v-for="value in values" :key="value.title" class="conocenos-value lift">
            <span class="conocenos-value-icon" aria-hidden="true">
              <svg viewBox="0 0 56 64">
                <polygon points="28,2 54,17 54,47 28,62 2,47 2,17" fill="#ffda4a" />
              </svg>
              <UIcon :name="value.icon" class="relative size-6" />
            </span>
            <h3>{{ value.title }}</h3>
            <p>{{ value.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 5. Actividades · azul claro, tarjetas navy -->
    <section id="actividades" class="home-section conocenos-section conocenos-section--sky scroll-mt-24!" aria-labelledby="actividades-title">
      <div class="home-container">
        <div class="section-head">
          <div>
            <p class="section-label">
              // actividades
            </p>
            <h2 id="actividades-title" class="section-heading">
              Lo que hacemos juntos
            </h2>
          </div>
          <p class="conocenos-section-intro">
            Desde nuestras primeras actividades hemos creado eventos propios y colaborado con otros grupos organizados de la División.
          </p>
        </div>
        <ul class="conocenos-activities">
          <li v-for="activity in activities" :key="activity.title" class="conocenos-activity lift">
            <!-- Foto pendiente: reemplazar por NuxtImg cuando esté en public/images/ -->
            <div class="conocenos-photo-placeholder conocenos-photo-placeholder--dark" aria-hidden="true">
              [foto · {{ activity.title }}]
            </div>
            <div class="conocenos-activity-body">
              <span class="conocenos-activity-tag">{{ activity.tag }}</span>
              <h3>{{ activity.title }}</h3>
              <p>{{ activity.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 6. Comunidad: mosaico de fotos de convivencia + enlace a la galería · blanco con panal -->
    <section id="comunidad" class="home-section conocenos-section conocenos-section--honeycomb scroll-mt-24!" aria-labelledby="comunidad-title">
      <HoneycombPattern class="conocenos-honeycomb" :scale="72 / 56" />
      <div class="home-container">
        <div class="section-head">
          <div>
            <p class="section-label">
              // nuestra comunidad
            </p>
            <h2 id="comunidad-title" class="section-heading">
              Comunidad BeeDevelopers
            </h2>
          </div>
          <UButton to="/galeria" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right" class="min-h-11 rounded-lg px-6 text-sm font-semibold text-(--bee-navy) ring-(--bee-navy)">
            Ver galería completa
          </UButton>
        </div>
        <!-- Fotos pendientes: reemplazar cada lugar por NuxtImg cuando estén en public/images/ -->
        <ul class="conocenos-mosaic" aria-hidden="true">
          <li v-for="photo in communityPhotos" :key="photo" class="conocenos-photo-placeholder">
            [foto · {{ photo }}]
          </li>
        </ul>
      </div>
    </section>

    <!-- 7. Preguntas frecuentes · blanco -->
    <section id="preguntas" class="home-section conocenos-section scroll-mt-24!" aria-labelledby="preguntas-title">
      <div class="home-container conocenos-faq">
        <div class="conocenos-faq-intro">
          <p class="section-label">
            // preguntas frecuentes
          </p>
          <h2 id="preguntas-title" class="section-heading">
            ¿Tienes dudas?
          </h2>
          <p class="conocenos-section-intro">
            Si no encuentras tu respuesta, escríbenos por nuestras redes sociales.
          </p>
        </div>
        <UAccordion
          :items="faqItems"
          class="conocenos-faq-list"
          :ui="{
            item: 'border-b border-(--bee-border)',
            trigger: 'min-h-16 py-4 gap-4 text-left',
            label: 'font-display text-lg md:text-xl font-semibold text-(--bee-navy)',
            trailingIcon: 'size-6 text-(--bee-navy)',
            body: 'pb-6 text-base md:text-[17px] leading-relaxed max-w-[40em]',
          }"
        />
      </div>
    </section>

    <!-- 8. Únete: reutiliza el estilo de la sección de registro del inicio · navy + panal -->
    <section id="unete" class="home-section registration-section conocenos-section scroll-mt-24!" aria-labelledby="unete-title">
      <HoneycombPattern class="registration-honeycomb" />
      <div class="home-container registration-layout conocenos-join">
        <div class="registration-intro">
          <p class="section-label section-label--on-dark">
            // únete
          </p>
          <h2 id="unete-title" class="section-heading section-heading--on-dark">
            Qué puedes hacer al unirte
          </h2>
          <ol class="join-steps">
            <li v-for="(option, index) in joinOptions" :key="option.title" class="join-step">
              <div class="join-step-marker" aria-hidden="true">
                <span class="join-step-number">{{ index + 1 }}</span>
              </div>
              <div class="join-step-body">
                <h3>{{ option.title }}</h3>
                <p>{{ option.text }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="registration-panel">
          <h3>¿Te interesa participar en un taller, sumarte a un proyecto u organizar un evento?</h3>
          <p class="registration-note">
            Completa el formulario de registro y súmate al grupo.
          </p>
          <UButton to="/#registro" class="bee-button conocenos-join-button" trailing-icon="i-lucide-arrow-right">
            Únete a BeeDevelopers
          </UButton>
          <div class="conocenos-join-contact">
            <p>Algunas actividades otorgan horas formativas. Para servicio social, escríbenos:</p>
            <ul>
              <li v-for="social in socialLinks" :key="social.name">
                <a :href="social.href" :aria-label="social.label" target="_blank" rel="noopener noreferrer">{{ social.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
