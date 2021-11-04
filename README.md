# M1_MIAGE_VueJS

Alexandre De Santa Barbara
Quentin Bertramo

Ce projet a été réalisé dans le cadre de notre année de Master MIAGE.

Tous les composants graphiques proviennent de la bibliothèque graphique Vuetify.
https://vuetifyjs.com/en/

Le site est 100% responsive.

Le point d'entrée du site est la page d'accueil qui contient le titre du site.
On peut ensuite naviguer vers la page qui affiche tous les restaurants.
Dans cette page, on retrouve :
- un formulaire Vuetify qui permet d'ajouter dans la base de données NoSQL MongoDB un nouveau restaurant
- un tableau Vuetify qui permet :
  - d'afficher les restaurants et leur type de cuisine
  - de rechercher un restaurant spécifique en saisissant son nom
  - de choisir le nombre de restaurant à afficher par page du tableau (5, 10, 15, ALL)
  - de naviguer entre les pages du tableau
  - de supprimer un restaurant spécifique de la base de données
  - d'afficher le détail du restaurant en question
Dans la page détail du restaurant, on retrouve :
- les informations spécifiques au restaurant (nom, type de cuisine)
- une carte générée grâce à l'API leaflet qui permet de situer le restaurant (https://leafletjs.com/)
- une photo et une vidéo sur le thème des restaurants récupérées par l'API Pexels (https://www.pexels.com/fr-fr/)
- un acordéon Vuetify qui regroupe :
  - un menu
  - un menu gastronomique
  - les avis des clients (récupérés depuis la base de données
  - les menus sont générés grâce à un fichier JSON local
  - on peut ajouter les menu au panier
  - le panier est un snackbar de Vuetify qui récapitule les menus qui ont été ajouté et qui affiche le prix total de la commande.
