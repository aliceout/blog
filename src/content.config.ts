import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { CATEGORY_KEYS } from "./utils/categories.js";

// Booléen tolérant : accepte true/false ET les chaînes yes/no (oui/non),
// car le parseur YAML d'Astro lit `yes`/`no` comme des chaînes.
const yesno = z.preprocess((v) => {
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["yes", "y", "oui", "true"].includes(s)) return true;
    if (["no", "n", "non", "false"].includes(s)) return false;
  }
  return v;
}, z.boolean());

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(CATEGORY_KEYS as [string, ...string[]]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    // Brouillon : masqué en production (accepte yes/no ou true/false).
    draft: yesno.default(false),
    // Épinglé : remonte en tête de la liste (le tri reste par date ensuite).
    pinned: yesno.default(false),
  }),
});

export const collections = { posts };
