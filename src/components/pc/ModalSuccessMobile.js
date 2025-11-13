import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const ModalSuccessMobile = ({ isOpen, orderData, customerName, onClose }) => {
  const [, setLocation] = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Timing preciso y directo - Principios Ive: simplicidad
      setTimeout(() => setShowAnimation(true), 50);
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
      {/* Fondo elegante - Minimalismo de Ive */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          showAnimation ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)'
        }}
      />
      
      {/* Modal Content - Diseño vertical para móvil */}
      <div className={`relative z-10 h-full flex flex-col transition-all duration-500 delay-300 ${
        showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="bg-white h-full flex flex-col overflow-hidden"
             style={{ 
               borderTopLeftRadius: '24px',
               borderTopRightRadius: '24px',
               marginTop: '8vh',
               boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.2)',
               border: '1px solid rgba(255, 255, 255, 0.1)'
             }}>
          
          {/* Header fijo - Limpio y funcional */}
          <div className="bg-white text-center px-6 pt-8 pb-6 flex-shrink-0">
            {/* Indicador de arrastrabilidad */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
            
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                 style={{ 
                   background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                   boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                 }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-2">Pedido confirmado</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {customerName ? `Gracias ${customerName}` : 'Gracias'}<br />
              <span className="text-sm text-gray-500">Tu orden está lista para recoger</span>
            </p>
          </div>

          {/* Contenido scrolleable - Diseño vertical optimizado */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Código de orden prominente */}
            <div className="text-center mb-6">
              <div className="bg-gray-100 rounded-2xl p-5 mb-3">
                <div className="text-xs text-gray-500 mb-2">Código de orden</div>
                <div className="text-2xl font-mono font-medium text-gray-900 tracking-wider">
                  {orderData?.orderCode || 'XXXXXXXX'}
                </div>
              </div>
              <div className="text-xs text-gray-500 px-4 leading-relaxed">
                Presenta este código para recoger tu pedido en KiKOI
              </div>
            </div>

            {/* Resumen rápido - Información esencial primero */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-1">
                  ${orderData?.totalAmount || orderData?.total_amountOrder || 0}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {orderData?.totalItems || orderData?.itemsOrder?.length || 0} productos • {orderData?.itemsCount || 0} artículos únicos
                </div>
                {orderData?.phoneNumber && (
                  <div className="text-xs text-gray-400 bg-white rounded-lg p-2">
                    Tel: {orderData.phoneNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Lista de productos - Compacta pero clara */}
            <div className="mb-6">
              <div className="text-base font-medium text-gray-900 mb-3">Tu pedido</div>
              {orderData?.cartItems && orderData.cartItems.length > 0 ? (
                <div className="space-y-3">
                  {orderData.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
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
                          <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                          <div className="text-xs text-gray-500">${item.price} c/u</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-medium text-gray-900">x{item.qty}</div>
                        <div className="text-xs text-gray-500">${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-5 text-center text-gray-500 text-sm">
                  No se pudieron cargar los detalles del pedido
                </div>
              )}
            </div>

            {/* Desglose de totales - Compacto */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <div className="text-base font-medium text-gray-900 mb-3">Desglose</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${orderData?.subtotal || orderData?.totalAmount || 0}</span>
                </div>
                
                {orderData?.discount_percentage > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Descuento ({orderData.discount_percentage}%):</span>
                    <span>-${((orderData?.totalAmount || 0) * (orderData.discount_percentage / 100)).toFixed(2)}</span>
                  </div>
                )}
                
                {orderData?.dict_combos_apply && Object.keys(orderData.dict_combos_apply).length > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Promociones aplicadas:</span>
                    <span>{Object.keys(orderData.dict_combos_apply).length} combos</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-2 mt-3">
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">${orderData?.totalAmount || orderData?.total_amountOrder || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional del servidor - Colapsable si hay datos */}
            {(orderData?.itemsOrder || orderData?.itemsOrderCategory) && (
              <div className="mb-6">
                <div className="text-base font-medium text-gray-900 mb-3">Info del sistema</div>
                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="space-y-2 text-xs text-blue-600">
                    {orderData?.itemsOrder && (
                      <div className="flex justify-between">
                        <span>Items procesados:</span>
                        <span className="font-medium">{orderData.itemsOrder.length}</span>
                      </div>
                    )}
                    {orderData?.itemsOrderCategory && (
                      <div className="flex justify-between">
                        <span>Categorías:</span>
                        <span className="font-medium">{[...new Set(orderData.itemsOrderCategory)].length}</span>
                      </div>
                    )}
                    {orderData?.orderCode && (
                      <div className="flex justify-between">
                        <span>ID de orden:</span>
                        <span className="font-medium font-mono">{orderData.orderCode}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Información de siguiente paso */}
            <div className="text-center mb-6">
              <div className="bg-green-50 rounded-2xl p-5">
                <div className="font-medium text-green-800 mb-2">¿Qué sigue?</div>
                <div className="text-sm text-green-600 leading-relaxed">
                  Tu pedido está siendo preparado en KiKOI.<br />
                  Te avisaremos cuando esté listo para recoger.
                </div>
              </div>
            </div>
          </div>

          {/* Footer fijo - Botón prominente */}
          <div className="p-6 bg-white border-t border-gray-100 flex-shrink-0">
            <button
              onClick={handleReturnToMenu}
              className="w-full py-4 rounded-2xl font-medium transition-all duration-200 text-base active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                color: 'white',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
              }}
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