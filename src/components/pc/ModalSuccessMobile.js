import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import WhiteRoundedReturn from '../../utils/WhiteRoundedReturn';
import { useCartStore } from '../../cartStore';

const ModalSuccessMobile = ({ isOpen, orderData, customerName, onClose }) => {
  const [, setLocation] = useLocation();
  const [preparationMessage, setPreparationMessage] = useState('');

  const orderEndTime = useCartStore(state => state.orderEndTime);
  const setOrderEndTime = useCartStore(state => state.setOrderEndTime);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const timerRef = useRef(null);
  const hasPlayedAudio = useRef(false);

  useEffect(() => {
    if (isOpen) {
      // Solo iniciar el proceso si es la primera vez que se abre el modal para este pedido
      if (!hasPlayedAudio.current) {
        // Play notification sound
        const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/new-notification-022-370046.mp3`);
        audio.play().catch(error => console.log('Error playing sound:', error));
        hasPlayedAudio.current = true;

        // Auto-open WhatsApp if Domicilio
        if (orderData?.orderType === 'Domicilio') {
          setTimeout(() => {
            const itemsText = orderData.cartItems ? orderData.cartItems.map(item => `- ${item.qty}x ${item.name} ($${(item.price * item.qty).toFixed(2)})`).join('\n') : '';
            const addressFormatted = orderData.addressString ? '- ' + orderData.addressString.split(', ').join('\n- ') : '';
            const rawText = `*NUEVO PEDIDO A DOMICILIO* 🛵\n\n*Código de Orden:* ${orderData.orderCode}\n*Nombre:* ${customerName}\n*Teléfono:* ${orderData.phoneNumber}\n\n*Detalles del pedido:*\n${itemsText}\n\n*Costo de Envío:* $${orderData.envioCost ? orderData.envioCost.toFixed(2) : '0.00'}\n*Total a Pagar:* $${orderData.totalAmount ? orderData.totalAmount.toFixed(2) : '0.00'}\n\n*Dirección de Entrega:*\n${addressFormatted}`;
            window.open(`https://wa.me/529991779519?text=${encodeURIComponent(rawText)}`, '_blank');
          }, 500); // Pequeño delay para asegurar que el modal se renderice antes de saltar
        }

        // Fetch preparation time
        fetch('https://kikoi-management.mindnt.com.mx/settings/preparation-time')
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              const prepMinutes = parseInt(data.data.preparation_time, 10) || 15; // default 15
              setOrderEndTime(Date.now() + prepMinutes * 60 * 1000);
              setPreparationMessage(data.data.message);
            }
          })
          .catch(error => {
            console.error('Error fetching preparation time:', error);
            setPreparationMessage('Tu pedido está siendo preparado en KiKOI.');
            setOrderEndTime(Date.now() + 15 * 60 * 1000); // Default fallback
          });
      }
    } else {
      // Reiniciar flag cuando el modal se cierra para siguientes pedidos
      hasPlayedAudio.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(null);
    }
  }, [isOpen, setOrderEndTime, orderData, customerName]);

  // Actualizar el estado local cada segundo leyendo del tiempo final global
  useEffect(() => {
    if (!isOpen || !orderEndTime) return;

    const computeTimeLeft = () => {
      const remaining = Math.floor((orderEndTime - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timerRef.current);
      } else {
        setTimeLeft(remaining);
      }
    };

    computeTimeLeft();
    timerRef.current = setInterval(computeTimeLeft, 1000);

    return () => clearInterval(timerRef.current);
  }, [isOpen, orderEndTime, setLocation, onClose]);


  const handleReturnToMenu = () => {
    onClose();
    setLocation('/menu');
  };

  if (!isOpen) return null;

  // Format time mm:ss
  const formatTime = (seconds) => {
    if (seconds === null) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col">
      <div className="w-full sm:max-w-[480px] mx-auto h-full flex flex-col overflow-hidden bg-white">

        {/* Header - Full screen orange top */}
        <div
          className="flex-shrink-0 relative rounded-b-3xl pt-6 pb-8"
          style={{ background: '#CE5C28' }}
        >
          <div className="px-6 mb-4">
            <WhiteRoundedReturn onClick={handleReturnToMenu} />
          </div>

          <div className="text-center px-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#CE5C28]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#FFFFFF' }}>
              Pedido confirmado
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.9)' }}>
              {customerName ? `Gracias ${customerName}` : 'Gracias'}<br />
            </p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6">

          {/* WhatsApp Button for Domicilio */}
          {orderData?.orderType === 'Domicilio' && (
            <div className="bg-[#FFF3ED] rounded-2xl p-5 mb-6 text-center border border-[#E36414]">
              <h3 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#E36414', marginBottom: '8px' }}>
                ¡Último paso!
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#535353', marginBottom: '16px', lineHeight: '1.4' }}>
                Se abrirá tu WhatsApp automáticamente para enviar el pedido. En caso de que no inicie en automático, da clic en el botón de abajo.
              </p>
              <button
                onClick={() => {
                  const itemsText = orderData.cartItems ? orderData.cartItems.map(item => `- ${item.qty}x ${item.name} ($${(item.price * item.qty).toFixed(2)})`).join('\n') : '';
                  const addressFormatted = orderData.addressString ? '- ' + orderData.addressString.split(', ').join('\n- ') : '';
                  const rawText = `*NUEVO PEDIDO A DOMICILIO* 🛵\n\n*Código de Orden:* ${orderData.orderCode}\n*Nombre:* ${customerName}\n*Teléfono:* ${orderData.phoneNumber}\n\n*Detalles del pedido:*\n${itemsText}\n\n*Costo de Envío:* $${orderData.envioCost ? orderData.envioCost.toFixed(2) : '0.00'}\n*Total a Pagar:* $${orderData.totalAmount ? orderData.totalAmount.toFixed(2) : '0.00'}\n\n*Dirección de Entrega:*\n${addressFormatted}`;
                  window.open(`https://wa.me/529991779519?text=${encodeURIComponent(rawText)}`, '_blank');
                }}
                className="w-full py-3 rounded-full text-white font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{ background: '#25D366', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.031 22c-1.635 0-3.197-.42-4.577-1.196l-5.423 1.423 1.455-5.289c-.846-1.427-1.294-3.08-1.294-4.808 0-5.467 4.48-9.946 9.949-9.946 5.466 0 9.946 4.479 9.946 9.946s-4.48 9.946-9.946 9.946z"/>
                </svg>
                Enviar a WhatsApp
              </button>
            </div>
          )}

          {/* Main Countdown Timer */}
          <div className="text-center mb-6">
            <h3 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2C2C2C', marginBottom: '8px' }}>
              Tiempo estimado de preparación
            </h3>
            <div
              className="py-4 rounded-2xl flex items-center justify-center"
              style={{ background: '#F5F5F5' }}
            >
              <span style={{ fontFamily: 'Inter', fontSize: '40px', fontWeight: 700, color: '#CE5C28', letterSpacing: '0.05em' }}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <p className="mt-3" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#535353', lineHeight: '1.5' }}>
              {preparationMessage || 'Estamos preparando tu orden con dedicación.'}
            </p>
          </div>

          {/* Order code */}
          <div className="text-center mb-6">
            <div className="bg-gray-100 rounded-2xl p-5 mb-2">
              <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Código de orden</div>
              <div style={{ fontFamily: 'monospace', fontSize: '24px', fontWeight: 700, color: '#2C2C2C', letterSpacing: '0.05em' }}>
                {orderData?.orderCode || 'XXXXXXXX'}
              </div>
            </div>
          </div>

          {/* Quick summary */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <div className="text-center">
              <div style={{ fontFamily: 'Inter', fontSize: '30px', fontWeight: 700, color: '#2C2C2C', marginBottom: '4px' }}>
                ${orderData?.totalAmount || orderData?.total_amountOrder || 0}
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                {orderData?.totalItems || orderData?.itemsOrder?.length || 0} productos • {orderData?.itemsCount || 0} artículos
              </div>
            </div>
          </div>

          {/* Products list */}
          <div className="mb-6">
            <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2C2C2C', marginBottom: '12px' }}>Tu pedido</div>
            {orderData?.cartItems && orderData.cartItems.length > 0 ? (
              <div className="space-y-3">
                {orderData.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="min-w-0 flex-1">
                        <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#2C2C2C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6B7280' }}>${item.price} c/u</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2C2C2C' }}>x{item.qty}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#E36414' }}>${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-5 text-center" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6B7280' }}>
                Detalles del pedido
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccessMobile;