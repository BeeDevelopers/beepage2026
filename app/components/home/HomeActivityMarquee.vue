<script setup lang="ts">
const activities = [
  { name: 'Hackatones', color: '#e4572e' },
  { name: 'Talleres', color: '#1f9e8f' },
  { name: 'Ponencias', color: '#6c5ce7' },
  { name: 'DevWeek', color: '#e0b100' },
  { name: 'Hack Day DICIS', color: '#2f80c2' },
  { name: 'NASA Space Apps', color: '#073354' },
  { name: 'Mentorías', color: '#d6498b' },
  { name: 'Proyectos en equipo', color: '#4f9d3a' },
  { name: 'Convivencias', color: '#f08a24' },
  { name: 'Networking', color: '#8e5bb5' },
]
</script>

<template>
  <section id="actividades" class="home-marquee" aria-labelledby="marquee-title">
    <h2 id="marquee-title" class="marquee-label">
      Lo que vivimos en BeeDevelopers
    </h2>
    <div class="marquee-viewport">
      <div class="marquee-track">
        <ul v-for="copy in 2" :key="copy" class="marquee-list" :aria-hidden="copy === 2 ? 'true' : undefined">
          <li v-for="activity in activities" :key="activity.name" class="activity-chip">
            <svg aria-hidden="true" width="14" height="16" viewBox="0 0 56 64"><polygon points="28,2 54,17 54,47 28,62 2,47 2,17" :fill="activity.color" /></svg>
            {{ activity.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
