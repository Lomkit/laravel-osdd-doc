<script setup lang="ts">
import { terminalSteps, terminalTimeline } from '~/data/landing/terminal'

const { lines, stepStarts, total } = terminalTimeline(terminalSteps)

const time = ref(Number.POSITIVE_INFINITY)
const body = useTemplateRef<HTMLElement>('body')
const root = useTemplateRef<HTMLElement>('root')
let frame = 0
let last = 0

const shown = computed(() => lines.filter(entry => entry.start <= time.value))
const current = computed(() => shown.value.at(-1))
const finished = computed(() => time.value >= total)

const activeStep = computed(() => {
  if (finished.value) {
    return terminalSteps.length - 1
  }

  return stepStarts.findLastIndex(start => start <= time.value)
})

function typedChars(entry: (typeof lines)[number]): number | undefined {
  if (entry.line.kind !== 'command' || time.value >= entry.end) {
    return undefined
  }

  return Math.floor(((time.value - entry.start) / (entry.end - entry.start - 450)) * entry.line.text.length)
}

function tick(now: number) {
  time.value = Math.min(total, time.value + Math.min(now - last, 100))
  last = now
  frame = finished.value ? 0 : requestAnimationFrame(tick)
}

function playFrom(start: number) {
  cancelAnimationFrame(frame)
  time.value = start
  last = performance.now()
  frame = requestAnimationFrame(tick)
}

const { motion } = useLandingPlayback(root, () => playFrom(0))

function jumpTo(step: number) {
  if (motion.value) {
    playFrom(stepStarts[step]!)
  }
}

onMounted(() => {
  if (motion.value) {
    time.value = 0
  }
})

watch(() => shown.value.length, () => nextTick(() => {
  body.value?.scrollTo({ top: body.value.scrollHeight, behavior: 'smooth' })
}))

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <section
    ref="root"
    class="relative py-16 sm:py-24"
  >
    <UContainer>
      <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <LandingReveal class="lg:col-span-5">
          <p class="text-sm font-semibold text-primary">
            Three commands
          </p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance text-highlighted sm:text-4xl">
            From one app/ folder to checked modules
          </h2>
          <p class="mt-4 text-base text-pretty text-muted sm:text-lg">
            The package calls each module a layer. Create them with Artisan, and let the boundary check catch the shortcuts.
          </p>
          <ol class="mt-8 space-y-2">
            <li
              v-for="(step, index) in terminalSteps"
              :key="step.title"
            >
              <button
                type="button"
                class="group flex w-full gap-4 rounded-xl border p-4 text-left transition-colors"
                :class="index === activeStep ? 'border-primary/40 bg-primary/5' : 'border-transparent hover:bg-elevated/60'"
                :aria-current="index === activeStep ? 'step' : undefined"
                @click="jumpTo(index)"
              >
                <span
                  class="flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold transition-colors"
                  :class="index === activeStep ? 'bg-primary text-inverted' : 'bg-elevated text-muted'"
                >{{ index + 1 }}</span>
                <span>
                  <span class="block font-semibold text-highlighted">{{ step.title }}</span>
                  <span class="mt-1 block text-sm text-muted">{{ step.description }}</span>
                </span>
              </button>
            </li>
          </ol>
        </LandingReveal>

        <LandingReveal
          class="min-w-0 lg:col-span-7"
          :delay="120"
        >
          <div class="lt-window overflow-hidden rounded-2xl">
            <div class="flex h-10 items-center gap-2 border-b border-white/10 px-4">
              <span class="size-3 rounded-full bg-[#ff5f57]" />
              <span class="size-3 rounded-full bg-[#febc2e]" />
              <span class="size-3 rounded-full bg-[#28c840]" />
              <span class="ml-2 truncate font-mono text-xs text-slate-400">Terminal</span>
              <UButton
                v-if="motion && finished"
                icon="i-lucide-rotate-ccw"
                label="Replay"
                size="xs"
                color="neutral"
                variant="ghost"
                class="ml-auto text-slate-300 hover:bg-white/10 hover:text-white"
                @click="playFrom(0)"
              />
            </div>
            <div class="py-4">
              <div
                ref="body"
                class="lt-body overflow-x-hidden px-4 font-mono text-[11.5px] leading-6 sm:text-[13px]"
              >
                <LandingTerminalLine
                  v-for="(entry, index) in shown"
                  :key="index"
                  :line="entry.line"
                  :chars="typedChars(entry)"
                  :caret="motion && entry === current && !finished"
                />
              </div>
            </div>
          </div>
          <p class="mt-3 text-xs text-dimmed">
            Output shortened to the lines of each command that matter here.
          </p>
        </LandingReveal>
      </div>
    </UContainer>
  </section>
</template>

<style src="./landing-terminal.css"></style>
