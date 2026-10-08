<script setup lang="ts">
const open = ref(false)
const currentSiteRoute = useRoute()
const isConoceDicisHeader = computed(() => currentSiteRoute.path.startsWith('/conoce-dicis'))

const pendingPages = [
  { label: 'Conócenos más', disabled: true },
  { label: 'Beneficios de tu correo', disabled: true },
  { label: 'Conoce DICIS', to: '/conoce-dicis' },
  { label: 'Galería', disabled: true },
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
        Únete a nosotros
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
        <span aria-hidden="true">{{ menuOpen ? '✕' : '☰' }}</span>
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
