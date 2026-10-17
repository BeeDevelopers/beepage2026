// Fechas, colores y fuentes del calendario anual de Conoce DICIS.
export const conoceDicisCalendarSource = 'https://www.ugto.mx/images/pdf/2026/Semestral-DECU.pdf'
export const conoceDicisOfficialEventsCalendar = 'https://www.ugto.mx/calendario'

export const conoceDicisCalendarCategories = {
  inscriptions: { label: 'Inscripciones', color: '#82c84a' },
  classes: { label: 'Inicio de clases', color: '#732b88' },
  administrative: { label: 'Fechas administrativas', color: '#522477' },
  cancellation: { label: 'Cancelación de inscripción', color: '#20242a' },
  regularization: { label: 'Exámenes de regularización', color: '#4c91d2' },
  teacherEvaluation: { label: 'Evaluación docente', color: '#f1d500' },
  admission: { label: 'Exámenes de admisión', color: '#58d2dc' },
  tutoring: { label: 'Tutoría', color: '#d879b7' },
  finalEvaluation: { label: 'Evaluación final', color: '#ee833b' },
  endClasses: { label: 'Fin de clases', color: '#ed2929' },
  holiday: { label: 'Asueto', color: '#a9aaad' },
  weekendAndVacation: { label: 'Fines de semana y vacaciones', color: '#a9aaad' },
  socialService: { label: 'Servicio social', color: '#147ca8' },
  event: { label: 'Evento oficial UG', color: '#147ca8' },
} as const

export type ConoceDicisCalendarCategory = keyof typeof conoceDicisCalendarCategories

export type ConoceDicisCalendarMark = {
  id: string
  title: string
  start: string
  end: string
  category: ConoceDicisCalendarCategory
}

// Los rangos y fechas se transcriben del calendario semestral oficial 2026.
export const conoceDicisAcademicCalendarMarks: ConoceDicisCalendarMark[] = [
  { id: 'inscriptions-jan', title: 'Inscripciones', start: '2026-01-12', end: '2026-01-17', category: 'inscriptions' },
  { id: 'inscriptions-aug', title: 'Inscripciones', start: '2026-08-03', end: '2026-08-08', category: 'inscriptions' },

  { id: 'classes-start-jan', title: 'Inicio de clases', start: '2026-01-19', end: '2026-01-19', category: 'classes' },
  { id: 'classes-start-aug', title: 'Inicio de clases', start: '2026-08-10', end: '2026-08-10', category: 'classes' },
  { id: 'classes-end-may', title: 'Fin de clases', start: '2026-05-29', end: '2026-05-29', category: 'endClasses' },
  { id: 'classes-end-dec', title: 'Fin de clases', start: '2026-12-04', end: '2026-12-04', category: 'endClasses' },

  { id: 'units-high-jan', title: 'Alta de unidades de aprendizaje', start: '2026-01-19', end: '2026-01-23', category: 'administrative' },
  { id: 'units-high-aug', title: 'Alta de unidades de aprendizaje', start: '2026-08-10', end: '2026-08-14', category: 'administrative' },
  { id: 'units-drop-jan', title: 'Baja de unidades de aprendizaje', start: '2026-01-19', end: '2026-03-19', category: 'administrative' },
  { id: 'units-drop-aug', title: 'Baja de unidades de aprendizaje', start: '2026-08-10', end: '2026-10-09', category: 'administrative' },
  { id: 'late-registration-jan', title: 'Inscripciones extemporáneas', start: '2026-01-19', end: '2026-03-19', category: 'administrative' },
  { id: 'late-registration-aug', title: 'Inscripciones extemporáneas', start: '2026-08-10', end: '2026-10-09', category: 'administrative' },
  { id: 'extensions-jan', title: 'Prórrogas', start: '2026-01-19', end: '2026-04-29', category: 'administrative' },
  { id: 'extensions-aug', title: 'Prórrogas', start: '2026-08-10', end: '2026-11-04', category: 'administrative' },
  { id: 'cancel-registration-apr', title: 'Cancelación de inscripción', start: '2026-04-30', end: '2026-04-30', category: 'cancellation' },
  { id: 'cancel-registration-nov', title: 'Cancelación de inscripción', start: '2026-11-05', end: '2026-11-05', category: 'cancellation' },

  { id: 'regularization-feb', title: 'Exámenes de regularización', start: '2026-02-03', end: '2026-02-14', category: 'regularization' },
  { id: 'regularization-mar', title: 'Exámenes de regularización', start: '2026-03-17', end: '2026-03-21', category: 'regularization' },
  { id: 'regularization-jun', title: 'Exámenes de regularización', start: '2026-06-15', end: '2026-06-27', category: 'regularization' },
  { id: 'regularization-aug', title: 'Exámenes de regularización', start: '2026-08-31', end: '2026-09-12', category: 'regularization' },
  { id: 'regularization-oct', title: 'Exámenes de regularización', start: '2026-10-19', end: '2026-10-31', category: 'regularization' },
  { id: 'teacher-evaluation-may', title: 'Periodo de evaluación docente', start: '2026-05-04', end: '2026-05-17', category: 'teacherEvaluation' },
  { id: 'teacher-evaluation-nov', title: 'Periodo de evaluación docente', start: '2026-11-09', end: '2026-11-22', category: 'teacherEvaluation' },
  { id: 'tutoring-may', title: 'Tutoría', start: '2026-05-18', end: '2026-05-22', category: 'tutoring' },
  { id: 'tutoring-nov', title: 'Tutoría', start: '2026-11-23', end: '2026-11-27', category: 'tutoring' },
  { id: 'admission-jun', title: 'Exámenes de admisión', start: '2026-06-06', end: '2026-06-24', category: 'admission' },
  { id: 'admission-nov', title: 'Exámenes de admisión', start: '2026-11-03', end: '2026-11-14', category: 'admission' },
  { id: 'final-evaluation-jun', title: 'Periodo de evaluación final', start: '2026-06-01', end: '2026-06-10', category: 'finalEvaluation' },
  { id: 'final-evaluation-dec', title: 'Periodo de evaluación final', start: '2026-12-07', end: '2026-12-16', category: 'finalEvaluation' },
]

