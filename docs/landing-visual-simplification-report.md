# Rapport après simplification visuelle — FourPattes

## Périmètre

La passe est limitée à la page d’accueil. Le header restauré, les méga-menus, le panier, la recherche, les comptes, les collections, les produits, la 404 et le footer ne sont pas restructurés.

## Fichiers concernés

- `templates/index.json`
- `assets/homepage-density-simplification.css`
- `layout/theme.liquid`
- `docs/landing-visual-simplification-audit.md`
- `docs/landing-visual-simplification-report.md`

## Modifications par section

### Hero

- Conversation animée désactivée.
- Décorations secondaires désactivées.
- Hauteur desktop : 620 px → 600 px, soit −3,2 %.
- Hauteur mobile : 560 px → 540 px, soit −3,6 %.
- Le titre, les animaux, les CTA et le bandeau de confiance restent prioritaires.

### Nos grands favoris

- Quatre produits conservés.
- Décorations et animation d’entrée désactivées.
- Empreintes d’introduction retirées visuellement.
- Padding vertical et espaces titre/contenu réduits.
- Ombres, rotations et hover rendus plus discrets.
- Réduction de hauteur estimée : 10 à 14 %.

### Ce qui rentre avec FourPattes

- Carton central conservé comme point focal.
- Cinquième carte périphérique retirée visuellement : quatre bénéfices restent visibles.
- Décorations flottantes et animation de scène désactivées.
- Deux impressions secondaires du carton supprimées.
- Hauteur desktop : 660 px → 620 px, soit −6,1 %.
- Hauteur mobile : 780 px → 720 px, soit −7,7 %.

### Tout ce qui part avec FourPattes

- Cinq accessoires → quatre accessoires dans les données Shopify de la page.
- Badges non indispensables retirés.
- Toutes les micro-animations des accessoires désactivées.
- Décorations et réseau de connecteurs désactivés.
- Hauteur desktop : 840 px → 720 px, soit −14,3 %.
- Hauteur mobile : 1120 px → 920 px, soit −17,9 %.

### Communauté

- Décorations et animation d’entrée désactivées.
- Texte raccourci.
- Illustration de l’état vide retirée visuellement.
- Largeur maximale : 1160 px → 1040 px.
- Padding supérieur : 72 px → 48 px, soit −33,3 %.
- Padding inférieur : 84 px → 52 px, soit −38,1 %.
- La section devient la pause calme principale de la page.

### Mission

- Quatre engagements conservés.
- Textes raccourcis à une idée par carte.
- Décalages verticaux et animations supprimés.
- Décorations, chemin narratif et étincelles secondaires retirés.
- Rayon : 32 px → 26 px ; espacement : 24 px → 20 px.
- Padding desktop : 80/104 px → 64/80 px.
- Padding mobile : 56/72 px → 44/52 px.
- Hauteur visuelle des médias réduite d’environ 19 %.
- Conclusion transformée visuellement en phrase et CTA simples, sans grande carte supplémentaire.

### Newsletter

- Patous conservé, réduit de 250 px à 220 px.
- Bulle, ligne pointillée, décorations et animation désactivées.
- Texte raccourci.
- Largeur maximale : 1040 px → 960 px.
- Padding desktop : 64/56 px → 48/44 px.
- Padding mobile : 40/48 px → 32/36 px.
- Le formulaire devient le point focal incontestable.

## Décorations et animations

Les décorations secondaires sont supprimées ou désactivées dans le Hero, les Favoris, la Box, la scène verte, la Communauté, la Mission et la Newsletter. La réduction estimée dépasse 50 % sur l’ensemble de la page et atteint environ 70 à 80 % sur mobile.

Les animations permanentes sont supprimées. Les retours d’interaction essentiels — boutons, onglets, cartes produit et panier — restent disponibles. `prefers-reduced-motion` demeure respecté.

## Estimation globale

- Réduction de hauteur totale estimée : environ 20 % sur mobile et 15 à 20 % sur desktop, selon le contenu marchand réel.
- Réduction de densité visuelle perçue estimée : 20 à 25 %.
- Réduction des décorations secondaires estimée : 60 à 75 %.

## Validation statique

- `templates/index.json` reste un objet JSON valide.
- Les identifiants de sections et de blocs présents dans `order` et `block_order` existent.
- Aucun nouveau réglage non déclaré n’est enregistré dans le template.
- Le nouvel asset CSS est chargé uniquement lorsque `request.page_type == 'index'`.
- Toutes ses règles sont également limitées par `body.pet-template-index`.
- Aucun JavaScript supplémentaire n’est ajouté.
- Aucun template autre que `templates/index.json` n’est modifié.

## Tests à effectuer dans la prévisualisation Shopify

Largeurs : 1440, 1280, 1024, 768, 390 et 360 px.

Contrôles : longueur de page, absence de chevauchement, cartes Box, quatre accessoires de la scène verte, état vide ou rempli de la communauté, grille Mission, formulaire Newsletter, header sticky et footer.

Pages de non-régression : accueil, collection, produit, panier, recherche, compte et 404.

Shopify CLI et Theme Check ne sont pas disponibles dans l’environnement de publication GitHub utilisé ici. Une prévisualisation Shopify et un `shopify theme check` restent nécessaires avant publication du thème.
