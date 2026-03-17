import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

const WelcomeUser = ({ customerName, onComplete }) => {
    const [, setLocation] = useLocation();

    useEffect(() => {
        // Navigate to menu after 2 seconds
        const timer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            } else {
                setLocation('/menu');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [setLocation, onComplete]);

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: '#CE5C28' }}
        >
            {/* Welcome Message */}
            <div className="text-center animate-pulse px-6">
                <h1 className="font-sans font-bold text-[40px] text-white mb-2 uppercase">
                    BIENVENIDO
                </h1>
                <p className="font-sans font-normal text-[24px] text-white/90">
                    {customerName || 'Usuario'}
                </p>
            </div>
        </div>
    );
};

export default WelcomeUser;
