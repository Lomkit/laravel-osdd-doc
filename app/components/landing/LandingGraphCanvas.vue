<script setup lang="ts">
import { CYCLE_EDGE, borderPoint, graphNames } from '~/data/landing/graph'
import type { GraphLayout } from '~/data/landing/graph'

const props = defineProps<{
  layout: GraphLayout
  requires: Record<string, string[]>
  selected: string | null
  cycle: boolean
}>()

const emit = defineEmits<{ select: [layer: string] }>()

type EdgeState = 'idle' | 'out' | 'in' | 'dim' | 'cycle'

const edges = computed(() => graphNames(props.requires).flatMap(from => props.requires[from]!.map((to) => {
  const isCycle = props.cycle && from === CYCLE_EDGE.from && to === CYCLE_EDGE.to
  const a = props.layout.positions[from]!
  const b = props.layout.positions[to]!
  const bend = isCycle ? props.layout.cycleBend : null
  const start = borderPoint(a, bend ?? b, props.layout.node)
  const end = borderPoint(b, bend ?? a, props.layout.node, 1.6)
  let state: EdgeState = 'idle'

  if (isCycle) {
    state = 'cycle'
  } else if (props.selected) {
    state = from === props.selected ? 'out' : (to === props.selected ? 'in' : 'dim')
  }

  return {
    key: `${from}>${to}`,
    state,
    d: bend ? `M${start.x} ${start.y} Q${bend.x} ${bend.y} ${end.x} ${end.y}` : `M${start.x} ${start.y} L${end.x} ${end.y}`
  }
})))

function nodeState(layer: string): string {
  if (!props.selected) {
    return 'idle'
  }

  if (layer === props.selected) {
    return 'selected'
  }

  if (props.requires[props.selected]!.includes(layer)) {
    return 'out'
  }

  return props.requires[layer]!.includes(props.selected) ? 'in' : 'dim'
}

const nodes = computed(() => graphNames(props.requires).map((layer) => {
  const point = props.layout.positions[layer]!

  return {
    layer,
    bucket: layer.split('/')[0],
    name: layer.split('/')[1],
    state: nodeState(layer),
    style: {
      left: `${point.x}%`,
      top: `${(point.y / props.layout.height) * 100}%`,
      width: `${props.layout.node.w}%`,
      height: `${(props.layout.node.h / props.layout.height) * 100}%`
    }
  }
}))

const markers: EdgeState[] = ['idle', 'out', 'in', 'dim', 'cycle']
</script>

<template>
  <div
    class="lg-canvas relative"
    :class="{ 'is-narrow': layout.height > layout.width * 0.6 }"
    :style="{ aspectRatio: `${layout.width} / ${layout.height}` }"
  >
    <svg
      class="absolute inset-0 size-full overflow-visible"
      :viewBox="`0 0 ${layout.width} ${layout.height}`"
      aria-hidden="true"
    >
      <defs>
        <marker
          v-for="marker in markers"
          :id="`lg-arrow-${marker}-${layout.height}`"
          :key="marker"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path
            d="M0 0 L10 5 L0 10 Z"
            :class="`lg-head is-${marker}`"
          />
        </marker>
      </defs>
      <path
        v-for="edge in edges"
        :key="edge.key"
        :d="edge.d"
        class="lg-edge"
        :class="`is-${edge.state}`"
        :marker-end="`url(#lg-arrow-${edge.state}-${layout.height})`"
      />
    </svg>

    <button
      v-for="node in nodes"
      :key="node.layer"
      type="button"
      class="lg-node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl border font-mono leading-tight"
      :class="[`is-${node.state}`, node.bucket === 'technical' ? 'border-dashed' : '']"
      :style="node.style"
      :aria-pressed="node.layer === selected"
      :aria-label="`Show the requirements of ${node.layer}`"
      @mouseenter="emit('select', node.layer)"
      @focus="emit('select', node.layer)"
      @click="emit('select', node.layer)"
    >
      <span class="lg-bucket">{{ node.bucket }}/</span>
      <span class="lg-name font-semibold">{{ node.name }}</span>
    </button>
  </div>
</template>
