---
seo:
  title: "Laravel OSDD: split your Laravel application into layers"
  description: |
    Laravel OSDD splits your application into layers: one Composer package per domain,
    with its own models, migrations, seeders, tests, routes and service provider.
---

:::u-page-hero
---
orientation: horizontal
---
  :::prose-pre
  ---
  code: composer require lomkit/laravel-osdd
  filename: Terminal
  ---
  ```bash
  composer require lomkit/laravel-osdd
  php artisan osdd:start
  ```
  :::

#title
One domain, one layer.

#description
Laravel OSDD splits your application into layers. Each layer is a Composer package with its own models, migrations, seeders, tests, routes and service provider, and `osdd:check` makes sure each layer only uses the layers it requires.

#links
  :::u-button
  ---
  size: xl
  to: /getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  target: _blank
  to: https://github.com/Lomkit/laravel-osdd
  variant: subtle
  ---
  Star on github
  :::
:::

:::u-page-section
#title
Keep every domain in its own package

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  ---
  #title
  Boundaries, checked

  #description
  `osdd:check` fails when a layer uses a layer it does not require, or when layers require each other. Run it in CI with `--format=github`.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-package
  ---
  #title
  Layers are Composer packages

  #description
  Each domain lives in `functional/` or `technical/` with its own `composer.json`, installed through a local path repository.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-laravel
  ---
  #title
  Artisan twins

  #description
  Every `make:*` generator has an `osdd:*` twin that writes inside the layer you pick and wires the layer provider.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-component
  ---
  #title
  Views, components and Livewire

  #description
  `withViews()`, `withComponents()` and `withLivewire()` register them under the layer name: `<x-orders::alert />`.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-network
  ---
  #title
  Inventory and graph

  #description
  `osdd:list` shows every layer with its contents and health, and `osdd:graph` draws the layers in Mermaid, DOT or JSON.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title
  Seeders, config and listeners per layer

  #description
  `LayersSeeder` runs the seeders of every layer, a layer overrides the config of any package, and layer listeners can be discovered.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Cached in production

  #description
  `php artisan optimize` caches the discovered layers, so a request never scans the layer folders.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layout-dashboard
  ---
  #title
  Filament, optional

  #description
  The `LayersPlugin` panel plugin discovers the resources, pages and widgets of every layer.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bot
  ---
  #title
  Laravel Boost skill

  #description
  The package ships a Boost skill, so your coding agent writes inside layers, not in `app/`.
  :::
:::


:::u-page-section
---
ui:
  container: sm:py-6 lg:py-7 py-6
title: First setup
id: first-setup
---
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-7 py-6
title: First, convert your project
orientation: horizontal
variant: naked
links:
  - label: Read the quick start
    to: /getting-started/quick-start
    trailingIcon: i-heroicons-arrow-right-20-solid
    color: neutral
    variant: outline
---
#description
:::prose-pre
---
code: php artisan osdd:start
filename: Terminal
---
```bash
php artisan osdd:start
```
:::

#default
:::prose-pre
---
filename: Project
---
```bash
functional/
  users/
    composer.json
    src/Models/User.php
    src/Providers/UsersServiceProvider.php
    database/migrations/
technical/
  osdd/
    composer.json
    config/osdd.php
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-7 py-6
title: Then, create a layer per domain
orientation: horizontal
variant: naked
reverse: true
links:
  - label: Create layers
    to: /commands/osdd-layer
    trailingIcon: i-heroicons-arrow-right-20-solid
    color: neutral
    variant: outline
---
#description
:::prose-pre
---
code: php artisan osdd:layer
filename: Terminal
---
```bash
php artisan osdd:layer
```
:::

#default
:::prose-pre
---
filename: functional/orders/composer.json
---
```json
{
    "name": "functional/orders",
    "type": "layer",
    "autoload": {
        "psr-4": {
            "Functional\\Orders\\": "src/"
        }
    },
    "extra": {
        "laravel": {
            "providers": [
                "Functional\\Orders\\Providers\\OrdersServiceProvider"
            ]
        }
    }
}
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-7 py-6
title: Generate code inside it
orientation: horizontal
variant: naked
links:
  - label: Every generator
    to: /commands/make-commands
    trailingIcon: i-heroicons-arrow-right-20-solid
    color: neutral
    variant: outline
---
#description
:::prose-pre
---
filename: Terminal
---
```bash
php artisan osdd:controller OrderController --layer=functional/orders
```
:::

#default
:::prose-pre
---
filename: Project
---
```bash
functional/orders/
└── src/
    └── Http/
        └── Controllers/
            └── OrderController.php   # Functional\Orders\Http\Controllers
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-7 py-6
title: Wire it in the layer's provider
orientation: horizontal
variant: naked
reverse: true
links:
  - label: The layer provider
    to: /layers/service-provider
    trailingIcon: i-heroicons-arrow-right-20-solid
    color: neutral
    variant: outline
---
#description
:::prose-pre
---
filename: Terminal
---
```bash
php artisan migrate
php artisan osdd:seed
php artisan osdd:phpunit
```
:::

#default
:::prose-pre
---
filename: OrdersServiceProvider.php
---
```php
<?php

namespace Functional\Orders\Providers;

use Functional\Orders\Database\Seeders\OrdersSeeder;
use Lomkit\Osdd\LayerServiceProvider;

class OrdersServiceProvider extends LayerServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
        $this->loadSeeders([OrdersSeeder::class]);

        $this->withRouting(
            web: __DIR__ . '/../../routes/web.php',
            api: __DIR__ . '/../../routes/api.php',
        );

        $this->withViews(__DIR__ . '/../../resources/views');
    }
}
```
:::
:::

:::u-page-section
---
ui:
  container: sm:py-6 lg:py-7 py-6
title: Finally, keep the boundaries
orientation: horizontal
variant: naked
links:
  - label: Layer boundaries
    to: /layers/boundaries
    trailingIcon: i-heroicons-arrow-right-20-solid
    color: neutral
    variant: outline
---
#description
:::prose-pre
---
code: php artisan osdd:check
filename: Terminal
---
```bash
php artisan osdd:check
```
:::

#default
:::prose-pre
---
filename: Output
---
```bash
  ERROR  functional/orders uses functional/billing but does not require it.

  functional/orders/src/Checkout.php:7 ...... Functional\Billing\Models\Invoice

  ERROR  1 boundary violation in 3 layers.
```
:::
:::


:::u-page-section
---
ui:
  container: sm:py-6 lg:py-7 py-6
---
#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /getting-started/installation
  trailingIcon: i-lucide-arrow-right
  ---
  Get started
  :::
