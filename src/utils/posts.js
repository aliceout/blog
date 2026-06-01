import { getCollection } from "astro:content";

/**
 * Billets triés du plus récent au plus ancien.
 * Les brouillons (draft: true) sont masqués en production.
 */
export async function getSortedPosts() {
  const posts = await getCollection("posts", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Temps de lecture estimé (~200 mots/min) à partir du corps markdown. */
export function readingTime(body = "") {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const min = Math.max(1, Math.round(words / 200));
  return `${min} min`;
}

/** Date formatée en français : "14 mai 2026". */
export function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Date courte : "14 mai 2026" → utilisée pour la méta liste. */
export function formatDateShort(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Billets voisins (précédent = plus ancien, suivant = plus récent)
 * dans la liste triée desc, pour la navigation en pied d'article.
 */
export function neighbours(sorted, id) {
  const i = sorted.findIndex((p) => p.id === id);
  if (i === -1) return { prev: null, next: null };
  return {
    next: i > 0 ? sorted[i - 1] : null, // plus récent
    prev: i < sorted.length - 1 ? sorted[i + 1] : null, // plus ancien
  };
}
