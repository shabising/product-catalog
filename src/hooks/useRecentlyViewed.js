import { useState, useEffect } from 'react';

const MAX_ITEMS = 6;
const KEY = 'shoply-recently-viewed';

export default function useRecentlyViewed(currentId) {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
    setRecent(stored.filter(p => p.id !== currentId));
  }, [currentId]);

  const addProduct = (product) => {
    const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
    const filtered = stored.filter(p => p.id !== product.id);
    const updated = [product, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  return { recent, addProduct };
}