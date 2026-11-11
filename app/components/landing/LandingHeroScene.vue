<script setup lang="ts">
import { CARD_HEIGHT, CARD_WIDTH, CHIP_HEIGHT, CHIP_WIDTH, SCENE_HEIGHT, requireEdges, sceneFiles, sceneLayers, settledPosition, tangles } from '~/data/landing/scene'

type Phase = 'messy' | 'sorted' | 'graph'

const phase = ref<Phase>('messy')
const done = ref(false)
const root = useTemplateRef<HTMLElement>('root')
const timers: ReturnType<typeof setTimeout>[] = []

const captions: Record<Phase, string> = {
  messy: 'Every domain mixed in app/, database/ and config/',
  sorted: 'One Composer package per domain: a layer',
  graph: 'Each layer requires the layers it uses'
}

function at(delay: number, step: () => void) {
  timers.push(setTimeout(step, delay))
}

function play(lead: number) {
  timers.splice(0).forEach(clearTimeout)
  done.value = false
  phase.value = 'messy'
  at(lead, () => phase.value = 'sorted')
  at(lead + 1900, () => phase.value = 'graph')
  at(lead + 3200, () => done.value = true)
}

const { motion } = useLandingPlayback(root, () => play(1100))

onBeforeUnmount(() => timers.forEach(clearTimeout))

const chips = sceneFiles.map((file, index) => {
  const settled = settledPosition(file)

  return {
    ...file,
    style: {
      '--mx': file.messy.x,
      '--my': file.messy.y,
      '--mr': `${file.messy.r}deg`,
      '--sx': settled.x,
      '--sy': settled.y,
      '--delay': `${index * 70}ms`
    }
  }
})

const cards = sceneLayers.map((layer, index) => ({
  ...layer,
  bucket: layer.name.split('/')[0],
  package: layer.name.split('/')[1],
  style: { '--x': layer.x, '--y': layer.y, '--delay': `${index * 90}ms` }
}))

const stageStyle = {
  'aspectRatio': `100 / ${SCENE_HEIGHT}`,
  '--card-w': CARD_WIDTH,
  '--card-h': CARD_HEIGHT,
  '--chip-w': CHIP_WIDTH,
  '--chip-h': CHIP_HEIGHT
}
</script>

<template>
  <div
    ref="root"
    class="hs relative rounded-2xl border border-default p-2.5 shadow-2xl shadow-primary/5 sm:p-5"
    :data-phase="phase"
    role="img"
    aria-label="Files of several domains mixed in app/ move into one package per domain: functional/users, functional/orders, functional/billing and technical/osdd. Arrows then show which layer requires which."
  >
    <UButton
      v-if="motion && done"
      icon="i-lucide-rotate-ccw"
      color="neutral"
      variant="ghost"
      size="xs"
      class="absolute top-2 right-2 z-10 rounded-full"
      aria-label="Replay the animation"
      @click="play(700)"
    />

    <div
      class="hs-stage relative"
      :style="stageStyle"
      aria-hidden="true"
    >
      <div class="hs-frame absolute inset-0 rounded-xl">
        <span class="hs-frame-label font-mono">app/ · database/ · config/ · tests/</span>
      </div>

      <div
        v-for="card in cards"
        :key="card.key"
        class="hs-card absolute rounded-xl"
        :class="`is-${card.key}`"
        :style="card.style"
      >
        <div class="hs-card-head font-mono">
          <span class="hs-dot" />
          <span class="text-dimmed">{{ card.bucket }}/</span><span class="font-semibold">{{ card.package }}</span>
        </div>
      </div>

      <svg
        class="hs-lines absolute inset-0 size-full"
        :viewBox="`0 0 100 ${SCENE_HEIGHT}`"
      >
        <path
          v-for="(line, index) in tangles"
          :key="`t${index}`"
          :d="line"
          class="hs-tangle"
        />
        <g class="hs-edges">
          <template
            v-for="(edge, index) in requireEdges"
            :key="`e${index}`"
          >
            <path
              :d="edge.d"
              pathLength="1"
              class="hs-edge"
              :style="{ '--delay': `${index * 220}ms` }"
            />
            <path
              :d="edge.arrow"
              class="hs-arrow"
              :style="{ '--delay': `${index * 220 + 500}ms` }"
            />
            <circle
              v-if="motion && done"
              r="0.7"
              class="hs-pulse"
            >
              <animateMotion
                :path="edge.d"
                dur="2.4s"
                :begin="`${index * 0.5}s`"
                repeatCount="indefinite"
              />
            </circle>
          </template>
        </g>
      </svg>

      <div
        v-for="chip in chips"
        :key="chip.label"
        class="hs-chip absolute top-0 left-0"
        :class="`is-${chip.layer}`"
        :style="chip.style"
      >
        <div class="hs-chip-body font-mono">
          <span class="hs-dot" />
          <span class="truncate">{{ chip.label }}</span>
        </div>
      </div>
    </div>

    <div class="mt-3 flex min-h-14 flex-col items-start justify-center gap-2 sm:min-h-9 sm:flex-row sm:items-center sm:justify-between">
      <p class="hs-caption text-xs text-muted sm:text-sm">
        <span class="hs-caption-live">{{ captions[phase] }}</span>
        <span class="hs-caption-final">{{ captions.graph }}</span>
      </p>
      <p class="hs-check flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-mono text-[11px] text-success sm:text-xs">
        <UIcon
          name="i-lucide-check"
          class="size-3.5"
        />
        No boundary violation in 4 layers.
      </p>
    </div>
  </div>
</template>

<style src="./landing-hero-scene.css"></style>
