import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import WhiteRoundedReturn from '../../utils/WhiteRoundedReturn';

const ModalSuccessMobile = ({ isOpen, orderData, customerName, onClose }) => {
  const [, setLocation] = useLocation();
  const [preparationMessage, setPreparationMessage] = useState('');

  // Timer states
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Play notification sound
      const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/new-notification-022-370046.mp3`);
      audio.play().catch(error => console.log('Error playing sound:', error));

      // Fetch preparation time
      fetch('https://kikoi-management.mindnt.com.mx/settings/preparation-time')
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            const prepMinutes = parseInt(data.data.preparation_time, 10) || 15; // default 15
            setTimeLeft(prepMinutes * 60);
            setPreparationMessage(data.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching preparation time:', error);
          setPreparationMessage('Tu pedido está siendo preparado en KiKOI.');
          setTimeLeft(15 * 60); // Default fallback
        });
    } else {
      // Clear timer if closed early
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      onClose(); // Clean up success modal state
      setLocation('/order-ready');
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, setLocation, onClose]);

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