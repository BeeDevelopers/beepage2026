# Sistema de diseño — BeeDevelopers

Fuente de verdad visual para el sitio. Los agentes y personas que implementen o iteren la interfaz deben leer este archivo antes de crear o modificar componentes, y actualizarlo cuando una decisión de diseño cambie.

- **Referencia visual:** canvas «BeeDevelopers Inicio — Propuesta» (https://claude.ai/artifact/8Rz2oh1CewCbUqLs3hFwgZ#play-15dd8cd198dd). Es privado hasta que su dueño lo comparta.
- **Estado:** página de inicio **implementada** en Nuxt a partir de la propuesta, con los ajustes descritos en §5. «Próximos eventos» y «Voces» quedan en pausa hasta tener datos reales.
- **Alcance:** tokens, patrones de componentes y estructura de la página de inicio. Las reglas técnicas del proyecto viven en `AGENTS.md`.

## 1. Principios

1. **Tecnología + lo social.** En los textos visibles el grupo se nombra siempre «BeeDevelopers», no «la colmena»; el panal queda como motivo gráfico. BeeDevelopers es un grupo estudiantil que mezcla la tecnología con lo social: habilidades blandas (liderazgo, trabajo en equipo, hablar en público), convivencia entre carreras y vinculación con ponentes, empresas y otras universidades. Los textos hablan de crecer como persona, no solo de programar.
2. **Comunidad dev, no corporativo.** La identidad mezcla la marca (navy + amarillo) con guiños de código: etiquetas `// sección`, tipografía monoespaciada y una tarjeta de editor en el hero.
3. **Ritmo por alternancia.** Las secciones alternan fondo blanco, navy y crema para que la página no se sienta plana. Nunca dos secciones seguidas con el mismo fondo, salvo blanco con un cambio claro de patrón.
4. **Contenido vivo.** Priorizar bloques que cambian con el tiempo (próximos eventos, proyectos recientes, cifras) sobre texto estático.
5. **El panal como motivo.** El hexágono y el patrón de panal son el elemento gráfico de la marca. Usarlos con moderación: como acento, nunca como relleno de todo el fondo.
6. **Fotos reales.** Solo fotografías del grupo (`public/images/`). Nada de imágenes de stock ni ilustraciones genéricas.
7. **Sin datos inventados.** Cifras, fechas y testimonios se dejan como marcadores `[##]`, `[DD MES]` o `[Nombre]` hasta tener datos reales.

## 2. Tokens

### 2.1 Color

Todos viven en el bloque `:root` de `app/assets/css/main.css`.

| Token | Valor | Uso |
|---|---|---|
| `--bee-navy` | `#073354` | Títulos sobre claro, fondo del footer, botones outline |
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
- Sobre navy, el amarillo sí puede ser texto (etiqueta `// únete`, frase destacada del hero).
- Texto sobre amarillo: siempre `--bee-header`.
- Números decorativos sobre `--bee-navy-raised` (`01`, `02`, `03`): usar al menos `#9db8cc` para cumplir 3:1.

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
| Código (tarjeta del hero, chips de actividad) | JetBrains Mono | 400 | 14 px | 1.75 |

- Las familias se declaran en el bloque `@theme` de `main.css`: `--font-sans` (IBM Plex Sans), `--font-display` (Space Grotesk) y `--font-mono` (JetBrains Mono). `h1`–`h3` usan `--font-display` de forma global.
- `@nuxt/fonts` ya viene incluido con `@nuxt/ui` y descarga las familias declaradas en CSS para servirlas localmente. Los pesos 500 y 600 se piden en `fonts.defaults.weights` de `nuxt.config.ts` (por defecto solo baja 400 y 700). **No** agregar `<link>` a Google Fonts ni dependencias nuevas.
- No usar Inter, Roboto ni Arial.

### 2.3 Espaciado y layout

- **Ancho completo en monitores.** El contenido crece hasta `--bee-content-max` (1760 px) con un margen lateral fluido `--bee-gutter: clamp(20px, 4vw, 80px)`. Header, hero, cifras, secciones y footer comparten esas dos variables, así que sus bordes coinciden. En un monitor de 1920 px el contenido ocupa de borde a borde menos el margen.
- **Escala fluida.** Tamaños de texto, rellenos y filas del bento usan `clamp(mínimo, vw, máximo)`: en laptop conservan los valores de las tablas de este documento (que son el mínimo) y en monitores grandes crecen hasta el máximo (H2 hasta 58 px, frase del hero hasta 62 px, cuerpo hasta 21–22 px). No fijar tamaños en px sueltos en secciones nuevas.
- Padding vertical de sección: `clamp(56px, 7vw, 128px)`.
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
- **Marquesina de actividades:** `translateX(0 → -50%)` en 40 s, lineal e infinita; la lista se duplica para que el ciclo sea continuo (la copia lleva `aria-hidden`) y se pausa al pasar el cursor. Con movimiento reducido se convierte en una lista estática centrada.
- **Volteo de `PhotoCard`:** se conserva tal como está.
- Todo movimiento se desactiva con `@media (prefers-reduced-motion: reduce)`.

## 3. Motivos gráficos

### Patrón de panal

SVG `<pattern>` de 56×100 con este trazo:

```svg
<path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#ffda4a" stroke-width="1.5" />
```

- Componente `HoneycombPattern.vue`: dibuja el patrón con `currentColor` y un `id` único por instancia; cada sección lo posiciona y atenúa con su propia clase.
- En el hero: ocupa el 55 % derecho, `opacity: .16`, con máscara que lo desvanece hacia la izquierda.
- En «Únete»: cubre la sección completa con `opacity: .07`.
- Siempre decorativo: `aria-hidden="true"`.

### Hexágono

Polígono base en `viewBox="0 0 56 64"`: `points="28,2 54,17 54,47 28,62 2,47 2,17"`.

- Relleno amarillo con ícono navy de trazo de 2.6–3 px dentro: insignia de la tarjeta sobre navy (sin uso actual).
- Collage de «Nosotros»: dos hexágonos grandes (uno de contorno amarillo y uno relleno al 60 %) asoman arriba a la izquierda de la foto principal, y dos pequeños (navy al 12 % y contorno `#e0b100`) ocupan el hueco bajo la foto. Las fotos se superponen para que el conjunto se lea como collage.
- Viñeta de los chips de actividad: hexágono de 14×16 relleno con el color propio de cada actividad.

### Etiqueta de sección

Texto en JetBrains Mono con forma de comentario de código: `// sobre nosotros`, `// lo que hemos hecho`, `// únete`. Siempre en minúsculas.

### Íconos

Íconos de trazo (estilo Lucide), `stroke-width` 2–2.2 y extremos redondeados. Preferir `UIcon` con la colección `lucide` que usa Nuxt UI; si no está disponible localmente, usar SVG en línea antes de instalar paquetes. No usar emojis.

## 4. Patrones de componentes

| Patrón | Especificación |
|---|---|
| **Botón primario** | Fondo `--bee-yellow`, texto `--bee-header`, 600, 15 px, alto mínimo 50 px, padding 0 28 px, radio 8 px, flecha opcional. Reutilizar y ajustar `.bee-button`. |
| **Botón secundario sobre oscuro** | Transparente, borde `rgb(255 255 255 / 45%)`, texto blanco, 500. |
| **Botón outline sobre claro** | Borde y texto `--bee-navy`, 600, 14 px, alto mínimo 44 px. |
| **Pill de header** | La `.bee-button--pill` existente, alto mínimo 44 px. |
| **Distintivo del hero** | Línea editorial sin fondo ni borde, en mono mayúsculas con `letter-spacing: .14em`: hexágono de contorno amarillo con núcleo relleno + «Grupo estudiantil» en amarillo + filete amarillo de 1 px + «DICIS · Universidad de Guanajuato» en `--bee-text-on-hero`. Sustituye a la pill con punto, que se veía genérica. El filete se oculta en ≤600 px. |
| **Tag** | Pill amarilla, texto `--bee-header`, mono 11 px en mayúsculas. Se usa en el bento. |
| **Filtro** | Botón pill de 44 px de alto; el activo usa fondo navy con texto blanco y `aria-pressed="true"`. |
| **Tarjeta de código** | Fondo `rgb(4 26 43 / 88%)`, borde `rgb(255 255 255 / 12%)`, barra con tres puntos y nombre de archivo `beedevelopers.ts`, código en mono 14 px con resaltado de sintaxis estilo Material. Es decorativa: el texto debe poder leerse, pero no es contenido esencial. |
| **Franja de cifras** | Tarjeta blanca de 4 columnas (2×2 en móvil) montada `-78px` sobre el hero; separadores `#eef1f4`. Se marca como lista de definiciones (`dl`). El `+` de la primera cifra va en `#e0b100`. |
| **Chip de actividad** | Pill `#f4f6f8` con borde `#e3e8ec`, texto navy mono 14 px y viñeta hexagonal con un color distinto por actividad (definido junto a cada nombre en `HomeActivityMarquee.vue`). El color solo vive en la viñeta, nunca en el texto ni en el fondo. Nombra actividades del grupo, no tecnologías. |
| **Tarjeta sobre navy** (sin uso actual) | Fondo `--bee-navy-raised`, borde `--bee-navy-line`, padding 32 px, radio 16 px; insignia hexagonal + número `01` arriba, H3 blanco y cuerpo `--bee-text-on-dark`. |
| **Celda del bento** | Foto a sangre con degradado inferior a `rgb(5 42 69 / 92%)`, tag, título blanco; solo la celda destacada muestra descripción. |
| **Fila de evento** | Tarjeta blanca con borde `#efe6c8`: bloque de fecha navy de 72×76 (día en Space Grotesk 26 px y mes en mono amarillo) + tipo, título y metadatos + botón outline «Detalles». |
| **Testimonio** | `figure` con fondo `--bee-surface`, comillas SVG amarillas, cita de 17 px, avatar circular navy con iniciales amarillas, nombre y «Carrera · Semestre». |
| **Pasos** | Lista ordenada vertical: círculo amarillo de 44 px con número y línea `--bee-navy-line` que conecta los pasos. |
| **Panel de formulario** | Tarjeta blanca de radio 20 px y sombra `floating` sobre la sección navy; inputs de 46 px con `label` visible. Mientras no exista el formulario, el `slot` muestra un boceto no interactivo (barras y campos con borde punteado, `aria-hidden`). |

## 5. Página de inicio

Orden, fondo y componente Vue correspondiente. «Nuevo» significa crearlo en `app/components/home/`; «modificar» significa ajustar el existente sin romper su API.

| # | Sección | Fondo | Componente | Contenido y notas |
|---|---|---|---|---|
| 1 | Header | `--bee-header` | `SiteHeader.vue` | Conserva los elementos reales de `pendingPages`. Pill «Únete» desde 520 px; botón de menú hasta 1100 px, que abre un panel inferior con la navegación en columna. |
| 2 | Hero | Foto + degradado navy 97 % → 62 % + panal | `HomeHero.vue` | Distintivo «Grupo estudiantil — DICIS · Universidad de Guanajuato», logotipo, frase «Aprende construyendo. *Construye en comunidad.*» (la segunda parte en amarillo), descripción con el enfoque tecnología + social, botones «Únete a BeeDevelopers» (`/#registro`) y «Ver proyectos» (`/#proyectos`), tarjeta de código a la derecha. Padding inferior amplio para dejar espacio a la franja de cifras. |
| 3 | Cifras | Blanco (superpuesta al hero) | `HomeStats.vue` | 20+ integrantes activos, 50+ eventos organizados, 10+ hackatones en equipo, construyendo desde 2018. |
| 4 | Actividades | Blanco | `HomeActivityMarquee.vue` | Marquesina «Lo que vivimos en BeeDevelopers» con actividades del grupo (hackatones, talleres, ponencias, DevWeek, Hack Day DICIS, NASA Space Apps, mentorías, proyectos en equipo, convivencias, networking). Lleva `id="actividades"`, al que enlaza el footer. |
| 5 | Nosotros | Blanco | `HomeAbout.vue` | Collage: `Nosotros.jpeg` + `Proyectos/polilinker2.JPG` superpuesta, hexágonos detrás. H2 «En BeeDevelopers la tecnología se vuelve comunidad», párrafo y tres valores con check: habilidades blandas, convivencia y vinculación. |
| 6 | Proyectos | `--bee-cream` | `HomeHighlights.vue` | Bento de 4 columnas con filas de 240 px: Space Apps destacado (2×2), DevWeek y Hackatón · Colaboración anchos (2×1), el resto 1×1, más una celda amarilla «Ver galería completa» que enlaza a `/galeria`. Filtros: Todos / Hackatón / Ponencia / Competencia. Las celdas muestran tag y título, sin volteo. |
| 7 | Únete | `--bee-header` + panal | `HomeRegistrationSection.vue` | Tres pasos a la izquierda y el panel del formulario a la derecha; el formulario entrará por el `slot` (responsable: José Eduardo) y por ahora se muestra el boceto. Mantener `id="registro"`. |
| 8 | Footer | `--bee-navy` | `SiteFooter.vue` | Sin cambios. |

**Retirada:** «Qué hacemos» (tres tarjetas navy con insignia hexagonal). Se quitó porque el carrusel de actividades y «Nosotros» ya cuentan lo mismo; `HomeActivities.vue` se eliminó. Proyectos usa fondo crema para no dejar dos secciones blancas seguidas.

**En pausa:** «Próximos eventos» (`HomeEvents.vue`, fondo `--bee-cream`, datos en `app/utils/`) y «Voces» (`HomeVoices.vue`). Sus patrones siguen descritos en §4 para cuando haya datos reales; al reincorporarlos van entre Proyectos y Únete.

Las imágenes se sirven con `NuxtImg` (`format="webp"`, `loading="lazy"` salvo la del hero) desde `/images/...`.

### Módulo Conoce DICIS

- Mantener el módulo aislado en sus rutas y componentes con nombres `ConoceDicis*`; no cambiar la página de inicio ni los componentes globales para resolver sus necesidades.
- El encabezado del módulo usa navy, blanco y amarillo para presentar «CONOCE DICIS» y el mensaje de consulta anual. La navegación propia va en una barra horizontal encima del contenido y enlaza al calendario anual y a los grupos organizados.
- El calendario anual sigue la lectura de enero a diciembre del calendario semestral oficial de la UG: semanas de lunes a domingo, doce meses en una cuadrícula y fechas sin filtro en blanco. Los filtros por color admiten selección múltiple; las fechas de hoy conservan un contorno negro y cada día abre su detalle.
- En escritorio, la información lateral va a la izquierda en un panel con desplazamiento propio. Fechas importantes, descansos oficiales, eventos UG y servicio social se abren desde controles accesibles; cada grupo y fecha puede seleccionarse para resaltar sus días en el calendario y consultar el primer día del periodo. Cada fecha o periodo muestra sus días hábiles, calculados de lunes a viernes y descontando los asuetos listados. Los filtros por color van arriba del calendario; en pantallas pequeñas el panel de información queda debajo del calendario.
- La información lateral reúne fechas importantes, asuetos por contrato colectivo, por ley y locales de Irapuato-Salamanca, además de los periodos de servicio social. Los colores reutilizan la paleta de categorías ya definida en `app/utils/conoceDicisCalendar.ts`.
- El periodo de receso del 17 al 31 de diciembre se muestra como referencia después de las evaluaciones finales; la fuente semestral no publica fechas exactas de vacaciones.

### Página Galería

- Ruta `/galeria` (`app/pages/galeria.vue`), construida con utilidades de Tailwind y componentes de Nuxt UI (`UContainer`, `UBreadcrumb`, `UButton`, `USelect`, `UBadge`, `UModal`), sin componentes propios.
- Estructura: banda navy con panal, migas en 16 px (sin etiqueta de sección, porque ya nombran la página), H1 «Momentos de BeeDevelopers» y contadores → barra de filtros fija (tipo de evento con `aria-pressed` y año) → mosaico → «Cargar más fotos» → banda crema «Comparte tus fotos».
- Mosaico tipo Pinterest con columnas CSS: 2 columnas en móvil, 3 desde 768 px y 4 desde 1024 px. Las celdas usan cuatro formas (`landscape` 4:3, `square` 1:1, `portrait` 3:4, `tall` 2:3) para mantener el aspecto de collage. La forma se asigna sola: al cargar la foto se detecta su orientación y se alterna entre las dos formas compatibles (horizontal → `landscape`/`square`; vertical → `portrait`/`tall`) según su posición en la lista. El campo opcional `shape` fuerza una forma concreta.
- Las fotos se listan en `app/utils/galleryPhotos.ts` y los archivos van en `public/images/galeria/`. Mientras el archivo no exista, la celda muestra un marcador con la ruta esperada; evento y año vacíos se muestran como `[Evento]` y `[AÑO]`.
- Una foto cargada se eleva y hace zoom al pasar el cursor (§2.6) y abre un visor ampliado.

### Página Conócenos más

- Ruta `/conocenos` (`app/pages/conocenos.vue`), Issue #5. Los textos y listas viven en el `script` de la página.
- Estructura: encabezado navy con panal (migas, H1 «Somos BeeDevelopers», intro y botón «Únete») → índice de secciones fijo (barra blanca con anclas; las secciones llevan `scroll-mt-24`) → Historia (crema) → Lo que nos mueve: misión, visión y objetivos (blanco) → Valores (crema) → Lo que hacemos juntos: actividades (navy) → Comunidad (crema) → Preguntas frecuentes con `UAccordion` (blanco) → Únete (navy + panal).
- Reutiliza `.home-section`, `.home-container`, `.section-head`, `.section-label` y `.section-heading` para compartir márgenes y escala con el inicio.
- **Línea de tiempo** (`.timeline` en `main.css`): un hexágono amarillo de 72×82 por hito, con borde blanco de 3 px y el año en mono `--bee-header`, unidos por una línea `--bee-input-border` de 2 px. Cada hito va en una tarjeta blanca (borde `--bee-border`, radio 16 px, `.lift` al pasar el cursor). Desde 1280 px es horizontal y ocupa todo el ancho: una columna por hito, hexágonos sobre la línea y tarjetas alternadas arriba (impares) y abajo (pares), cada una de dos columnas de ancho (la primera y la última, de columna y media y alineadas al borde) y unida a su hexágono por un conector de 2 px. Por debajo de 1280 px es vertical, con la línea a la izquierda y las tarjetas a su derecha; desde 600 px el hexágono baja a 56×64. Los hitos pesan igual; el logro de 2023 no se destaca aparte. Para agregar un hito basta con sumarlo a `milestones` en orden cronológico.
- Apoyos (Major League Hacking, GitHub Campus Experts): franja secundaria bajo la línea de tiempo, en texto y sin logos.
- No se incluyen integrantes ni estructura del grupo. Las fotos de actividades y de comunidad quedan pendientes.

## 6. Responsive

- **≥1101 px:** navegación completa en el header.
- **≤1100 px:** la navegación pasa al panel inferior. El botón de menú vive dentro de `.header-actions`, así que ese contenedor nunca debe ocultarse: en pantallas chicas se oculta solo la pill.
- **<520 px:** la pill «Únete» del header se oculta (sigue disponible dentro del menú).
- **≤900 px:** las columnas de «Nosotros», «Eventos» y «Únete» se apilan (`flex-wrap` con `flex: 1 1 420–480px`). La tarjeta de código pasa debajo del texto del hero.
- **≤760 px:** el bento pasa a 2 columnas con filas de 170 px y conserva sus proporciones (destacada 2×2, anchas 2×1, chicas 1×1) para mantener el aspecto de collage; la franja de cifras pasa a 2×2 y deja de superponerse al hero (`margin-top: 0`).
- **≤600 px:** padding de sección de 56 px con margen lateral de 20 px; los botones del hero ocupan el ancho completo.
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
- Seguir el estilo actual: clases semánticas en kebab-case (`.home-stats`, `.bento-cell`) con estilos en `main.css`. Las secciones de inicio comparten `.home-section`, `.home-container`, `.section-head`, `.section-label` y `.section-heading`.
- Las secciones `Home*` usan HTML semántico propio porque su maquetación (collage, bento, franja superpuesta) no encaja en los slots de `UPageSection`/`UPageHero`. Reutilizar `UButton`, `NuxtImg`, `NuxtLink` y `HoneycombPattern`, y la prop `:ui` cuando sí se use un componente de Nuxt UI (header, footer).
- No instalar dependencias para fuentes, íconos ni animaciones; todo lo descrito se resuelve con CSS, SVG y los módulos ya instalados.
- Validar con `pnpm lint` y `pnpm typecheck` después de cada cambio, y con `pnpm build` si cambia configuración.

## 9. Pendientes

- [ ] Fuente de datos y próximos eventos reales para reincorporar «Próximos eventos» y el chip del hero.
- [ ] Testimonios con autorización de los integrantes para reincorporar «Voces».
- [ ] Formulario de registro real en el `slot` de «Únete».
- [ ] `PhotoCard.vue` y sus estilos ya no se usan en inicio: decidir si se eliminan o se reutilizan en otra página.
- [ ] Fotos, eventos y años reales de la Galería (`app/utils/galleryPhotos.ts`), y canal de «Comparte tus fotos».
