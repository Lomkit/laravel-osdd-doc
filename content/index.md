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
Laravel OSDD splits your application into layers. Each layer is a Composer package with its own models, migrations, seeders, tests, routes and service provider.

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
  Every class generator has an `osdd:*` twin: `osdd:model`, `osdd:controller`, `osdd:migration` write inside the layer you pick.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-flask-conical
  ---
  #title
  One test suite per layer

  #description
  `osdd:phpunit` adds a test suite for each layer to `phpunit.xml`. Run one layer's tests with `--testsuite`.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title
  Seeders per layer

  #description
  Each layer registers its seeders with a priority. `osdd:seed` runs them all, without a central `DatabaseSeeder`.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-settings-2
  ---
  #title
  Config per layer

  #description
  A layer overrides the config of any package, Horizon or Telescope included, with `overrideConfigFrom()`.
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
title: Finally, wire it in the layer's provider
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
    }
}
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
