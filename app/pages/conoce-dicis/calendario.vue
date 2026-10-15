<script setup lang="ts">
import {
  conoceDicisAcademicCalendarMarks,
  conoceDicisCalendarCategories,
  conoceDicisCalendarSource,
  conoceDicisCalendarVacationPeriods,
  conoceDicisOfficialEvents,
  type ConoceDicisCalendarCategory,
} from '../../utils/conoceDicisCalendar'

useSeoMeta({
  title: 'Calendario semestral 2026 | Conoce DICIS',
  description: 'Calendario mensual de fechas académicas y eventos oficiales para el semestre agosto-diciembre 2026.',
})

const conoceDicisCalendarMonths = [
  { value: 7, label: 'Agosto' },
  { value: 8, label: 'Septiembre' },
  { value: 9, label: 'Octubre' },
  { value: 10, label: 'Noviembre' },
  { value: 11, label: 'Diciembre' },
]
const conoceDicisCalendarWeekdayHeaders = [
  { short: 'Dom', full: 'Domingo' },
  { short: 'Lun', full: 'Lunes' },
  { short: 'Mar', full: 'Martes' },
  { short: 'Mié', full: 'Miércoles' },
  { short: 'Jue', full: 'Jueves' },
  { short: 'Vie', full: 'Viernes' },
  { short: 'Sáb', full: 'Sábado' },
]

type ConoceDicisCalendarEntry = {
  title: string
  category: ConoceDicisCalendarCategory
  color: string
  href?: string
}

type ConoceDicisCalendarCell = {
  key: string
  date: string | null
  day: number | null
  entries: ConoceDicisCalendarEntry[]
  accent: string | null
}

const conoceDicisCalendarConsultationDate = new Date()
const conoceDicisCalendarTodayDate = toConoceDicisCalendarIsoDate(conoceDicisCalendarConsultationDate)
const conoceDicisCalendarCurrentMonthIsInSemester = conoceDicisCalendarMonths.some(conoceDicisCalendarMonth => conoceDicisCalendarMonth.value === conoceDicisCalendarConsultationDate.getMonth())
const conoceDicisCalendarConsultationDateIsInSemester = conoceDicisCalendarConsultationDate.getFullYear() === 2026 && conoceDicisCalendarCurrentMonthIsInSemester
const conoceDicisCalendarMonthIndex = ref(
  conoceDicisCalendarConsultationDateIsInSemester
    ? conoceDicisCalendarConsultationDate.getMonth()
    : conoceDicisCalendarMonths[0]!.value,
)
const conoceDicisCalendarInitialSelectedDate = conoceDicisCalendarConsultationDateIsInSemester
  ? conoceDicisCalendarConsultationDate
  : new Date(2026, conoceDicisCalendarMonths[0]!.value, 1)
const conoceDicisCalendarSelectedDate = ref<string | null>(toConoceDicisCalendarIsoDate(conoceDicisCalendarInitialSelectedDate))

const conoceDicisCalendarMonthLabel = computed(() => conoceDicisCalendarMonths.find(conoceDicisCalendarMonth => conoceDicisCalendarMonth.value === conoceDicisCalendarMonthIndex.value)?.label ?? '')

function toConoceDicisCalendarIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

