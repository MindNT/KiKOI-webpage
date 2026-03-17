import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  cart: [],
  cartTotal: 0,
  // Estados para el modal de éxito
  showSuccess: false,
  orderData: null,
  customerName: '',
  phoneNumber: '',
  // Estado para el status de la tienda
  storeOpen: true,
  setStoreOpen: (open) => set({ storeOpen: open }),
  setShowSuccess: (show) => set({ showSuccess: show }),
  setOrderData: (data) => set({ orderData: data }),
  setCustomerName: (name) => set({ customerName: name }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
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
  removeFromCart: (id) => {
    const cart = get().cart.filter(item => item.id !== id);
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    set({ cart, cartTotal: total });
  },
  clearCart: () => {
    set({ cart: [], cartTotal: 0 });
  },
  // Session management helpers
  initializeFromSession: () => {
    const phone = sessionStorage.getItem('kikoi_phone');
    const name = sessionStorage.getItem('kikoi_customer_name');
    if (phone && name) {
      set({ phoneNumber: phone, customerName: name });
      return true;
    }
    return false;
  },
  clearSession: () => {
    sessionStorage.removeItem('kikoi_phone');
    sessionStorage.removeItem('kikoi_customer_name');
    set({ phoneNumber: '', customerName: '' });
  },
}));
