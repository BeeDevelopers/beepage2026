<script setup lang="ts">
// Terminal interactiva del encabezado de Conócenos más.
// Los comandos se eligen con botones (accesible con teclado y cómodo en móvil); las respuestas salen de los datos de la página.
const props = defineProps<{
  milestones: { year: string, title: string }[]
  activities: { title: string }[]
  values: { title: string }[]
}>()

interface TerminalLine {
  id: number
  text: string
  kind: 'prompt' | 'output' | 'muted'
  to?: string
  linkLabel?: string
}

const slug = (text: string) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-')

const commands = {
  'whoami': { text: 'BeeDevelopers\nGrupo estudiantil de la DICIS · Universidad de Guanajuato\nTecnología + comunidad.' },
  'cat historia.txt': { text: props.milestones.map(milestone => `${milestone.year}  ${milestone.title}`).join('\n') },
  'ls actividades/': { text: props.activities.map(activity => `${slug(activity.title)}/`).join('   ') },
  'cat valores.txt': { text: props.values.map(value => value.title.toLowerCase()).join(' · ') },
  './unete.sh': { text: 'Abriendo el formulario de registro...\n[##########] 100%', to: '/#registro', linkLabel: 'Ir al registro →' },
} as const satisfies Record<string, { text: string, to?: string, linkLabel?: string }>

type Command = keyof typeof commands
const commandNames = [...Object.keys(commands) as Command[], 'clear'] as const

let nextId = 0
const lines = ref<TerminalLine[]>([
  { id: nextId++, text: 'Bienvenido a BeeDevelopers.', kind: 'output' },
  { id: nextId++, text: 'Elige un comando para conocernos.', kind: 'muted' },
])
const outputElement = ref<HTMLElement | null>(null)

async function run(command: Command | 'clear') {
  if (command === 'clear') {
    lines.value = []
    return
  }

  const result: { text: string, to?: string, linkLabel?: string } = commands[command]
  lines.value = [
    ...lines.value,
    { id: nextId++, text: `bee@dicis:~$ ${command}`, kind: 'prompt' as const },
    { id: nextId++, text: result.text, kind: 'output' as const, to: result.to, linkLabel: result.linkLabel },
  ].slice(-24)

  await nextTick()
  outputElement.value?.scrollTo({ top: outputElement.value.scrollHeight })
}
</script>

<template>
  <div class="code-card terminal">
    <div class="code-card-bar" aria-hidden="true">
      <span class="code-card-dot bg-[#ff6b6b]" />
      <span class="code-card-dot bg-(--bee-yellow)" />
      <span class="code-card-dot bg-[#5ad18a]" />
      <span class="code-card-file">bee@dicis: ~</span>
    </div>

    <div ref="outputElement" class="terminal-output" role="log" aria-live="polite" aria-label="Salida de la terminal">
      <p v-for="line in lines" :key="line.id" :class="`terminal-line terminal-line--${line.kind}`">
        <span class="terminal-text">{{ line.text }}</span>
        <NuxtLink v-if="line.to" :to="line.to" class="terminal-link">
          {{ line.linkLabel }}
        </NuxtLink>
      </p>
    </div>

    <div class="terminal-commands" role="group" aria-label="Comandos">
      <button
        v-for="command in commandNames"
        :key="command"
        type="button"
        class="terminal-command"
        @click="run(command)"
      >
        {{ command }}
      </button>
    </div>
  </div>
</template>
