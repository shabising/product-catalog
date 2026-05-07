const BASE = 'https://dummyjson.com';

export async function getProducts() {
  const res = await fetch(`${BASE}/products?limit=100`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  return res.json();
}

export async function getProductsByCategory(slug) {
  const res = await fetch(`${BASE}/products/category/${slug}?limit=100`);
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  return res.json();
}

export async function searchProducts(q) {
  const res = await fetch(`${BASE}/products/search?q=${q}&limit=100`);
  return res.json();
}