/**
 * Catégories du blog : une teinte (--hue) par catégorie.
 * L'accent visuel se calcule via oklch(var(--cat-l) var(--cat-c) var(--hue)),
 * --cat-l / --cat-c venant du thème (clair/sombre).
 */
export const CATEGORIES = {
  systeme: { label: "système", hue: 286 },
  docker: { label: "docker", hue: 236 },
  reseau: { label: "réseau", hue: 196 },
  bash: { label: "bash", hue: 150 },
  securite: { label: "sécurité", hue: 30 },
  web: { label: "web", hue: 334 },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);

/** Récupère { label, hue } pour une clé de catégorie (fallback neutre). */
export const getCategory = (key) =>
  CATEGORIES[key] || { label: String(key), hue: 150 };

/** Style inline à poser sur un élément pour fixer sa teinte d'accent. */
export const hueStyle = (key) => `--hue:${getCategory(key).hue}`;
