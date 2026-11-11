<script setup lang="ts">
const sponsor = useSponsors()
const { sponsors } = useAppConfig()
</script>

<template>
  <UPageSection :ui="{ container: 'pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24' }">
    <div class="flex flex-col items-center gap-8 rounded-2xl border border-default bg-elevated/40 px-6 py-10 text-center sm:px-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-muted">
        Sponsored by
      </p>

      <ULink
        v-if="sponsor"
        :to="sponsor.link"
        target="_blank"
        class="flex flex-col items-center gap-3"
      >
        <UColorModeImage
          :light="sponsor.logo.light"
          :dark="sponsor.logo.dark"
          :alt="sponsor.name"
          class="h-10 w-auto sm:h-12"
        />
        <span class="text-sm text-muted">{{ sponsor.text }}</span>
      </ULink>

      <p class="max-w-xl text-muted">
        Laravel OSDD is MIT licensed and built by Lomkit, the team behind Laravel Rest Api. Issues and pull requests are welcome.
      </p>

      <div class="flex flex-wrap justify-center gap-3">
        <UButton
          v-for="link in sponsors.links"
          :key="link.label"
          v-bind="link"
          color="neutral"
          variant="outline"
        />
        <UButton
          to="https://laravel-rest-api.lomkit.com"
          target="_blank"
          icon="i-lucide-blocks"
          label="Laravel Rest Api"
          color="neutral"
          variant="ghost"
        />
      </div>
    </div>
  </UPageSection>
</template>