export const conoceDicisCalendarImportantDateGroups = [
  { id: 'inscriptions', title: 'Inscripciones', markIds: ['inscriptions-jan', 'inscriptions-aug'] },
  { id: 'units-high', title: 'Alta de unidades de aprendizaje', markIds: ['units-high-jan', 'units-high-aug'] },
  { id: 'units-drop', title: 'Baja de unidades de aprendizaje', markIds: ['units-drop-jan', 'units-drop-aug'] },
  { id: 'late-registration', title: 'Inscripciones extemporáneas', markIds: ['late-registration-jan', 'late-registration-aug'] },
  { id: 'extensions', title: 'Prórrogas', markIds: ['extensions-jan', 'extensions-aug'] },
  { id: 'cancellation', title: 'Cancelación de inscripción', markIds: ['cancel-registration-apr', 'cancel-registration-nov'] },
  { id: 'teacher-evaluation', title: 'Periodos de evaluación docente', markIds: ['teacher-evaluation-may', 'teacher-evaluation-nov'] },
  { id: 'tutoring', title: 'Tutoría', markIds: ['tutoring-may', 'tutoring-nov'] },
  { id: 'admission', title: 'Exámenes de admisión', markIds: ['admission-jun', 'admission-nov'] },
  { id: 'regularization', title: 'Exámenes de regularización', markIds: ['regularization-feb', 'regularization-mar', 'regularization-jun', 'regularization-aug', 'regularization-oct'] },
  { id: 'classes', title: 'Inicio y fin de clases', markIds: ['classes-start-jan', 'classes-end-may', 'classes-start-aug', 'classes-end-dec'] },
  { id: 'final-evaluation', title: 'Periodos de evaluación final', markIds: ['final-evaluation-jun', 'final-evaluation-dec'] },
] as const

