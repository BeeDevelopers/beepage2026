<script setup lang="ts">
import {
  ALLOWED_PHOTO_TYPES,
  DICIS_CAREERS,
  SEMESTER_OPTIONS,
  validatePhotoMeta,
  validateRegistration,
  type RegistrationErrors,
  type RegistrationPayload,
} from '#shared/registration'

interface RegisterResponse {
  ok: boolean
  id: string | number | null
  message: string
}

const form = reactive({
  nombre: '',
  correo: '',
  carrera: '',
  semestre: '',
  intereses: '',
})

const photoFile = ref<File | null>(null)
const photoPreviewUrl = ref<string | null>(null)
const photoInputRef = ref<HTMLInputElement | null>(null)

const touched = reactive<Record<keyof RegistrationPayload | 'foto', boolean>>({
  nombre: false,
  correo: false,
  carrera: false,
  semestre: false,
  intereses: false,
  foto: false,
})

const fieldErrors = ref<RegistrationErrors>({})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const submitMessage = ref('')

const acceptedPhotoMimeTypes = ALLOWED_PHOTO_TYPES.join(',')

function revokePhotoPreview() {
  if (photoPreviewUrl.value) {
    URL.revokeObjectURL(photoPreviewUrl.value)
    photoPreviewUrl.value = null
  }
}

onBeforeUnmount(() => {
  revokePhotoPreview()
})

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function validateField(field: keyof RegistrationPayload | 'foto') {
  touched[field] = true

  if (field === 'foto') {
    const error = validatePhotoMeta(photoFile.value)
    fieldErrors.value = { ...fieldErrors.value, foto: error ?? undefined }
    return
  }

  const { errors } = validateRegistration(form)
  fieldErrors.value = { ...fieldErrors.value, [field]: errors[field] }
}

function handlePhotoChange(event: Event) {
  const target = event.target as HTMLInputElement
  const selected = target.files?.[0] ?? null
  touched.foto = true

  revokePhotoPreview()

  if (!selected) {
    photoFile.value = null
    validateField('foto')
    return
  }

  const error = validatePhotoMeta(selected)
  if (error) {
    photoFile.value = null
    target.value = ''
    fieldErrors.value = { ...fieldErrors.value, foto: error }
    return
  }

  photoFile.value = selected
  photoPreviewUrl.value = URL.createObjectURL(selected)
  fieldErrors.value = { ...fieldErrors.value, foto: undefined }
}

function clearPhoto() {
  revokePhotoPreview()
  photoFile.value = null
  if (photoInputRef.value) {
    photoInputRef.value.value = ''
  }
  if (touched.foto) {
    validateField('foto')
  }
}

function resetForm() {
  form.nombre = ''
  form.correo = ''
  form.carrera = ''
  form.semestre = ''
  form.intereses = ''
  clearPhoto()
  fieldErrors.value = {}
  for (const key of Object.keys(touched) as Array<keyof RegistrationPayload | 'foto'>) {
    touched[key] = false
  }
}

