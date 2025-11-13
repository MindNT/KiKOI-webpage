import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const ModalSuccess = ({ isOpen, orderData, customerName, onClose }) => {
  const [, setLocation] = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Timing preciso y directo
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
      {/* Simple, elegant fade - Principios de Ive: simplicidad y funcionalidad */}
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
      
      {/* Content - Diseño limpio y funcional para PC */}
      <div className={`relative z-10 h-full flex items-center justify-center p-8 transition-all duration-500 delay-300 ${
        showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-8 overflow-hidden flex flex-col" 
             style={{ 
               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               maxHeight: '90vh'
             }}>
          {/* Header fijo - Minimalista y elegante */}
          <div className="bg-white text-center p-8 pb-6 flex-shrink-0">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                 style={{ 
                   background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                   boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                 }}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-2">Pedido confirmado</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {customerName ? `Gracias ${customerName}` : 'Gracias'}<br />
              <span className="text-base text-gray-500">Tu orden está lista para recoger</span>
            </p>
          </div>

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            {/* Código de orden prominente */}
            <div className="text-center mb-8">
              <div className="bg-gray-100 rounded-2xl p-6 mb-4 inline-block">
                <div className="text-sm text-gray-500 mb-2">Código de orden</div>
                <div className="text-3xl font-mono font-medium text-gray-900 tracking-wider">
                  {orderData?.orderCode || 'XXXXXXXX'}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Presenta este código para recoger tu pedido en KiKOI
              </div>
            </div>

            {/* Layout de dos columnas para PC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Columna izquierda: Lista de productos */}
              <div>
                <div className="text-lg font-medium text-gray-900 mb-4">Tu pedido</div>
                {orderData?.cartItems && orderData.cartItems.length > 0 ? (
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    {orderData.cartItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={item.img} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg bg-gray-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div>
                            <div className="text-base font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">${item.price} c/u</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-medium text-gray-900">x{item.qty}</div>
                          <div className="text-sm text-gray-500">${(item.price * item.qty).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500">
                    No se pudieron cargar los detalles del pedido
                  </div>
                )}
              </div>

              {/* Columna derecha: Resumen y totales */}
              <div className="space-y-6">
                {/* Resumen de totales */}
                <div>
                  <div className="text-lg font-medium text-gray-900 mb-4">Resumen</div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-light text-gray-900 mb-2">
                        ${orderData?.totalAmount || orderData?.total_amountOrder || 0}
                      </div>
                      <div className="text-base text-gray-500">
                        {orderData?.totalItems || orderData?.itemsOrder?.length || 0} productos • {orderData?.itemsCount || 0} artículos únicos
                      </div>
                      {orderData?.phoneNumber && (
                        <div className="text-sm text-gray-400 mt-3 bg-white rounded-lg p-2">
                          Tel: {orderData.phoneNumber}
                        </div>
                      )}
                    </div>
                    
                    {/* Detalles de facturación */}
                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <div className="flex justify-between text-base">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${orderData?.subtotal || orderData?.totalAmount || 0}</span>
                      </div>
                      
                      {orderData?.discount_percentage > 0 && (
                        <div className="flex justify-between text-base text-green-600">
                          <span>Descuento ({orderData.discount_percentage}%):</span>
                          <span>-${((orderData?.totalAmount || 0) * (orderData.discount_percentage / 100)).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {orderData?.dict_combos_apply && Object.keys(orderData.dict_combos_apply).length > 0 && (
                        <div className="flex justify-between text-base text-green-600">
                          <span>Promociones aplicadas:</span>
                          <span>{Object.keys(orderData.dict_combos_apply).length} combos</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-300 pt-3 mt-4">
                        <div className="flex justify-between text-xl font-medium">
                          <span className="text-gray-900">Total:</span>
                          <span className="text-gray-900">${orderData?.totalAmount || orderData?.total_amountOrder || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional del servidor */}
                {(orderData?.itemsOrder || orderData?.itemsOrderCategory) && (
                  <div>
                    <div className="text-lg font-medium text-gray-900 mb-4">Información del sistema</div>
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <div className="space-y-2 text-sm text-blue-600">
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
              </div>
            </div>

            {/* Información de siguiente paso */}
            <div className="text-center mb-8">
              <div className="bg-green-50 rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="font-medium text-green-800 mb-2 text-lg">¿Qué sigue?</div>
                <div className="text-green-600 leading-relaxed">
                  Tu pedido está siendo preparado en KiKOI.<br />
                  Te avisaremos cuando esté listo para recoger.
                </div>
              </div>
            </div>

            {/* Footer - Simple button */}
            <div className="text-center">
              <button
                onClick={handleReturnToMenu}
                className="px-12 py-4 rounded-2xl font-medium transition-all duration-200 text-lg"
                style={{
                  background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                  color: 'white',
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
                Continuar comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;