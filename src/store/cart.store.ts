import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

type CartState = {
  carts: CartItem[];
  add: (id: string, name: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  carts: [],

  add: (id, name) =>
    set((state) => {
      const exists = state.carts.find((i) => i.id === id);
      if (exists) {
        return {
          carts: state.carts.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { carts: [...state.carts, { id, name, quantity: 1 }] };
    }),

  remove: (id) =>
    set((state) => ({
      carts: state.carts
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    })),

  clear: () => set({ carts: [] }),
}));
