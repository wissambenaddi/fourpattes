# Visuels FourPattes — v1.1.7

Date de vérification : 21 juillet 2026

Cette version conserve le logo, la bannière hero, les vagues, les couleurs et la structure du thème. Les nouveaux fichiers ci-dessous ont été générés spécialement pour FourPattes avec l’outil de génération d’images d’OpenAI. Ils ne proviennent pas d’une banque d’images, ne contiennent pas de filigrane ni de marque tierce et ne nécessitent pas d’attribution intégrée au storefront. Leur utilisation reste soumise aux conditions applicables au compte OpenAI du propriétaire de la boutique.

| Fichier | Section | Dimensions | Rôle / texte alternatif | Comportement Shopify |
| --- | --- | ---: | --- | --- |
| `gamelle-antiderapante-fourpattes.webp` | Ce qui rentre | 1419 × 538 | Gamelle crème et verte avec base antidérapante | Visuel par défaut ; remplacé par le réglage `image` de la section |
| `kit-promenade-fourpattes.webp` | Ce qui sort | 1286 × 876 | Harnais turquoise, laisse violette et accessoires de promenade | Visuel par défaut ; remplacé par le réglage `image` de la section |
| `mascotte-fourpattes-bandana.webp` | Mascotte et newsletter | 863 × 1027 | Chat mascotte orange avec bandana violet, médaille turquoise et balle jaune | Visuel par défaut ; remplacé par `mascot` ou `decoration_left` |
| `accessoires-newsletter-fourpattes.webp` | Newsletter | 1050 × 982 | Collier violet, balle jaune, corde orange et souris turquoise | Décoratif, `alt=""` ; remplacé par `decoration_right` |
| `avis-chien-collier-fourpattes.webp` | Avis | 1254 × 1254 | Golden retriever portant un collier violet | Fallback marqué « Photo illustrative » ; remplacé par la photo du bloc |
| `avis-chat-jouet-fourpattes.webp` | Avis | 1254 × 1254 | Chat gris jouant avec une balle jaune | Fallback marqué « Photo illustrative » ; remplacé par la photo du bloc |
| `avis-chien-harnais-fourpattes.webp` | Avis | 1254 × 1254 | Chien portant un harnais turquoise en promenade | Fallback marqué « Photo illustrative » ; remplacé par la photo du bloc |
| `engagement-preparation-fourpattes.webp` | Valeurs | 1448 × 1086 | Préparation soignée d’une commande d’accessoires | Visuel par défaut ; remplacé par `image_one` |
| `engagement-accessoires-fourpattes.webp` | Valeurs | 1448 × 1086 | Collier, harnais, gamelle et accessoires colorés | Visuel par défaut ; remplacé par `image_two` |

## Règles éditoriales

- Les photos d’avis générées restent explicitement étiquetées « Photo illustrative ».
- Une photo client ne doit être publiée qu’avec une autorisation vérifiable. Le réglage `photo_is_illustrative` permet de conserver l’étiquette si nécessaire.
- Les cartes « Nos grands favoris » restent liées aux collections réelles Shopify. Aucune image, aucun prix et aucun avis produit n’est inventé par cette version.
- Pour afficher les vrais produits, sélectionner les collections chien et chat dans les réglages de la section depuis l’éditeur de thème.

## Optimisation

Les fichiers sont livrés en WebP, avec dimensions intrinsèques dans le HTML pour limiter le CLS. Les visuels sous la ligne de flottaison utilisent `loading="lazy"`. Les images choisies via l’éditeur continuent d’utiliser `image_url`, `image_tag`, `widths` et `sizes` via les composants du thème.
