<script setup lang="ts">
// Marco de navegación exclusivo de las páginas Conoce DICIS.
type ConoceDicisSectionKey = 'calendario' | 'eventos'

const conoceDicisLayoutProps = defineProps<{
  active?: ConoceDicisSectionKey
}>()

const conoceDicisNavigation = [
  { key: 'calendario', number: '01', label: 'Calendario semestral', to: '/conoce-dicis/calendario' },
  { key: 'eventos', number: '02', label: 'Próximos eventos', to: '/conoce-dicis/eventos' },
] satisfies Array<{ key: ConoceDicisSectionKey, number: string, label: string, to: string }>
</script>

<template>
  <div class="conoce-dicis-page">
    <section class="conoce-dicis-hero" aria-labelledby="conoce-dicis-page-title">
      <div class="conoce-dicis-hero__inner">
        <p class="conoce-dicis-eyebrow">Universidad de Guanajuato · Campus Irapuato-Salamanca</p>
        <h1 id="conoce-dicis-page-title">Conoce DICIS</h1>
        <p class="conoce-dicis-hero__description">
          Calendario académico y próximos eventos oficiales.
        </p>
      </div>
    </section>

    <div class="conoce-dicis-layout">
      <aside class="conoce-dicis-sidebar" aria-label="Secciones de Conoce DICIS">
        <p class="conoce-dicis-sidebar__title">Explora DICIS</p>
        <nav class="conoce-dicis-sidebar__nav">
          <NuxtLink
            v-for="conoceDicisNavigationItem in conoceDicisNavigation"
            :key="conoceDicisNavigationItem.key"
            class="conoce-dicis-sidebar__link"
            :class="{ 'conoce-dicis-sidebar__link--active': conoceDicisLayoutProps.active === conoceDicisNavigationItem.key }"
            :to="conoceDicisNavigationItem.to"
            :aria-current="conoceDicisLayoutProps.active === conoceDicisNavigationItem.key ? 'page' : undefined"
          >
            <span class="conoce-dicis-sidebar__number">{{ conoceDicisNavigationItem.number }}</span>
            <span>{{ conoceDicisNavigationItem.label }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <main id="contenido" class="conoce-dicis-main" tabindex="-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.conoce-dicis-page {
  color: #52606a;
  background: #fff;
}

.conoce-dicis-hero {
  color: #fff;
  background: linear-gradient(125deg, #052a45 0%, #073354 58%, #0b4d76 100%);
}

.conoce-dicis-hero__inner {
  width: min(1200px, 100%);
  margin-inline: auto;
  padding: clamp(48px, 7vw, 88px) 24px;
}

.conoce-dicis-eyebrow {
  margin: 0;
  color: #8ec5e1;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .12em;
  line-height: 1.5;
  text-transform: uppercase;
}

.conoce-dicis-hero h1 {
  margin: 12px 0 0;
  color: #fff;
  font-size: clamp(38px, 5vw, 60px);
  font-weight: 800;
  letter-spacing: -.04em;
  line-height: 1.05;
}

.conoce-dicis-hero__description {
  max-width: 650px;
  margin: 20px 0 0;
  color: #e2edf5;
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.65;
}

.conoce-dicis-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: clamp(24px, 3vw, 52px);
  width: min(1680px, 100%);
  margin-left: max(0px, calc((100vw - 1680px) / 2));
  margin-right: auto;
  padding: 56px 24px 96px;
  align-items: start;
}

.conoce-dicis-sidebar {
  position: sticky;
  top: 24px;
  padding: 10px 0;
}

.conoce-dicis-sidebar__title {
  margin: 0 0 16px;
  color: #073354;
  font-size: 13px;
  font-weight: 700;
}

.conoce-dicis-sidebar__nav {
  display: grid;
  gap: 6px;
  border-left: 2px solid #e2eaf0;
}

.conoce-dicis-sidebar__link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  margin-left: -2px;
  padding: 10px 12px;
  border-left: 2px solid transparent;
  color: #52606a;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.conoce-dicis-sidebar__link:hover,
.conoce-dicis-sidebar__link:focus-visible,
.conoce-dicis-sidebar__link--active {
  border-left-color: #147ca8;
  background: #f0f7fb;
  color: #073354;
}

.conoce-dicis-sidebar__number {
  color: #3982a8;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.conoce-dicis-main {
  min-width: 0;
}

.conoce-dicis-page :focus-visible {
  outline: 3px solid #147ca8;
  outline-offset: 4px;
}

@media (max-width: 900px) {
  .conoce-dicis-layout {
    grid-template-columns: 210px minmax(0, 1fr);
    gap: 24px;
  }
}

@media (max-width: 900px) {
  .conoce-dicis-layout {
    display: block;
    padding: 22px 20px 64px;
  }

  .conoce-dicis-sidebar {
    position: sticky;
    z-index: 5;
    top: 0;
    margin: 0 -20px 34px;
    padding: 12px 20px;
    border-bottom: 1px solid #dfe8ee;
    background: rgb(255 255 255 / 96%);
    backdrop-filter: blur(10px);
  }

  .conoce-dicis-sidebar__title {
    display: none;
  }

  .conoce-dicis-sidebar__nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    border: 0;
  }

  .conoce-dicis-sidebar__link {
    min-width: 0;
    min-height: 42px;
    margin: 0;
    padding: 8px 11px;
    border: 1px solid #dce7ee;
    border-radius: 999px;
    background: #fff;
    font-size: 12px;
  }

  .conoce-dicis-sidebar__link:hover,
  .conoce-dicis-sidebar__link:focus-visible,
  .conoce-dicis-sidebar__link--active {
    border-color: #7fb3cf;
  }
}

@media (prefers-reduced-motion: reduce) {
  .conoce-dicis-sidebar__link {
    transition: none;
  }
}
</style>