const conoceDicisCalendarCells = computed<ConoceDicisCalendarCell[]>(() => {
  const firstDay = new Date(2026, conoceDicisCalendarMonthIndex.value, 1)
  const daysInMonth = new Date(2026, conoceDicisCalendarMonthIndex.value + 1, 0).getDate()
  const leadingCells = firstDay.getDay()
  const count = Math.ceil((leadingCells + daysInMonth) / 7) * 7

  return Array.from({ length: count }, (_, index) => {
    const day = index - leadingCells + 1
    if (day < 1 || day > daysInMonth) {
      return { key: `blank-${conoceDicisCalendarMonthIndex.value}-${index}`, date: null, day: null, entries: [], accent: null }
    }

    const date = toConoceDicisCalendarIsoDate(new Date(2026, conoceDicisCalendarMonthIndex.value, day))
    const entries: ConoceDicisCalendarEntry[] = conoceDicisAcademicCalendarMarks
      .filter(mark => date >= mark.start && date <= mark.end)
      .map(mark => ({
        title: mark.title,
        category: mark.category,
        color: conoceDicisCalendarCategories[mark.category].color,
      }))

    conoceDicisOfficialEvents
      .filter(event => {
        const start = event.start.slice(0, 10)
        const end = event.end.slice(0, 10)
        return date >= start && date <= end
      })
      .forEach(event => entries.push({
        title: event.title,
        category: 'event',
        color: conoceDicisCalendarCategories.event.color,
        href: event.source,
      }))

    const conoceDicisCalendarVacation = conoceDicisCalendarVacationPeriods.find(period => date >= period.start && date <= period.end)
    const conoceDicisCalendarIsWeekend = [0, 6].includes(new Date(2026, conoceDicisCalendarMonthIndex.value, day).getDay())
    const conoceDicisCalendarHasOfficialDayOff = entries.some(entry => entry.category === 'holiday')

    if (conoceDicisCalendarVacation) {
      entries.push({
        title: conoceDicisCalendarVacation.title,
        category: 'weekendAndVacation',
        color: conoceDicisCalendarCategories.weekendAndVacation.color,
      })
    } else if (conoceDicisCalendarIsWeekend && !conoceDicisCalendarHasOfficialDayOff) {
      entries.push({
        title: 'Fin de semana',
        category: 'weekendAndVacation',
        color: conoceDicisCalendarCategories.weekendAndVacation.color,
      })
    }

    return {
      key: date,
      date,
      day,
      entries,
      accent: entries.find(entry => entry.category !== 'weekendAndVacation')?.color ?? entries[0]?.color ?? null,
    }
  })
})

const conoceDicisCalendarSelectedCell = computed(() => conoceDicisCalendarCells.value.find(cell => cell.date === conoceDicisCalendarSelectedDate.value) ?? null)
const conoceDicisCalendarLegend = computed(() => {
  const used = new Set<ConoceDicisCalendarCategory>(['event', 'weekendAndVacation'])
  for (const mark of conoceDicisAcademicCalendarMarks) {
    if (mark.start.slice(0, 7) <= `${2026}-${String(conoceDicisCalendarMonthIndex.value + 1).padStart(2, '0')}`
      && mark.end.slice(0, 7) >= `${2026}-${String(conoceDicisCalendarMonthIndex.value + 1).padStart(2, '0')}`) {
      used.add(mark.category)
    }
  }

  return Object.entries(conoceDicisCalendarCategories)
    .filter(([category]) => used.has(category as ConoceDicisCalendarCategory))
    .map(([category, value]) => ({ category: category as ConoceDicisCalendarCategory, ...value }))
})

function moveConoceDicisCalendarMonth(step: number) {
  const next = conoceDicisCalendarMonthIndex.value + step
  if (next < conoceDicisCalendarMonths[0]!.value || next > conoceDicisCalendarMonths[conoceDicisCalendarMonths.length - 1]!.value) return
  const selectedDayOfMonth = Number(conoceDicisCalendarSelectedDate.value?.slice(-2)) || 1
  const lastDayOfNextMonth = new Date(2026, next + 1, 0).getDate()
  conoceDicisCalendarMonthIndex.value = next
  conoceDicisCalendarSelectedDate.value = toConoceDicisCalendarIsoDate(new Date(2026, next, Math.min(selectedDayOfMonth, lastDayOfNextMonth)))
}

function formatConoceDicisCalendarDate(date: string) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}
</script>

