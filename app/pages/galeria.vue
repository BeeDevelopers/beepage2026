<script setup lang="ts">
import type { GalleryCategory, GalleryPhoto, GalleryShape } from '~/utils/galleryPhotos'

useSeoMeta({
  title: 'Galería | BeeDevelopers',
  description: 'Fotografías de hackatones, ponencias, talleres y actividades de la comunidad BeeDevelopers en DICIS.',
})

const PAGE_SIZE = 12
const ALL_YEARS = 'all'

const shapeClasses: Record<GalleryShape, string> = {
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
}

const shapeLabels: Record<GalleryShape, string> = {
  landscape: 'horizontal 4:3',
  square: 'cuadrada 1:1',
  portrait: 'vertical 3:4',
  tall: 'vertical 2:3',
}

const horizontalShapes: GalleryShape[] = ['landscape', 'square']
const verticalShapes: GalleryShape[] = ['portrait', 'tall']
const placeholderShapes: GalleryShape[] = ['portrait', 'landscape', 'tall', 'square', 'landscape', 'portrait', 'square', 'tall']

const photoPositions = new Map(galleryPhotos.map((photo, position) => [photo.src, position]))

const breadcrumbItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Galería' },
]

const selectedCategory = ref<GalleryCategory | null>(null)
const selectedYear = ref(ALL_YEARS)
const visibleCount = ref(PAGE_SIZE)
const photoStatus = reactive<Record<string, 'loaded' | 'missing'>>({})
const photoOrientation = reactive<Record<string, 'horizontal' | 'vertical'>>({})
const openedPhoto = ref<GalleryPhoto | null>(null)
const galleryGrid = ref<HTMLElement | null>(null)

const categoryFilters = [{ key: null, label: 'Todas' }, ...galleryCategories]

const yearItems = computed(() => {
  const years = [...new Set(galleryPhotos.map(photo => photo.year).filter(year => year !== null))]
  return [
    { label: 'Todos', value: ALL_YEARS },
    ...years.sort((a, b) => b - a).map(year => ({ label: String(year), value: String(year) })),
  ]
})

const eventCount = computed(() => new Set(galleryPhotos.map(photo => photo.event).filter(Boolean)).size)

const filteredPhotos = computed(() => galleryPhotos.filter(photo =>
  (selectedCategory.value === null || photo.category === selectedCategory.value)
  && (selectedYear.value === ALL_YEARS || String(photo.year) === selectedYear.value),
))

const visiblePhotos = computed(() => filteredPhotos.value.slice(0, visibleCount.value))

const isLightboxOpen = computed({
  get: () => openedPhoto.value !== null,
  set: (isOpen) => {
    if (!isOpen) openedPhoto.value = null
  },
})

watch([selectedCategory, selectedYear], () => {
  visibleCount.value = PAGE_SIZE
})

function pickByPosition(shapes: GalleryShape[], position: number) {
  return shapes[position % shapes.length] ?? 'landscape'
}

function resolveShape(photo: GalleryPhoto) {
  if (photo.shape) return photo.shape
  const position = photoPositions.get(photo.src) ?? 0
  const orientation = photoOrientation[photo.src]
  if (!orientation) return pickByPosition(placeholderShapes, position)
  return pickByPosition(orientation === 'horizontal' ? horizontalShapes : verticalShapes, position)
}

function registerLoadedImage(image: HTMLImageElement) {
  const photoSrc = image.dataset.photoSrc
  if (!photoSrc) return
  if (image.naturalWidth === 0) {
    photoStatus[photoSrc] = 'missing'
    return
  }
  photoOrientation[photoSrc] = image.naturalWidth >= image.naturalHeight ? 'horizontal' : 'vertical'
  photoStatus[photoSrc] = 'loaded'
}

function findPhotoImages() {
  return [...(galleryGrid.value?.querySelectorAll<HTMLImageElement>('img[data-photo-src]') ?? [])]
}

function onPhotoLoad(photo: GalleryPhoto) {
  const image = findPhotoImages().find(candidate => candidate.dataset.photoSrc === photo.src)
  if (image) registerLoadedImage(image)
}

function publicPath(photo: GalleryPhoto) {
  return `public${photo.src}`
}

function openPhoto(photo: GalleryPhoto) {
  if (photoStatus[photo.src] === 'loaded') openedPhoto.value = photo
}

