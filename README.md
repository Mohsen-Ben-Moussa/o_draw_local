# O'Draw

**O'Draw** est un pixel art canvas pour libérer ta créativité ! L'équivalent du [r/place Reddit](https://www.reddit.com/r/place/comments/txufad/the_complete_rplace_timelapse/) pour les initiés !

L'app est divisée en 2 parties, sur 2 dépôts distincts dans l'organisation GitHub de ta promotion : 
- [`odraw-backend`](https://github.com/O-clock-Alternance-CDA/cloud.odraw-backend) ( :warning: _lien à mettre à jour sur l'orga étudiante_  )
  - contient le code Typescript `Node.js` de la partie serveur de l'application. 
  - le serveur est connecté à une base de données `MongoDB`. 
- [`odraw-frontend`](https://github.com/O-clock-Alternance-CDA/cloud.odraw-frontend) ( :warning: _lien à mettre à jour sur l'orga étudiante_ )
  -  contient le code client écrit en Typescript à l'aide du framework `VueJS`. 
  -  ce code communique avec le serveur par connexions HTTP et Websocket.


**L'objectif de cet atelier est de se familiariser avec _des_ solutions PaaS et DBaaS et de mettre en production cette incroyable application.**

<img width="800" alt="Capture d’écran 2022-06-02 à 16 39 44" src="https://user-images.githubusercontent.com/98805541/172210908-9986c40d-0379-4c28-a564-c6f6340047f6.png">

Noter qu'il serait possible d'héberger le tout sur le même environnement. Mais bon, c'est moins fun ! 


## Énoncé débrouillard

#### 🚀 Lancer l'application en local / sur sa `VM Cloud`, pour la tester :

- Dupliquer (`Use this template`) les 2 dépôts dans l'organisation de votre promotion, à votre nom, en privé.
  - alternativement, accepter les 2 challenges Kourou préparés par les profs.
  - note : il n'est pas nécessaire de dupliquer/cloner ce dépôt d'énoncé. Il peut être consulté en lecture seule.
- Cloner les 2 dépots dupliqués en local. 
- Installer les dépendances des deux dépôts.
- Installer et lancer le SGBD MongoDB en local, si ce n'est pas déjà fait.
- Ajuster les variables d'environnement locales (back & front) et comprendre leur intérêt.
- Lancer l'application (back & front). 
- Comprendre globalement le fonctionnement de cette application.

Noter que ce déploiement de l'application en local s'apparente à une mise en production sur une plateforme de type `IaaS` (ie. votre `VM Cloud`)


#### 🌍 Déployer l'application sur le "word wide web" :
- Déployer le code `serveur` sur `Railway`.
- Connecter ce backend à un cluster `MongoAtlas` pour la partie base de données.
- Déployer le code `client` sur `Surge`, à connecter au backend. 


## Questions de compréhension

Ces questions testent votre compréhension de l'application et du déploiement, et peuvent potentiellement vous débloquer sur l'énoncé débrouillard. L'énoncé guidé (plus bas) donne des éléments de réponse si besoin. 

<details><summary>
Voir les questions
</summary>

- Partie Backend
  - 1] Définir `Node.js` avec vos propres mots. 
  - 2] Comment installer les dépendances d'un projet Node ? Où sont listées ces dépendances ? 
  - 3] Où trouver le fichier qui déclare les variables d'environnement. Pourquoi n'est-t-il pas versionné ? Quel module Node permet de charger ces variables au lancement de l'application ? 
  - 4] Quelle commande permet de compiler les fichiers Typescript ? Quel fichier précise les règles de compilations ? Vers quelle version ECMAScript de JavaScript notre code est-il compilé ? Dans quel dossier le code sera-t-il compilé en production ?
  - 5] Quels sont les scripts `npm` lancés automatiquement par `Railway` lors du déploiement d'une application Node. Dans quel ordre ? 
  - 6] Quelles propriétés du `package.json` permettraient de préciser à `Railway` la version de `Node` et de `npm` à utiliser pour déployer l'application ? Note : ces champs ne sont pas dans le `package.json` pour le moment, mais on pourrait les rajouter. 
  - 7] Où définir les variables d'environnement de notre application sur `Railway`.
  - 8] L'IP de notre application est-elle fixe sur `Railway` avec l'offre gratuite ? Qu'est-ce que cela implique pour la connexion à la base de données en terme de sécurité ?
  - 9] Quelles sont les caractéristiques de notre offre `Railway` "gratuite" (capacité, uptime, ...)

