# NutriCore — Guide pour Claude Code

## Contexte projet
Boutique e-commerce de compléments alimentaires premium sous la marque **NutriCore**.
Catégorie principale : **Brûleurs / Perte de poids** (thermogéniques, drainants, coupe-faim, boosters énergie).

**Stack : site statique HTML/CSS/JS pur — pas de framework, pas de build tool.**
Ouvrir `index.html` directement dans le navigateur suffit.

---

## Structure des fichiers

```
tutoriel/
├── index.html          — Home : hero, shader cards catégories, grille produits, avis, newsletter, footer
├── product.html        — Page produit : galerie, calculateur abonnement, variantes, tabs (bénéfices/ingrédients/usage)
├── cart.html           — Panier : items, quantités, récap commande, barre livraison gratuite, code promo
├── styles.css          — Design system complet (variables, composants, animations, responsive)
├── app.js              — Logique partagée : Cart (localStorage), toast, updateCartBadge, starsHTML, fmtPrice
├── data.js             — Catalogue : NUTRICORE_DATA { categories[], products[], testimonials[] }
├── images/             — Assets images produits (ex: Gemini_Generated_Image_mfr2ifmfr2ifmfr2.png = ThermoFire Pro)
└── guides site ecom/   — Références design (screenshots + DESIGN.md du système Biolabs Noir)
    └── stitch/
        ├── biolabs_noir/DESIGN.md          ← Design system de référence (lire en priorité)
        └── vita_alchemy_*/screen.png       ← Screenshots de référence UI
```

---

## Design System

### Palette couleurs (variables CSS dans `:root`)
| Variable | Valeur | Usage |
|---|---|---|
| `--bg` | `#0C0C0C` | Fond principal |
| `--bg2` | `#141414` | Sections alternées |
| `--bg3` | `#1C1C1C` | Cards, inputs |
| `--card` | `#181818` | Cards produits |
| `--border` | `#2A2A2A` | Bordures |
| `--green` | `#22C55E` | Accent principal NutriCore |
| `--green-dim` | `#16A34A` | Hover du vert |
| `--green-glow` | `rgba(34,197,94,.18)` | Fonds glow |
| `--white` | `#F8F8F6` | Texte principal |
| `--muted` | `#888` | Texte secondaire |
| `--text` | `#E8E8E4` | Texte body |

### Typographie
- **Titres/Display** : `Syne` (Google Fonts) — poids 700/800
- **Body** : `Inter` — poids 300/400/500/600
- Chargées via `@import` en tête de `styles.css`

### Composants clés dans styles.css
- `.btn-primary` / `.btn-secondary` — boutons CTA
- `.product-card` — carte produit avec hover
- `.shader-card` — shader feature cards (animation conic-gradient)
- `.aurora-hero` + `.aurora-layer` — effet aurora animé sur le hero
- `.hero-img-wrap` + `.hero-product-img` — visuel hero avec masque radial
- `.subscription-calc` — calculateur abonnement toggle
- `.toast` — notifications, via `showToast(icon, title, subtitle)`
- `.cart-item` / `.cart-summary` — composants panier

---

## Données produits (`data.js`)

### Structure `NUTRICORE_DATA.products[]`
```js
{
  id:          'thermofire-pro',       // slug URL → product.html?id=slug
  category:    'burners',             // burners | drainants | appetite | booster
  name:        'ThermoFire Pro',
  tagline:     'Le brûleur #1',
  badge:       'Bestseller',          // null si aucun
  badgeColor:  '#FF4444',
  description: '...',
  benefits:    ['...', '...'],        // liste pour tab Bénéfices
  ingredients: '...',                 // texte pour tab Composition
  usage:       '...',                 // texte pour tab Utilisation
  rating:      4.8,                   // sur 5
  reviews:     312,
  variants: [
    { id, label, subtitle, price, comparePrice, stock, popular? }
  ],
  subscription: { available: true, discount: 15 },  // -15% abonnement mensuel
  images:      ['thermofire-pro'],    // placeholder, utiliser getProductIcon(id)
  tags:        ['thermogénique', ...],
}
```

### Icônes produits — `getProductIcon(productId)` dans `app.js`
```js
'thermofire-pro'    → '🔥'
'slimburn-elite'    → '💫'
'cutlean-max'       → '⚡'
'aquadetox-plus'    → '💧'
'drainfit-bio'      → '🌿'
'satia-control'     → '🎯'
'energyx-daily'     → '☀️'
'nightburn-advanced'→ '🌙'
```

---

## Logique panier (`app.js` — objet `Cart`)

Persiste dans `localStorage` sous la clé `nutricore_cart`.

| Méthode | Description |
|---|---|
| `Cart.addItem(product, variant, isSubscription)` | Ajoute ou incrémente. Prix auto réduit de 15% si `isSubscription=true` |
| `Cart.removeItem(itemId)` | Supprime par ID |
| `Cart.updateQty(itemId, delta)` | +1 / -1 (min 1) |
| `Cart.getItems()` | Retourne le tableau |
| `Cart.getTotal()` | Somme unitPrice × qty |
| `Cart.getCount()` | Nombre total d'articles |
| `updateCartBadge()` | Met à jour le badge header |

---

## Fonctionnalités à connecter (placeholders)

Ces features sont UI-ready mais sans backend :

| Feature | Fichier | Point d'intégration |
|---|---|---|
| **Stripe Checkout** | `cart.html` | `handleCheckout()` → appel `/api/stripe/checkout` |
| **Supabase Auth** | tous | `use-auth.ts` (prévu mais non créé) |
| **API Colissimo** | `cart.html` | calcul frais livraison |
| **Codes promo réels** | `cart.html` | `applyCoupon()` — valider côté serveur |
| **Images produits réelles** | `data.js` | remplacer les emojis par de vraies URLs dans `images[]` |

Codes promo de démo actifs : `NUTRI10` (-10%), `WELCOME15` (-15%).

---

## Conventions à respecter

- **Pas de framework JS** — vanilla uniquement, pas de React/Vue/Alpine
- **Pas de build tool** — pas de webpack/vite, tout doit marcher en double-cliquant `index.html`
- **Français** — toute l'UI est en français
- **Dark mode only** — pas de mode clair, le site est full dark
- **Couleur d'accent = `--green` uniquement** — ne pas introduire d'autres couleurs primaires sans validation
- **Police = Syne + Inter** — ne pas changer les fonts
- **Ajouter un produit** : éditer uniquement `data.js`, l'UI se met à jour automatiquement
- **Ajouter une page** : copier la structure header/footer d'une page existante, inclure `data.js` puis `app.js`

---

## GitHub
- Repo : https://github.com/Elric-Yui/nutricore-ecommerce
- Branch principale : `master`
- Remote : `origin`

## Commandes utiles
```bash
# Ouvrir dans Chrome
start chrome "C:/Users/axelo/Desktop/tutoriel/index.html"

# Push après modifications
git add -A && git commit -m "message" && git push

# Voir le repo
gh repo view --web
```

---

## Guide de référence design
Lire `guides site ecom/stitch/biolabs_noir/DESIGN.md` avant tout travail UI majeur.
Principes clés à retenir :
- Transitions tonales (pas de bordures 1px pour séparer les sections)
- Glassmorphism pour les éléments flottants (60% opacity + 24px blur)
- Typographie display très grande pour les titres de section
- Grille asymétrique, les images "cassent" les lignes de la grille
- Shadows = ambient tonal layering, jamais de drop-shadow classique
