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

## Markdown, llms.txt and MCP

The static build publishes `llms.txt`, `llms-full.txt` and a Markdown copy of every page under `/raw/<path>.md`.

The source also holds an MCP server (`server/mcp`) with two tools, `list-pages` and `get-page`. It only runs with a server runtime (`npm run dev`, or `npm run build` with a server preset): the deployed site is static and has no `/mcp` endpoint. To give an assistant the docs over MCP, use GitMCP or Context7 as the [Use with AI](https://laravel-osdd.lomkit.com/integrations/laravel-boost) page explains.
