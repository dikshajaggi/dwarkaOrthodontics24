import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  return parseInt(String(priceStr).replace(/[^\d]/g, ''), 10) || 0;
}

const safeStorage = createJSONStorage(() => {
  if (typeof window !== 'undefined') return localStorage;
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
});

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                sku: product.sku,
                brand: product.brand,
                price: product.price,
                priceNum: parsePrice(product.price),
                slug: product.slug,
                qty,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => {
          if (qty < 1) return { items: state.items.filter((i) => i.id !== id) };
          return { items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)) };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'do_cart',
      storage: safeStorage,
      skipHydration: true,
    }
  )
);

export const selectTotalItems = (state) =>
  state.items.reduce((sum, i) => sum + i.qty, 0);

export const selectSubtotal = (state) =>
  state.items.reduce((sum, i) => sum + i.priceNum * i.qty, 0);
