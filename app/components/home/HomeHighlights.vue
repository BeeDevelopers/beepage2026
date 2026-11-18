<script setup lang="ts">
type HighlightTag = 'Hackatón' | 'Ponencia' | 'Competencia'

interface Highlight {
  src: string
  alt: string
  tag: HighlightTag
  title: string
  size: 'feature' | 'wide' | 'small'
  text?: string
}

const highlights: Highlight[] = [
  {
    src: '/images/Proyectos/Hackaton4.jpeg',
    alt: 'Camiseta del NASA Space Apps Colón',
    tag: 'Hackatón',
    title: 'NASA Space Apps',
    size: 'feature',
    text: 'Competencia de programación en colaboración con la NASA y la Universidad Aeronáutica de Querétaro (UNAQ).',
  },
  {
    src: '/images/Proyectos/polilinker.JPG',
    alt: 'Integrantes de BeeDevelopers reunidos con Polilinker al cierre de la DevWeek',
    tag: 'Ponencia',
    title: 'DevWeek',
    size: 'wide',
  },
  {
    src: '/images/Proyectos/BeeCode.jpeg',
    alt: 'Estudiantes trabajando en equipo durante Hack Day DICIS',
    tag: 'Competencia',
    title: 'Hack Day DICIS',
    size: 'small',
  },
  {
    src: '/images/Proyectos/polilinker2.JPG',
    alt: 'Invitada especial de la DevWeek presentando ante los asistentes',
    tag: 'Ponencia',
    title: 'Polilinker',
    size: 'small',
  },
  {
    src: '/images/Proyectos/Hackaton2.jpeg',
    alt: 'Integrantes de BeeDevelopers desarrollando su proyecto para el hackatón',
    tag: 'Hackatón',
    title: 'Hackatón · Participación',
    size: 'small',
  },
  {
    src: '/images/Proyectos/Hackaton3.jpeg',
    alt: 'Integrantes colaborando frente a sus computadoras durante un hackatón',
    tag: 'Hackatón',
    title: 'Hackatón · Colaboración',
    size: 'wide',
  },
]

const filters: Array<{ label: string, tag: HighlightTag | null }> = [
  { label: 'Todos', tag: null },
  { label: 'Hackatón', tag: 'Hackatón' },
  { label: 'Ponencia', tag: 'Ponencia' },
  { label: 'Competencia', tag: 'Competencia' },
]

const selectedTag = ref<HighlightTag | null>(null)

const visibleHighlights = computed(() =>
  highlights.filter(highlight => selectedTag.value === null || highlight.tag === selectedTag.value),
)
</script>

<template>
  <section id="proyectos" class="home-section home-highlights" aria-labelledby="highlights-title">
    <div class="home-container">
      <div class="section-head">
        <div>
          <p class="section-label">
            // lo que hemos hecho
          </p>
          <h2 id="highlights-title" class="section-heading">
            Proyectos e iniciativas
          </h2>
        </div>
        <div class="filter-group" role="group" aria-label="Filtrar por tipo">
          <button
            v-for="filter in filters"
            :key="filter.label"
            type="button"
            class="filter-button"
            :aria-pressed="selectedTag === filter.tag"
            @click="selectedTag = filter.tag"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="bento">
        <article
          v-for="highlight in visibleHighlights"
          :key="highlight.src"
          class="bento-cell"
          :class="`bento-cell--${highlight.size}`"
        >
          <NuxtImg
            :src="highlight.src"
            :alt="highlight.alt"
            width="960"
            height="720"
            sizes="100vw sm:50vw lg:600px"
            format="webp"
            loading="lazy"
          />
          <div class="bento-caption">
            <span class="bee-tag">{{ highlight.tag }}</span>
            <h3>{{ highlight.title }}</h3>
            <p v-if="highlight.text">
              {{ highlight.text }}
            </p>
          </div>
        </article>

        <NuxtLink to="/galeria" class="bento-gallery-link lift">
          <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
          <span>
            Ver galería completa
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
