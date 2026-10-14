<template>
  <section id="registro" class="registration-section" aria-labelledby="registration-title">
    <UContainer class="content-container">
      <UCard class="registration-panel" :ui="{ root: 'registration-panel', body: 'registration-panel-body' }">
        <h2 id="registration-title">Área para Formulario de Registro</h2>
        <span class="registration-accent" aria-hidden="true" />
        <!-- Visual integration point only. Registration belongs to José Eduardo. -->
        <slot>
          <p>Próximamente podrás registrarte para formar parte de BeeDevelopers.</p>
        </slot>
      </UCard>
    </UContainer>
  </section>
</template>
