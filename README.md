# beepage2026

Base de Nuxt 4 con renderizado en servidor, Nuxt UI, Nuxt Image, Sitemap,
Robots y ESLint. Creada con el starter oficial `v4` de `create-nuxt`.

## Requisitos e instalación

- Node.js 24 (ver `.node-version`).
- pnpm 11.17.0, fijado en `packageManager`.

```sh
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

Abrir http://localhost:3000. La instalación ejecuta `nuxt prepare` para generar
los tipos y la configuración de ESLint en `.nuxt`.

`pnpm-workspace.yaml` autoriza únicamente los scripts de instalación necesarios
de `esbuild`, `unrs-resolver` y `vue-demi`. Conservarlo junto al lockfile.

## Comandos

| Comando | Uso |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con recarga automática. |
| `pnpm lint` | Comprobar el código con la configuración oficial de Nuxt ESLint. |
| `pnpm typecheck` | Comprobar tipos de TypeScript y componentes Vue. |
| `pnpm build` | Crear el servidor de producción en `.output`. |
| `pnpm preview` | Probar localmente la compilación de producción. |
| `pnpm generate` | Comando del starter para generación estática; esta base está validada para SSR. |

TypeScript está fijado a la serie 5.9, compatible con el analizador de ESLint
instalado. Antes de actualizarlo, revisar las dependencias pares con
`pnpm peers check` y ejecutar las validaciones.

Aviso conocido del CLI: `pnpm peers check` informa que la dependencia opcional
`cac` de `@bomb.sh/tab` solicita la serie 6 y recibe la 7. No afectó la
instalación, lint, tipos, compilación ni los servidores en las comprobaciones
realizadas. No se fuerza una versión distinta de las dependencias internas de Nuxt.

## Estructura y módulos

- `app/app.vue`: contenedor `UApp` y enrutamiento con `NuxtPage`.
- `app/pages/index.vue`: página de inicio en español, contador interactivo
  con `UButton` e imagen local optimizada.
- `app/assets/css/main.css`: importaciones de Tailwind CSS y Nuxt UI.
- `public/images`: imágenes locales; `sample.png` es un patrón de prueba
  generado para este proyecto.
- `nuxt.config.ts`: módulos, idioma, nombre del sitio y proveedor IPX.

Nuxt UI conserva su tema predeterminado y registra sus integraciones de iconos,
fuentes y modo de color automáticamente. No necesitan entradas adicionales en
`modules`.

## Imágenes

Colocar los archivos en `public/images` y referenciarlos sin el prefijo `public`:

```vue
<NuxtImg
  src="/images/sample.png"
  alt="Descripción de la imagen"
  width="960"
  height="540"
  sizes="100vw sm:640px"
  format="webp"
/>
```

IPX genera las variantes optimizadas. No hay proveedores externos ni dominios
remotos configurados. Compilar en el sistema y arquitectura de destino para
incluir los binarios de Sharp apropiados.

## Dominio, sitemap y robots

Completar `NUXT_SITE_URL` con la URL absoluta del dominio real antes de desplegar.
No hay un dominio de producción predefinido. Nuxt Site Config, incluido por los
módulos SEO, lee esta variable tanto al compilar como al ejecutar el servidor.

- `/sitemap.xml` descubre las páginas públicas y utiliza la URL canónica indicada.
- `/robots.txt` incluye `Disallow: /` en desarrollo.
- En producción, Robots permite la indexación y referencia el sitemap.
- En staging, establecer `NUXT_SITE_INDEXABLE=false` en el entorno del servidor
  para impedir la indexación, aunque se esté ejecutando una compilación de producción.

No crear `public/robots.txt`: la ruta la administra el módulo. No establecer
`NUXT_SITE_INDEXABLE=true` en desarrollo. Si en el futuro se añaden rutas dinámicas
desde un CMS o API, registrar esas URLs en las fuentes de Sitemap.

Sin `NUXT_SITE_URL`, el sitemap puede utilizar localhost; configurar el dominio
es un requisito antes de publicar. En desarrollo es normal ver URLs locales.

## Producción en Node.js

```sh
pnpm lint
pnpm typecheck
pnpm build
NODE_ENV=production node .output/server/index.mjs
```

El entorno de producción debe proporcionar `NUXT_SITE_URL`. El servidor
compilado no carga `.env` automáticamente; establecer las variables en el hosting
o usar `node --env-file=.env .output/server/index.mjs` para pruebas locales.
El puerto predeterminado es 3000; puede cambiarse con `PORT`.

Comprobar `/`, `/sitemap.xml`, `/robots.txt` y la carga de la imagen antes de
publicar. En la página inicial, el botón debe incrementar el contador sin
recargar la página. No se ha realizado ningún despliegue.

## Documentación oficial

- [Nuxt: instalación](https://nuxt.com/docs/4.x/getting-started/installation)
- [Nuxt UI](https://ui.nuxt.com/docs/getting-started/installation/nuxt)
- [Nuxt Image](https://image.nuxt.com/get-started/installation)
- [Sitemap](https://nuxtseo.com/docs/sitemap/getting-started/installation)
- [Robots](https://nuxtseo.com/docs/robots/getting-started/installation)
- [Nuxt ESLint](https://eslint.nuxt.com/packages/module)

## Contenido previo

El README original contenía: «hola».
