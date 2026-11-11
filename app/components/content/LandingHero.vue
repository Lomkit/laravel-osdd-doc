<template>
  <section class="landing-hero relative isolate overflow-hidden">
    <UContainer class="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:py-28">
      <div class="flex flex-col items-start gap-6">
        <div class="flex flex-wrap gap-2">
          <UBadge
            color="primary"
            variant="subtle"
            size="lg"
            label="Laravel 13"
            icon="i-simple-icons-laravel"
          />
          <UBadge
            color="neutral"
            variant="subtle"
            size="lg"
            label="PHP 8.3+"
          />
          <UBadge
            color="neutral"
            variant="subtle"
            size="lg"
            label="MIT"
          />
        </div>

        <h1 class="text-5xl font-bold tracking-tight text-highlighted sm:text-6xl lg:text-7xl">
          <span class="block text-primary">One domain.</span>
          <span class="block">One layer.</span>
        </h1>

        <p class="max-w-xl text-lg text-muted sm:text-xl">
          Split your Laravel application into Composer packages, one per domain, each with its models, migrations, routes, tests and provider.
          <code class="rounded bg-elevated px-1.5 py-0.5 font-mono text-base text-highlighted">osdd:check</code>
          makes sure each layer only uses the layers it declares.
        </p>

        <div class="flex flex-wrap gap-3">
          <UButton
            to="/getting-started/quick-start"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            label="Get started"
          />
          <UButton
            to="https://github.com/Lomkit/laravel-osdd"
            target="_blank"
            size="xl"
            color="neutral"
            variant="subtle"
            icon="i-simple-icons-github"
            label="GitHub"
          />
        </div>

        <LandingInstall />
      </div>

      <LandingLayerMap />
    </UContainer>
  </section>
</template>
