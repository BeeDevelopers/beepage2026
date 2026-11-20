<script setup lang="ts">
useSeoMeta({
  title: 'Grupos organizados DICIS | Conoce DICIS',
  description: 'Conoce las actividades y áreas de interés de los grupos organizados de la DICIS, sede Irapuato-Salamanca.',
})

const conoceDicisOrganizedGroups = [
  {
    group: 'BeeDevelopers',
    description: 'Organiza actividades y encuentros tecnológicos, y promueve la participación estudiantil en hackatones.',
    source: 'https://www.instagram.com/beedevelopers/',
    actionLabel: 'Visitar Instagram de BeeDevelopers',
    logo: '/images/Logos/Grupos Organizados/beedevelopers.png',
  },
  {
    group: 'AUGE',
    description: 'Complementa la formación en Gestión Empresarial con jornadas académicas y vinculación con el sector productivo.',
    source: 'https://www.instagram.com/auge_dicis/',
    actionLabel: 'Visitar Instagram de AUGE DICIS',
    logo: '/images/Logos/Grupos Organizados/auge.jpg',
  },
  {
    group: 'CMT.UG',
    description: 'Difunde avances sobre aprovechamiento de residuos, producción de combustibles alternativos y mejora de motores térmicos.',
    source: 'https://www.instagram.com/cmt.ug/',
    actionLabel: 'Visitar Instagram de CMT.UG',
    logo: '/images/Logos/Grupos Organizados/cmt-ug.jpg',
  },
  {
    group: 'ASME–SOMIM',
    description: 'Promueve las vocaciones en ingeniería y la formación académica mediante Women in Engineering, semanas de ingeniería, conferencias y talleres.',
    source: 'https://www.instagram.com/asmesomim_ug/',
    actionLabel: 'Visitar Instagram de ASME–SOMIM',
    logo: '/images/Logos/Grupos Organizados/asme-somim.jpg',
  },
  {
    group: 'ACM Capítulo Guanajuato',
    description: 'Prepara a estudiantes para competencias y actividades de informática, programación, desarrollo web, ciberseguridad e inteligencia artificial.',
    source: 'https://www.facebook.com/ACM.DICIS',
    actionLabel: 'Visitar Facebook de ACM DICIS',
    logo: '/images/Logos/Grupos Organizados/acm.jpg',
  },
  {
    group: 'OEDI',
    description: 'Fomenta la creatividad, el liderazgo, el trabajo en equipo y el emprendimiento mediante proyectos empresariales y creativos.',
    source: 'https://www.instagram.com/oedi.dicis/',
    actionLabel: 'Visitar Instagram de OEDI',
    logo: '/images/Logos/Grupos Organizados/oedi.jpg',
  },
  {
    group: 'AERO–UG',
    description: 'Acerca la ingeniería aeroespacial a la comunidad universitaria con actividades de divulgación, eventos académicos y proyectos experimentales de cohetería.',
    source: 'https://www.instagram.com/aero.ug/',
    actionLabel: 'Visitar Instagram de AERO–UG',
    logo: '/images/Logos/Grupos Organizados/aero-ug.jpg',
  },
]
</script>

<template>
  <ConoceDicisPageLayout active="grupos">
    <section aria-labelledby="conoce-dicis-groups-title">
      <div class="conoce-dicis-groups-heading">
        <p class="conoce-dicis-groups-eyebrow">DICIS · Sede Irapuato-Salamanca</p>
        <h2 id="conoce-dicis-groups-title">Grupos organizados</h2>
      </div>

      <ul class="conoce-dicis-groups-news-list">
        <li v-for="conoceDicisOrganizedGroup in conoceDicisOrganizedGroups" :key="conoceDicisOrganizedGroup.group">
          <a
            class="conoce-dicis-groups-news-link"
            :href="conoceDicisOrganizedGroup.source"
            :aria-label="conoceDicisOrganizedGroup.actionLabel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article class="conoce-dicis-groups-news">
              <NuxtImg
                :src="conoceDicisOrganizedGroup.logo"
                :alt="`Logotipo de ${conoceDicisOrganizedGroup.group}`"
                class="conoce-dicis-groups-news__logo"
                width="160"
                height="160"
                sizes="160px"
                format="webp"
                loading="lazy"
              />
              <p>{{ conoceDicisOrganizedGroup.group }}</p>
              <h3>{{ conoceDicisOrganizedGroup.description }}</h3>
              <span class="conoce-dicis-groups-news__action">
                {{ conoceDicisOrganizedGroup.actionLabel }} <span aria-hidden="true">↗</span>
              </span>
            </article>
          </a>
        </li>
      </ul>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-groups-heading {
  max-width: 760px;
  margin: 0 0 20px;
}

.conoce-dicis-groups-eyebrow {
  margin: 0 0 6px;
  color: #176b9a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.conoce-dicis-groups-heading h2 {
  margin: 0;
  color: #073354;
  font-size: clamp(30px, 3.2vw, 42px);
  letter-spacing: -.025em;
  line-height: 1.2;
}

.conoce-dicis-groups-news-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-groups-news-list > li:last-child {
  grid-column: 1 / -1;
  justify-self: center;
  width: calc((100% - 16px) / 2);
}

.conoce-dicis-groups-news-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.conoce-dicis-groups-news {
  display: flex;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  padding: 18px 22px 21px;
  border: 1px solid #d4e5ee;
  border-radius: 13px;
  background: #f0f7fb;
  box-shadow: 0 6px 18px rgb(7 51 84 / 4%);
  transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}

.conoce-dicis-groups-news-link:hover .conoce-dicis-groups-news,
.conoce-dicis-groups-news-link:focus-visible .conoce-dicis-groups-news {
  transform: translateY(-3px);
  border-color: #b5d5e5;
  background: #e7f2f8;
  box-shadow: 0 14px 30px rgb(7 51 84 / 10%);
}

.conoce-dicis-groups-news-link:focus-visible {
  border-radius: 13px;
  outline: 3px solid #147ca8;
  outline-offset: 3px;
}

.conoce-dicis-groups-news__logo {
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 0 16px;
  padding: 8px;
  border: 1px solid #d4e5ee;
  border-radius: 50%;
  background: #fff;
  object-fit: contain;
}

.conoce-dicis-groups-news > p {
  margin: 0;
  color: #3982a8;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.conoce-dicis-groups-news h3 {
  margin: 8px 0 16px;
  color: #073354;
  font-size: 21px;
  line-height: 1.45;
}

.conoce-dicis-groups-news__action {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-top: auto;
  color: #12648f;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.conoce-dicis-groups-news-link:hover .conoce-dicis-groups-news__action {
  color: #052a45;
  text-decoration: underline;
}

@media (max-width: 760px) {
  .conoce-dicis-groups-news-list {
    grid-template-columns: 1fr;
  }

  .conoce-dicis-groups-news-list > li:last-child {
    grid-column: auto;
    width: 100%;
  }

  .conoce-dicis-groups-news {
    min-height: 0;
    padding: 17px 20px 20px;
  }

  .conoce-dicis-groups-news__logo {
    margin-inline: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .conoce-dicis-groups-news {
    transition: none;
  }
}
</style>
