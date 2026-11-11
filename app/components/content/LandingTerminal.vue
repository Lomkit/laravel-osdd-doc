<script setup lang="ts">
import type { TerminalLine, TerminalLineKind } from '~/types/landing'

withDefaults(defineProps<{
  title?: string
  lines: TerminalLine[]
}>(), {
  title: 'Terminal'
})

const lineClasses: Record<TerminalLineKind, string> = {
  command: 'text-slate-100',
  comment: 'text-slate-500',
  output: 'text-slate-300',
  success: 'text-emerald-400',
  error: 'text-rose-400',
  warning: 'text-amber-300'
}
</script>

<template>
  <div class="landing-window overflow-hidden rounded-xl text-left">
    <div class="flex items-center gap-2 border-b border-white/10 px-4 py-3">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <span class="ml-2 truncate font-mono text-xs text-slate-400">{{ title }}</span>
    </div>
    <pre class="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-6"><code><span
      v-for="(line, index) in lines"
      :key="index"
      class="block min-h-6 whitespace-pre-wrap break-words"
      :class="lineClasses[line.kind]"
    ><span
      v-if="line.kind === 'command'"
      class="select-none text-primary-400"
    >$ </span>{{ line.text }}</span></code></pre>
  </div>
</template>
