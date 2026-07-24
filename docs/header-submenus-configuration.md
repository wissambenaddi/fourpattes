# Sous-menus compacts FourPattes — configuration

## Architecture finale

Les anciens méga-menus horizontaux ont été remplacés par trois cartes verticales indépendantes :

- Univers Chien ;
- Univers Chat ;
- Découvrir.

Chaque panneau desktop utilise une seule colonne, affiche au maximum sept liens Shopify et mesure 350 px par défaut. Le réglage accepte une largeur comprise entre 300 et 380 px.

Le drawer tablette et mobile affiche au maximum six liens, puis un lien global vers l’univers.

## Aucun repli vers le menu principal

Le thème ne réutilise plus automatiquement `main-menu` pour alimenter Chien, Chat ou Découvrir.

Cela évite l’apparition de liens génériques comme :

- Accueil ;
- Catalogue ;
- Contact ;
- Mon Magasin.

Si aucun menu spécialisé n’est sélectionné :

- le storefront conserve un lien direct vers l’univers ;
- aucun panneau vide n’est rendu ;
- le Theme Editor affiche une aide de configuration uniquement pendant la personnalisation.

## Menus Shopify à créer

Dans **Boutique en ligne → Navigation**, créer trois menus plats distincts.

### Menu Univers Chien

Exemple de structure, à adapter aux collections réelles :

1. Tous les accessoires ;
2. Harnais ;
3. Laisses ;
4. Colliers ;
5. Jouets ;
6. Gamelles ;
7. Couchages.

### Menu Univers Chat

Exemple de structure indépendante :

1. Tous les accessoires ;
2. Jouets ;
3. Plumeaux et souris ;
4. Couchages ;
5. Griffoirs ;
6. Gamelles ;
7. Fontaines.

### Menu Découvrir

Utiliser uniquement des destinations éditoriales réellement disponibles :

1. Nouveautés ;
2. Idées cadeaux ;
3. Notre mission ;
4. La communauté ;
5. Conseils et guides.

Ne pas ajouter « Meilleures ventes » tant qu’une véritable collection correspondante n’existe pas.

## Sélection dans le Theme Editor

Dans les paramètres de l’en-tête, sélectionner :

- **Menu du sous-menu Chien** ;
- **Menu du sous-menu Chat** ;
- **Menu du sous-menu Découvrir**.

Le premier lien de chaque menu reçoit une mise en avant légère. Aucun lien n’est créé automatiquement par le thème.

## Petite carte éditoriale

Chaque univers possède des réglages indépendants :

- activation de la carte ;
- affichage facultatif dans le drawer ;
- image ;
- texte alternatif ;
- titre ;
- texte court ;
- libellé du CTA ;
- lien ;
- couleur de fond.

Si la carte est désactivée, le panneau conserve un CTA texte compact en bas.

## Badges facultatifs

Ajouter un bloc **Badge de sous-menu** dans la section d’en-tête, puis renseigner :

- l’univers ;
- le libellé exact du lien Shopify ;
- le texte du badge ;
- le style turquoise, jaune ou rose.

Le rendu limite l’affichage à deux badges par panneau. La section accepte six blocs au total.

Les badges doivent correspondre à une information réelle. Le thème ne génère aucun badge « Populaire », « Promotion » ou « Meilleure vente » automatiquement.

## Responsive et accessibilité

- Desktop à partir de 1120 px : ouverture au survol avec souris, au focus et au clic.
- Appareil tactile large : ouverture au clic, sans dépendance au hover.
- Tablette et mobile sous 1120 px : accordéons natifs dans le drawer.
- Fermeture desktop : sortie différée de 200 ms, clic extérieur, Échap ou ouverture d’un autre panneau.
- Les panneaux fermés utilisent l’attribut `hidden` et ne sont pas parcourables au clavier.
- Les zones tactiles mesurent au moins 44 px.
- `prefers-reduced-motion` désactive l’animation d’entrée.

## Éléments préservés

La transformation ne modifie pas :

- la barre d’annonce ;
- le Hero ;
- le logo ;
- le sticky pleine largeur ;
- le compte ;
- le sac et son badge ;
- la suppression de la recherche ;
- les templates produit, collection, panier, compte ou 404.
