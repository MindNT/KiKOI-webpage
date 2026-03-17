import React from 'react';
import { useLocation } from 'wouter';
import WhiteRoundedReturn from '../utils/WhiteRoundedReturn';
import Footer from '../components/pc/Footer';

const Wallet = () => {
    const [, setLocation] = useLocation();

    return (
        <div className="w-full sm:max-w-[480px] mx-auto min-h-screen bg-white relative pb-[100px] flex flex-col">
            {/* Header Area (Orange Top exactly like ProductCardDescription) */}
            <div 
                className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-b-3xl"
                style={{
                    background: '#CE5C28',
                    minHeight: '120px'
                }}
            >
                <div className="flex items-center justify-between mb-2">
                    <WhiteRoundedReturn onClick={() => setLocation('/menu')} />
                </div>
                
                <h1 
                    className="text-center mt-4"
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '24px',
                        color: '#FFFFFF'
                    }}
                >
                    KiKOI Wallet
                </h1>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div 
                    className="mb-8 flex items-center justify-center w-24 h-24 rounded-full"
                    style={{ background: '#F5F5F5' }}
                >
                    {/* Placeholder Wallet Icon */}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H14V14H4V4Z" stroke="#CE5C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 17H17V7" stroke="#CE5C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 14V20H4V14H14Z" stroke="#CE5C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 14V10H14V14H20Z" stroke="#CE5C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 17V20H20V17H17Z" stroke="#CE5C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <h2 
                    className="mb-4"
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '28px',
                        color: '#2C2C2C'
                    }}
                >
                    ¡Próximamente!
                </h2>
                
                <p 
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#535353'
                    }}
                >
                    Muy pronto podrás hacer uso de tus puntos acumulados en nuestra tienda para canjearlos por tus productos favoritos.
                </p>
                <p 
                    className="mt-4"
                    style={{
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#CE5C28'
                    }}
                >
                    ¡Mantente al tanto!
                </p>
            </div>

            {/* Fixed Footer */}
            <Footer />
        </div>
    );
};

export default Wallet;
