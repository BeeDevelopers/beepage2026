import { randomUUID } from 'node:crypto'
import {
  getPhotoExtension,
  validatePhotoMeta,
  validateRegistration,
  type RegistrationErrors,
} from '#shared/registration'

interface SupabaseInsertRow {
  id?: string | number
}

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Envía el formulario con tus datos y fotografía.',
    })
  }

  const fields: Record<string, string> = {}
  let photoPart: { data: Buffer, type?: string, filename?: string } | null = null

  for (const part of parts) {
    if (!part.name) continue
    if (part.name === 'foto') {
      photoPart = {
        data: part.data,
        type: part.type,
        filename: part.filename,
      }
    }
    else {
      fields[part.name] = part.data.toString('utf8')
    }
  }

  const validation = validateRegistration(fields)
  const photoError = validatePhotoMeta(
    photoPart ? { type: photoPart.type, size: photoPart.data.length } : null,
  )
  const photoExt = getPhotoExtension(photoPart?.type)

  const errors: RegistrationErrors = {
    ...validation.errors,
    ...(photoError ? { foto: photoError } : {}),
  }

  if (!validation.valid || !validation.normalized || photoError || !photoPart || !photoExt) {
    throw createError({
      statusCode: 400,
      message: 'Revisa los campos del formulario.',
      data: { errors },
    })
  }

  const config = useRuntimeConfig(event)
  const supabaseUrl = config.supabaseUrl?.trim().replace(/\/+$/, '')
  const serviceKey = config.supabaseServiceKey?.trim()
  const bucket = config.supabaseBucket?.trim() || 'registros-fotos'
  const table = config.supabaseTable?.trim() || 'registros'

  if (!supabaseUrl || !serviceKey) {
    throw createError({
      statusCode: 503,
      message: 'El servicio de registro en Supabase aún no está configurado en el servidor.',
    })
  }

  const objectPath = `${Date.now()}-${randomUUID()}.${photoExt}`
  const storageObjectUrl = `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`
  const authHeaders = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  }

  try {
    const uploadResponse = await fetch(storageObjectUrl, {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': photoPart.type!,
        'x-upsert': 'false',
      },
      body: new Uint8Array(photoPart.data),
    })

    if (!uploadResponse.ok) {
      const uploadError = await uploadResponse.text()
      console.error('[register.post] Supabase Storage error:', uploadResponse.status, uploadError)
      throw createError({
        statusCode: 502,
        message: 'No se pudo subir tu fotografía. Intenta de nuevo más tarde.',
      })
    }

    const { nombre, correo, carrera, semestre, intereses } = validation.normalized
    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/${encodeURIComponent(table)}`, {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        nombre,
        correo,
        carrera,
        semestre,
        intereses: intereses ?? null,
        foto_path: objectPath,
      }),
    })

    if (!insertResponse.ok) {
      const insertError = await insertResponse.text()
      console.error('[register.post] Supabase DB error:', insertResponse.status, insertError)

      // Limpieza best-effort para no dejar archivos huérfanos en el bucket.
      await fetch(storageObjectUrl, {
        method: 'DELETE',
        headers: authHeaders,
      }).catch(() => {})

      throw createError({
        statusCode: 502,
        message: 'No se pudo guardar tu registro en la base de datos. Intenta de nuevo más tarde.',
      })
    }

    const inserted = (await insertResponse.json()) as SupabaseInsertRow[]

    return {
      ok: true,
      id: inserted?.[0]?.id ?? null,
      message: '¡Registro enviado con éxito! Pronto nos pondremos en contacto contigo.',
    }
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('[register.post] Unexpected error:', error)
    throw createError({
      statusCode: 502,
      message: 'Ocurrió un error al conectar con el servicio de registro. Intenta de nuevo.',
    })
  }
})
