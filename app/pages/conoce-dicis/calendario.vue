<script setup lang="ts">
import {
  conoceDicisAcademicCalendarMarks,
  conoceDicisCalendarCategories,
  conoceDicisCalendarFilterGroups,
  conoceDicisCalendarHolidayGroups,
  conoceDicisCalendarHolidayMarks,
  conoceDicisCalendarImportantDateGroups,
  conoceDicisCalendarSocialServiceGroups,
  conoceDicisCalendarSocialServiceMarks,
  conoceDicisCalendarSource,
  conoceDicisCalendarVacationPeriods,
  conoceDicisOfficialEvents,
  type ConoceDicisCalendarCategory,
  type ConoceDicisCalendarMark,
} from '../../utils/conoceDicisCalendar'

useSeoMeta({
  title: 'Calendario académico anual 2026 | Conoce DICIS',
  description: 'Calendario anual 2026 de la Universidad de Guanajuato: fechas académicas, asuetos y periodos de servicio social para Conoce DICIS.',
})

const conoceDicisCalendarYear = 2026
const conoceDicisCalendarMonths = Array.from({ length: 12 }, (_, index) => ({
  value: index,
  label: new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(new Date(conoceDicisCalendarYear, index, 1)),
}))
const conoceDicisCalendarWeekdayHeaders = [
  { short: 'L', full: 'Lunes' },
  { short: 'M', full: 'Martes' },
  { short: 'M', full: 'Miércoles' },
  { short: 'J', full: 'Jueves' },
  { short: 'V', full: 'Viernes' },
  { short: 'S', full: 'Sábado' },
  { short: 'D', full: 'Domingo' },
]

type ConoceDicisCalendarEntry = {
  id: string
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
}

type ConoceDicisCalendarMonth = {
  value: number
  label: string
  cells: ConoceDicisCalendarCell[]
}

const conoceDicisCalendarAllMarks = [
  ...conoceDicisAcademicCalendarMarks,
  ...conoceDicisCalendarSocialServiceMarks,
  ...conoceDicisCalendarHolidayMarks,
]
const conoceDicisCalendarMarkById = new Map(conoceDicisCalendarAllMarks.map(mark => [mark.id, mark]))
const conoceDicisCalendarToday = new Date()
const conoceDicisCalendarTodayDate = toConoceDicisCalendarIsoDate(conoceDicisCalendarToday)
const conoceDicisCalendarInitialDate = conoceDicisCalendarToday.getFullYear() === conoceDicisCalendarYear
  ? conoceDicisCalendarToday
  : new Date(conoceDicisCalendarYear, 0, 1)
const conoceDicisCalendarSelectedDate = ref(toConoceDicisCalendarIsoDate(conoceDicisCalendarInitialDate))
const conoceDicisCalendarActiveFilterIds = ref<string[]>([])
const conoceDicisCalendarSelectedEntryIds = ref<string[]>([])
const conoceDicisCalendarSelectionLabel = ref<string | null>(null)
const conoceDicisCalendarExpandedInfoSections = ref<string[]>([])
const conoceDicisCampusIrapuatoSalamancaEvents = conoceDicisOfficialEvents.filter(event => /campus irapuato[\s-]?salamanca|dicis/i.test(event.place))
const conoceDicisCalendarOfficialEvents = conoceDicisCampusIrapuatoSalamancaEvents.map(event => ({
  ...event,
  id: event.source,
  start: event.start.slice(0, 10),
  end: event.end.slice(0, 10),
}))

const conoceDicisCalendarFilterCategories = computed(() => new Set(
  conoceDicisCalendarFilterGroups
    .filter(group => conoceDicisCalendarActiveFilterIds.value.includes(group.id))
    .flatMap(group => group.categories),
))

const conoceDicisCalendarMonthsWithCells = computed<ConoceDicisCalendarMonth[]>(() => conoceDicisCalendarMonths.map((month) => {
  const firstDay = new Date(conoceDicisCalendarYear, month.value, 1)
  const daysInMonth = new Date(conoceDicisCalendarYear, month.value + 1, 0).getDate()
  const leadingCells = (firstDay.getDay() + 6) % 7
  const cells = Array.from({ length: 42 }, (_, index): ConoceDicisCalendarCell => {
    const day = index - leadingCells + 1
    if (day < 1 || day > daysInMonth) {
      return { key: `empty-${month.value}-${index}`, date: null, day: null, entries: [] }
    }

    const date = toConoceDicisCalendarIsoDate(new Date(conoceDicisCalendarYear, month.value, day))
    const entries: ConoceDicisCalendarEntry[] = conoceDicisCalendarAllMarks
      .filter(mark => date >= mark.start && date <= mark.end)
      .map(mark => ({
        id: mark.id,
        title: mark.title,
        category: mark.category,
        color: conoceDicisCalendarCategories[mark.category].color,
      }))

    const officialEventMatches = conoceDicisCampusIrapuatoSalamancaEvents.filter((event) => {
      const start = event.start.slice(0, 10)
      const end = event.end.slice(0, 10)
      return date >= start && date <= end
    })
    for (const event of officialEventMatches) {
      entries.push({
        id: event.source,
        title: event.title,
        category: 'event',
        color: conoceDicisCalendarCategories.event.color,
        href: event.source,
      })
    }

    const dayOfWeek = new Date(conoceDicisCalendarYear, month.value, day).getDay()
    const vacation = conoceDicisCalendarVacationPeriods.find(period => date >= period.start && date <= period.end)
    if (vacation) {
      entries.push({
        id: vacation.id,
        title: vacation.title,
        category: 'weekendAndVacation',
        color: conoceDicisCalendarCategories.weekendAndVacation.color,
      })
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      entries.push({
        id: `weekend-${date}`,
        title: 'Fin de semana',
        category: 'weekendAndVacation',
        color: conoceDicisCalendarCategories.weekendAndVacation.color,
      })
    }

    return { key: date, date, day, entries }
  })

  return { ...month, cells }
}))