async function handleSubmit() {
  submitStatus.value = 'idle'
  submitMessage.value = ''

  for (const key of Object.keys(touched) as Array<keyof RegistrationPayload | 'foto'>) {
    touched[key] = true
  }

  const validation = validateRegistration(form)
  const photoError = validatePhotoMeta(photoFile.value)
  const combinedErrors: RegistrationErrors = {
    ...validation.errors,
    ...(photoError ? { foto: photoError } : {}),
  }

  if (!validation.valid || !validation.normalized || photoError || !photoFile.value) {
    fieldErrors.value = combinedErrors
    submitStatus.value = 'error'
    submitMessage.value = 'Por favor revisa los campos marcados antes de enviar.'
    return
  }

  fieldErrors.value = {}
  isSubmitting.value = true

  try {
    const body = new FormData()
    body.append('nombre', validation.normalized.nombre)
    body.append('correo', validation.normalized.correo)
    body.append('carrera', validation.normalized.carrera)
    body.append('semestre', validation.normalized.semestre)
    if (validation.normalized.intereses) {
      body.append('intereses', validation.normalized.intereses)
    }
    body.append('foto', photoFile.value)

    const response = await $fetch<RegisterResponse>('/api/register', {
      method: 'POST',
      body,
    })

    submitStatus.value = 'success'
    submitMessage.value = response.message || '¡Registro enviado con éxito! Pronto te contactaremos.'
    resetForm()
  }
  catch (error: unknown) {
    submitStatus.value = 'error'
    const fetchError = error as {
      data?: { message?: string, statusMessage?: string, data?: { errors?: RegistrationErrors } }
      statusMessage?: string
    }

    if (fetchError?.data?.data?.errors) {
      fieldErrors.value = fetchError.data.data.errors
    }

    submitMessage.value
      = fetchError?.data?.message
        || fetchError?.data?.statusMessage
        || fetchError?.statusMessage
        || 'No pudimos enviar tu registro en este momento. Intenta de nuevo más tarde.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="registration-form-wrapper">
    <h3>Formulario de registro</h3>
    <p class="registration-note">
      Completa tus datos y sube una fotografía tuya para recibir información y sumarte a nuestras actividades en DICIS.
    </p>

    <form class="registration-form" novalidate @submit.prevent="handleSubmit">
      <div class="registration-field">
        <label for="reg-nombre" class="registration-label">
          Nombre completo <span class="registration-required" aria-hidden="true">*</span>
        </label>
        <input
          id="reg-nombre"
          v-model="form.nombre"
          type="text"
          name="nombre"
          autocomplete="name"
          placeholder="Ej. Ana Sofía López"
          required
          class="registration-input"
          :class="{ 'is-invalid': Boolean(fieldErrors.nombre) }"
          :aria-invalid="Boolean(fieldErrors.nombre)"
          :aria-describedby="fieldErrors.nombre ? 'reg-nombre-error' : undefined"
          @blur="validateField('nombre')"
        >
        <p v-if="fieldErrors.nombre" id="reg-nombre-error" class="registration-error">
          {{ fieldErrors.nombre }}
        </p>
      </div>

      <div class="registration-field">
        <label for="reg-semestre" class="registration-label">
          Semestre <span class="registration-required" aria-hidden="true">*</span>
        </label>
        <select
          id="reg-semestre"
          v-model="form.semestre"
          name="semestre"
          required
          class="registration-input"
          :class="{ 'is-invalid': Boolean(fieldErrors.semestre) }"
          :aria-invalid="Boolean(fieldErrors.semestre)"
          :aria-describedby="fieldErrors.semestre ? 'reg-semestre-error' : undefined"
          @blur="validateField('semestre')"
        >
          <option value="" disabled>
            Selecciona tu semestre
          </option>
          <option v-for="option in SEMESTER_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <p v-if="fieldErrors.semestre" id="reg-semestre-error" class="registration-error">
          {{ fieldErrors.semestre }}
        </p>
      </div>

      <div class="registration-field">
        <label for="reg-correo" class="registration-label">
          Correo institucional <span class="registration-required" aria-hidden="true">*</span>
        </label>
        <input
          id="reg-correo"
          v-model="form.correo"
          type="email"
          name="correo"
          autocomplete="email"
          placeholder="tu.nombre@ugto.mx"
          required
          class="registration-input"
          :class="{ 'is-invalid': Boolean(fieldErrors.correo) }"
          :aria-invalid="Boolean(fieldErrors.correo)"
          :aria-describedby="fieldErrors.correo ? 'reg-correo-error' : undefined"
          @blur="validateField('correo')"
        >
        <p v-if="fieldErrors.correo" id="reg-correo-error" class="registration-error">
          {{ fieldErrors.correo }}
        </p>
      </div>

      <div class="registration-field">
        <label for="reg-carrera" class="registration-label">
          Carrera <span class="registration-required" aria-hidden="true">*</span>
        </label>
        <select
          id="reg-carrera"
          v-model="form.carrera"
          name="carrera"
          required
          class="registration-input"
          :class="{ 'is-invalid': Boolean(fieldErrors.carrera) }"
          :aria-invalid="Boolean(fieldErrors.carrera)"
          :aria-describedby="fieldErrors.carrera ? 'reg-carrera-error' : undefined"
          @blur="validateField('carrera')"
        >
          <option value="" disabled>
            Selecciona tu carrera
          </option>
          <option v-for="career in DICIS_CAREERS" :key="career" :value="career">
            {{ career }}
          </option>
        </select>
        <p v-if="fieldErrors.carrera" id="reg-carrera-error" class="registration-error">
          {{ fieldErrors.carrera }}
        </p>
      </div>

      <div class="registration-field">
        <label for="reg-foto" class="registration-label">
          Fotografía del estudiante <span class="registration-required" aria-hidden="true">*</span>
        </label>
        <input
          id="reg-foto"
          ref="photoInputRef"
          type="file"
          name="foto"
          :accept="acceptedPhotoMimeTypes"
          required
          class="registration-input registration-file-input"
          :class="{ 'is-invalid': Boolean(fieldErrors.foto) }"
          :aria-invalid="Boolean(fieldErrors.foto)"
          :aria-describedby="fieldErrors.foto ? 'reg-foto-error reg-foto-hint' : 'reg-foto-hint'"
          @change="handlePhotoChange"
        >
        <p id="reg-foto-hint" class="registration-hint">
          Formatos permitidos: JPG, PNG o WebP (máximo 5 MB). Solo se usa para identificarte en el registro.
        </p>

        <div v-if="photoFile && photoPreviewUrl" class="registration-file-preview">
          <img :src="photoPreviewUrl" alt="Vista previa de tu fotografía" class="registration-file-thumb">
          <div class="registration-file-meta">
            <span class="registration-file-name">{{ photoFile.name }}</span>
            <span class="registration-file-size">{{ formatFileSize(photoFile.size) }}</span>
          </div>
          <button type="button" class="registration-file-remove" @click="clearPhoto">
            Quitar
          </button>
        </div>

        <p v-if="fieldErrors.foto" id="reg-foto-error" class="registration-error">
          {{ fieldErrors.foto }}
        </p>
      </div>

      <div class="registration-field">
        <label for="reg-intereses" class="registration-label">
          Áreas de interés o comentarios <span class="registration-optional">(opcional)</span>
        </label>
        <textarea
          id="reg-intereses"
          v-model="form.intereses"
          name="intereses"
          rows="3"
          maxlength="500"
          placeholder="Desarrollo web, IA, hackatones, diseño, comunidad..."
          class="registration-input registration-textarea"
          :class="{ 'is-invalid': Boolean(fieldErrors.intereses) }"
          :aria-invalid="Boolean(fieldErrors.intereses)"
          :aria-describedby="fieldErrors.intereses ? 'reg-intereses-error' : undefined"
          @blur="validateField('intereses')"
        />
        <p v-if="fieldErrors.intereses" id="reg-intereses-error" class="registration-error">
          {{ fieldErrors.intereses }}
        </p>
      </div>

      <div
        v-if="submitStatus !== 'idle'"
        :role="submitStatus === 'error' ? 'alert' : 'status'"
        aria-live="polite"
        class="registration-feedback"
        :class="submitStatus === 'success' ? 'registration-feedback--success' : 'registration-feedback--error'"
      >
        {{ submitMessage }}
      </div>

      <UButton
        type="submit"
        class="bee-button registration-submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
      >
        {{ isSubmitting ? 'Enviando registro...' : 'Enviar registro' }}
      </UButton>
    </form>
  </div>
</template>
