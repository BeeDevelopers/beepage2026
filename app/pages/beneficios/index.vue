<script setup lang="ts">
import { beneficios, categoriasBeneficio, estadosBeneficio, tiposBeneficio, normalizarBusqueda } from '~/utils/beneficios'

useSeoMeta({
  title: 'Beneficios de tu correo | BeeDevelopers',
  description: 'Explora servicios UG y ofertas estudiantiles con sus fuentes, requisitos y estados de verificación. Un catálogo de BeeDevelopers para estudiantes UG.',
})

const route = useRoute()
function queryFilter(key: string) {
  return computed({
    get: () => typeof route.query[key] === 'string' ? route.query[key] as string : '',
    set: (value: string) => { void navigateTo({ path: '/beneficios', query: { ...route.query, [key]: value || undefined } }, { replace: true }) },
  })
}
const search = queryFilter('q')
const category = queryFilter('categoria')
const status = queryFilter('estado')
const type = queryFilter('tipo')
const ugOnly = computed({ get: () => route.query.ug === '1', set: (value: boolean) => { void navigateTo({ path: '/beneficios', query: { ...route.query, ug: value ? '1' : undefined } }, { replace: true }) } })
const limit = ref(17)
watch(() => route.query, () => { limit.value = 17 })
const priority = ['Microsoft 365 Educación', 'Spotify Premium Estudiantes', 'YouTube Premium Estudiantes', 'GitHub Pro', 'Adobe Creative Cloud UG', 'Notion Education', 'Figma for Education', 'Microsoft Azure for Students', 'Autodesk Education', 'Apple Store Educación México', 'JetBrains Student Pack']
const sorted = [...beneficios].sort((a, b) => {
  const rank = (name: string) => { const index = priority.indexOf(name); return index < 0 ? priority.length : index }
  return rank(a.nombre) - rank(b.nombre)
})
const filtered = computed(() => {
  const terms = normalizarBusqueda(search.value.trim()).split(/\s+/).filter(Boolean)
  return sorted.filter(item => (!category.value || item.categoria === category.value)
    && (!status.value || item.estado === status.value)
    && (!type.value || item.tipo === type.value)
    && (!ugOnly.value || item.estado === 'ug_confirmado')
    && terms.every(term => normalizarBusqueda(`${item.nombre} ${item.resumen} ${item.requisitos} ${item.categoria} ${item.nota}`).includes(term)))
})
const hasFilters = computed(() => Boolean(search.value || category.value || status.value || type.value || ugOnly.value))
function clearFilters() { void navigateTo('/beneficios', { replace: true }) }
</script>

