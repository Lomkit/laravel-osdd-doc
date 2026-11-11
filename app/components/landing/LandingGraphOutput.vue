<script setup lang="ts">
interface Edge {
  from: string
  to: string
  text: string
}

defineProps<{
  edges: Edge[]
  edgeClass: (edge: Edge) => string
  cycles: string[][]
}>()
</script>

<template>
  <div class="lt-window overflow-hidden rounded-2xl font-mono text-[11.5px] leading-6 sm:text-xs">
    <div class="px-4 pt-3 pb-3">
      <p class="text-slate-100">
        <span class="text-primary-400 select-none">$ </span>php artisan osdd:graph
      </p>
      <p class="text-slate-400">
        graph LR
      </p>
      <p class="text-slate-500">
        &nbsp;&nbsp;&nbsp;&nbsp;…six node lines
      </p>
      <TransitionGroup
        tag="div"
        name="lg-line"
      >
        <p
          v-for="edge in edges"
          :key="edge.text"
          class="-mx-2 rounded px-2 whitespace-pre transition-colors duration-200"
          :class="edgeClass(edge)"
        >
          {{ edge.text }}
        </p>
      </TransitionGroup>
    </div>
    <div
      class="border-t border-white/10 px-4 py-3"
      aria-live="polite"
    >
      <p class="text-slate-100">
        <span class="text-primary-400 select-none">$ </span>php artisan osdd:check
      </p>
      <p
        v-for="cycle in cycles"
        :key="cycle.join()"
        class="flex gap-2 pl-2"
      >
        <span class="lt-label bg-rose-600 text-white">ERROR</span>
        <span class="text-rose-300">Cycle in the layer requirements: {{ cycle.join(' -> ') }}.</span>
      </p>
      <p
        v-if="cycles.length === 0"
        class="text-slate-500"
      >
        # no cycle in the layer requirements
      </p>
    </div>
  </div>
</template>

<style src="./landing-terminal.css"></style>
