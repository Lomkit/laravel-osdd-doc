import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    docs: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: '**',
          exclude: ['index.md']
        },
        schema: z.object({
          links: z.array(z.object({
            label: z.string(),
            icon: z.string(),
            to: z.string(),
            target: z.string().optional()
          })).optional()
        })
      })
    )
  }
})
