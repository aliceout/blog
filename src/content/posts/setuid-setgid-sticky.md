---
title: setuid, setgid et sticky bit, enfin clairs
category: systeme
date: 2026-05-02
excerpt: "Ces trois bits de permission qui font toujours un peu peur. Une bonne fois pour toutes, avec des exemples concrets."
tags: ["permissions", "linux", "securite"]
---

On voit un `s` ou un `t` dans un `ls -l` et on passe vite à autre chose. Pourtant ces trois bits expliquent comment `passwd` peut modifier `/etc/shadow` ou pourquoi `/tmp` ne se transforme pas en champ de bataille.

## setuid — exécuter avec les droits du propriétaire

Quand le bit **setuid** est posé sur un exécutable, le programme tourne avec l'identité de son *propriétaire*, pas de celui qui le lance :

```bash
$ ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root 59976 /usr/bin/passwd
```

Le `s` à la place du `x` du propriétaire, c'est lui. C'est ce qui permet à un utilisateur normal de modifier son mot de passe — une opération qui touche un fichier appartenant à root.

## setgid — hériter du groupe

Sur un **répertoire**, setgid fait que les fichiers créés héritent du groupe du dossier, pas du groupe de l'utilisateur. Pratique pour un répertoire partagé entre plusieurs personnes du même projet.

```bash
$ chmod g+s /srv/projet
```

## sticky bit — chacun chez soi

Le **sticky bit** sur un dossier partagé empêche un utilisateur de supprimer les fichiers des autres. C'est ce qui protège `/tmp` :

```bash
$ ls -ld /tmp
drwxrwxrwt 10 root root 4096 /tmp
```

Le `t` final, c'est lui. Tout le monde écrit dans `/tmp`, mais personne n'efface le travail du voisin.
