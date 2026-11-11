<template>
  <section class="relative pt-8 pb-20 sm:pb-28">
    <UContainer>
      <LandingReveal class="relative isolate overflow-hidden rounded-3xl border border-default px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          class="lc-bg pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        />
        <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-highlighted sm:text-5xl">
          Give your next domain its own package
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-base text-pretty text-muted sm:text-lg">
          Start on a fresh Laravel 13 app with osdd:start, or move an existing app one domain at a time.
        </p>
        <div class="mt-8 flex flex-col items-center gap-4">
          <LandingInstall />
          <div class="flex flex-wrap items-center justify-center gap-3">
            <UButton
              to="/getting-started/quick-start"
              size="xl"
              trailing-icon="i-lucide-arrow-right"
              label="Quick start"
            />
            <UButton
              to="/getting-started/existing-application"
              size="xl"
              color="neutral"
              variant="subtle"
              icon="i-lucide-folder-input"
              label="Existing application"
            />
          </div>
        </div>
        <div class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <UButton
            to="https://github.com/Lomkit/laravel-osdd"
            target="_blank"
            color="neutral"
            variant="link"
            icon="i-simple-icons-github"
            label="Lomkit/laravel-osdd"
          />
          <UButton
            to="https://github.com/sponsors/GautierDele"
            target="_blank"
            color="neutral"
            variant="link"
            icon="i-lucide-heart"
            label="Become a sponsor"
          />
          <UButton
            to="https://laravel-rest-api.lomkit.com"
            target="_blank"
            color="neutral"
            variant="link"
            icon="i-lucide-blocks"
            label="Laravel Rest Api"
          />
        </div>
        <p class="mx-auto mt-8 max-w-lg text-xs text-dimmed">
          Laravel OSDD (Open Source Driven Development) is MIT licensed and maintained by Lomkit.
        </p>
      </LandingReveal>
    </UContainer>
  </section>
</template>

<style scoped>
.lc-bg {
  background:
    radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, var(--ui-primary) 18%, transparent), transparent 70%),
    radial-gradient(40% 60% at 100% 100%, color-mix(in oklab, #8b5cf6 10%, transparent), transparent 70%),
    var(--ui-bg-elevated);
}

.lc-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, color-mix(in oklab, var(--ui-border) 60%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklab, var(--ui-border) 60%, transparent) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 40%, #000, transparent);
}
</style>
