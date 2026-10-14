# Guía de trabajo — BeeDevelopers

## Tecnologías y comandos

- Mantener la arquitectura de Nuxt 4 con Vue 3, TypeScript, Nuxt UI 4 y Tailwind CSS 4. El proyecto utiliza SSR, Nuxt Image con IPX, Sitemap, Robots y Nuxt ESLint.
- Usar Node 24.x y pnpm según `.node-version` y `package.json` (actualmente pnpm 11.17.0). Conservar `pnpm-lock.yaml` y `pnpm-workspace.yaml`; no introducir lockfiles de otros gestores.
- Desarrollo: `pnpm dev`. Validación: `pnpm lint`, `pnpm typecheck` y `pnpm build`. Vista previa de la compilación: `pnpm preview`. `pnpm generate` está disponible para generación estática; no cambiar la estrategia SSR sin justificarlo.

## Estructura y convenciones

- `app/app.vue` contiene el marco raíz; conservar las funciones de `UApp`, `NuxtPage` y `NuxtRouteAnnouncer` al modificarlo.
- Las rutas viven en `app/pages/`; el inicio existente es `app/pages/index.vue`. Crear componentes, layouts, composables o plugins dentro de `app/` solo cuando la tarea lo requiera.
- Mantener los estilos globales en `app/assets/css/main.css`, utilizando Tailwind y los estilos de Nuxt UI.
- Guardar imágenes públicas en `public/images/`, referenciarlas como `/images/...` y aprovechar `NuxtImg` para su optimización.
- Respetar `<script setup lang="ts">`, Composition API, autoimportaciones de Nuxt y las convenciones de formato del código existente. Mantener el idioma español y los metadatos de página mediante `useSeoMeta` cuando corresponda.
- La configuración principal está en `nuxt.config.ts`; TypeScript y ESLint se apoyan en archivos generados en `.nuxt`. No editar esos archivos generados.
- Configurar el dominio mediante `NUXT_SITE_URL`, según `.env.example`. No crear `public/robots.txt`: su ruta la administra el módulo Robots.

## Alcance, reutilización y validación

- Revisar el código existente antes de crear componentes. Reutilizar componentes propios equivalentes y las bases disponibles, como `UContainer`, `UButton`, `UCard` y `NuxtImg`; evitar duplicaciones y abstracciones sin necesidad concreta.
- Limitar los cambios al alcance de la tarea. Justificar explícitamente cualquier modificación necesaria fuera de ese alcance y preservar cambios ajenos.
- No instalar ni actualizar dependencias innecesariamente. Comprobar primero si las capacidades existentes resuelven la necesidad y justificar cualquier incorporación.
- Después de cambiar código, ejecutar las validaciones apropiadas: lint y tipos; también compilación cuando se afecten integración, configuración o comportamiento de producción. Para cambios visuales o interactivos, comprobar presentación responsive, navegación y accesibilidad básica.
- Para cambios exclusivamente documentales, revisar contenido y diff; no ejecutar compilaciones sin necesidad. Informar qué se validó y qué no pudo verificarse, sin presentar comprobaciones no ejecutadas como exitosas.
- Consultar `docs/TASKS_LUIS.md` para el desglose de las Issues #1 y #2; mantener las tareas detalladas fuera de esta guía.
