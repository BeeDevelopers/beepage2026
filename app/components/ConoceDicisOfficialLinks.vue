<script setup lang="ts">
const conoceDicisOfficialLinksProps = withDefaults(defineProps<{
  items: Array<{
    id: string
    number?: string
    label: string
    title: string
    description: string
    href: string
    actionLabel?: string
  }>
  columns?: 2 | 3
}>(), {
  columns: 3,
})
</script>

<template>
  <ul class="conoce-dicis-official-links" :class="`conoce-dicis-official-links--${conoceDicisOfficialLinksProps.columns}`">
    <li v-for="conoceDicisOfficialLink in conoceDicisOfficialLinksProps.items" :key="conoceDicisOfficialLink.id">
      <a
        class="conoce-dicis-official-link"
        :class="{ 'conoce-dicis-official-link--without-number': !conoceDicisOfficialLink.number }"
        :href="conoceDicisOfficialLink.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span v-if="conoceDicisOfficialLink.number" class="conoce-dicis-official-link__number" aria-hidden="true">{{ conoceDicisOfficialLink.number }}</span>
        <span class="conoce-dicis-official-link__label">{{ conoceDicisOfficialLink.label }}</span>
        <h3>{{ conoceDicisOfficialLink.title }}</h3>
        <p>{{ conoceDicisOfficialLink.description }}</p>
        <span class="conoce-dicis-official-link__action">
          {{ conoceDicisOfficialLink.actionLabel ?? 'Abrir sitio oficial' }}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.conoce-dicis-official-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conoce-dicis-official-links--2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.conoce-dicis-official-links li {
  min-width: 0;
}

.conoce-dicis-official-link {
  display: flex;
  min-height: 236px;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 23px;
  border: 1px solid #d4e5ee;
  border-radius: 13px;
  background: #f0f7fb;
  box-shadow: 0 6px 18px rgb(7 51 84 / 4%);
  color: #52606a;
  text-decoration: none;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.conoce-dicis-official-link:hover {
  transform: translateY(-3px);
  border-color: #b5d5e5;
  background: #e7f2f8;
  box-shadow: 0 14px 30px rgb(7 51 84 / 10%);
}

.conoce-dicis-official-link:focus-visible {
  outline: 3px solid #147ca8;
  outline-offset: 3px;
}

.conoce-dicis-official-link__number {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid #d4e5ee;
  border-radius: 10px;
  background: #f0f7fb;
  color: #176b9a;
  font-size: 12px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.conoce-dicis-official-link--without-number .conoce-dicis-official-link__label {
  margin-top: 0;
}

.conoce-dicis-official-link__label {
  margin-top: 16px;
  color: #176b9a;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.conoce-dicis-official-link h3 {
  margin: 6px 0 0;
  color: #073354;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -.02em;
  line-height: 1.3;
}

.conoce-dicis-official-link p {
  margin: 9px 0 18px;
  color: #52606a;
  font-size: 14px;
  line-height: 1.55;
}

.conoce-dicis-official-link__action {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: auto;
  color: #12648f;
  font-size: 13px;
  font-weight: 750;
}

.conoce-dicis-official-link:hover .conoce-dicis-official-link__action {
  color: #052a45;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 950px) {
  .conoce-dicis-official-links,
  .conoce-dicis-official-links--2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .conoce-dicis-official-links,
  .conoce-dicis-official-links--2 {
    grid-template-columns: minmax(0, 1fr);
  }

  .conoce-dicis-official-link {
    min-height: 0;
    padding: 21px;
  }

}

@media (prefers-reduced-motion: reduce) {
  .conoce-dicis-official-link {
    transition: none;
  }
}
</style>
