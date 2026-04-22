import React from 'react';
import { useLocation } from 'wouter';
import { useCartStore } from '../../cartStore';

const CloseSession = ({ isOpen, onClose }) => {
    const [, setLocation] = useLocation();
    
    if (!isOpen) return null;

    const handleConfirm = () => {
        useCartStore.getState().clearSession();
        onClose();
        setLocation('/');
    };

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.2s ease-out forwards' }}
            onClick={onClose}
        >
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes popup {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
            
            <div 
                className="bg-white rounded-[24px] p-6 mx-4 w-full max-w-[320px] flex flex-col items-center text-center"
                style={{ 
                    animation: 'popup 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Minimalist Icon */}
                <div className="w-12 h-12 rounded-full bg-[#FFF0E8] flex items-center justify-center mb-4 text-[#E36414]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </div>
                
                <h3 className="text-[#1A1A1A] font-semibold text-[18px] mb-2 font-['Inter']">
                    ¿Cerrar sesión?
                </h3>
                <p className="text-[#969696] font-medium text-[14px] leading-relaxed mb-6 font-['Inter']">
                    Aún puedes seguir explorando nuestro menú y pedir de nuestras especialidades.
                </p>
                
                <div className="flex flex-col w-full gap-3">
                    <button 
                        onClick={handleConfirm}
                        className="w-full bg-[#E36414] text-white font-semibold text-[15px] py-[14px] rounded-[100px] transition-transform active:scale-95"
                    >
                        Cerrar sesión
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full bg-[#F5F5F5] text-[#1A1A1A] font-semibold text-[15px] py-[14px] rounded-[100px] transition-transform active:scale-95"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CloseSession;
