<script setup lang="ts">
const open = ref(false)
const toggle = useTemplateRef('toggle')
const route = useRoute()

// Add teammates' confirmed routes when those pages become available.
const pendingPages = ['Conócenos más', 'Beneficios de tu correo', 'Conoce DICIS', 'Galería']

function closeMenu(restoreFocus = false) {
  if (!open.value) return
  open.value = false
  if (restoreFocus) toggle.value?.focus()
}

watch(() => route.fullPath, () => closeMenu())

// Do not reopen an old mobile menu after a desktop/tablet resize.
let desktopQuery: MediaQueryList | undefined
function handleViewportChange(event: MediaQueryListEvent) {
  if (event.matches) closeMenu()
}
onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 851px)')
  desktopQuery.addEventListener('change', handleViewportChange)
})
onBeforeUnmount(() => desktopQuery?.removeEventListener('change', handleViewportChange))
</script>

<template>
  <header class="site-header" @keydown.esc="closeMenu(true)">
    <div class="header-inner">
      <SiteLogo />
      <button
        ref="toggle" class="menu-toggle" type="button"
        :aria-expanded="open" aria-controls="site-navigation"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'" @click="open = !open"
      >
        <span aria-hidden="true">{{ open ? '✕' : '☰' }}</span>
        <span>Menú</span>
      </button>
      <nav id="site-navigation" class="site-navigation" :class="{ 'is-open': open }" aria-label="Navegación principal">
        <ul>
          <li v-for="label in pendingPages" :key="label">
            <span class="pending-link" role="link" aria-disabled="true" :aria-label="label + ', próximamente'" title="Próximamente">{{ label }}</span>
          </li>
        </ul>
        <SiteButton to="/#registro" pill @click="closeMenu(true)">Únete a nosotros</SiteButton>
      </nav>
    </div>
  </header>
</template>
