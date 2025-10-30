import React from 'react';
import { useCartStore } from '../../cartStore';

// Iconos simples SVG para Plus, Minus, X
const Plus = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
);
const Minus = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
);
const X = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);

const Billingcar = () => {
  const cartOpen = useCartStore(state => state.cartOpen);
  const setCartOpen = useCartStore(state => state.setCartOpen);
  const cart = useCartStore(state => state.cart);
  const updateQty = useCartStore(state => state.updateQty);
  const cartTotal = useCartStore(state => state.cartTotal);

  return cartOpen ? (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-light">Carrito</h3>
            <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <p className="text-center text-gray-400 mt-12">Tu carrito está vacío</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-light">{item.name}</h4>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-light">Total</span>
                <span className="text-2xl font-light">${cartTotal}</span>
              </div>
              <button className="w-full bg-gray-900 text-white py-4 rounded-full text-sm font-light hover:bg-gray-800 transition-colors">
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Billingcar;