<template>
  <ConoceDicisPageLayout active="calendario">
    <section aria-labelledby="conoce-dicis-calendar-title">
      <div class="conoce-dicis-calendar-heading">
        <p class="conoce-dicis-calendar-eyebrow">Calendario académico · Universidad de Guanajuato</p>
        <h2 id="conoce-dicis-calendar-title">Agosto–diciembre de 2026</h2>
        <p>Usa las flechas para cambiar de mes. Los colores siguen las categorías de la leyenda del calendario semestral oficial. Los eventos individuales enlazan a su ficha en la agenda de la UG. Los fines de semana y las vacaciones se marcan como días de descanso; los demás días sin actividad oficial se mantienen en blanco.</p>
      </div>

      <section class="conoce-dicis-calendar" aria-label="Calendario mensual de actividades">
        <header class="conoce-dicis-calendar__toolbar">
          <button
            class="conoce-dicis-calendar__month-button"
            type="button"
            aria-label="Mes anterior"
            :disabled="conoceDicisCalendarMonthIndex === conoceDicisCalendarMonths[0]!.value"
            @click="moveConoceDicisCalendarMonth(-1)"
          >
            <span aria-hidden="true">←</span>
          </button>
          <h3>{{ conoceDicisCalendarMonthLabel }} 2026</h3>
          <button
            class="conoce-dicis-calendar__month-button"
            type="button"
            aria-label="Mes siguiente"
            :disabled="conoceDicisCalendarMonthIndex === conoceDicisCalendarMonths[conoceDicisCalendarMonths.length - 1]!.value"
            @click="moveConoceDicisCalendarMonth(1)"
          >
            <span aria-hidden="true">→</span>
          </button>
        </header>

        <div class="conoce-dicis-calendar__weekdays" role="row">
          <span v-for="conoceDicisCalendarWeekday in conoceDicisCalendarWeekdayHeaders" :key="conoceDicisCalendarWeekday.full" role="columnheader" :aria-label="conoceDicisCalendarWeekday.full">
            {{ conoceDicisCalendarWeekday.short }}
          </span>
        </div>

        <div class="conoce-dicis-calendar__grid" role="grid" :aria-label="`${conoceDicisCalendarMonthLabel} 2026`">
          <template v-for="conoceDicisCalendarCell in conoceDicisCalendarCells" :key="conoceDicisCalendarCell.key">
            <button
              v-if="conoceDicisCalendarCell.date"
              type="button"
              role="gridcell"
              class="conoce-dicis-calendar-day"
              :class="{
                'conoce-dicis-calendar-day--marked': conoceDicisCalendarCell.entries.length > 0,
                'conoce-dicis-calendar-day--selected': conoceDicisCalendarSelectedDate === conoceDicisCalendarCell.date,
                'conoce-dicis-calendar-day--today': conoceDicisCalendarCell.date === conoceDicisCalendarTodayDate,
              }"
              :style="conoceDicisCalendarCell.accent ? { '--conoce-dicis-calendar-day-accent': conoceDicisCalendarCell.accent } : undefined"
              :aria-label="`${formatConoceDicisCalendarDate(conoceDicisCalendarCell.date)}${conoceDicisCalendarCell.entries.length ? `: ${conoceDicisCalendarCell.entries.map(conoceDicisCalendarEntry => conoceDicisCalendarEntry.title).join(', ')}` : ': sin actividad oficial registrada'}`"
              :aria-pressed="conoceDicisCalendarSelectedDate === conoceDicisCalendarCell.date"
              :aria-current="conoceDicisCalendarCell.date === conoceDicisCalendarTodayDate ? 'date' : undefined"
              @click="conoceDicisCalendarSelectedDate = conoceDicisCalendarCell.date"
            >
              <span class="conoce-dicis-calendar-day__number">{{ conoceDicisCalendarCell.day }}</span>
              <span v-if="conoceDicisCalendarCell.entries.length" class="conoce-dicis-calendar-day__dots" aria-hidden="true">
                <i v-for="(conoceDicisCalendarEntry, index) in conoceDicisCalendarCell.entries.slice(0, 4)" :key="`${conoceDicisCalendarEntry.title}-${index}`" :style="{ '--conoce-dicis-calendar-entry-color': conoceDicisCalendarEntry.color }" />
              </span>
              <span v-if="conoceDicisCalendarCell.entries.length" class="conoce-dicis-calendar-day__labels" aria-hidden="true">
                {{ conoceDicisCalendarCell.entries.slice(0, 2).map(conoceDicisCalendarEntry => conoceDicisCalendarEntry.title).join(' · ') }}
              </span>
            </button>
            <div v-else class="conoce-dicis-calendar-day conoce-dicis-calendar-day--empty" aria-hidden="true" />
          </template>
        </div>
      </section>

      <ul class="conoce-dicis-calendar-legend" aria-label="Leyenda de colores">
        <li v-for="conoceDicisCalendarLegendItem in conoceDicisCalendarLegend" :key="conoceDicisCalendarLegendItem.category">
          <span class="conoce-dicis-calendar-legend__swatch" :style="{ '--conoce-dicis-calendar-legend-color': conoceDicisCalendarLegendItem.color }" aria-hidden="true" />
          {{ conoceDicisCalendarLegendItem.label }}
        </li>
      </ul>

      <section class="conoce-dicis-calendar-selection" aria-live="polite">
        <template v-if="conoceDicisCalendarSelectedCell && conoceDicisCalendarSelectedDate">
          <h3>{{ formatConoceDicisCalendarDate(conoceDicisCalendarSelectedDate) }}</h3>
          <ul v-if="conoceDicisCalendarSelectedCell.entries.length" class="conoce-dicis-calendar-selection__list">
            <li v-for="(conoceDicisCalendarEntry, index) in conoceDicisCalendarSelectedCell.entries" :key="`${conoceDicisCalendarEntry.title}-${index}`">
              <span class="conoce-dicis-calendar-selection__marker" :style="{ '--conoce-dicis-calendar-entry-color': conoceDicisCalendarEntry.color }" aria-hidden="true" />
              <span>{{ conoceDicisCalendarEntry.title }}</span>
              <a v-if="conoceDicisCalendarEntry.href" :href="conoceDicisCalendarEntry.href" target="_blank" rel="noopener noreferrer">Ficha UG ↗</a>
              <span v-else class="conoce-dicis-calendar-selection__category">{{ conoceDicisCalendarCategories[conoceDicisCalendarEntry.category].label }}</span>
            </li>
          </ul>
          <p v-else>No hay actividad académica ni evento oficial registrado para esta fecha.</p>
        </template>
      </section>

      <a class="conoce-dicis-calendar-source-link" :href="conoceDicisCalendarSource" target="_blank" rel="noopener noreferrer">
        Consultar calendario semestral oficial de la UG <span aria-hidden="true">↗</span>
      </a>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-calendar-heading {
  max-width: 760px;
  margin: 8px 0 28px;
}