const conoceDicisCalendarSelectedCell = computed(() => conoceDicisCalendarMonthsWithCells.value
  .flatMap(month => month.cells)
  .find(cell => cell.date === conoceDicisCalendarSelectedDate.value) ?? null)

const conoceDicisCalendarImportantGroups = conoceDicisCalendarImportantDateGroups.map(group => ({
  ...group,
  periods: group.markIds
    .map(id => conoceDicisCalendarMarkById.get(id))
    .filter((mark): mark is ConoceDicisCalendarMark => Boolean(mark)),
}))

const conoceDicisCalendarHolidayGroupsWithDates = conoceDicisCalendarHolidayGroups.map(group => ({
  ...group,
  dates: group.markIds
    .map(id => conoceDicisCalendarMarkById.get(id))
    .filter((mark): mark is ConoceDicisCalendarMark => Boolean(mark)),
}))

const conoceDicisCalendarSocialServiceGroupsWithDates = conoceDicisCalendarSocialServiceGroups.map(group => ({
  ...group,
  periods: group.markIds
    .map(id => conoceDicisCalendarMarkById.get(id))
    .filter((mark): mark is ConoceDicisCalendarMark => Boolean(mark)),
}))

function toConoceDicisCalendarIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function formatConoceDicisCalendarDate(date: string) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

function formatConoceDicisCalendarPeriod(mark: Pick<ConoceDicisCalendarMark, 'start' | 'end'>) {
  const formatDayMonth = (date: string) => new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(`${date}T12:00:00`)).replace('.', '')

  if (mark.start === mark.end) return formatDayMonth(mark.start)
  return `${formatDayMonth(mark.start)} – ${formatDayMonth(mark.end)}`
}

