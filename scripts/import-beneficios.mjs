import { readFileSync, writeFileSync } from 'node:fs'

// Importación editorial reproducible: no consulta ni valida ofertas en vivo.
const source = readFileSync(new URL('../docs/beneficios-correo-ug.md', import.meta.url), 'utf8')
const states = ['ug_confirmado', 'oficial_estudiantes', 'oficial_estudiantes', 'oficial_estudiantes', 'proveedor_mx', 'github_pack', 'marketplace_por_validar', 'credencial_estudiante']
const categories = ['UG', 'Streaming', 'Software y diseño', 'IA y productividad', 'Compras', 'Programación', 'Compras', 'Transporte y cultura']
const slug = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
let group = 0
let groupName = ''
let context = ''
const records = []
for (const line of source.split(/\r?\n/)) {
  const heading = line.match(/^## (\d+) · (.+)/)
  if (heading) { group = Number(heading[1]); groupName = heading[2]; context = '' }
  if (line.startsWith('**Estado de investigación:**')) context = line.replaceAll('**', '').replaceAll('`', '')
  if (group < 1 || group > 8 || !/^\| \d+ \|/.test(line)) continue
  const cells = line.split('|').slice(1, -1).map(cell => cell.trim().replaceAll('**', ''))
  const [number, nombre, resumen, requisitos, link, nota] = cells
  const urlFuente = link.match(/\]\((.+)\)/)?.[1]
  if (!urlFuente || !URL.canParse(urlFuente)) throw new Error(`Fuente inválida: ${nombre}`)
  const historico = nombre.includes('histórico')
  const estado = historico ? 'historico' : states[group - 1]
  // Tipo descriptivo; las condiciones completas conservan prioridad sobre el chip.
  const tipo = /descuento|rebaja|\d+%/i.test(resumen) ? 'descuento'
    : /crédito/i.test(resumen) ? 'credito'
      : /gratis|gratuit|sin costo|sin cargo/i.test(resumen) ? 'gratis'
        : /precio|tarifa/i.test(resumen) ? 'precio_educativo' : 'servicio'
  records.push({ id: `${slug(nombre)}-${group}-${number}`, nombre, resumen, requisitos, urlFuente, nota: nota === '—' ? '' : nota, estado, estadoInvestigacion: states[group - 1], tipo, categoria: categories[group - 1], grupo: groupName, contexto: context, ultimaRevision: '2026-11-18', ...(group === 4 && number === '1' ? { vencimiento: '2026-12-31' } : {}), ...(group === 2 && number === '5' ? { vencimiento: '2027-07-09' } : {}), ...(group === 1 && number === '1' ? { destacado: true } : {}) })
}
writeFileSync(new URL('../app/data/beneficios.json', import.meta.url), `${JSON.stringify(records, null, 2)}\n`)
console.log(`Importados ${records.length} registros con fuentes y condiciones.`)
