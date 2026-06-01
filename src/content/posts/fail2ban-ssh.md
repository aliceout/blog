---
title: "fail2ban : bannir les bots qui tapent ton SSH"
category: securite
date: 2026-03-27
excerpt: "Une protection simple contre le brute-force, et comment lire les logs pour vérifier que ça mord vraiment."
tags: ["fail2ban", "ssh", "securite", "logs"]
---

Dès qu'un serveur a une IP publique et un port 22 ouvert, les tentatives de connexion automatisées commencent. `fail2ban` lit les logs, repère les échecs répétés et banni l'IP fautive au niveau du pare-feu.

## La jail SSH

La configuration locale va dans `jail.local` (jamais `jail.conf`, écrasé aux mises à jour) :

```ini
[sshd]
enabled  = true
maxretry = 4
findtime = 10m
bantime  = 1h
```

Quatre échecs en dix minutes → bannissement d'une heure. On augmente `bantime` progressivement pour les récidivistes avec `bantime.increment = true`.

## Vérifier que ça mord

```bash
$ fail2ban-client status sshd
```

La ligne `Currently banned` confirme que les règles tournent. Si elle reste à zéro alors que les logs débordent de tentatives, c'est souvent que le chemin du log ou le backend ne correspond pas à ta distrib.

> fail2ban ne remplace pas l'authentification par clé : il réduit le bruit, mais désactiver l'auth par mot de passe reste la vraie protection.
