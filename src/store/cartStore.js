
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  cart: [],
  cartTotal: 0,
  addToCart: (item) => {
    const cart = get().cart;
    const existing = cart.find(p => p.id === item.id);
    let newCart;
    if (existing) {
      newCart = cart.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
    } else {
      newCart = [...cart, { ...item, qty: 1 }];
    }
    const total = newCart.reduce((sum, i) => sum + i.price * i.qty, 0);
    set({ cart: newCart, cartTotal: total });
  },
  updateQty: (id, delta) => {
    const cart = get().cart
      .map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
      .filter(item => item.qty > 0);
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    set({ cart, cartTotal: total });
  },
}));
