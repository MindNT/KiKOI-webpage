import React, { useState } from 'react';
import { useCartStore } from '../../cartStore';

// Hook para detectar dispositivos móviles
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileUA = mobileRegex.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileUA || isSmallScreen);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Iconos simples SVG para Plus, Minus, X, Trash
const Plus = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
);
const Minus = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
);
const X = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);
const Trash = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);
const TrashItem = props => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);

const Billingcar = () => {
  const isMobile = useIsMobile();
  const cartOpen = useCartStore(state => state.cartOpen);
  const setCartOpen = useCartStore(state => state.setCartOpen);
  const cart = useCartStore(state => state.cart);
  const updateQty = useCartStore(state => state.updateQty);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const cartTotal = useCartStore(state => state.cartTotal);
  const clearCart = useCartStore(state => state.clearCart);
  const setShowSuccess = useCartStore(state => state.setShowSuccess);
  const setOrderData = useCartStore(state => state.setOrderData);
  const setCustomerNameGlobal = useCartStore(state => state.setCustomerName);

  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [customerExists, setCustomerExists] = useState(null);

  // Función para generar código de orden
  const generateOrderCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Función para formatear items para el endpoint
  const formatItemsForAPI = () => {
    const items = {};
    cart.forEach(item => {
      items[item.id.toString()] = item.qty;
    });
    return items;
  };

  // Función para verificar si el teléfono existe
  const verifyPhone = async () => {
    if (!phone.trim()) {
      alert('Por favor ingresa tu número de teléfono');
      return;
    }

    if (phone.length < 10) {
      alert('Por favor ingresa un número de teléfono válido (mínimo 10 dígitos)');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const response = await fetch(`https://kikoi-management.mindnt.com.mx/customers/verify-phone?phone=${phone.trim()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      const result = await response.json();

      if (result.status === 'success') {
        setCustomerExists(result.exists === 1);
        
        if (result.exists === 1) {
          // Cliente existe, proceder directamente con el pedido
          setCustomerName(result.name || '');
          setCustomerNameGlobal(result.name || '');
          await processOrder();
        } else {
          // Cliente no existe, pedir nombre
          setShowNameInput(true);
          setIsPlacingOrder(false);
        }
      } else {
        throw new Error('Error al verificar el teléfono');
      }
    } catch (error) {
      console.error('Error al verificar el teléfono:', error);
      alert('Error al verificar el teléfono. Por favor intenta nuevamente.');
      setIsPlacingOrder(false);
    }
  };

  // Función para registrar nuevo cliente
  const registerCustomer = async () => {
    if (!customerName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    try {
      const response = await fetch(`https://kikoi-management.mindnt.com.mx/customers/add-customer?name=${encodeURIComponent(customerName.trim())}&phone=${phone.trim()}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        }
      });

      const result = await response.json();

      if (result.status === 'success') {
        // Cliente registrado exitosamente, proceder con el pedido
        setCustomerNameGlobal(customerName.trim());
        await processOrder();
      } else {
        throw new Error('Error al registrar el cliente');
      }
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      alert('Error al registrar el cliente. Por favor intenta nuevamente.');
      setIsPlacingOrder(false);
    }
  };

  // Función para procesar el pedido
  const processOrder = async () => {
    try {
      const orderCode = generateOrderCode();
      const items = formatItemsForAPI();
      const currentDate = new Date().toISOString();

      // Preparar los datos para enviar en el body
      const orderData = {
        data: {
          sale_id: null,
          customer_id: null,
          code_order: orderCode,
          phone: phone.trim(),
          sale_date: currentDate,
          items: items,
          total_amount: cartTotal,
          promotions: {},
          maps_url: ""
        }
      };

      // Construir URL con parámetros como en tu endpoint de ejemplo
      const baseUrl = 'https://kikoi-management.mindnt.com.mx/orders/save-order';
      const params = new URLSearchParams({
        phone: phone.trim(),
        total_amount: cartTotal,
        items: JSON.stringify(items),
        maps_url: '',
        promotions: '{}',
        code_order: orderCode,
        delivery_datetime: currentDate
      });

      const response = await fetch(`${baseUrl}?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        console.log('Orden exitosa, mostrando modal:', result.data); // Debug
        // Agregar información sobre el tipo de dispositivo para el modal
        const orderDataWithCode = {
          ...result.data,
          orderCode: orderCode,
          totalAmount: cartTotal,
          phoneNumber: phone.trim(),
          isMobile: isMobile, // Agregar información del dispositivo
          cartItems: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
            img: item.img
          })),
          totalItems: cart.reduce((sum, item) => sum + item.qty, 0),
          itemsCount: cart.length
        };
        setOrderData(orderDataWithCode);
        setShowSuccess(true);
        clearCart();
        setCartOpen(false);
        setPhone('');
        setCustomerName('');
        setShowPhoneInput(false);
        setShowNameInput(false);
        setCustomerExists(null);
      } else {
        throw new Error(result.message || 'Error al procesar el pedido');
      }
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Error al procesar el pedido. Por favor intenta nuevamente.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return cartOpen ? (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-light">Carrito</h3>
              {cart.length > 0 && (
                <button 
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres limpiar todo el carrito?')) {
                      clearCart();
                    }
                  }}
                  className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                  title="Limpiar carrito"
                >
                  <Trash className="w-4 h-4" />
                </button>
              )}
            </div>
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
                    <button 
                      onClick={() => {
                        if (window.confirm(`¿Eliminar ${item.name} del carrito?`)) {
                          removeFromCart(item.id);
                        }
                      }}
                      className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors flex-shrink-0"
                      title="Eliminar del carrito"
                    >
                      <TrashItem className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-light text-gray-900">Total</span>
                <span className="text-2xl font-light text-gray-900">${cartTotal}</span>
              </div>
              
              {!showPhoneInput ? (
                <button 
                  onClick={() => setShowPhoneInput(true)}
                  className="w-full py-4 rounded-2xl font-medium transition-all duration-200 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  Finalizar compra
                </button>
              ) : !showNameInput ? (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-light text-gray-900 mb-2">Tu número de teléfono</h4>
                    <p className="text-sm text-gray-500">Para confirmar tu pedido</p>
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9991234567"
                      maxLength="10"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-center text-lg font-light"
                      style={{
                        background: 'rgba(249, 250, 251, 0.8)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Mínimo 10 dígitos
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={verifyPhone}
                      disabled={isPlacingOrder || !phone.trim() || phone.length < 10}
                      className="w-full py-4 rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: isPlacingOrder || !phone.trim() || phone.length < 10 
                          ? '#9CA3AF' 
                          : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                        color: 'white',
                        boxShadow: isPlacingOrder || !phone.trim() || phone.length < 10 
                          ? 'none' 
                          : '0 4px 14px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {isPlacingOrder ? 'Verificando...' : 'Continuar'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowPhoneInput(false);
                        setPhone('');
                        setCustomerName('');
                        setShowNameInput(false);
                        setCustomerExists(null);
                      }}
                      className="w-full py-3 rounded-2xl font-light transition-all duration-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3"
                           style={{ 
                             background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                             boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                           }}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-green-800 mb-1">{phone}</p>
                      <p className="text-xs text-green-600">Nuevo cliente • Necesitamos tu nombre</p>
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-light text-gray-900 mb-2">¿Cómo te llamas?</h4>
                    <p className="text-sm text-gray-500">Para personalizar tu pedido</p>
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-center text-lg font-light"
                      style={{
                        background: 'rgba(249, 250, 251, 0.8)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={registerCustomer}
                      disabled={isPlacingOrder || !customerName.trim()}
                      className="w-full py-4 rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: isPlacingOrder || !customerName.trim() 
                          ? '#9CA3AF' 
                          : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                        color: 'white',
                        boxShadow: isPlacingOrder || !customerName.trim() 
                          ? 'none' 
                          : '0 4px 14px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {isPlacingOrder ? 'Procesando pedido...' : 'Confirmar pedido'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowNameInput(false);
                        setCustomerName('');
                      }}
                      className="w-full py-3 rounded-2xl font-light transition-all duration-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      Cambiar teléfono
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Billingcar;
