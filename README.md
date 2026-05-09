# Shoply — Product Catalog App

A modern, responsive product catalog built with React. Features dynamic filtering, debounced search, React Query caching, and a clean component architecture.

🔗 **Live Demo:** [shabising.github.io/product-catalog](https://shabising.github.io/product-catalog)

---

## Features

- 🗂️ Category-based filtering with URL sync (`?category=laptops`)
- 🔍 Debounced search (500ms) — reduces unnecessary API calls
- ⚡ React Query caching — no redundant fetches on revisit
- 📄 Product detail page with image gallery, reviews, and related products
- 💀 Skeleton loading on both list and detail pages
- ⚠️ Error UI with retry button
- 📱 Fully responsive grid layout
- ♿ Accessible — semantic HTML, aria-labels, keyboard navigation
- 🔢 Client-side pagination (12 products per page)
- 🚀 Lazy loaded routes with React Suspense

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| TanStack React Query | Data fetching & caching |
| Zustand | Global state management |
| Tailwind CSS | Styling |
| DummyJSON API | Mock product data |

---

## Architecture

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductDetail.jsx
│   ├── Sidebar.jsx
│   └── ui/
│       ├── ErrorMessage.jsx
│       └── Loader.jsx
├── constants/
│   └── index.js
├── hooks/
│   └── useDebounce.js
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── NotFound.jsx
│   └── ProductDetailPage.jsx
├── routes/
│   └── AppRoutes.jsx
├── services/
│   └── productService.js
├── store/
│   ├── useCartStore.js
│   ├── useDarkModeStore.js
│   └── useFilterStore.js
├── utils/
│   ├── sort.js
│   └── stockStatus.js
├── App.js
└── index.js
```

---

## Optimization Techniques

- **Lazy Loading** — `ProductDetailPage` is loaded only when navigated to, reducing initial bundle size
- **Debounced Search** — search input waits 500ms before firing API request, reducing server load
- **React Query Caching** — fetched data is cached for 5 minutes (`staleTime`), avoiding redundant network calls
- **Memoization** — `useMemo` used for sort operations to avoid unnecessary recalculations on re-render
- **URL-synced Filters** — category filters are stored in URL params, enabling shareable links and browser back/forward support

---

## Accessibility

- Semantic HTML (`<aside>`, `<nav>`, `<main>`)
- `aria-label` on interactive elements
- `aria-pressed` on category filter buttons
- Descriptive `alt` text on all images
- `focus:ring` styles for keyboard navigation

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/shabising/product-catalog.git
cd product-catalog

# Install dependencies
npm install

# Start development server
npm start
```

## Deployment

```bash
npm run deploy
```

Deploys to GitHub Pages via `gh-pages`.

---

Built by [shabising](https://github.com/shabising)
