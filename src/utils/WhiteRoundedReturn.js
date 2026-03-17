import React from 'react';

/**
 * WhiteRoundedReturn - White translucent pill button with back arrow
 * Props:
 * - onClick: function
 * - className: string (optional)
 */
const WhiteRoundedReturn = ({ onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center transition-all duration-200 active:scale-95 ${className}`}
            style={{
                width: '102px',
                height: '32px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '25px',
                border: 'none',
                outline: 'none',
                gap: '8px'
            }}
        >
            {/* Back Arrow Icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10H5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 7L5 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 13L5 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '17px',
                color: '#FFFFFF'
            }}>
                Regresar
            </span>
        </button>
    );
};

export default WhiteRoundedReturn;