export const conoceDicisCalendarSocialServiceMarks: ConoceDicisCalendarMark[] = [
  { id: 'social-projects-1', title: 'Servicio social: registro de proyectos en INTRAUG · primer periodo', start: '2026-01-19', end: '2026-02-06', category: 'socialService' },
  { id: 'social-projects-2', title: 'Servicio social: registro de proyectos en INTRAUG · segundo periodo', start: '2026-04-27', end: '2026-05-15', category: 'socialService' },
  { id: 'social-projects-3', title: 'Servicio social: registro de proyectos en INTRAUG · tercer periodo', start: '2026-08-03', end: '2026-08-21', category: 'socialService' },
  { id: 'social-projects-4', title: 'Servicio social: registro de proyectos en INTRAUG · cuarto periodo', start: '2026-10-05', end: '2026-10-23', category: 'socialService' },
  { id: 'social-validation-1', title: 'Servicio social: aprobación y validación por divisiones y ENMS · primer periodo', start: '2026-02-09', end: '2026-02-20', category: 'socialService' },
  { id: 'social-validation-2', title: 'Servicio social: aprobación y validación por divisiones y ENMS · segundo periodo', start: '2026-05-18', end: '2026-05-29', category: 'socialService' },
  { id: 'social-validation-3', title: 'Servicio social: aprobación y validación por divisiones y ENMS · tercer periodo', start: '2026-08-24', end: '2026-09-04', category: 'socialService' },
  { id: 'social-validation-4', title: 'Servicio social: aprobación y validación por divisiones y ENMS · cuarto periodo', start: '2026-10-26', end: '2026-11-06', category: 'socialService' },
  { id: 'social-students-1', title: 'Servicio social: registro de estudiantes en INTRAUG · primer periodo', start: '2026-02-23', end: '2026-03-27', category: 'socialService' },
  { id: 'social-students-2', title: 'Servicio social: registro de estudiantes en INTRAUG · segundo periodo', start: '2026-06-01', end: '2026-06-26', category: 'socialService' },
  { id: 'social-students-3', title: 'Servicio social: registro de estudiantes en INTRAUG · tercer periodo', start: '2026-09-07', end: '2026-10-02', category: 'socialService' },
  { id: 'social-students-4', title: 'Servicio social: registro de estudiantes en INTRAUG · cuarto periodo', start: '2026-11-09', end: '2026-12-04', category: 'socialService' },
]

export const conoceDicisCalendarSocialServiceGroups = [
  { id: 'social-projects', title: 'Registro de proyectos en plataforma de INTRAUG', markIds: ['social-projects-1', 'social-projects-2', 'social-projects-3', 'social-projects-4'] },
  { id: 'social-validation', title: 'Aprobación y validación de proyectos por divisiones y ENMS', markIds: ['social-validation-1', 'social-validation-2', 'social-validation-3', 'social-validation-4'] },
  { id: 'social-students', title: 'Registro de estudiantes en INTRAUG', markIds: ['social-students-1', 'social-students-2', 'social-students-3', 'social-students-4'] },
] as const

