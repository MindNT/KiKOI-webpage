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
  orderEndTime: null,
  setOrderEndTime: (time) => set({ orderEndTime: time }),
  // Estado para el status de la tienda
  storeOpen: true,
  setStoreOpen: (open) => set({ storeOpen: open }),
  setShowSuccess: (show) => set({ showSuccess: show }),
  setOrderData: (data) => set({ orderData: data }),
  setCustomerName: (name) => set({ customerName: name }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  addToCart: (item) => {
    const cart = get().cart;
    
    // Generate unique ID based on item.id + variants
    const variantStr = item.variants && item.variants.length > 0 
      ? JSON.stringify(item.variants.sort((a,b) => a.option.localeCompare(b.option))) 
      : '';
    const cartItemId = `${item.id}${variantStr ? '_' + variantStr : ''}`;
    
    const variantsPrice = (item.variants || []).reduce((sum, v) => sum + (v.price || 0), 0);
    const finalPrice = item.price + variantsPrice;

    const existing = cart.find(p => p.cartItemId === cartItemId);
    let newCart;
    if (existing) {
      newCart = cart.map(p => p.cartItemId === cartItemId ? { ...p, qty: p.qty + (item.qty || 1) } : p);
    } else {
      newCart = [...cart, { ...item, cartItemId, finalPrice, qty: item.qty || 1 }];
    }
    const total = newCart.reduce((sum, i) => sum + i.finalPrice * i.qty, 0);
    set({ cart: newCart, cartTotal: total });
  },
  updateQty: (cartItemId, delta) => {
    const cart = get().cart
      .map(item => item.cartItemId === cartItemId ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
      .filter(item => item.qty > 0);
    const total = cart.reduce((sum, i) => sum + i.finalPrice * i.qty, 0);
    set({ cart, cartTotal: total });
  },
  removeFromCart: (cartItemId) => {
    const cart = get().cart.filter(item => item.cartItemId !== cartItemId);
    const total = cart.reduce((sum, i) => sum + i.finalPrice * i.qty, 0);
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
