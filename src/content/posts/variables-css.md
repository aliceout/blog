---
title: Les variables CSS que j'aurais aimé connaître plus tôt
category: web
date: 2026-02-29
excerpt: "Theming, calc(), portée locale… de quoi arrêter de se battre avec son CSS au quotidien."
tags: ["css", "theming", "frontend"]
---

Les variables CSS (custom properties) ne servent pas qu'à ranger ses couleurs en haut du fichier. Trois usages changent vraiment la façon d'écrire du style.

## La portée locale

Une variable n'est pas forcément globale : déclarée sur un élément, elle ne vaut que pour lui et ses descendants. C'est ce qui permet un système d'accent par composant :

```css
.card { --accent: tomato; }
.card .title { color: var(--accent); }
```

Changer `--accent` sur une carte précise (même en inline) recolorie tout son intérieur, sans toucher aux autres.

## calc() avec des variables

On peut combiner variables et `calc()` pour des échelles cohérentes :

```css
:root { --space: 8px; }
.box { padding: calc(var(--space) * 2) calc(var(--space) * 3); }
```

## Le fallback

Le deuxième argument de `var()` est une valeur de repli, pratique quand une variable peut ne pas être définie :

```css
color: var(--accent, currentColor);
```

- portée locale → theming par composant sans classe en plus
- `calc()` → une seule source de vérité pour les espacements
- fallback → des composants robustes même sans token défini

Depuis que j'utilise ces trois mécanismes, mes feuilles de style ont fondu de moitié.
