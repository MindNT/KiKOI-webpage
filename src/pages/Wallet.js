import React from 'react';
import { useLocation } from 'wouter';
import WhiteRoundedReturn from '../utils/WhiteRoundedReturn';

const Wallet = () => {
    const [, setLocation] = useLocation();

    return (
        <div 
            className="w-full sm:max-w-[640px] mx-auto min-h-screen flex flex-col relative"
            style={{ background: '#CE5C28' }}
        >
            {/* Top Navigation Bar */}
            <div className="px-6 py-6 sm:px-10 sm:py-10 w-full flex items-center">
                <WhiteRoundedReturn onClick={() => setLocation('/menu')} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 text-center">
                
                {/* Large Wallet Icon */}
                <div className="mb-8 md:mb-12">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-24 md:h-24">
                        <path d="M4 4H14V14H4V4Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 17H17V7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 14V20H4V14H14Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 14V10H14V14H20Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 17V20H20V17H17Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <h1 
                    className="mb-2"
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 800,
                        fontSize: 'clamp(28px, 5vw, 42px)',
                        color: '#FFFFFF'
                    }}
                >
                    KiKOI Wallet
                </h1>

                <h2 
                    className="mb-6"
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: 'clamp(18px, 3.5vw, 28px)',
                        color: 'rgba(255, 255, 255, 0.9)'
                    }}
                >
                    ¡Próximamente!
                </h2>
                
                <p 
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: 'clamp(14px, 2.5vw, 20px)',
                        lineHeight: '1.6',
                        color: 'rgba(255, 255, 255, 0.8)'
                    }}
                >
                    Muy pronto podrás hacer uso de tus puntos acumulados en nuestra tienda para canjearlos por tus productos favoritos.
                </p>
                
                <p 
                    className="mt-8"
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '18px',
                        color: '#FFFFFF'
                    }}
                >
                    ¡Mantente al tanto!
                </p>
            </div>
        </div>
    );
};

export default Wallet;
