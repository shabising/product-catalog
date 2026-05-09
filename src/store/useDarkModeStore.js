import { create } from 'zustand';

const useDarkModeStore = create((set) => ({
  isDark: false,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
}));

export default useDarkModeStore;