function getConoceDicisCalendarBusinessDays(mark: Pick<ConoceDicisCalendarMark, 'start' | 'end'>) {
  const currentDate = new Date(`${mark.start}T12:00:00`)
  const endDate = new Date(`${mark.end}T12:00:00`)
  let businessDays = 0

  while (currentDate <= endDate) {
    const date = toConoceDicisCalendarIsoDate(currentDate)
    const weekday = currentDate.getDay()
    const isOfficialRestDay = conoceDicisCalendarHolidayMarks.some(holiday => date >= holiday.start && date <= holiday.end)

    if (weekday !== 0 && weekday !== 6 && !isOfficialRestDay) businessDays += 1
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return businessDays
}

function formatConoceDicisCalendarBusinessDays(mark: Pick<ConoceDicisCalendarMark, 'start' | 'end'>) {
  const businessDays = getConoceDicisCalendarBusinessDays(mark)
  return `${businessDays} ${businessDays === 1 ? 'día hábil' : 'días hábiles'}`
}

function toggleConoceDicisCalendarInfoSection(sectionId: string) {
  conoceDicisCalendarExpandedInfoSections.value = conoceDicisCalendarExpandedInfoSections.value.includes(sectionId)
    ? []
    : [sectionId]
}

function toggleConoceDicisCalendarFilter(filterId: string) {
  conoceDicisCalendarSelectedEntryIds.value = []
  conoceDicisCalendarSelectionLabel.value = null
  conoceDicisCalendarActiveFilterIds.value = conoceDicisCalendarActiveFilterIds.value.includes(filterId)
    ? conoceDicisCalendarActiveFilterIds.value.filter(activeId => activeId !== filterId)
    : [...conoceDicisCalendarActiveFilterIds.value, filterId]
}

function toggleConoceDicisCalendarMenuSelection(entryIds: string[], label: string, startDate?: string) {
  const isCurrentSelection = entryIds.length === conoceDicisCalendarSelectedEntryIds.value.length
    && entryIds.every(entryId => conoceDicisCalendarSelectedEntryIds.value.includes(entryId))

  if (isCurrentSelection) {
    conoceDicisCalendarSelectedEntryIds.value = []
    conoceDicisCalendarSelectionLabel.value = null
    return
  }

  conoceDicisCalendarActiveFilterIds.value = []
  conoceDicisCalendarSelectedEntryIds.value = entryIds
  conoceDicisCalendarSelectionLabel.value = label
  if (startDate) conoceDicisCalendarSelectedDate.value = startDate
}

function isConoceDicisCalendarMenuSelectionActive(entryIds: string[]) {
  return entryIds.length === conoceDicisCalendarSelectedEntryIds.value.length
    && entryIds.every(entryId => conoceDicisCalendarSelectedEntryIds.value.includes(entryId))
}

function clearConoceDicisCalendarMenuSelection() {
  conoceDicisCalendarSelectedEntryIds.value = []
  conoceDicisCalendarSelectionLabel.value = null
}

function getConoceDicisCalendarVisibleEntries(cell: ConoceDicisCalendarCell) {
  if (conoceDicisCalendarSelectedEntryIds.value.length) {
    return cell.entries.filter(entry => conoceDicisCalendarSelectedEntryIds.value.includes(entry.id))
  }

  return cell.entries.filter(entry => conoceDicisCalendarFilterCategories.value.has(entry.category))
}

function getConoceDicisCalendarCellLabel(cell: ConoceDicisCalendarCell) {
  if (!cell.date) return ''
  const titles = cell.entries.map(entry => entry.title)
  return `${formatConoceDicisCalendarDate(cell.date)}${titles.length ? `: ${titles.join(', ')}` : ': sin actividad oficial registrada'}`
}
</script>

<template>
  <ConoceDicisPageLayout active="calendario">
    <section aria-labelledby="conoce-dicis-calendar-title">
      <div class="conoce-dicis-calendar-heading">
        <p class="conoce-dicis-calendar-eyebrow">Calendario semestral · Universidad de Guanajuato</p>
        <h2 id="conoce-dicis-calendar-title">Calendario académico 2026</h2>
        <p>De enero a diciembre, en el formato anual del calendario de la UG. Selecciona colores o fechas del menú izquierdo para localizarlas; pulsa cualquier día para consultar las actividades que coinciden.</p>
      </div>

      <div class="conoce-dicis-calendar-layout">
        <aside class="conoce-dicis-calendar-information" aria-label="Fechas importantes, asuetos y servicio social" tabindex="0">
          <div
            class="conoce-dicis-calendar-info-panels"
            :class="{ 'conoce-dicis-calendar-info-panels--expanded': conoceDicisCalendarExpandedInfoSections.length > 0 }"
          >
            <section class="conoce-dicis-calendar-info-section" :class="{ 'conoce-dicis-calendar-info-section--expanded': conoceDicisCalendarExpandedInfoSections.includes('important') }">
              <h2>
                <button
                  class="conoce-dicis-calendar-info-toggle"
                  type="button"
                  aria-controls="conoce-dicis-calendar-important-content"
                  :aria-expanded="conoceDicisCalendarExpandedInfoSections.includes('important')"
                  @click="toggleConoceDicisCalendarInfoSection('important')"
                >
                  <span><span class="conoce-dicis-calendar-section-eyebrow">Universidad de Guanajuato · 2026</span>Fechas importantes</span>
                  <span class="conoce-dicis-calendar-info-toggle__chevron" aria-hidden="true" />
                </button>
              </h2>
              <div v-show="conoceDicisCalendarExpandedInfoSections.includes('important')" id="conoce-dicis-calendar-important-content" class="conoce-dicis-calendar-info-content">
                <ul class="conoce-dicis-calendar-info-groups">
                  <li v-for="conoceDicisCalendarGroup in conoceDicisCalendarImportantGroups" :key="conoceDicisCalendarGroup.id">
                    <h3>
                      <button
                        class="conoce-dicis-calendar-info-group-toggle"
                        type="button"
                        :aria-pressed="isConoceDicisCalendarMenuSelectionActive(conoceDicisCalendarGroup.periods.map(period => period.id))"
                        @click="toggleConoceDicisCalendarMenuSelection(conoceDicisCalendarGroup.periods.map(period => period.id), conoceDicisCalendarGroup.title, conoceDicisCalendarGroup.periods[0]?.start)"
                      >
                        {{ conoceDicisCalendarGroup.title }}
                      </button>
                    </h3>
                    <ul>
                      <li v-for="conoceDicisCalendarPeriod in conoceDicisCalendarGroup.periods" :key="conoceDicisCalendarPeriod.id">
                        <button
                          class="conoce-dicis-calendar-info-entry"
                          :class="{ 'conoce-dicis-calendar-info-entry--active': isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarPeriod.id]) }"
                          type="button"
                          :aria-label="`${conoceDicisCalendarGroup.title}: ${formatConoceDicisCalendarPeriod(conoceDicisCalendarPeriod)}`"
                          :aria-pressed="isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarPeriod.id])"
                          @click="toggleConoceDicisCalendarMenuSelection([conoceDicisCalendarPeriod.id], `${conoceDicisCalendarGroup.title}: ${formatConoceDicisCalendarPeriod(conoceDicisCalendarPeriod)}`, conoceDicisCalendarPeriod.start)"
                        >
                          <span class="conoce-dicis-calendar-info-dot" :style="{ '--conoce-dicis-calendar-info-color': conoceDicisCalendarCategories[conoceDicisCalendarPeriod.category].color }" aria-hidden="true" />
                          <span>{{ formatConoceDicisCalendarPeriod(conoceDicisCalendarPeriod) }} · {{ formatConoceDicisCalendarBusinessDays(conoceDicisCalendarPeriod) }}</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li v-if="conoceDicisCalendarOfficialEvents.length">
                    <h3>
                      <button
                        class="conoce-dicis-calendar-info-group-toggle"
                        type="button"
                        :aria-pressed="isConoceDicisCalendarMenuSelectionActive(conoceDicisCalendarOfficialEvents.map(event => event.id))"
                        @click="toggleConoceDicisCalendarMenuSelection(conoceDicisCalendarOfficialEvents.map(event => event.id), 'Eventos oficiales de la UG', conoceDicisCalendarOfficialEvents[0]?.start)"
                      >
                        Eventos oficiales de la UG
                      </button>
                    </h3>
                    <ul>
                      <li v-for="conoceDicisCalendarEvent in conoceDicisCalendarOfficialEvents" :key="conoceDicisCalendarEvent.id">
                        <button
                          class="conoce-dicis-calendar-info-entry"
                          :class="{ 'conoce-dicis-calendar-info-entry--active': isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarEvent.id]) }"
                          type="button"
                          :aria-label="`${conoceDicisCalendarEvent.title}: ${conoceDicisCalendarEvent.dateLabel}`"
                          :aria-pressed="isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarEvent.id])"
                          @click="toggleConoceDicisCalendarMenuSelection([conoceDicisCalendarEvent.id], conoceDicisCalendarEvent.title, conoceDicisCalendarEvent.start)"
                        >
                          <span class="conoce-dicis-calendar-info-dot" :style="{ '--conoce-dicis-calendar-info-color': conoceDicisCalendarCategories.event.color }" aria-hidden="true" />
                          <span>{{ conoceDicisCalendarEvent.dateLabel }} · {{ formatConoceDicisCalendarBusinessDays(conoceDicisCalendarEvent) }}</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>

            <section class="conoce-dicis-calendar-info-section" :class="{ 'conoce-dicis-calendar-info-section--expanded': conoceDicisCalendarExpandedInfoSections.includes('holidays') }">
              <h2>
                <button
                  class="conoce-dicis-calendar-info-toggle"
                  type="button"
                  aria-controls="conoce-dicis-calendar-holidays-content"
                  :aria-expanded="conoceDicisCalendarExpandedInfoSections.includes('holidays')"
                  @click="toggleConoceDicisCalendarInfoSection('holidays')"
                >
                  <span><span class="conoce-dicis-calendar-section-eyebrow">Días de asueto</span>Descansos oficiales</span>
                  <span class="conoce-dicis-calendar-info-toggle__chevron" aria-hidden="true" />
                </button>
              </h2>
              <div v-show="conoceDicisCalendarExpandedInfoSections.includes('holidays')" id="conoce-dicis-calendar-holidays-content" class="conoce-dicis-calendar-info-content">
                <ul class="conoce-dicis-calendar-info-groups">
                  <li v-for="conoceDicisCalendarGroup in conoceDicisCalendarHolidayGroupsWithDates" :key="conoceDicisCalendarGroup.id">
                    <h3>
                      <button
                        class="conoce-dicis-calendar-info-group-toggle"
                        type="button"
                        :aria-pressed="isConoceDicisCalendarMenuSelectionActive(conoceDicisCalendarGroup.dates.map(date => date.id))"
                        @click="toggleConoceDicisCalendarMenuSelection(conoceDicisCalendarGroup.dates.map(date => date.id), conoceDicisCalendarGroup.title, conoceDicisCalendarGroup.dates[0]?.start)"
                      >
                        {{ conoceDicisCalendarGroup.title }}
                      </button>
                    </h3>
                    <ul>
                      <li v-for="conoceDicisCalendarHoliday in conoceDicisCalendarGroup.dates" :key="conoceDicisCalendarHoliday.id">
                        <button
                          class="conoce-dicis-calendar-info-entry"
                          :class="{ 'conoce-dicis-calendar-info-entry--active': isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarHoliday.id]) }"
                          type="button"
                          :aria-label="`${conoceDicisCalendarHoliday.title}: ${formatConoceDicisCalendarPeriod(conoceDicisCalendarHoliday)}`"
                          :aria-pressed="isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarHoliday.id])"
                          @click="toggleConoceDicisCalendarMenuSelection([conoceDicisCalendarHoliday.id], conoceDicisCalendarHoliday.title, conoceDicisCalendarHoliday.start)"
                        >
                          <span class="conoce-dicis-calendar-info-dot" :style="{ '--conoce-dicis-calendar-info-color': conoceDicisCalendarCategories.holiday.color }" aria-hidden="true" />
                          <span>{{ formatConoceDicisCalendarPeriod(conoceDicisCalendarHoliday) }} · {{ conoceDicisCalendarHoliday.title.split(' · ').at(-1) }} · {{ formatConoceDicisCalendarBusinessDays(conoceDicisCalendarHoliday) }}</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>

            <section class="conoce-dicis-calendar-info-section" :class="{ 'conoce-dicis-calendar-info-section--expanded': conoceDicisCalendarExpandedInfoSections.includes('social') }">
              <h2>
                <button
                  class="conoce-dicis-calendar-info-toggle"
                  type="button"
                  aria-controls="conoce-dicis-calendar-social-content"
                  :aria-expanded="conoceDicisCalendarExpandedInfoSections.includes('social')"
                  @click="toggleConoceDicisCalendarInfoSection('social')"
                >
                  <span><span class="conoce-dicis-calendar-section-eyebrow">Periodos 2026</span>Servicio social</span>
                  <span class="conoce-dicis-calendar-info-toggle__chevron" aria-hidden="true" />
                </button>
              </h2>
              <div v-show="conoceDicisCalendarExpandedInfoSections.includes('social')" id="conoce-dicis-calendar-social-content" class="conoce-dicis-calendar-info-content">
                <ul class="conoce-dicis-calendar-info-groups conoce-dicis-calendar-info-groups--social">
                  <li v-for="conoceDicisCalendarGroup in conoceDicisCalendarSocialServiceGroupsWithDates" :key="conoceDicisCalendarGroup.id">
                    <h3>
                      <button
                        class="conoce-dicis-calendar-info-group-toggle"
                        type="button"
                        :aria-pressed="isConoceDicisCalendarMenuSelectionActive(conoceDicisCalendarGroup.periods.map(period => period.id))"
                        @click="toggleConoceDicisCalendarMenuSelection(conoceDicisCalendarGroup.periods.map(period => period.id), conoceDicisCalendarGroup.title, conoceDicisCalendarGroup.periods[0]?.start)"
                      >
                        {{ conoceDicisCalendarGroup.title }}
                      </button>
                    </h3>
                    <ul>
                      <li v-for="conoceDicisCalendarPeriod in conoceDicisCalendarGroup.periods" :key="conoceDicisCalendarPeriod.id">
                        <button
                          class="conoce-dicis-calendar-info-entry"
                          :class="{ 'conoce-dicis-calendar-info-entry--active': isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarPeriod.id]) }"
                          type="button"
                          :aria-label="`${conoceDicisCalendarGroup.title}: ${conoceDicisCalendarPeriod.title.split(' · ').at(-1)}`"
                          :aria-pressed="isConoceDicisCalendarMenuSelectionActive([conoceDicisCalendarPeriod.id])"
                          @click="toggleConoceDicisCalendarMenuSelection([conoceDicisCalendarPeriod.id], `${conoceDicisCalendarGroup.title}: ${conoceDicisCalendarPeriod.title.split(' · ').at(-1)}`, conoceDicisCalendarPeriod.start)"
                        >
                          <span class="conoce-dicis-calendar-info-dot" :style="{ '--conoce-dicis-calendar-info-color': conoceDicisCalendarCategories.socialService.color }" aria-hidden="true" />
                          <span>{{ conoceDicisCalendarPeriod.title.split(' · ').at(-1) }}: {{ formatConoceDicisCalendarPeriod(conoceDicisCalendarPeriod) }} · {{ formatConoceDicisCalendarBusinessDays(conoceDicisCalendarPeriod) }}</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
            <p class="conoce-dicis-calendar-business-days-note">Días hábiles calculados de lunes a viernes, descontando los asuetos incluidos en este calendario.</p>
          </div>

          <section class="conoce-dicis-calendar-note conoce-dicis-calendar-note--sidebar" aria-live="polite" aria-atomic="true">
            <div class="conoce-dicis-calendar-note__pin" aria-hidden="true" />
            <div class="conoce-dicis-calendar-note__content">
              <p class="conoce-dicis-calendar-section-eyebrow">Actividad del día seleccionado</p>
              <h3 v-if="conoceDicisCalendarSelectedDate">{{ formatConoceDicisCalendarDate(conoceDicisCalendarSelectedDate) }}</h3>
              <ul v-if="conoceDicisCalendarSelectedCell?.entries.length" class="conoce-dicis-calendar-note__list">
                <li v-for="conoceDicisCalendarEntry in conoceDicisCalendarSelectedCell.entries" :key="conoceDicisCalendarEntry.id">
                  <span class="conoce-dicis-calendar-note__marker" :style="{ '--conoce-dicis-calendar-entry-color': conoceDicisCalendarEntry.color }" aria-hidden="true" />
                  <span class="conoce-dicis-calendar-note__title">{{ conoceDicisCalendarEntry.title }}</span>
                  <a v-if="conoceDicisCalendarEntry.href" :href="conoceDicisCalendarEntry.href" target="_blank" rel="noopener noreferrer">Ficha UG ↗</a>
                  <span v-else class="conoce-dicis-calendar-note__category">{{ conoceDicisCalendarCategories[conoceDicisCalendarEntry.category].label }}</span>
                </li>
              </ul>
              <p v-else class="conoce-dicis-calendar-note__empty">No hay actividades oficiales registradas para este día.</p>
            </div>
          </section>
        </aside>

        <div class="conoce-dicis-calendar-column">
          <section class="conoce-dicis-calendar-filters" aria-labelledby="conoce-dicis-calendar-filters-title">
            <div class="conoce-dicis-calendar-filters__heading">
              <div>
                <p class="conoce-dicis-calendar-section-eyebrow">Explora por color</p>
                <h3 id="conoce-dicis-calendar-filters-title">Filtrar fechas</h3>
              </div>
              <button
                v-if="conoceDicisCalendarActiveFilterIds.length"
                class="conoce-dicis-calendar-filters__clear"
                type="button"
                @click="conoceDicisCalendarActiveFilterIds = []"
              >
                Limpiar filtros
              </button>
            </div>
            <div class="conoce-dicis-calendar-filters__list">
              <button
                v-for="conoceDicisCalendarFilter in conoceDicisCalendarFilterGroups"
                :key="conoceDicisCalendarFilter.id"
                class="conoce-dicis-calendar-filter"
                :class="{ 'conoce-dicis-calendar-filter--active': conoceDicisCalendarActiveFilterIds.includes(conoceDicisCalendarFilter.id) }"
                :style="{ '--conoce-dicis-calendar-filter-color': conoceDicisCalendarFilter.color }"
                type="button"
                :aria-pressed="conoceDicisCalendarActiveFilterIds.includes(conoceDicisCalendarFilter.id)"
                @click="toggleConoceDicisCalendarFilter(conoceDicisCalendarFilter.id)"
              >
                <span class="conoce-dicis-calendar-filter__swatch" aria-hidden="true" />
                {{ conoceDicisCalendarFilter.label }}
              </button>
            </div>
            <p class="conoce-dicis-calendar-filters__hint">Puedes activar varios colores o elegir una fecha específica desde el menú izquierdo. Sin selección, el calendario queda en blanco.</p>
          </section>

          <section v-if="conoceDicisCalendarSelectionLabel" class="conoce-dicis-calendar-menu-selection" aria-live="polite" aria-atomic="true">
            <div>
              <p class="conoce-dicis-calendar-section-eyebrow">Fechas mostradas desde el menú izquierdo</p>
              <strong>{{ conoceDicisCalendarSelectionLabel }}</strong>
            </div>
            <button class="conoce-dicis-calendar-filters__clear" type="button" @click="clearConoceDicisCalendarMenuSelection">
              Quitar selección
            </button>
          </section>

          <section class="conoce-dicis-calendar" aria-label="Calendario anual de actividades de Conoce DICIS">
            <header class="conoce-dicis-calendar__toolbar">
              <h3>2026</h3>
            </header>

            <div class="conoce-dicis-calendar__months">
              <section
                v-for="conoceDicisCalendarMonth in conoceDicisCalendarMonthsWithCells"
                :key="conoceDicisCalendarMonth.value"
                class="conoce-dicis-calendar-month"
                :aria-label="`${conoceDicisCalendarMonth.label} de 2026`"
              >
                <h3>{{ conoceDicisCalendarMonth.label }}</h3>
                <div class="conoce-dicis-calendar-month__weekdays" aria-hidden="true">
                  <span v-for="conoceDicisCalendarWeekday in conoceDicisCalendarWeekdayHeaders" :key="conoceDicisCalendarWeekday.full" :title="conoceDicisCalendarWeekday.full">
                    {{ conoceDicisCalendarWeekday.short }}
                  </span>
                </div>
                <div class="conoce-dicis-calendar-month__grid" role="grid" :aria-label="`${conoceDicisCalendarMonth.label} de 2026`">
                  <template v-for="conoceDicisCalendarCell in conoceDicisCalendarMonth.cells" :key="conoceDicisCalendarCell.key">
                    <button
                      v-if="conoceDicisCalendarCell.date"
                      type="button"
                      role="gridcell"
                      class="conoce-dicis-calendar-day"
                      :class="{
                        'conoce-dicis-calendar-day--filtered': getConoceDicisCalendarVisibleEntries(conoceDicisCalendarCell).length > 0,
                        'conoce-dicis-calendar-day--selected': conoceDicisCalendarSelectedDate === conoceDicisCalendarCell.date,
                        'conoce-dicis-calendar-day--today': conoceDicisCalendarCell.date === conoceDicisCalendarTodayDate,
                      }"
                      :style="getConoceDicisCalendarVisibleEntries(conoceDicisCalendarCell).length ? { '--conoce-dicis-calendar-day-accent': getConoceDicisCalendarVisibleEntries(conoceDicisCalendarCell)[0]!.color } : undefined"
                      :aria-label="getConoceDicisCalendarCellLabel(conoceDicisCalendarCell)"
                      :aria-pressed="conoceDicisCalendarSelectedDate === conoceDicisCalendarCell.date"
                      :aria-current="conoceDicisCalendarCell.date === conoceDicisCalendarTodayDate ? 'date' : undefined"
                      @click="conoceDicisCalendarSelectedDate = conoceDicisCalendarCell.date!"
                    >
                      <span class="conoce-dicis-calendar-day__number">{{ conoceDicisCalendarCell.day }}</span>
                      <span v-if="getConoceDicisCalendarVisibleEntries(conoceDicisCalendarCell).length" class="conoce-dicis-calendar-day__dots" aria-hidden="true">
                        <i
                          v-for="conoceDicisCalendarEntry in getConoceDicisCalendarVisibleEntries(conoceDicisCalendarCell).slice(0, 3)"
                          :key="conoceDicisCalendarEntry.id"
                          :style="{ '--conoce-dicis-calendar-entry-color': conoceDicisCalendarEntry.color }"
                        />
                      </span>
                    </button>
                    <span v-else class="conoce-dicis-calendar-day conoce-dicis-calendar-day--empty" aria-hidden="true" />
                  </template>
                </div>
              </section>
            </div>
          </section>

          <a class="conoce-dicis-calendar-source-link" :href="conoceDicisCalendarSource" target="_blank" rel="noopener noreferrer">
            Consultar calendario académico oficial de la UG <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  </ConoceDicisPageLayout>
