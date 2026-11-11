<script setup lang="ts">
import { CYCLE_EDGE, dependentsOf, graphLayouts, graphRequires, layerCycles, mermaidEdges, transitiveRequires } from '~/data/landing/graph'

const selected = ref<string>('functional/orders')
const cycle = ref(false)

const requires = computed(() => cycle.value
  ? { ...graphRequires, [CYCLE_EDGE.from]: [...graphRequires[CYCLE_EDGE.from]!, CYCLE_EDGE.to].sort() }
  : graphRequires)

const direct = computed(() => requires.value[selected.value]!)
const dependents = computed(() => dependentsOf(requires.value, selected.value))
const transitiveOnly = computed(() => transitiveRequires(requires.value, selected.value)
  .filter(layer => layer !== selected.value && !direct.value.includes(layer)))
const cycles = computed(() => layerCycles(requires.value))
const edges = computed(() => mermaidEdges(requires.value))

const checkText = computed(() => {
  if (direct.value.length === 0) {
    return 'fails as soon as it uses a class of another layer'
  }

  const transitive = transitiveOnly.value.length ? `, such as ${transitiveOnly.value.join(' or ')}, unless you pass ` : ''

  return `fails if it uses a class of a layer it does not require${transitive}`
})

function edgeClass(edge: { from: string, to: string }): string {
  if (cycle.value && edge.from === CYCLE_EDGE.from && edge.to === CYCLE_EDGE.to) {
    return 'bg-rose-500/15 text-rose-300'
  }

  if (edge.from === selected.value) {
    return 'bg-orange-500/15 text-orange-200'
  }

  return edge.to === selected.value ? 'bg-sky-500/15 text-sky-200' : 'text-slate-500'
}
</script>

<template>
  <section class="relative py-16 sm:py-24">
    <UContainer>
      <LandingReveal class="mx-auto max-w-3xl text-center">
        <p class="text-sm font-semibold text-primary">
          The layer graph
        </p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance text-highlighted sm:text-4xl">
          Dependencies you can see, and a check that enforces them
        </h2>
        <p class="mt-4 text-base text-pretty text-muted sm:text-lg">
          Each layer lists the layers it requires in its own composer.json. Point at a layer to see what it may use and who depends on it.
        </p>
      </LandingReveal>

      <LandingReveal
        class="mt-12 grid gap-6 lg:grid-cols-12"
        :delay="120"
      >
        <div class="lg-panel flex flex-col justify-between gap-5 rounded-2xl border border-default p-4 sm:p-6 lg:col-span-7">
          <LandingGraphCanvas
            class="my-auto hidden sm:block"
            :layout="graphLayouts.wide"
            :requires="requires"
            :selected="selected"
            :cycle="cycle"
            @select="selected = $event"
          />
          <LandingGraphCanvas
            class="sm:hidden"
            :layout="graphLayouts.narrow"
            :requires="requires"
            :selected="selected"
            :cycle="cycle"
            @select="selected = $event"
          />
          <div class="flex flex-wrap items-center justify-between gap-3 border-t border-default pt-4">
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              <span class="flex items-center gap-1.5"><span class="h-0.5 w-4 rounded bg-primary" />requires</span>
              <span class="flex items-center gap-1.5"><span class="h-0.5 w-4 rounded bg-info" />required by</span>
            </div>
            <UButton
              :icon="cycle ? 'i-lucide-undo-2' : 'i-lucide-refresh-ccw-dot'"
              :label="cycle ? 'Remove the cycle' : 'Make users require billing'"
              :color="cycle ? 'neutral' : 'error'"
              variant="soft"
              size="sm"
              @click="cycle = !cycle"
            />
          </div>
        </div>

        <div class="flex min-w-0 flex-col gap-4 lg:col-span-5">
          <div class="rounded-2xl border border-default bg-elevated/40 p-5">
            <p class="font-mono text-sm text-highlighted">
              {{ selected }}
            </p>
            <dl class="mt-4 space-y-3 text-sm">
              <div>
                <dt class="text-xs font-medium tracking-wide text-dimmed uppercase">
                  Requires
                </dt>
                <dd class="mt-1.5 flex flex-wrap gap-1.5">
                  <UBadge
                    v-for="layer in direct"
                    :key="layer"
                    :label="layer"
                    variant="subtle"
                    class="font-mono"
                  />
                  <span
                    v-if="direct.length === 0"
                    class="text-muted"
                  >No other layer</span>
                </dd>
              </div>
              <div>
                <dt class="text-xs font-medium tracking-wide text-dimmed uppercase">
                  Required by
                </dt>
                <dd class="mt-1.5 flex flex-wrap gap-1.5">
                  <UBadge
                    v-for="layer in dependents"
                    :key="layer"
                    :label="layer"
                    color="info"
                    variant="subtle"
                    class="font-mono"
                  />
                  <span
                    v-if="dependents.length === 0"
                    class="text-muted"
                  >No layer</span>
                </dd>
              </div>
            </dl>
            <ul class="mt-5 space-y-2 border-t border-default pt-4 text-sm text-muted">
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-shield-check"
                  class="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span>
                  <code class="text-highlighted">osdd:check</code> {{ checkText }}<template v-if="transitiveOnly.length">
                    <code class="whitespace-nowrap text-highlighted">--transitive</code></template>.
                </span>
              </li>
              <li class="flex gap-2">
                <UIcon
                  name="i-lucide-trash-2"
                  class="mt-0.5 size-4 shrink-0 text-muted"
                />
                <span>
                  <code class="text-highlighted">osdd:remove</code>
                  {{ dependents.length ? `refuses it while ${dependents.join(' and ')} require${dependents.length > 1 ? '' : 's'} it.` : 'can remove it: no layer requires it.' }}
                </span>
              </li>
            </ul>
          </div>

          <LandingGraphOutput
            :edges="edges"
            :edge-class="edgeClass"
            :cycles="cycles"
          />
        </div>
      </LandingReveal>
    </UContainer>
  </section>
</template>

<style src="./landing-graph.css"></style>
