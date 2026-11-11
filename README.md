# Laravel OSDD documentation

Source of [laravel-osdd.lomkit.com](https://laravel-osdd.lomkit.com), the documentation of [Laravel OSDD](https://github.com/Lomkit/laravel-osdd).

Built with [Nuxt](https://nuxt.com), [Nuxt UI](https://ui.nuxt.com) and [Nuxt Content](https://content.nuxt.com). The pages live in `content/`.

## Setup

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
```

## Static build

```bash
npm run generate
```

The site is generated into `.output/public` and deployed to GitHub Pages on every push to `main`.

## MCP server

The site ships an MCP server (`/mcp`) with two tools, `list-pages` and `get-page`, and a Markdown copy of every page under `/raw/<path>.md`. The MCP endpoint needs a server runtime (`npm run dev`, or `npm run build` with a server preset); the static build only contains the Markdown copies and `llms.txt`.
