# Tareas de Luis — BeeDevelopers

Documento de trabajo de **Luis Alejandro Rodríguez Luna (@Alex-stack-sys)** para:

- [Issue #1: Diseño de interfaz y componentes globales](https://github.com/BeeDevelopers/beepage2026/issues/1).
- [Issue #2: Página de inicio de BeeDevelopers](https://github.com/BeeDevelopers/beepage2026/issues/2).

## Alcance y uso del documento

El orden de las tareas representa el orden recomendado de implementación. El comportamiento responsive y la accesibilidad deben considerarse desde cada componente; su revisión conjunta aparece al final.

Estados: **Pendiente**, **En curso**, **Bloqueada por dependencia** y **Completada**. Marcar una tarea como completada solo cuando se cumplan sus criterios de terminado.

Leyenda de subtareas:

- [ ] Pendiente
- [x] Completado

Los estados reflejan la implementación y las verificaciones efectivamente realizadas. Las dependencias de otros integrantes permanecen pendientes.

### Base revisada

- Nuxt 4.5.2, Vue 3.5.42, Nuxt UI 4.11.1 y Tailwind CSS 4.3.3 según el lockfile.
- Gestor de paquetes: pnpm 11.17.0; versión requerida de Node: 24.x.
- Inicio existente en `app/pages/index.vue`, actualmente una demostración.
- Contenedor raíz en `app/app.vue`, con `UApp`, `NuxtRouteAnnouncer` y `NuxtPage`.
- Componentes ya utilizados: `UContainer`, `UBadge`, `UCard`, `UButton` y `NuxtImg`.
- CSS global en `app/assets/css/main.css`; no hay componentes propios ni layouts en la base revisada.
- Scripts disponibles: `lint`, `typecheck` y `build`; no existe una infraestructura de pruebas automatizadas propia.

Fuentes: Issues #1 y #2, reporte intermedio del proyecto y captura `visily-landing-page (1).jpg`. La captura contiene una marca de Visily; no se dispone de propiedades editables de Figma ni de vistas móviles. No se consideran confirmados valores exactos de tipografía, colores, medidas o interacciones a partir de la imagen.

Las rutas de este documento son relativas a la raíz del repositorio. Los nombres de archivos nuevos son propuestas: comprobar lo que exista al iniciar cada tarea y reutilizar equivalentes antes de crear otros. No se requiere añadir dependencias por defecto.

## 0. Acordar contenido, alcance y puntos de integración

**Estado:** En curso.

**Objetivo:** Resolver las diferencias entre las fuentes antes de convertirlas en decisiones de implementación.

**Descripción:** Confirmar contenidos, destinos y recursos que la captura no define, sin asumir que el diseño sustituye las Issues o el reporte.

**Subtareas:**

- [x] Confirmar si «Sobre Nosotros» representa la sección «¿Qué es BeeDevelopers?».
- [x] Acordar la representación diferenciada de «¿Qué hacemos?» y «¿Qué hemos hecho?».
- [x] Confirmar los destinos de «Comenzar ahora» y «Únete a nosotros».
- [ ] Acordar las rutas y nombres de las páginas con sus responsables.
- [x] Confirmar los textos, idioma, redes y destinos del footer.
- [ ] Obtener logotipo, fotografías y tipografía definitivos.
- [x] Acordar la composición móvil y de tableta donde no exista referencia visual.
- [x] Registrar las decisiones y las dependencias todavía pendientes en el medio de coordinación del equipo.

**Componentes involucrados:** Ninguno por implementar en esta tarea; las decisiones afectan cabecera, footer, Inicio y registro.

**Archivos involucrados:** No requiere crear o modificar archivos de implementación. Este documento puede actualizarse con los acuerdos.

**Dependencias:** Equipo, responsables de contenido y recursos de diseño.

**Criterios de terminado:**

- Las diferencias relevantes están resueltas o identificadas como dependencias explícitas.
- Las tareas que comiencen cuentan con contenido y comportamiento suficientemente definidos.

**Notas importantes:**

- La captura mezcla actividades actuales con proyectos realizados y no muestra «¿Qué hemos hecho?» como sección independiente.
- Los seis proyectos son placeholders; no confirman una cantidad obligatoria ni interacciones.
- El espacio de registro no transfiere a Luis la responsabilidad funcional del formulario.
- La zona blanca posterior al footer y la marca de Visily no se consideran contenido del sitio sin confirmación.

**Avance y pendientes de esta entrega:** Se usa el título de la tarea para el resumen; actividades y trayectoria se presentan por separado. Los CTA apuntan a #nosotros y #registro. Las rutas de otras páginas y la aprobación editorial final siguen pendientes. Se usa Arial/Helvetica del sistema.

## 1. Componentes globales: identidad visual y bases reutilizables

**Estado:** En curso.

**Objetivo:** Establecer una identidad visual consistente para todas las páginas, conforme a la Issue #1.

**Descripción:** Personalizar las herramientas existentes y crear componentes compartidos solo cuando haya repetición o una necesidad concreta.

**Subtareas:**

- [x] Definir colores, tipografía y jerarquía de encabezados.
- [x] Definir espaciados y anchuras de contenido.
- [ ] Definir variantes de botones, enlaces, tarjetas y estilos visuales de formularios.
- [x] Definir estados de foco, hover y deshabilitado donde correspondan.
- [x] Incorporar la marca oficial en una representación reutilizable.
- [x] Configurar Nuxt UI y los estilos globales antes de crear equivalentes propios.
- [x] Extraer encabezados o tarjetas compartidos únicamente cuando el contenido justifique su reutilización.
- [x] Comprobar si el favicon existente corresponde a la identidad del grupo.

**Componentes involucrados:**

- Propuesto: `SiteLogo`.
- Reutilizables existentes: `UButton`, `UCard`, `UContainer` y `NuxtImg`.
- Encabezados o tarjetas compartidos: sujetos a una necesidad confirmada.

**Archivos involucrados:**

- Modificar: `app/assets/css/main.css`.
- Crear probablemente: `app/components/SiteLogo.vue`.
- Crear condicionalmente: `app/app.config.ts`, si se centraliza allí la personalización de Nuxt UI.
- Añadir recursos oficiales: `public/images/`.
- Modificar condicionalmente: `nuxt.config.ts`, solo por requisitos de configuración confirmados.
- Fuentes locales y favicon: actuar únicamente si los recursos y la decisión de utilizarlos están confirmados.

**Dependencias:** Tarea 0; paleta, tipografía y recursos oficiales.

**Criterios de terminado:**

- La identidad se define de manera centralizada y es reutilizable por el equipo.
- Los controles tienen apariencia consistente y foco visible.
- No se duplican sin necesidad las capacidades de Nuxt UI o Nuxt Image.

**Notas importantes:** Riesgos: interpretar colores o medidas aproximados como especificaciones exactas, introducir abstracciones innecesarias y afectar otras páginas con cambios globales. Estilizar formularios no incluye implementar Airtable.

**Avance y pendientes de esta entrega:** Identidad, logo, favicon y bases visuales implementados con Nuxt UI. Falta acordar estilos de controles de formulario con José Eduardo; no se implementó el formulario. Se reutilizan recursos directamente desde `public/images/Logos`.

## 2. Componentes globales: cabecera y navegación

**Estado:** En curso.

**Objetivo:** Ofrecer navegación compartida en escritorio y móvil, conforme a la Issue #1.

**Descripción:** Incorporar marca, enlaces y llamada a la acción dentro de un marco compartido por las páginas.

**Subtareas:**

- [x] Incorporar marca, enlaces acordados y llamada a la acción.
- [x] Implementar apertura y cierre del menú móvil.
- [x] Resolver navegación con teclado y gestión del foco según la presentación elegida.
- [ ] Representar la ruta activa cuando corresponda.
- [x] Integrar la cabecera en el layout compartido.
- [x] Conservar `UApp`, `NuxtPage` y `NuxtRouteAnnouncer` al integrar el layout.
- [x] Verificar que los enlaces disponibles llevan a destinos correctos.

**Componentes involucrados:**

- Propuestos: `SiteHeader`, `SiteLogo` y layout por defecto; se utiliza `UHeader` con `UNavigationMenu`.
- Menú móvil: puede permanecer dentro de `SiteHeader` si no necesita separación.
- Reutilizar: `UButton`, `UContainer` y `NuxtLink`.

**Archivos involucrados:**

- Crear probablemente: `app/components/SiteHeader.vue` y `app/layouts/default.vue`.
- Modificar: `app/app.vue`.
- Reutilizar: `app/components/SiteLogo.vue`, una vez disponible.

**Dependencias:** Tareas 0 y 1; rutas del equipo y destino de «Únete a nosotros».

**Criterios de terminado:**

- La cabecera se comparte entre las páginas y no aparece duplicada.
- El menú móvil abre, cierra y permite navegar con teclado y controles identificados.
- No existe desbordamiento horizontal accidental.
- Los destinos pendientes de otros integrantes se identifican como dependencias, no como funcionalidades completadas.

**Notas importantes:** No asumir una cabecera fija ni crear páginas ajenas para resolver enlaces. Riesgos: rutas inexistentes y pérdida de foco al abrir o cerrar el menú.

**Avance y pendientes de esta entrega:** Navbar y menú móvil implementados; Escape cierra y devuelve el foco. Los cuatro destinos ajenos están deshabilitados y anunciados como próximamente hasta recibir rutas reales. El estado activo se aplicará cuando existan dichas rutas.

## 3. Componentes globales: pie de página

**Estado:** En curso.

**Objetivo:** Crear un footer compartido con contenido oficial, conforme a la Issue #1.

**Descripción:** Reproducir la organización visual de la referencia con marca, descripción, enlaces y redes confirmados.

**Subtareas:**

- [ ] Incorporar la marca y descripción aprobada.
- [x] Organizar los grupos de enlaces confirmados.
- [x] Resolver el idioma y contenido de «Services», «Group» y «Connect».
- [x] Incorporar redes y copyright con la información confirmada.
- [x] Añadir nombres accesibles a enlaces representados por iconos.
- [x] Integrar el footer en el layout compartido.
- [x] Verificar destinos y legibilidad.

**Componentes involucrados:**

- Propuesto: `SiteFooter`.
- Reutilizar: `SiteLogo`, `UFooter`, `UFooterColumns`, `UContainer`, `NuxtLink` para rutas internas y `NuxtImg` para logos sociales locales.
- Los grupos de enlaces pueden permanecer dentro del footer.

**Archivos involucrados:**

- Crear: `app/components/SiteFooter.vue`.
- Modificar: `app/layouts/default.vue`.

**Dependencias:** Tareas 0 y 1; layout de la tarea 2; URLs y contenido oficiales.

**Criterios de terminado:**

- El footer utiliza contenido confirmado y se integra sin duplicación.
- Los enlaces funcionan y los iconos tienen nombres accesibles.
- El texto resulta legible y mantiene coherencia con la identidad global.

**Notas importantes:** El diseño no justifica crear páginas nuevas de servicios o contacto. Riesgos: conservar enlaces de plantilla, datos no confirmados o textos demasiado pequeños.

**Avance y pendientes de esta entrega:** Footer implementado con cuatro columnas, enlaces internos y redes sociales con destinos confirmados. Los logos locales de Facebook, Instagram, LinkedIn y Twitter aparecen en la parte inferior derecha; el copyright identifica al grupo como estudiantil y sin fines de lucro. Falta aprobación editorial final del contenido.

## 4. Página Inicio: Hero y presentación del grupo

**Estado:** En curso.

**Objetivo:** Sustituir la demostración por una presentación real de BeeDevelopers, conforme a la Issue #2.

**Descripción:** Desarrollar el Hero y el resumen introductorio del grupo en la ruta `/` existente.

**Subtareas:**

- [x] Incorporar fotografía, tratamiento azul, título y descripción del Hero.
- [x] Incorporar la llamada a la acción con destino confirmado.
- [x] Mostrar el logotipo oficial de BeeDevelopers en el título del Hero.
- [x] Incorporar el resumen del grupo y su fotografía.
- [x] Hacer que la imagen del resumen se adapte al ancho disponible en pantallas grandes.
- [x] Aplicar el título acordado para «Sobre Nosotros» / «¿Qué es BeeDevelopers?».
- [x] Mantener una jerarquía semántica de encabezados.
- [x] Sustituir los metadatos genéricos por los correspondientes al Inicio.
- [x] Retirar del Inicio el contador y contenido demostrativo que no pertenezcan al diseño.
- [ ] Coordinar la consistencia del resumen con la información de «Conócenos más».

**Componentes involucrados:**

- Propuestos: `HomeHero` y `HomeAbout`.
- Reutilizar: `UContainer`, `UButton`, `NuxtImg` y `useSeoMeta`.

**Archivos involucrados:**

- Crear probablemente: `app/components/home/HomeHero.vue` y `app/components/home/HomeAbout.vue`.
- Añadir fotografías definitivas: `public/images/`.
- Modificar: `app/pages/index.vue`.

**Dependencias:** Tareas 0 y 1; fotografías y textos; coordinación con Fernando; destino del CTA.

**Criterios de terminado:**

- La ruta existente presenta al grupo con contenido real y metadatos propios.
- El texto sobre la fotografía es legible y el CTA funciona según lo acordado.
- El resumen es consistente con la información ampliada del grupo.
- El contenido demostrativo no permanece como parte de la entrega final.

**Notas importantes:** No crear otra página inicial ni duplicar la página completa de Fernando. Riesgos: recortes inadecuados, recursos pesados y bajo contraste sobre la fotografía.

**Avance y pendientes de esta entrega:** Hero y resumen implementados con `hero.jpg` y `Nosotros.jpeg`; el título muestra el logotipo oficial y la imagen del resumen se adapta al ancho de pantalla. Falta revisión editorial conjunta con Fernando; no bloquea el funcionamiento del Inicio.

## 5. Página Inicio: actividades y trayectoria

**Estado:** Completada.

**Objetivo:** Cubrir «¿Qué hacemos?» y «¿Qué hemos hecho?» como finalidades diferenciadas de la Issue #2.

**Descripción:** Presentar actividades y áreas de participación, junto con una selección de proyectos, talleres o eventos realizados, conforme al acuerdo visual de la tarea 0.

**Subtareas:**

- [x] Organizar el contenido de actividades y áreas de participación.
- [x] Organizar el contenido de proyectos, eventos, talleres y actividades anteriores.
- [x] Aplicar la separación visual acordada entre ambas finalidades.
- [x] Sustituir los placeholders «Proyecto 1–6» por contenido real.
- [x] Incorporar fotografías y recursos representativos.
- [x] Reutilizar una tarjeta si los elementos comparten estructura real.
- [x] Mostrar una descripción complementaria al voltear las tarjetas con cursor o control de teclado/toque.
- [x] Añadir accesos hacia otras secciones únicamente con destinos confirmados.

**Componentes involucrados:**

- Propuestos: `HomeActivities` y `HomeHighlights`.
- Tarjeta propia: solo si la estructura repetida la justifica.
- Reutilizar: `UContainer`, `UCard` y `NuxtImg`.

**Archivos involucrados:**

- Crear probablemente: `app/components/home/HomeActivities.vue` y `app/components/home/HomeHighlights.vue`.
- Crear condicionalmente: componente de tarjeta, con nombre y ubicación definidos según su alcance real.
- Añadir imágenes: `public/images/`, coordinando recursos ya disponibles.
- Modificar: `app/pages/index.vue`.

**Dependencias:** Tareas 0 y 1; contenido del equipo; recursos coordinados con Jorge.

**Criterios de terminado:**

- Las actividades actuales y la trayectoria quedan identificables.
- Se utilizan contenido y recursos reales, sin placeholders en la entrega final.
- Los enlaces existentes funcionan y no se aparentan interacciones inexistentes.

**Notas importantes:** La captura no confirma que las tarjetas sean clicables ni que deban ser exactamente seis. No añadir filtros, carruseles, modales o páginas de detalle sin nuevos requisitos. Riesgo principal: dar por satisfechas dos secciones documentadas con una rejilla ambigua.

**Avance y pendientes de esta entrega:** Secciones diferenciadas implementadas con Nuxt UI. Se reutilizan las seis fotos de `public/images/Proyectos`; cada tarjeta permite consultar una descripción complementaria. Los nombres de actividades proceden del contenido disponible, sin añadir fechas, premios o resultados no confirmados. No hay filtros, modales ni páginas de detalle.

## 6. Integración: registro y páginas de otros integrantes

**Estado:** En curso.

**Objetivo:** Conectar Inicio y los componentes globales con el trabajo del equipo sin asumir su implementación funcional.

**Descripción:** Integrar rutas, recursos compartidos y el acceso al registro. Si se confirma el formulario dentro del Inicio, montar el componente entregado por José Eduardo.

**Subtareas:**

- [ ] Acordar con José Eduardo si el registro se integra en Inicio o se accede mediante un enlace.
- [ ] Acordar la interfaz de integración del componente de registro, si corresponde.
- [x] Preparar el contenedor visual del registro únicamente si se confirma su inclusión.
- [ ] Integrar el componente entregado por José Eduardo, sin duplicar su lógica.
- [ ] Coordinar la apariencia del formulario con los estilos globales.
- [x] Verificar destinos de menú, footer y llamadas a la acción con cada responsable.
- [x] Coordinar fotografías compartidas para evitar copias innecesarias.
- [x] Identificar las dependencias pendientes antes de declarar finalizada la integración.

**Componentes involucrados:**

- Componente de registro aportado por José Eduardo, si se integra dentro de Inicio.
- Propuesto condicionalmente: `HomeRegistrationSection`.
- Reutilizar: `UContainer`, estilos globales, cabecera y footer.

**Archivos involucrados:**

- Crear solo si se confirma: `app/components/home/HomeRegistrationSection.vue`.
- Modificar según los acuerdos: `app/pages/index.vue`, `app/components/SiteHeader.vue` y `app/components/SiteFooter.vue`.
- El archivo del formulario y su lógica se coordina con José Eduardo; no se presupone su nombre o ubicación.

**Dependencias:** Tareas anteriores; rutas disponibles, recursos compartidos y entrega del registro por su responsable.

**Criterios de terminado:**

- El acceso al registro y a las páginas funciona conforme a los acuerdos.
- La integración visual mantiene coherencia con el sitio.
- No existe lógica duplicada de registro ni invasión del alcance de otros integrantes.
- Las dependencias aún no entregadas permanecen señaladas como pendientes.

**Notas importantes:** Campos, validaciones, Airtable, envío y mensajes de resultado pertenecen a José Eduardo. No implementar estas funciones para reemplazar una entrega pendiente. Riesgos: cambios de rutas y contratos de integración no acordados.

**Avance y pendientes de esta entrega:** Se preparó el área visual de registro para integrar posteriormente el formulario de su responsable. No incluye campos, validaciones, almacenamiento ni conexión con Airtable.

## 7. Responsive: revisión transversal

**Estado:** En curso.

**Objetivo:** Asegurar la usabilidad de componentes globales e Inicio en móvil, tableta y escritorio.

**Descripción:** Revisar conjuntamente las adaptaciones consideradas durante las tareas anteriores, utilizando contenido real.

**Subtareas:**

- [x] Revisar la cabecera y el menú móvil.
- [x] Ajustar tipografía, márgenes, altura y recorte del Hero.
- [x] Adaptar las columnas de presentación del grupo y su orden de lectura.
- [x] Ajustar la rejilla de actividades y proyectos al espacio disponible.
- [ ] Revisar el panel de registro con el contenido real, si está integrado.
- [x] Reorganizar las columnas del footer sin perder legibilidad.
- [ ] Comprobar textos largos, ampliación del navegador y áreas táctiles.
- [x] Comprobar que no haya desbordamientos, solapamientos ni contenido cortado.

**Componentes involucrados:** Los desarrollados en las tareas anteriores. Reutilizar utilidades responsive de Tailwind y capacidades de los componentes existentes.

**Archivos involucrados:**

- Crear: ninguno específico de esta fase.
- Modificar: componentes afectados y `app/assets/css/main.css` cuando el ajuste sea global.

**Dependencias:** Contenido real, componentes integrados y acuerdos visuales para móvil y tableta.

**Criterios de terminado:**

- No hay desplazamiento horizontal accidental ni contenido inaccesible en los tamaños revisados.
- Navegación, textos, imágenes y controles mantienen su usabilidad.
- La composición se adapta sin depender de alturas rígidas que recorten contenido.

**Notas importantes:** No duplicar componentes en versiones móviles independientes sin necesidad. La captura no define breakpoints exactos. Esta revisión no sustituye el trabajo responsive durante cada tarea.

**Avance y pendientes de esta entrega:** Revisión visual en 320, 390, 768 y 1440 px; sin desbordamiento horizontal en los tamaños comprobados. Pendientes: pruebas con el formulario real y una revisión específica de ampliación/textos largos.

## 8. Pruebas y comprobación de aceptación

**Estado:** En curso.

**Objetivo:** Verificar funcionamiento, presentación y cumplimiento de las Issues #1 y #2.

**Descripción:** Utilizar las comprobaciones existentes y pruebas funcionales y visuales adecuadas al alcance, sin añadir infraestructura de pruebas por defecto.

**Subtareas:**

- [x] Ejecutar `pnpm lint` cuando se realice la implementación.
- [x] Ejecutar `pnpm typecheck`.
- [x] Ejecutar `pnpm build`.
- [x] Verificar la carga directa del Inicio y la ausencia de errores de hidratación.
- [x] Probar navegación, CTA, footer y menú móvil.
- [x] Revisar el recorrido con teclado y el foco visible.
- [x] Revisar encabezados, textos alternativos y contraste.
- [x] Comparar la presentación con la referencia y los cambios acordados.
- [x] Comprobar el resultado en móvil, tableta y escritorio.
- [ ] Verificar con José Eduardo la integración del registro, si corresponde.
- [x] Contrastar cada requisito de las Issues con la entrega y señalar dependencias pendientes.
- [x] Corregir los defectos encontrados y repetir las comprobaciones afectadas.

**Componentes involucrados:** Inicio, componentes globales y puntos de integración. Reutilizar los scripts existentes de validación.

**Archivos involucrados:**

- Crear: ninguno obligatorio.
- Modificar: únicamente archivos con defectos detectados; actualizar el estado de este documento conforme a resultados reales.
- No se requiere cambiar `package.json` para incorporar pruebas adicionales sin una necesidad justificada.

**Dependencias:** Tareas anteriores, contenido definitivo y módulos externos disponibles para probar su integración.

**Criterios de terminado:**

- Lint, tipos y compilación finalizan correctamente.
- La navegación y las interacciones implementadas funcionan.
- La revisión visual, responsive y de accesibilidad básica está completada.
- Cada requisito está verificado o permanece explícitamente pendiente de una dependencia; los pendientes no se marcan como completados.

**Notas importantes:** Una compilación correcta no demuestra por sí sola conformidad visual o funcional. Las pruebas internas de Airtable pertenecen a José Eduardo. No declarar terminado el registro si solo existe su contenedor visual.

**Avance y pendientes de esta entrega:** Lint, typecheck y build ejecutados. Revisión de imágenes, navegación, CTA, Escape y consola sin errores de la página. No existe script de tests. Pendiente integración funcional con el registro y rutas de compañeros. Build emite avisos de deprecación de dependencias, no errores de compilación.

## Dependencias con otros integrantes

| Integrante | Responsabilidad directa según el reporte | Coordinación con Luis | Fuera del alcance directo de Luis |
| --- | --- | --- | --- |
| José Eduardo Conejo Serrano | Formulario de registro y conexión con Airtable. | Ubicación o acceso al registro, estilos y montaje de su componente. | Campos, validaciones, conexión, envío, almacenamiento y mensajes funcionales de resultado. |
| Carlos Fernando Guitierrez Parra | «BeeDevelopers: Conócenos Más». | Ruta de navegación, identidad visual y consistencia del resumen del Inicio. | Página completa de historia, misión, visión, valores, integrantes y comunidad. |
| Daniel Diaz Medina | Beneficios del correo institucional. | Ruta, estilos y bases visuales compartidas. | Investigación, clasificación y contenido de beneficios y servicios. |
| Alexis Razo Armenta | Guías de beneficios del correo institucional. | Coherencia visual y navegación hacia sus contenidos. | Procedimientos, instrucciones y verificación de servicios de las guías. |
| Marcos Ulises Romo Vieyra | Conoce DICIS: calendario, grupos organizados y accesos rápidos. | Rutas y componentes visuales compartidos cuando corresponda. | Implementación y contenido de esos módulos. |
| Axel Rainier Vera Soto | Trámites universitarios, incluido Seguro Social. | Navegación e identidad visual. | Investigación, requisitos y guías de trámites. |
| Jorge Solis Contreras | Galería de BeeDevelopers. | Fotografías destacadas en Inicio y organización de recursos compartidos. | Galería completa, ampliación de imágenes y funcionalidades propias de ese módulo. |

La configuración, arquitectura, rutas, layouts, estilos y recursos estáticos aparecen como actividades compartidas en el reporte. Luis puede trabajar en los elementos necesarios para sus Issues, pero no se le atribuye toda la arquitectura del proyecto.

## Límites y decisiones pendientes de alcance

- Las Issues y el reporte exigen dos finalidades diferenciadas: «¿Qué hacemos?» y «¿Qué hemos hecho?». La captura no resuelve su separación.
- El nombre «Sobre Nosotros» debe contrastarse con «¿Qué es BeeDevelopers?» antes de dar por aceptado el cambio.
- La captura no define el menú móvil ni los estados interactivos.
- Los textos en inglés y destinos del footer necesitan confirmación; no justifican crear páginas nuevas.
- No se añaden buscadores, carruseles, filtros, modales, CMS ni páginas de detalle sin requisitos adicionales.
- Las tarjetas no se consideran clicables sin un destino o comportamiento confirmado.
- La selección de fotografías en Inicio no implica implementar la galería completa.
- Reutilizar la página `/`, Nuxt UI y Nuxt Image antes de crear soluciones equivalentes.
- Este documento organiza trabajo futuro; no autoriza por sí mismo despliegues, commits ni cambios fuera del alcance acordado.

## Cambios actuales en componentes globales y página Inicio

### Componentes de Nuxt UI reutilizados

- La navegación y el Hero utilizan `UButton`; los encabezados de secciones utilizan `UPageSection`. Se retiraron `app/components/SiteButton.vue` y `app/components/SectionHeading.vue`, que ya no eran necesarios.
- La cabecera utiliza `UHeader` y `UNavigationMenu` para la navegación de escritorio y el menú móvil.
- El footer utiliza `UFooter` y `UFooterColumns`; las tarjetas fotográficas y el panel visual del registro utilizan `UCard`.
- La presentación principal utiliza `UPageHero`.

### Ajustes de presentación y contenido

- La sección «¿Qué es BeeDevelopers?» ahora se extiende a lo ancho de la pantalla. Su fotografía conserva una proporción panorámica, se adapta al espacio de la columna y ofrece tamaños de imagen adecuados a pantallas amplias.
- El título del Hero ahora muestra el logotipo oficial de BeeDevelopers en vez de volver a escribir su nombre como texto.
- Las tarjetas de fotografías giran al pasar el cursor y también se pueden voltear mediante su botón. El reverso presenta una descripción relacionada con lo que muestra cada imagen; no agrega fechas ni resultados que no estén confirmados.
- El texto del pie de página ahora identifica a BeeDevelopers como grupo estudiantil sin fines de lucro.
- Los títulos de «¿Qué hacemos?» y «¿Qué hemos hecho?» se mantienen alineados a la izquierda.

### Enlaces a redes sociales

Se utilizaron los logotipos disponibles en `public/images/Logos/Redes Sociales/` y se enlazaron en la esquina inferior derecha del pie de página:

- Facebook: https://www.facebook.com/BeeDevelopersUG/
- Instagram: https://www.instagram.com/beedevelopers/
- LinkedIn: https://www.linkedin.com/company/beedevelopers
- X (Twitter): https://x.com/BeeDevelopers

Cada enlace tiene un nombre accesible, abre el destino externo en otra pestaña y reutiliza la imagen local de la red correspondiente. Se seleccionaron únicamente los cuatro logos necesarios.

### Archivos de implementación actualizados

- `app/components/SiteHeader.vue` y `app/components/SiteFooter.vue`.
- `app/components/PhotoCard.vue`.
- `app/components/home/HomeAbout.vue`, `HomeHero.vue`, `HomeActivities.vue`, `HomeHighlights.vue` y `HomeRegistrationSection.vue`.
- `app/assets/css/main.css`.
- Recursos utilizados: los cuatro logotipos sociales, el logotipo existente del Hero y las fotografías que ya se muestran en Inicio.

### Comprobaciones de esta revisión

- `pnpm lint`: correcto.
- `pnpm typecheck`: correcto.
- `pnpm build`: correcto; se mostraron advertencias de herramientas y dependencias que no impidieron la compilación.
- En el navegador de escritorio se revisaron el Hero, la sección panorámica, la alineación de títulos, las tarjetas y los enlaces sociales. También se comprobó que una tarjeta se voltee al pasar el cursor y mediante su botón.
- La distribución para tamaños pequeños está definida en `main.css`, pero no se capturó una vista del navegador con el ancho móvil durante esta revisión.
