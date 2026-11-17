<script setup lang="ts">
useSeoMeta({
  title: 'Trámites estudiantiles | Conoce DICIS',
  description: 'Consulta en CAECIS los trámites y servicios escolares para estudiantes de DICIS Irapuato-Salamanca.',
})

const conoceDicisProcedureGroups = [
  {
    id: 'escolares',
    eyebrow: 'Coordinación de Asuntos Escolares',
    title: 'Trámites escolares',
    description: 'Consulta en un solo portal los requisitos, formatos y opciones de trámite de Asuntos Escolares.',
    links: [
      {
        id: 'caecis-portal',
        number: '01',
        label: 'Portal de trámites y servicios',
        title: 'CAECIS · Asuntos Escolares',
        description: 'Consulta inscripción y reinscripción, constancias y certificado electrónico; además, titulación por tesis, prácticas de profesionalización o integradas, experiencia profesional e investigación, con requisitos y formatos.',
        href: 'http://www.caecis.ugto.mx/',
        actionLabel: 'Abrir portal CAECIS',
      },
    ],
  },
]
</script>

<template>
  <ConoceDicisPageLayout active="tramites">
    <section class="conoce-dicis-procedures" aria-labelledby="conoce-dicis-procedures-title">
      <header class="conoce-dicis-procedures__heading">
        <p class="conoce-dicis-procedures__eyebrow">Servicios institucionales · DICIS Irapuato-Salamanca</p>
        <h2 id="conoce-dicis-procedures-title">Trámites estudiantiles</h2>
        <p>Revisa las opciones y requisitos escolares para tu trayectoria universitaria en DICIS.</p>
      </header>

      <div class="conoce-dicis-procedures__groups">
        <section
          v-for="conoceDicisProcedureGroup in conoceDicisProcedureGroups"
          :key="conoceDicisProcedureGroup.id"
          class="conoce-dicis-procedures__group"
          :aria-labelledby="`conoce-dicis-procedures-${conoceDicisProcedureGroup.id}`"
        >
          <div class="conoce-dicis-procedures__group-heading">
            <p>{{ conoceDicisProcedureGroup.eyebrow }}</p>
            <h3 :id="`conoce-dicis-procedures-${conoceDicisProcedureGroup.id}`">{{ conoceDicisProcedureGroup.title }}</h3>
            <span>{{ conoceDicisProcedureGroup.description }}</span>
          </div>
          <ConoceDicisOfficialLinks :items="conoceDicisProcedureGroup.links" :columns="2" />
        </section>
      </div>

      <p class="conoce-dicis-procedures__note">
        Consulta en CAECIS los requisitos y formatos vigentes antes de iniciar un trámite.
      </p>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-procedures__heading {
  max-width: 820px;
  margin: 8px 0 34px;
}

.conoce-dicis-procedures__eyebrow,
.conoce-dicis-procedures__group-heading > p {
  margin: 0 0 10px;
  color: #176b9a;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.conoce-dicis-procedures__heading h2 {
  margin: 0;
  color: #073354;
  font-size: clamp(30px, 3.2vw, 42px);
  letter-spacing: -.025em;
  line-height: 1.2;
}

.conoce-dicis-procedures__heading > p:last-child {
  margin: 12px 0 0;
  color: #52606a;
  font-size: 16px;
  line-height: 1.6;
}

.conoce-dicis-procedures__groups {
  display: grid;
  gap: 34px;
}

.conoce-dicis-procedures__group-heading {
  max-width: 900px;
  margin-bottom: 18px;
}

.conoce-dicis-procedures__group-heading > p {
  margin-bottom: 6px;
  font-size: 10px;
}

.conoce-dicis-procedures__group-heading h3 {
  margin: 0;
  color: #073354;
  font-size: clamp(22px, 2.5vw, 28px);
  letter-spacing: -.02em;
  line-height: 1.25;
}

.conoce-dicis-procedures__group-heading > span {
  display: block;
  margin-top: 8px;
  color: #52606a;
  font-size: 14px;
  line-height: 1.55;
}

.conoce-dicis-procedures__note {
  margin: 24px 0 0;
  padding: 15px 17px;
  border-left: 3px solid #147ca8;
  border-radius: 0 8px 8px 0;
  background: #f0f7fb;
  color: #405a6b;
  font-size: 13px;
  line-height: 1.6;
}
</style>
