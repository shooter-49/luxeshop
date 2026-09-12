# LUX·E — E-Commerce Premium

Site e-commerce React avec design dark luxury, panier, wishlist, filtres et intégration FakeStoreAPI.

## 🚀 Stack technique

- **Frontend** : React 18 + Vite 5 + React Router v6
- **Style** : CSS custom properties (no framework, 100% custom)
- **API** : [FakeStoreAPI](https://fakestoreapi.com) (gratuite, pas de clé requise)
- **State** : Context API + useReducer (persistance localStorage)
- **Deploy** : Netlify (config incluse)

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** : Hero animé, catégories, produits vedettes, countdown, stats
- 🛍️ **Boutique** : Filtre par catégorie, recherche, tri, filtre prix/note
- 📦 **Page produit** : Galerie, quantité, onglets description/avis/livraison, produits similaires
- 🛒 **Panier** : Drawer animé, quantités, total, persistance
- ❤️ **Wishlist** : Page dédiée, ajout/suppression, transfert panier
- 📱 **Responsive** : Mobile-friendly
- ⚡ **Skeleton loaders** : UX pendant le chargement

## 🛠️ Installation locale

```bash
cd luxeshop
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173)

## 🌐 Déploiement sur Netlify

### Option 1 — Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option 2 — Git + Netlify UI
1. Push ce repo sur GitHub/GitLab
2. Sur [netlify.com](https://netlify.com) → **New site from Git**
3. Build command : `npm run build`
4. Publish directory : `dist`
5. **Le fichier `netlify.toml` gère les redirects SPA automatiquement**

## 📁 Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Navigation avec panier et search
│   ├── CartDrawer.jsx     # Panier slide-out
│   ├── ProductCard.jsx    # Carte produit avec hover + wishlist
│   └── Footer.jsx         # Footer complet
├── context/
│   └── StoreContext.jsx   # Panier + Wishlist (Context + useReducer)
├── hooks/
│   └── useApi.js          # Hooks pour FakeStoreAPI
├── pages/
│   ├── Home.jsx           # Accueil
│   ├── Shop.jsx           # Boutique avec filtres
│   ├── ProductDetail.jsx  # Fiche produit
│   └── Wishlist.jsx       # Liste de souhaits
├── App.jsx                # Router
├── main.jsx               # Entry point
└── index.css              # Design system
```

## 🎨 Design System

- **Couleurs** : Dark luxury — noir profond + or (`#c9a96e`)
- **Typo** : Cormorant Garamond (display) + DM Sans (body) + Space Mono (data)
- **Animations** : fadeUp, shimmer skeleton, hover transitions

## 🔄 Pour utiliser MockAPI à la place de FakeStoreAPI

Dans `src/hooks/useApi.js`, remplace `BASE` par ton URL MockAPI :
```js
const BASE = 'https://mockapi.io/api/v1'
```
Et adapte les endpoints selon ta structure.
