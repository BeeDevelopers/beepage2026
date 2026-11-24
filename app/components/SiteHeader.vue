<script setup lang="ts">
const open = ref(false)
const currentSiteRoute = useRoute()
const isConoceDicisHeader = computed(() => currentSiteRoute.path.startsWith('/conoce-dicis'))

const pendingPages = [
  { label: 'Conócenos más', to: '/conocenos' },
  { label: 'Beneficios de tu correo', to: '/beneficios' },
  { label: 'Conoce DICIS', to: '/conoce-dicis' },
  { label: 'Galería', to: '/galeria' },
]

const navigationUi = {
  root: 'header-navigation-menu',
  list: 'header-navigation-list',
  link: 'header-navigation-link',
  linkLabel: 'header-navigation-label',
}
</script>

<template>
  <UHeader
    v-model:open="open"
    title="BeeDevelopers"
    mode="drawer"
    class="site-header"
    :class="{ 'conoce-dicis-site-header': isConoceDicisHeader }"
    :ui="{
      root: 'site-header static top-auto z-50 bg-transparent border-0 h-auto backdrop-blur-0',
      container: 'header-inner',
      center: 'header-center',
      right: 'header-actions',
      toggle: 'header-toggle',
      content: 'header-mobile-content',
      overlay: 'header-mobile-overlay',
      body: 'header-mobile-body',
    }"
  >
    <template #left>
      <SiteLogo />
    </template>

    <template #default>
      <nav class="desktop-navigation" aria-label="Navegación principal">
        <UNavigationMenu :items="pendingPages" variant="link" :ui="navigationUi" />
      </nav>
    </template>

    <template #right>
      <UButton to="/#registro" class="bee-button bee-button--pill">
        Únete
      </UButton>
    </template>

    <template #toggle="{ open: menuOpen, toggle }">
      <UButton
        type="button"
        color="neutral"
        variant="ghost"
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="toggle"
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path :d="menuOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'" />
        </svg>
      </UButton>
    </template>

    <template #content>
      <nav id="mobile-navigation" class="mobile-navigation" aria-label="Navegación principal">
        <UNavigationMenu
          :items="pendingPages"
          orientation="vertical"
          variant="link"
          :ui="navigationUi"
        />
        <UButton to="/#registro" class="bee-button bee-button--pill" @click="open = false">
          Únete a nosotros
        </UButton>
      </nav>
    </template>
  </UHeader>
</template>