<template>
  <main id="contenido" class="benefits-page">
    <header class="benefits-hero">
      <HoneycombPattern class="benefits-honeycomb" />
      <div class="home-container">
        <p class="benefits-eyebrow"><UIcon name="i-lucide-hexagon" /> <span>BeeDevelopers</span><i aria-hidden="true" /> Beneficios estudiantiles</p>
        <h1>BENEFICIOS DE TU CORREO<span>;</span></h1>
        <p class="benefits-lead">Tu vida universitaria tiene ventajas.<br><strong>Descúbrelas con tu correo UG.</strong></p>
        <p class="benefits-intro">Servicios institucionales, herramientas y ofertas para estudiantes.<br>Consulta qué incluye cada beneficio y qué necesitas para acceder.</p>
        <div class="benefits-meta"><span><UIcon name="i-lucide-grid-2x2" /> {{ beneficios.length }} beneficios documentados</span><span><UIcon name="i-lucide-calendar-days" /> Revisión documental: 18 nov 2026</span></div>
      </div>
    </header>

    <div class="benefits-body home-container">
      <section class="benefits-filters" aria-label="Buscar y filtrar beneficios">
        <div class="benefits-categories" aria-label="Categorías">
          <button type="button" :aria-pressed="!category" @click="category = ''">Todos</button>
          <button v-for="item in categoriasBeneficio" :key="item" type="button" :aria-pressed="category === item" @click="category = item">{{ item }}</button>
        </div>
        <div class="benefits-filter-fields">
          <label class="benefits-search"><span>Busca tu próximo beneficio</span><span class="benefits-search-input"><UIcon name="i-lucide-search" /><input v-model="search" type="search" placeholder="Nombre, herramienta o requisito…"></span></label>
          <label><span>Tipo de beneficio</span><select v-model="type"><option value="">Todos los tipos</option><option v-for="(label, key) in tiposBeneficio" :key="key" :value="key">{{ label }}</option></select></label>
          <label><span>Estado de verificación</span><select v-model="status"><option value="">Todos los estados</option><option v-for="(label, key) in estadosBeneficio" :key="key" :value="key">{{ label }}</option></select></label>
        </div>
        <div class="benefits-filter-bottom"><label class="benefits-checkbox"><input v-model="ugOnly" type="checkbox"> Solo publicados por la UG</label><button v-if="hasFilters" class="benefits-clear" type="button" @click="clearFilters">Limpiar filtros <UIcon name="i-lucide-x" /></button></div>
      </section>

      <aside class="benefits-notice"><UIcon name="i-lucide-shield-question" /><p><strong>Infórmate antes de activar.</strong> Publicado no significa canje verificado. No se ha comprobado ninguna oferta externa con una cuenta @ugto.mx. La aceptación, las licencias y la disponibilidad dependen de cada proveedor.</p></aside>

      <div class="benefits-results"><p role="status" aria-live="polite">{{ filtered.length }} {{ filtered.length === 1 ? 'beneficio encontrado' : 'beneficios encontrados' }}<span v-if="category"> · {{ category }}</span></p><span>Explora. Comprueba. Aprovecha.</span></div>
      <section v-if="filtered.length" class="benefits-grid" aria-label="Catálogo de beneficios">
        <BeneficiosCard v-for="item in filtered.slice(0, limit)" :key="item.id" :beneficio="item" />
      </section>
      <div v-else class="benefits-empty"><UIcon name="i-lucide-search-x" /><h2>No encontramos coincidencias</h2><p>Prueba otro nombre o cambia los filtros para seguir explorando.</p><UButton class="bee-button" @click="clearFilters">Ver todos los beneficios</UButton></div>
      <div v-if="filtered.length > limit" class="benefits-load"><p>Mostrando {{ Math.min(limit, filtered.length) }} de {{ filtered.length }}</p><UButton class="bee-ghost-button" trailing-icon="i-lucide-plus" @click="limit += 16">Cargar más beneficios</UButton></div>
      <details class="benefits-guide"><summary>¿Qué significa cada estado de verificación?</summary><dl><template v-for="(label, key) in estadosBeneficio" :key="key"><dt>{{ label }}</dt><dd>{{ { ug_confirmado: 'La universidad publica el servicio. Puede depender de tu campus, licencia o solicitud.', oficial_estudiantes: 'El proveedor anuncia un plan estudiantil; la aceptación de UG no está validada.', proveedor_mx: 'Oferta publicada para México; revisa los requisitos individuales.', github_pack: 'Oferta de un socio del pack. Requiere aprobación de GitHub Education y condiciones del socio.', marketplace_por_validar: 'Registro en Student Beans México, sin comprobación de canje ni disponibilidad regional.', credencial_estudiante: 'Requiere credencial vigente y las reglas de cada recinto o ruta.', historico: 'Anuncio de otro periodo; su vigencia actual no está confirmada.' }[key] }}</dd></template></dl></details>
      <p class="benefits-disclaimer">Catálogo informativo de BeeDevelopers, sin afiliación comercial con las marcas. Consulta siempre la fuente y sus condiciones vigentes. Nunca compartas contraseñas ni documentos con BeeDevelopers para activar estas ofertas.</p>
    </div>
  </main>
</template>