- Partie BDD
  - 10] Définir avec vos propres mots : `MongoAtlas`, `MongoDB`, un `Cluster MongoAtlas`, une `base de données`, le `driver Node 'mongodb'`.
  - 11] Quelles sont les caractéristiques de notre offre Cluster MongoAtlas gratuite (capacité, réplications...)
  - 12] Est-il necessaire de définir le schéma et créer les tables manuellement dans `MongoDB` ?

- Partie Frontend
  - 13] Définir `VueJS` avec vos propre mots.
  - 14] Quelles sont les 3 "parties" (blocs) d'un composant `Vue` ? 
  - 15] Où sont à définir les variables d'environnement en local / en production, côté Client? Par quelle chaine de caractère doivent elles être préfixé ?
  - 16] Qu'est ce qu'une connexion websocket. Citer une particularité par rapport à une communication HTTP.
  - 17] Expliquer avec vos propres mots ce qu'est la politique du `SOP` (`Same-origin Policy`). A-t-elle un impact sur notre déploiement ? Si oui, expliquer comment gérer cette particularité. 
  - 18] Rechercher dans les devtools de votre navigateur l'onglet où l'on peut observer les échanges websocket entre le client et le serveur.
  - 19] Expliquer ce qu'est un CDN.

</details>


## Énoncé guidé

<details><summary>
Partie 1 - Tester en local
</summary>

# Partie 1 - Tester en local

:warning: Disclamer : un inconvénient des tutoriels détaillés, est qu'il arrive que certaines informations ne soit plus à jour. Ainsi, il est recommandé de **fouiller** au maximum lorsque l'on bute sur un point !

## Backend - Pré-requis : vérifier nos outils 

Pour lancer ce projet, nous auront besoin de plusieurs packages/services.

### Node.js et NPM 

Vérifier si les exécutables `node` et `npm` ne sont pas déjà installés (via `node -v` et `npm -v`). En cas d'erreur, **installer Node.js** en suivant la documentation officielle (selon votre système d'exploitation et/ou votre gestionnaire de packet). Alternativement, installer et utiliser un gestionnaire de version de node (par exemple `NVM`). Noter que NPM s'installe généralement automatiquement avec Node.js. 

### MongoDB 

- Vérifier si le SGBD `MongoDB` n'est pas déjà installé/lancé. Pour cela : 
  - (Linux) `sudo systemctl status mongod` indique si le SGBD MongoDB tourne bien en local. 
  - (Mac) `ps -ef | grep mongod` indique si un processus MongoDB tourne bien en local.
  - (Window) `C:\Program Files\MongoDB` est le dossier où MongoDB est installé. 

