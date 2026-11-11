<script setup lang="ts">
defineProps<{ tile: string }>()

const suites = ['functional/orders', 'functional/users', 'technical/osdd']
const seeders = [
  { layer: 'users', seeder: 'RolesSeeder', priority: '-10' },
  { layer: 'orders', seeder: 'OrdersSeeder', priority: '0' },
  { layer: 'billing', seeder: 'InvoicesSeeder', priority: '10' }
]
</script>

<template>
  <div
    class="lb-visual relative flex min-h-36 flex-col justify-center gap-2 overflow-hidden rounded-xl border border-default p-4 font-mono text-[11px] leading-5 sm:text-xs"
    aria-hidden="true"
  >
    <template v-if="tile === 'twins'">
      <p class="lb-old text-muted">
        <span class="text-dimmed">$ </span>php artisan make:model Invoice
      </p>
      <p class="lb-new text-highlighted">
        <span class="text-primary">$ </span>php artisan osdd:model Invoice <span class="lb-flag inline-block">--layer=functional/billing</span>
      </p>
      <p class="lb-path flex items-center gap-2 text-success">
        <UIcon
          name="i-lucide-corner-down-right"
          class="size-3.5 shrink-0"
        />
        functional/billing/src/Models/Invoice.php
      </p>
    </template>

    <template v-else-if="tile === 'tests'">
      <p
        v-for="(suite, index) in suites"
        :key="suite"
        class="lb-suite flex items-center gap-2 text-muted"
        :style="{ '--i': index }"
      >
        <UIcon
          name="i-lucide-circle-check"
          class="lb-tick size-3.5 shrink-0"
        />
        <span class="truncate">&lt;testsuite name="<span class="text-highlighted">{{ suite }}</span>"&gt;</span>
      </p>
    </template>

    <template v-else-if="tile === 'github'">
      <p class="truncate text-dimmed">
        functional/orders/src/Models/Order.php
      </p>
      <p class="text-muted">
        <span class="mr-2 text-dimmed">7</span>use Functional\Users\Models\User;
      </p>
      <div class="lb-annotation rounded-md border border-error/40 bg-error/10 px-2.5 py-1.5 font-sans text-[11px] leading-4 text-error">
        <span class="font-semibold">Undeclared layer dependency</span>
        <span class="mt-0.5 block text-toned">functional/orders uses Functional\Users\Models\User from functional/users but does not require functional/users.</span>
      </div>
    </template>

    <template v-else-if="tile === 'views'">
      <p class="text-muted">
        view('<span class="lb-ns">orders::</span>index')
      </p>
      <p class="text-muted">
        &lt;x-<span class="lb-ns">orders::</span>alert /&gt;
      </p>
      <p class="text-muted">
        __('<span class="lb-ns">orders::</span>messages.paid')
      </p>
    </template>

    <template v-else-if="tile === 'cache'">
      <p class="text-highlighted">
        <span class="text-primary">$ </span>php artisan optimize
      </p>
      <div class="h-1.5 overflow-hidden rounded-full bg-elevated">
        <div class="lb-bar h-full rounded-full bg-primary" />
      </div>
      <p class="flex items-center gap-2 text-success">
        <UIcon
          name="i-lucide-zap"
          class="size-3.5 shrink-0"
        />
        bootstrap/cache/osdd.php
      </p>
    </template>

    <template v-else-if="tile === 'livewire'">
      <p class="text-muted">
        &lt;livewire:<span class="lb-ns">orders::</span>cart /&gt;
      </p>
      <p class="text-muted">
        $panel-&gt;plugin(<span class="text-highlighted">LayersPlugin</span>::make())
      </p>
      <div class="mt-1 flex flex-wrap gap-1.5 font-sans">
        <span
          v-for="(item, index) in ['Resources', 'Pages', 'Widgets', 'Clusters']"
          :key="item"
          class="lb-pill rounded-full border border-default px-2 py-0.5 text-[11px] text-toned"
          :style="{ '--i': index }"
        >{{ item }}</span>
      </div>
    </template>

    <template v-else>
      <p
        v-for="(row, index) in seeders"
        :key="row.seeder"
        class="lb-seed flex items-center gap-3 rounded-md px-2 py-0.5 text-muted"
        :style="{ '--i': index }"
      >
        <span class="w-14 shrink-0 text-dimmed">{{ row.layer }}</span>
        <span class="flex-1 truncate text-highlighted">{{ row.seeder }}</span>
        <span class="text-dimmed">priority {{ row.priority }}</span>
      </p>
    </template>
  </div>
</template>
