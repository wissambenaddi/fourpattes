# Sous-menus FourPattes — audit, correctif et configuration

## Correctif des panneaux invisibles

### Cause racine

Le header rendait le déclencheur et le panneau desktop uniquement lorsque le menu spécialisé de l’univers était déjà sélectionné et contenait au moins un lien.

Les réglages `dog_menu`, `cat_menu` et `discover_menu` étant absents de `sections/header-group.json`, Liquid rendait trois liens directs au lieu des éléments attendus par `pet-header.js` :

- aucun `data-pet-mega-item` ;
- aucun `data-pet-mega-trigger` ;
- aucun `aria-controls` ;
- aucun panneau `data-pet-mega-panel`.

Le CSS et le JavaScript ne pouvaient donc pas ouvrir les sous-menus, car leur markup n’existait pas dans la page.

### Comportement corrigé

Lorsque **Activer les méga-menus** est coché :

- les trois déclencheurs et leurs panneaux sont toujours rendus ;
- le menu spécialisé sélectionné dans l’éditeur reste prioritaire ;
- si ce menu est vide, le `Menu mobile complémentaire` sert de repli Shopify Navigation ;
- si tous les menus sont vides, le panneau conserve sa carte éditoriale et son lien global ;
- le drawer mobile conserve un accordéon accessible, même sans catégories ;
- le menu complémentaire n’est pas dupliqué dans le drawer lorsqu’il sert déjà de repli.

Le repli garantit le fonctionnement immédiat. Il doit être remplacé par trois menus spécialisés dès que les collections Chien, Chat et Découvrir sont disponibles.

## Audit commercial réalisé

- Période récente analysée : 90 jours.
- Période de contrôle analysée : 12 mois.
- Résultat Shopify Analytics : aucune vente exploitable par type de produit.
- Catalogue Shopify : aucun produit actif trouvé.
- Collections Shopify : uniquement la collection d’accueil, actuellement vide.
- Menus existants : menu principal générique, pied de page et compte client.

Il n’est donc pas possible de déterminer honnêtement les catégories chien ou chat les plus achetées. Le thème n’ajoute aucun badge « Meilleure vente » et n’invente aucun classement.

## Source des catégories

Chaque univers utilise en priorité le menu sélectionné dans l’éditeur de thème :

- **Menu Chien** pour Univers Chien ;
- **Menu Chat** pour Univers Chat ;
- **Menu Découvrir** pour Découvrir.

Les URLs et les catégories proviennent uniquement de Shopify Navigation. Elles ne sont pas codées en dur dans le thème.

Tant qu’un menu spécialisé n’est pas sélectionné, le menu complémentaire du header est utilisé comme repli. Dans la configuration actuelle de la boutique, ce repli correspond à `main-menu`.

## Structure recommandée d’un menu

Créer deux éléments de premier niveau dans Shopify Navigation :

1. `Catégories mises en avant`
   - Catégorie 1
   - Catégorie 2
   - Catégorie 3
2. `Autres essentiels`
   - Catégorie 4
   - Catégorie 5
   - Catégorie 6

Le panneau desktop affiche au maximum trois enfants de chaque groupe. Le drawer mobile affiche au maximum quatre catégories au total, puis le lien global vers l’univers.

Un menu plat reste compatible :

- les trois premiers liens deviennent la première colonne ;
- les trois liens suivants deviennent la seconde colonne.

## Utilisation future de données commerciales

Lorsque les ventes et le catalogue seront disponibles :

1. analyser les unités vendues et le chiffre d’affaires sur 90 jours ;
2. contrôler la cohérence sur 12 mois ;
3. séparer les produits chien et chat ;
4. exclure les commandes annulées et tenir compte des remboursements ;
5. placer les trois catégories validées en premier dans chaque menu ;
6. renommer le premier groupe en `Les plus achetés` seulement après validation.

## Carte éditoriale

La carte de droite utilise les réglages indépendants de chaque univers :

- image ;
- titre ;
- texte ;
- libellé du CTA ;
- lien du CTA.

En l’absence de données de vente, conserver une formulation éditoriale telle que `Nos favoris` ou `Nos coups de cœur`, et éviter `Les plus commandés`.

## Comportement responsive et accessible

- Desktop : ouverture au survol, au focus et au clic via le système existant.
- Clavier : `aria-expanded`, `aria-haspopup`, navigation par Tab, fermeture avec Échap et retour du focus.
- Clic extérieur : fermeture via le script existant.
- Mobile et tablette : accordéons natifs `<details>` avec zones tactiles d’au moins 44 px.
- Sticky : le panneau reste au-dessus du contenu et conserve le correctif pleine largeur du header.
- Réduction des mouvements : l’animation d’entrée du panneau est désactivée lorsque l’utilisateur le demande.
