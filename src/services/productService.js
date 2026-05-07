const BASE = 'https://dummyjson.com';

async function request(url) {
  try {
    const res = await fetch(`${BASE}${url}`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const getProducts = () => request('/products?limit=100');

export const getCategories = () => request('/products/categories');

export const getProductsByCategory = (slug) =>
  request(`/products/category/${slug}?limit=100`);

export const getProduct = (id) =>
  request(`/products/${id}`);

export const searchProducts = (q) =>
  request(`/products/search?q=${encodeURIComponent(q)}&limit=100`);