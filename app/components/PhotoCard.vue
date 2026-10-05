<script setup lang="ts">
import { useId, ref } from 'vue'

const props = defineProps<{ src: string, alt: string, caption: string, details: string }>()
const isFlipped = ref(false)
const detailsId = `photo-card-details-${useId()}`
</script>

<template>
  <UCard class="photo-card" :ui="{ root: 'photo-card', body: 'photo-card-body' }">
    <div class="photo-card-scene" :class="{ 'is-flipped': isFlipped }">
      <div class="photo-card-inner">
        <figure class="photo-card-face photo-card-front">
          <NuxtImg
            :src="props.src"
            :alt="props.alt"
            width="640"
            height="480"
            sizes="600px sm:400px lg:400px"
            format="webp"
            loading="lazy"
          />
          <figcaption>{{ props.caption }}</figcaption>
        </figure>

        <div :id="detailsId" class="photo-card-face photo-card-back">
          <span class="photo-card-back-title" role="heading" aria-level="3">{{ props.caption }}</span>
          <p>{{ props.details }}</p>
        </div>
      </div>

      <UButton
        type="button"
        color="neutral"
        variant="solid"
        class="photo-card-toggle"
        :ui="{ base: 'photo-card-toggle-button' }"
        :aria-expanded="isFlipped"
        :aria-controls="detailsId"
        :aria-label="`Mostrar u ocultar información sobre ${props.caption}`"
        @click="isFlipped = !isFlipped"
      >
        <span class="photo-card-toggle-label" aria-hidden="true">
          {{ isFlipped ? 'Ver fotografía' : 'Ver detalles' }}
        </span>
      </UButton>
    </div>
  </UCard>
</template>
