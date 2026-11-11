<script setup lang="ts">
const tiles = [
  {
    key: 'twins',
    span: 'sm:col-span-2 lg:col-span-4',
    title: 'Every make:* has an osdd:* twin',
    description: 'Same arguments and stubs, plus the layer to write in. The file lands in the layer, and the layer provider is wired for you.',
    to: '/commands/make-commands'
  },
  {
    key: 'tests',
    span: 'lg:col-span-2',
    title: 'One test suite per layer',
    description: 'osdd:phpunit keeps phpunit.xml in sync with your layers.',
    to: '/guides/testing-and-ci'
  },
  {
    key: 'github',
    span: 'lg:col-span-2',
    title: 'Violations on the pull request',
    description: 'With the github format, osdd:check turns each violation into an annotation.',
    to: '/guides/testing-and-ci'
  },
  {
    key: 'seeders',
    span: 'sm:col-span-2 lg:col-span-4',
    title: 'Seeders from every layer',
    description: 'Each layer registers its seeders. LayersSeeder runs them all through db:seed, migrate --seed or osdd:seed.',
    to: '/guides/seeders'
  },
  {
    key: 'views',
    span: 'lg:col-span-3',
    title: 'Views and components per layer',
    description: 'Registered under the layer name, like a package.',
    to: '/guides/views-and-components'
  },
  {
    key: 'cache',
    span: 'lg:col-span-3',
    title: 'Cached in production',
    description: 'optimize caches the discovered layers: no folder scan per request.',
    to: '/guides/production'
  }
]
</script>

<template>
  <section class="relative py-16 sm:py-24">
    <UContainer>
      <LandingReveal class="mx-auto max-w-3xl text-center">
        <p class="text-sm font-semibold text-primary">
          Everything a domain needs
        </p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance text-highlighted sm:text-4xl">
          A layer gets the tooling Laravel gives app/
        </h2>
      </LandingReveal>

      <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <LandingReveal
          v-for="(tile, index) in tiles"
          :key="tile.key"
          :delay="(index % 3) * 80"
          :class="tile.span"
        >
          <NuxtLink
            :to="tile.to"
            class="lb-tile group relative flex h-full flex-col overflow-hidden rounded-2xl border border-default bg-default p-5 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-primary sm:p-6"
          >
            <LandingBentoVisual :tile="tile.key" />
            <h3 class="mt-5 font-semibold text-highlighted">
              {{ tile.title }}
            </h3>
            <p class="mt-1 text-sm text-pretty text-muted">
              {{ tile.description }}
            </p>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="absolute top-5 right-5 size-4 text-dimmed opacity-0 transition-opacity group-hover:opacity-100"
            />
          </NuxtLink>
        </LandingReveal>
      </div>
    </UContainer>
  </section>
</template>

<style src="./landing-bento.css"></style>
