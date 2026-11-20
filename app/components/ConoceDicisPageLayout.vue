<script setup lang="ts">
// Navegación y encabezado compartidos solo por las páginas Conoce DICIS.
type ConoceDicisSectionKey = 'calendario' | 'grupos' | 'accesos'

const conoceDicisLayoutProps = defineProps<{
  active?: ConoceDicisSectionKey
}>()

const conoceDicisNavigation = [
  { key: 'calendario', label: 'Calendario anual', to: '/conoce-dicis/calendario' },
  { key: 'grupos', label: 'Grupos organizados', to: '/conoce-dicis/grupos-organizados' },
  { key: 'accesos', label: 'Accesos rápidos y trámites', to: '/conoce-dicis/accesos-rapidos' },
] satisfies Array<{ key: ConoceDicisSectionKey, label: string, to: string }>
</script>

<template>
  <div class="conoce-dicis-page">
    <section class="conoce-dicis-hero" aria-labelledby="conoce-dicis-page-title">
      <svg class="conoce-dicis-hero__honeycomb" aria-hidden="true">
        <defs>
          <pattern id="conoce-dicis-hero-honeycomb" width="56" height="100" patternUnits="userSpaceOnUse">
            <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#ffda4a" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#conoce-dicis-hero-honeycomb)" />
      </svg>
      <div class="conoce-dicis-hero__inner">
        <p class="conoce-dicis-eyebrow">Universidad de Guanajuato · DICIS Irapuato-Salamanca</p>
        <h1 id="conoce-dicis-page-title">CONOCE DICIS<span>;</span></h1>
        <p class="conoce-dicis-hero__statement">
          Consulta tu año académico.<br>
          <span>Organiza tu semestre.</span>
        </p>
        <p class="conoce-dicis-hero__description">
          Calendario, grupos organizados, accesos institucionales y trámites para la comunidad estudiantil de DICIS Irapuato-Salamanca.
        </p>
      </div>
    </section>

    <div class="conoce-dicis-navigation-wrap">
      <nav class="conoce-dicis-navigation" aria-label="Secciones de Conoce DICIS">
        <NuxtLink
          v-for="conoceDicisNavigationItem in conoceDicisNavigation"
          :key="conoceDicisNavigationItem.key"
          class="conoce-dicis-navigation__link"
          :class="{ 'conoce-dicis-navigation__link--active': conoceDicisLayoutProps.active === conoceDicisNavigationItem.key }"
          :to="conoceDicisNavigationItem.to"
          :aria-current="conoceDicisLayoutProps.active === conoceDicisNavigationItem.key ? 'page' : undefined"
        >
          <span>{{ conoceDicisNavigationItem.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <main id="contenido" class="conoce-dicis-main" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.conoce-dicis-page {
  color: #52606a;
  background: #fff;
}

.conoce-dicis-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: #fff;
  background: var(--bee-navy);
}

.conoce-dicis-hero__honeycomb {
  position: absolute;
  inset-block: 0;
  right: 0;
  z-index: -1;
  width: 55%;
  height: 100%;
  opacity: .15;
  pointer-events: none;
  mask-image: linear-gradient(to right, transparent, black);
}

.conoce-dicis-hero__inner {
  width: min(1680px, 100%);
  margin-inline: auto;
  padding: clamp(42px, 6vw, 78px) 28px clamp(40px, 5vw, 64px);
}

.conoce-dicis-eyebrow {
  margin: 0;
  color: #b5d5e5;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .09em;
  line-height: 1.5;
  text-transform: uppercase;
}

.conoce-dicis-hero h1 {
  margin: 14px 0 0;
  color: #fff;
  font-size: clamp(38px, 7vw, 72px);
  font-weight: 850;
  letter-spacing: -.055em;
  line-height: .98;
}

.conoce-dicis-hero h1 span {
  color: #ffda4a;
}

.conoce-dicis-hero__statement {
  margin: 18px 0 0;
  color: #fff;
  font-size: clamp(27px, 4.5vw, 52px);
  font-weight: 650;
  letter-spacing: -.035em;
  line-height: 1.12;
}

.conoce-dicis-hero__statement span {
  color: #ffda4a;
}

.conoce-dicis-hero__description {
  max-width: 860px;
  margin: 22px 0 0;
  color: #e2edf5;
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
}

.conoce-dicis-navigation-wrap {
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid #dce7ee;
  background: rgb(255 255 255 / 97%);
  backdrop-filter: blur(10px);
}

.conoce-dicis-navigation {
  display: flex;
  width: min(1680px, 100%);
  justify-content: center;
  gap: 12px;
  margin-inline: auto;
  padding: 12px 28px;
}

.conoce-dicis-navigation__link {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  border: 1px solid #cfd8df;
  border-radius: 8px;
  color: var(--bee-navy);
  font-size: 15px;
  font-weight: 650;
  line-height: 1.35;
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.conoce-dicis-navigation__link:hover,
.conoce-dicis-navigation__link:focus-visible {
  border-color: #cfd8df;
  background: #f7f8fa;
  color: var(--bee-navy);
}

.conoce-dicis-navigation__link--active {
  border-color: var(--bee-navy);
  background: var(--bee-navy);
  color: #fff;
}

.conoce-dicis-navigation__link--active:hover,
.conoce-dicis-navigation__link--active:focus-visible {
  border-color: var(--bee-header);
  background: var(--bee-header);
  color: #fff;
}

.conoce-dicis-main {
  width: min(1680px, 100%);
  min-width: 0;
  margin-inline: auto;
  padding: clamp(22px, 2vw, 32px) 28px 80px;
}

.conoce-dicis-page :focus-visible {
  outline: 3px solid #147ca8;
  outline-offset: 4px;
}

@media (max-width: 600px) {
  .conoce-dicis-hero__honeycomb {
    width: 78%;
  }

  .conoce-dicis-hero__inner {
    padding-inline: 20px;
  }

  .conoce-dicis-eyebrow {
    font-size: 11px;
  }

  .conoce-dicis-navigation {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px;
    padding: 9px 12px;
  }

  .conoce-dicis-navigation__link {
    min-width: 0;
    min-height: 42px;
    justify-content: center;
    gap: 7px;
    padding: 8px 9px;
    font-size: 12px;
  }

  .conoce-dicis-navigation__link:last-child {
    grid-column: 1 / -1;
    justify-self: center;
    width: fit-content;
    max-width: 100%;
  }

  .conoce-dicis-main {
    padding: 20px 16px 64px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .conoce-dicis-navigation__link {
    transition: none;
  }
}
</style>