.conoce-dicis-calendar-eyebrow {
  margin: 0 0 10px;
  color: #176b9a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.conoce-dicis-calendar-heading h2 {
  margin: 0;
  color: #073354;
  font-size: clamp(30px, 3.2vw, 42px);
  letter-spacing: -.025em;
  line-height: 1.2;
}

.conoce-dicis-calendar-heading > p:last-child {
  margin: 13px 0 0;
  color: #52606a;
  font-size: 17px;
  line-height: 1.7;
}

.conoce-dicis-calendar {
  overflow: hidden;
  border: 1px solid #dce7ee;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(7 51 84 / 5%);
}

.conoce-dicis-calendar__toolbar {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 44px;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: #f4f9fc;
}

.conoce-dicis-calendar__toolbar h3 {
  margin: 0;
  color: #073354;
  font-size: 24px;
  text-align: center;
}

.conoce-dicis-calendar__month-button {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 1px solid #c9dce8;
  border-radius: 50%;
  background: #fff;
  color: #12648f;
  font-size: 19px;
  cursor: pointer;
}

.conoce-dicis-calendar__month-button:hover:not(:disabled) {
  border-color: #147ca8;
  background: #eaf4f9;
}

.conoce-dicis-calendar__month-button:disabled {
  color: #aab9c3;
  cursor: not-allowed;
}

.conoce-dicis-calendar__weekdays,
.conoce-dicis-calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.conoce-dicis-calendar__weekdays {
  border-bottom: 1px solid #e2eaf0;
  background: #fff;
}

