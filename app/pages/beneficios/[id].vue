<script setup lang="ts">
import { beneficios, estadosBeneficio, tiposBeneficio, iconoBeneficio } from '~/utils/beneficios'
import { guiasBeneficiosUg } from '~/data/guiasBeneficiosUg'

const route = useRoute()
const beneficio = computed(() => beneficios.find(item => item.id === route.params.id))
if (!beneficio.value) throw createError({ statusCode: 404, statusMessage: 'Beneficio no encontrado' })
useSeoMeta({ title: () => `${beneficio.value?.nombre} | Beneficios BeeDevelopers`, description: () => beneficio.value?.resumen })
const related = computed(() => beneficios.filter(item => item.categoria === beneficio.value?.categoria && item.id !== beneficio.value?.id).slice(0, 3))
const sourceHost = computed(() => beneficio.value ? new URL(beneficio.value.urlFuente).hostname : '')
const guia = computed(() => beneficio.value ? guiasBeneficiosUg[beneficio.value.id] : undefined)
const esGuiaUg = computed(() => beneficio.value?.grupo === 'Servicios y beneficios oficiales UG')
const guiaAbierta = ref(false)
</script>

<template>
  <main v-if="beneficio" id="contenido" class="benefits-page benefits-detail">
    <header class="benefits-hero">
      <HoneycombPattern class="benefits-honeycomb" />
      <div class="home-container">
        <nav aria-label="Ruta de navegación" class="benefits-breadcrumb"><NuxtLink to="/beneficios">Beneficios de tu correo</NuxtLink><span aria-hidden="true">/</span><span>{{ beneficio.categoria }}</span></nav>
        <span class="benefit-icon"><UIcon :name="iconoBeneficio(beneficio)" /></span>
        <h1>{{ beneficio.nombre }}<span>;</span></h1>
        <p class="benefit-status"><UIcon name="i-lucide-info" />{{ estadosBeneficio[beneficio.estado] }}</p>
      </div>
    </header>
    <div class="benefits-body home-container">
      <div class="benefits-detail-layout">
        <article class="benefits-detail-content">
          <span class="benefit-type" :class="`benefit-type--${beneficio.tipo}`">{{ tiposBeneficio[beneficio.tipo] }}</span>
          <h2>¿Qué incluye?</h2><p>{{ beneficio.resumen }}</p>
          <h2>¿Quién puede usarlo y cómo acceder?</h2><p>{{ beneficio.requisitos }}</p>
          <h2>Condiciones que debes conocer</h2><p v-if="beneficio.nota">{{ beneficio.nota }}</p><p>{{ beneficio.contexto.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') }}</p>
          <h2>Vigencia y disponibilidad</h2>
          <p v-if="beneficio.vencimiento" class="benefit-expiry">Promoción temporal. Fecha límite anunciada: {{ beneficio.vencimiento.split('-').reverse().join('/') }}. Consulta las condiciones y posibles cargos posteriores en la fuente.</p>
          <p v-else-if="beneficio.estado === 'historico'">Anuncio histórico. No se ha confirmado su vigencia en 2026.</p>
          <p v-else>El documento no establece una fecha final de vigencia. Confirma disponibilidad, plazos, precios y renovación con el proveedor antes de activar.</p>
          <p class="benefits-detail-date">Revisión documental: 18 de noviembre de 2026. Las referencias de precio corresponden al documento de esa fecha; no son una cotización actual.</p>
        </article>
        <div class="benefits-detail-aside-wrap">
          <aside class="benefits-detail-aside">
            <h2>Comprueba tu acceso</h2><ol><li>Abre la fuente y revisa la oferta vigente.</li><li>Verifica los requisitos de tu campus, país o matrícula.</li><li>Completa la validación únicamente en el sitio oficial.</li></ol>
            <UButton :to="beneficio.urlFuente" target="_blank" rel="noopener noreferrer" class="bee-button" trailing-icon="i-lucide-arrow-up-right">Ver condiciones / fuente</UButton>
            <p class="benefits-source-host">{{ sourceHost }}</p>
            <p>La disponibilidad, licencia y condiciones dependen de la Universidad de Guanajuato y de la cuenta institucional.</p>
            <p v-if="beneficio.estado === 'github_pack'">GitHub Education debe aprobar tu cuenta. UG no se presenta como socio de los proveedores del pack.</p>
          </aside>
          <UButton
            v-if="guia && esGuiaUg"
            :to="`/beneficios/guia/${beneficio.id}`"
            class="bee-button benefit-guide-trigger"
            trailing-icon="i-lucide-arrow-right"
            :aria-label="`Abrir guía completa de ${beneficio.nombre}`"
          >
            Abrir guía completa
          </UButton>
          <UButton
            v-else-if="guia"
            class="bee-button benefit-guide-trigger"
            trailing-icon="i-lucide-book-open"
            :aria-label="`Abrir guía de ${beneficio.nombre}`"
            @click="guiaAbierta = true"
          >
            Ver guía de acceso
          </UButton>
        </div>
      </div>
      <aside class="benefits-notice"><UIcon name="i-lucide-info" /><p>Información documental basada en las fuentes disponibles de la Universidad de Guanajuato. Las condiciones pueden cambiar.</p></aside>
      <section v-if="related.length" class="benefits-related"><h2>Sigue explorando {{ beneficio.categoria }}</h2><div class="benefits-grid"><BeneficiosCard v-for="item in related" :key="item.id" :beneficio="item" /></div></section>
      <NuxtLink class="benefits-back" to="/beneficios">← Volver al catálogo</NuxtLink>
    </div>

    <UModal
      v-if="guia && !esGuiaUg"
      v-model:open="guiaAbierta"
      :title="`Guía de acceso: ${beneficio.nombre}`"
      :description="guia.resumen"
      :ui="{ content: 'benefit-guide-modal', body: 'benefit-guide-modal-body' }"
    >
      <template #body>
        <div class="benefit-guide-content">
          <p class="benefit-guide-status" :class="`benefit-guide-status--${guia.estado}`">
            {{ guia.estado === 'historica' ? 'Registro histórico' : guia.estado === 'limitada' ? 'Orientación limitada por la fuente' : 'Orientación basada en la fuente institucional' }}
          </p>

          <section aria-labelledby="guide-requirements-title">
            <h2 id="guide-requirements-title">Antes de comenzar</h2>
            <ul>
              <li v-for="requirement in guia.requisitos" :key="requirement">{{ requirement }}</li>
            </ul>
          </section>

          <section aria-labelledby="guide-steps-title">
            <h2 id="guide-steps-title">Cómo acceder o utilizarlo</h2>
            <ol>
              <li v-for="step in guia.pasos" :key="step">{{ step }}</li>
            </ol>
          </section>

          <section aria-labelledby="guide-considerations-title">
            <h2 id="guide-considerations-title">Consideraciones</h2>
            <ul>
              <li v-for="consideration in guia.consideraciones" :key="consideration">{{ consideration }}</li>
            </ul>
          </section>

          <footer class="benefit-guide-footer">
            <p>Fuente revisada: {{ guia.fechaRevision }}.</p>
            <UButton v-if="guia.acceso" :to="guia.acceso" target="_blank" rel="noopener noreferrer" class="bee-button" trailing-icon="i-lucide-external-link">
              Abrir plataforma
            </UButton>
            <UButton :to="guia.fuente" target="_blank" rel="noopener noreferrer" class="bee-button" trailing-icon="i-lucide-arrow-up-right">
              Abrir fuente oficial
            </UButton>
          </footer>
        </div>
      </template>
    </UModal>
  </main>
</template>
