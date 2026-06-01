---
title: "jq : manipuler du JSON sans pleurer"
category: bash
date: 2026-04-08
excerpt: "Filtrer, transformer, reformater du JSON directement dans le terminal. Les patterns que j'utilise tous les jours."
tags: ["jq", "json", "cli", "bash"]
---

Dès qu'une API renvoie du JSON un peu touffu, lire la sortie brute devient pénible. `jq` transforme le terminal en couteau suisse pour explorer et reformater tout ça.

## Explorer

Le filtre identité `.` reformate et colore :

```bash
$ curl -s https://api.exemple.fr/users | jq .
```

Pour piocher un champ, on enchaîne les clés :

```bash
$ cat data.json | jq '.user.name'
```

## Filtrer un tableau

`map`, `select` et `[]` couvrent 90 % des besoins :

```bash
# ne garder que les utilisateurs actifs, et leur email
$ jq '[.users[] | select(.active) | .email]' data.json
```

## Reformater

On peut reconstruire des objets à la volée :

```bash
$ jq '.items[] | {id, label: .name}' data.json
```

- `{id}` est un raccourci pour `{id: .id}`
- `select(...)` garde uniquement ce qui matche
- `-r` (raw) enlève les guillemets, parfait pour piper vers un autre outil

Une fois ces trois patterns en main, on n'ouvre plus jamais un JSON dans un éditeur juste pour le lire.
