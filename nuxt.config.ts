// https://nuxt.com/docs/4.x/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
  ],
  css: ['~/assets/css/main.css'],
  colorMode: { preference: 'light', fallback: 'light' },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      link: [{ rel: 'icon', type: 'image/png', href: '/images/Logos/Fondo Claro/BeeDevs_Logotipo_Favicon_280319.png' }],
    },
  },
  site: {
    name: 'beepage2026',
    // NUXT_SITE_URL supplies the canonical URL through Nuxt Site Config.
  },
  image: {
    provider: 'ipx',
  },
})