</template>

<style scoped>
.conoce-dicis-calendar-heading {
  margin: 0 0 30px;
}

.conoce-dicis-calendar-eyebrow,
.conoce-dicis-calendar-section-eyebrow {
  margin: 0 0 7px;
  color: #176b9a;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .1em;
  line-height: 1.4;
  text-transform: uppercase;
}

.conoce-dicis-calendar-heading h2 {
  margin: 0;
  color: #073354;
  font-size: clamp(30px, 3.3vw, 44px);
  letter-spacing: -.035em;
  line-height: 1.08;
}

.conoce-dicis-calendar-heading > p:last-child {
  max-width: 1000px;
  margin: 12px 0 0;
  color: #52606a;
  font-size: 16px;
  line-height: 1.6;
}

.conoce-dicis-calendar-layout {
  display: grid;
  grid-template-columns: minmax(280px, .78fr) minmax(0, 1.8fr);
  align-items: start;
  gap: clamp(22px, 2.5vw, 40px);
}

.conoce-dicis-calendar-column {
  min-width: 0;
  grid-column: 2;
  grid-row: 1;
}

.conoce-dicis-calendar {
  overflow: hidden;
  border: 1px solid #dce7ee;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(7 51 84 / 5%);
}

.conoce-dicis-calendar__toolbar {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background: #f4f9fc;
  color: #176b9a;
}

