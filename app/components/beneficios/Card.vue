<script setup lang="ts">
import { estadosBeneficio, tiposBeneficio, iconoBeneficio, resumenTarjeta, type Beneficio } from '~/utils/beneficios'

defineProps<{ beneficio: Beneficio }>()
</script>

<template>
  <article class="benefit-card" :class="{ 'benefit-card--featured': beneficio.destacado }">
    <span v-if="beneficio.destacado" class="benefit-featured-label"><UIcon name="i-lucide-star" /> Destacado UG</span>
    <div class="benefit-card-heading">
      <span class="benefit-icon" :class="`benefit-icon--${beneficio.tipo}`"><UIcon :name="iconoBeneficio(beneficio)" /></span>
      <div>
        <h2>{{ beneficio.nombre }}</h2>
        <span class="benefit-type" :class="`benefit-type--${beneficio.tipo}`">{{ tiposBeneficio[beneficio.tipo] }}</span>
      </div>
    </div>
    <p class="benefit-summary">{{ resumenTarjeta(beneficio) }}</p>
    <p class="benefit-status"><UIcon :name="beneficio.estado === 'ug_confirmado' ? 'i-lucide-landmark' : 'i-lucide-info'" />{{ estadosBeneficio[beneficio.estado] }}</p>
    <p v-if="beneficio.vencimiento" class="benefit-expiry">Oferta temporal · hasta {{ beneficio.vencimiento.split('-').reverse().join('/') }}</p>
    <div class="benefit-card-actions">
      <UButton :to="`/beneficios/${beneficio.id}`" :aria-label="`Ver detalle de ${beneficio.nombre}`" :class="beneficio.destacado ? 'bee-button' : 'bee-ghost-button'" trailing-icon="i-lucide-arrow-right">Ver detalle</UButton>
      <a :href="beneficio.urlFuente" target="_blank" rel="noopener noreferrer" :aria-label="`Fuente de ${beneficio.nombre} (abre otra pestaña)`">Fuente <UIcon name="i-lucide-arrow-up-right" /></a>
    </div>
    <div v-if="beneficio.destacado" class="benefit-feature-art" aria-hidden="true">
      <span>W</span><span>X</span><span>P</span><span>T</span>
    </div>
  </article>
</template>
