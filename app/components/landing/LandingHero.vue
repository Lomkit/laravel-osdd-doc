<template>
  <section class="relative isolate overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <div class="lh-grid absolute inset-0" />
      <div class="lh-glow lh-glow-a absolute" />
      <div class="lh-glow lh-glow-b absolute" />
    </div>

    <UContainer class="grid grid-cols-1 items-center gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-16 lg:pb-24">
      <div class="lh-rise flex flex-col items-start gap-6 lg:col-span-5">
        <UButton
          to="/concepts/boundaries"
          color="neutral"
          variant="outline"
          size="sm"
          class="rounded-full ps-1.5"
          trailing-icon="i-lucide-arrow-right"
        >
          <UBadge
            label="3.0"
            size="sm"
            class="rounded-full"
          />
          <span class="text-muted">Boundary checks and the layer graph</span>
        </UButton>

        <h1 class="text-4xl font-bold tracking-tight text-balance text-highlighted sm:text-5xl xl:text-6xl">
          Split your Laravel app
          <span class="lh-gradient block">into domain modules.</span>
        </h1>

        <p class="max-w-xl text-base text-pretty text-muted sm:text-lg">
          Each domain of your app becomes its own Composer package, with its models, migrations, routes, tests and service provider.
          Modules declare the modules they depend on, and one Artisan command checks that the code respects it, on every pull request.
        </p>

        <div class="flex w-full flex-col items-start gap-4">
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
              label="Star on GitHub"
            />
          </div>
          <LandingInstall />
          <p class="text-xs text-dimmed">
            lomkit/laravel-osdd · PHP 8.3+ · Laravel 13 · MIT license
          </p>
        </div>
      </div>

      <div class="lh-rise lh-rise-late relative min-w-0 lg:col-span-7">
        <div
          class="lh-halo pointer-events-none absolute -inset-8 -z-10"
          aria-hidden="true"
        />
        <LandingHeroScene />
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.lh-grid {
  background-image:
    linear-gradient(to right, color-mix(in oklab, var(--ui-border) 70%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklab, var(--ui-border) 70%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 75% 60% at 50% 0%, #000 30%, transparent 100%);
}

.lh-glow {
  width: 60rem;
  height: 40rem;
  border-radius: 9999px;
}

.lh-glow-a {
  top: -24rem;
  left: -18rem;
  background: radial-gradient(closest-side, color-mix(in oklab, var(--ui-primary) 26%, transparent), transparent);
}

.lh-glow-b {
  top: -14rem;
  right: -22rem;
  background: radial-gradient(closest-side, color-mix(in oklab, #8b5cf6 14%, transparent), transparent);
}

.lh-halo {
  background: radial-gradient(60% 55% at 50% 50%, color-mix(in oklab, var(--ui-primary) 16%, transparent), transparent 70%);
}

.lh-gradient {
  background: linear-gradient(100deg, var(--ui-primary) 10%, #f43f5e 55%, var(--ui-primary) 95%);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@media (prefers-reduced-motion: no-preference) {
  .lh-glow-a {
    animation: lh-drift-a 18s ease-in-out infinite alternate;
  }

  .lh-glow-b {
    animation: lh-drift-b 22s ease-in-out infinite alternate;
  }

  .lh-gradient {
    animation: lh-shine 8s ease-in-out infinite alternate;
  }

  .lh-rise {
    animation: lh-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .lh-rise-late {
    animation-delay: 0.2s;
    animation-duration: 1.1s;
  }
}

@keyframes lh-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@keyframes lh-drift-a {
  to { transform: translate3d(8rem, 3rem, 0) scale(1.1); }
}

@keyframes lh-drift-b {
  to { transform: translate3d(-10rem, 4rem, 0) scale(0.9); }
}

@keyframes lh-shine {
  to { background-position: 100% 0; }
}
</style>
