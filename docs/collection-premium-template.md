# Template de collection premium FourPattes

## Architecture

Le template `templates/collection.json` est unique et réutilisable pour toutes les collections. Il utilise exclusivement l’objet `collection` courant et les sélections du Theme Editor.

Sections :

1. `main-collection-hero`
2. `collection-trust-bar`
3. `collection-benefits`
4. `main-collection-product-grid`
5. `collection-editorial-banner`
6. `collection-buying-guide`
7. `collection-complementary-products`
8. `collection-social-proof`
9. `collection-faq`
10. `collection-related-collections`

## Métachamps de collection facultatifs

Aucun métachamp n’est obligatoire. Les sections restent élégantes ou se masquent lorsque les données sont absentes.

| Namespace et clé | Type conseillé | Usage |
| --- | --- | --- |
| `custom.hero_subtitle` | Texte multiligne | Description courte du hero |
| `custom.hero_image` | Fichier / image | Image premium lorsque la collection n’a pas d’image |
| `custom.hero_badge` | Texte sur une ligne | Sur-titre |
| `custom.hero_cta_label` | Texte sur une ligne | Libellé du CTA |
| `custom.hero_cta_link` | URL | Destination du CTA |
| `custom.accent_color` | Couleur | Fond du hero |
| `custom.benefits` | Liste de métaobjets | Jusqu’à quatre bénéfices |
| `custom.buying_guide_title` | Texte sur une ligne | Titre du guide |
| `custom.buying_guide_text` | Texte multiligne | Contenu du guide |
| `custom.buying_guide_image` | Fichier / image | Visuel du guide |
| `custom.buying_guide_cta_label` | Texte sur une ligne | CTA du guide |
| `custom.buying_guide_cta_link` | URL | Lien du guide |
| `custom.complementary_collection` | Référence de collection | Produits complémentaires |
| `custom.faq` | Liste de métaobjets | Questions et réponses |
| `custom.related_collections` | Liste de références de collections | Navigation de fin de page |

### Métaobjet `benefit`

Champs conseillés :

- `icon` : texte parmi `comfort`, `strength`, `easy`, `choice`, `care`, `paw`
- `title` : texte sur une ligne
- `text` : texte sur une ligne

### Métaobjet `faq_item`

Champs conseillés :

- `question` : texte sur une ligne
- `answer` : texte multiligne

## Image du hero

Priorité appliquée :

1. image native de la collection ;
2. `custom.hero_image` ;
3. image de secours du Theme Editor ;
4. hero équilibré sans image.

## Données commerciales

Le template ne génère aucune promotion, note, quantité de clients, délai de livraison ou politique de retour. Les badges produit proviennent uniquement des prix comparés réels ou des tags existants. La preuve sociale n’apparaît que lorsqu’un bloc d’application ou une histoire réelle est configuré.

## Filtres et tri

La section principale conserve les objets natifs Shopify :

- `collection.filters`
- `collection.sort_options`
- `paginate collection.products`
- URLs `url_to_remove`
- formulaires GET sur `collection.url`

Le drawer mobile duplique uniquement l’interface, pas la logique métier.
