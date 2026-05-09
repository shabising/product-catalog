export function sortProducts(products, sort) {
  const arr = [...products];
  if (sort === 'low') arr.sort((a, b) => a.price - b.price);
  if (sort === 'high') arr.sort((a, b) => b.price - a.price);
  if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating);
  return arr;
}