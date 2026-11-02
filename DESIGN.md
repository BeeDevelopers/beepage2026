# Sistema de diseño — BeeDevelopers

Fuente de verdad visual para el sitio. Los agentes y personas que implementen o iteren la interfaz deben leer este archivo antes de crear o modificar componentes, y actualizarlo cuando una decisión de diseño cambie.

- **Referencia visual:** canvas «BeeDevelopers Inicio — Propuesta» (https://claude.ai/artifact/8Rz2oh1CewCbUqLs3hFwgZ#play-15dd8cd198dd). Es privado hasta que su dueño lo comparta.
- **Estado:** propuesta aprobada para la página de inicio; **pendiente de implementar** en Nuxt. El sitio actual todavía usa Arial y el diseño anterior.
- **Alcance:** tokens, patrones de componentes y estructura de la página de inicio. Las reglas técnicas del proyecto viven en `AGENTS.md`.

## 1. Principios

1. **Comunidad dev, no corporativo.** La identidad mezcla la marca (navy + amarillo) con guiños de código: etiquetas `// sección`, tipografía monoespaciada y una tarjeta de editor en el hero.
2. **Ritmo por alternancia.** Las secciones alternan fondo blanco, navy y crema para que la página no se sienta plana. Nunca dos secciones seguidas con el mismo fondo, salvo blanco con un cambio claro de patrón.
3. **Contenido vivo.** Priorizar bloques que cambian con el tiempo (próximos eventos, proyectos recientes, cifras) sobre texto estático.
4. **El panal como motivo.** El hexágono y el patrón de panal son el elemento gráfico de la marca. Usarlos con moderación: como acento, nunca como relleno de todo el fondo.
5. **Fotos reales.** Solo fotografías del grupo (`public/images/`). Nada de imágenes de stock ni ilustraciones genéricas.
6. **Sin datos inventados.** Cifras, fechas y testimonios se dejan como marcadores `[##]`, `[DD MES]` o `[Nombre]` hasta tener datos reales.

## 2. Tokens

### 2.1 Color

Los cinco primeros ya existen en `app/assets/css/main.css`; los demás son nuevos y deben agregarse al mismo bloque `:root`.

| Token | Valor | Uso |
|---|---|---|
| `--bee-navy` | `#073354` | Títulos sobre claro, fondo de «¿Qué hacemos?» y footer, botones outline |
| `--bee-header` | `#052a45` | Header, hero, sección «Únete», texto sobre amarillo |
| `--bee-yellow` | `#ffda4a` | Acento: CTA principal, hexágonos, etiquetas, puntos de estado |
| `--bee-text` | `#52606a` | Texto de cuerpo sobre blanco y crema |
| `--bee-cream` | `#fffbef` | Fondo de «Próximos eventos» |
| `--bee-yellow-hover` | `#f3c832` | Hover del CTA amarillo (ya usado en `.bee-button:hover`) |
| `--bee-yellow-ink` | `#8a6d00` | Texto amarillo oscuro sobre fondo claro (etiquetas `// sección`, tipo de evento) |
| `--bee-navy-raised` | `#0b3f66` | Tarjetas sobre fondo navy |
| `--bee-navy-line` | `#1d5580` | Bordes y líneas de pasos sobre navy |
| `--bee-text-on-dark` | `#c9d7e1` | Texto de cuerpo sobre navy |
| `--bee-text-on-hero` | `#dbe5ec` | Texto de cuerpo sobre la foto del hero |
| `--bee-surface` | `#f7f8fa` | Tarjetas de testimonios, chips del stack (`#f4f6f8`) |
| `--bee-border` | `#e8ebee` | Bordes de tarjetas y franja de cifras |
| `--bee-input-border` | `#cfd8df` | Bordes de inputs y botones de filtro inactivos |

Reglas:

- **Amarillo nunca como color de texto sobre blanco o crema** (contraste insuficiente). Para texto amarillo sobre claro usar `--bee-yellow-ink`. En el mockup la etiqueta `// sección` usa `#9a7a00`, que no llega a 4.5:1 en 13 px; al implementar, usar `#8a6d00`.
- Sobre navy, el amarillo sí puede ser texto (etiquetas `// qué hacemos`, frase destacada del hero).
- Texto sobre amarillo: siempre `--bee-header`.
- Números decorativos sobre `--bee-navy-raised` (`01`, `02`, `03`): usar al menos `#9db8cc` para cumplir 3:1.
- Los colores del stack (Vue, Nuxt, etc.) solo aparecen en el pequeño rombo de cada chip, nunca como color de sección.

### 2.2 Tipografía

| Rol | Familia | Peso | Tamaño | Interlineado |
|---|---|---|---|---|
| Display (frase del hero) | Space Grotesk | 600 | `clamp(28px, 3.2vw, 44px)` | 1.12 |
| H2 de sección | Space Grotesk | 700 | `clamp(30px, 3vw, 42px)` | 1.15 |
| H3 de tarjeta | Space Grotesk | 700 | 20–22 px | 1.2 |
| Título destacado en bento | Space Grotesk | 700 | 34 px | 1.15 |
| Cifra de estadística | Space Grotesk | 700 | 40 px | 1 |
| Cuerpo grande | IBM Plex Sans | 400 | 17–18 px | 1.7–1.75 |
| Cuerpo | IBM Plex Sans | 400 | 16 px | 1.7 |
| Secundario | IBM Plex Sans | 400–500 | 13–15 px | 1.6 |
| Etiqueta de sección | JetBrains Mono | 400 | 13 px, `letter-spacing: .08em` | — |
| Chip / tag | JetBrains Mono | 600 | 11 px, mayúsculas, `letter-spacing: .06em` | — |
| Código (tarjeta del hero, stack) | JetBrains Mono | 400 | 14 px | 1.75 |

- Reemplazar `--font-sans: Arial, Helvetica, sans-serif` en el bloque `@theme` por IBM Plex Sans y agregar `--font-display` (Space Grotesk) y `--font-mono` (JetBrains Mono).
- `@nuxt/fonts` ya viene incluido con `@nuxt/ui`: basta con declarar las familias en CSS para que se descarguen y sirvan localmente. **No** agregar `<link>` a Google Fonts ni dependencias nuevas.
- No usar Inter, Roboto ni Arial.

### 2.3 Espaciado y layout

- Contenedor de contenido: `max-width: 1180px`; hero y header: `1280px`. Margen lateral: `24px`.
- Padding vertical de sección: `96px` en escritorio, `56px` en móvil (≤600 px).
- Separación encabezado de sección → contenido: `40–48px`.
- Gaps: tarjetas `24px`, bento `18px`, filas de eventos `14px`, listas de valores `14px`.
- Encabezado de sección: etiqueta `// sección` arriba, H2 debajo con `margin-top: 10px`. Cuando hay descripción corta, va a la derecha en escritorio (`flex-wrap`, `justify-content: space-between`, `align-items: flex-end`) y debajo en móvil.

### 2.4 Radios

| Elemento | Radio |
|---|---|
| Botones, inputs | 8 px |
| Bloque de fecha | 12 px |
| Fila de evento, tarjeta de código, foto secundaria del collage | 14 px |
| Tarjetas, celdas del bento, franja de cifras | 16 px |
| Foto principal | 18 px |
| Panel del formulario | 20 px |
| Pills, chips, avatares | 999 px |

### 2.5 Sombras

| Nombre | Valor | Uso |
|---|---|---|
| `hover` | `0 14px 30px rgb(7 51 84 / 14%)` | Tarjetas al pasar el cursor |
| `raised` | `0 18px 45px rgb(7 51 84 / 14%)` | Franja de cifras, foto secundaria del collage |
| `floating` | `0 30px 60px rgb(0 0 0 / 30%)` | Elementos sobre fondo oscuro (tarjeta de código, formulario) |

### 2.6 Movimiento

- **Elevación de tarjeta:** `translateY(-4px)` + sombra `hover`, 200 ms `ease`.
- **Zoom de foto:** `scale(1.05)` en la imagen dentro de la celda, 500 ms.
- **Marquesina del stack:** `translateX(0 → -50%)` en 32 s, lineal e infinita; la lista se duplica para que el ciclo sea continuo.
- **Volteo de `PhotoCard`:** se conserva tal como está.
- Todo movimiento se desactiva con `@media (prefers-reduced-motion: reduce)`.

## 3. Motivos gráficos

### Patrón de panal

SVG `<pattern>` de 56×100 con este trazo:

```svg
<path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#ffda4a" stroke-width="1.5" />
```

- En el hero: ocupa el 55 % derecho, `opacity: .16`, con máscara que lo desvanece hacia la izquierda.
- En «Únete»: cubre la sección completa con `opacity: .07`.
- Siempre decorativo: `aria-hidden="true"`.

### Hexágono

Polígono base en `viewBox="0 0 56 64"`: `points="28,2 54,17 54,47 28,62 2,47 2,17"`.

- Relleno amarillo con ícono navy de trazo de 2.6–3 px dentro: insignia de las tarjetas de «¿Qué hacemos?».
- Grande (140×160) con `opacity: .55` detrás del collage de «Nosotros».

### Etiqueta de sección

Texto en JetBrains Mono con forma de comentario de código: `// sobre nosotros`, `// qué hacemos`, `// lo que hemos hecho`, `// agenda`, `// voces de la colmena`, `// únete`. Siempre en minúsculas.

### Íconos

Íconos de trazo (estilo Lucide), `stroke-width` 2–2.2 y extremos redondeados. Preferir `UIcon` con la colección `lucide` que usa Nuxt UI; si no está disponible localmente, usar SVG en línea antes de instalar paquetes. No usar emojis.

## 4. Patrones de componentes

| Patrón | Especificación |
|---|---|
| **Botón primario** | Fondo `--bee-yellow`, texto `--bee-header`, 600, 15 px, alto mínimo 50 px, padding 0 28 px, radio 8 px, flecha opcional. Reutilizar y ajustar `.bee-button`. |
| **Botón secundario sobre oscuro** | Transparente, borde `rgb(255 255 255 / 45%)`, texto blanco, 500. |
| **Botón outline sobre claro** | Borde y texto `--bee-navy`, 600, 14 px, alto mínimo 44 px. |
| **Pill de header** | La `.bee-button--pill` existente, alto mínimo 44 px. |
| **Chip «Próximo evento»** | Pill con fondo `rgb(255 218 74 / 14%)`, borde `rgb(255 218 74 / 45%)`, texto `#ffe68a` en mono 13 px, punto amarillo con halo. Enlaza a `#eventos`. |
| **Tag** | Pill amarilla, texto `--bee-header`, mono 11 px en mayúsculas. Se usa en el bento. |
| **Filtro** | Botón pill de 40 px de alto; el activo usa fondo navy con texto blanco y `aria-pressed="true"`. |
| **Tarjeta de código** | Fondo `rgb(4 26 43 / 88%)`, borde `rgb(255 255 255 / 12%)`, barra con tres puntos y nombre de archivo `colmena.ts`, código en mono 14 px con resaltado de sintaxis estilo Material. Es decorativa: el texto debe poder leerse, pero no es contenido esencial. |
| **Franja de cifras** | Tarjeta blanca de 4 columnas (`auto-fit, minmax(200px, 1fr)`) montada `-78px` sobre el hero; separadores verticales `#eef1f4`. El `+` de la primera cifra va en `#e0b100`. |
| **Chip de stack** | Pill `#f4f6f8` con borde `#e3e8ec`, texto navy mono 14 px y rombo de 8 px con el color de la tecnología. |
| **Tarjeta sobre navy** | Fondo `--bee-navy-raised`, borde `--bee-navy-line`, padding 32 px, radio 16 px; insignia hexagonal + número `01` arriba, H3 blanco y cuerpo `--bee-text-on-dark`. |
| **Celda del bento** | Foto a sangre con degradado inferior a `rgb(5 42 69 / 92%)`, tag, título blanco; solo la celda destacada muestra descripción. |
| **Fila de evento** | Tarjeta blanca con borde `#efe6c8`: bloque de fecha navy de 72×76 (día en Space Grotesk 26 px y mes en mono amarillo) + tipo, título y metadatos + botón outline «Detalles». |
| **Testimonio** | `figure` con fondo `--bee-surface`, comillas SVG amarillas, cita de 17 px, avatar circular navy con iniciales amarillas, nombre y «Carrera · Semestre». |
| **Pasos** | Lista ordenada vertical: círculo amarillo de 44 px con número y línea `--bee-navy-line` que conecta los pasos. |
| **Panel de formulario** | Tarjeta blanca de radio 20 px y sombra `floating` sobre la sección navy; inputs de 46 px con `label` visible. |

## 5. Página de inicio

Orden, fondo y componente Vue correspondiente. «Nuevo» significa crearlo en `app/components/home/`; «modificar» significa ajustar el existente sin romper su API.

| # | Sección | Fondo | Componente | Contenido y notas |
|---|---|---|---|---|
| 1 | Header | `--bee-header` | `SiteHeader.vue` (sin cambios de estructura) | Conservar los elementos reales de `pendingPages`; la navegación del mockup es ilustrativa. |
| 2 | Hero | Foto + degradado navy 97 % → 62 % + panal | `HomeHero.vue` (modificar) | Chip de próximo evento, logotipo, frase «Aprende construyendo. *Construye en comunidad.*» (la segunda parte en amarillo), descripción, botones «Únete a BeeDevelopers» (`/#registro`) y «Ver proyectos» (`/#proyectos`), tarjeta de código a la derecha. Padding inferior de 150 px para dejar espacio a la franja de cifras. |
| 3 | Cifras | Blanco (superpuesta al hero) | `HomeStats.vue` (nuevo) | Integrantes, eventos organizados, hackatones y año de fundación. **Datos pendientes.** |
| 4 | Stack | Blanco | `HomeTechStack.vue` (nuevo) | Marquesina «Con lo que construimos». La lista del mockup es un ejemplo: confirmar las tecnologías reales con el equipo. |
| 5 | Nosotros | Blanco | `HomeAbout.vue` (modificar) | Collage: `Nosotros.jpeg` + `Proyectos/polilinker2.JPG` superpuesta, hexágono detrás. H2 «Una colmena donde la teoría se vuelve práctica», párrafo y tres valores con check. |
| 6 | Qué hacemos | `--bee-navy` | `HomeActivities.vue` (modificar) | Mismos tres textos actuales, ahora con insignia hexagonal y numeración. |
| 7 | Proyectos | Blanco | `HomeHighlights.vue` (modificar) | Bento de 4 columnas con filas de 240 px: Space Apps destacado (2×2), DevWeek y Hackatón · Colaboración anchos (2×1), el resto 1×1, más una celda amarilla «Ver galería completa». Filtros: Todos / Hackatón / Ponencia / Competencia. Decidir si las celdas conservan el volteo de `PhotoCard` o solo muestran el tag. |
| 8 | Próximos eventos | `--bee-cream` | `HomeEvents.vue` (nuevo) | Tres eventos y el enlace «Ver calendario completo» a `/conoce-dicis/calendario`. Los datos deben salir de un archivo en `app/utils/` con la forma de `conoceDicisCalendar.ts`, no escritos dentro del componente. |
| 9 | Voces | Blanco | `HomeVoices.vue` (nuevo) | Tres testimonios reales. **Datos pendientes.** |
| 10 | Únete | `--bee-header` + panal | `HomeRegistrationSection.vue` (modificar) | Tres pasos a la izquierda y el panel del formulario a la derecha; el formulario sigue entrando por el `slot` (responsable: José Eduardo). Mantener `id="registro"`. |
| 11 | Footer | `--bee-navy` | `SiteFooter.vue` | Sin cambios. |

Las imágenes se sirven con `NuxtImg` (`format="webp"`, `loading="lazy"` salvo la del hero) desde `/images/...`.

### Módulo Conoce DICIS

- Mantener el módulo aislado en sus rutas y componentes con nombres `ConoceDicis*`; no cambiar la página de inicio ni los componentes globales para resolver sus necesidades.
- El encabezado del módulo usa navy, blanco y amarillo para presentar «CONOCE DICIS» y el mensaje de consulta anual. La navegación propia va en una barra horizontal encima del contenido y enlaza al calendario anual y a los grupos organizados.
- El calendario anual sigue la lectura de enero a diciembre del calendario semestral oficial de la UG: semanas de lunes a domingo, doce meses en una cuadrícula y fechas sin filtro en blanco. Los filtros por color admiten selección múltiple; las fechas de hoy conservan un contorno negro y cada día abre su detalle.
- En escritorio, la información lateral va a la izquierda en un panel con desplazamiento propio. Fechas importantes, descansos oficiales, eventos UG y servicio social se abren desde controles accesibles; cada grupo y fecha puede seleccionarse para resaltar sus días en el calendario y consultar el primer día del periodo. Cada fecha o periodo muestra sus días hábiles, calculados de lunes a viernes y descontando los asuetos listados. Los filtros por color van arriba del calendario; en pantallas pequeñas el panel de información queda debajo del calendario.
- La información lateral reúne fechas importantes, asuetos por contrato colectivo, por ley y locales de Irapuato-Salamanca, además de los periodos de servicio social. Los colores reutilizan la paleta de categorías ya definida en `app/utils/conoceDicisCalendar.ts`.
- El periodo de receso del 17 al 31 de diciembre se muestra como referencia después de las evaluaciones finales; la fuente semestral no publica fechas exactas de vacaciones.

## 6. Responsive

- **≥1101 px:** navegación completa en el header (comportamiento actual).
- **≤900 px:** las columnas de «Nosotros», «Eventos» y «Únete» se apilan (`flex-wrap` con `flex: 1 1 420–480px`). La tarjeta de código pasa debajo del texto del hero.
- **≤760 px:** el bento pasa a 2 columnas con filas de 200 px y todas las celdas a ancho completo; la franja de cifras deja de superponerse al hero (`margin-top: 0`).
- **≤600 px:** padding de sección de 56 px; las cifras quedan en 1–2 columnas por `auto-fit`.
- Sin scroll horizontal en ningún ancho. Probar a 375 px, 768 px y 1440 px.

## 7. Accesibilidad

- Contraste mínimo de 4.5:1 en texto normal y 3:1 a partir de 24 px (ver reglas de color en §2.1).
- Todo elemento interactivo es `<a href>`, `<button>` o un control de formulario real, con área táctil mínima de 44×44 px.
- Cada sección es un `<section>` con `aria-labelledby` apuntando a su H2; jerarquía H1 (solo en el hero) → H2 → H3.
- Decoración (panal, hexágonos de fondo, puntos de la tarjeta de código, rombos del stack) con `aria-hidden="true"`; íconos con significado, con `aria-label`.
- Filtros del bento con `aria-pressed`; grupo con `role="group"` y `aria-label`.
- Mantener el foco visible definido en `main.css` y el enlace «Saltar al contenido».
- Respetar `prefers-reduced-motion` (§2.6).

## 8. Implementación en este repositorio

- Los tokens van en `app/assets/css/main.css`: colores en `:root` y familias tipográficas en `@theme`. No crear archivos CSS paralelos.
- Seguir el estilo actual: clases semánticas en kebab-case (`.home-stats`, `.stat-card`) con estilos en `main.css` y la prop `:ui` de los componentes de Nuxt UI para conectar slots, como en los componentes `Home*` existentes.
- Reutilizar `UPageSection`, `UPageHero`, `UCard`, `UButton`, `UContainer` y `NuxtImg` antes de escribir HTML propio.
- No instalar dependencias para fuentes, íconos ni animaciones; todo lo descrito se resuelve con CSS, SVG y los módulos ya instalados.
- Validar con `pnpm lint` y `pnpm typecheck` después de cada cambio, y con `pnpm build` si cambia configuración.

## 9. Pendientes

- [ ] Cifras reales del grupo (sección 3).
- [ ] Lista definitiva del stack tecnológico (sección 4).
- [ ] Fuente de datos y próximos eventos reales (sección 8 y chip del hero).
- [ ] Testimonios con autorización de los integrantes (sección 9).
- [ ] Decisión sobre conservar el volteo de `PhotoCard` dentro del bento.
- [ ] Destino de «Ver galería completa» (la página Galería todavía no existe).
