---
title: Laravel OSDD
description: Split a growing Laravel app into domain modules. Each domain is its own Composer package, and osdd:check enforces the boundaries between them.
seo:
  title: "Laravel OSDD: split your Laravel app into domain modules"
  description: "Modular Laravel for growing apps: each domain becomes its own Composer package with its models, migrations, routes and tests, and osdd:check enforces the boundaries between modules in CI."
---

Laravel OSDD splits a Laravel application into domain modules called layers. Each layer is a Composer package of its own, with its models, migrations, seeders, tests, routes and service provider. Each layer declares the layers it requires in its composer.json, and `osdd:check` fails when the code uses a layer it does not require or when layers require each other.
