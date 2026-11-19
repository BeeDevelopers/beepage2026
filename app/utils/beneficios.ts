import records from '~/data/beneficios.json'

export const estadosBeneficio = {
  ug_confirmado: 'Publicado por la UG',
  oficial_estudiantes: 'Oferta para estudiantes',
  proveedor_mx: 'Proveedor en México',
  github_pack: 'Requiere GitHub Education',
  marketplace_por_validar: 'Por confirmar con UG',
  credencial_estudiante: 'Requiere credencial',
  historico: 'Histórico · confirmar vigencia',
} as const

export const tiposBeneficio = {
  gratis: 'Sin costo · con requisitos',
  descuento: 'Descuento anunciado',
  credito: 'Créditos',
  precio_educativo: 'Precio educativo',
  servicio: 'Servicio / acceso',
} as const

export type EstadoBeneficio = keyof typeof estadosBeneficio
export type TipoBeneficio = keyof typeof tiposBeneficio
export type Beneficio = Omit<typeof records[number], 'estado' | 'estadoInvestigacion' | 'tipo'> & {
  estado: EstadoBeneficio
  estadoInvestigacion: Exclude<EstadoBeneficio, 'historico'>
  tipo: TipoBeneficio
}
export const beneficios = records as Beneficio[]
export const categoriasBeneficio = [...new Set(beneficios.map(item => item.categoria))]
export const normalizarBusqueda = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export function iconoBeneficio(item: Beneficio) {
  if (item.destacado) return 'i-lucide-panels-top-left'
  const icons: Record<string, string> = {
    'UG': 'i-lucide-graduation-cap',
    'Streaming': 'i-lucide-play',
    'Software y diseño': 'i-lucide-pen-tool',
    'IA y productividad': 'i-lucide-sparkles',
    'Compras': 'i-lucide-shopping-bag',
    'Programación': 'i-lucide-code-xml',
    'Transporte y cultura': 'i-lucide-ticket',
  }
  return icons[item.categoria] || 'i-lucide-gift'
}

// Las referencias monetarias siguen en el detalle como dato fechado del documento.
export function resumenTarjeta(item: Beneficio) {
  if (item.nombre.startsWith('Spotify')) return 'Plan Premium con tarifa reducida para estudiantes elegibles. Consulta el precio actual en la fuente.'
  return item.resumen
}
