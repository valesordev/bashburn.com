import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    event: z.string().optional(),
    date: z.coerce.date().optional(),
    status: z.enum(['idea', 'in-progress', 'submitted', 'accepted', 'delivered']),
    abstract: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, talks };
