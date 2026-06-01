import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { CATEGORY_KEYS } from "./utils/categories.js";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(CATEGORY_KEYS as [string, ...string[]]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
