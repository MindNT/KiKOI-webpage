import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useCartStore } from '../../cartStore';

const DynamicIslandTimer = () => {
    const [, setLocation] = useLocation();
    const orderEndTime = useCartStore(state => state.orderEndTime);
    const setOrderEndTime = useCartStore(state => state.setOrderEndTime);
    const showSuccess = useCartStore(state => state.showSuccess);
    const cartOpen = useCartStore(state => state.cartOpen);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // Only run timer if we have an active end time AND the success modal is not blocking
        if (!orderEndTime || showSuccess) {
            setTimeLeft(null);
            return;
        }

        const computeTimeLeft = () => {
            const remaining = Math.floor((orderEndTime - Date.now()) / 1000);
            if (remaining <= 0) {
                setTimeLeft(0);
            } else {
                setTimeLeft(remaining);
            }
        };

        computeTimeLeft();
        const intervalId = setInterval(computeTimeLeft, 1000);

        return () => clearInterval(intervalId);
    }, [orderEndTime, showSuccess]);

    // Don't render the island if there's no background timer or if it's explicitly null
    // Also hide it immediately if the shopping cart or success modal are open
    if (!orderEndTime || showSuccess || cartOpen || timeLeft === null || timeLeft < 0) {
        return null;
    }

    const isReady = timeLeft === 0;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div 
            onClick={() => { if (isReady) setOrderEndTime(null); }}
            style={{
                position: 'fixed',
                bottom: '76px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999, // very high so it's above menus and headers
                background: isReady ? '#10B981' : '#E36414',
                color: '#FFFFFF',
                borderRadius: '99px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isReady ? '0 8px 24px rgba(16,185,129,0.3)' : '0 8px 24px rgba(227,100,20,0.25)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                opacity: 0.95,
                backdropFilter: 'blur(10px)',
                animation: 'slideUp 0.3s ease-out forwards',
                cursor: isReady ? 'pointer' : 'default',
                transition: 'background 0.5s ease, box-shadow 0.5s ease'
        }}>
            <style>{`
                @keyframes slideUp {
                    from { transform: translate(-50%, 20px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 0.95; }
                }
                @keyframes pulseIsland {
                    0% { transform: scale(0.95); opacity: 0.6; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(0.95); opacity: 0.6; }
                }
            `}</style>
            
            {isReady ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFFFFF' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            ) : (
                <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                    animation: 'pulseIsland 2s infinite ease-in-out'
                }} />
            )}
            
            {isReady ? (
                <span style={{ fontWeight: 600, letterSpacing: '0.01em' }}>Orden lista</span>
            ) : (
                <>
                    <span style={{ opacity: 0.9, letterSpacing: '0.01em' }}>Preparando</span>
                    <span style={{ fontWeight: 600, WebkitFontFeatureSettings: '"tnum" on' }}>
                        {formatTime(timeLeft)}
                    </span>
                </>
            )}
        </div>
    );
};

export default DynamicIslandTimer;
