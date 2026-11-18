export const DICIS_CAREERS = [
  'Ingeniería en Sistemas Computacionales',
  'Ingeniería en Comunicaciones y Electrónica',
  'Ingeniería Eléctrica',
  'Ingeniería Mecánica',
  'Ingeniería en Gestión Empresarial',
  'Licenciatura en Gestión Empresarial',
  'Otra',
] as const

export const SEMESTER_OPTIONS = [
  '1° semestre',
  '2° semestre',
  '3° semestre',
  '4° semestre',
  '5° semestre',
  '6° semestre',
  '7° semestre',
  '8° semestre',
  '9° semestre',
  '10° semestre',
  '11° semestre',
  '12° semestre',
  'Posgrado',
] as const

export interface RegistrationPayload {
  nombre: string
  correo: string
  carrera: string
  semestre: string
  intereses?: string
}

export type RegistrationErrors = Partial<Record<keyof RegistrationPayload | 'foto', string>>

export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024
export const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

const PHOTO_EXTENSION_BY_TYPE: Record<(typeof ALLOWED_PHOTO_TYPES)[number], string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export function getPhotoExtension(mimeType?: string): string | null {
  if (!mimeType) return null
  return PHOTO_EXTENSION_BY_TYPE[mimeType as (typeof ALLOWED_PHOTO_TYPES)[number]] ?? null
}

export function validatePhotoMeta(file: { type?: string, size?: number } | null | undefined): string | null {
  if (!file || !file.size) {
    return 'Sube una fotografía tuya para completar el registro.'
  }

  if (!file.type || !(ALLOWED_PHOTO_TYPES as readonly string[]).includes(file.type)) {
    return 'Formato no válido. Usa una imagen JPG, PNG o WebP.'
  }

  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return 'La fotografía no debe pesar más de 5 MB.'
  }

  return null
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRegistration(raw: unknown): {
  valid: boolean
  errors: RegistrationErrors
  normalized?: RegistrationPayload
} {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const errors: RegistrationErrors = {}

  const nombre = typeof input.nombre === 'string' ? input.nombre.trim() : ''
  if (!nombre) {
    errors.nombre = 'Ingresa tu nombre completo.'
  }
  else if (nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.'
  }
  else if (nombre.length > 120) {
    errors.nombre = 'El nombre no puede exceder 120 caracteres.'
  }

  const correo = typeof input.correo === 'string' ? input.correo.trim().toLowerCase() : ''
  if (!correo) {
    errors.correo = 'Ingresa tu correo electrónico.'
  }
  else if (!EMAIL_REGEX.test(correo)) {
    errors.correo = 'Ingresa un correo electrónico válido.'
  }

  const carrera = typeof input.carrera === 'string' ? input.carrera.trim() : ''
  if (!carrera) {
    errors.carrera = 'Selecciona tu carrera.'
  }

  const semestre = typeof input.semestre === 'string' ? input.semestre.trim() : ''
  if (!semestre) {
    errors.semestre = 'Selecciona tu semestre.'
  }

  const intereses = typeof input.intereses === 'string' ? input.intereses.trim() : ''
  if (intereses.length > 500) {
    errors.intereses = 'El mensaje no puede exceder 500 caracteres.'
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: {},
    normalized: {
      nombre,
      correo,
      carrera,
      semestre,
      ...(intereses ? { intereses } : {}),
    },
  }
}
