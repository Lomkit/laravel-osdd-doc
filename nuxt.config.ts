import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

// Markdown copy of every docs page, served under /raw for the MCP tools and the "Copy page" menu
function rawMarkdownRoutes(directory: string, prefix = ''): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const slug = entry.name.replace(/^\d+\./, '').replace(/\.md$/, '')

    if (entry.isDirectory()) {
      return rawMarkdownRoutes(`${directory}/${entry.name}`, `${prefix}/${slug}`)
    }

    if (!entry.name.endsWith('.md') || prefix === '') {
      return []
    }

    return [`/raw${prefix}/${slug}.md`]
  })
}

// Date of the last commit of each content file, for the sitemap lastmod and the pages' dateModified.
// A shallow clone would give every file the date of its single commit, so it gives no date at all.
function contentCommitDates(): Map<string, string> {
  const dates = new Map<string, string>()
  const git = (args: string[]) => execFileSync('git', args, { cwd: root, encoding: 'utf8' })

  try {
    if (git(['rev-parse', '--is-shallow-repository']).trim() !== 'false') {
      return dates
    }

    for (const commit of git(['log', '--format=%x00%cI', '--name-only', '--', 'content']).split('\0')) {
      const [date, ...files] = commit.trim().split('\n')
      for (const file of files.filter(Boolean)) {
        if (date && !dates.has(join(root, file))) {
          dates.set(join(root, file), date)
        }
      }
    }
  } catch {
    dates.clear()
  }

  return dates
}

const commitDates = contentCommitDates()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://laravel-osdd.lomkit.com',
    name: 'Laravel OSDD - Lomkit'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['php', 'bash', 'json', 'xml', 'diff', 'blade', 'yaml']
        },
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  experimental: { asyncContext: true },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/',
        ...rawMarkdownRoutes(join(root, 'content'))
      ],
      crawlLinks: true,
      // Avoid Github pages trailing slash bug
      autoSubfolderIndex: false
    }
  },

  hooks: {
    'content:file:afterParse'(ctx) {
      const lastmod = commitDates.get(ctx.file.path)
      if (lastmod && ctx.collection.name === 'docs') {
        ctx.content.sitemap = { ...(ctx.content.sitemap as object | undefined), lastmod }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    clientBundle: {
      scan: true
    }
  },

  llms: {
    domain: 'https://laravel-osdd.lomkit.com',
    title: 'Laravel OSDD',
    description: 'Laravel OSDD (lomkit/laravel-osdd) splits a Laravel application into domain modules called layers: one Composer package per domain, with its own models, migrations, routes and tests, and an Artisan command, osdd:check, that fails when a layer uses a layer it does not require. It is for teams growing a Laravel application with several business domains, and needs PHP 8.3+ and Laravel 13.',
    full: {
      title: 'Laravel OSDD 3.x - Full Documentation',
      description: 'Every page of the Laravel OSDD 3.x documentation in one Markdown file'
    },
    sections: [
      {
        title: 'How to use these docs with an AI',
        description: 'These pages document Laravel OSDD 3.x, the current version, for Laravel 13. Laravel 12 applications stay on Laravel OSDD 2.x: the upgrade guide below lists the differences. Every page has a Markdown copy under /raw/<path>.md. The package ships a Laravel Boost skill for coding agents, and the docs can be served to an assistant over MCP through GitMCP: see the Use with AI page.',
        links: [
          {
            title: 'Use with AI',
            description: 'The Laravel Boost skill, llms.txt, the Markdown copies and the MCP setup',
            href: 'https://laravel-osdd.lomkit.com/raw/integrations/laravel-boost.md'
          }
        ]
      },
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Concepts',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/concepts%' }
        ]
      },
      {
        title: 'Guides',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/guides%' }
        ]
      },
      {
        title: 'Commands',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/commands%' }
        ]
      },
      {
        title: 'API Reference',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/api-reference%' }
        ]
      },
      {
        title: 'Integrations',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/integrations%' }
        ]
      },
      {
        title: 'Upgrade',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/upgrade%' }
        ]
      }
    ]
  },

  mcp: {
    name: 'Laravel OSDD Docs'
  },

  sitemap: {
    zeroRuntime: true
  }
})
