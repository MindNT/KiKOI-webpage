import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const ModalSuccessMobile = ({ isOpen, orderData, customerName, onClose }) => {
  const [, setLocation] = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);
  const [preparationTime, setPreparationTime] = useState(null);
  const [preparationMessage, setPreparationMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 50);

      // Play notification sound
      const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/new-notification-022-370046.mp3`);
      audio.play().catch(error => console.log('Error playing sound:', error));

      // Fetch preparation time
      fetch('https://kikoi-management.mindnt.com.mx/settings/preparation-time')
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            setPreparationTime(data.data.preparation_time);
            setPreparationMessage(data.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching preparation time:', error);
          setPreparationMessage('Tu pedido está siendo preparado en KiKOI.');
        });
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  const handleReturnToMenu = () => {
    onClose();
    setLocation('/menu');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${showAnimation ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      />

      {/* Modal Content */}
      <div className={`relative z-10 h-full flex flex-col transition-all duration-500 delay-300 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white h-full flex flex-col overflow-hidden"
          style={{
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            marginTop: '8vh'
          }}>

          {/* Header */}
          <div className="bg-brand-orange text-white text-center px-6 pt-8 pb-6 flex-shrink-0">
            {/* Drag indicator */}
            <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-6"></div>

            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 300, marginBottom: '8px' }}>Pedido confirmado</h2>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.9)' }}>
              {customerName ? `Gracias ${customerName}` : 'Gracias'}<br />
              <span style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                Tu pedido ha sido recibido. {preparationMessage || ''}
              </span>
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Order code */}
            <div className="text-center mb-6 mt-6">
              <div className="bg-gray-100 rounded-2xl p-5 mb-3">
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>Código de orden</div>
                <div style={{ fontFamily: 'monospace', fontSize: '24px', fontWeight: 500, color: '#111827', letterSpacing: '0.05em' }}>
                  {orderData?.orderCode || 'XXXXXXXX'}
                </div>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6B7280', padding: '0 16px', lineHeight: '1.6' }}>
                Presenta este código para recoger tu pedido
              </div>
            </div>

            {/* Quick summary */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <div className="text-center">
                <div style={{ fontFamily: 'Inter', fontSize: '30px', fontWeight: 300, color: '#111827', marginBottom: '4px' }}>
                  ${orderData?.totalAmount || orderData?.total_amountOrder || 0}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
                  {orderData?.totalItems || orderData?.itemsOrder?.length || 0} productos • {orderData?.itemsCount || 0} artículos únicos
                </div>
                {orderData?.phoneNumber && (
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#9CA3AF', backgroundColor: 'white', borderRadius: '8px', padding: '8px' }}>
                    Tel: {orderData.phoneNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Products list */}
            <div className="mb-6">
              <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, color: '#111827', marginBottom: '12px' }}>Tu pedido</div>
              {orderData?.cartItems && orderData.cartItems.length > 0 ? (
                <div className="space-y-3">
                  {orderData.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-lg bg-gray-200 flex-shrink-0"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                          <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6B7280' }}>${item.price} c/u</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#111827' }}>x{item.qty}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6B7280' }}>${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-5 text-center" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6B7280' }}>
                  No se pudieron cargar los detalles del pedido
                </div>
              )}
            </div>

            {/* Totals breakdown */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, color: '#111827', marginBottom: '12px' }}>Desglose</div>
              <div className="space-y-2">
                <div className="flex justify-between" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                  <span style={{ color: '#4B5563' }}>Subtotal:</span>
                  <span style={{ fontWeight: 500 }}>${orderData?.subtotal || orderData?.totalAmount || 0}</span>
                </div>

                {orderData?.discount_percentage > 0 && (
                  <div className="flex justify-between text-brand-orange" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                    <span>Descuento ({orderData.discount_percentage}%):</span>
                    <span>-${((orderData?.totalAmount || 0) * (orderData.discount_percentage / 100)).toFixed(2)}</span>
                  </div>
                )}

                {orderData?.dict_combos_apply && Object.keys(orderData.dict_combos_apply).length > 0 && (
                  <div className="flex justify-between text-brand-orange" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                    <span>Promociones aplicadas:</span>
                    <span>{Object.keys(orderData.dict_combos_apply).length} combos</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-2 mt-3">
                  <div className="flex justify-between" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500 }}>
                    <span style={{ color: '#111827' }}>Total:</span>
                    <span style={{ color: '#111827' }}>${orderData?.totalAmount || orderData?.total_amountOrder || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System info */}
            {(orderData?.itemsOrder || orderData?.itemsOrderCategory) && (
              <div className="mb-6">
                <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, color: '#111827', marginBottom: '12px' }}>Info del sistema</div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="space-y-2" style={{ fontFamily: 'Inter', fontSize: '12px', color: '#4B5563' }}>
                    {orderData?.itemsOrder && (
                      <div className="flex justify-between">
                        <span>Items procesados:</span>
                        <span style={{ fontWeight: 500 }}>{orderData.itemsOrder.length}</span>
                      </div>
                    )}
                    {orderData?.itemsOrderCategory && (
                      <div className="flex justify-between">
                        <span>Categorías:</span>
                        <span style={{ fontWeight: 500 }}>{[...new Set(orderData.itemsOrderCategory)].length}</span>
                      </div>
                    )}
                    {orderData?.orderCode && (
                      <div className="flex justify-between">
                        <span>ID de orden:</span>
                        <span style={{ fontWeight: 500, fontFamily: 'monospace' }}>{orderData.orderCode}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Fixed footer */}
          <div className="p-6 bg-white border-t border-gray-100 flex-shrink-0">
            <button
              onClick={handleReturnToMenu}
              className="w-full py-4 bg-brand-orange text-white rounded-2xl transition-all duration-200 active:scale-95 hover:opacity-90"
              style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500 }}
            >
              Continuar comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccessMobile;