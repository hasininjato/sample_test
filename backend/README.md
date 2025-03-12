# A propos

Il s'agit de la partie backend de de test technique de L3M Holding.


# Configuration

Renommer .env.example en .env (même valeur que pour .env de Docker, en plus de JWT_SECRET généré avec la commande `openssl rand -base64 64` depuis le container)

Pour exécuter le container, on exécute la commande `./commands/docker-exec.sh`, puis `cd backend`. On install ensuite les dépendances `npm install`