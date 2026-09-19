<template>
  <section id="registro" class="registration-section" aria-labelledby="registration-title">
    <UContainer class="content-container">
      <div class="registration-panel">
        <h2 id="registration-title">Área para Formulario de Registro</h2>
        <span class="registration-accent" aria-hidden="true" />
        <!-- Visual integration point only. Registration belongs to José Eduardo. -->
        <slot>
          <p>Próximamente podrás registrarte para formar parte de BeeDevelopers.</p>
        </slot>
      </div>
    </UContainer>
  </section>
</template>