export const conoceDicisCalendarHolidayMarks: ConoceDicisCalendarMark[] = [
  { id: 'holiday-collective-may-4', title: 'Asueto por contrato colectivo · Día del personal universitario', start: '2026-05-04', end: '2026-05-04', category: 'holiday' },
  { id: 'holiday-collective-may-10', title: 'Asueto por contrato colectivo · Día de las madres trabajadoras', start: '2026-05-10', end: '2026-05-10', category: 'holiday' },
  { id: 'holiday-collective-may-15', title: 'Asueto por contrato colectivo · Día del personal académico', start: '2026-05-15', end: '2026-05-15', category: 'holiday' },
  { id: 'holiday-collective-nov-2', title: 'Asueto por contrato colectivo · Día de los fieles difuntos', start: '2026-11-02', end: '2026-11-02', category: 'holiday' },
  { id: 'holiday-collective-dec-12', title: 'Asueto por contrato colectivo · Día de la Virgen de Guadalupe', start: '2026-12-12', end: '2026-12-12', category: 'holiday' },
  { id: 'holiday-law-feb-2', title: 'Asueto por ley', start: '2026-02-02', end: '2026-02-02', category: 'holiday' },
  { id: 'holiday-law-mar-16', title: 'Asueto por ley', start: '2026-03-16', end: '2026-03-16', category: 'holiday' },
  { id: 'holiday-law-may-1', title: 'Asueto por ley', start: '2026-05-01', end: '2026-05-01', category: 'holiday' },
  { id: 'holiday-law-sep-16', title: 'Asueto por ley', start: '2026-09-16', end: '2026-09-16', category: 'holiday' },
  { id: 'holiday-law-nov-16', title: 'Asueto por ley', start: '2026-11-16', end: '2026-11-16', category: 'holiday' },
  { id: 'holiday-local-irapuato', title: 'Asueto local · Fundación de Irapuato', start: '2026-02-15', end: '2026-02-15', category: 'holiday' },
  { id: 'holiday-local-salamanca', title: 'Asueto local · Aniversario de la Expropiación Petrolera en Salamanca', start: '2026-03-18', end: '2026-03-18', category: 'holiday' },
]

export const conoceDicisCalendarHolidayGroups = [
  { id: 'holiday-collective', title: 'Por contrato colectivo', markIds: ['holiday-collective-may-4', 'holiday-collective-may-10', 'holiday-collective-may-15', 'holiday-collective-nov-2', 'holiday-collective-dec-12'] },
  { id: 'holiday-law', title: 'Por ley', markIds: ['holiday-law-feb-2', 'holiday-law-mar-16', 'holiday-law-may-1', 'holiday-law-sep-16', 'holiday-law-nov-16'] },
  { id: 'holiday-local', title: 'Locales de Irapuato-Salamanca', markIds: ['holiday-local-irapuato', 'holiday-local-salamanca'] },
] as const

// La fuente semestral no fija los días exactos del receso; se conserva el periodo de referencia usado en Conoce DICIS.
export const conoceDicisCalendarVacationPeriods = [
  { id: 'winter-break-2026', title: 'Vacaciones de invierno · periodo de referencia', start: '2026-12-17', end: '2026-12-31' },
]

export const conoceDicisCalendarFilterGroups = [
  { id: 'inscriptions', label: 'Inscripciones', categories: ['inscriptions'], color: conoceDicisCalendarCategories.inscriptions.color },
  { id: 'classes', label: 'Inicio de clases', categories: ['classes'], color: conoceDicisCalendarCategories.classes.color },
  { id: 'cancellation', label: 'Cancelación de inscripción', categories: ['cancellation'], color: conoceDicisCalendarCategories.cancellation.color },
  { id: 'regularization', label: 'Exámenes de regularización', categories: ['regularization'], color: conoceDicisCalendarCategories.regularization.color },
  { id: 'teacher-evaluation', label: 'Evaluación docente', categories: ['teacherEvaluation'], color: conoceDicisCalendarCategories.teacherEvaluation.color },
  { id: 'admission', label: 'Exámenes de admisión', categories: ['admission'], color: conoceDicisCalendarCategories.admission.color },
  { id: 'tutoring', label: 'Tutoría', categories: ['tutoring'], color: conoceDicisCalendarCategories.tutoring.color },
  { id: 'final-evaluation', label: 'Evaluación final', categories: ['finalEvaluation'], color: conoceDicisCalendarCategories.finalEvaluation.color },
  { id: 'end-classes', label: 'Fin de clases', categories: ['endClasses'], color: conoceDicisCalendarCategories.endClasses.color },
  { id: 'days-off', label: 'Asuetos y días de descanso', categories: ['holiday', 'weekendAndVacation'], color: conoceDicisCalendarCategories.holiday.color },
] satisfies Array<{ id: string, label: string, categories: ConoceDicisCalendarCategory[], color: string }>

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