.conoce-dicis-calendar__toolbar h3 {
  margin: 0;
  color: #073354;
  font-size: 32px;
  font-variant-numeric: tabular-nums;
  letter-spacing: -.02em;
}

.conoce-dicis-calendar__months {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  padding: 2px 14px 14px;
}

.conoce-dicis-calendar-month {
  min-width: 0;
  padding: 14px 10px 13px;
  border-bottom: 1px solid #e5edf2;
}

.conoce-dicis-calendar-month h3 {
  margin: 0 0 8px;
  color: #073354;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.3;
  text-align: center;
  text-transform: capitalize;
}

.conoce-dicis-calendar-month__weekdays,
.conoce-dicis-calendar-month__grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.conoce-dicis-calendar-month__weekdays {
  border-bottom: 1px solid #e2eaf0;
}

.conoce-dicis-calendar-month__weekdays span {
  padding: 5px 0;
  color: #607583;
  font-size: 10px;
  font-weight: 800;
  text-align: center;
}

.conoce-dicis-calendar-month__grid {
  gap: 1px;
  background: #edf1f4;
}

.conoce-dicis-calendar-day {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  padding: 2px 1px;
  border: 0;
  border-radius: 0;
  background: #fff;
  color: #073354;
  cursor: pointer;
}

.conoce-dicis-calendar-day:hover {
  background: #f0f7fb;
}

