<script setup lang="ts">
useSeoMeta({
  title: 'Accesos rápidos y trámites | Conoce DICIS',
  description: 'Accesos institucionales y portal de trámites escolares para estudiantes de DICIS Irapuato-Salamanca.',
})

const conoceDicisQuickAccessLinks = [
  {
    id: 'campus-digital',
    label: 'Aprendizaje digital',
    title: 'Campus Digital',
    description: 'Entra a las experiencias de aprendizaje y aulas digitales de la Universidad de Guanajuato.',
    href: 'https://campusdigital.ugto.mx/',
    actionLabel: 'Ir a Campus Digital',
  },
  {
    id: 'intraug',
    label: 'Servicios institucionales',
    title: 'IntraUG',
    description: 'Accede a servicios de la intranet universitaria, incluido el registro de Servicio Social.',
    href: 'https://intraug.ugto.mx/',
    actionLabel: 'Ir a IntraUG',
  },
  {
    id: 'kardex',
    label: 'Trayectoria escolar',
    title: 'Kárdex en línea',
    description: 'Consulta tu historial académico y realiza inscripciones en línea desde el sistema de la DAE.',
    href: 'https://www.dae.ugto.mx/siiaealumnos/',
    actionLabel: 'Abrir Kárdex',
  },
  {
    id: 'portal-estudiantes',
    label: 'Servicios para estudiantes',
    title: 'Portal de estudiantes UG',
    description: 'Encuentra trámites escolares, servicios académicos, apoyos y recursos para la comunidad estudiantil.',
    href: 'https://www.ugto.mx/estudiantes',
    actionLabel: 'Explorar portal estudiantil',
  },
  {
    id: 'bibliotecas-ug',
    label: 'Recursos académicos',
    title: 'Sistema Bibliotecario UG',
    description: 'Consulta servicios, bibliotecas y recursos documentales de la Universidad de Guanajuato.',
    href: 'https://www.bibliotecas.ugto.mx/',
    actionLabel: 'Ir a Bibliotecas UG',
  },
  {
    id: 'servicio-social-ug',
    label: 'Formación y comunidad',
    title: 'Servicio Social UG',
    description: 'Revisa información, guías y procesos oficiales para realizar tu Servicio Social.',
    href: 'https://www.ugto.mx/serviciosocial/',
    actionLabel: 'Consultar Servicio Social',
  },
]

const conoceDicisProcedureLinks = [
  {
    id: 'caecis-portal',
    label: 'Portal de trámites y servicios',
    title: 'CAECIS · Asuntos Escolares',
    description: 'Consulta inscripción y reinscripción, constancias y certificado electrónico; además, titulación por tesis, prácticas de profesionalización o integradas, experiencia profesional e investigación, con requisitos y formatos.',
    href: 'http://www.caecis.ugto.mx/',
    actionLabel: 'Abrir portal CAECIS',
  },
]
</script>

<template>
  <ConoceDicisPageLayout active="accesos">
    <section class="conoce-dicis-access" aria-labelledby="conoce-dicis-access-title">
      <header class="conoce-dicis-access__heading">
        <p class="conoce-dicis-access__eyebrow">Herramientas oficiales · DICIS Irapuato-Salamanca</p>
        <h2 id="conoce-dicis-access-title">Accesos rápidos</h2>
      </header>

      <ConoceDicisOfficialLinks :items="conoceDicisQuickAccessLinks" />
    </section>

    <section class="conoce-dicis-procedures" aria-labelledby="conoce-dicis-procedures-title">
      <header class="conoce-dicis-access__heading conoce-dicis-procedures__heading">
        <p class="conoce-dicis-access__eyebrow">Servicios institucionales · DICIS Irapuato-Salamanca</p>
        <h2 id="conoce-dicis-procedures-title">Trámites escolares</h2>
      </header>

      <div class="conoce-dicis-procedures__group">
        <p class="conoce-dicis-procedures__description">Consulta el portal y conoce los requisitos, formatos y opciones de trámite de Asuntos Escolares.</p>
        <ConoceDicisOfficialLinks :items="conoceDicisProcedureLinks" :columns="2" />
      </div>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-access__heading {
  max-width: 820px;
  margin: 0 0 20px;
}

.conoce-dicis-access__eyebrow {
  margin: 0 0 6px;
  color: #176b9a;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.conoce-dicis-access__heading h2 {
  margin: 0;
  color: #073354;
  font-size: clamp(30px, 3.2vw, 42px);
  letter-spacing: -.025em;
  line-height: 1.2;
}

.conoce-dicis-procedures {
  margin-top: clamp(28px, 4vw, 46px);
  padding-top: clamp(20px, 2.8vw, 32px);
  border-top: 1px solid #dce7ee;
}

.conoce-dicis-procedures__heading {
  margin-bottom: 20px;
}

.conoce-dicis-procedures__description {
  max-width: 900px;
  margin: 0 0 14px;
  color: #52606a;
  font-size: 14px;
  line-height: 1.55;
}

</style>