- Sinon, il faut **installer ET le lancer** MongoDB (**MongoDB Community Edition**) en suivant la [documentation officielle](https://www.mongodb.com/docs/manual/administration/install-community/).
  - (Tips Linux) :
    - 👀 Lire la doc d'installation **attentivement** 👀
    - `lsb_release -a` pour connaitre sa version Ubuntu.
    - Pour tester le succès de l'installation.
      - `sudo systemctl status mongod` (le service doit être `active (running)`)
         - sinon, il faut potentiellement lancer le service manuellement `sudo systemctl start mongod`
         - et en cas d'erreur (status `fail` lorsqu'on re-demande le status),  [cette issue stackoverflow peut aider](https://stackoverflow.com/a/61318017).
      - lancer un client CLI qui se connecte à notre MongoDB via la commande `mongo` (ou `mongosh`). Le prompt terminal doit changer (passer de `$` à `>`), c'est good !. 
        - si ce client n'est pas installé, on peut l'installer via `sudo apt install mongodb-clients`.


- Voila, c'est tout ce qu'il faut faire pour la partie base de donnée ! Pas besoin de créer la database, ni les tables (que l'on appelle `collections`). MongoDB les créera automatiquement lorsque le backend essaiera d'y accéder ou d'y ajouter des enregistrements (qu'on appelle `documents`) la première fois. Trop fort Mongo !


## Backend - Installer les dépendances

- C'est un projet `Node.js`. `Node.js` (qu'on appelle généralement par son petit surnom `Node` quand il n'y a pas d'ambiguité) est un runtime pour JavaScript, c'est à dire un interpréteur capable d'exécuter du code `JavaScript` sur la machine où il est installé. Un projet Node contient généralement un fichier `package.json`, qui liste l'ensemble des dépendances (modules tiers) du projet. On peut installer ces dépendances via le gestionnaire de packet de Node : `NPM`. Cela génère un dossier `node_modules` contenant les packages installés.

> cd odraw-backend
> npm install

## Backend - Lancer le projet

- Le fichier `package.json` contient aussi des `scripts` npm qui nous indique comment lancer le projet. En fouillant, on trouve ici, entre autre :
- `build` : pour compiler le projet (de Typescript vers JavaScript, on va en reparler)
- `start` : pour lancer le projet (en mode "production")
- `dev` : pour lancer le projet (en mode "developpement") avec un _watch mode_. 

> npm run dev 