.conoce-dicis-calendar-day--filtered {
  box-shadow: inset 0 3px 0 var(--conoce-dicis-calendar-day-accent);
  background: color-mix(in srgb, var(--conoce-dicis-calendar-day-accent) 17%, white);
}

.conoce-dicis-calendar-day--filtered:hover {
  background: color-mix(in srgb, var(--conoce-dicis-calendar-day-accent) 24%, white);
}

.conoce-dicis-calendar-day--selected {
  z-index: 1;
  outline: 2px solid #147ca8;
  outline-offset: -2px;
}

.conoce-dicis-calendar-day--today {
  z-index: 2;
  outline: 2px solid #111;
  outline-offset: -2px;
}

.conoce-dicis-calendar-day--empty {
  background: #fff;
  cursor: default;
}

.conoce-dicis-calendar-day__number {
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.conoce-dicis-calendar-day__dots {
  position: absolute;
  right: 2px;
  bottom: 2px;
  display: flex;
  gap: 2px;
}

.conoce-dicis-calendar-day__dots i,
.conoce-dicis-calendar-filter__swatch,
.conoce-dicis-calendar-note__marker,
.conoce-dicis-calendar-info-dot {
  display: block;
  flex: 0 0 auto;
  background: var(--conoce-dicis-calendar-entry-color, var(--conoce-dicis-calendar-filter-color, var(--conoce-dicis-calendar-info-color)));
}

.conoce-dicis-calendar-day__dots i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.conoce-dicis-calendar-filters {
  margin: 0 0 20px;
  padding: 20px;
  border: 1px solid #dce7ee;
  border-radius: 13px;
  background: #f9fbfc;
}

.conoce-dicis-calendar-filters__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 15px;
}

.conoce-dicis-calendar-filters h3,
.conoce-dicis-calendar-info-section h2 {
  margin: 0;
  color: #073354;
  font-size: 22px;
  letter-spacing: -.02em;
  line-height: 1.2;
}

.conoce-dicis-calendar-filters__clear {
  padding: 7px 10px;
  border: 1px solid #c6d8e3;
  border-radius: 7px;
  background: #fff;
  color: #12648f;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.conoce-dicis-calendar-filters__clear:hover {
  border-color: #147ca8;
  background: #f0f7fb;
}

