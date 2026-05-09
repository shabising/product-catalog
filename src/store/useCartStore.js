import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => {
        const exists = get().items.find(i => i.id === product.id);
        if (exists) {
          set({
            items: get().items.map(i =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...product, qty: 1 }] });
        }
        set({ isOpen: true });
      },

      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),

      updateQty: (id, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter(i => i.id !== id) });
        } else {
          set({ items: get().items.map(i => i.id === id ? { ...i, qty } : i) });
        }
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: 'shoply-cart' }
  )
);

export default useCartStore;