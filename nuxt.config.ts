import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

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
        ...rawMarkdownRoutes(fileURLToPath(new URL('./content', import.meta.url)))
      ],
      crawlLinks: true,
      // Avoid Github pages trailing slash bug
      autoSubfolderIndex: false
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
    title: 'Laravel OSDD - Lomkit',
    description: 'Laravel OSDD splits a Laravel application into layers: one Composer package per domain, with its own models, migrations, seeders, tests, routes and service provider.',
    full: {
      title: 'Laravel OSDD - Full Documentation',
      description: 'Complete documentation for Laravel OSDD by Lomkit'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Layers',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/layers%' }
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
