/**
 * Configuration du blog.
 */

/** Teinte de la marque "~/" dans la sidebar (fixe, indépendante des billets). */
export const BRAND_HUE = 150;

/** Items du menu de la sidebar. `match` sert à marquer l'item actif. */
export const NAV_ITEMS = [
  { label: "Articles", href: "/", match: "home" },
  { label: "Catégories", href: "/categories/", match: "categories" },
  { label: "À propos", href: "/a-propos/", match: "about" },
  { label: "Flux RSS", href: "/rss.xml", match: "rss", external: true },
];

/** Déduit la section active depuis le pathname. */
export function sectionFromPath(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/" || p.startsWith("/billets")) return "home";
  if (p.startsWith("/categories")) return "categories";
  if (p.startsWith("/a-propos")) return "about";
  return null;
}
