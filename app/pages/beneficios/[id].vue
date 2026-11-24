<script setup lang="ts">
import { beneficios, estadosBeneficio, tiposBeneficio, iconoBeneficio } from '~/utils/beneficios'

const route = useRoute()
const beneficio = computed(() => beneficios.find(item => item.id === route.params.id))
if (!beneficio.value) throw createError({ statusCode: 404, statusMessage: 'Beneficio no encontrado' })
useSeoMeta({ title: () => `${beneficio.value?.nombre} | Beneficios BeeDevelopers`, description: () => beneficio.value?.resumen })
const related = computed(() => beneficios.filter(item => item.categoria === beneficio.value?.categoria && item.id !== beneficio.value?.id).slice(0, 3))
const sourceHost = computed(() => beneficio.value ? new URL(beneficio.value.urlFuente).hostname : '')
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
        <aside class="benefits-detail-aside">
          <h2>Comprueba tu acceso</h2><ol><li>Abre la fuente y revisa la oferta vigente.</li><li>Verifica los requisitos de tu campus, país o matrícula.</li><li>Completa la validación únicamente en el sitio oficial.</li></ol>
          <UButton :to="beneficio.urlFuente" target="_blank" rel="noopener noreferrer" class="bee-button" trailing-icon="i-lucide-arrow-up-right">Ver condiciones / fuente</UButton>
          <p class="benefits-source-host">{{ sourceHost }}</p>
          <p>La inclusión en este catálogo no garantiza la aceptación de @ugto.mx. BeeDevelopers no solicita pagos, contraseñas, códigos ni documentos para activar beneficios.</p>
          <p v-if="beneficio.estado === 'github_pack'">GitHub Education debe aprobar tu cuenta. UG no se presenta como socio de los proveedores del pack.</p>
        </aside>
      </div>
      <aside class="benefits-notice"><UIcon name="i-lucide-info" /><p>Información del documento de investigación; no se realizó un canje real con una cuenta UG. BeeDevelopers no está afiliado comercialmente a estas marcas.</p></aside>
      <section v-if="related.length" class="benefits-related"><h2>Sigue explorando {{ beneficio.categoria }}</h2><div class="benefits-grid"><BeneficiosCard v-for="item in related" :key="item.id" :beneficio="item" /></div></section>
      <NuxtLink class="benefits-back" to="/beneficios">← Volver al catálogo</NuxtLink>
    </div>
  </main>
</template>
