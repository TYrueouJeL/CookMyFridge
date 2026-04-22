# CookMyFridge

Une application web pour trouver des recettes basées sur les ingrédients disponibles dans votre réfrigérateur.

## Architecture

Ce projet utilise une architecture full-stack moderne :

- **Backend API** : AdonisJS (Node.js/TypeScript)
- **Frontend Web** : Nuxt.js (Vue.js 3)
- **Base de données** : MySQL
- **Styling** : TailwindCSS

## Structure du projet

```
CookMyFridge/
|- api/                 # Backend AdonisJS
|  |- app/
|  |  |- controllers/   # Contrôleurs API
|  |  |- models/        # Modèles de données
|  |  |- middleware/    # Middleware
|  |  `- services/      # Services métier
|  |- config/           # Configuration
|  |- database/         # Migrations et seeders
|  `- bin/              # Scripts d'exécution
|
`- web/                 # Frontend Nuxt.js
   |- app/
   |  |- components/    # Composants Vue
   |  |- pages/         # Pages
   |  `- assets/        # Assets statiques
   |- public/           # Fichiers publics
   `- nuxt.config.ts    # Configuration Nuxt
```

## Prérequis

- Node.js (v18 ou supérieur)
- MySQL (v8 ou supérieur)
- npm, yarn, pnpm ou bun

## Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd CookMyFridge
```

### 2. Installation des dépendances

Installer les dépendances pour les deux parties du projet :

```bash
# Backend API
cd api
npm install

# Frontend Web
cd ../web
npm install
```

### 3. Configuration de la base de données

1. Créer une base de données MySQL
2. Copier le fichier d'environnement exemple :

```bash
cd api
cp .env.example .env
```

3. Configurer les variables d'environnement dans `.env` :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_DATABASE=cookmyfridge
```

### 4. Migrations de la base de données

```bash
cd api
npm run migration:run
```

## Démarrage

### Démarrage en développement

Lancer les deux serveurs en parallèle :

```bash
# Terminal 1 - Backend API
cd api
npm run dev

# Terminal 2 - Frontend Web
cd web
npm run dev
```

L'application sera accessible sur :
- Frontend : `http://localhost:3000`
- API : `http://localhost:3333`

### Démarrage en production

```bash
# Backend
cd api
npm run build
npm start

# Frontend
cd web
npm run build
npm run preview
```

## Fonctionnalités

- **Gestion des ingrédients** : Ajouter, modifier et supprimer des ingrédients
- **Recherche de recettes** : Trouver des recettes basées sur les ingrédients disponibles
- **Profils utilisateurs** : Gestion des comptes et préférences
- **Favoris** : Sauvegarder les recettes préférées

## Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajouter une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## Licence

Ce projet est sous licence non publiée (UNLICENSED).

## Support

Pour toute question ou problème, veuillez créer une issue sur le repository GitHub.
