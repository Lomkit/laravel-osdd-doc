<script setup lang="ts">
const steps = [
  { command: 'php artisan osdd:list --json', note: 'Reads every layer: path, namespace, providers, requirements, health.' },
  { command: 'php artisan osdd:graph --format=json', note: 'Checks that functional/billing requires functional/orders.' },
  { command: 'php artisan osdd:model Refund --layer=functional/billing', note: 'Writes the model inside the layer, never in app/.' },
  { command: 'php artisan osdd:check --format=json', note: 'Gets a machine-readable verdict on the boundaries.' }
]

const json = `{
    "name": "functional/billing",
    "path": "functional/billing",
    "namespace": "Functional\\\\Billing\\\\",
    "requires": ["functional/orders", "functional/users"],
    "health": { "installed": true, "test_suite": true }
}`
</script>

<template>
  <section class="relative py-16 sm:py-24">
    <UContainer>
      <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <LandingReveal class="lg:col-span-5">
          <p class="flex items-center gap-2 text-sm font-semibold text-primary">
            <UIcon
              name="i-lucide-bot"
              class="size-4"
            />
            Built for coding agents
          </p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance text-highlighted sm:text-4xl">
            Your agent stops writing in app/
          </h2>
          <p class="mt-4 text-base text-pretty text-muted sm:text-lg">
            The package ships a Laravel Boost skill. It teaches your agent where code goes in a modular app: read the map first, require a layer before using it, generate inside the right layer.
          </p>
          <UButton
            to="/integrations/laravel-boost"
            label="Set up the Boost skill"
            color="neutral"
            variant="link"
            trailing-icon="i-lucide-arrow-right"
            class="mt-6 px-0 text-highlighted"
          />
        </LandingReveal>

        <LandingReveal
          v-slot="{ visible }"
          class="min-w-0 lg:col-span-7"
          :delay="120"
        >
          <div
            class="la-window rounded-2xl border border-default bg-default p-4 shadow-xl shadow-black/5 sm:p-5 dark:bg-neutral-950/70"
            :class="{ 'is-visible': visible }"
          >
            <div class="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-sm text-inverted">
              Add refunds to billing.
            </div>
            <ol class="mt-4 space-y-2">
              <li
                v-for="(step, index) in steps"
                :key="step.command"
                class="la-step flex gap-3 rounded-xl border border-default bg-elevated/40 px-3 py-2.5"
                :style="{ '--i': index }"
              >
                <UIcon
                  name="i-lucide-square-terminal"
                  class="mt-0.5 size-4 shrink-0 text-primary"
                />
                <div class="min-w-0">
                  <p class="font-mono text-[11.5px] break-all text-highlighted sm:text-xs">
                    {{ step.command }}
                  </p>
                  <p class="mt-0.5 text-xs text-muted">
                    {{ step.note }}
                  </p>
                </div>
              </li>
            </ol>
            <div class="la-json mt-4 overflow-hidden rounded-xl bg-[#0b1120] font-mono text-[11px] leading-5 sm:text-xs">
              <p class="px-4 pt-3 text-slate-500">
                osdd:list --json, one layer (excerpt)
              </p>
              <pre
                class="overflow-x-auto px-4 pt-1 pb-3 text-slate-300"
                v-text="json"
              />
            </div>
          </div>
        </LandingReveal>
      </div>
    </UContainer>
  </section>
</template>

<style>
.osdd-motion .la-step,
.osdd-motion .la-json {
  opacity: 0;
  translate: 0 10px;
  transition: opacity 0.5s ease, translate 0.6s cubic-bezier(0.2, 1, 0.3, 1);
  transition-delay: calc(0.4s + var(--i, 4) * 0.35s);
}

.osdd-motion .la-window.is-visible .la-step,
.osdd-motion .la-window.is-visible .la-json {
  opacity: 1;
  translate: 0 0;
}
</style>
