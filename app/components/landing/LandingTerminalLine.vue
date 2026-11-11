<script setup lang="ts">
import type { TerminalLine } from '~/data/landing/terminal'

defineProps<{
  line: TerminalLine
  chars?: number
  caret?: boolean
}>()
</script>

<template>
  <div
    v-if="line.kind === 'command'"
    class="lt-line text-slate-100"
  >
    <span class="text-primary-400 select-none">~/shop $ </span>{{ chars === undefined ? line.text : line.text.slice(0, chars) }}<span
      v-if="caret"
      class="lt-caret"
    />
  </div>
  <div
    v-else-if="line.kind === 'info' || line.kind === 'success' || line.kind === 'error'"
    class="lt-line lt-out flex gap-2 pl-2"
    :class="{ 'lt-error': line.kind === 'error', 'lt-success': line.kind === 'success' }"
  >
    <span
      class="lt-label"
      :class="line.kind === 'error' ? 'bg-rose-600 text-white' : 'bg-sky-600 text-white'"
    >{{ line.kind === 'error' ? 'ERROR' : 'INFO' }}</span>
    <span :class="{ 'text-rose-300': line.kind === 'error', 'text-slate-300': line.kind === 'info', 'text-emerald-300': line.kind === 'success' }">{{ line.text }}</span>
  </div>
  <div
    v-else-if="line.kind === 'detail'"
    class="lt-line lt-out flex min-w-0 flex-wrap gap-x-2 pl-2 text-slate-300 sm:flex-nowrap"
  >
    <span class="min-w-0 break-all">{{ line.left }}</span>
    <span class="lt-dots hidden min-w-4 flex-1 text-slate-600 sm:block" />
    <span class="w-full truncate pl-4 text-rose-300 sm:w-auto sm:pl-0">{{ line.right }}</span>
  </div>
  <div
    v-else-if="line.kind === 'prompt'"
    class="lt-line lt-out flex gap-2 pl-2"
  >
    <span class="text-emerald-400">◇</span>
    <span class="text-slate-400">{{ line.label }}</span>
    <span class="text-slate-100">{{ line.answer }}</span>
  </div>
  <div
    v-else-if="line.kind === 'comment'"
    class="lt-line lt-out text-slate-500"
  >
    {{ line.text }}
  </div>
  <div
    v-else-if="line.kind === 'added'"
    class="lt-line lt-out lt-added -mx-4 px-4 text-emerald-300"
  >
    {{ line.text }}
  </div>
  <div
    v-else
    class="lt-line h-6"
  />
</template>
