import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find(i => i.id === product.id);
        if (exists) {
          set({ items: get().items.filter(i => i.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      isFavorite: (id) => get().items.some(i => i.id === id),
    }),
    { name: 'shoply-wishlist' }
  )
);

export default useWishlistStore;