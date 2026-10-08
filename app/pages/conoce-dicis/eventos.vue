<script setup lang="ts">
import { conoceDicisOfficialEvents, conoceDicisOfficialEventsCalendar } from '../../utils/conoceDicisCalendar'

useSeoMeta({
  title: 'Eventos UG · agosto–diciembre 2026 | Conoce DICIS',
  description: 'Eventos publicados por la Universidad de Guanajuato para el semestre agosto-diciembre de 2026.',
})
</script>

<template>
  <ConoceDicisPageLayout active="eventos">
    <section aria-labelledby="conoce-dicis-events-title">
      <div class="conoce-dicis-events-heading">
        <p class="conoce-dicis-events-eyebrow">Agenda institucional</p>
        <h2 id="conoce-dicis-events-title">Eventos UG · agosto–diciembre 2026</h2>
        <p>Eventos publicados en el calendario oficial de la Universidad de Guanajuato para este semestre, ordenados por fecha.</p>
      </div>

      <ol class="conoce-dicis-events-list">
        <li v-for="conoceDicisOfficialEvent in conoceDicisOfficialEvents" :key="conoceDicisOfficialEvent.source">
          <article class="conoce-dicis-event-card">
            <div class="conoce-dicis-event-card__date">
              <span>{{ conoceDicisOfficialEvent.dateLabel }}</span>
              <span>{{ conoceDicisOfficialEvent.timeLabel }}</span>
            </div>
            <div class="conoce-dicis-event-card__body">
              <p class="conoce-dicis-event-card__eyebrow">Universidad de Guanajuato</p>
              <h3>{{ conoceDicisOfficialEvent.title }}</h3>
              <p class="conoce-dicis-event-card__description">{{ conoceDicisOfficialEvent.description }}</p>
              <dl class="conoce-dicis-event-card__details">
                <div>
                  <dt>Lugar</dt>
                  <dd>{{ conoceDicisOfficialEvent.place }}</dd>
                </div>
                <div>
                  <dt>Horario</dt>
                  <dd>{{ conoceDicisOfficialEvent.timeLabel }}</dd>
                </div>
              </dl>
              <a :href="conoceDicisOfficialEvent.source" target="_blank" rel="noopener noreferrer">
                Ver ficha oficial UG <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </li>
      </ol>

      <a class="conoce-dicis-events-source-link" :href="conoceDicisOfficialEventsCalendar" target="_blank" rel="noopener noreferrer">
        Abrir calendario oficial de eventos UG <span aria-hidden="true">↗</span>
      </a>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-events-heading {
  max-width: 760px;
  margin: 8px 0 28px;
}

.conoce-dicis-events-eyebrow {
  margin: 0 0 10px;
  color: #176b9a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.conoce-dicis-events-heading h2 {
  margin: 0;
  color: #073354;
  font-size: clamp(30px, 3.2vw, 42px);
  letter-spacing: -.025em;
  line-height: 1.2;
}

.conoce-dicis-events-heading > p:last-child {
  margin: 13px 0 0;
  font-size: 17px;
  line-height: 1.7;
}

.conoce-dicis-events-list {
  display: grid;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-event-card {
  overflow: hidden;
  border: 1px solid #e2eaf0;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 6px 18px rgb(7 51 84 / 4%);
}

.conoce-dicis-event-card__date {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 20px;
  padding: 14px 26px;
  background: #eaf4f9;
  color: #12648f;
  font-size: 14px;
  font-weight: 700;
}

.conoce-dicis-event-card__body {
  padding: 26px;
}

.conoce-dicis-event-card__eyebrow {
  margin: 0 0 7px;
  color: #3982a8;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.conoce-dicis-event-card h3 {
  margin: 0;
  color: #073354;
  font-size: 23px;
  line-height: 1.4;
}

.conoce-dicis-event-card__description {
  margin: 12px 0 0;
  font-size: 16px;
  line-height: 1.65;
}

.conoce-dicis-event-card__details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 18px 0;
  padding: 14px 0;
  border-top: 1px solid #edf1f4;
  border-bottom: 1px solid #edf1f4;
}

.conoce-dicis-event-card__details dt {
  color: #73818b;
  font-size: 13px;
  font-weight: 700;
}

.conoce-dicis-event-card__details dd {
  margin: 4px 0 0;
  color: #405a6b;
  font-size: 15px;
  line-height: 1.5;
}

.conoce-dicis-event-card a,
.conoce-dicis-events-source-link {
  color: #12648f;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
}

.conoce-dicis-event-card a:hover,
.conoce-dicis-events-source-link:hover {
  color: #052a45;
  text-decoration: underline;
}

.conoce-dicis-events-source-link {
  display: inline-flex;
  gap: 8px;
  margin-top: 18px;
}

@media (max-width: 520px) {
  .conoce-dicis-event-card__details {
    grid-template-columns: 1fr;
  }

  .conoce-dicis-event-card__body {
    padding: 17px;
  }
}
</style>
