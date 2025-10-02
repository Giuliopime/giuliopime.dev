import {defineContentConfig, defineCollection, z} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        project: z.string().optional(),
        tags: z.array(z.string())
      })
    }),
    guides: defineCollection({
      type: 'page',
      source: 'guides/**/*.md'
    })
  }
})