.conoce-dicis-calendar__weekdays span {
  padding: 15px 4px;
  color: #607583;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

.conoce-dicis-calendar__grid {
  gap: 1px;
  background: #e6edf1;
}

.conoce-dicis-calendar-day {
  display: flex;
  min-width: 0;
  min-height: 126px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 13px;
  border: 0;
  border-radius: 0;
  background: #fff;
  color: #073354;
  text-align: left;
  cursor: pointer;
}

.conoce-dicis-calendar-day:hover {
  background: #f3f8fb;
}

.conoce-dicis-calendar-day--marked {
  box-shadow: inset 0 4px 0 var(--conoce-dicis-calendar-day-accent);
  background: color-mix(in srgb, var(--conoce-dicis-calendar-day-accent) 10%, white);
}

.conoce-dicis-calendar-day--marked:hover,
.conoce-dicis-calendar-day--selected {
  background: color-mix(in srgb, var(--conoce-dicis-calendar-day-accent) 18%, white);
}

.conoce-dicis-calendar-day--selected {
  outline: 2px solid #147ca8;
  outline-offset: -2px;
}

.conoce-dicis-calendar-day--today {
  outline: 2px solid #111;
  outline-offset: -2px;
}

.conoce-dicis-calendar-day--empty {
  background: #fbfcfd;
  cursor: default;
}

.conoce-dicis-calendar-day__number {
  font-size: 17px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.conoce-dicis-calendar-day__dots {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.conoce-dicis-calendar-day__dots i,
.conoce-dicis-calendar-legend__swatch,
.conoce-dicis-calendar-selection__marker {
  display: block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--conoce-dicis-calendar-entry-color, var(--conoce-dicis-calendar-legend-color));
}

.conoce-dicis-calendar-day__labels {
  display: -webkit-box;
  overflow: hidden;
  color: #405a6b;
  font-size: 12px;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.conoce-dicis-calendar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-calendar-legend li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #52606a;
  font-size: 14px;
  line-height: 1.5;
}

.conoce-dicis-calendar-legend__swatch {
  flex: 0 0 10px;
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.conoce-dicis-calendar-selection {
  min-height: 96px;
  margin-top: 24px;
  padding: 22px 24px;
  border: 1px solid #dceaf3;
  border-radius: 12px;
  background: #f7fafc;
}

.conoce-dicis-calendar-selection h3 {
  margin: 0 0 12px;
  color: #073354;
  font-size: 19px;
  text-transform: capitalize;
}

.conoce-dicis-calendar-selection p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
}

.conoce-dicis-calendar-selection__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-calendar-selection__list li {
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  line-height: 1.45;
}

.conoce-dicis-calendar-selection__list a,
.conoce-dicis-calendar-selection__category,
.conoce-dicis-calendar-source-link {
  color: #12648f;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.conoce-dicis-calendar-selection__list a:hover,
.conoce-dicis-calendar-source-link:hover {
  color: #052a45;
  text-decoration: underline;
}

.conoce-dicis-calendar-selection__marker {
  flex: 0 0 9px;
}

.conoce-dicis-calendar-source-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  font-size: 15px;
}

@media (max-width: 760px) {
  .conoce-dicis-calendar-day {
    min-height: 82px;
    gap: 6px;
    padding: 8px 5px;
  }

  .conoce-dicis-calendar-day__labels {
    display: none;
  }

  .conoce-dicis-calendar-day__number {
    font-size: 15px;
  }

  .conoce-dicis-calendar__weekdays span {
    padding: 10px 1px;
    font-size: 10px;
  }
}

@media (max-width: 420px) {
  .conoce-dicis-calendar__toolbar {
    padding: 12px;
  }

  .conoce-dicis-calendar__toolbar h3 {
    font-size: 20px;
  }

  .conoce-dicis-calendar__month-button {
    width: 36px;
    height: 36px;
  }

  .conoce-dicis-calendar-day {
    min-height: 66px;
    padding: 6px 3px;
  }

  .conoce-dicis-calendar-day__dots {
    gap: 3px;
  }

  .conoce-dicis-calendar-day__dots i {
    width: 6px;
    height: 6px;
  }

  .conoce-dicis-calendar-selection__list li {
    grid-template-columns: 12px minmax(0, 1fr);
  }

  .conoce-dicis-calendar-selection__list a,
  .conoce-dicis-calendar-selection__category {
    grid-column: 2;
  }
}
</style>
