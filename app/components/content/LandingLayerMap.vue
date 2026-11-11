<script setup lang="ts">
interface JsonToken {
  text: string
  kind?: 'key' | 'string' | 'punctuation'
}

interface LayerFile {
  label: string
  path: string
  tone: string
}

const json: JsonToken[][] = [
  [{ text: '{', kind: 'punctuation' }],
  [{ text: '  ' }, { text: '"name"', kind: 'key' }, { text: ': ', kind: 'punctuation' }, { text: '"functional/orders"', kind: 'string' }, { text: ',', kind: 'punctuation' }],
  [{ text: '  ' }, { text: '"type"', kind: 'key' }, { text: ': ', kind: 'punctuation' }, { text: '"layer"', kind: 'string' }, { text: ',', kind: 'punctuation' }],
  [{ text: '  ' }, { text: '"require"', kind: 'key' }, { text: ': {', kind: 'punctuation' }],
  [{ text: '    ' }, { text: '"functional/users"', kind: 'key' }, { text: ': ', kind: 'punctuation' }, { text: '"*"', kind: 'string' }],
  [{ text: '  },', kind: 'punctuation' }],
  [{ text: '  ' }, { text: '"autoload"', kind: 'key' }, { text: ': {', kind: 'punctuation' }],
  [{ text: '    ' }, { text: '"psr-4"', kind: 'key' }, { text: ': {', kind: 'punctuation' }],
  [{ text: '      ' }, { text: '"Functional\\\\Orders\\\\"', kind: 'key' }, { text: ': ', kind: 'punctuation' }, { text: '"src/"', kind: 'string' }],
  [{ text: '    }', kind: 'punctuation' }],
  [{ text: '  }', kind: 'punctuation' }],
  [{ text: '}', kind: 'punctuation' }]
]

const tokenClasses = {
  key: 'text-orange-300',
  string: 'text-amber-100',
  punctuation: 'text-slate-500'
}

const files: LayerFile[] = [
  { label: 'Model', path: 'src/Models/Order.php', tone: 'bg-orange-500/15 text-orange-600 dark:text-orange-300' },
  { label: 'DB', path: 'database/migrations', tone: 'bg-sky-500/15 text-sky-600 dark:text-sky-300' },
  { label: 'Seed', path: 'database/seeders', tone: 'bg-sky-500/15 text-sky-600 dark:text-sky-300' },
  { label: 'Routes', path: 'routes/api.php', tone: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
  { label: 'Tests', path: 'tests/Feature', tone: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
  { label: 'Provider', path: 'OrdersServiceProvider', tone: 'bg-rose-500/15 text-rose-600 dark:text-rose-300' }
]

const curve = (index: number): string => {
  const y = ((index + 0.5) / files.length) * 100

  return `M0 50 C55 50 45 ${y} 100 ${y}`
}
</script>

<template>
  <div class="relative flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0">
    <div class="landing-window relative z-10 overflow-hidden rounded-2xl lg:w-[58%] lg:shrink-0">
      <div class="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span class="size-3 rounded-full bg-[#ff5f57]" />
        <span class="size-3 rounded-full bg-[#febc2e]" />
        <span class="size-3 rounded-full bg-[#28c840]" />
        <span class="ml-2 truncate font-mono text-xs text-slate-400">functional/orders/composer.json</span>
      </div>
      <pre class="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-6"><code><span
        v-for="(line, index) in json"
        :key="index"
        class="landing-json-line block whitespace-pre"
        :style="{ animationDelay: `${index * 45}ms` }"
      ><span
        v-for="(token, position) in line"
        :key="position"
        :class="token.kind ? tokenClasses[token.kind] : undefined"
      >{{ token.text }}</span></span></code></pre>
    </div>

    <span class="landing-origin absolute left-[58%] top-1/2 z-20 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary lg:block" />

    <svg
      class="pointer-events-none absolute left-[58%] top-0 hidden h-full w-[8%] overflow-visible lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        v-for="(file, index) in files"
        :key="file.label"
        class="landing-wire"
        :style="{ animationDelay: `${300 + index * 90}ms` }"
        :d="curve(index)"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <ul class="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:gap-3 lg:ml-[8%] lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:gap-2">
      <li
        v-for="(file, index) in files"
        :key="file.label"
        class="landing-card flex min-w-0 items-center gap-2 rounded-lg border border-default bg-default/80 px-2.5 py-2 shadow-sm backdrop-blur"
        :style="{ animationDelay: `${450 + index * 90}ms` }"
      >
        <span
          class="shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide"
          :class="file.tone"
        >{{ file.label }}</span>
        <span class="truncate font-mono text-xs text-toned">{{ file.path }}</span>
      </li>
    </ul>
  </div>
</template>
