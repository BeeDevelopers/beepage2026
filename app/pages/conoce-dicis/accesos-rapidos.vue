<script setup lang="ts">
useSeoMeta({
  title: 'Accesos institucionales | Conoce DICIS',
  description: 'Accesos rápidos a Campus Digital, IntraUG, Kárdex, el portal estudiantil, bibliotecas y Servicio Social de la Universidad de Guanajuato.',
})

const conoceDicisQuickAccessLinks = [
  {
    id: 'campus-digital',
    number: '01',
    label: 'Aprendizaje digital',
    title: 'Campus Digital',
    description: 'Entra a las experiencias de aprendizaje y aulas digitales de la Universidad de Guanajuato.',
    href: 'https://campusdigital.ugto.mx/',
    actionLabel: 'Ir a Campus Digital',
  },
  {
    id: 'intraug',
    number: '02',
    label: 'Servicios institucionales',
    title: 'IntraUG',
    description: 'Accede a servicios de la intranet universitaria, incluido el registro de Servicio Social.',
    href: 'https://intraug.ugto.mx/',
    actionLabel: 'Ir a IntraUG',
  },
  {
    id: 'kardex',
    number: '03',
    label: 'Trayectoria escolar',
    title: 'Kárdex en línea',
    description: 'Consulta tu historial académico y realiza inscripciones en línea desde el sistema de la DAE.',
    href: 'https://www.dae.ugto.mx/siiaealumnos/',
    actionLabel: 'Abrir Kárdex',
  },
  {
    id: 'portal-estudiantes',
    number: '04',
    label: 'Servicios para estudiantes',
    title: 'Portal de estudiantes UG',
    description: 'Encuentra trámites escolares, servicios académicos, apoyos y recursos para la comunidad estudiantil.',
    href: 'https://www.ugto.mx/estudiantes',
    actionLabel: 'Explorar portal estudiantil',
  },
  {
    id: 'bibliotecas-ug',
    number: '05',
    label: 'Recursos académicos',
    title: 'Sistema Bibliotecario UG',
    description: 'Consulta servicios, bibliotecas y recursos documentales de la Universidad de Guanajuato.',
    href: 'https://www.bibliotecas.ugto.mx/',
    actionLabel: 'Ir a Bibliotecas UG',
  },
  {
    id: 'servicio-social-ug',
    number: '06',
    label: 'Formación y comunidad',
    title: 'Servicio Social UG',
    description: 'Revisa información, guías y procesos oficiales para realizar tu Servicio Social.',
    href: 'https://www.ugto.mx/serviciosocial/',
    actionLabel: 'Consultar Servicio Social',
  },
]
</script>

<template>
  <ConoceDicisPageLayout active="accesos">
    <section class="conoce-dicis-access" aria-labelledby="conoce-dicis-access-title">
      <header class="conoce-dicis-access__heading">
        <p class="conoce-dicis-access__eyebrow">Herramientas oficiales · DICIS Irapuato-Salamanca</p>
        <h2 id="conoce-dicis-access-title">Accesos rápidos</h2>
        <p>Encuentra en un solo lugar las plataformas y servicios institucionales que acompañan tu vida universitaria.</p>
      </header>

      <ConoceDicisOfficialLinks :items="conoceDicisQuickAccessLinks" />

      <p class="conoce-dicis-access__note">
        Estos enlaces conducen a servicios de la Universidad de Guanajuato. Algunas plataformas pueden solicitar tu cuenta institucional.
      </p>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-access__heading {
  max-width: 820px;
  margin: 8px 0 30px;
}

.conoce-dicis-access__eyebrow {
  margin: 0 0 10px;
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

.conoce-dicis-access__heading > p:last-child {
  margin: 12px 0 0;
  color: #52606a;
  font-size: 16px;
  line-height: 1.6;
}

.conoce-dicis-access__note {
  margin: 22px 0 0;
  color: #657884;
  font-size: 13px;
  line-height: 1.55;
}
</style>
