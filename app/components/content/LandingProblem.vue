<script setup lang="ts">
type Domain = 'users' | 'orders' | 'billing'

interface TreeEntry {
  path: string
  domain?: Domain
  depth?: number
  note?: string
}

const dots: Record<Domain, string> = {
  users: 'bg-sky-500',
  orders: 'bg-primary',
  billing: 'bg-emerald-500'
}

const before: TreeEntry[] = [
  { path: 'app/Models/Invoice.php', domain: 'billing' },
  { path: 'app/Models/Order.php', domain: 'orders' },
  { path: 'app/Models/User.php', domain: 'users' },
  { path: 'app/Http/Controllers/CheckoutController.php', domain: 'orders' },
  { path: 'app/Http/Controllers/InvoiceController.php', domain: 'billing' },
  { path: 'app/Http/Controllers/ProfileController.php', domain: 'users' },
  { path: 'app/Listeners/SendInvoice.php', domain: 'billing' },
  { path: 'database/migrations/…_create_invoices_table.php', domain: 'billing' },
  { path: 'database/migrations/…_create_orders_table.php', domain: 'orders' },
  { path: 'tests/Feature/CheckoutTest.php', domain: 'orders' },
  { path: 'tests/Feature/InvoiceTest.php', domain: 'billing' }
]

const after: TreeEntry[] = [
  { path: 'functional/users/', domain: 'users' },
  { path: 'src/Models/User.php', depth: 1 },
  { path: 'functional/orders/', domain: 'orders', note: 'requires users' },
  { path: 'src/Http/Controllers/CheckoutController.php', depth: 1 },
  { path: 'database/migrations/', depth: 1 },
  { path: 'tests/Feature/CheckoutTest.php', depth: 1 },
  { path: 'functional/billing/', domain: 'billing', note: 'requires orders' },
  { path: 'src/Listeners/SendInvoice.php', depth: 1 },
  { path: 'database/migrations/', depth: 1 },
  { path: 'tests/Feature/InvoiceTest.php', depth: 1 }
]
</script>

<template>
  <UPageSection
    title="Your app/ folder grows with every domain"
    :ui="{ container: 'py-16 sm:py-20 lg:py-24' }"
    description="Laravel keeps every model, controller, migration and test in shared folders. After a few domains, nothing shows where billing ends and orders begin, and any class can use any other."
  >
    <div class="grid gap-6 lg:grid-cols-2">
      <UPageCard
        variant="subtle"
        title="Without layers"
        description="Three domains, mixed in the same folders. The dependencies between them live in people's heads."
        icon="i-lucide-folder-open"
        class="min-w-0"
        :ui="{ container: 'min-w-0', wrapper: 'min-w-0 w-full', body: 'min-w-0 w-full' }"
      >
        <ul class="space-y-1.5 font-mono text-xs sm:text-[13px]">
          <li
            v-for="entry in before"
            :key="entry.path"
            class="flex min-w-0 items-center gap-2"
          >
            <span
              class="size-2 shrink-0 rounded-full"
              :class="entry.domain ? dots[entry.domain] : ''"
            />
            <span class="truncate text-toned">{{ entry.path }}</span>
          </li>
        </ul>
      </UPageCard>

      <UPageCard
        variant="outline"
        title="With Laravel OSDD"
        description="One Composer package per domain. Each one declares what it requires, and osdd:check holds it to that."
        icon="i-lucide-layers"
        class="min-w-0 ring-primary/40"
        :ui="{ container: 'min-w-0', wrapper: 'min-w-0 w-full', body: 'min-w-0 w-full' }"
      >
        <ul class="space-y-1.5 font-mono text-xs sm:text-[13px]">
          <li
            v-for="(entry, index) in after"
            :key="index"
            class="flex min-w-0 items-center gap-2"
            :class="entry.depth ? 'pl-6' : 'pt-1 first:pt-0'"
          >
            <span
              v-if="entry.domain"
              class="size-2 shrink-0 rounded-full"
              :class="dots[entry.domain]"
            />
            <span
              class="truncate"
              :class="entry.domain ? 'font-semibold text-highlighted' : 'text-toned'"
            >{{ entry.path }}</span>
            <UBadge
              v-if="entry.note"
              :label="entry.note"
              color="neutral"
              variant="subtle"
              size="sm"
              class="ml-auto shrink-0 font-sans"
            />
          </li>
        </ul>
      </UPageCard>
    </div>

    <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
      <li
        v-for="(dot, domain) in dots"
        :key="domain"
        class="flex items-center gap-2"
      >
        <span
          class="size-2 rounded-full"
          :class="dot"
        />
        {{ domain }}
      </li>
    </ul>
  </UPageSection>
</template>
