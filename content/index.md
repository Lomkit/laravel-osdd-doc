---
seo:
  title: "Laravel OSDD: split your Laravel application into layers"
  description: |
    Laravel OSDD splits your application into layers: one Composer package per domain,
    with its own models, migrations, seeders, tests, routes and service provider,
    and osdd:check keeps the boundaries between them.
---

::landing-hero
::

::landing-problem
::

::landing-steps
::

:::u-page-section
---
title: Everything a domain needs, in its own package
ui:
  container: py-16 sm:py-20 lg:py-24
description: A layer is a plain Composer package in your repository. OSDD gives it the tooling a Laravel app gets for app/.
---
#features
  :::u-page-feature
  ---
  icon: i-lucide-package
  to: /concepts/layers
  ---
  #title
  Layers are Composer packages

  #description
  Each domain lives in `functional/` or `technical/` with its own `composer.json`, installed through a local path repository.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-laravel
  to: /commands/make-commands
  ---
  #title
  Artisan twins

  #description
  Every `make:*` generator has an `osdd:*` twin that writes inside the layer you pick and wires the layer provider.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  to: /concepts/boundaries
  ---
  #title
  Boundaries checked in CI

  #description
  `osdd:check` fails when a layer uses a layer it does not require, or when layers require each other. GitHub annotations included.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-test-tube
  to: /guides/testing-and-ci
  ---
  #title
  Tests, seeders and config per layer

  #description
  One PHPUnit suite per layer, seeders ordered across layers, and config overrides from the layer that owns them.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-livewire
  to: /integrations/livewire
  ---
  #title
  Livewire and Filament

  #description
  `<livewire:orders::cart />` from a layer, and a Filament plugin that discovers the resources of every layer. Both optional.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bot
  to: /integrations/laravel-boost
  ---
  #title
  A Boost skill for your agent

  #description
  The package ships a Laravel Boost skill, so your coding agent creates layers and writes inside them, not in `app/`.
  :::
:::

:::u-page-section
---
title: Each layer wires itself
ui:
  container: py-10 sm:py-14 lg:py-16 lg:grid-cols-[2fr_3fr]
description: A layer's provider extends LayerServiceProvider. It loads the layer's migrations, seeders, routes and views, so adding a domain never touches a shared file.
orientation: horizontal
links:
  - label: Service providers
    to: /concepts/service-providers
    trailingIcon: i-lucide-arrow-right
    color: neutral
    variant: outline
---
  :::prose-pre
  ---
  filename: OrdersServiceProvider.php
  ---
  ```php
  class OrdersServiceProvider extends LayerServiceProvider
  {
      public function boot(): void
      {
          $this->loadMigrationsFrom(__DIR__.'/../../database/migrations');
          $this->loadSeeders([OrdersSeeder::class]);

          $this->withRouting(
              web: __DIR__.'/../../routes/web.php',
              api: __DIR__.'/../../routes/api.php',
          );

          $this->withViews(__DIR__.'/../../resources/views');
      }

      public function register(): void
      {
          $this->overrideConfigFrom(__DIR__.'/../../config/orders.php', 'orders');
      }
  }
  ```
  :::
:::

:::u-page-section
---
title: Boundaries, checked on every pull request
ui:
  container: py-10 sm:py-14 lg:py-16 lg:grid-cols-[3fr_2fr]
  wrapper: lg:order-last
description: All layers share one autoloader, so PHP lets any layer use any other. osdd:check reads every layer and fails when one uses a layer it does not require. In GitHub Actions, each violation lands on the pull request as an annotation.
orientation: horizontal
links:
  - label: Tests and CI
    to: /guides/testing-and-ci
    trailingIcon: i-lucide-arrow-right
    color: neutral
    variant: outline
---
  ::landing-terminal
  ---
  title: php artisan osdd:check
  lines:
    - kind: command
      text: php artisan osdd:check
    - kind: error
      text: "  ERROR  functional/orders uses functional/billing but does not require it."
    - kind: output
      text: ""
    - kind: output
      text: "  functional/orders/src/Checkout.php:7 ..... Functional\\Billing\\Models\\Invoice"
    - kind: output
      text: ""
    - kind: warning
      text: "   WARN  functional/billing requires technical/core but does not use it."
    - kind: output
      text: ""
    - kind: error
      text: "  ERROR  1 boundary violation in 4 layers (1 unused requirement)."
  ---
  ::
:::

:::u-page-section
---
title: Built for coding agents
ui:
  container: py-10 sm:py-14 lg:py-16
description: With Laravel Boost, your agent learns where files go in an OSDD project. It reads the layers with osdd:list --json, generates code with --layer, and runs osdd:check before it finishes.
orientation: horizontal
links:
  - label: Laravel Boost
    to: /integrations/laravel-boost
    trailingIcon: i-lucide-arrow-right
    color: neutral
    variant: outline
---
  :::prose-pre
  ---
  filename: php artisan osdd:list --json (excerpt)
  ---
  ```json
  {
      "layers": [
          {
              "name": "functional/orders",
              "namespace": "Functional\\Orders\\",
              "requires": ["functional/users"],
              "health": {
                  "required": true,
                  "path_repository": true,
                  "installed": true,
                  "provider_extends_layer_service_provider": true,
                  "test_suite": true
              }
          }
      ]
  }
  ```
  :::
:::

::landing-partners
::

:::u-page-section
---
ui:
  container: pt-0 sm:pt-0 lg:pt-0 pb-24 sm:pb-32
---
  :::u-page-c-t-a
  ---
  title: Split your first domain in five minutes
  description: Install the package, run osdd:start on a fresh project, and create your first layer.
  variant: subtle
  links:
    - label: Get started
      to: /getting-started/quick-start
      trailingIcon: i-lucide-arrow-right
    - label: Read the concepts
      to: /concepts/layers
      color: neutral
      variant: outline
  ---
  :::
:::
