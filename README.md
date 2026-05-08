 
# Shoply — Product Catalog

A clean and responsive product catalog app built with React.

🔗 **Live Demo:** [shabising.github.io/product-catalog](https://shabising.github.io/product-catalog)

---

## Features

- 🗂️ Browse products by category
- 🔍 Search with debounce (500ms)
- 📊 Sort by price or rating
- 📄 Product detail page with image gallery and reviews
- 🔗 Related products section
- 📱 Responsive grid layout

## Tech Stack

- React 19
- React Router v7
- Tailwind CSS
- DummyJSON API

## Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductDetail.jsx
│   ├── Sidebar.jsx
│   └── ui/
│       ├── ErrorMessage.jsx
│       └── Loader.jsx
├── hooks/
│   └── useDebounce.js
├── pages/
│   ├── NotFound.jsx
│   └── ProductDetailPage.jsx
├── services/
│   └── productService.js
├── App.js
└── index.js
```

## Getting Started

```bash
# Clone the repo
git clone https://github.com/shabising/product-catalog.git

# Install dependencies
cd product-catalog
npm install

# Start the app
npm start
```

## Deployment

```bash
npm run deploy
```

Deploys to GitHub Pages via `gh-pages`.

---

Built by [shabising](https://github.com/shabising)