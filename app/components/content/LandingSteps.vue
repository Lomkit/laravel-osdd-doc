<script setup lang="ts">
import type { TerminalLine } from '~/types/landing'

interface Step {
  title: string
  description: string
  to: string
  link: string
  lines: TerminalLine[]
}

const steps: Step[] = [
  {
    title: 'Convert the project',
    description: 'On a fresh Laravel app, osdd:start moves the User model to functional/users and the OSDD config to technical/osdd.',
    to: '/getting-started/quick-start',
    link: 'Quick start',
    lines: [
      { kind: 'command', text: 'composer require lomkit/laravel-osdd' },
      { kind: 'command', text: 'php artisan osdd:start' },
      { kind: 'comment', text: '# functional/users, technical/osdd' }
    ]
  },
  {
    title: 'Create a layer per domain',
    description: 'osdd:layer writes the package, registers it in Composer, and every make:* twin writes inside it.',
    to: '/guides/add-a-domain',
    link: 'Add a domain',
    lines: [
      { kind: 'command', text: 'php artisan osdd:layer functional/orders \\' },
      { kind: 'output', text: '    --requires=functional/users' },
      { kind: 'success', text: 'Layer functional/orders created at functional/orders.' },
      { kind: 'command', text: 'php artisan osdd:model Order --all \\' },
      { kind: 'output', text: '    --layer=functional/orders' }
    ]
  },
  {
    title: 'Check the boundaries',
    description: 'osdd:check reads every layer and fails when one uses a layer it does not require. Run it in CI.',
    to: '/concepts/boundaries',
    link: 'Boundaries',
    lines: [
      { kind: 'command', text: 'php artisan osdd:check' },
      { kind: 'success', text: 'No boundary violation in 3 layers.' }
    ]
  }
]
</script>

<template>
  <UPageSection
    title="From app/ to layers in three commands"
    :ui="{ container: 'py-16 sm:py-20 lg:py-24' }"
    description="Real commands, nothing to configure."
  >
    <ol class="grid gap-6 lg:grid-cols-3">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="flex flex-col gap-4"
      >
        <div class="flex items-center gap-3">
          <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-inverted">{{ index + 1 }}</span>
          <h3 class="text-lg font-semibold text-highlighted">
            {{ step.title }}
          </h3>
        </div>
        <p class="text-muted lg:min-h-18">
          {{ step.description }}
        </p>
        <LandingTerminal
          :lines="step.lines"
          class="flex-1"
        />
        <ULink
          :to="step.to"
          class="inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          {{ step.link }}
          <UIcon name="i-lucide-arrow-right" />
        </ULink>
      </li>
    </ol>
  </UPageSection>
</template>
