# Dashboard Indicateurs de la Transition Écologique

Ce dashboard permet de visualiser les indicateurs de la transition écologique en France, en utilisant l'API du Hub d'Indicateurs Territoriaux.

## Technologies

- React + TypeScript
- Vite
- Material-UI
- Firebase Hosting

## Prérequis

- Node.js (v18 ou supérieur)
- Yarn
- Firebase CLI (`yarn global add firebase-tools`)

## Installation

1. Cloner le repository
```bash
git clone https://github.com/your-username/dashboard-indicateurs.git
cd dashboard-indicateurs
```

2. Installer les dépendances
```bash
yarn install
```

## Développement

Pour lancer l'application en mode développement :
```bash
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173)

## Tests et Linting

Pour lancer le linter :
```bash
yarn lint
```

## Build

Pour créer une version de production :
```bash
yarn build
```

## Déploiement

1. Se connecter à Firebase :
```bash
yarn firebase:login
```

2. Initialiser Firebase (première fois uniquement) :
```bash
yarn firebase:init
```
Suivre les instructions :
- Sélectionner "Hosting"
- Choisir "dist" comme dossier public
- Configurer comme une Single Page App
- Ne pas écraser index.html

3. Déployer l'application :
```bash
yarn deploy
```

## Structure du Projet

```
dashboard-indicateurs/
├── src/
│   ├── components/     # Composants React
│   ├── services/      # Services API
│   ├── config/        # Configuration
│   └── types/         # Types TypeScript
├── public/            # Assets statiques
└── dist/             # Build de production
```

## API

L'application utilise l'API du Hub d'Indicateurs Territoriaux de Transition Ecologique :
- Documentation : [https://www.data.gouv.fr/fr/dataservices/hub-dindicateurs-territoriaux-de-transition-ecologique/](https://www.data.gouv.fr/fr/dataservices/hub-dindicateurs-territoriaux-de-transition-ecologique/)
- Endpoint : `https://api.indicateurs.ecologie.gouv.fr`

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit les changements (`git commit -am 'Ajout de ma feature'`)
4. Push la branche (`git push origin feature/ma-feature`)
5. Créer une Pull Request

## License

[MIT](LICENSE)
