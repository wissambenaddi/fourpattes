# Refonte premium du header FourPattes

## Audit UX/UI du header précédent

Le header précédent était propre, compact et fonctionnel, mais sa navigation principale (`Accueil`, `Catalogue`, `Contact`) restait générique. Elle obligeait le visiteur à passer par un niveau supplémentaire avant de distinguer les produits pour chiens et pour chats. Les actions de recherche, compte et panier reposaient sur des pictogrammes standard et la hiérarchie de marque était limitée.

## Principes repris de la référence UX

La refonte reprend uniquement les qualités structurelles de la référence : lecture immédiate des univers, navigation centrale, actions regroupées, respiration et méga-menus faciles à scanner. Les couleurs, formes, icônes, micro-interactions et le sac shopping restent originaux et propres à FourPattes.

## Architecture finale

### Desktop

- Logo FourPattes à gauche.
- Navigation centrale : Univers Chien, Univers Chat, Découvrir, Notre histoire.
- Méga-menus configurables pour Chien, Chat et Découvrir.
- Recherche, compte et sac FourPattes à droite.
- Header sticky avec réduction légère après 48 px de défilement.

### Tablette

- Logo centré.
- Menu hamburger, recherche, compte et sac conservés.
- Bascule complète vers le drawer avant toute collision.

### Mobile

- Menu, logo, recherche et sac visibles.
- Compte déplacé dans le drawer.
- Univers Chien, Univers Chat et Découvrir en accordéons natifs accessibles.
- Liens complémentaires Shopify affichés dans un bloc secondaire.

## Sac FourPattes

Le panier générique est remplacé par un SVG original en contour : sac arrondi, deux poignées et empreinte centrale. Le SVG utilise `currentColor`, ne contient aucune couleur codée en dur et reste lisible à 20, 24 et 28 px.

États :

- panier vide : badge masqué par défaut ;
- panier rempli : badge jaune visible ;
- mise à jour : mouvement vertical de 4 px pendant 360 ms ;
- hover : translation de 2 px ;
- clavier : focus jaune de 3 px ;
- lecteur d’écran : libellé dynamique « Panier, X articles ».

## Données Shopify

Les réglages du Theme Editor permettent de sélectionner :

- menu mobile complémentaire ;
- menu Chien ;
- menu Chat ;
- menu Découvrir ;
- images éditoriales ;
- textes et CTA ;
- lien Notre histoire ;
- lien Contact mobile ;
- couleurs ;
- hauteur, logo, sticky, icônes, recherche, compte, sac et badge vide.

Aucune URL produit ou collection n’est codée en dur. Les liens de repli utilisent les routes Shopify ou les URL choisies dans l’éditeur.

## Accessibilité

- zones tactiles de 44 px minimum ;
- `aria-expanded` et `aria-controls` sur les méga-menus ;
- fermeture avec Échap ;
- ouverture clavier avec Flèche bas ;
- focus visible ;
- icônes décoratives masquées ;
- navigation mobile conservant le focus trap du thème ;
- `aria-current` sur les liens Shopify actifs ;
- prise en charge de `prefers-reduced-motion`.

## Performance

- SVG inline légers ;
- aucun framework externe ;
- un fichier CSS isolé ;
- un fichier JavaScript différé ;
- images de méga-menu responsives et lazy-loaded ;
- aucun template de page ou composant panier reconstruit.

## Fichiers modifiés

- `layout/theme.liquid`
- `sections/header-pet-shop.liquid`

## Fichiers ajoutés

- `assets/pet-header.css`
- `assets/pet-header.js`
- `snippets/fourpattes-header-icon.liquid`
- `snippets/icon-fourpattes-bag.liquid`
- `snippets/header-mega-menu.liquid`
- `snippets/header-mobile-menu-group.liquid`
- `docs/fourpattes-header-redesign.md`

## Matrice de tests manuels Shopify

Desktop : 1120, 1280, 1366, 1440, 1920 et 2560 px.

Tablette : 768, 834, 1024 et 1119 px.

Mobile : 320, 360, 375, 390, 430 et 448 px.

Pages : accueil, collection chien, collection chat, produit, recherche, compte, panier et 404.

Parcours : ouverture/fermeture des menus, hover, clavier, Échap, recherche, compte, panier vide/rempli, quick add, badge, sticky, drawer mobile, accordéons, absence de scroll horizontal et retour du focus.

## Avant / après

Avant : menu Shopify générique centré sur un catalogue unique et panier standard.

Après : navigation e-commerce structurée par univers, méga-menus éditoriaux, actions cohérentes, sac FourPattes identifiable, responsive maîtrisé et réglages marchands complets.
