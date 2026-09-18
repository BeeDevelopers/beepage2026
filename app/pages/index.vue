<script setup lang="ts">
const count = ref(0)

useSeoMeta({
  title: 'beepage2026',
  description: 'El inicio de tu próximo proyecto.',
})
</script>

<template>
  <main class="min-h-screen bg-default px-6 py-16 sm:py-24">
    <UContainer class="max-w-2xl">
      <div class="mb-8 space-y-4">
        <UBadge variant="subtle">Un nuevo comienzo</UBadge>
        <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
          beepage2026
        </h1>
        <p class="text-lg text-muted">
          Todo listo para dar forma a tu próxima idea.
        </p>
      </div>

      <UCard>
        <figure class="space-y-3">
          <NuxtImg
            src="/images/sample.png"
            alt="Patrón geométrico de cuadros verdes sobre un fondo claro"
            width="960"
            height="540"
            sizes="100vw sm:640px"
            format="webp"
            class="w-full rounded-lg"
          />
          <figcaption class="text-sm text-muted">
            Un primer vistazo a lo que viene.
          </figcaption>
        </figure>

        <template #footer>
          <div class="flex flex-wrap items-center gap-4">
            <UButton @click="count++">Probar interacción</UButton>
            <p role="status" class="text-sm text-muted">
              Clics: {{ count }}
            </p>
          </div>
        </template>
      </UCard>
    </UContainer>
  </main>
</template>
