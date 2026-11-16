<script setup lang="ts">
const steps = [
  { title: 'Llena el registro', text: 'Te toma menos de dos minutos. Solo necesitas tu correo institucional.' },
  { title: 'Ven a la reunión de bienvenida', text: 'Conoce al equipo, las actividades del semestre y cómo trabajamos.' },
  { title: 'Súmate a una actividad', text: 'Elige un proyecto, taller o evento y empieza a participar desde la primera semana.' },
]
</script>

<template>
  <section id="registro" class="home-section registration-section" aria-labelledby="registration-title">
    <HoneycombPattern class="registration-honeycomb" />

    <div class="home-container registration-layout">
      <div class="registration-intro">
        <p class="section-label section-label--on-dark">
          // únete
        </p>
        <h2 id="registration-title" class="section-heading section-heading--on-dark">
          Entrar a BeeDevelopers es fácil
        </h2>
        <ol class="join-steps">
          <li v-for="(step, index) in steps" :key="step.title" class="join-step">
            <div class="join-step-marker" aria-hidden="true">
              <span class="join-step-number">{{ index + 1 }}</span>
            </div>
            <div class="join-step-body">
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="registration-panel">
        <!-- Visual integration point only. Registration belongs to José Eduardo. -->
        <slot>
          <h3>Formulario de registro</h3>
          <p class="registration-note">
            Próximamente podrás registrarte aquí para formar parte de BeeDevelopers.
          </p>
          <div class="registration-sketch" aria-hidden="true">
            <span class="sketch-label" />
            <span class="sketch-field" />
            <span class="sketch-label" />
            <span class="sketch-field" />
            <span class="sketch-label" />
            <span class="sketch-field" />
            <span class="sketch-button" />
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
