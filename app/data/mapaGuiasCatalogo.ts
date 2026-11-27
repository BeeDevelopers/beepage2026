import { beneficios, type Beneficio } from '~/utils/beneficios'
import { contenidoGuiasUG, flujoDescargaUg, type GuiaBeneficioUg } from '~/data/contenidoGuiasUG'

export type GuiaTipo = 'pagina' | 'modal'

export interface GuiaBeneficio extends GuiaBeneficioUg {
  tipo: GuiaTipo
  destinoId: string
  ancla?: string
}

const fechaRevision = '26 de noviembre de 2026'

const officeIds = new Set([
  'microsoft-365-educacion-1-1',
  'aplicaciones-office-de-escritorio-1-2',
  'onedrive-institucional-1-3',
  'microsoft-teams-1-4',
  'microsoft-forms-1-5',
  'microsoft-stream-1-6',
  'microsoft-whiteboard-1-7',
])

const bibliotecaIds = new Set([
  'ebscohost-ebook-academic-collection-1-17',
  'proquest-ebook-central-1-18',
  'jove-1-19',
  'jstor-colecciones-arts-sciences-1-20',
  'tirant-biblioteca-virtual-1-21',
])

const providerRequirements = (beneficio: Beneficio) => [
  beneficio.requisitos,
  'Cuenta personal en el proveedor, si la página oficial la solicita.',
  'Comprobante de estudiante o validación académica cuando el proveedor la requiera.',
]

function genericGuide(beneficio: Beneficio): GuiaBeneficio {
  if (beneficio.grupo === 'GitHub Student Developer Pack — beneficios individuales') {
    return {
      tipo: 'modal',
      destinoId: beneficio.id,
      estado: 'limitada',
      resumen: `${beneficio.nombre} aparece dentro del GitHub Student Developer Pack. GitHub debe aprobar tu condición de estudiante y cada socio aplica sus propios términos.`,
      requisitos: ['Cuenta de GitHub.', 'Aprobación vigente de GitHub Education.', 'Revisar los requisitos y límites del socio antes de activar la oferta.'],
      pasos: [
        'Abre GitHub Education e inicia el proceso de solicitud del Student Developer Pack.',
        'Completa la verificación académica que solicite GitHub y espera la aprobación de tu cuenta.',
        `Cuando tu cuenta sea aprobada, busca ${beneficio.nombre} dentro del Pack y abre la oferta del socio.`,
        'Lee los términos del socio y activa la oferta únicamente desde el enlace que muestre GitHub.',
      ],
      consideraciones: ['La presencia de una oferta en el Pack no garantiza que sus requisitos, región, duración o disponibilidad sean iguales para todas las cuentas.', 'GitHub Education y el proveedor, no BeeDevelopers ni la UG, gestionan la aprobación y las condiciones de esta oferta.'],
      acceso: 'https://education.github.com/pack',
      fuente: beneficio.urlFuente,
      fechaRevision,
    }
  }

  if (beneficio.grupo === 'Student Beans México — descuentos y marcas del directorio') {
    return {
      tipo: 'modal',
      destinoId: beneficio.id,
      estado: 'limitada',
      resumen: `${beneficio.nombre} aparece en el directorio de Student Beans México. El descuento o la promoción debe confirmarse en la ficha vigente de la marca.`,
      requisitos: ['Cuenta de Student Beans, si la plataforma la solicita.', 'Comprobante de estudiante y condiciones que indique la marca.'],
      pasos: [
        'Abre el directorio oficial de Student Beans México.',
        `Busca ${beneficio.nombre} y abre la ficha actual de la marca.`,
        'Lee el porcentaje, vigencia, región y método de validación antes de continuar.',
        'Sigue el enlace o código que entregue Student Beans y confirma las condiciones directamente con la marca.',
      ],
      consideraciones: ['El catálogo de Student Beans puede cambiar; esta tarjeta no confirma que la promoción esté disponible en todo momento.', 'El proveedor puede aplicar exclusiones, límites de uso o requisitos adicionales.'],
      acceso: beneficio.urlFuente,
      fuente: beneficio.urlFuente,
      fechaRevision,
    }
  }

  if (beneficio.grupo === 'Transporte, museos y experiencias con credencial') {
    return {
      tipo: 'modal',
      destinoId: beneficio.id,
      estado: 'limitada',
      resumen: `${beneficio.nombre} puede requerir credencial vigente y está sujeto a las reglas del proveedor o recinto.`,
      requisitos: [beneficio.requisitos, 'Credencial de estudiante vigente cuando el proveedor la solicite.', 'Condiciones, fechas y disponibilidad del proveedor.'],
      pasos: [
        'Abre la fuente oficial del proveedor o recinto.',
        `Busca las condiciones vigentes para estudiantes en ${beneficio.nombre}.`,
        'Confirma qué identificación debes presentar y si el beneficio aplica a tu fecha, ruta, función o sede.',
        'Solicita el beneficio directamente al proveedor y conserva sus comprobantes o restricciones.',
      ],
      consideraciones: ['La credencial no garantiza por sí sola un descuento: cada proveedor define sus condiciones.', 'No se confirma una tarifa, porcentaje o gratuidad si la fuente no lo publica de forma vigente.'],
      acceso: beneficio.urlFuente,
      fuente: beneficio.urlFuente,
      fechaRevision,
    }
  }

  return {
    tipo: 'modal',
    destinoId: beneficio.id,
    estado: beneficio.estado === 'historico' ? 'historica' : 'limitada',
    resumen: beneficio.resumen,
    requisitos: providerRequirements(beneficio),
    pasos: [
      'Abre la fuente oficial del proveedor y revisa que la oferta siga publicada.',
      'Comprueba tu elegibilidad, país, institución, vigencia y cualquier requisito de pago antes de registrarte.',
      'Sigue el procedimiento que publique el proveedor: registro, validación, descarga, compra o solicitud, según corresponda.',
      'Antes de confirmar, revisa el precio final, la renovación y las condiciones de cancelación que muestre el proveedor.',
    ],
    consideraciones: [
      'BeeDevelopers solo organiza información pública; no gestiona cuentas, licencias, pagos ni validaciones de terceros.',
      beneficio.estado === 'historico' ? 'La fuente disponible es histórica; no presentes este beneficio como vigente hasta obtener una confirmación actual.' : 'La oferta puede cambiar por país, fecha, tipo de cuenta o disponibilidad del proveedor.',
    ],
    acceso: beneficio.urlFuente,
    fuente: beneficio.urlFuente,
    fechaRevision,
  }
}

function buildGuide(beneficio: Beneficio): GuiaBeneficio {
  const original = contenidoGuiasUG[beneficio.id]
  if (original) {
    const destinoId = officeIds.has(beneficio.id)
      ? 'microsoft-365-educacion-1-1'
      : bibliotecaIds.has(beneficio.id)
        ? 'biblioteca-digital-ug-1-16'
        : beneficio.id

    return {
      ...original,
      tipo: 'pagina',
      destinoId,
      ...(flujoDescargaUg[beneficio.id] ? { flujoDescarga: flujoDescargaUg[beneficio.id] } : {}),
    }
  }

  return genericGuide(beneficio)
}

export const guiasBeneficios: Record<string, GuiaBeneficio> = Object.fromEntries(
  beneficios.map(beneficio => [beneficio.id, buildGuide(beneficio)]),
)

export function obtenerGuia(id: string) {
  return guiasBeneficios[id]
}
