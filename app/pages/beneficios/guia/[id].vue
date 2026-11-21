<script setup lang="ts">
import { beneficios, estadosBeneficio, iconoBeneficio } from '~/utils/beneficios'
import { guiasBeneficiosUg } from '~/data/guiasBeneficiosUg'

const route = useRoute()
const beneficio = computed(() => beneficios.find(item => item.id === route.params.id && item.grupo === 'Servicios y beneficios oficiales UG'))
const guia = computed(() => beneficio.value ? guiasBeneficiosUg[beneficio.value.id] : undefined)

if (!beneficio.value || !guia.value) {
  throw createError({ statusCode: 404, statusMessage: 'Guía no encontrada' })
}

useSeoMeta({
  title: () => `Guía de ${beneficio.value?.nombre} | BeeDevelopers`,
  description: () => guia.value?.resumen,
})
</script>

<template>
  <main v-if="beneficio && guia" id="contenido" class="ug-guide-page">
    <header class="ug-guide-hero">
      <HoneycombPattern class="ug-guide-honeycomb" />
      <div class="home-container ug-guide-hero-inner">
        <nav aria-label="Ruta de navegación" class="ug-guide-breadcrumb">
          <NuxtLink to="/beneficios">Beneficios de tu correo</NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink :to="`/beneficios/${beneficio.id}`">{{ beneficio.nombre }}</NuxtLink>
          <span aria-hidden="true">/</span>
          <span>Guía</span>
        </nav>

        <p class="ug-guide-kicker">
          <span class="benefit-icon"><UIcon :name="iconoBeneficio(beneficio)" /></span>
          Guía de servicio UG
        </p>
        <h1>{{ beneficio.nombre }}<span>;</span></h1>
        <p class="ug-guide-lead">{{ guia.resumen }}</p>
        <div class="ug-guide-meta">
          <span>{{ estadosBeneficio[beneficio.estado] }}</span>
          <span>Revisión: {{ guia.fechaRevision }}</span>
        </div>
      </div>
    </header>

    <div class="home-container ug-guide-body">
      <div class="ug-guide-layout">
        <article class="ug-guide-main">
          <section class="ug-guide-section ug-guide-steps-section" aria-labelledby="guide-steps-title">
            <h2 id="guide-steps-title">Cómo acceder o utilizarlo</h2>
            <ol class="ug-guide-steps">
              <li v-for="(step, index) in guia.pasosDetallados || guia.pasos.map((descripcion, stepIndex) => ({ titulo: [ 'Revisa la información publicada', 'Comprueba los requisitos', 'Sigue el procedimiento indicado', 'Confirma el resultado' ][stepIndex] || `Paso ${stepIndex + 1}`, descripcion }))" :key="step.titulo + step.descripcion">
                <span class="ug-guide-step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <h3>{{ step.titulo }}</h3>
                  <p>{{ step.descripcion }}</p>
                  <a v-if="step.enlace" class="ug-guide-inline-link" :href="step.enlace.url" target="_blank" rel="noopener noreferrer">
                    {{ step.enlace.texto }}
                    <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
                  </a>
                </div>
              </li>
            </ol>
          </section>

        </article>

        <aside class="ug-guide-sidebar">
          <section class="ug-guide-info-card" aria-labelledby="guide-requirements-title">
            <h2 id="guide-requirements-title">Lo que necesitas</h2>
            <ul class="ug-guide-checklist">
              <li v-for="requirement in guia.requisitos" :key="requirement">
                <UIcon name="i-lucide-circle-check" aria-hidden="true" />
                <span>{{ requirement }}</span>
              </li>
            </ul>
          </section>

          <section class="ug-guide-info-card" aria-labelledby="guide-considerations-title">
            <h2 id="guide-considerations-title">Consideraciones</h2>
            <ul class="ug-guide-notes">
              <li v-for="consideration in guia.consideraciones" :key="consideration">{{ consideration }}</li>
            </ul>
          </section>

          <NuxtLink class="ug-guide-back" :to="`/beneficios/${beneficio.id}`">
            <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
            Volver a la ficha del beneficio
          </NuxtLink>
        </aside>
      </div>

      <section class="ug-guide-source-note" aria-labelledby="guide-source-title">
        <div>
          <h2 id="guide-source-title">Confirma la información vigente</h2>
          <p>La documentación y los enlaces de la UG pueden cambiar. Revisa la fuente institucional antes de seguir el procedimiento.</p>
        </div>
        <div class="ug-guide-source-actions">
          <UButton v-if="guia.acceso" :to="guia.acceso" target="_blank" rel="noopener noreferrer" class="bee-button" trailing-icon="i-lucide-log-in">
            Ir al acceso institucional
          </UButton>
          <UButton :to="guia.fuente" target="_blank" rel="noopener noreferrer" class="bee-button" trailing-icon="i-lucide-arrow-up-right">
            Ver fuente
          </UButton>
        </div>
      </section>

      <footer class="ug-guide-footer">
        <p>Esta guía resume información pública revisada. Cuando la fuente no publica un procedimiento completo, la guía conserva esa limitación y no presenta suposiciones como instrucciones oficiales.</p>
        <NuxtLink to="/beneficios">Explorar todos los beneficios <UIcon name="i-lucide-arrow-right" aria-hidden="true" /></NuxtLink>
      </footer>
    </div>
  </main>
</template>
