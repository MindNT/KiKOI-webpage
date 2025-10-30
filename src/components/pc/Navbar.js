
import React from 'react';
import { useCartStore } from '../../cartStore';



const Navbar = () => {
  const setCartOpen = useCartStore(state => state.setCartOpen);
  const cart = useCartStore(state => state.cart);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  return (
    <nav className="w-full flex items-center justify-between border-b" style={{ borderBottom: '1px solid #f2f2f2', background: 'transparent' }}>
      <div className="ml-8 flex items-center h-16">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="h-12 w-auto" />
      </div>
      <div className="mr-8 flex items-center h-16 relative">
        <button onClick={() => setCartOpen(true)} className="focus:outline-none relative">
          <img src={process.env.PUBLIC_URL + '/assets/market.svg'} alt="Carrito" className="h-6 w-auto" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center font-semibold">{itemCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;