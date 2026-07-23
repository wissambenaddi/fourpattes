# Audit de simplification visuelle — FourPattes

## Diagnostic global avant modification

La landing page possède une identité forte et cohérente, mais son rythme est presque uniformément intense. Le Hero, les Favoris, la Box, la scène verte, la Mission et la Newsletter utilisent simultanément fonds forts, illustrations, cartes, décorations, ombres et animations. La fatigue visuelle vient moins d’un élément isolé que de leur répétition sans zone calme suffisamment courte.

## Tableau de décision

| Section | Rôle | Densité actuelle | Point focal retenu | Éléments à conserver | Éléments à réduire | Éléments à supprimer | Réduction de hauteur estimée | Réduction de décorations estimée | Priorité | Difficulté | Impact UX | Impact CRO |
|---|---|---:|---|---|---|---|---:|---:|---:|---:|---:|---:|
| Barre et header | Orientation globale | Faible | Navigation | Annonce, logo, menus, actions | Hauteur uniquement si nécessaire | Aucun | 0–3 % | 0 % | Haute | Faible | Haute | Haute |
| Hero | Promesse et entrée émotionnelle | Élevée | Titre + animaux + CTA | Fond bleu, chien, chat, confiance, CTA | Ombres et hauteur | Dialogues animés et décor secondaire | 3–5 % | 60 % | Haute | Faible | Haute | Haute |
| Favoris | Orientation produit | Moyenne à élevée | Produits et onglets | Titre, tabs, 4 produits, CTA | Ombres, espaces, contrôles | Décorations et entrée animée | 10–14 % | 70 % | Haute | Faible | Haute | Haute |
| Box | Explication du concept | Élevée | Carton central | Fond pétrole, carton, 4 bénéfices | Cartes latérales, texte | Cinquième bénéfice et décor flottant | 8–10 % | 60 % | Haute | Moyenne | Haute | Haute |
| Scène verte | Projection dans l’usage | Très élevée | Duo chien/chat | Duo, fond vert, 4 accessoires | Cartes, hauteur, ombres | Cinquième accessoire, connecteurs, décor et animation permanente | 12–18 % | 75 % | Très haute | Moyenne | Très haute | Haute |
| Communauté | Pause émotionnelle | Moyenne, trop haute | Invitation | Badge, titre, phrase, CTA | Carte et padding | Illustration vide et décor flottant | 25–35 % | 90 % | Très haute | Faible | Très haute | Moyenne |
| Mission | Preuve de marque | Très élevée | 4 engagements | Titre, cartes, CTA | Textes, cartes, conclusion | Décor flottant, route animée et décalages | 12–18 % | 70 % | Haute | Moyenne | Haute | Haute |
| Newsletter | Conversion finale | Moyenne | Formulaire | Patous, titre, champ, bouton, réassurance | Patous et padding | Bulle, ligne pointillée, décor et animation | 10–15 % | 80 % | Haute | Faible | Haute | Très haute |
| Footer | Navigation secondaire | Faible | Liens et garanties | Logo, liens, garanties, légal | Espaces si nécessaire | Liaison décorative | 0–5 % | 50 % | Moyenne | Faible | Moyenne | Moyenne |

## Nouveau rythme

1. Hero très fort.
2. Favoris modéré et fonctionnel.
3. Box forte.
4. Scène verte forte mais plus calme.
5. Communauté courte et calme.
6. Mission forte et compacte.
7. Newsletter compacte et orientée conversion.
8. Footer fonctionnel.

## Risques techniques identifiés

- Les deux variantes Box et scène de vie partagent `pet-bowl-feature.liquid`; les limites de contenu doivent être configurables par variante.
- Les CSS des sections sont chargés depuis le Liquid de chaque section; les overrides globaux doivent donc employer une portée spécifique à la page d’accueil.
- Les blocs Shopify existants doivent être conservés dans l’éditeur même lorsqu’une limite d’affichage plus basse est appliquée.
- Le header récemment restauré ne doit pas être inclus dans les changements visuels de la landing.

## Stratégie

- Utiliser en priorité les réglages déjà présents dans `templates/index.json`.
- Ajouter seulement trois contrôles utiles : nombre de bénéfices Box, nombre d’accessoires visibles et visibilité de l’illustration vide de la communauté.
- Désactiver les décorations et animations non essentielles par défaut sur la page d’accueil.
- Ajouter un fichier CSS de densité limité à `body.pet-template-index`.
- Ne modifier aucun template de collection, produit, panier, recherche, compte ou 404.
