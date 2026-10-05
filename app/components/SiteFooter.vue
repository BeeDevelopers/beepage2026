<script setup lang="ts">
const footerColumns = [
  {
    label: 'Qué hacemos',
    children: [
      { label: 'Desarrollo y aprendizaje', to: '/#actividades' },
      { label: 'Proyectos y actividades', to: '/#proyectos' },
    ],
  },
  {
    label: 'Comunidad',
    children: [
      { label: 'Sobre nosotros', to: '/#nosotros' },
      { label: 'Únete a nosotros', to: '/#registro' },
    ],
  },
]

const socialLinks = [
  {
    label: 'Facebook de BeeDevelopers',
    href: 'https://www.facebook.com/BeeDevelopersUG/',
    image: '/images/Logos/Redes Sociales/Logo_Facebook@4x.png',
  },
  {
    label: 'Instagram de BeeDevelopers',
    href: 'https://www.instagram.com/beedevelopers/',
    image: '/images/Logos/Redes Sociales/Logo_Instagram@4x.png',
  },
  {
    label: 'LinkedIn de BeeDevelopers',
    href: 'https://www.linkedin.com/company/beedevelopers',
    image: '/images/Logos/Redes Sociales/Logo_LinkedIn@4x.png',
  },
  {
    label: 'X (Twitter) de BeeDevelopers',
    href: 'https://x.com/BeeDevelopers',
    image: '/images/Logos/Redes Sociales/Logo_Twitter@4x.png',
  },
]
</script>

<template>
  <UFooter
    class="site-footer"
    :ui="{
      root: 'site-footer',
      container: 'footer-inner',
      center: 'footer-content',
      bottom: 'footer-bottom-shell',
    }"
  >
    <UFooterColumns
      :columns="footerColumns"
      :ui="{
        root: 'footer-grid',
        left: 'footer-brand',
        center: 'footer-links',
        right: 'footer-connect',
        label: 'footer-heading',
        list: 'footer-link-list',
        link: 'footer-link',
      }"
    >
      <template #left>
        <SiteLogo />
        <p>Comunidad estudiantil de innovación y desarrollo de software.</p>
      </template>

      <template #right>
        <h3 class="footer-heading">Conecta</h3>
        <a class="footer-link" href="https://github.com/BeeDevelopers" target="_blank" rel="noopener noreferrer">
          GitHub de BeeDevelopers
        </a>
        <p>DICIS · Universidad de Guanajuato</p>
      </template>
    </UFooterColumns>

    <template #bottom>
      <UContainer class="footer-bottom">
        <p class="footer-copyright">© {{ new Date().getFullYear() }} BeeDevelopers. Grupo estudiantil sin fines de lucro.</p>
        <nav class="social-links" aria-label="Redes sociales de BeeDevelopers">
          <NuxtLink
            v-for="social in socialLinks"
            :key="social.label"
            :to="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <NuxtImg :src="social.image" alt="" width="40" height="40" format="webp" loading="lazy" />
          </NuxtLink>
        </nav>
      </UContainer>
    </template>
  </UFooter>
</template>
