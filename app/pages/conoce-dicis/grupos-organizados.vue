<script setup lang="ts">
useSeoMeta({
  title: 'Grupos organizados DICIS | Conoce DICIS',
  description: 'Noticias oficiales de grupos organizados de la DICIS, sede Irapuato-Salamanca, Universidad de Guanajuato.',
})

const conoceDicisGroupNews = [
  {
    group: 'BeeDevelopers',
    title: 'Estudiantes UG del grupo organizado BeeDevelopers renuevan su directiva e informan resultados',
    source: 'https://www.ugto.mx/noticias/quehacer-institucional/20083-estudiantes-ug-del-grupo-organizado-beedevelopers-renuevan-su-directiva-e-informan-resultados',
  },
  {
    group: 'AUGE',
    title: 'En la UG impulsan el futuro de la gestión empresarial con jornadas académicas',
    source: 'https://www.dcv.ugto.mx/noticias/quehacer-institucional/21315-en-la-ug-impulsan-el-futuro-de-la-gestion-empresarial-con-jornadas-academicas',
  },
  {
    group: 'CMT.UG',
    title: 'El grupo organizado Combustibles Alternativos y Motores Térmicos de la UG tiene nueva directiva',
    source: 'https://www.ugto.mx/noticias/quehacer-institucional/19998-el-grupo-organizado-combustibles-alternativos-y-motores-termicos-de-la-ug-tiene-nueva-directiva',
  },
  {
    group: 'ASME–SOMIM',
    title: 'DICIS impulsa vocaciones científicas en la 14.ª edición de Women in Engineering',
    source: 'https://www.ugto.mx/noticias/quehacer-institucional/20656-dicis-impulsa-vocaciones-cientificas-en-la-14-edicion-de-women-in-engineering',
  },
  {
    group: 'AERO–UG',
    title: 'UG impulsa el talento aeroespacial con el arranque de la Aerospace Week 2025',
    source: 'https://www.dcv.ugto.mx/noticias/quehacer-institucional/20784-ug-impulsa-el-talento-aeroespacial-con-el-arranque-de-la-aerospace-week-2025',
  },
  {
    group: 'OEDI',
    title: 'Rinde protesta nueva mesa directiva de la Organización Estudiantil en Desarrollo de Ideas',
    source: 'https://www.ugto.mx/noticias/quehacer-institucional/19111-rinde-protesta-nueva-mesa-directiva-de-la-organizacion-estudiantil-en-desarrollo-de-ideas',
  },
  {
    group: 'ACM Capítulo Guanajuato',
    title: 'Rinde protesta grupo organizado ACM Capítulo Guanajuato de la DICIS; impulsarán la inteligencia artificial',
    source: 'https://www.ugto.mx/noticias/quehacer-institucional/18963-rinde-protesta-grupo-organizado-acm-capitulo-guanajuato-de-la-dicis-impulsaran-la-inteligencia-artificial',
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
        <li v-for="conoceDicisGroupNewsItem in conoceDicisGroupNews" :key="conoceDicisGroupNewsItem.group">
          <article class="conoce-dicis-groups-news">
            <p>{{ conoceDicisGroupNewsItem.group }}</p>
            <h3>{{ conoceDicisGroupNewsItem.title }}</h3>
            <a :href="conoceDicisGroupNewsItem.source" target="_blank" rel="noopener noreferrer">
              Leer noticia oficial UG <span aria-hidden="true">↗</span>
            </a>
          </article>
        </li>
      </ul>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-groups-heading {
  max-width: 760px;
  margin: 8px 0 28px;
}

.conoce-dicis-groups-eyebrow {
  margin: 0 0 10px;
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
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-groups-news {
  display: flex;
  min-height: 250px;
  flex-direction: column;
  padding: 26px;
  border: 1px solid #e2eaf0;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 6px 18px rgb(7 51 84 / 4%);
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
  margin: 12px 0 22px;
  color: #073354;
  font-size: 21px;
  line-height: 1.45;
}

.conoce-dicis-groups-news a {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-top: auto;
  color: #12648f;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.conoce-dicis-groups-news a:hover {
  color: #052a45;
  text-decoration: underline;
}

@media (max-width: 760px) {
  .conoce-dicis-groups-news-list {
    grid-template-columns: 1fr;
  }

  .conoce-dicis-groups-news {
    min-height: 0;
  }
}
</style>
