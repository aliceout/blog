---
title: Un reverse proxy Nginx propre en 10 lignes
category: reseau
date: 2026-04-21
excerpt: "Le strict nécessaire pour exposer un service local derrière un nom de domaine, sans config à rallonge."
tags: ["nginx", "reverse-proxy", "tls"]
---

On a un service qui tourne sur `localhost:3000` et on veut le servir derrière `app.exemple.fr` en HTTPS. Pas besoin d'un fichier de 200 lignes : voici l'essentiel.

## Le bloc minimal

```nginx
server {
    listen 80;
    server_name app.exemple.fr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Les trois `proxy_set_header` ne sont pas optionnels : sans eux, l'application derrière ne sait pas quel host a été demandé ni si la requête était en HTTPS — ce qui casse les redirections et les cookies.

## Le TLS, en une commande

Inutile d'écrire la config TLS à la main : `certbot` la génère et la maintient.

```bash
$ certbot --nginx -d app.exemple.fr
```

Il détecte le bloc `server`, ajoute le certificat, configure la redirection 80 → 443 et programme le renouvellement. C'est tout.

> Pense à vérifier que le port 80 est bien joignable depuis l'extérieur avant de lancer certbot : la validation HTTP-01 en a besoin.