.conoce-dicis-calendar-filters__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.conoce-dicis-calendar-filter {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  border: 1px solid #d5e0e6;
  border-radius: 999px;
  background: #fff;
  color: #405a6b;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
}

.conoce-dicis-calendar-filter--active {
  border-color: var(--conoce-dicis-calendar-filter-color);
  background: color-mix(in srgb, var(--conoce-dicis-calendar-filter-color) 13%, white);
  box-shadow: 0 0 0 1px var(--conoce-dicis-calendar-filter-color) inset;
  color: #073354;
}

.conoce-dicis-calendar-filter__swatch {
  width: 11px;
  height: 11px;
  border-radius: 3px;
}

.conoce-dicis-calendar-filters__hint {
  margin: 12px 0 0;
  color: #657884;
  font-size: 12px;
  line-height: 1.45;
}

.conoce-dicis-calendar-menu-selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 0 0 20px;
  padding: 14px 17px;
  border: 1px solid #c8dce8;
  border-left: 4px solid #147ca8;
  border-radius: 10px;
  background: #f4f9fc;
  color: #073354;
}

.conoce-dicis-calendar-menu-selection .conoce-dicis-calendar-section-eyebrow {
  margin-bottom: 4px;
  font-size: 9px;
}

.conoce-dicis-calendar-menu-selection strong {
  font-size: 14px;
  line-height: 1.4;
}

.conoce-dicis-calendar-note {
  position: relative;
  display: flex;
  gap: 14px;
  margin-top: 20px;
  padding: 20px 22px;
  border: 1px solid #d8e5ed;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 5px 18px rgb(7 51 84 / 5%);
}

.conoce-dicis-calendar-information .conoce-dicis-calendar-note--sidebar {
  min-width: 0;
  min-height: 120px;
  flex: 0 0 auto;
  gap: 9px;
  margin: 0;
  padding: 12px;
  overflow: visible;
}

