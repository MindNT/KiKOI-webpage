import React from 'react';
import { useLocation } from 'wouter';

const OrderReady = () => {
    const [, setLocation] = useLocation();

    const handleAccept = () => {
        // Clear any leftover local state if needed
        setLocation('/menu');
    };

    return (
        <div 
            className="w-full sm:max-w-[640px] mx-auto min-h-screen flex flex-col items-center justify-center px-8 text-center relative"
            style={{ background: '#CE5C28' }}
        >
            {/* Animated or Static Icon */}
            <div className="mb-8 md:mb-12 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#CE5C28" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            <h1 
                className="mb-4"
                style={{
                    fontFamily: 'Inter',
                    fontWeight: 800,
                    fontSize: 'clamp(26px, 5vw, 42px)',
                    lineHeight: '1.2',
                    color: '#FFFFFF'
                }}
            >
                ¡Tu pedido está listo!
            </h1>
            
            <p 
                className="mb-12 max-w-md"
                style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: 'clamp(15px, 2.5vw, 22px)',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.9)'
                }}
            >
                Por favor, acércate a la barra o a la caja para recoger tus bebidas.
            </p>

            {/* Accept Button Fixed at Bottom */}
            <div className="absolute bottom-10 left-0 w-full px-6 flex justify-center">
                <button
                    onClick={handleAccept}
                    className="w-full max-w-sm bg-white transition-transform transform active:scale-95 duration-200"
                    style={{
                        height: '56px',
                        borderRadius: '28px',
                        border: 'none',
                        outline: 'none',
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: 'clamp(16px, 2.5vw, 20px)',
                        color: '#CE5C28',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default OrderReady;
