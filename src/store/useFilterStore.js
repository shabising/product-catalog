import { create } from 'zustand';

const useFilterStore = create((set) => ({
  selCat: 'all',
  query: '',
  sort: 'default',

  setSelCat: (cat) => set({ selCat: cat }),
  setQuery: (query) => set({ query }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ selCat: 'all', query: '', sort: 'default' }),
}));

export default useFilterStore;