Cette commande lance un serveur web HTTP qui écoute sur le `PORT` définie dans le fichier `.env`. Par défaut (ie. si ce fichier d'environnement n'existe pas ou n'est pas chargé), on fallback généralement sur un port par défaut au niveau application (ici le port 3000, voir le code). Si la commande ne foncitonne pas, c'est qu'il faut gérer les variables d'environnement !

## Backend - Gerer les variables d'environnement

Le fichier `.env` n'est, ici, pas versionné par Git/GitHub. C'est une bonne pratique car il contient généralement des mots de passe et autres credentials. Généralement, on inclut un `.env.example` pour préciser aux devs débarquant sur le projet la structure de celui-ci. Ici, vous pouvez simplement copier le contenu du `.env.example` dans un fichier `.env`.

> cp .env.example .env

**Relancer ensuite le serveur Node** et laisser le tourner sur un terminal dédié.

## Client - Installer le projet 

C'est un projet `VueJS`. Il y a un `package.json` : les dépendances sont gérées par Node et NPM.

> cd odraw-frontend
> npm install 

## Client - Lancer le projet 

- En local, la commande `npm run serve` du `package.json` permet de lancer un serveur pour notre front.

> npm run serve

- Notre code client tourne alors sur le port 8080. Mais il ne communique pas encore avec notre backend car il faut lui préciser l'adresse du backend (qui lui tourne sur le port 3000). 
- A noter, en production, on utilisera plutôt la commande `npm run build` qui va compiler notre code en des fichiers statiques comprehensibles par le navigateurs (HTML, CSS, JS, des images...). 

## Client - Générer les variables d'environnement

Lors du `serve` (ou `build`) de notre application, `Vue` (via le bundler `webpack` ici) va charger les variables d'environnement définies dans le fichier `.env` (ou `.env.local` en mode developpement). Si on regarde le `.env.example`, on remarque que notre projet a besoin de 2 variables pour se connecter au backend : une pour l'adresse de la connexion HTTP et l'autre pour la connexion Websocket. C'est l'heure de les copier :

> cp .env.example .env.local

- A noter, les variables doivent être préfixées par `VUE_APP_` pour être inclus dans le build, conformement à la [documentation officielle](https://cli.vuejs.org/guide/mode-and-env.html#modes)

**Relancer ensuite le serveur** et tester l'application et ses fonctionnalités !

## Base de données

- `MongoDB` est flexible ! Du moment qu'il tourne, il est capable de créer les BDD et les collections à la volée (contrairement à PostgreSQL où il faudrait les définir manuellement). Il n'y a donc rien à faire, à part vérifier qu'il tourne (cf. partie pré-requis). 

</details>

<details><summary>
Partie 2 - Déployer l'application
</summary>


# Partie 2 - Déployer l'application 

:warning: Disclamer : un inconvénient des tutoriels détaillés, est qu'il arrive que certaines informations ne soit plus à jour. Ainsi, il est recommandé de **fouiller** au maximum lorsque l'on bute sur un point !

<details><summary>
Le backend sur Railway
</summary>

## Le backend sur Railway

[Railway](https://railway.app/) propose des offres `Platform as a Service` pour héberger facilement des serveurs (Node, Apache...). On heberge notre code dans un conteneur applicatif (`projet`) qui s'occupe d'installer les dépendances et lancer l'application "à notre place" (sous reserve d'avoir correctement configurer son code). 
Avec l'[offre gratuite](https://docs.railway.app/reference/plans), nous bénéficions d'un crédit-temps limité, renouvelable chaque mois, durant lequel nos applications tournent en permanence. 

- Se créer un compte sur `Railways`.

- Créer un nouveau `Projet` (à nommer plus tard) à partir d'un dépôt Github : 
  - `Deploy from GitHub repo`
  - Chercher le dépôt backend à déployer
    - Note : si vous ne trouvez pas le dépôt à deployer, il faudra potentiellement `Configure GitHub App` en choisissant l'organisation de votre promotion. Une fois installé, il faudra surement un peu patienter le temps que Railway trouve les (nombreux) dépôts du GitHub de promotion. 
  - Puis `Deploy now`. Nous règlerons les variables d'environnement dans un second temps. 
  - Retourner au niveau du Projet (cf. la navbar de Railway) pour lui donner un nom dans les `Settings` : `odraw-backend-MonPseudoGitHub`
  - Retourner ensuite dans les `Settings` du conteneur pour **générer un nom de domaine** (`Expose this service to the public internet.`). Un peu de patience et hop, **le backend est en ligne** !


- Félicitations ! Le backend est alors déployé et accessible sur l'adresse indiquée.
  - En pratique, Railway a : 
    - créer un conteneur 
    - installé les dépendances
    - lancer le script de démarrage du serveur
    - le tout automatiquement !
  - Cependant, en vérifiant les logs du déploiement (à vous de les trouver), on remarque que notre backend n'est pas connecté à la BDD Mongo...
    - c'est normal puisque nous ne l'avons pas encore créer. 
    - nous allons donc provisionner une base de données sur le service `MongoAtlas`.
    - à noter : nous pourrions simplement provisionner une BDD depuis Railway dans le même projet (c'est fort !). Mais pour varier les plaisirs, nous allons tester d'autres offres-as-a-service ! 

</details>

<details><summary>
La BDD sur MongoAtlas
</summary>

## La BDD sur MongoAtlas

MongoAtlas est une platform `DBaaS` (une variante des PaaS version base de données). MongoAtlas propose des `Cluster` MongoDB dans le Cloud. Cela permet d'avoir une BDD répliquée et élastique (ex : données situées sur plusieurs serveurs physiques au cas où l'un lâche ; création automatique de nouvelles instances BDD si la charge est trop lourde...). Bref des trucs de prod quoi ! Nous allons donc créer un `Cluster`. Un cluster contient une ou plusieurs base de données (la notre sera créée automatiquement par notre application : trop fort Mongo qui créé aussi les DB à la volée !). 

#### Créer un cluster 

- Créer un compte [MongoAtlas](https://www.mongodb.com/atlas/database). 
- Choisir un `Shared` cluster (gratuit) :
  - Choisir le provider de votre choix (AWS / Google Cloud / Azure) et la région de votre choix (et oui, même MongoAtlas utilisent des IaaS !)
    - Pour info, vous trouverez les informations sur votre cluster gratuit (max connexions, network performance, max databases, max collections, data capacity...) lors de la création de celui-ci.
  - Créer un utilisateur (`username` et `password`) pour se connecter à son cluster. Noter le mot de passe.
  - Ajouter l'IP de son local pour pouvoir se connecter à son cluster depuis son local, afin de tester :
    - Une requête HTTP vers `ifconfig.me` fait généralement l'affaire pour trouver son IP local : `curl ifconfig.me`

#### Tester la connexion au cluster en local

- Bien joué, le cluster est créé ! Ca serait pas l'heure de tester si on peut se connecter à notre Cluster depuis depuis son local ? 
  - Le bouton `Connect` > `Connect with the MongoDBShell` donne la commande `mongosh` pour se connecter à son cluster depuis le client cli `mongosh` A toi de jouer !
  - A noter, si ça ne marche pas du premier coup, vérifier que vous avez bien whitelister l'IP de votre local, et retenter une seconde fois.

#### Connecter le backend à la BDD

- Bon, on connecte le backend à notre cluster ? Deux choses à faire :
  - Whitelister l'adresse de notre app Railway, pour que MongoAtlas autorise la connexion. Pas de bol, l'IP du backend Railway n'est pas fixe avec l'offre gratuite 😭. On va contourner le problème :
    - Dans `MongoAtlas` > `Network Access` > `+ ADD IP ADDRESS`, ajouter l'adresse `0.0.0.0/0` (c'est à dire "j'autorise tout le monde", a.k.a. "Open Bar"). Eventuellement, choisir une date de suppression automatique pour cette autorisation bien trop permissive (`1 day` par exemple, le temps de tester).
  - Côté Railway, dans les `Settings` de notre app, il faut modifier les variables d'environnement (`Config Vars`) pour pointer vers notre BDD MongoAtlas.
    - `DATABASE_URL`: adresse du Cluster, on la trouve dans `MongoAtlas ` > `Connect` > `Connect your application`, et ça ressemble à `mongodb+srv://<username>:<password>@cluster0.lnez3.mongodb.net/?retryWrites=true&w=majority` (où l'on remplace le username et password par l'utilisateur créé précedemment)
    - `DATABASE_NAME`: `odraw` par exemple. 
    - Normalement, Railway relance alors automatiquement le serveur backend. Mais si ce n'est pas fait, demander manuellement un redéploiement de l'app.
- Cette fois-ci, en accèdant à la route `/api/history`, plus de log d'erreurs ! La BDD est connectée !

</details>

<details><summary>
Le client sur Surge
</summary>

## Le client sur Surge

[Surge](https://surge.sh/) est un hebergeur qui propose une offre d'hébergement de site web statiques. Nos contenus sont alors servis par leur CDN (Content Delivery Network), ie. par plusieurs machines (serveurs) généralement répartis dans des lieux distincts.

- Installer le CLI [Surge] : `npm install --global surge`
- Se placer dans le dépôt frontend en local puis lancer `npm run build` pour build les ressources statiques :
  - cela génère un dossier `dist`
- Héberger le code du dossier `dist` en ligne avec Surge 
  - `surge ./dist --domain odraw-monPseudoGithub.surge.sh` (en remplaçant ton pseudo puis en suivant les instructions)

C'est bien, mais alors notre client ne pointe pas vers notre backend !

- Créer un fichier d'environnement pour le déploiement en production :
  - nommé `.env.production.local` (il sera ainsi non versionné par git)
  - préciser les variables d'environnement pour pointer vers le backend ! 
    - `VUE_APP_BACKEND_HTTP_URL` : `https://adresse_railway_de_mon_backend`
    - `VUE_APP_BACKEND_WS_URL` : `wss://adresse_railway_de_mon_backend`
      - attention, `https` et `wss` (sinon nous auront des erreurs : `Mixed Content: The page at '<client>'' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint '<backend>'. This request has been blocked; the content must be served over HTTPS.)`
      - attention, pas de `/` final (sinon nous auront des erreurs) 

- On recrée le bundle à nouveau : 
  - `npm run build`. Webpack choisira naturellement l'environnement de production, comme précisé dans la [documentation](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables). 
  - `cd dist` puis `surge ./dist --domain odraw-monPseudoGithub.surge.sh` à nouveau

- On constate alors un problème lié à la protection contre les requêtes `cross-origin` : 
  - `Access to XMLHttpRequest at 'BACKEND_ADRESS' from origin 'FRONTEND_ADRESS' has been blocked by CORS policy.`
  - c'est normal, il faut que le backend autorise les requêtes venant du client. 

- On retourne sur Railway pour lui indiquer l'adresse du client , et ainsi lever la restriction SOP (Same origin policy) via les CORS (Cross-origin resource sharing) :
  - ajouter une variable d'environnement `ALLOWED_ORIGIN` avec comme valeur l'addresse du client. Attention au `/` final à retirer.

</details>

</details>

## Résultat & bonus

<details><summary>
Résultat & bonus 
</summary>

:tada: :tada: **C'EST FAIT, NOTRE APPLICATION COMPLETE EST EN PRODUCTION** :tada: :tada:

Ca été une sacrée épopée 😪 ! On aurait pu faire plus simple. Par exemple, un seul serveur sur une seule offre PaaS pourrait suffire... mais ça valait le coup, non ?

### Bonus : vers du CI/CD

Le déploiement du backend est facilité par `Railway`. Un simple push sur la branche `master` redéploiement automatiquement l'application.

En revanche, pour le client, les commandes sont moins pratiques... Ca serait idéal qu'un outil le fasse à notre place à chaque push sur `master` !


<details><summary>
Déployer sur Surge via GitHub Action
</summary>

### Kesako ?

[Github Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) est un outil disponible sur la platforme GitHub permettant de créer des processus (`pipelines`) d'intégration continue (et aussi de déploiement continu).

Cela consiste à créer des fichiers de configuration appellé `workflows` qui définissent des actions à effectuer automatiquement, dans un environnement dédié généré par GitHub (une sorte de conteneur appellé `runner`).


### Token Surge

En local, la commande `surge token` génère un token d'accès pour permettre un déploiement depuis GitHub, plutôt que de s'authentifier en local comme nous l'avons fait.

### Créer un workflow Github Action

Dans le projet `frontend`, créer un fichier dans le dossier `.github/workflows` nommé `cd.yml`, avec le contenu suivant : 

```yml
name: Deploy to surge

on:
  push:
    branches:
      - master # Lorsqu'un push advient sur master, on lance le workflow

jobs:
  build-deploy: 
    runs-on: ubuntu-latest
    environment: production
    steps:
  
    # Récupère le code du dépôt Github dans l'environnement du runner
    - name: Checkout
      uses: actions/checkout@v3

    # Installe Node.js version 18
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'

    # Build the backend
    - name: Build
      run: |
        npm ci
        npm run build
      env:
        VUE_APP_BACKEND_HTTP_URL: ${{ vars.VUE_APP_BACKEND_HTTP_URL }}
        VUE_APP_BACKEND_WS_URL: ${{ vars.VUE_APP_BACKEND_WS_URL }}

    # Deploy to surge
    - name: Deploy
      run: | 
        npm install --global surge
        surge  ./dist --domain ${{ vars.SURGE_DEPLOY_URL }} --token ${{ secrets.SURGE_TOKEN }}

```

Avant de commit et push, on va rajouter les **variables d'environnement** sur Github : 

`Dépôt du front sur Github` > `Settings` > `Secret and Variables` > `Actions`.

Renseigner les 3 variables (`VUE_APP_BACKEND_HTTP_URL` / `VUE_APP_BACKEND_WS_URL` / `SURGE_DEPLOY_URL`) ansi que la variable secrète `SURGE_TOKEN` dans l'environnement de **production**.

Puis commit et push ! 

</details>

</details>
