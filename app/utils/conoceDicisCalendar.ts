// Fechas académicas, categorías y eventos oficiales usados solo por Conoce DICIS.
export const conoceDicisCalendarSource = 'https://www.ugto.mx/images/pdf/2026/Semestral-DECU.pdf'
export const conoceDicisOfficialEventsCalendar = 'https://www.ugto.mx/calendario'

export const conoceDicisCalendarCategories = {
  inscriptions: { label: 'Inscripciones', color: '#82c84a' },
  classes: { label: 'Inicio de clases', color: '#732b88' },
  administrative: { label: 'Inicio de actividades administrativas', color: '#522477' },
  cancellation: { label: 'Cancelación de inscripción', color: '#20242a' },
  regularization: { label: 'Exámenes de regularización', color: '#4c91d2' },
  teacherEvaluation: { label: 'Evaluación docente', color: '#f1d500' },
  admission: { label: 'Exámenes de admisión', color: '#58d2dc' },
  tutoring: { label: 'Tutoría', color: '#d879b7' },
  finalEvaluation: { label: 'Evaluación final', color: '#ee833b' },
  endClasses: { label: 'Fin de clases', color: '#ed2929' },
  holiday: { label: 'Asueto', color: '#a9aaad' },
  weekendAndVacation: { label: 'Fines de semana y vacaciones', color: '#a9aaad' },
  event: { label: 'Evento oficial UG', color: '#147ca8' },
} as const

export type ConoceDicisCalendarCategory = keyof typeof conoceDicisCalendarCategories

export const conoceDicisAcademicCalendarMarks: Array<{
  id: string
  title: string
  start: string
  end: string
  category: ConoceDicisCalendarCategory
}> = [
  { id: 'inscriptions', title: 'Inscripciones', start: '2026-08-03', end: '2026-08-08', category: 'inscriptions' },
  { id: 'class-start', title: 'Inicio de clases', start: '2026-08-10', end: '2026-08-10', category: 'classes' },
  { id: 'regularization-aug', title: 'Exámenes de regularización', start: '2026-08-31', end: '2026-09-12', category: 'regularization' },
  { id: 'holiday-sep', title: 'Asueto por ley', start: '2026-09-16', end: '2026-09-16', category: 'holiday' },
  { id: 'regularization-oct', title: 'Exámenes de regularización', start: '2026-10-19', end: '2026-10-31', category: 'regularization' },
  { id: 'admission-exams', title: 'Exámenes de admisión', start: '2026-11-03', end: '2026-11-14', category: 'admission' },
  { id: 'cancel-registration', title: 'Cancelación de inscripción', start: '2026-11-05', end: '2026-11-05', category: 'cancellation' },
  { id: 'teacher-evaluation', title: 'Evaluación docente', start: '2026-11-09', end: '2026-11-22', category: 'teacherEvaluation' },
  { id: 'holiday-nov-2', title: 'Asueto por contrato colectivo', start: '2026-11-02', end: '2026-11-02', category: 'holiday' },
  { id: 'holiday-nov-16', title: 'Asueto por ley', start: '2026-11-16', end: '2026-11-16', category: 'holiday' },
  { id: 'tutoring', title: 'Tutoría', start: '2026-11-23', end: '2026-11-27', category: 'tutoring' },
  { id: 'class-end', title: 'Fin de clases', start: '2026-12-04', end: '2026-12-04', category: 'endClasses' },
  { id: 'final-evaluations', title: 'Evaluación final', start: '2026-12-07', end: '2026-12-16', category: 'finalEvaluation' },
  { id: 'holiday-dec-12', title: 'Asueto por contrato colectivo', start: '2026-12-12', end: '2026-12-12', category: 'holiday' },
]

// El calendario semestral fija la última evaluación el 16 de diciembre; el receso posterior se representa hasta fin de año.
export const conoceDicisCalendarVacationPeriods = [
  { id: 'winter-break-2026', title: 'Vacaciones de invierno', start: '2026-12-17', end: '2026-12-31' },
]

export const conoceDicisOfficialEvents = [
  {
    title: 'Toma de Protesta de Mesas Directivas de la Sociedad Estudiantil 2026–2027',
    description: 'La ficha de la UG destaca liderazgo, representación y comunidad.',
    start: '2026-08-28T13:00:00',
    end: '2026-08-28T15:00:00',
    dateLabel: '28 de agosto de 2026',
    timeLabel: '13:00–15:00 h',
    place: 'No indicada en la ficha oficial',
    source: 'https://www.ugto.mx/calendario/institucionales/toma-de-protesta-de-mesas-directivas-de-la-sociedad-estudiantil-2026-2027',
  },
  {
    title: 'De zumbido en zumbido sintoniza tus derechos',
    description: 'Actividad en el marco del Día Internacional de Conmemoración de las Víctimas de Actos de Violencia Motivados por la Religión o las Creencias.',
    start: '2026-08-31T11:00:00',
    end: '2026-08-31T15:00:00',
    dateLabel: '31 de agosto de 2026',
    timeLabel: '11:00–15:00 h',
    place: 'No indicada en la ficha oficial',
    source: 'https://www.ugto.mx/calendario/institucionales/de-zumbido-en-zumbido-sintoniza-tus-derechos',
  },
  {
    title: 'Congreso Internacional por el Día Internacional de la Paz · Jornadas conmemorativas',
    description: 'Jornadas conmemorativas por el Día Internacional de la Paz.',
    start: '2026-09-21T08:00:00',
    end: '2026-09-22T08:00:00',
    dateLabel: '21–22 de septiembre de 2026',
    timeLabel: '21 de septiembre, 08:00 h – 22 de septiembre, 08:00 h',
    place: 'No indicada en la ficha oficial',
    source: 'https://www.ugto.mx/calendario/institucionales/congreso-internacional-por-el-dia-internacional-de-la-paz-jornadas-conmemorativas',
  },
  {
    title: 'XXVI Reunión Internacional de Ciencias Médicas y VI Meeting of the Latin American Regional Society DOHaD',
    description: 'Reunión incluida en la agenda oficial de la UG para el Campus León.',
    start: '2026-10-28',
    end: '2026-10-30',
    dateLabel: '28–30 de octubre de 2026',
    timeLabel: 'Horario no indicado en la ficha oficial',
    place: 'Campus León',
    source: 'https://www.ugto.mx/calendario/campus-br-leon/xxvi-reunion-internacional-de-ciencias-medicas-y-vi-meetin-of-the-latin-american-regional-society-dohad',
  },
]