.conoce-dicis-calendar-info-panels {
  display: flex;
  height: auto;
  min-height: 0;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.conoce-dicis-calendar-info-panels--expanded {
  height: min(600px, calc(100vh - 100px));
  min-height: 480px;
}

.conoce-dicis-calendar-note--sidebar .conoce-dicis-calendar-note__pin {
  min-height: 42px;
}

.conoce-dicis-calendar-note--sidebar .conoce-dicis-calendar-section-eyebrow {
  margin-bottom: 4px;
}

.conoce-dicis-calendar-note--sidebar h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.conoce-dicis-calendar-note--sidebar .conoce-dicis-calendar-note__empty {
  font-size: 12px;
}

.conoce-dicis-calendar-note--sidebar .conoce-dicis-calendar-note__list {
  gap: 6px;
}

.conoce-dicis-calendar-note--sidebar .conoce-dicis-calendar-note__list li {
  grid-template-columns: 8px minmax(0, 1fr);
  align-items: start;
  gap: 3px 7px;
  font-size: 11px;
}

.conoce-dicis-calendar-note--sidebar .conoce-dicis-calendar-note__category,
.conoce-dicis-calendar-note--sidebar .conoce-dicis-calendar-note__list a {
  grid-column: 2;
  font-size: 10px;
}

.conoce-dicis-calendar-note__pin {
  width: 4px;
  min-height: 52px;
  flex: 0 0 4px;
  border-radius: 9px;
  background: #147ca8;
}

.conoce-dicis-calendar-note__content {
  min-width: 0;
  flex: 1;
}

.conoce-dicis-calendar-note h3 {
  margin: 0 0 12px;
  color: #073354;
  font-size: 19px;
  line-height: 1.35;
  text-transform: capitalize;
}

.conoce-dicis-calendar-note__empty {
  margin: 0;
  color: #52606a;
  font-size: 14px;
  line-height: 1.5;
}

.conoce-dicis-calendar-note__list {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-calendar-note__list li {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  color: #405a6b;
  font-size: 13px;
  line-height: 1.45;
}

.conoce-dicis-calendar-note__marker {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}

.conoce-dicis-calendar-note__title {
  min-width: 0;
}

.conoce-dicis-calendar-note__category,
.conoce-dicis-calendar-note__list a,
.conoce-dicis-calendar-source-link {
  color: #12648f;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.conoce-dicis-calendar-note__list a:hover,
.conoce-dicis-calendar-source-link:hover {
  color: #052a45;
  text-decoration: underline;
}

.conoce-dicis-calendar-source-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  font-size: 14px;
}

.conoce-dicis-calendar-information {
  position: sticky;
  top: 88px;
  display: flex;
  height: auto;
  flex-direction: column;
  grid-column: 1;
  grid-row: 1;
  gap: 12px;
  align-self: start;
  min-height: 0;
  overflow: visible;
}

.conoce-dicis-calendar-information:focus-visible {
  outline: 3px solid #147ca8;
  outline-offset: 2px;
}

.conoce-dicis-calendar-info-section {
  display: flex;
  height: 76px;
  min-height: 76px;
  flex-direction: column;
  flex: 0 0 76px;
  min-width: 0;
  border: 1px solid #dce7ee;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 6px 18px rgb(7 51 84 / 4%);
  overflow: hidden;
}

.conoce-dicis-calendar-info-section--expanded {
  height: auto;
  min-height: 76px;
  flex: 1 1 0;
}

.conoce-dicis-calendar-info-section h2 {
  flex: 0 0 auto;
  margin: 0;
}

.conoce-dicis-calendar-info-toggle {
  display: flex;
  width: 100%;
  min-height: 76px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 17px;
  border: 0;
  background: #fff;
  color: #073354;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.conoce-dicis-calendar-info-toggle:hover,
.conoce-dicis-calendar-info-toggle[aria-expanded='true'] {
  background: #f4f9fc;
}

.conoce-dicis-calendar-info-toggle:focus-visible {
  position: relative;
  z-index: 1;
  outline: 3px solid #147ca8;
  outline-offset: -3px;
}

.conoce-dicis-calendar-info-toggle > span:first-child {
  min-width: 0;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -.02em;
  line-height: 1.25;
}

.conoce-dicis-calendar-info-toggle .conoce-dicis-calendar-section-eyebrow {
  display: block;
  margin-bottom: 5px;
  font-size: 9px;
}

.conoce-dicis-calendar-info-toggle__chevron {
  width: 9px;
  height: 9px;
  flex: 0 0 9px;
  transform: rotate(45deg) translate(-2px, -2px);
  border-right: 2px solid #176b9a;
  border-bottom: 2px solid #176b9a;
  transition: transform 150ms ease;
}

.conoce-dicis-calendar-info-toggle[aria-expanded='true'] .conoce-dicis-calendar-info-toggle__chevron {
  transform: rotate(225deg) translate(-2px, -2px);
}

.conoce-dicis-calendar-info-content {
  min-height: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0 8px 12px 17px;
  scrollbar-color: #176b9a #e4eef4;
  scrollbar-gutter: stable;
  scrollbar-width: auto;
}

.conoce-dicis-calendar-info-content::-webkit-scrollbar {
  width: 10px;
}

.conoce-dicis-calendar-info-content::-webkit-scrollbar-track {
  border-radius: 8px;
  background: #e4eef4;
}

.conoce-dicis-calendar-info-content::-webkit-scrollbar-thumb {
  border: 2px solid #e4eef4;
  border-radius: 8px;
  background: #176b9a;
}

.conoce-dicis-calendar-business-days-note {
  flex: 0 0 auto;
  margin: 0 4px 4px;
  color: #657884;
  font-size: 11px;
  line-height: 1.5;
}

.conoce-dicis-calendar-info-groups,
.conoce-dicis-calendar-info-groups ul {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-calendar-info-groups > li {
  padding-top: 11px;
  border-top: 1px solid #edf1f4;
}

.conoce-dicis-calendar-info-groups > li:first-child {
  padding-top: 0;
  border-top: 0;
}

.conoce-dicis-calendar-info-groups h3 {
  margin: 0 0 6px;
  color: #304c5f;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.4;
}

.conoce-dicis-calendar-info-group-toggle {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.conoce-dicis-calendar-info-group-toggle:hover,
.conoce-dicis-calendar-info-group-toggle[aria-pressed='true'] {
  color: #12648f;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.conoce-dicis-calendar-info-groups ul {
  gap: 5px;
}

.conoce-dicis-calendar-info-groups ul li {
  display: block;
}

.conoce-dicis-calendar-info-entry {
  display: grid;
  width: 100%;
  grid-template-columns: 8px minmax(0, 1fr);
  align-items: start;
  gap: 7px;
  padding: 3px 5px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #647682;
  font: inherit;
  font-size: 12px;
  line-height: 1.45;
  text-align: left;
  cursor: pointer;
}

.conoce-dicis-calendar-info-entry:hover,
.conoce-dicis-calendar-info-entry--active {
  background: #f0f7fb;
  color: #073354;
}

.conoce-dicis-calendar-info-entry--active {
  box-shadow: inset 3px 0 0 #147ca8;
}

.conoce-dicis-calendar-info-group-toggle:focus-visible,
.conoce-dicis-calendar-info-entry:focus-visible {
  outline: 2px solid #147ca8;
  outline-offset: 2px;
}

.conoce-dicis-calendar-info-dot {
  width: 7px;
  height: 7px;
  margin-top: 4px;
  border-radius: 2px;
}

.conoce-dicis-calendar-info-groups--social {
  gap: 15px;
}

@media (max-width: 1050px) {
  .conoce-dicis-calendar-layout {
    grid-template-columns: minmax(250px, .8fr) minmax(0, 1.45fr);
    gap: 20px;
  }

  .conoce-dicis-calendar__months {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 800px) {
  .conoce-dicis-calendar-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .conoce-dicis-calendar-information {
    position: static;
    height: auto;
    min-height: 0;
    grid-column: 1;
    grid-row: 2;
  }

  .conoce-dicis-calendar-info-panels--expanded {
    height: min(580px, calc(100vh - 100px));
    min-height: 480px;
  }

  .conoce-dicis-calendar-column {
    grid-column: 1;
    grid-row: 1;
  }
}

@media (min-width: 801px) and (max-height: 860px) {
  .conoce-dicis-calendar-information {
    position: static;
  }
}

@media (max-width: 560px) {
  .conoce-dicis-calendar-heading > p:last-child {
    font-size: 14px;
  }

  .conoce-dicis-calendar__toolbar {
    min-height: 54px;
    padding: 10px 14px;
  }

  .conoce-dicis-calendar__toolbar h3 {
    font-size: 26px;
  }

  .conoce-dicis-calendar__months {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-inline: 5px;
  }

  .conoce-dicis-calendar-month {
    padding: 11px 4px;
  }

  .conoce-dicis-calendar-month h3 {
    font-size: 13px;
  }

  .conoce-dicis-calendar-day {
    min-height: 27px;
  }

  .conoce-dicis-calendar-day__number {
    font-size: 10px;
  }

  .conoce-dicis-calendar-filters {
    padding: 16px;
  }

  .conoce-dicis-calendar-menu-selection {
    align-items: flex-start;
    flex-direction: column;
    padding: 14px;
  }

  .conoce-dicis-calendar-info-toggle {
    min-height: 68px;
    padding: 13px 15px;
  }

  .conoce-dicis-calendar-info-content {
    padding: 0 15px 15px;
  }

  .conoce-dicis-calendar-note {
    padding: 17px;
  }

  .conoce-dicis-calendar-note__list li {
    grid-template-columns: 10px minmax(0, 1fr);
  }

  .conoce-dicis-calendar-note__category,
  .conoce-dicis-calendar-note__list a {
    grid-column: 2;
  }
}

@media (max-width: 360px) {
  .conoce-dicis-calendar__months {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .conoce-dicis-calendar-filter,
  .conoce-dicis-calendar-info-toggle__chevron {
    transition: none;
  }
}
</style>
