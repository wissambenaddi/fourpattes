# Refonte du header FourPattes

## Périmètre

Cette livraison transforme uniquement le système d’en-tête, ses menus et ses icônes. Les templates, sections de contenu, fiches produit, collections, panier et checkout ne sont pas reconstruits.

Les captures annoncées dans le brief n’étaient pas présentes dans le dépôt ni dans la pièce jointe disponible. La comparaison avec Edgard & Cooper repose donc uniquement sur les qualités UX explicitement listées dans le brief : clarté par univers, hiérarchie, espacement, légèreté des icônes et accès rapide aux actions.

## 1. Analyse UX/UI du header initial

Le header initial avait quatre qualités : code court, structure mobile-first, navigation Shopify configurable et compteur panier déjà synchronisé par AJAX. Ses limites principales étaient :

- un menu principal générique sans distinction Chien/Chat ;
- des sous-menus simples de 224 px, insuffisants pour une navigation e-commerce éditorialisée ;
- des actions en icônes Shopify standard ;
- un caddie générique ;
- une identité blanche/violette peu expressive dans l’en-tête ;
- aucun état de méga-menu piloté par `aria-expanded` ;
- une seule source de menu pour desktop et mobile.

## 2. Principes retenus par rapport à la référence

La référence n’est pas copiée. FourPattes reprend uniquement :

- la lecture immédiate des univers ;
- une navigation centrale courte ;
- des actions regroupées ;
- des menus larges et faciles à scanner ;
- un rythme horizontal généreux.

L’originalité FourPattes vient du violet de marque, du jaune actif, des pictogrammes chien/chat, des surfaces crème, du sac à empreinte et des formes arrondies.

## 3. Architecture de navigation

### Desktop

`Logo | Univers Chien | Univers Chat | Découvrir | Notre histoire | Recherche | Compte | Sac`

Les trois premiers items deviennent des méga-menus seulement lorsqu’un menu Shopify leur est affecté et que l’option globale est activée. Sinon, ils restent des liens directs et fonctionnels.

### Tablette

Sous 1120 px, le header bascule vers la structure compacte : menu, logo, recherche, compte, sac. Cette bascule volontaire évite toute collision entre le logo, quatre liens et trois actions.

### Mobile

`Menu | Logo | Recherche | Sac`

Le compte est déplacé dans le drawer. Les univers deviennent des accordéons. Les zones interactives ont une taille minimale de 44 px.

## 4. Méga-menus

Chaque menu Shopify peut contenir jusqu’à trois niveaux. Le rendu desktop affiche :

- jusqu’à six groupes principaux ;
- jusqu’à huit liens secondaires par groupe ;
- jusqu’à cinq liens de troisième niveau ;
- une carte éditoriale facultative avec image, texte et CTA ;
- un repli illustré par une empreinte si aucune image n’est choisie.

La navigation reste totalement gérée depuis Shopify Navigation, sans URL de catégorie codée dans le Liquid.

## 5. Sac FourPattes

Le snippet `icon-fourpattes-bag.liquid` utilise :

- un `viewBox` 28 × 28 ;
- une silhouette de sac à poignées ;
- une empreinte compacte au centre ;
- `currentColor` uniquement ;
- aucun bitmap ni métadonnée SVG.

États :

- vide : badge masqué par défaut ;
- rempli : badge jaune visible ;
- ajout : déplacement vertical de 4 px pendant 360 ms ;
- hover : translation de 2 px ;
- focus : anneau jaune de 3 px ;
- libellé lecteur d’écran : `Panier, X articles`.

## 6. Système d’icônes

Les icônes menu, fermeture, recherche, compte, flèches, chien, chat, découverte et histoire partagent :

- un `viewBox` 24 × 24 ;
- un trait de 1,8 ;
- des extrémités et jointures arrondies ;
- un rendu contour ;
- `currentColor` ;
- aucune dépendance externe.

## 7. Réglages de l’éditeur de thème

Le marchand peut configurer :

- menu complémentaire mobile ;
- icônes des univers ;
- activation globale des méga-menus ;
- sticky et réduction au scroll ;
- hauteur du header ;
- largeur du logo desktop/mobile ;
- libellé, menu, image, texte et CTA pour Chien ;
- mêmes réglages pour Chat ;
- mêmes réglages pour Découvrir ;
- libellé et lien Notre histoire ;
- lien Contact mobile ;
- affichage recherche, compte et sac ;
- affichage du zéro ;
- couleurs du header, des actions, des menus et du badge.

## 8. Fichiers modifiés

- `sections/header-pet-shop.liquid`
- `sections/header-group.json`
- `snippets/pet-icon.liquid`
- `layout/theme.liquid`
- `locales/fr.default.json`
- `locales/en.json`

## 9. Fichiers ajoutés

- `assets/pet-header.css`
- `assets/pet-header.js`
- `snippets/icon-fourpattes-bag.liquid`
- `snippets/header-mega-menu.liquid`
- `snippets/header-mobile-menu-group.liquid`
- `docs/fourpattes-header-redesign.md`

## 10. Accessibilité

Vérifications statiques intégrées :

- `aria-expanded` et `aria-controls` sur chaque déclencheur ;
- fermeture par Échap ;
- ouverture au clavier avec Flèche bas ;
- restitution du focus au déclencheur ;
- focus visible ;
- icônes décoratives masquées ;
- rôle dialogue et `aria-modal` pour le drawer ;
- piège de focus existant conservé ;
- texte dynamique du panier ;
- cibles tactiles de 44 px ;
- respect de `prefers-reduced-motion`.

## 11. Tests responsive à exécuter dans la prévisualisation Shopify

- 320, 375, 390, 448 px : menu, logo, recherche et sac sans débordement ;
- 768 et 1024 px : header tablette compact, compte visible, drawer utilisable ;
- 1120, 1366, 1440, 1920, 2560 px : navigation centrée, méga-menus contenus dans le viewport ;
- vérifier portrait et paysage tactile ;
- vérifier le zoom navigateur à 200 %.

## 12. Tests fonctionnels

- ouvrir/fermer chaque méga-menu au clic, hover et clavier ;
- naviguer jusqu’aux trois niveaux de liens ;
- ouvrir/fermer le drawer, y compris avec Échap ;
- vérifier recherche, compte et panier ;
- tester panier vide puis panier avec articles ;
- ajouter un produit depuis une carte rapide et une fiche produit ;
- vérifier l’actualisation du badge ;
- vérifier le sticky et l’état compact ;
- tester avec réduction des animations activée.

## 13. Non-régression

Les fichiers suivants ne sont pas modifiés :

- `templates/index.json` ;
- `templates/404.json` ;
- tous les templates produit, collection, recherche, compte et panier ;
- `sections/main-cart.liquid` ;
- `assets/pet-theme.js` et sa logique d’ajout panier existante.

Le lien du sac continue de pointer vers `routes.cart_url`. La synchronisation existante de `[data-pet-cart-count]` est conservée. Le nouveau script observe seulement le compteur pour mettre à jour le libellé accessible et l’animation.

## 14. Avant / Après

### Avant

- Accueil / Catalogue / Contact ;
- sous-menu compact générique ;
- caddie standard ;
- peu de personnalité ;
- compréhension du catalogue après un clic.

### Après

- Chien / Chat / Découvrir / Histoire immédiatement visibles ;
- méga-menus éditoriaux configurables ;
- système d’icônes FourPattes cohérent ;
- sac de marque immédiatement reconnaissable comme panier ;
- hiérarchie distincte desktop/tablette/mobile ;
- clavier, focus, réduction d’animation et compteur accessibles ;
- code isolé afin de réduire le risque de régression.
