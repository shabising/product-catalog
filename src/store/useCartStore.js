import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const exists = get().items.find(i => i.id === product.id);
    if (exists) {
      set({ items: get().items.map(i =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      )});
    } else {
      set({ items: [...get().items, { ...product, qty: 1 }] });
    }
  },

  removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));

export default useCartStore;