onMounted(() => {
  findPhotoImages().filter(image => image.complete).forEach(registerLoadedImage)
})
</script>

<template>
  <main id="contenido" tabindex="-1">
    <section class="relative isolate overflow-hidden bg-(--bee-navy) text-white" aria-labelledby="gallery-title">
      <svg
        class="absolute inset-y-0 right-0 -z-10 h-full w-[55%] opacity-15 [mask-image:linear-gradient(to_right,transparent,black)]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="gallery-honeycomb" width="56" height="100" patternUnits="userSpaceOnUse">
            <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#ffda4a" stroke-width="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gallery-honeycomb)" />
      </svg>

      <UContainer class="flex flex-wrap items-end justify-between gap-8 py-14 sm:py-16">
        <div class="min-w-0">
          <UBreadcrumb
            :items="breadcrumbItems"
            :ui="{
              link: 'font-mono text-base text-[#c9d7e1] hover:text-white',
              linkLabel: 'text-inherit',
              separatorIcon: 'size-5 text-[#c9d7e1]',
            }"
          />
          <h1 id="gallery-title" class="mt-5 text-4xl leading-tight font-bold text-white! sm:text-5xl">
            Momentos de BeeDevelopers
          </h1>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-[#c9d7e1] sm:text-[17px]">
            Hackatones, ponencias, talleres y todo lo que construimos juntos.
          </p>
        </div>

        <dl class="flex gap-8">
          <div class="flex flex-col-reverse">
            <dt class="text-sm text-[#c9d7e1]">
              fotos
            </dt>
            <dd class="text-4xl leading-none font-bold">
              {{ galleryPhotos.length }}
            </dd>
          </div>
          <div class="flex flex-col-reverse">
            <dt class="text-sm text-[#c9d7e1]">
              eventos
            </dt>
            <dd class="text-4xl leading-none font-bold">
              {{ eventCount || '[##]' }}
            </dd>
          </div>
        </dl>
      </UContainer>
    </section>

    <div class="sticky top-0 z-20 border-b border-[#e8ebee] bg-white/95 backdrop-blur">
      <UContainer class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
        <div
          class="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]"
          role="group"
          aria-label="Filtrar fotos por tipo de evento"
        >
          <UButton
            v-for="categoryFilter in categoryFilters"
            :key="categoryFilter.label"
            type="button"
            color="neutral"
            :variant="selectedCategory === categoryFilter.key ? 'solid' : 'outline'"
            :aria-pressed="selectedCategory === categoryFilter.key"
            class="min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold"
            :class="selectedCategory === categoryFilter.key
              ? 'bg-(--bee-navy) text-white hover:bg-(--bee-header)'
              : 'text-(--bee-navy) ring-[#cfd8df] hover:bg-[#f7f8fa]'"
            @click="selectedCategory = categoryFilter.key"
          >
            {{ categoryFilter.label }}
          </UButton>
        </div>

        <label class="flex items-center gap-3 text-sm font-semibold text-(--bee-navy)">
          Año
          <USelect
            v-model="selectedYear"
            :items="yearItems"
            color="neutral"
            class="min-h-11 w-28"
          />
        </label>
      </UContainer>
    </div>

    <section class="py-10 sm:py-14" aria-label="Fotografías">
      <UContainer>
        <ul
          v-if="visiblePhotos.length"
          ref="galleryGrid"
          class="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4"
        >
          <li
            v-for="photo in visiblePhotos"
            :key="photo.src"
            class="mb-3 break-inside-avoid sm:mb-4"
          >
            <component
              :is="photoStatus[photo.src] === 'loaded' ? 'button' : 'div'"
              :type="photoStatus[photo.src] === 'loaded' ? 'button' : undefined"
              :aria-label="photoStatus[photo.src] === 'loaded' ? `Abrir en grande: ${photo.alt || photo.event || 'fotografía'}` : undefined"
              class="group relative block w-full overflow-hidden rounded-2xl text-left transition duration-200 motion-reduce:transition-none"
              :class="[
                shapeClasses[resolveShape(photo)],
                photoStatus[photo.src] === 'loaded'
                  ? 'cursor-zoom-in hover:-translate-y-1 hover:shadow-[0_14px_30px_rgb(7_51_84/14%)] motion-reduce:hover:translate-y-0'
                  : 'border border-dashed border-[#cfd8df] bg-[repeating-linear-gradient(135deg,#f7f8fa_0_14px,#e8ebee_14px_28px)]',
              ]"
              @click="openPhoto(photo)"
            >
              <span
                v-if="photoStatus[photo.src] !== 'loaded'"
                class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-3 pt-3 pb-10 text-center font-mono text-[11px] leading-snug text-(--bee-text)"
              >
                <svg
                  class="size-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
                </svg>
                <span class="font-semibold break-all text-(--bee-navy)">{{ publicPath(photo) }}</span>
                <span class="hidden sm:block">{{ photo.shape ? shapeLabels[photo.shape] : 'forma automática' }}</span>
              </span>

              <NuxtImg
                v-if="photoStatus[photo.src] !== 'missing'"
                :src="photo.src"
                :alt="photo.alt"
                :data-photo-src="photo.src"
                width="600"
                sizes="50vw md:33vw lg:300px"
                format="webp"
                loading="lazy"
                class="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                :class="photoStatus[photo.src] === 'loaded' ? 'opacity-100' : 'opacity-0'"
                @load="onPhotoLoad(photo)"
                @error="photoStatus[photo.src] = 'missing'"
              />

              <span
                class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2.5 sm:p-3"
                :class="{ 'bg-linear-to-t from-[rgb(5_42_69/85%)] to-transparent pt-10': photoStatus[photo.src] === 'loaded' }"
              >
                <UBadge
                  class="max-w-[70%] truncate rounded-full bg-(--bee-yellow) font-mono text-[11px] font-semibold tracking-[.06em] text-(--bee-header) uppercase"
                >
                  {{ photo.event || '[Evento]' }}
                </UBadge>
                <span
                  class="font-mono text-[11px]"
                  :class="photoStatus[photo.src] === 'loaded' ? 'text-white' : 'text-(--bee-text)'"
                >
                  {{ photo.year ?? '[AÑO]' }}
                </span>
              </span>
            </component>
          </li>
        </ul>

        <p v-else class="py-16 text-center text-base text-(--bee-text)">
          No hay fotos con estos filtros.
        </p>

        <div class="mt-10 flex flex-col items-center gap-4">
          <p class="text-sm text-(--bee-text)" aria-live="polite">
            Mostrando {{ visiblePhotos.length }} de {{ filteredPhotos.length }} fotos
          </p>
          <UButton
            v-if="visiblePhotos.length < filteredPhotos.length"
            type="button"
            color="neutral"
            variant="outline"
            class="min-h-12 rounded-lg px-6 text-sm font-bold text-(--bee-navy) ring-(--bee-navy) hover:bg-[#f7f8fa]"
            @click="visibleCount += PAGE_SIZE"
          >
            Cargar más fotos
          </UButton>
        </div>
      </UContainer>
    </section>

    <section class="bg-(--bee-cream) py-14 sm:py-24" aria-labelledby="gallery-share-title">
      <UContainer class="flex flex-wrap items-center justify-between gap-8">
        <div class="min-w-0">
          <p class="font-mono text-[13px] tracking-[.08em] text-[#8a6d00]">
            // ¿tienes fotos?
          </p>
          <h2 id="gallery-share-title" class="mt-2.5 text-3xl leading-tight font-bold text-(--bee-navy) sm:text-4xl">
            Comparte tus fotos de un evento
          </h2>
          <p class="mt-3 text-base leading-relaxed text-(--bee-text)">
            [Texto con el canal para enviarlas: correo, Drive o redes del grupo.]
          </p>
        </div>
        <UButton class="bee-button" disabled>
          [Enviar fotos]
        </UButton>
      </UContainer>
    </section>

    <UModal
      v-model:open="isLightboxOpen"
      :title="openedPhoto?.event || 'Fotografía'"
      :description="openedPhoto?.alt || 'Fotografía de la galería de BeeDevelopers'"
      :ui="{ content: 'sm:max-w-5xl', body: 'p-0 sm:p-0' }"
    >
      <template #body>
        <NuxtImg
          v-if="openedPhoto"
          :src="openedPhoto.src"
          :alt="openedPhoto.alt"
          width="1600"
          format="webp"
          class="max-h-[80vh] w-full bg-(--bee-header) object-contain"
        />
      </template>
    </UModal>
  </main>
</template>
