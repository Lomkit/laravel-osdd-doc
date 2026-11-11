<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = withDefaults(defineProps<{
  command?: string
}>(), {
  command: 'composer require lomkit/laravel-osdd'
})

const { copy, copied } = useClipboard()
</script>

<template>
  <div class="inline-flex max-w-full items-center gap-3 rounded-lg border border-default bg-elevated/60 py-1.5 pl-4 pr-1.5 font-mono text-sm">
    <span class="select-none text-primary">$</span>
    <span class="min-w-0 truncate text-highlighted">{{ props.command }}</span>
    <UButton
      :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
      :aria-label="copied ? 'Copied' : 'Copy the command'"
      color="neutral"
      variant="ghost"
      size="sm"
      @click="copy(props.command)"
    />
  </div>
</template>
