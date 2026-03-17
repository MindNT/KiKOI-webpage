import React from 'react';

/**
 * ReturnButtonBrown - Brown square button with back arrow
 * Props:
 * - onClick: function
 * - className: string (optional)
 */
const ReturnButtonBrown = ({ onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center transition-all duration-200 active:scale-95 ${className}`}
            style={{
                width: '32px',
                height: '32px',
                background: '#CE5C28',
                borderRadius: '10px',
                border: 'none',
                outline: 'none'
            }}
        >
            {/* Back Arrow Icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal line */}
                <path d="M15 10H5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Arrow head top */}
                <path d="M8 7L5 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Arrow head bottom */}
                <path d="M8 13L5 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
};

export default ReturnButtonBrown;
