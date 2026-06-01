---
title: Nettoyer les images Docker qui traînent
category: docker
date: 2026-05-14
updated: 2026-05-26
excerpt: "docker system prune, mais en comprenant vraiment ce qui part à la poubelle — et ce qu'on garde par erreur."
tags: ["docker", "disque", "cli", "maintenance"]
---

Au bout de quelques semaines, un poste de dev qui fait tourner Docker se retrouve avec des dizaines de gigas grignotés sans qu'on s'en rende compte. Voici comment faire le ménage *sans* supprimer ce qui sert encore.

Le coupable, c'est rarement les conteneurs en cours : ce sont les couches d'images orphelines, les volumes anonymes et le cache de build. On commence par regarder ce que Docker occupe réellement :

```bash
$ docker system df

TYPE            TOTAL     ACTIVE    RECLAIMABLE
Images          42        6         18.3GB (71%)
Containers      9         3         1.1GB
Local Volumes   23        4         6.7GB (88%)
Build Cache     310       0         9.2GB
```

La colonne `RECLAIMABLE` est la seule qui compte : c'est ce que tu peux récupérer sans toucher à ce qui tourne.

## Le ménage de base

La commande à connaître, c'est `docker system prune`. Par défaut elle reste prudente — elle ne touche qu'aux ressources **non utilisées** :

```bash
# conteneurs arrêtés, réseaux orphelins, cache de build
$ docker system prune

# + les images sans tag, en récupérant le cache complet
$ docker system prune --all --volumes
```

> Attention au `--volumes` : il supprime les volumes anonymes non rattachés. Si ta base de données locale est dans un volume nommé, elle est tranquille — mais vérifie toujours avant.

## Cibler sans tout casser

Quand on veut être chirurgical plutôt que de tout raser, on filtre. Quelques cas qui reviennent souvent :

- Supprimer les images de plus de 24 h : `docker image prune -a --filter "until=24h"`
- Ne garder que le cache de build récent : `docker builder prune --keep-storage 2GB`
- Lister les volumes orphelins avant d'agir : `docker volume ls -f dangling=true`

Et si tu veux automatiser, un petit cron hebdomadaire qui lance un `prune` ciblé évite de se retrouver le disque plein un vendredi soir. On en reparle dans un prochain billet.
