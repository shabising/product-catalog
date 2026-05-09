export function getStockStatus(stock) {
  if (stock > 20) return 'In stock';
  if (stock > 0) return 'Low stock';
  return 'Out of stock';
}